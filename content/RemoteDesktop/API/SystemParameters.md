Sample: Get system parameters.

```powershell
Add-Type -AssemblyName PresentationFramework,System.Windows.Forms
[System.Windows.SystemParameters]::IsRemoteSession
[System.Windows.SystemParameters]::IsRemotelyControlled
```