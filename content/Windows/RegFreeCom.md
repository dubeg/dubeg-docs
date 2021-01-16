---
date: 2019--06-22
title: Reg-Free COM
menu:
    sidebar:
        parent: Windows
---

Shorthand for registration-free COM.


## Intro
I had to manage a few apps that were still using old COM components. Two of those were recently discovered to be incompatible, by which I mean that they can't be installed on the same Windows system at the same time. The problem was that they used different versions the same components (.ocx), and they relied on system registration of those components to use them.

With Windows XP, Microsoft introduced a technique called registration-free COM which solves this particular problem.


## Description
Reg-free COM basically involves having a manifest file located in the same dir as your app's, named in the pattern `AppName.exe.manifest`, which describes in details the dependencies of the app (version, hash, where it's located, etc.) instead of letting the system guess.


## Implementation
If an app doesn't come with an external manifest file of its own, it may have it embedded within its executable. If not, then you can generate one manually with a handy tool: `msbuild`.


Requirements

- `msbuild.exe`
- Registering the COM components using regsvr32.
    + Ex:`regsvr32 libraryName.ocx`
    + Since Windows 2008 R2, you don't need to worry about the bitness of the component.
        - Previously, you had to launch the version of regsvr32 that matches it (32 or 64-bit). Now regsvr32 does it on its own.


To avoid polluting your own machine with old components, you can use the free Windows 10 dev virtual machine provided by Microsoft. It also has msbuild pre-installed. Note: Hyper-V requires Windows 10 Pro at minimum.


_In this case, the app was composed of multiple executables, which most likely were all using the same .ocx components._

__Generating manifests__
```powershell
$exes = Get-ChildItem *.exe;
foreach($exe in $exes) {
    $cmd = "msbuild -property:ExeName=$($exe.Name) build.xml";
    Invoke-Expression $cmd
}
```


__build.xml__
```xml
<?xml version="1.0" encoding="utf-8"?>
<Project DefaultTargets="Build" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
<PropertyGroup>
    <ExeName>AppName</ExeName>
</PropertyGroup>
<Target Name="Build">
    <ItemGroup>
        <File Include="$(ExeName)"/>
        <ComComponent Include="A.ocx;B.ocx;C.ocx;" />
    </ItemGroup>
    <GenerateApplicationManifest
        AssemblyName="$(ExeName)"
        AssemblyVersion="1.0.0.0"
        IsolatedComReferences="@(ComComponent)"
        Platform="x86"
        ManifestType="Native">
        <Output
            ItemName="ApplicationManifest"
            TaskParameter="OutputManifest"/>
    </GenerateApplicationManifest>
</Target>   
</Project>
```


## WinSxS
WinSxs is the name of the system that makes side-by-side COM assemblies possible on Windows. This is the thing that looks at manifest files to load the right assemblies, among other things.

From Windows 2003 onwards, the internal manifest (embedded within the exe) is looked for first, then the external one (AppName.exe.manifest).


## Cache
WinSxS caches some information on the first execution of an app.

If you first run an app that doesn't have a manifest, then decide to generate one yourself to implement the reg-free COM technique, then re-execute the app expecting your manifest to be considered by the system, you might be surprised that it's not. This is caused by the cached information that were generated on the first run and that's now used the second time around.

To force the system to look at your new manifest, you can change the executable's LastWriteTime attribute manually. Consider changing only the second part instead of the whole date/time.

__Using Powershell__
```powershell
(Get-Item fileName.exe).LastWriteTime = '2000-01-01 00:01';
                                      = (Get-Date -Year 2000 -Month 1 ...);
```


## References
- https://blogs.msdn.microsoft.com/jonwis/2004/08/07/registration-free-applications-and-components/
    + Title: Registration-free applications and components
    + Author: Jonwis
    + Blog title: Nothing ventured, nothing gained
- https://en.wikipedia.org/wiki/Side-by-side_assembly
- https://stackoverflow.com/a/11036324
- https://blogs.msdn.microsoft.com/junfeng/2009/05/11/internal-manifest-vs-external-manifest/
- https://docs.microsoft.com/en-us/windows/desktop/SbsCs/about-side-by-side-assemblies-