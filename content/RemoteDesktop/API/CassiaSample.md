## Cassia (RDP .NET API on github)
```
using Cassia;
using System;

namespace ConsoleApp {
    class Program {
        static void Main(string[] args) {
            var mgr = new TerminalServicesManager();
            using (var server = mgr.GetLocalServer()) {
                server.Open();
                foreach (var session in server.GetSessions()) {
                    var clientName = session.ClientName;
                    var wtsIpAddress = session.ClientIPAddress.ToString();
                }
            }
        }        
    }
}

```