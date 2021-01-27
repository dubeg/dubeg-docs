# Services Rights

GPO
> Policies, Windows Settings, Security Settings, System Services
> Service's Properties
> Define StartupMode, EditPermission as desired


## SUBINACL
Display or modify Access Control Entries (ACEs) for file and folder Permissions, Ownership and Domain.

Access Control Lists apply only to files stored on an NTFS formatted drive, each ACL determines which users (or groups of users) can read or edit the file. When a new file is created it normally inherits ACL's from the folder where it was created.

- STOPI = query status
- STOPI = start
- STOPI = stop
- STOPI = pause/continue
- STOPI = interrogate.

```
subinacl /service serviceName /GRANT=Domain\User=STOPI
```