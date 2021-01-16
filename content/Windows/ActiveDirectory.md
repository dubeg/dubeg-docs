---
date: 2018-08-17
title: Active Directory
menu:
    sidebar:
        parent: Windows
---


# Directory Service Provider
- LDAP
- Microsoft Active Directory

# Active Directory
- AD authenticates using Kerberos.
- AD has the ability to authenticate using LDAP.
- AD is largely a directory for Windows users, devices, applications.
- AD requires a Microsoft Domain Controller.
- AD manages Windows devices through Group Policy Objects (GPOs).
- Users are able to single sign-on to Windows resources that live
  within the domain structure.
- AD supports a form of LDAP.

## LDAP
- LDAP has largely worked outside of the Windows structure, focusing on Linux/Unix.
- LDAP doesn't have the same concepts of domains or single sign-on.
- Application protocol for querying and modifying items in directory service providers.


## AD using LDAP
AD has LDAP as one component.
There's nothing to do to AD to allow an LDAP client to connect.

__Ports__

- UPD port 389 : LDAP, to handle normal queries from client computers to the domain controllers.
- TCP port 636 : LDAP SSL.


__Bind DN__
  
Basically the credentials used to query against the server.
Object that you bind to, inside LDAP, to give
you perms to do your actions with.
Some LDAP instances dont allow anonymous binds,
or dont allow operations to be performs as anon.


__Base DN__
  
Starting point of a search.


__DN__

- Distinguished Name
- References an object.
- Attributes:
    + DC: domainComponent
    + CN: commonName
    + OU: organizationalUnitName
    + O: organizationName
    + UID: userid
    Examples
    - CN=gdube,DC=plb,DC=local



## With Powershell
- Install the "Remote Server Administration Tools" package on the internet.
- Turn on the feature "Active Directory Powershell".
- Update-Help
- Import-Module ActiveDirectory
- Set-Location AD:
- Get-ChildItem
- cd "DC=..,DC=..."

Searching for objects
```
Get-ADObject -LDAPFilter "(&(operatingSystem=Windows ...)(objectClass=computer))" `
             -SearchBase "dc=plb,dc=local"  `
             -SearchScope Subtree

Get-AdUser someName -Properties * | select *name*
Get-AdGroup -Filter {name -like "Cert*"}
Get-AdGroupMember groupName
Get-AdPrincipalGroupMembership userName | select name
```

__Note__

Get-ADUser displays friendly names of a LDAP object attributes/properties. 
This means that some properties are not displayed exactly like the LDAP server is returning them.
The casing may be different within the properties' names.

This is only a problem since the LDAP module in Gitea has an issue where
it doesn't retrieve attributes using a case-insensitive comparison with the attributes you're telling it to retrieve.

Instead, to view the original casing of attributes, you need to query objects with Get-ADObject.
