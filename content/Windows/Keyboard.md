---
date: 2021-01-16
title: Keyboard
menu:
    sidebar:
        parent: Windows
---

Once, I had both ENG (Canada) and ENG (US) layouts,
while only ENG (US) was listed as installed.
I wanted to get rid of ENG (Canada).

What worked for me was doing the following:
```
intl.cpl 
> Administrative 
> Copy Settings 
> [x] "Welcome screen and system accounts"
> [x] "New user accounts"
> OK
```


## Keyboard Input Bar
Sometimes by adding and subsequently removing a language group such as `English Canada`, it will still be listed in the Language InputBar in the taskbar. 

To remove it:

- Delete it from the preload key.
- Rename keys if there're gaps in numbers, such as `1, 3,` because you deleted `2`.
- Logout and log back in.

```
HKEY_CURRENT_USER\Keyboard Layout\Preload
    "1"="00000409"
    "2"="00000c0c"
```

Common Keys

- `en-US`: `0x0409`
- `en-CA`: `0x1009`
- `fr-CA`: `0x0c0c`