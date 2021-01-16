---
date: 2018-08-17
title: Tasks
menu:
    sidebar:
        parent: Powershell
---

Possible names:

- Background process,
- Task,
- Job.


Jobs are run asynchronously, in their own thread separate from the pipeline thread. The command prompt returns immediatly.

The job will be another instance of Powershell, and will not start in the same path, so beware of `.` directory.



__Cmdlets__

- Start-Job
- Get-Job 
- Stop-Job
- Remove-Job

```powershell
Start-Job -ScriptBlock { & "path\app.exe" $args} -ArgumentList "arg1", "arg2"
```