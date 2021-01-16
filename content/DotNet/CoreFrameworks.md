---
date: 2019-07-01
title: Core Frameworks
menu:
    sidebar:
        parent: .NET
---

## Platforms
+ Windows x versions (x86, x64)
+ osx  x versions (x86, x64)
+ linux x versions (x86, x64)
+ RID
    + [R]untime [Id]entifier
    + Examples
        - win-x64
        - win-x86



## .NET Implementations 
Aka frameworks.

+ .NET Core 1..N
+ .NET Framework 1..N
+ Mono/Xamarin 1..N



## Frameworks
DotNetCore is a cross-platform dotnet implementation made of packages (published on NuGet).

Each package supports being run on multiple .NET implementations, represented as frameworks.

+ net46, net47, etc.
+ netstandard
+ netcoreapp

The framework netcoreapp is package-based, meaning it is entirely formed and defined as packages.

In recent .NET Core tools, targetting a framework implicitely references its respective metapackage. Example:

- netstandard1.6 (framework) -> NetStandard.Library v1.6.0 (metapackage).
- netcoreapp2.1 (framewwork) -> Microsoft.NETCore.App v2.1.0 (metapackage)

Referencing a metapackage means that you're adding a reference to each of its dependent packages as a single gesture.



## NetStandard
When targetting netstandard (for a library), things get interesting. You're effectively compiling against a dummy netstandard.dll which defines an API set without implementing it.

Each .net implementation that support netstandard includes its own `netstandard.dll` that forwards the types it includes to the proper assemblies using its manifest.



## Reference
- https://weblog.west-wind.com/posts/2019/Feb/19/Using-NET-Standard-with-Full-Framework-NET
- https://docs.microsoft.com/en-us/dotnet/standard/net-standard
- https://github.com/dotnet/standard/issues/146
- https://docs.microsoft.com/en-us/dotnet/core/packages