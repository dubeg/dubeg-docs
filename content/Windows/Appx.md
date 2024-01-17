---
date: 2020-10-22
title: Appx
menu:
    sidebar:
        parent: Windows
---

Export an Appx package to install on a different computer.

You'll need this script (ps1), as well as a Windows 10 SDK (can be installed via Visual Studio Community).

- https://github.com/mjmeans/Appx-Backup/

```
Appx-Backup.ps1
    -WSAppPath 'C:\Program Files\WindowsApps\<appDir>'
    -WSAppOutputPath <outputDir> 
    -WSTools 'C:\Program Files (x86)\Windows Kits\10\bin\10.0.19041.0\x64\'
```


## WindowsApps
Whenever a user logs on the first time on a Windows 10+ computer, Windows starts to install apps for that particular user. 
These apps are the provisioned apps. 
Likewise, if the user installs a new app from the Windows Store, this app is only available for that user.

Thus, all apps that a particular user can run are the user’s installed apps. 
On the other hand, the provisioned apps lurk in the background of the system and only come into play whenever a new user logs on.

If you want to ensure that Windows only installs a certain set of apps or no apps at all when a user logs on for the first time, you have to remove all provisioned apps—that is, you have to unprovision the appx packages.


### Uninstall provisioned apps
```
Get-AppxProvisionedPackage -Online;
Get-AppxProvisionedPackage -Online | ? DisplayName -like *zune* | Remove-AppxProvisionedPackage -Online;
```


## Installing on another computer
- Add certificate into: `Local Computer\Trusted Root Certificates Store`
- Install the appx by running it.
    * Alternatively, using `Add-AppxPackage`.