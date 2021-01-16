---
date: 2018-08-17
title: ExecutionPolicy
menu:
    sidebar:
        parent: Powershell
---


- Root Certification Authorities (CAs)
    + Servers issuing digital certificates
    + Ran by trusted companies
- Class III digital certificate
    + Code-signing certificate
    + CA must verify your identity
    + Ex: an electronic passport/ID card.
- Default trusted root CAs

When Powershell checks to see if a script is trusted, under AllSigned or RemoteSigned policy, it asks 3 questions:

1. Is this script signed?
2. Is the signature intact?
    + Has the script changed since it was signed?
3. Was the signature created using a digital certificate issued by a trusted root CA?


# Use your certificate to sign a ps script.
```
$cert = Get-ChildItem -Path cert:\CurrentUser\mycodesigningcert
Set-AuthenticodeSignature MyScript.ps1 -cert $cert
```