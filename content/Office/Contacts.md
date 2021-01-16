---
date: 2020-04-23
title: Contacts
menu:
    sidebar:
        parent: Office
---

Types

- Personal contacts (within a Mailbox)
- Mail Contacts (Organization-wide)
	+ Sync with Outlook mobile?
	+ Available in Outlook for Desktop?
	+ docs.microsoft.com/en-us/exchange/recipients-in-exchange-online/manage-mail-contacts#what-do-you-need-to-know-before-you-begin


## Mail Contacts
- Use Powershell cmdlets for Exchange online
	+ Get-MailContact
	+ Set-MailContact


## Personal Contacts
- Can't use the powershell cmdlets for Exchange Online to manage them.
- Use MAPI COM Objects
	+ New-Object -ComObject Outlook.Application
- Use Managed Exchange Web Services (deprecated in 2018)
- Use Microsoft Graph


MAPI
```
$olApp = new-object -comobject outlook.application
$namespace = $olApp.GetNamespace("MAPI")
$Contacts = $namespace.GetDefaultFolder(10)
foreach ($Entry in $Contacts.Items)
{
    if ($Entry.Email1Address -like "*foobar*")
    {
        $newAddress = $Entry.Email1Address -replace "foobar.com", "foobar.co.uk"
        $Entry.Email1Address = $newAddress
        $Entry.Save()
    }
}
$olApp.Quit | Out-Null
[GC]::Collect()
```



Graph

- Register your app
    + portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
    + Register a new application in your tenant's Active Directory to support work users for your tenant(s)
        - In
            + Name
            + AccountType
            + Redirect URI
        - Out
            + AppID: (client)
            + DirectoryID: (tenant)
            + ObjectID: ?
    + Set permissions
        - Contacts.ReadWrite
        + User.Read
- Authenticate
    + MASL: authenticate against Azure AD.
        - github.com/AzureAD/microsoft-authentication-library-for-dotnet

```
dotnet new console
dotnet add package Microsoft.Graph
dotnet add package Microsoft.Identity.Client
```