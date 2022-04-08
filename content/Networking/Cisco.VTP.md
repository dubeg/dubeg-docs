# Cisco - VLAN Trunking Protocol (VTP)
Provides centralized VLAN management.

Goal: 
Configure VLANs across switches in a network.
Without VTP, we would have to configure each switch separately.
We'd have to create VLANs manually on each switch.

Requires:
- 1x VTP Server
- All switches can then request VTP configuration from the VTP server.

- Domain
	+ Identified by its name.
	+ Consists of a group of interconnected switches.
	+ All switches in a domain share VLAN configuration details.
	---
	+ Switches must be configured with a VTP domain name.
	+ A switch can only be a member of one VTP domain at a time.

- Modes
	+ VTP Server
	+ VTP Client
	+ Transparent
	---
	- By default, all Cisco switches are VTP servers.
	- Oftentimes, each VTP domain have two duplicate VTP servers.
		+ To provide redundancy.
	- VTP clients cannot manage their VLANs locally.
		+ ie. can't have other VLANs aside from those defined by their VTP server.
	- Transparent: does not participate in a VTP domain.

- Configuration revision number