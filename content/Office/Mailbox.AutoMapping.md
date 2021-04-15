---
date: 2021-03-09
title: Mailbox Auto-Mapping
menu:
    sidebar:
        parent: Office
---

When a user is added as a delegate with `FullAccess` on a mailbox, a property called `AutoMapping` is set which will make their desktop Outlook client to automatically add the mailbox in the sidebar. This can be annoying if the user doesn't want to see it.

To avoid having that behavior turned on, you can add the permission using a cmdlet.

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