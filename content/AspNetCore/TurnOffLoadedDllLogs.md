---
date: 2019-03-28
title: Turn off Loaded dll logs
menu:
    sidebar:
        parent: AspNetCore
---

Open launch.json, and within a configuration, add:
```
{
   "version": "0.2.0",
   "configurations": [
        {
            "name": ".NET Core Launch (web)",
            ...
            "logging": {
                "moduleLoad": false
            },
            ...
        }
    ]
}
```