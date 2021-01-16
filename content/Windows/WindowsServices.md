---
date: 2018-08-17
title: Windows Services
menu:
    sidebar:
        parent: Windows
---


## Windows Service
Run As Admin
```powershell
New-Service -Name "svcName"  `
            -DisplayName "Svc Name" `
            -Description "Incredible Svc" `
            -StartupType Automatic `
            -BinaryPathName "c:\svc.exe --config conf.ini"
Start-Service "svcName"
Stop-Service "svcName"

$service = Get-WmiObject -Class Win32_Service -Filter "Name='svcName'"
$service | Remove-WmiObject
```

Using sc.exe
```powershell
sc.exe create "svcName" start=Auto binPath="..." 
sc.exe delete "svcName"
```


## LogOn User
- Local User
- Domain User
- Local Service 
    + Preferred.
    + Purpose: run standard least-privileged services.
    + Accesses the network as anonymous user.
    + Minimal privileges on local computer.
    + Name: `NT AUTHORITY\LocalService`
    + No password.
- Network Service
    + Purpose: run standard least-privileged services.
    + Accesses the network as local computer.
    + Minimal privileges on local computer.
    + Name: `NT AUTHORITY\NetworkService`
    + No password.
- Local System
    + Avoid.
    + Accesses the network as local computer.
    + All privileges on local computers.
    + Name: `ComputerName\LocalSystem`
    + No password.

When speaking about accessing the network, 
this is confined to Negotiate, NTLM, Kerberos.

It is always preferable, however, to create an account
with its own defined permissions, so it doesn't share perms
with other processes running as one of the default account.

If you configure the app to use a domain account,
you can isolate the privileges but you then need to manually
manage passwords. To avoid manually managing password,
you can use a Managed Service Account (MSA).
An MSA can only be used on a single computer at once.

- Managed Service Accounts (managed domain accounts)
- Virtual Accounts (managed local accounts)


## Managed Service Account
_DUBEG: it turns out MSAs are limited, and something new replaced them.
Look into Group Managed Service Accounts._

Newly created MSAs will be located in a default container 
named `Managed Service Accounts`.

With the feature "AD module for Powershell" turned on.
In Domain Controller (runas admin)
```powershell
Import-Module ActiveDirectory
Remove-AdServiceAccount -Identity accountName
New-AdServiceAccount -Name accountName
Add-AdComputerServuceAccount -Identity computerName -ServiceAccount accountName
```

In Server (runas admin)
```powershell
Import-Module ActiveDirectory
Install-AdServiceAccount -Identity accountName
```

Then:

- Set Service's `LogOn` to ServiceAccount.
- When browsing for user, set the domain as Location.
- Before accepting user in `LogOn` tab, set blank password.
- `Services > Properties > Log On`

You might need to set additional permissions on files and folders
for this account to run the service properly.