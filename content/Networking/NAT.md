---
date: 2021-01-27
title: NAT
menu:
    sidebar:
        parent: Networking
---
*__Attention__: there are many types of NAT, and different people use the same NAT words to mean different things.*

Common type of NAT:

- Allows a router to act as an internet gateway for `1..N` internal / LAN devices.
- The many LAN devices in the network appear as one device (the router) to external networks.
- Configured in a router.
- Router translates:
   + outbound packets: source IP to its own public / WAN IP.
   + inbound packets: destination IP to an internal IP.
   + Using a NAT Table of mappings
      - Each entry: `srcIP:Port <-> routerIP:routerPort`
      - Entries are added as connections are created.
      - Entries are deleted as connections are closed.
         + DUBEG: is it router timing-out connections? If no traffic within x time, remove the entry?


## Mechanism
Concepts
- Endpoint
   + Combination of an IP Address and a port. 
   + Unique to a host.
- Connection
   + Uniquely defined by two endpoints:
      - Source IP & Port
      - Destination IP & Port

Workflow
- A LAN device sends packets to a public host, using its internal IP & a port.
- Router replaces the source endpoint of those packets with an endpoint of its own.
   + It finds a port that it doesn't currently use, and use that along with its public IP to replace the source endpoint.
- Router saves the mapping in its NAT table, and from now on it will route any inbound packet targeting the translated endpoint until the timeout expires.





## Modes
Now that we've gone through the details of the most common type of NAT, let's look at the other types.

_The different types of NAT don't all do the same work, therefore the structure of a NAT Table is specific to its type._

- Static NAT
   + Each entry maps a private IP to a different public IP.
      - Two entries can't have the same public IP.
   + Ony thing that changes is the IP, not the port.
   - DUBEG: so you need to register/buy public IPs from an ISP.

- Dynamic NAT
   + Works in the same way that Static NAT does, with one difference.
   + Instead of mapping 1:1, it maps one private IP to a public IP from a specified range.
   + Therefore, a device's public IP may change from one connection to another.
   + Once a mapping times out, the public IP is returned to the pool awaiting re-use.

- NAT Overload (common type)
   + Aka. Port Address Translation (PAT)
   + Aka. Network Address Port Translation (NAPT)
   + Aka. IP Masquerading
   + Aka. NAT with PAT
   + _Used for your home connection._
   + One public IP address is used for all internal devices
   + A different _router_ port is used for each internal endpoint, ie. `iAddress:iPort`.



## NAT Classes
Consider the following NAT mapping: `iAddr:iPort -> eAddr:ePort`
   + `i` denoting the internal endpoint (i for internal)
   + `e` denoting the translated endpoint (e for external)

Classes

- Full-cone
   + Any external host can reach `iAddr:iPort` by sending to `eAddr:ePort`.

- Address Restricted cone
   + Any external host can then reach `iAddr:iPort` by sending to `eAddr:ePort`.
   + __Only if `iAddr:iPort` previously sent a packet targeting the external host's IP.__

- Port Restricted cone NAT
   + Any external host can then reach `iAddr:iPort` by sending to `eAddr:ePort`.
   + __Only if `iAddr:iPort` previously sent a packet targeting the external host's IP & port.__
   
- Symmetric NAT
   + Each pair of `iAddr:iPort -> destAddr:destPort` is associated with a different `eAddr:ePort`.
   + __Only the destination endpoint (external host's IP & Port) can send packets back to `eAddr:ePort`.__



## Xbox
In the case of server-initiated connections (from a public/external interface), packets are dropped, because the router doesn't have a corresponding NAT entry to route the packets to the proper device.

Xbox defines 3 types of NAT situation, to determine if one xbox can connect to another:
- Open NAT
   + Everything is perfect.
- Moderate NAT
   + Chat & games with Open/Moderate, and never a game host.
   - Your Xbox is behind a router.
   - You might have UPnP half working forwarding some ports but not others.
   - You might have some ports forwarded but not others.
   - Your router might have a firewall that is blocking some packets but not others.
- Strict NAT
   + Chat & games with Open, and never a game host.


UPnP
   + Allows internal devices to request port-forwarding rules from the router automatically.
   + It is also a dangerous feature, since malwares from inside the network will be able to open ports in your router without your knowledge.

The alternative to UPnP is configuring portforwarding (for ports used by Xbox) manually to your Xbox.
Or, setup a DMZ pointing at your Xbox.





## UDP Hole Punching
- STUN (Session traversal utilities for NAT) or ICE to determine the public address of the NAT that its communications peers require.
   + To determine which RouterIP:RouterPort identifies a host?

Typically, a third-party server is used for devices behind NAT to find each other and exchange their endpoints (public IP & Port).

The third-party server also sends keep-alive packets since UDP connections expire after a short period of time (typically seconds).

Hole-punching doesn't work in symmetric NATs.



## References
- www.karlrupp.net/en/computer/nat_tutorial
- en.wikipedia.org/wiki/Network_address_translation#Methods_of_translation
- www.mindcontrol.org/~hplus/nat-punch.html
- www.firewall.cx/networking-topics/network-address-translation-nat/