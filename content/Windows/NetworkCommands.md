---
date: 2022-12-03
title: Network Commands
menu:
    sidebar:
        parent: Windows
---

<div style="display:flex; align-items:center;">
	<img src="/images/terminal.svg" style="margin-right:5px;">
	Run
</div>

+ `control netconnections`
+ `ncpa.cpl`: Network Control Panel Applet


<div style="display:flex; align-items:center;">
	<img src="/images/search-loop.svg" style="margin-right:5px;">
	Search
</div>

+ English: `Network Connections`
+ French: `Connections réseaux`


```
ping 
ping -t # Continuous ping.

tracert
tracert -d # Avoids DNS lookup.

netstat # Sessions, connections, open ports.
netstat -b # Include executable per connection.
netstat -o # Include PID.

route # Local routing table

arp # Cache of (IP, MAC) pairs.
arp -a # All.

ipconfig # IPs of net adapters.
ipconfig /all # Include additional infos, eg. MAC address.
ipconfig /release # Release ip addr.
ipconfig /renew # Requests DHCP.


netsh
netsh interface ipv4 show interface
```


DNS
```
ipconfig /flushdns
nslookup
```




## PowerShell
```
Get-NetIPAddress -InterfaceAlias -AddressFamily

# -------------
# List adapter(s) info:
# - IP Address
# - Default Gateway
# - DNS Server
# - Interface name/desc
# -------------
Get-NetIPConfiguration -InterfaceAlias


# -------------
# List net adapters
# -------------
Get-NetIPInterface -AddressFamily IPv4


# -------------
# Local Routing Table
# -------------
Get-NetRoute -AddressFamily IPv4
```
