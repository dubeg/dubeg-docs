---
date: 2021-01-22
title: Turn Off Cortana Shortcut
menu:
    sidebar:
        parent: Windows
---

Set, then restart Explorer & Cortana processes (just in case):
```
HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Search
	VoiceShortcut (DWORD): 0x0
```