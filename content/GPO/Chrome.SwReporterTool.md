---
date: 2020-05-02
title: SwReporterTool
menu:
    sidebar:
        parent: GPO
---

- It uses high pct of cpu when scanning.
- There's no way to force throttling either.


## Registry
`HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome`

- `DWORD (32-bit)`: `ChromeCleanupEnabled`: `0`
- `DWORD (32-bit)`: `ChromeCleanupReportingEnabled`: `0`


## Via GPO
Download the templates:

- support.google.com/chrome/a/answer/187202?hl=en
- dl.google.com/dl/edgedl/chrome/policy/policy_templates.zip


Copy to: `C:\Windows\PolicyDefinitions`

- Add .admx to root.
- Add .adml to their respective language directory.

Set policies

- `Enable Chrome Cleanup on Windows`: `Disabled`
- `Control how Chrome Cleanup reports data to Google`: `Disabled`