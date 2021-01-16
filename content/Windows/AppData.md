---
date: 2018-08-17
title: AppData
menu:
    sidebar:
        parent: Windows
---

User-specific application data.



## Roaming 
- Path: `C:\Users\username\AppData\Roaming`
- Shorcut: `%APPDATA%`
- Purpose: contains data that can move with your user profile from PC to PC.


__Example__

Data is synced with a server.

- favorites
- bookmarks
- etc.



## Local
- Path: `C:\Users\username\Appdata\Local`
- Shorcut: `%LocalAppData%`
- Purpose
    + Contains data that can't move with the user profile.
    + Specific to a PC, or for stuff too large to sync with a server.


__Example__

- temporary files
- etc.



## LocalLow
- Path: `C:\Users\username\AppData\LocalLow`
- Purpose: contains data that can't move, but also has lower level of access.


__Example__

A web browser running in a protected or safe mode will only be able to access data from the LocalLow folder.