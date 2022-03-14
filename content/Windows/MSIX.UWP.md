---
date: 2020-04-24
title: MISX & UWP
menu:
    sidebar:
        parent: Windows
---

MSIX is the packaging technology used by UWP apps.

Packages can be signed with a certificate, so ensure to install the appropriate certificates prior to running installing your packages.

- App Installer
	+ Tool that can be installed from Microsoft Store.
	+ Used to install msix packages.

- Web
	+ Provide download links using the app installer protocol, to msix packages.

- Microsoft Endpoint Configuration Manager

- Microsoft Intune

- Powershell Cmdlets

- Group Policy

- DISM
	+ Only useful when imaging devices.



## Preinstalling apps
DISM can be used to service and prepare Windows images.


### Staging
- Staging a packaged app: storing a copy of the app to the local filesystem.
- Can be done on an offline image (.wim, .vhd, .vhdx) or an online system.

### Registration
- After a packaged app has been staged, the app can be registered to users on the device. 
- Registration is per-user, running when a user logs on.
- OS will load the app, creating user-specific data.
	+ AppData, 
	+ Filetype associations, 
	+ App tiles in the start menu.
	* Performed by App Readiness Service (ARS)