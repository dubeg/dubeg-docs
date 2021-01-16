---
date: 2018-09-27
title: Gitea
menu:
    sidebar:
        parent: Applications
---

- Install gitea.
- In gitea's admin panel (website), change the BindDN user.
- Set HTTPS/SSL
- Run as Windows Service.


## Pre-Requisite
- Git
- Database server (or sqlite3 which requires nothing).


## Install / First run
- Create a directory to put gitea.exe in.
- Run: gitea.exe web
- Navigate: localhost:port/install 
  Then, gitea will create its folders, db, etc.
- Setup "Authentication" in the Admin Panel.


## Authentication with Active Directory
Requirements:
- In Admin Panel, setup Authentication with Bind DN.
- In Admin Panel, pre-create users that will authenticate via LDAP.
    + Use powershell & AD cmdlets to determine what their UserPrincipalName are.
      You'll need these values when creating the user accounts.

LDAP with Bind DN
```
Security Protocol: LDAPS
Host: dc1.plb.local
Port: 636
Bind DN: CN=usertest,OU=Application,OU=PLB,DC=plb,DC=local
Bind Password: ...
User Search Base: OU=Informatique,OU=Employe,OU=PLB,DC=plb,DC=local
User filter:  (&(objectClass=user)(UserPrincipalName=%s))
...
```


## HTTPS
Self-Signed:
- Run: ./gitea.exe cert -ca=true -duration=8760h0m0s -host=myhost.example.com
- Setup Gitea to use cert and key.
- On client computers, add self-signed certificate to Trusted Root:
    + In Chrome, navigate to Gitea's URL.
    + Open Developer Tools > Security, export certificate to file.
    + Open certmgr, import certificate file to Current User\Trusted Root Certification ...
    + Reload browser.

Certificate signed by domain CA
- Find the internal CA.
- On the CA, setup a Certificate Template (dup of WebServer).
- On the server, request a new certificate. Export to PKCS12.
- Using LibreSSL, extract from PKCS12 the cert and key: cert.pem, key.pem.
- Setup Gitea to use the cert and key.
- In Chrome, if you navigate to Gitea's URL and it throws an ERROR_INVALID blah blah,
  you might have requested the certificate without a valid Alternative Name.
  Request a new certification with AlternativeName: DNS=git.plb.local
- If the server hosting Gitea also hosts IIS, you might not be able to use port 443 (default for SSL).
  Use another port.

Setup Gitea:
```app.ini
[server]
PROTOCOL = https
ROOT_URL = https://..
CERT_FILE = c:/../cert.pem
KEY_FILE = c:/../key.pem
..
```

Note:
https://blogs.msdn.microsoft.com/phkelley/2014/01/20/adding-a-corporate-or-self-signed-certificate-authority-to-git-exes-store/

Some applications like Visual Studio, Chrome, IE, etc. use ther
Windows Cert Store to verify SSL certificates.

However, apps like Firefox, Git (which uses openssl) and Openssl don't, which means
corporate certificates (within a domain) aren't automatically included in their
respective cert store.

Git for Windows uses a set of trusted root certificates in a simple text file.
By default, it uses "curl-ca-bundle.crt" in its Program Files directory.
The name of it may have changed.
Copy that file and append your corporate CA certificate.

Then set git to use that file.
The global config is user-specific.
```
git config --global http.sslCaInfo C:\Users\gdube\.gitcert\bundle.crt
```


## GitHooks
### Enable hook
To enable a hook script, 
- script must be in the hooks directory of the Git repository: .git/hooks,
- script must be named after the event (and without an extension)
- script must be either Bash, Ruby, Perl or Python.

__Client Hooks__
- ...

__Server Hooks__
- pre-receive: runs once before the push.
- update: runs once per affected branch, before push.
- post-receive: runs after the push process is completed.

Example
```post-receive
#! /bin/sh
exec powershell.exe -File './.git/hooks/post-receive.ps1'
exit
```




## Building
1. Install MinGW > MSYS.
1. Install Go.
1. Fork Gitea on Github.
```
go get -d code.gitea.io/gitea
cd ~\src\code.gitea.io\gitea

git remote rename origin upstream
git remote add origin https://github.com/dubeg/gitea.git
git remote set-url origin ... # In case of typos.`
git fetch --all --prune

make test
make build

# Binary Ready for Deployment.
$env:Tags = "bindata"; make generate build
```

### Pre-Requisites
On Windows, GNU tools such as `make` are not included by default.
- Install MinGW -> MSYS.
- Prepend `bin\` of MSYS to your PATH in the Powershell Userprofile.

Note:
If `bin\` isn't prepended in profile, then there's no guarantee the lookup will use the GNU tools first. That means that there may be problems where some Windows tools with the same names are used instead of the GNU tools.

Example: Windows includes a `find.exe` tool, which may be inadvertedly used instead of the GNU `find`.