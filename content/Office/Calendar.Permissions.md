---
date: 2021-03-09
title: Calendar
menu:
    sidebar:
        parent: Office
---

## Permissions
```powershell
# -----------------------
# Docs:
# - support.office.com/en-us/article/share-an-outlook-calendar-with-other-people-353ed2c1-3ec5-449d-8c73-6931a0adab88
# - theitbros.com/add-calendar-permissions-in-office-365-via-powershell/
# - answers.microsoft.com/en-us/msoffice/forum/all/cannot-share-a-calendar-to-group/6260eaea-85cd-4151-8f56-a921164e676d
# - docs.microsoft.com/en-us/powershell/exchange/exchange-online/exchange-online-powershell-v2/exchange-online-powershell-v2
# -----------------------
Set-ExecutionPolicy RemoteSigned
Install-Module ExchangeOnlineManagement
Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline
Get-EXOMailboxFolderPermission -Identity gdube@ad.ca:\Calendar

# If this command returns that 'username:\calendar' cannot be found, 
# it probably means that the user has Outlook language settings other than English. 
# Indeed, the calendar's default name is dependant on the user's language configuration.

# Get calendars' names:
$calendars = Get-EXOMailbox | 
	Get-EXOMailboxFolderStatistics -FolderScope Calendar | 
	Where Name -like 'calend*'

# ------------
# Bulk
# ------------
$calendars | 
	% { $_.Identity -Replace "\\",":\" } | 
	% { Get-EXOMailboxFolderPermission -Identity $_ -User "Default"  } | 
	Format-Table

$calendars | 
	% { $_.Identity -Replace "\\",":\" } | 
	% { Set-MailboxFolderPermission -Identity $_ -User "Default" -AccessRights Reviewer }


# ------------
# Single
# ------------
Set-MailboxFolderPermission `
	-Identity gdube@ad.ca:\Calendar `
	-User "Default" `
	-AccessRights Reviewer
```
- AccessRights:
	+ __Owner__: read, create, modify and delete all items and folders. Also this role allows manage items permissions;
	+ __PublishingEditor__: read, create, modify and delete items/subfolders;
	+ __Editor__: read, create, modify and delete items;
	+ __PublishingAuthor__: read, create all items/subfolders. You can modify and delete only items you create;
	+ __Author__: create and read items; edit and delete own items NonEditingAuthor – full read access and create items. You can delete only your own items;
	+ __Contributor__: create items and folders.
	+ __Reviewer__: read-only, full details.
	+ __AvailabilityOnly__: read-only, free/busy.
	+ __LimitedDetails__ - read-only, free/busy, subject, location.
	+ __None__: no permissions.	