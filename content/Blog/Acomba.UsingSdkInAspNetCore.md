---
title: Acomba SDK in ASP.NET Core
date: 2024-10-26
---

Acomba is an old 32-bit Windows application for accounting, client & inventory management, among other things. 

It has a 32-bit ODBC driver that can be used to view & edit its data.

It also has a 32-bit STA COM interface, ie. `AcoSDK.dll`, which we can readily use in a C# app.

![](/Blog/Images/Acomba.png)

In my case, I wanted to use the COM interface from within an ASP.NET Core app, but since the COM interface is 32-bit & STA, it's a bit complicated. 

You usually want to avoid using STA COM objects in ASP.NET Core because there are potential concurrency issues hidden in there. But if you do & it seem to work OK early on during testing, it might just be that you're not yet using those COM objects concurrently.

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

- Configure a COM+ application.
- Edit the registry.

Since I didn't know how to create COM+ apps, I went with editing the registry since that was documented by a few Stack Overflow answers.

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
Using a STA COM library in ASP.NET Core is error-prone.
There's a great chance to leak references to COM objects because of finalizers, & when you're using COM Surrogate(s), that means leaving `dllhost.exe` instances running even after the C# app exited.

The safest way I've found is using the class `ThreadAffinityTaskScheduler.cs`:

- Made by [noseratio](https://stackoverflow.com/users/1768303/noseratio)
- Available here: https://github.com/noseratio/tpl

Here's an example of its usage. 

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
The use of a semaphore/lock might be optional. I just didn't trust that the COM library wasn't using static variables.


## References
- https://www.acomba.com/en/solutions/acomba/
- https://aideacomba.forum-canada.com/
- https://devblogs.microsoft.com/oldnewthing/20090212-00/?p=19173
- https://blog.mattmags.com/2007/06/30/accessing-32-bit-dlls-from-64-bit-code/
- https://learn.microsoft.com/en-us/archive/msdn-magazine/2005/april/simplify-app-deployment-with-clickonce-and-registration-free-com
- https://learn.microsoft.com/en-us/samples/dotnet/samples/out-of-process-com-server/
- https://learn.microsoft.com/en-us/windows/win32/com/dll-surrogates
- https://learn.microsoft.com/en-us/windows/win32/com/dllsurrogate
- https://learn.microsoft.com/en-us/answers/questions/189002/registration-free-com-for-dllsurrogate-process
