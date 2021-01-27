---
date: 2021-01-27
title: Windows Server 2016
menu:
    sidebar:
        parent: Windows
---

Version 1607 (Build 14393.3564)


## Update History
support.microsoft.com/en-us/help/4550947

- KB4550947 - April 21, 2020 (14393.3659) *
- KB4550929 - April 14, 2020 (14393.3630) 
	- Addresses winspool.drv issue
	- Security updates
- KB4550994 - April 14, 2020 (Servicing stack)
- KB4541329 - March 17, 2020 (14393.3595)
- KB4540670 - March 10, 2020 (14393.3564)
- ...


## Kinds of updates
- Servicing stack
	+ Provide fixes to the service stack, the component that installs Windows updates.
	+ Contains CBS (component-based servicing stack), which is key underlying component for DISM, SFC, changing Windows Features or Roles, and repairing components.
	+ Don't require restart.
	+ Include the full servicing stack.
	+ Cannot be reverted/uninstalled.
	+ Specific to a certain Windows version (build).

- Cumulative
	+ Bundle of fixes concerning quality and security of Windows.
	+ Each cumulative update includes fixes from all previous updates.

Servicing stack  updates must ship separately from the cumulative updates because they modify the component that installs Windows updates. Microsoft recommends installing the latest servicing stack updates before cumulative updates.



## End of Support
Windows Server 2016 (Long-Term Servicing Channel)
- Build: 14393.0
- Mainstream: 1/11/2022
- Extended: 1/12/2027




## Servicing Channels
docs.microsoft.com/en-us/windows-server/get-started-19/servicing-channels-19

- LTSC
	+ 5 years of Mainstream support
	+ 5 years of Extended support

Mainstream
- Security updates, 
- Non-security updates,
- Releasing design changes,
- Warranty claims.

Extended
- Security updates, 
- No more phone/online support from MS (without additional charge).





## Servicing tools
- Windows Update
- Windows Server Update Services (WSUS)
	+ Natively available in the Windows Server operating system. 
	+ Defer updates, choose to deploy to specific computers.
- Microsoft Endpoint Configuration Manager



## Check whether a server is running an LTSC or SAC release
Instead of looking at the build number, you must look at the product name.

- SAC
	+ Use the name "Windows Server Standard" (or Windows Server Datacenter).
	+ Without a version number.
- LTSC 
	+ Include the version number.
	+ Ex: Windows Server 2019 Standard.

```
Get-ItemProperty -Path 'HKLM:\Software\Microsoft\Windows NT\CurrentVersion' `
| select `
	ProductName, `
	ReleaseId, `
	InstallationType, `
	CurrentMajorVersionNumber, `
	CurrentMinorVersionNumber, `
	CurrentBuild
```