---
date: 2018-08-17
title: DNS
menu:
    sidebar:
        parent: Networking
---

Domain Name System, aka. DNS.

Translate domain names into IP addresses.



Records
-------


### CNAME
Canonical name.

This type of record maps an alias name (in the current domain) to a domain name. Typically used to map a subdomain such as *www* or *mail* to the domain hosting that subdomain's content.

**Values**

- Alias/Host/Name : URL prefix
	+ Examples:
		- www
		- mail
		- @ (root/apex domainName)
		- \* (wildcard, ie. __\*.example.com__)
- __TTL__: time to live.  
   CNAME and the record it points to are cached by resolving name servers.
	TTL specifies how long a resolver is supposed to cache/remember the DNS query before the query expires and a new one needs to be done.
- Value/Answer/Destination


### A record
**Address (IPv4)**
An A record maps a hostname in a sub/domain to an IPv4 address.

Ex:
www may be the name field of an A record within the 'example.com' domain, so that 'www.example.com' points to the IP address of a web server which hosts content for the 'example.com' domain.

The root record of a domain name is also an A record, this is an A record with a blank	name field.


### AAAA record
**Address record (IPv6)**
An AAAA record maps a hostname to an IPv6 address.


### Round Robin
Load-balancing/round robin configuration allows you to distribute server load evenly among multiple servers. You would create multiple A records with the same name, but with different associated IP's.



Dynamic update
--------------
Most personal computers are given a different IP address each time they connect to the Internet. An Internet service provider (ISP) can use a few IP addresses to serve many customers that way, but it means that your computer's address on the Internet is always changing. If you host a website, you don't want the website name to change, even if your ISP changes the IP address. DNS dynamic update automatically maintains the relationship between your fixed website name and the changing IP address so that your website is easy to find on the Internet.



