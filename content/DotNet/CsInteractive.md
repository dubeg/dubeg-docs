---
date: 2020-06-02
title: CsInteractive
menu:
    sidebar:
        parent: .NET
---

There's a C# Interactive executable included with Visual Studio, but there's also the `dotnet script` tool that behaves just the same.


## Install
```
dotnet tool install -g dotnet-script
dotnet script
> ...
```


## Load additional dlls
```
#r "Custom.dll"        // Path,
#r "System.Xml.Linq"   // Namespace
// -------------------
// Don't forget "using" 
// once dll is loaded.
// -------------------
using Custom;
using System.Xml.Linq;
```