---
date: 2020-04-14
title: Fan Spinning
menu:
    sidebar:
        parent: Issues
---

On my work laptop.


## Symptom
Everytime laptop goes into idle mode, its fan starts spinning heavily, ie. something used the cpu heavily.

Considering the solution I ended up with, it's worth noting here that Visual Studio 2017 was running the whole time.


## Investigation

Things I tried, but didn't fix it:

- Limiting the Windows Defender Scan to 20% and 10% CPU, via gpedit.
- Disabling Chrome's Sw Reporter Tool, via gpedit.
	+ I needed to download Chrome's Administrative templates, and put them into `C:\Windows\PolicyDefinitions`.

I then noticed using ResourceMonitor that many ngen processes were being launched in idle mode.



## Solution
Disabling the ngen scheduled tasks seemed to fix it.

```
Get-ScheduledTask *ngen* | Disable-ScheduledTask
```

__References__

- http://www.darrylvanderpeijl.com/mscorsvw-exe-ngen-exe-high-cpu-usage/


## Another potential solution
Untested, but after investigating further, it may have been caused by Visual Studio Feedback client, which launches PertWatson2, which in turn launches ngen.

Set the following setting:
```
Help menu > Send Feedback > Settings > No, I would not like to participate.
```

__References__

- https://developercommunity.visualstudio.com/content/problem/184045/ngen-continious-high-cpu-out-of-memory.html

- https://stackoverflow.com/questions/42662444/how-to-disable-perfwatson2-exe-from-visual-studio-2019


## Final note
It seems many ngen processes are launched because they don't terminate successfully (so new processes are launched to try again). From internet googling, I've found that it may be so because they are 32-bit and eventually run out of memory (ie. consuming more than 4 GB). The real fix would be attacking that problem, but I've found no good documentation on that.