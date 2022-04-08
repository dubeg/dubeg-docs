
PortFast
- Typically configured on access ports only.
- On ports that aren't expected to send bridge protocol data units.
- These features are typically not enabled on ports that connect to switches, because spanningtree loops can occur.
- BPDU Filtering & Guard
	+ Both can't be enabled at the same time.
		- ie. Guard doesn't do anything, because Filtering will prevent
			BPDUs from being seen by the port.
	+ Filtering:
		- Blocks the send/receipt of BPDUs through all ports.
		- This effectively disables STP on PortFast-enabled ports.
	+ Guard:
		- Shuts down a port if it receives a BPDU.