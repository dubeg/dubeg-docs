---
date: 2020-04-24
title: DISM
menu:
    sidebar:
        parent: Windows
---

DISM is a command-line tool to prepare Windows images, including..

- Win-PE: Pre-Execution,
- Win-RE: Recovery Environment,
- Windows Setup.

It can service..

- Windows images (.wim, .esd),
- Virtual hard disks (.vhd, .vhdx).



Image
-----------------------------
An image is either .wim or .esd, and both formats usually packages the same files (they probably use a different compressing algorithm). You can also unzip them.

The .esd format is used in public downloads such as the images downloaded by Windows Media Creation Tool.

An image can contain many editions of Windows, and you can target anyone of them using an index in dism commands.





Offline installation
-----------------------------
If the server cannot connect to Windows Update, you can download an image manually and use it as the source to install a wanted feature.

```powershell
dism 
    /Get-WimInfo 
    /WimFile:C:\sources\install.wim

# -------------
# Results
# -------------
# 1: Standard Edition Server Core
# 2: Standard Edition
# 3: Datacenter Edition Server Core
# 4: Datacenter Edition

Install-WindowsFeature `
    -Name "Desktop-Experience" `
    -Source wim:C:\Sources\install.wim:2
```


```
dism 
    /export-image 
    /SourceImageFile:install.esd 
    /SourceIndex:IndexNumber 
    /DestinationImageFile:install.wim 
    /Compress:max 
    /CheckIntegrity
```
- DestinationImageFile
    * Can be either .vim or .esd
- Compress
    + max
    + fast
    + none


Editions
-----------------------------

An image may contain multiple editions of Windows, and therefore it is necessary to query which editions exactly it includes in order to correctly target/source from the edition needed.


Query windows editions contained within the image.
```
dism 
    /Get-WimInfo 
    /WimFile:C:\sources\install.wim
```




Repair
-----------------------------
```
Dism /Online /Cleanup-Image /ScanHealth
Dism /Online /Cleanup-Image /CheckHealth
Dism /Online /Cleanup-Image /RestoreHealth
```




Win-PE
-----------------------------
docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/winpe-adding-powershell-support-to-windows-pe