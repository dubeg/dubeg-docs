---
date: 2021-01-27
title: Certificates
menu:
    sidebar:
        parent: Windows
---


## Bind SSL Certificate to port
DUBEG: 
This is actually not something you should do if you want to run a non-.NET application, 
such as Gogs/Gitea.

- Cert. must be in: Certificates (Local COmputer)/Personal/Certificates
- Make sure the cert includes the private key. (What's the cert format?)
```
$hash = (gci cert:\LocalMachine\My | where {$_.Subject -like "*git.plb*" | select -first 1}.Thumbprint
$appid = [guid]::NewGuid().ToString("B")
netsh http add sslcert hostnameport="git.plb.local:443" certhash=$hash certstorename=MY appid="$guid"

netsh http delete sslcert ipport=0.0.0.0:443
netsh http show sslcert
netsh http add sslcert ipport=0.0.0.0:443
    certhash=0000000000003ed9cd0c315bbb6dc1c08da5e6 
    appid={00112233-4455-6677-8899-AABBCCDDEEFF}
```
- AppId: generate your own GUID to uniquely identify the app using the port/ssl pair.
- Hash of the SSL certificate. "Thumbprint" in Details pane.





## Request certificate
## Manual Request
DUBEG: 
I've never tried requesting a certificate manually.
When setting up Gitea, I used MMC.EXE.

```ssl.inf
[Version] 
Signature="$Windows NT$"

[NewRequest] 
; SSL/TLS does not require a Subject name when a SAN extension is included.
; The certificate Subject name can be empty.
Subject = "CN=SERVER.CONTOSO.COM"   ; Ex: "CN=*.CONTOSO.COM"

Exportable = TRUE                   ; Private key is [or not] exportable 
KeyLength = 2048                    ; Common key sizes: 512, 1024, 2048, 4096, 8192, 16384 
KeySpec = 1                         ; Key Exchange - Required for encryption. 
KeyUsage = 0xA0                     ; Digital Signature, Key Encipherment.
MachineKeySet = True                ; The key belongs to the local computer account.
ProviderName = "Microsoft RSA SChannel Cryptographic Provider" 
ProviderType = 12 
SMIME = FALSE 
RequestType = CMC                   ; PKCS10 or CMC

; If enterprise CA, EnhancedKeyUsageExtension can be omitted.
; [EnhancedKeyUsageExtension]
; OID=1.3.6.1.5.5.7.3.1 ; Server Authentication
; OID=1.3.6.1.5.5.7.3.2 ; Client Authentication

[Strings] 
szOID_SUBJECT_ALT_NAME2 = "2.5.29.17" 
szOID_ENHANCED_KEY_USAGE = "2.5.29.37" 
szOID_PKIX_KP_SERVER_AUTH = "1.3.6.1.5.5.7.3.1" 
szOID_PKIX_KP_CLIENT_AUTH = "1.3.6.1.5.5.7.3.2"

[Extensions] 
; SAN
; %szOID_SUBJECT_ALT_NAME2% = "{text}dns=computer1.contoso.com&dns=computer2.contoso.com" 
%szOID_ENHANCED_KEY_USAGE% = "{text}%szOID_PKIX_KP_SERVER_AUTH%,%szOID_PKIX_KP_CLIENT_AUTH%"

[RequestAttributes] 
; Required for enterprise CAs.
; Modify for own name of the template.
CertificateTemplate = WebServer
```

Notes:
- leave off the Subject= line if you want the subject to be empty
- if you don’t need the template to be specified, remove the RequestAttributes section
- the specification of the enhanced key usage OID is not explicitly required since the EKU is defined in the certificate template. The OID in the INF file above is for explanatory purposes
- you can click on “OK” for the template not found UI from certreq if the client has no access to templates
- you can ignore the unreferenced “[Strings]” section dialog when it appears

Requesting (runas admin)
```
# Create request file
certreq -new ssl.inf ssl.req
certutil ssl.req

# Submitting request to the CA
certreq -submit ssl.req

# Installing the certificate on the IIS computer
certreq -accept ssl.cer
```




## Certificate Authority in a Windows Domain
Utils:
- View available CA's in the network: `certutil -config - -ping`

Notes:
Two types of CA in internal domain.

Standalone CA:
Clients will not trust certificates from a standalone CA automatically.
However, the root certificate from the CA can be distributed via a GPO to all clients.
This makes it automatic.

Enterprise CA:
It will automatically publish CA's certificate to domain members via AD.
If CA is listed in Enrollment Services, it is an Enterprise CA.
> dssite.msc > View > Show Services Node
> Drilldown to: Services > Public Key Services > Enrollment Services

Or, as Standalone CA's dont use templates, you can check if the 
Certificate Templates node exist on the server.
> Server Manager > Roles > Active Directory Certificate Services > Certificate Templates


## New Certificate Template
Add a template in the Windows Server acting as a CA.
- You will need to duplicate an existing template.
- I suggest duplicating the "Web Server" template.
- In the Security tab, add "Read" and "Enroll" permission for the desired computers.
  You will need to add "Computers" to the search dialog.
> Server Manager > Roles > Certificate Services > Templates

Add the new template to the templates the CA can deliver.
> Server Manager > Roles > Certificate Services > NameOfCA > Templates > New


## Request Certificate
On the web server's machine, request a new certificate for the LocalMachine account.
- Choose "Active Directory Enrollment Policy".
- Choose "WebServerV2" (own customized template based on WebServer).
- Click on "More information is required..." to setup required information.
    + SubjectName: CN=git.plb.local
    + AlternativeName: DNS=git.plblocal
    + Verify the right Certification Authority is selected.
    + Click OK
> MMC > Certificates (Snap-in, LocalMachine) > Personal > Certificates > Request New Certificate

You now own a signed certificate, valid for the domain.
You can either use it with IIS, but you might need to bind the cert to a IP and port.
Or, export it to a .pfx file, so it can be converted into PEM/CRT/etc files for other apps, using LibreSSL.


## Export Certificate
Export the certificate in format PKCS12, with private key and a password (required).
Include all info, just to be sure.
> MMC > Certificates > Personal > Certificates > Export


## Convert PKCS12 to PEM
Install LibreSSL (which is a fork of openssl).
Arguments:
- ClCerts: Only output Client Certificates.
- CaCerts: Only output CA Certificates.
- NoCerts: Do not output certificates.
- NoKeys: Do not output private keys.
- PassIn: password source.
- NoDES: Do not encrypt private keys.

```
openssl pkcs12 -in cert.pfx -out key.pem -nocerts -passin pass:MotDePasse -nodes
openssl pkcs12 -in cert.pfx -out cert.pem -nokeys -passin pass:MotDePasse -nodes
```


## References
Manual: https://blogs.technet.microsoft.com/rmilne/2014/06/17/how-to-request-certificate-without-using-iis-or-exchange/
Using UI: http://www.entrust.net/knowledge-base/technote.cfm?tn=8924