---
date: 2020-07-30
title: Groups
menu:
    sidebar:
        parent: Office
---


- Owns Exchange Mailbox (email and calendar)
- Owns Sharepoint Site Collection
- Owns Teams Chatroom
- Planner..
- Power BI..
- Yammer..


Like AD Security Groups, but with provisioning (automatically creates resources for the group) and centralized management (Office 365 Admin vs each product's admin page).


Notes

- Anyone can create groups by default.
- Ability to restrict which resources are provisionned for them.
- A group is created automatically from any of these:
	+ Planner - new plan
	+ SharePoint - new site collection
	+ Outlook - new group (D.L.?)
	+ Power BI - new workspace.
	+ Teams - new team.
	+ ...
+ Can still create resources without being connected to a group.
	+ Ex: standalone Site Collection (not default option).
+ Up to 10 owners.
+ External Members are called Guests (!= External Users in SharePoint).
+ May be Public or Private.
	- Public: anyone can see its content.
	- Private: only group members can see its content.
+ Has its own mailbox.
	+ Setting to send copies of emails received to its new members.
	+ For existing members, either they have to subscribe themselves to receive emails in their inbox
	  by following the group, or I can force them manually.

```
Get-UnifiedGroup <groupEmail> | Get-UnifiedGroupLinks -LinkType Members
Get-UnifiedGroup <groupEmail> | Get-UnifiedGroupLinks -LinkType Subscribers
Add-UnifiedGroupLinks
	-Identity <groupEmail>
	-LinkType Subscribers 
	-Links <memberEmail>
```


## Teams with Sharepoint
- Only works with top-level Sites.
- Site
	+ Team
		- Backed by an Office 365 group.
		- Usually organized by department or project.
	+ Communication
		- Focused on broadcasting information.



## Hidden Groups
When groups are created from Microsoft Teams, they are hidden from Outlook clients by default.

To make a group visible in Outlook (web), do as follows.

- Use Windows Powershell with Exchange Online package.
	+ The cmdlet doesn't appear in pwsh, even though I imported ExchangeOnline using `-UseWindowsPowershell`.
- Use the exact syntax when setting the `-Hidden...` parameter. Otherwise, it doesn't work.

```
Set-UnifiedGroup -Identity <groupName> -HiddenFromExchangeClientsEnabled:$false
```

- Reference: techcommunity.microsoft.com/t5/microsoft-365-groups/office-365-groups-not-visible-in-outlook-client/m-p/275611