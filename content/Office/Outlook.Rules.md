---
date: 2017-08-31
title: Outlook
menu:
    sidebar:
        parent: Office
---

Notes on issues encountered with Outlook.

## Emails from people being unintentionally moved to other folders 

> To filter messages you receive as a member of a public group, we recommend using a `sent to` condition.

> A `from` condition will apply the rule to all messages received from any member of the public group.

__Additional details__

The problem you're running into is that a Group is basically an alias for a collection of email address and contact objects; not a standalone object, and not just a list of strings containing email addresses.

So when you reference group, you're actually referencing all member objects in it.

Similar to when you send to a group, it doesn't send it to the group's mail box (cause there's no such thing), instead, the server receives it and sends a copy to each recipient in the group.

So you're saying "Move all messages received from people in this group to X", yet you don't want it to move when you receive email from people in the group. Your 2 wishes directly conflict.

If you want to do a plain-text search and move based on what the group is named, instead of what it represents, then use the text-in-header rule you've suggested, and live with possible false positives.

Unfortunately one gotcha is that, unlike a regular "from" rule, this rule will be client-side only. Meaning it'll only work when your copy of Outlook (that has the rule) is being actively used.

Additionally, in Outlook 2013 (I believe that's the first version with it) they've added a new rule that's very similar to the message Headers rule, only it's "with specific words in the sender's address".

Either will work, but the second will help avoid the false positives you suggest (i.e.: it being filtered because the address is in the subject, etc.).

[Reference](https://superuser.com/questions/885577/exchange-mail-rule-triggering-on-a-from-address-that-is-a-public-group)






## ActiveSync not working for some user
When attempting to Sync a mobile device with an exchange email address using ActiveSync functionality you may find that although the email profile appears to set up correctly and connect to the exchange server emails will refuse to sync. With this specific issue the account in question will have previously been migrated from exchange 2003. 

This problem is caused by background exchange permissions not properly inheriting after the account migration. this problem can be resolved by following the instructions below.

Open the users profile in active directory 
Open the security tab
Open the advanced options from within the security tab
Ensure Include Inheritable Permissions From This Object’s Parent is ticked. 
 

After following the above instructions recreate the mail profile on the phone and emails will sync as usual. 

 

If this problem occurs on an admin user you may find that this solution works for a short period of time and then resets. This is due to  Active Directory using  the AdminSDHolder to define what permissions the default protected security groups receive. every 60 minutes a process called SDPROP will run on the domain controller that holds the PDCe role. It will check the ACL of the protected groups and reset their inherited permissions and the users within the groups with what has been defined by the AdminSDHolder object.

Unfortunately there is no simple resolution for this and microsofts official recommendation as well as best practice is two have two accounts, One for administrator purposes (non mail enabled) and another for day to day work. 


### References
- https://technet.microsoft.com/en-us/library/2009.09.sdadminholder.aspx
- http://www.rivnet.ro/2014/03/delete-leaf-objects-from-active-directory-user-object.html