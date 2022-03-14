---
date: 2021-05-20
title: Switches
menu:
    sidebar:
        parent: Networking
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




## IEEE 802 1Q: Tagging and Trunking 101
Reference:
https://www.youtube.com/watch?v=vE5gvbmR8jg

Just for fun:
https://www.youtube.com/watch?v=WqAqeS4tDL8



Standard
- Defines a method of tagging traffic between two switches.
- To differenciate traffic between VLANs.
- Tagging is only necessary when going from one switch to another, to stay on the same VLAN.
- Types
    + Tagging VLANS (switch must support it)
    + Untagged or Port-based VLANs
        - Configured on the switch only.

Note:
On Windows, you may be able to setup vlan tagging on a NIC.
Not all NICs support VLAN tagging.
Only in Windows 10, you can set one VLAN tag for a NIC.
```
Set-NetAdapter -Name "Ethernet0" -VlanID <ID>
```


Trunk
- Aka. 802.1q Link
- Aka. trunk link
---
- Provides VLAN ID for frames traversing switches.
    + A trunk port adds a VLAN tag to each frames going outbound (to the other switch),
        the VLAN tag depends from which VLAN the frame comes from.
- Both ports (from their respective switches) should be set to trunk and allow the same trunk IDs.
    + In Cisco, they are called Trunk Ports.
    + Elsewhere, they are called Tagged Ports.
- By default, trunk links allow all VLANs.

Trunk Port
- Expects to receive tagged traffic.
+ Sends tagged traffic (adds the VLAN tag itself before sending the frame).

Access Port
- Aka. untagged port
- Port that expects and sends traffic without any VLAN tag.
    + In other words, an access port carries traffic only for one VLAN.
- The VLAN to which the port is part of is determined within the Switch, which manages which ports belong to which VLAN.
---
- A computer connected to an Access Port on a switch has no idea about VLANs.
- VLAN management (adding and processing) are a Switch's responsibility.



VLAN Trunking Protocol (VTP)

Dynamic Trunking Protocol (DTP)

Spanning Tree Protocol


- Switch
    + Default VLAN
        - By default, it's set to VLAN 1. 
            + For Cisco, and most other vendors.
        - Unless we assign a port to a specific VLAN, the port belongs to VLAN 1.
        - We cannot change the default VLAN.
        - We cannot delete the default VLAN.
        - Not intended to be used as a data VLAN.
            + Data traffic, such as traffic generated by computers.
    
    + Native VLAN
        - Specific to a trunk port.
        - All traffic from the specified NativeVLAN traverses on a trunk without being tagged.
        - Default: VLAN 1
            + We can set it to VLAN ID.
        - It should be the same on both ends (trunk ports) of a link between switches.
            + Because the traffic is untagged.
        - Cisco switches will detect a NativeVLAN mismatch on a trunk if any, and disable their respective trunk port.
            + That's the result of the CDP process.
            + However, NativeVLANs can be different on both ends of the trunk if need be.
        - Purpose
            + 1. Created for backward compatibility for devices that don't support VLANs.
            + 2. Used by the switch to carry specific control and management protocol traffic like:
                - Cisco Discovery Protocol (CDP),
                - VLAN Trunking Protocol (VTP),
                - Spanning Tree Protocol (STP),
                - LLDP, 
                - ...
            + 3. Also used for VoIP. 
        - Best Practice:
            + Change from VLAN01 to another unused VLAN that matches across all switches.

    + InterVLAN Routing
        - 1. Using a Router.
            + From the switch, we connect a port (Access Mode/Untagged) of each VLAN to a different router interface (port with a specific subnet).
            + In this configuration:
                - Router doesn't have to know about VLANs.
                - Requires as many ports (to the router) as there are VLANs (inconvenient).
        
        + 2. Router-on-a-stick
            + Switch is connected to a router via only one trunk port.
            + In this configuration:
                - Router must know about VLANs.
                - Router setups the connected port with sub interfaces.
                    + Each subinterface is configured as a default gateway for each VLAN.

        + 3. Multilayer Switch InterVLAN Routing
            + Requires only a Layer-3 Switch.
                - ie. no need for a router.
            + Switching and Routing is handling by the routing-able Switch.
            + Switch Virtual Interfaces (SVIs)
                - Logical interfaces that can act as gateways and perform routing.
                - They perform like interfaces on a router.
                - Each has an IP address on its own VLAN.
                    + Only one SVI per VLAN in the Switch.
                - They are virtual.



## Ethernet
Date: August 4, 2021
Industrial Ethernet 101 with PLC Product Manager, Jeff Southern. 
Topics: ethernet subnetting, VLANS, NAT and network segmentation.
https://www.youtube.com/watch?v=Lcg-7XeBwlo