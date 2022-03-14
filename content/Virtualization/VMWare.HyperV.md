---
date: 2020-04-30
title: VMWare & Hyper-V
menu:
    sidebar:
        parent: Virtualization
---

Starting with VMWare Workstation 15, the product is finally compatible with the Hyper-V platform in Windows 10. Previous versions were not and required Windows to be launched with Hyper-V deactivated.


## Deactivate Hyper-V using a boot entry
It's possible to create a customized boot entry that disables Hyper-V at launch.

_If this doesn't work, make sure that a Group Policy doesn't interfere._

### Creating the entry
[From superuser.com:](superuser.com/questions/1091342/permanently-disable-hyper-v-in-windows-10)
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