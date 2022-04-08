# Cisco - Spanning tree Protocol

- CST
	+ Date: 1990
	+ IEEE 802.1D
	+ Original STP protocol
	+ One instance for all VLANs
	+ No rapid convergence (based on timers)

- PVST/PVST+
	+ Date: ...
	+ Cisco proprietary
	+ Per-VLAN Spanning tree
	+ Each VLAN has its own root and calculations.
	+ Each VLAN sends BPDUs every 2s.
	+ No fast convergence
	+ PVST: supported only on ISL (and not across 802.1Q trunks)
	+ PVST+: supported across 802.1Q trunks


- RSTP
	+ Date: 2001
	+ IEEE 802.1w
	+ One instance for all VLANs
	+ Single root for entire topology
	+ Fast converge

- RPVST+
	+ Date: ...
	+ Cisco proprietary
	+ Per-VLAN Spanning tree
	+ Fast convergence.
	+ Cons:
		- Requires more CPU & memory
		- The more vlans, the more traffic it generates.

- MSTP
	+ Date: ...
	+ IEEE 802.1s
	+ VLANs are mapped to groups.
	+ One SpanningTree per group.
	+ Pros:
		- High redundancy
		- Load balancing
		- Lower CPU/memory



## Spanning Tree
A spanning tree has no loop.

1. It selects one switch as the root "bridge".
	- ie. top node of the tree.
	- Lowest bridge ID (which is composed of the pair (Priority, MacAddress))
		+ SELECT TOP 1
		+ ORDER BY 
			- Priority ASC
			- MacAddress ASC

2. It chooses the shortest path (least cost) from a switch to the root.

3. It blocks links that could cause loops,
	while maintaining these links as backups.

- Fault tolerance: stp can activate a blocked link if one breaks.


https://www.youtube.com/watch?v=Ilpmn-H8UgE
https://www.youtube.com/watch?v=BkGEwrzIK4g



## Misc
PVST+: 
- Per-VLAN spanning tree (default for most cisco switches)
	+ ie. run a spanning-tree instance per vlan.
	+ enables having a different root bridge on different vlans

RSTP: rapid stp
- Enhancement over stp.
- Doesn't work with timers, as stp does,
	+ Stp takes about 30-50 seconds to converge because of timer usage.

STP
- Can use port-fast for ports not connected to other switches.
- All ports connected to other switches need to transition from blocking to listening.