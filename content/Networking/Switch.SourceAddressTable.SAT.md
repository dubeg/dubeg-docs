
## Source Address Table (SAT)
- Pairs of (MAC Address, Port)

Upon booting, a switch reads the MAC Addresses on all connected ports.

However, a switch doesn't update its SAT table until it receives a frame from a newly connected device: it doesn't know automatically.

When a device sends a frame to another device (the source device knows the target IP, but not the target MAC Address), it broadcasts a frame using the broadcast MAC Address (all 'F'). ie. the switch broadcasts the frame to all ports. When the target device replies back, the switch sees it and updates its SAT table.

The frame sent from a device to the switch using broadcasting to identify the MAC address of its target using its IP Address is part of ARP.



## Address Resolution Protocol (ARP)
- Maps an IP address to a MAC Address.
- Used by a device to finds the MAC Address of another device using its IP Address (target).

ie. fn(IpAddr) -> MacAddr

Each device has its own ARP cache, ie. dictionary of (IP Address, MAC Address).

```
arp -a
```

Dynamic: address retrieved by an ARP request.
Static: address manually entered in the ARP cache.