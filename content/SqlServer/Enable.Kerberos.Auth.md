## Kerberos
Requirements:

- Client and Server must join a domain, and the trusted third party exists; if client and server are in different domain, these two domains must be configured as two-way trust.
- Registered SPN. 
	+ Service Principal Name(SPNs) are unique identifiers for services running on servers. Each service  that will use Kerberos authentication needs to have an SPN set for it so that clients can identify the service on the network. It is registered in Active Directory under either a computer account or a user account.

### Service Principal Name
An SPN for SQL Server is composed of the following elements:

- ServiceClass
	+ Identifies the general class of service.
	+ Always MSSQLSvc for SQL Server.
- Host
	+ Fully qualified domain name DNS of the computer running SQL Server.
- Port

Ex: MSSQLSvc/myserver.corp.mycomany.com:1433



Named instance

- MSSQLSvc/<FQDN>:[<port> | <instancename>], where:
	+ MSSQLSvc is the service that is being registered.
	+ <FQDN> is the fully qualified domain name of the server.
	+ <port> is the TCP port number.
	+ <instancename> is the name of the SQL Server instance.

Default instance

+ MSSQLSvc/<FQDN>:<port> | MSSQLSvc/<FQDN>, where:
	+ MSSQLSvc is the service that is being registered.
	+ <FQDN> is the fully qualified domain name of the server.
	+ <port> is the TCP port number.



## NTLM
When are Kerbers and NTLM applied when connect to SQL Server 2005.

Under condition that you are using Integrated Security or trusted connection which use windows authentication.

1) Kerberos is used when making remote connection over TCP/IP if SPN presents.

2) Kerberos is used when making local tcp connection on XP if SPN presents.

3) NTLM is used when making local connection on WIN 2K3.

4) NTLM is used over NP connection.

5) NTLM is used over TCP connection if not found SPN.
