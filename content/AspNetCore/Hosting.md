---
date: 2019-03-28
title: Hosting
menu:
    sidebar:
        parent: AspNetCore
---


## IIS
### Classic ASP.NET with IIS
Applications (dll) are hosted inside the IIS Work Process (w3wp.exe) of their application pool.


### ASP.NET Core with IIS
**Do they need to include Kestrel to run on their own?**
ASP.NET Core apps are running in their own Console app process, outside the AppPool's IIS worker. They have their own web server, Kestrel.

ASP.NET Core apps are standalone console applications.
They are invoked through the dotnet runtime command.
They're loaded through an IIS module called AspNetCoreModule that executes the external console application.

The AspNetCoreModule hooks into the IIS pipeline early in the request cycle and forwards all traffic to the console application. 

Since the AppPool of a site acting as a proxy to an aspnetcore app doesn't need to instantiate a .NET runtime within itself, the AppPool should be set to use No Managed Code.


Kestrel
- New .NET web server implmentation.
- Raw web server
    + no port forwarding
    + no process lifetime management
    + no certificate management
    + no ...

The ASP.NET Core app can be run behind IIS.

-> http 
-> w3wp.exe (http://siteName.com:80) 
-> http 
-> dotnet run appName (port:12345)


### Hosting
Production Specifications

- Behind IIS
- Use Kestrel.
- Windows Authentication


What if I want to run from VSCode with no authorization checks?
+ Use CreateDefaultBuilder
    + Uses Kestrel.
    + The builder calls IISIntegration if it detects it's running in IIS pipeline. Since it won't detect IIS, the call will be a no-op (it won't setup the IISMiddleware).
        + By the way, the way it detects it's running behind IIS is because the ANCM module sets some special env variables for the dotnet process. If they don't exist, then it means it's not behind ANCM.
+ In appsettings, add a setting called DisableAuthorization.
+ Set DisableAuthorization to false.
+ Make Authorization be a no-op if DisableAuthorization is set to true.


What if I want to run from VSCode with authorization checks?
+ Use HTTP.sys.
+ I'll have to figure this one out, but basically gotta replace the call to CreateDefaultBuilder in Program.cs with something else, probably, and call UseHttpSys.


What if my only concern is to run with authorization checks?
+ Use Visual Studio with IISExpress.
+ Use CreateDefaultBuilder
    + You'll be using Kestrel with IISIntegration.
+ Enable Windows Authentication in Project Properties.
+ In appsettings, set DisableAuthorization to false.


### Personal notes
Windows 7 and newer.
Windows Server 2008 R2 and newer.

If you use Windows authentication, make sure to turn off anonymous authentication,
otherwise you might get an authentication scheme error while browsing your app.

Install the .NET Core Windows Server Hosting bundle.
```
https://aka.ms/dotnetcore-2-windowshosting
```
Refresh IIS services
```
net stop was /y
net start w3svc
iisreset
```

To use the IIS ASP.NET Core module, you need a web.config file.
Make sure to turn on logging in that file.
