# NAT
Network Address Translation is the process of changing the source and destination IP addresses and ports.

- Designed for IP address conservation.
   + Reduces the need for IPv4 public addresses.
- Enables private IP networks.
- NAT operates on a router, usually connecting 2 networks together.
- Translates the private addresses in the internal network into legal addresses.
- Uses a single unique IP address to represent a group of computers on a local network.

## Three (3) types
1. Static NAT
2. Dynamic NAT
3. Port Address Translation (PAT)

## Static NAT
- translates one private IP address to a public one.
- the public IP address is always the same.

## Dynamic NAT
- private IP addresses are mapped to the pool of public IP addresses.

## PAT
- Also known as NAT Overload.
- one public IP address is used for all internal devices
- a different port is assigned to each private IP address.
