---
date: 2019-03-28
title: Authentication
menu:
    sidebar:
        parent: AspNetCore
---


## Integrated Windows Authentication

Concepts

- Authentication: identity management.  
- Authorization: permissions management.


Protocols

- SPNEGO
- Kerberos
- NTLMSSP

ASP.NET Core

+ Kestrel
  - Authentication is handled by IIS, or another middleware.
  - Kestrel by itself does not support authentication.
  - `Internet -> IIS with ASP.NET Core Module -> Kestrel -> WebApp`
+ HTTP.sys
  - Formerly WebListener. 
  - Supports integrated Windows auth.


## Authentication Strategies in IIS
+ Basic
    - browsers prompt for username/password.
    - credentials must match a valid Windows account.
    - username/password are sent in the clear
+ Digest
    - same as basic auth., but encrypted using MD5.
+ Forms
    - Forms auth is an API in .NET that handles authentication
      in an application with existing security APIs, such as System.Security.
    - Typically, a user enters his credentials in a html form, and on post,
      the app validates the creds using the FormsAuth API.
+ Integrated (Windows)
    - Both client and server must be on the same network.
    - Involves NTLM or Kerberos protocol, ie. the protocols
      used to log into a Windows device.
    - Browser send a token that represents the Windows account of the current user.
+ Anynymous
    - User is not required to supply credentials.


Others

+ UNC auth.
    - Configure IIS to use a specified user account when accessing resources
      on a remote share.
+ Active Directory Client Certificate Mapping auth.
+ IIS Client Certificate Mapping auth.


### Notes

All strategies are handled at IIS's level, except Forms auth.

Basic, Digest & Integrated associate
the executing app thread with a Principal object.


## .NET Security Concepts
- A user represents a person or a program.
- A group is a set of users with a given set of permissions assigned to the group.
- A role is a set of permissions that role members inherit.
- An identity contains info about the user being validated.
    - Includes:
        + name
        + authentication type
- A principal represents the security context under a thread is running.
    - Basically a Windows Token wrapped in a .NET class.
    - Windows Tokens are generated when a Windows user is authenticated by Windows.
    - The groups the user is a member of are stored in the access token. 
        - They are stored under their SIDs, not their names.
        - This means a conversion name -> SID must be made in the function WindowsPrincipal.IsInRole.
    - Encapsulates:
        + the user's identity,
        + the groups of the user
        + the role in which the principal is operating: Standard User, Administrator, ...?
- Apps usually grant rights to the principal based on its identity, or its role membership.
+ Windows principals represent Windows users and their roles (or their Windows groups). 
  A Windows principal can impersonate another user, which means that the principal 
  can access a resource on a user's behalf while presenting the identity that belongs to that user.
- A WindowsIdentity is assumed to represent a Windows NT security token under
  which the thread is running.
+ Generic principals represent users and roles that exist independent of Windows users and roles.
+ Custom principals can be defined by an application in any way that is needed for that particular application. 
  They can extend the basic notion of the principal's identity and roles.

If a user is member of the built-in administrators group, it is
assigned two access tokens: a standard user access token, and an administrator
access token. By default, the user is in the standard user role.

Generic Concepts
Groups are based on identity. However, users do not always act under
all roles that they are member of. Roles are meant to demarcate activity,
however OSes tend to blur the distinction, treating roles as groups.
Groups help manage objects, while roles help manage permissions.

Multiple definitions of Roles:
- Role of a Windows Principal: user account type, ie. Standard user or Administrator.
- Roles in .NET: if Windows auth, then groups. Otherwise, roles are defined by the app.
    + Permissions of roles are defined by the application.

Authorization
In Windows/NTFS, each object (file, regkey, etc) is associated with an ACL.
ACL, access control list, is a collection of Access Control Entries (ACEs).
Each ACE contains the identifer of a specific user (SID, Security Identifier),
and the permissions granted to it.


Impersonation
An application can take the identity of the authenticated user
to access all the resources the user is authorized for.
Temporarily change the identity that the app uses to perform
certain tasks, instead of using the fixed account under which the app
was started.
