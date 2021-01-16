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


## Installing on another computer
- Add certificate into: `Local Computer\Trusted Root Certificates Store`
- Install the appx by running it.
    * Alternatively, using `Add-AppxPackage`.