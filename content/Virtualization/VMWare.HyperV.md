---
date: 2020-04-30
title: VMWare and Hyper-V
menu:
    sidebar:
        parent: Virtualization
---

Starting with version 15, VMWare Workstation is compatible with the Hyper-V platform in Windows 10. Previous versions are not, and requires Windows to be launched with Hyper-V deactivated in order to run.

There are a bunch of features included in recent releases of Windows 10 that require Hyper-V, and so you'd need to deactivate them all manually. To avoid doing that, you can create a customized boot entry disabling Hyper-V instead. 

I still listed commonly-enabled features dependant on Hyper-V present as of Windows 1909.



## Optional Features
Using either:

- GUI
	+ Ctrl + R: `optionalfeatures`
	+ Taskbar: `turn windows features on or off`
- Powershell
	+ Launch as Admin.
	+ `Get-WindowsOptionalFeatures -Online -FeatureName <name>`

__Features__

- Hyper-V
	+ Hyper-V Platform
		- Hyper-V Hypervisor
- Windows Sandbox
- Windows Subsystem for Linux
- Windows Hypervisor Platform
- Containers
- (?) Windows Defender Application Guard


## Core Isolation
- Settings
	1. Update & Security
	1. Windows Security
	1. Device Security
	1. Core Isolation 
	1. Memory Integrity


## Device / Credential Guard
Using either:

- Powershell
	+ Download & unzip: [Hardware Readiness tool](microsoft.com/en-us/download/confirmation.aspx?id=53337)
	+ Launch as Admin:
	+ `.\DG_Readiness_Tool_v3.6.ps1 -Disable`
	+ `.\DG_Readiness_Tool_v3.6.ps1 -Enable`
- gpedit.msc
	1. Computer Configuration 
	2. Administrative Templates
	3. System
	4. Device Guard
	5. Turn On Virtualization Based Security



## Using a boot entry
It's still currently (Windows 1909) possible to create a customized boot entry that disables Hyper-V at launch.

_If this doesn't work, make sure that a Group Policy doesn't interfere._

### Creating the entry
[Reference from superuser.com](superuser.com/questions/1091342/permanently-disable-hyper-v-in-windows-10)
```
bcdedit /copy "{current}" /d "No Hyper-V" 
> The entry was successfully copied to {...}. 
bcdedit /set "{...}" hypervisorlaunchtype off
bcdedit /set "{bootmgr}" timeout 0
```
Then, restart using Advanced Startup & select the entry.

If you want to always boot with Hyper-V deactivated, set the new entry as the default. Otherwise, on subsequent reboot, the `Windows 10` entry with Hyper-V will still be selected.


### Considerations
- `bootmenupolicy`: `Standard`
	+ When multiple boot entries are configured, the boot menu is shown irregardless of the value of `bootmgr.displaybootmenu`.
	+ Workaround is to set `bootmgr.timeout` to `0`.
		- This avoids having boot menu being shown.
		- The default entry is chosen.
		- This doesn't impact rebooting using Advanced Startup.
			+ Either via Settings, or using `Shift` + Restart.
			+ In Advanced Startup, there's no timeout.



### Advanced Startup
Booting in Advanced Startup offers boot entry selection, among other things.

- Hold `Shift` when choosing `Start -> Power -> Restart`

Alternatively:

1. Open Settings
2. Change advanced startup options
3. Advanced startup `->` Restart