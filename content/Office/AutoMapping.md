---
date: 2021-03-09
title: Mailbox Auto-Mapping
menu:
    sidebar:
        parent: Office
---

```
Connect-ExchangeOnline
Remove-MailboxPermission `
	-Identity <ID> `
	-User <ID> ` `
	-AccessRights FullAccess

Add-MailboxPermission `
	-Identity <ID> `
	-User <ID> `
	-AccessRights FullAccess `
	-AutoMapping:$false
```


There's no real way to query for AutoMapping status on a mailbox.

Some user suggested this, however I'm not sure it indicates what we want.
```
(Get-Mailboxpermission <ID> -ReadFromDomainController)[0].DelegateListLink
```