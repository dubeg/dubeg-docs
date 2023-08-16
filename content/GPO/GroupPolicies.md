---
date: 2020-05-02
title: Group Policies
menu:
    sidebar:
        parent: GPO
---

## Apply
- Computer Policies are applied at __computer startup__.
- User Policies are applied after __user logs on interactively__ & profile is loaded.
- Policies are also re-applied every 90 minutes (+0-30 minutes offset, randomly chosen), by default.
	+ This is true for both Computer and User policies
	+ About Security policy settings:
		- If policy targets a group, and user has been added to that group after it logged on, user might need to re-login or refresh its Kerberos token.
	+ About Registry-based policies:
		- Attention: even though a registry policy may be applied during a background refresh,
		  the actual service or program using the registry key might only read it when it launches.
		  That's why you might need to restart the whole computer, even if the policy has been applied, to force the service/program to restart & read the updated regkey. If you know the actual service/program using that key, you can always try to restart it manually, unless Windows won't like it.
	+ Some policies are not re-applied in the background:
		+ Application deployment (Software installation)
			- Only applied at computer startup.
		+ Folder redirection settings
		+ Scripts extension
			- Policy will be refreshed, but scripts will only be run at computer startup or user logon.
		+ Unchanged GPOs
			- GPOs use a version number.
			- Once applied, they are not reapplied unless the version number changes, or the `gpupdate /force` command is run.
			- A GPO can be marked as "Enforced" to bypass the version number check.
- Policies can also be applied on demand.
	+ Cmd: `gpupdate.exe`


## Processing
- When applying policies, the system queries AD for a list of GPOs to process.
- Each GPO is linked to an AD container (OU, etc), in which a user or computer belongs.
- The system checks the ACL associated with the GPO.


## Administrative Templates
Microsoft frequently publishes new templates for new versions of Windows. Each template bundle includes policies from all previous versions, so only the latest templates need to be installed on a Domain Controller.

Local Group Policies:
- C:\Windows\PolicyDefinitions
- Put your admx files in there.

- Install the templates bundle from microsoft.com.
	+ Go to: docs.microsoft.com/en-us/troubleshoot/windows-client/group-policy/create-and-manage-central-store
	+ Download the latest bundle.
		+ Eg. `Administrative Templates (.admx) for Windows 10 October 2020 Update (20H2)`
	+ Install locally or on the target server.
		- It doesn't matter where, the installation only extracts the templates to the installDir.
- Go to the Domain Controller's folder storing the templates.
	+ Eg. `\\<DomainController>\SYSVOL\<DomainName>\Policies\PolicyDefinitions`
	+ The PolicyDefinitions folder may not exist.
		- In that case, the templates shipped with Windows are used (`C:\Windows\PolicyDefinitions`).
		- Once you create that folder, the templates within will be used instead.
- Copy the recently installed templates to the DC's folder.
	+ From: `C:\Program Files (x86)\Microsoft Group Policy\<version-specific>\PolicyDefinitions`
	+ To: `\\<DomainController>\SYSVOL\<DomainName>\Policies\PolicyDefinitions`
	* It is recommended that you use multiple `PolicyDefinitions-<version>` folders, to be able to quickly go back to previous templates if an issue arises.
		+ `..\Policies\PolicyDefinitions`
			* Templates currently in use.
		+ `..\Policies\PolicyDefinitions-1909`
		+ `..\Policies\PolicyDefinitions-20H1`
		+ `..\Policies\PolicyDefinitions-20H2`
		+ Etc.
- Open GPO Management.


## Security Filtering
Authenticated Users must have the Read permission on any gpo at all times in order to work properly.
If you don't need to apply the gpo to all users/computers, simply remove its Apply permission (using the Delegation tab, then Advanced button in the bottom right corner).

Then, add whichever users/computers you need (using either the Security filtering section, or the Delegate tab).


__GPO's Delegation__

- Authenticated Users
	+ Read: always configure this at minimum.
	+ Apply Group Policy: configure this if GPO needs to be applied for all users.


## WMI Filtering
WMI uses the Common Information Model (CIM) to represents:

- Systems
- Apps
- Networks
- Devices
- Etc.

WMI enables you to create queries to interrogate specific features of a computer, etc, where the result equates to TRUE or FALSE.

Example (using namespace root/CIMV2)
```
select * from Win32_OperatingSystem where version like "6.%"
select * from Win32_ComputerSystem where Name <> "ServerName"
```

Check Event Viewer for diagnostics: Applications and Services > Microsoft > Windows > WMI-Activity



## Group Policy Preferences
- GPP extends Group Policy.
- Preferences are not GP settings.
- Windows stores both settings in the registry.
- Policy settings have an advantage over preferences: they typically override a preference.



## Computer Configuration vs User Configuration
1) User Configuration -> Policies -> Windows Settings -> Deployed Printers
2) User Configuration -> Preferences -> Control Panel Settings -> Printers


## Resources
- www.petri.com/deploying-printers-using-group-policy-windows-2008
- docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/dn581925(v=ws.11)


## Questions
Using only `Policies > Windows Settings > Deployed Printers`, I couldn't understand how to remove previously deployed printers.

Perhaps I should use GPP (Preferences).