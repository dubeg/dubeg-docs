---
date: 2019-11-13
title: AD Module
menu:
    sidebar:
        parent: Powershell
---


Remote Server Administration Tools for Windows 10

+ For Powershell ActiveDirectory module.
+ Starting from 1809, it is available as a Windows Feature.
    + Get-WindowsCapability -name Rsat.ActiveDirectory.* -Online | Add-WindowsCapability -Online
+ https://docs.microsoft.com/en-us/powershell/module/addsadministration/
+ https://www.microsoft.com/en-us/download/details.aspx?id=45520
+ https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/features-on-demand-non-language-fod#remote-server-administration-tools-rsat