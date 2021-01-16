---
date: 2020-05-02
title: Antidote
menu:
    sidebar:
        parent: Applications
---


## Connectix
To avoid having users getting the Connectix prompt, _e.g. do you want to install connectors?_, I removed the registry keys which launched the AgentAntidote upon signing-in, which probably launched Connectix if needed.

```
KHLM\Software\Microsoft\Windows\CurrentVersion\Run
	+ "...\AgentAntidote.exe" /LancementSession
```
