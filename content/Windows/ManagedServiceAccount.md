---
date: 2020-04-01
title: Managed Service Account
menu:
    sidebar:
        parent: Windows
---

- Located in Active Directory.
- Tied to a specific host (workstation|server).
- Automatically manages its password.
	+ Like computer accounts.
- Automatically maintains their Kerberos SPN.

Managed through powershell.



## Creation

1. Create the MSA in AD.
2. Associate the MSA with a computer in AD.
3. Install the MSA on the computer that was associated.
4. Configure the service(s) to use the MSA.


### Create MSA in A.D.

Start Powershell as admin on Domain Controller.
```
Import-Module ActiveDirectory
New-ADServiceAccount `
	-Name <MsaName> `
	-Enabled $true `
	-RestrictToSingleComputer
Add-ADComputerServiceAccount -Identity <HostName> -ServiceAccount <MsaName>
```


Start Powershell as admin on host using the MSA.  
RSAT Tools are required.
```
Install-ADServiceAccount -Identity <MsaName>
Test-ADServiceAccount <MsaName>
```

In Windows Services or Task Scheduler, setup your service|task.
Grant `Log On As a Service` privilege (should be prompted).


## Add to group
```
Add-ADGroupMember `
	-Identity <groupName> `
	-members <cnName> # Example: "CN=SvcName,CN=Managed Service Accounts,DC=ad,DC=company,DC=com"
```
* Merely specifying the Msa's name won't work.


## Add in IIS
In "Advanced Settings" of the ApplicationPool, set identity to > Custom > `Domain\SvcName$`. The ending `$` is important.