# Cisco - STP - Root Election

BPDU: bridge protocol data unit
- Frame containing information about spanning tree protocol.

Hello BPDU: 
- Used by switches/bridges to share information about themselves.
- Used for:
	- Electing a root bridge,
	- Determining port roles (DesignatedPort vs RootPort)
	- Determining port states (Configuration, Listening, ?),
	- Blocking unwanted links
- Fields
	+ Root ID: root bridge BID
	+ Root path cost
	+ Bridge ID: 
		- BPDU sender's BID
		- Aka. source bridge ID


Election process
- Each switch sends out a 'Hello BPDU' frame on their trunk ports.
	+ ie. each switch declares itself the root bridge.
	+ Frame:
		- Root ID: their own BID
		- Root path cost: 0
		- Bridge ID: their own BID
- Each switch, upon receiving a 'Hello BPDU' frame:
	+ If its BID is lower than the received BPDU's, it generates a new 'Hello BPDU' with
		the winning 'Root ID'.
	---
	+ Repeat until all received & sent BPDUs agree on the Root ID.

Once the Root ID is decided, the path cost to the root bridge is calculated
Then, ports, etc.

Then, root bridge multicasts 'Hello BPDU's on its trunk ports every 2s.
Sometimes, we want a specific switch to become the root bridge for whatever reason.
To do so, we simply configure the root switch with a low 'Priority' value.