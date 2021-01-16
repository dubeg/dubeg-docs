---
date: 2018-09-27
title: Core CLI
menu:
    sidebar:
        parent: .NET
---


- dotnet new console
- dotnet new mvc
- dotnet restore
    + Installs dependencies (Nuget)
- dotnet build
- dotnet run



## Packages

__CLI__

- dotnet add --help
- dotnet add package `<packageName>`
    + Installs a package.
- dotnet add reference `<projectName>`
    + Add a project reference.

Examples:
```
dotnet add package Microsoft.AspNetCore.All
dotnet add package Microsoft.AspNetCore.All --version 2.0.0
```



__Package Manager Console (Visual Studio)__

These are different from the similar commands in Powershell.

- Find-Package
    + Discovers packages using keywords.
- Get-Package
    + Lists installed packages.
- Get-Package -updates 
    + View updates if available.
- Install-Package
    + Installs a package and its dependencies into the project.
- Uninstall-Package 
- Update-Package



## Discover Packages

- Visit https://www.nuget.org/, or
- Use the Nuget Packages GUI in Visual Studio, or
- Use the Nuget CLI.


There's currently no way of discovering packages through the dotnet CLI,
which is a bummer.