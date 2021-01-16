# Differences VDI vs Session Host
+ RD Session Hosts
+ RD Virtualization Hosts (VDI)


## VDI
Virtual Desktop infrastructure.

From Awingu:

In VDI, the client connects to a dedicated host running a client version of Windows, such as Win7|10. The host will typically be a virtual machine dedicated to the client (won't be shared with other users). Users get admin rights, and can install apps themselves.

From an instructure standpoint, VDI is considered expensive as there's no resource sharing (every user has its own VM).

Microsoft has introduced Windows Virtual Desktop on Azure, which introduces multi-session Windows 10 (only available on Azure) to fix this problem. Users can access their VM using a new RDP client (using WVD's reverse connect technology) or RDWeb.


## Session Host
- Scenarios:
	+ Accessing an host (ie. Windows Server) (called RemoteDesktop)
	+ Accessing a single application (called RemoteApp)
- Resources are shared (users access the same host, or single application).


## Remote Desktop Services
- Prev. known as Terminal Server.
- RDS is a framework of roles.
	+ RD Session Host
		- Enables RemoteApp and RemoteDesktop.
	+ RD Virtualization Host
		- Enables connecting to virtual desktops using RemoteApp or mstsc.
	+ RD Connection Broker
		- Enables even load distribution across ..
			+ Session Hosts in a collection.
			+ Virtualization Hosts in a collection.
		- In simple deployments, the Connection Broker is not required.
	+ RD Gateway
		- Enables authorized users to connect over a private network or the internet.
		+ Basically, enables secure access for connections from a public network.
	+ RD Web Access
		+ Presents a dashboard displaying available RemoteApps and Desktops.
	+ RD Licensing
		- Enables serever to manage RDS client access licenses (RDS CALs).
		- Licenses are managed through the RD License Manager app.



## Licensing
For the Session Host scenario, you need:

- License for Windows Server.
- RDS CAL for every connection.
	+ Per Device
		- CAL is assigned to a specific device.
		- Tracked by the license server (regardless of AD membership).
		- Can revoke up to 20% of CALs.
	+ Per User
		- CAL is assigned to a user in A.D.
		- Cannot revoke any CAL.
- CALs aren't upward compatible, only downwards.
	+ Which means a cal for Win2008 isn't compatible for Win2016.