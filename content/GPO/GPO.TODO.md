# GPO
- Computer startup: Computer Policies are applied.
- User logs on interactively: user profile is loaded, then User Policies are applied.
- Policies are also re-applied every 90 minutes (+0-30 minutes offset, randomly chosen), by default.
	+ Both Computer and User policies
	+ Security policy settings
		- If policy targets a group, and user has been added to that group after it logged on, user might need to re-login or refresh its Kerberos token.
	+ Registry-based policies
		- Attention: even though a registry policy may be applied during a background refresh,
		  the actual service or program using the registry key might only read it when it launches.
		  That's why you might need to restart the whole computer, even if the policy has been applied, to force the service/program to restart & read the updated regkey. If you know the actual service/program using that key, you can always try to restart it manually, unless Windows won't like it.
	+ Not: Application deployment (Software installation)
	+ Not: Folder redirection settings
	+ Not: Scripts extension
		- Policy will be refreshed, but scripts will only be run at computer startup or user logon.
	+ Not: unmodified GPO
		- GPOs use a version number.
		- Once applied, they are not reapplied unless the version number changes or the gpupdate /force commmand is run.
		- GPO can also be marked as "Enforced" to be re-applied.
- Policies can also be applied on demand.
	+ gpupdate



## Processing
- When applying policies, the system queries AD for a list of GPOs to process.
- Each GPO is linked to an AD container (OU, etc), in which a user or computer belongs.
- The system checks the ACL associated with the GPO.


## Administrative Templates
Microsoft frequently publishes new templates for new versions of Windows. Each template bundle includes policies from all previous versions, so just install the latest templates on your Domain Controller.

- Install the templates bundle from microsoft.com.
	+ Goto: docs.microsoft.com/en-us/troubleshoot/windows-client/group-policy/create-and-manage-central-store
	+ Download latest, such as: `Administrative Templates (.admx) for Windows 10 October 2020 Update (20H2)`
	+ Install locally, or on server (it doesn't matter).
- Goto the Domain Controller's folder storing the templates.
	+ Eg. `\\<DomainController>\SYSVOL\<DomainName>\Policies\PolicyDefinitions`
	+ The PolicyDefinitions may not exist, in that case the default templates are currently used.
	+ Once that folder will exist and be populated, those templates will be used instead.
- Copy the recently installed templates, from its install location to the DC's templates folder.
	+ From: `C:\Program Files (x86)\Microsoft Group Policy\<version-specific>\PolicyDefinitions`
	+ To: `\\<DomainController>\SYSVOL\<DomainName>\Policies\PolicyDefinitions`
	* It is recommended that you use multiple `PolicyDefinitions-<version>`, to be able to quickly go back to previous templates if an issue arises.
		+ `..\Policies\PolicyDefinitions`
			* Templates currently in use.
		+ `..\Policies\PolicyDefinitions-1909`
		+ `..\Policies\PolicyDefinitions-20H1`
		+ `..\Policies\PolicyDefinitions-20H2`
		+ ...
- Open GPO Management.