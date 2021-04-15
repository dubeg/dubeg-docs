---
date: 2021-03-21
title: Remoting
menu:
    sidebar:
        parent: Powershell
---

Powershell Remoting is essentialy a native Windows remote command
execution features build on Windows Remote Management protocol.
WinRM is supported on Vista and over.

```Server
Enable-PSRemoting
Disable-PSRemoting
```

```Client
Enter-PSRemoting computerName
Exit-PsSession

New-PsSession
Get-PsSession
Enter-PsSession -id <id>
Exit-PsSession
```

## Configuration
```
Set-Item WSMan:\localhost\Shell\MaxMemoryPerShellMB 1024
Set-Item WSMan:\localhost\Plugin\microsoft.powershell\Quotas\MaxMemoryPerShellMB 1024
Restart-Service WinRM
```

