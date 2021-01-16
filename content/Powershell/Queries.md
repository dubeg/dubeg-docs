---
date: 2019-10-28
title: Queries
menu:
    sidebar:
        parent: Powershell
---


## Host Information
```
Get-WmiObject -ComputerName <name> -Class Win32_OperationSystem | Format-List *
```


## Resolution
```
Get-WmiObject -Class Win32_DesktopMonitor | select ScreenWidth,ScreenHeight
```