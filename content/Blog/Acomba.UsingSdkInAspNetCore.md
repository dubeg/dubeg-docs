---
title: Acomba SDK in ASP.NET Core
date: 2024-10-26
---

Acomba is an old 32-bit Windows application for accounting, client & inventory management, among other things. 

It has a 32-bit ODBC driver that can be used to view & edit its data.

It also has a 32-bit STA COM interface, ie. `AcoSDK.dll`, which we can readily use in a C# app.

![](/Blog/Images/Acomba.png)

In my case, I wanted to use the COM interface from within an ASP.NET Core app, but since the COM interface is 32-bit & STA, it's a bit complicated. 

You usually want to avoid using STA COM objects in ASP.NET Core because there are potential concurrency issues hidden in there (hint: finalizers). But if you do & it seem to work OK early on (during testing), it might just be that you're not using those COM objects concurrently (yet).

On the 32-bit issue, there are two options:

- Running it out-of-process so that your app can be 64-bit.
- Running it in-process, ie. building the C# project in 32-bit.
	- This is just awful on Windows nowadays. You hit strange bugs that nobody else has, such as hot reloading not working properly in Visual Studio & third-party libraries not working well in 32-bit.

So obviously we want to run the Acomba COM library out-of-process, but in order to do so, we need to do a little bit of work manually because the Acomba installer doesn't do it for us.


## COM surrogate
The mechanism by which a COM library can be run out-of-process is called COM Surrogate (or DLL Surrogate). The COM system provides a default/built-in COM surrogate for us: `dllhost.exe`.

Raymond Chen:

> The COM Surrogate is a fancy name for Sacrificial process for a COM object that is run outside of the process that requested it.

There's a (perhaps big) downside to it that I must note: since the COM library is loaded on-demand in a separate process, it requires marshaling method calls back and forth & so you must mind the performance penalty that comes with it.


To configure the Acomba COM interface to use the built-in COM Surrogate, two options are available:

