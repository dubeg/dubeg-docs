---
date: 2020-06-18
title: Kerberos
menu:
    sidebar:
        parent: Windows
---

When changing AD Group memberships on an user account, only new Windows sessions of the user account will see those changes, that is, you often need to tell the user to log-off & log-in again.

To be precise, only new Kerberos tickets will reflect the changes, because it caches a user's memberships.

There's an alternative to logging out & back in, however. The tool `klist` is included in Windows since at least Win7, and provides the ability to purge existing Kerberos tickets in your session. Remember though that only new processes will have up-to-date Kerberos tickets; old processes will die-off never knowing about them.

- Update a user's group memberships
- In the user's Windows session, execute: `klist purge`
- Restart any process that needs up-to-date Kerberos tickets.