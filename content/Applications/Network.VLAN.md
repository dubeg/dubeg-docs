---
date: 2021-05-20
title: Network - Switches
menu:
    sidebar:
        parent: Applications
---

## Common terms
- VLAN: 
    + Virtual Local Area Network
    + logical identifier for isolating a network.
    + may be tagged, or untagged.

- Trunk: port enabled for VLAN tagging

- Access: port that does not tag and only accepts a single VLAN

- Encapsulation: process of modifying frames of data to include additional information

- 802.1Q: most common encapsulation method for VLAN tagging.  This is the method used by Meraki devices.

- Native VLAN: the VLAN associated with all untagged traffic on a trunk


## VLAN
- Separate a network/switch into N network/switch.
- Each VLAN has its own broadcast domain.
- Communication between VLANs can't happen unless a link connects them together.
    + Link may be a gateway (IP), a cable, or a trunk port.
- Types
    + Port-based VLANs (untagged)
        - A switch is divided into multiple virtual switches.
    + Tagged VLANs

## Trunk
- Trunking
    + Link aggregation
        - Use N ethernet links to act as one.
    + VLAN Trunking
        * Single channel carrying N signals.
        - Switch -> Configure port in Trunk mode
            + Port behaves as though it is part of multiple VLANs.
        
        * A trunk port marks frames with an identifying tag as they exit the port (outbound).

        * Therefore tagging is meant for inter-switches VLAN communication (frames are kept in their assigned VLAN).

        * Both trunk ports linking the two switches must expect tagged frames (be in trunk mode).

        * If a trunk port receives untagged frames from its link (inbound), it may ignore or pass through those frames to a user-specified default VLAN.
        
        * This is not absolute since switches can also be configured to drop untagged frames called broadcast filtering. If an untagged frame is received, it is not likely traffic to be routed but a device requesting a DHCP address or sending an ARP request to determine what MAC address holds a specific IP address, or similar.

        * As a tagged frame arrives at the end of the trunk link, its tag is removed and the frame is sent to the correct access link port according to the switch's table, so that the receiving end is unaware of any VLAN information.

        * The most common trunking protocol, IEEE 802.1Q, adds a tag to the Ethernet frame as it passes through, marking it as belonging to a specific VLAN.
        
        * Trunk: 
            + Symmetrical
                - Allows any port within a group to transmit packets to any other port.
            + Asymmetrical
                - Allows only one port on a switch to receive packets


Access port
- Assigned to a single vlan.
- Ignore tagged packets (is it true in all cases?)


Trunk port
- Assigned to multiple vlans.
- Uses a tagging protocol to distinguish between them.


## References
+ www.inteltech.com/blog/how-do-vlans-work/
