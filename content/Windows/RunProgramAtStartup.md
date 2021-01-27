# README
- gshaw0.wordpress.com/2017/06/11/build-your-own-thin-ish-client-with-windows-10-ltsb/

- community.spiceworks.com/topic/1240048-suggestions-for-building-out-a-windows-10-kiosk-gpo-to-access-specific-site-only

- www.htguk.com/creating-a-windows-10-internet-kiosk-using-microsoft-edge/

- docs.microsoft.com/en-us/windows/configuration/kiosk-single-app



Custom User Interface
---------------------
GPO (exists in Windows 10, in Enterprise and Pro editions)
```
User Configuration\Administrative Templates\System\Custom User Interface
```

Registry:
```
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\System
	(Default) REG_SZ: C:\Program Files\Internet Explorer\iexplore.exe -k www.google.de
```

- If the "System" key doesn't exist, create it. 
- Since this is in the "Current User" hive, it will only affect the currently logged user.





Shell Launcher
----------------
Use Shell Launcher to replace the default Windows 10 shell with a custom shell. It can be any application or executable as our custom shell, such as a command window or a custom dedicated application, can also configure Shell Launcher to launch different shell applications for different users or user groups.

- Can launch different shell applications for different users or groups.

- Can't launch a Universal Windows app.
	* Using ShellLauncher V1.
	* Using ShellLauncher V2, you can specify a Universal Windows app as a custom shell.

- Can't use an application that launches a different process and exits as a custom shell.
	* ShellLauncher monitors the process to identify when the custom shell exits.

- Can't configure both ShellLauncher and AssignedAccess on the same system.

- Command string length has a maximum length of 128 characters.
	+ True or false?

- Run and RunOnce registry keys are processed before starting the custom shell, so your custom shell doesn’t need to handle the automatic startup of other applications and services.

- Behavior of the system when your custom shell exits is handled by ShellLauncher. 
	+ Can configure the shell exit behavior if the default behavior does not meet your needs.

- Different names
	+ Embedded Shell Launcher: name of feature in Windows 10 v1511.
	+ Custom Shell Launcher: name of feature in Windows 10 v1607+.

- Not turned on by default in Windows.


### Configuration
- Turn On Shell Launcher.
	+ Programs and Features
	+ Turn Windows features on or off
	+ Windows Features
		+ Device Lockdown
			+ Shell Launcher
	* No restart required.
- Configure
	+ In Windows 10 v1803: 


### References
- docs.microsoft.com/en-us/windows-hardware/customize/enterprise/shell-launcher




Unified Writer Filter
---------------------
To avoid Windows being permanently changed, ie. changes are lost upon reboot.
```
Enable-WindowsOptionalFeature -Online -FeatureName Client-UnifiedWriteFilter
uwfmgr.exe filter enable
```

### References
- docs.microsoft.com/en-us/windows-hardware/customize/enterprise/unified-write-filter

- developer.microsoft.com/en-us/windows/iot/docs/uwf

- deploymentresearch.com/Research/Post/632/Using-the-Unified-Write-Filter-UWF-feature-in-Windows-10