---
date: 2019-06-05
title: Search
menu:
    sidebar:
        parent: Windows
---

Today, 2020-02-05, the taskbar search UI would show an empty pane, showing only a background and no content.

It seems that when the Bing API is having issues, the SearchUI is broken. You can disable the SearchUI's dependence on Bing to fix it.


## Disable Bing in Taskbar Search
Tested in version 1903, 1909.

1. Go to `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Search`.
2. Set to 0 the following keys (add them if needed)
    - BingSearchEnabled (DWORD)
    - CortanaConsent (DWORD)
3. Restart SearchUI.exe
	+ Get-Process SearchUI | Stop-Process
	+ It will auto-start as you perform a new search.