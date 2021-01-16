---
date: 2018-09-27
title: Dropbox
menu:
    sidebar:
        parent: Applications
---



Windows doesn't propagate file system events to both ends of the symlink, just the "real" end.

If you symlink into the Dropbox folder, it never gets to hear about changes.
Instead, put folders in Dropbox and symlink to them in other folders, such as your UserFolder.

## Explorer
Dropbox folder's CLSID: {E31EA727-12ED-4702-820C-4B6445F28E1A}
- Change the icon.
- Unpin from Navigation pane.