---
date: 2021-01-27
title: Mapping Drives
menu:
    sidebar:
        parent: GPO
---
- Location
	+ IP
	+ FQDN, eg. `\\Server\SharedFolder`.
+ Reconnect
	+ Drive will be reconnected upon reboot.
	+ DUBEG: what does it mean? Won't it be reconnected anyway via the GPO?
		- Is it merely setting the PERSISTENT flag of `net use`?
		- After thinking about it more, I think it is. I recall someone saying group policies can sometimes take a while to apply, and meanwhile a user might already be active in its session. The RECONNECT option would then make it so drives are already mapped at logon, that is, without having to wait on the drive mapping gpo to apply.

- Action
	+ Create
		- Creates a new drive mapping.
		- If the drive (letter) is already mapped, it won't do anything.
	+ Delete | Remove
		- Deletes a mapped drive.
	+ Replace
		- Deletes the drive if already mapped, then creates it.
		- DUBEG: 
			+ GPOs are regularly re-applied during the day in active user sessions.
		  	+ This creates a problem with REPLACE drives, since drives might be deleted & re-mapped while a user is active in its session.
		  	+ The user might have File Explorer opened at a location of one of these drives, and in that case its window will close seemingly unexplicably: no message or warning displayed.
	+ Update
		- If the drive doesn't exist, it will be created.
		- If it already exists, then it modifies its settings (whatever that means).
			- It won't update the drive path.
				+ Because that would require re-creating the mapping, ie. removing the mapped drive.
			- It might update:
				+ Label (TBD)
				+ Reconnect (TBD)
				+ Show / hide (TBD)


## NET USE
- /PERSISTENT:YES|NO
	+ If it was ever set to `YES`, it will remain so until the mapped is deleted or until the PERSISTENT flag is specified again.


## Disable Background processing for Drive Mappings
```
Computer Policy\System\Group Policy\Configure Drive Maps preference extension policy processing
	[x] Do not apply during periodic background processing
```

## Additional Notes
- Case 1: Update with Reconnect option
	+ This is the lesser of the evils. Drives map correctly on first logon. Everything seems fine. But when you change the location of the drive (say you've moved some file shares to a new server), it will not update on it's own. You (of the user) must disconnect the drive and re-login for the network drive to update. This seems to be an issue with Reconnect only.

- Case 2: Update without Reconnect option
	+ This seems to solve the issue of updating the drive location. But, the network drive may disappear if the computer cannot access the server when the policy is applied. This can be problematic for mobile users.

- Case 3: Replace (with or without Reconnect)
	+ Lovely replace. This works great for Windows 7 users. But for Windows 8 and greater, this has come back to bite me several times, each occurrence wasting much time determining the true cause. When a Group Policy update is applied in the background (standard in Windows 8 & 10, I believe), the drives are deleted and created anew. This causes issues with applications that rely on the connection to that network drive. The application will spout some odd looking error message that may or may not point to the drive being disconnected. Even if the user is not using the drive, I have heard comments about users watching their drives disappear and then re-appear, one by one. Overall, I just cannot consider this an option worth using.

- Case 4: Using a Script
	+ Run a script on logon. Make sure the correct drives are there, point the correct location. No refreshing in the background. If you need to change the location, just update the script. Life is good. Until you have to manage a ton of different scripts, who needs to run which and whatnot. On a small scale, this may work. But, Group Policy just makes that part so much easier.


- Reference
	+ social.technet.microsoft.com/Forums/Office/en-US/06c53d39-4807-4c5c-b37b-b0f39e4bf79d/#e0616756-942a-45f5-a1db-cf641f8dfbb5


