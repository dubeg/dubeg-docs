# Mapping Drives (GPO Edition)
- Location
	+ IP
	+ FQDN, eg. `\\Server\SharedFolder`.
+ Reconnect
	+ Drive will be reconnected upon reboot.
	+ DUBEG: what does it mean? Won't it be reconnected anyway via the GPO?
	+ Is it merely setting the PERSISTENT flag of `net use`?
- Action
	+ Create
		- Creates a new drive mapping.
	+ Delete | Remove
		- Deletes a mapped drive.
	+ Replace
		- First, deletes the mapped drive, then create it.
			+ If the map drive doesn't already exist, nothing bad will happen.
			  The drive will still be mapped.
		- This overwrites all existing settings that are associated with the mapped drive.
		- DUBEG: somehow GPOs are regularly re-applied during the day in active user sessions.
		  This creates a problem with REPLACE drives, since drives will be deleted & re-mapped.
		  This affects users that have a FileExplorer window opened at a location in such a drive.
		  The window will be seemingly unexplicably closed, without a logged crash or error message displayed.
	+ Update
		- Modifies the settings of an existing drive.
		- If the drive doesn't exist, it will be created.
		- Only updates the settings defined within the preference item.
		- All other settings remain as they are.
			+ Does not update the drive location.
			+ Does not update the drive name.

## net use
- PERSISTENT
	+ If it was ever set to yes, it will remain until the mapped is deleted or until the PERSISTENT flag is specified again.



## Case: change location of a mapped drive
- Use the Replace action until all comuters are updated.
	+ DUBEG: how should I do this? Set it up, let it run for a few weeks?

There's a way to run a GPO before another that's link on the same OU, by using the Link Order to our advantage.
- Click on the targeted OU.
- Go to: Linked Group Policy Objects.
- Change the link order.

There's a way to delete a drive before re-mapping it, using the map drive order.

GPO Options
+ Remove this item when it is no longer applied.
	* What does it mean? Is it related to Item-Level Targeting?
+ Apply once and do not reapply.
	* What does it mean?




## Additional Notes
- Case 1: Update with Reconnect option
	+ This is the lesser of the evils. Drives map correctly on first logon. Everything seems fine. But when you change the location of the drive (say you've moved some file shares to a new server), it will not update on it's own. You (of the user) must disconnect the drive and re-login for the network drive to update. This seems to be an issue with Reconnect only.

- Case 2: Update without Reconnect option
	+ This seems to solve the issue of updating the drive location. But, the network drive may disappear if the computer cannot access the server when the policy is applied. This can be problematic for mobile users.

- Case 3: Replace (with or without Reconnect)
	+ Lovely replace. This works great for Windows 7 users. But for Windows 8 and greater, this has come back to bite me several times, each occurrence wasting much time determining the true cause. When a Group Policy update is applied in the background (standard in Windows 8 & 10, I believe), the drives are deleted and created anew. This causes issues with applications that rely on the connection to that network drive. The application will spout some odd looking error message that may or may not point to the drive being disconnected. Even if the user is not using the drive, I have heard comments about users watching their drives disappear and then re-appear, one by one. Overall, I just cannot consider this an option worth using.

- Case 4: Using a Script
	+ Run a script on logon. Make sure the correct drives are there, point the correct location. No refreshing in the background. If you need to change the location, just update the script. Life is good. Until you have to manage a ton of different scripts, who needs to run which and whatnot. On a small scale, this may work. But, Group Policy just makes that part so much easier.


## Disable Background processing for Drive Mappings
- Reference: social.technet.microsoft.com/Forums/Office/en-US/06c53d39-4807-4c5c-b37b-b0f39e4bf79d/group-policy-user-drive-mapping-is-set-to-update-how-to-disconnect-while-keeping-update-setting?forum=winserverGP#e0616756-942a-45f5-a1db-cf641f8dfbb5


Computer Policy
```
SYSTEM\Group Policy\Configure Drive Maps preference extension policy processing
	Do not apply during periodic background processing: Enabled
```