References
-------------
- [Dig tool](https://toolbox.googleapps.com/apps/dig/)
- [TTLS](http://dyn.com/blog/dyn-tech-everything-you-ever-wanted-to-know-about-ttls/)
- [Propagation](https://ca.godaddy.com/help/what-factors-affect-dns-propagation-time-1746)



Questions
----------
__How does a computer know which DNS server to use?__  
Either it has been configured manually, or automatically via DHCP, which is a protocol for automatically configuring computers on networks.

On a home network, the router obtained DNS server addresses from the local ISP. The router in turn hands those DNS addresses out to the computers on the network using DHCP.


__Who maintains DNS servers?__  
At home, the ISP. In an enterprise, probably the IT staff. Some also use public nameservers, such as Google Public DNS, which are maintained by third parties.



Querying
---------


1. Computer
    - Checks local cache.
    - If not found, query the configured recursive DNS resolver.
2. ISP's Recursive DNS servers
    - Checks local cache.
    - If not found, query the root nameservers.
3. Root Nameservers
    * A nameserver is a computer that answers questions about domain names.
    * The thirteen root nameservers act as dispatchers for DNS.
    * They don't know the answer, but they can direct the query to someone that does.
    - Reads the Top-level domain of the query. Ex: www.google[.com]
    - Directs the query to the respective TLD nameservers.
4. TLD Nameservers
    * Each Top-level domain have their own nameservers.
    * They act as index for each TLD.
    * They don't have the answer, but they can direct the query to someone that does.
    - Reads the next part of the domain. Ex: www.[google.com]
    - Directs the query to the nameservers responsible for this specific domain (authoritative nameservers).
5. Authoritative Nameservers
    * They are responsible for knowing all the info about a specific domain, which are stored in DNS records.
    * There are many types of records, but in this case, we want the IP address for www.google.com, so the Address Record (A) is queried.
    - Returns info about the query.
6. Back to the Recursive DNS server
    - It now has retrieved the A record from the authoritative nameservers, and stores the record in its local cache.
    - Returns the retrived record to the Computer.



Example of a query
-------------------
As an example of the DNS resolving process, consider the role of a recursive DNS resolver attempting to look up the address "en.wikipedia.org.". It begins with a list of addresses for the most authoritative name servers it knows about – the root zone name servers (indicated by the full stop or period), which contains name server information for all top-level domains of the Internet.

When querying one of the root name servers, it is possible that the root zone will not directly contain a record for "en.wikipedia.org.", in which case it will provide a referral to the authoritative name servers for the "org." top level domain (TLD). The resolver is issued a referral to the authoritative name servers for the "org." zone, which it will contact for more specific information. Again when querying one of the "org." name servers, the resolver may be issued with another referral to the "wikipedia.org." zone, whereupon it will again query for "en.wikipedia.org.". Since (as of July 2010) "en.wikipedia.org." is a CNAME to "text.wikimedia.org." (which is in turn a CNAME to "text.esams.wikimedia.org."), and the "wikipedia.org." name servers also happen to contain authoritative data for the "wikimedia.org." zone, the resolution of this particular query occurs entirely within the queried name server, and the resolver will receive the address record it requires with no further referrals.

If the last name server queried did not contain authoritative data for the target of the CNAME, it would have issued the resolver with yet another referral, this time to the zone text.wikimedia.org.. However, since the resolver had previously determined the authoritative name servers for the zone org., it does not need to begin the resolution process from scratch but instead start at zone org., thus avoiding another query to the root name servers.

There is no requirement that resolving should involve any referrals at all. Looking up en.wikipedia.org. on the root name servers always results in referrals, but if an alternative DNS root is used which is set up to contain a record for en.wikipedia.org., then the record is returned on the first query.



Domain name space
------------------
The domain name space is organized into a hierarchical layout of subdomains
below the root domain.

The space is partitioned into areas (zones). A zone  starts at a domain
and extends downward in the tree to the leaf nodes, or to the top-level
subdomains where other zones start.

Most TLD registry operators offer their name spaces to the public,
or entities with scoped purpose for registration of second-level domains.

Similarly, an orginazation in chage of a second-level domain may operate
its name space similarly and subdivide its space.

Each registration/allocation of subdomain space obligates the registrant
to maintain infrastructure to manage its zone. An area of one or more subdomain
that has been delegated for management is called a DNS zone.

Ex: when you register a domain name with a registrar,
the registrar often offers you an administrative panel to manage the
zone you're renting. 





Zones
--------------
+ starts at a domain, and extends downward in the tree.
+ a zone has a single administrator (which may be an organization).

- Root zone
   + apex of the hierarchical distributed database called the DNS.
   + contains a list of names
   + contains a list of addresses of authoritative servers for all TLDs.
   + as of 2015, there are 1058 TLDs.




Root nameserver  
----------------
- notes
   + nameserver for the root zone of the DNS.
   + first step in resolving host names into IP addresses. 
   + only 13 root nameservers (due to practical limitation).
- tasks
   + answers requests for records in the root zone.
   + answers other requests by returning a list of authoritative nameservers for the proper TLD.
    




Authoritative nameserver
------------------------
- gives answers to questions asked about names in a specific zone.
- authoritative-only: answers only to queries about names in a/some zones.
- can act as cache for other zones.
- either primary server (master), or secondary (slave).
   + master
      *  stores the definitive versions of all records in that zone.
      *  identifed by start-of-authority (SOA) resource record.
   +  secondary
      *  act as copy for master.

When a domain is registered with a registrar, the zone administrator (the customer) must provide a list of nameservers that are authoritative for the
zone that contains the domain. 

The registrar then provides these names to the domain registry
for the TLD containing the zone.

The domain registry, in turn, configures the authoritative nameservers
for that TLD with delegations for each server for the zone 




Hierarchy
----------
- `thirdLevel.secondLevel.topLevelDomain.<rootDomain>`
    + root domain 
        - does not have a formal name, ie. empty string,
        - contains all TLDs
            + ex: generic TLDs (gTLDs), 
            + ex: country code TLDs (ccTLDs)
- resolved by breaking the name from left to right.
    + queries the root nameserver to obtain responsible authoritative server for the TLD, etc.




Registries
-----------
+ registries are operated by registry operators
   * ex: the .com registry is operated by VeriSign.
+ Tasks
   * maintain domain registration information.
   * may work with registrars to provide registration services to the public.
   * designated registrar
      - once a registrar registers a domain for a user, it becomes a D.R.
      - only the D.R can modify or delete information about the domain names
        under its responsability in the central registry database.


__Registration__  
- Max period of registration: 10 years
- Registration of a domain doesnt necessarily imply the provision
  of DNS services for the registered domain.
  + most registrars offer DNS hosting as a free service.
- ICAAN defined a policy on  Transfer of Registrations between Registrars



## How does Windows decide which DNS Server to use when resolving names?
Windows 7 and before: NIC binding order in the Advanced Settings in the network connections folder. 
Windows 8 and later: NIC Interface Metric (a given NIC > IPv4 > Advanced Settings > Interface Metric (automatic or static)).

Steps
- The DNS Client service sends the name query to the first DNS server on the preferred adapter’s list of DNS servers and waits one second for a response.
- If the DNS Client service does not receive a response from the first DNS server within one second, it sends the name query to the first DNS servers on all adapters that are still under consideration and waits two seconds for a response.
- If the DNS Client service does not receive a response from any DNS server within two seconds, the DNS Client service sends the query to all DNS servers on all adapters that are still under consideration and waits another two seconds for a response.
- If the DNS Client service still does not receive a response from any DNS server, it sends the name query to all DNS servers on all adapters that are still under consideration and waits four seconds for a response.
- If it the DNS Client service does not receive a response from any DNS server, the DNS client sends the query to all DNS servers on all adapters that are still under consideration and waits eight seconds for a response.


```
Set-NetIPInterface -IfIndex <idx> -InterfaceMetric <number> # Lower is better.
```
