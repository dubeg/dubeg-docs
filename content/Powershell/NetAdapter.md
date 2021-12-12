---
date: 2021-03-21
title: Net Adapter
menu:
    sidebar:
        parent: Powershell
---


* Get-NetIPConfiguration
* Get|Set-NetIPInterface # IPv4 or IPv6
* Set-DnsClientServerAddress
* Remove-NetRoute
* New-NetIPAddress


```
# --------------
# Ex: Wi-Fi
# Ex: Ethernet
# --------------
Get-NetAdapter <adapterName>
	| Remove-NetIPAddress -AddressFamily IPv4

Get-NetAdapter <adapterName> 
	| New-NetIPAddress 
		-AddressFamily IPv4
		-PrefixLength 24 # 255.255.255.0
		-DefaultGateway ... # 10.0.100.1 (SAJB Drummondville)

Get-NetAdapter <adapterName> 
	| Set-DnsClientServerAddress -ServerAdresses ... # 10.0.100.1 (DRU)
```



## DHCP
```
$interface = Get-NetAdapter <name> | Get-NetIpInterface IPv4
$interface | Remove-NetRoute
$interface | Set-NetIpInterface -DHCP Enabled
$interface | Set-DnsClientServerAddress -ResetServerAddresses
```


## Profile
```
Get-NetConnectionProfile -InterfaceAlias "Ethernet1" | Set-NetConnectionProfile -NetworkCategory Private
```