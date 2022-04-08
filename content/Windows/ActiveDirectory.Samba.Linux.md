# ActiveDirectory & Samba via Kerberos

## Active Directory
- Microsoft's central user database
	- Successor to NT4-based Security Account Manager (SAM).
- Keberos KDC with an LDAP database backend.
- Multi-Master replicated LDAP database
- Highly specific LDAP schema with custom extensions.
	+ A lot of internal magic & validity checks.
- Authentication server for Challenge-Response based schemes.
- DNS database for server lookup.
- Often very complex setup of many domains (Realms).
	+ Cross-Realm authentication is common.



## Samba
- Implementation of many Microsoft protocols
	- SMB for file services
	- SMB & DCE-RPC for print services
	- RPC for user database services
	- Kerberos, DNS, LDAP, etc.
- NT4 compatible Domain Controller.
- Active Directory Domain Controller.
- Active Directory Domain Member.
	+ Make AD users and groups available to Linux/UNIX.



## Authentication mechanisms
- telnet/ftp
	+ Salted

- ssh
	+ Plain text passwords encrypted using public key crypto.
	+ Also, public key authentication.

- Challenge/Response
	+ Plain text passwords on server's disk.

- Kerberos (version of Challenge/Response)
	+ Plain text passwords on KDC disk.


## NTLM vs Kerberos
- NTLM
	+ Microsoft's Challenge Response authentication protocol
	+ Not as bad as it used to be.
	+ Modern versions are reasonably secure.
	+ For every authentication, the DC must be asked.
		- Causes high load on the DC.

- Kerberos
	+ Based on signed tickets, with lifetime.
	+ Reduced load on the DC due to ticket caching on clients.
	+ Can be very picky.
		- Time desync causes issues.
		- Server must be contacted by it's name.
			- IP Addresses don't work.
			- If DNS server is unavailable, it doesn't work.
		- KDC must be reachable from client, not just the target service.
		- Because of the downsides, NTLM should be available as a fallback.
	---
	+ Workstation/server has to trust the DC.
		- Trust based on a shared secret (workstation password).
		- DC proves that it knows the workstation password.
		- In Kerberos-speak, that's a machine principal & keytab (?).



## Samba's winbind
- Daemon responsible for all DC traffic.
- Domain Controller lookup
	+ DNS SRV records
	+ CLDAP
	+ NetBIOS
- Establishes encrypted and verified DC connection.
- All Microsoft RPC is done by winbind.
- Machine password changed regularly.
	+ Maintenance of the trust account.
- Very simple socket interface on /tmp/.winbindd/pipe
- Samba's PAM & NSS modules redirect to winbind.
- Tries to do exactly what Windows clients do.

- Authentication is done via Kerberos or NTLM via winbind.
- Authorization
	+ Uses permissions from ACLs.
	+ ACLs are defined for User IDs & Group IDs.




## References
https://www.youtube.com/watch?v=2jguRiiVkZ8