- Configure a COM+ application (untested).
- Use OLE/COM Object Viewer 
  + oleview.exe
  + Read this: [Configuring a Surrogate with the OLE/COM Object Viewer](https://flylib.com/books/en/3.357.1.52/1/).
- Edit the registry.
- __(New)__ J-Integra's [SetDllHost.exe](http://j-integra.intrinsyc.com/support/com/doc/tools/SetDllHost.html)
  + CLI tool that does the registry edits automatically for a give COM library.

Since I didn't know much about COM then, I went with editing the registry since that was documented by a few answers on Stack Overflow. 

Note: today, however, I would just use `SetDllHost.exe`, which is available on J-Integra's [website](http://j-integra.intrinsyc.com/) (http only, no https). Download the trial for __J-Integra COM__. You'll need to register for it but it's quite minimal & it doesn't require email activation.


### Editing the registry
To configure the COM server to use a DLL Surrogate:

+ Find the GUIDs of all the COM classes of `AcoSDK.dll`.
+ Generate a new GUID, which will be the new AppID.
	- Eg. AppID: `{b546e8e2-5d46-4786-978d-b58a09f38a31}`
+ Add: `HKLM/Software/Classes/AppID/{AppID}, (REG_SZ) DllSurrogate=""`
	- Leaving the string value empty tells the COM system to use the default surrogate, ie. `dllhost.exe`.
+ For each class in `AcoSDK.dll`:
	- Add: `(SysWow) Classes/CLSID/{CLSID}, (REG_SZ) AppID="{AppID}"`
		* The class will already exist as a registry key.
		* You just need to create/set the value `AppID` on it.
		+ `{CLSID}`: the GUID of the COM class.
		+ `{AppID}`: the GUID of the AppID generated at the beginning.


### Notes

- The .tlb file is embedded in `AcoSDK.dll`, which can be extracted using ResHacker.
- The COMView tool can be used to list & export the GUIDs of the COM Classes in `AcoSDK.dll`.
	+ https://www.japheth.de/COMView.html
- If you're using IIS AppPool identities, you will need to configure Launch & Activation permissions on the new AppID using "Component Services" (`comexp.msc`).


## STA & ASP.NET Core
Using a STA COM library in ASP.NET Core is risky: a COM object might deadlock the (.NET) finalizer thread, which would result in leaking memory as well as leaving `dllhost.exe` instances running well after the C# app exited if the COM library is using a (default) DLL Surrogate.

A solution to this is to use `ThreadAffinityTaskScheduler.cs`:

- Made by [noseratio](https://stackoverflow.com/users/1768303/noseratio)
- Available here: https://github.com/noseratio/tpl

Here's an example:

```
public class AcombaService {
  private static SemaphoreSlim _lock = new SemaphoreSlim(1, 1);
  ...
  public async Task DoAsync() {
    await _lock.WaitAsync();
    try {
      using var staThread = new Noseratio.ThreadAffinity.ThreadWithAffinityContext(staThread: true, pumpMessages: true);
      await staThread.Run(async () => {
        try {
          // Use AcoSDK objects here:
          // - Load the SDK
          // - Open a company
          // - Login
          // - ...
        }
        catch (Exception ex) {
          _logger.LogError(ex, "Error encountered in Acomba's STA thread");
          throw;
        }
      }, CancellationToken.None);
    }
    finally {
      _lock.Release();
    }
  }
  ...
}
```
The use of a semaphore/lock might be optional, I just don't know enough about COM & the AcoSDK library to trust multiple threads making calls to the COM surrogate concurrently.


## References
- https://devblogs.microsoft.com/oldnewthing/20090212-00/?p=19173
- https://blog.mattmags.com/2007/06/30/accessing-32-bit-dlls-from-64-bit-code/
- https://jacobfilipp.com/MSJ/activex0597.html
- https://flylib.com/books/en/3.357.1/
  + Developers Workshop to COM and ATL 3.0
  + ISBN: 1556227043
  + EAN: 2147483647
  + Year: 2000
  + Author: Andrew W. Troelsen


Additional references:

- https://www.acomba.com/en/solutions/acomba/
- https://aideacomba.forum-canada.com/
- https://learn.microsoft.com/en-us/windows/win32/com/dll-surrogates
- https://learn.microsoft.com/en-us/windows/win32/com/dllsurrogate
- https://learn.microsoft.com/en-us/answers/questions/189002/registration-free-com-for-dllsurrogate-process
- https://learn.microsoft.com/en-us/archive/msdn-magazine/2005/april/simplify-app-deployment-with-clickonce-and-registration-free-com
- https://www.cs.odu.edu/~wild/windowsNT/Spring99/notes.htm
- https://helparchive.huntertur.net/category/39
- https://thrysoee.dk/InsideCOM+/
  + [DLL Surrogates](https://thrysoee.dk/InsideCOM+/ch12b.htm)


## About COM & the Finalizer thread issue 

Hans Passant:

>  It is the universal way to deadlock the finalizer thread. The program is using a COM object that is not thread-safe. It is made thread-safe by the COM infrastructure by forcing all threaded calls to do the equivalent of Invoke(), running the call on the thread that created the object. The finalizer has to do this as well to make the final Release() call that destroys it. But the thread that owns the object is no longer responsive so the call cannot complete.

SteveSims:

> COM can flip a ThreadPool worker thread over to the STA model, but threadpool threads were not designed to support this thread model. 

> The application worked most of the time because in all cases the COM objects were forcefully disposed on a API thread that created them and the finalizer was not involved in the cleanup.

__Reference:__

- https://stackoverflow.com/questions/51743909/finalizer-blocked-issue
  + https://www.tessferrandez.com/blog/2006/03/26/net-memory-leak-unblock-my-finalizer.html



## About AcoSDK.dll
AcoSDK.dll 

- COM library
- Embeds a .tlb file
- In-proc
- 32-bit
- STA

C# app (csproj):

- COMReference
  + Name: (optional) display name of the component
  + Guid: (required)
  + EmbedInteropTypes: (optional) embed the interop types directly into your assembly, rather than generating an interop assembly (separate DLL).
  + Isolated: (optional) specifies whether the component is reg-free.
  + WrapperTool: (optional) name of the wrapper tool that is used on the component.
    - Primary
    - tlbimp
    - ...


About interop assemblies:

- https://limbioliong.wordpress.com/2011/08/31/interop-assemblies-some-general-advise-on-usage/
- https://learn.microsoft.com/en-us/dotnet/framework/interop/how-to-generate-primary-interop-assemblies-using-tlbimp-exe