---
date: 2020-05-02
title: Group Policies
menu:
    sidebar:
        parent: GPO
---

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