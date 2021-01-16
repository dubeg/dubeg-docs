---
date: 2019-07-01
title: Assembly
menu:
    sidebar:
        parent: .NET
---

Unit of deployment, and logical unit of functionality running under the control of the CLR.


## Private vs Shared
- Private: to an application.
- Shared: in the G.A.C. 

A shared assembly has a strong name assigned to it, which a private assembly doesn't have, and is published to the GAC.


## Features
- Self-describing
    + All the info needed for the CLR to run an assembly is contained in its manifest.
- Versioning
    + In an assembly manifest, version info is recorded and enforced by the CLR. 
- Side-by-side deployment
    + For shared assemblies.
    + Multiple versions of an assembly can be installed simultaneously.
- Self-contained
- Execution
    + Security permissions supplied in the manifest and controlled by the CLR.
        - DUBEG: What does that mean?
- Language independent
    + An assembly can be developed by using any one of the supported .NET language: C#, VB.NET, F# (?).



## G.A.C.
Global assembly cache.

Basically a folder containing a bunch of assemblies, including the different assemblies of `1..N` .NET frameworks.

- Each CLR version has its own G.A.C. for backward compatibility reasons.
- Each G.A.C. can have multiple versions of the same assemblies.
    + Can store multiple versions of the .NET framework.


## Assembly
Contains

- MSIL code
- Manifest
    + Assembly Name
    + Version
    + Culture
    + String name of information
    + Assembly list of files
    + Type reference information
    + Referenced and dependent assembly information.
- Type metadata
- Others resources
    + Strings,
    + Images,
    + ?


## Loading (NET framework)
There are a number of different ways that assemblies are loaded in dotnet. When you create a typical project, assemblies usually come from:

- The reference list of the top level (executable project.
- The references of referenced projects.
- Dynamically loaded assemblies
    + Via AppDomain, or 
    + Reflection loading.

In addition, the CLR (?) automatically loads mscorlib.

Referenced assemblies aren't immediatly loaded: they're instead loaded on the fly (as needed).

Some hosting environment preload assemblies. For example, ASP.NET will preload referenced assemblies as part of the startup process.