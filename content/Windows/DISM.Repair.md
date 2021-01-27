---
date: 2021-01-27
title: DISM Repair
menu:
    sidebar:
        parent: Windows
---

```
dism 
	/Image:C:\Windows
	/Source:D:\Source
	/Cleanup-Image
	/RestoreHealth 
```


With pre-mounting
```
mkdir c:\mount
DISM.exe 
	/mount-Image 
	/ImageFile:D:\sources\install.wim 
	/Index:1 
	/MountDir:C:\mount\ 
	/ReadOnly

dism.exe 
	/Online 
	/Cleanup-image 
	/Restorehealth 
	/Source:c:\mount\windows 
	/LimitAccess
```


Without mounting
```
dism /Image:C:\ /Cleanup-image /Restorehealth /Source:WIM:<LETTER>:\x64\sources\install.wim:1 /LimitAccess
dism /Image:C:\ /Cleanup-image /Restorehealth /Source:ESD:<LETTER>:\x64\sources\install.esd:1 /LimitAccess
```


```
# Completes to 100%, without any error message.
dism /Image:C:\ /Cleanup-image /Restorehealth /Source:ESD:E:\Sources\install.esd:1 /LimitAccess

# Error: Windows Resource Protection could not perform the requested operation.
sfc /scannow /offbootdir=C:\ /offwindir=C:\windows

dism /image:C:\ /Get-CurrentEdition
```


Try what Dennis Lee poi suggested
```
# Find out source & destination are mapped to which drive letters
diskpart
> list volume
> exit

# Find out which edition is at which index in the esd.
dism /Get-WimInfo /WimFile:D:\Sources\install.esd

# Install
dism /Apply-Image /ImageFile:D:\Sources\install.esd /index:1 /ApplyDir:G:\

# Copy missing files
# E: Copies subdirectories.
# xc: Excludes changed files.
# xn: Excludes newer files.
# xo: Excludes older files.
robocopy D:\Windows C:\Windows\ /E /xc/ xn /xo
```

Didn't work, critical error on boot.

Backup profile
```
robocopy C:\Users\Atelier F:\Atelier 
	/xjd
	/xa:SH
	/nfl
	/xd AppData "Application Data" "Local Settings"
```


Once you can see the language and regional settings screen when booting from bootable installation media you are running Windows Predeplyment Environment (win PE) which uses Windows Recovery Environment (win RE) to run command prompt or all other available recovery options/tools once you click that "repair windows" button. The hidden recovery partition (<=300MB and NTFS) if created and/or being used has its own winre.wim also. 


## References
- www.tenforums.com/tutorials/7808-use-dism-repair-windows-10-image.html
- answers.microsoft.com/en-us/windows/forum/windows_10-update/system-file-check-sfc-scan-and-repair-system-files/bc609315-da1f-4775-812c-695b60477a93
- www.tenforums.com/tutorials/84331-apply-windows-image-using-dism-instead-clean-install.html
- answers.microsoft.com/en-us/windows/forum/all/windows-10-suddenly-unable-to-boot-after-word/8f50a680-4636-4713-923c-9980d8bc190a
	+ Dennis Lee Poi seemed to have exactly the same problem.