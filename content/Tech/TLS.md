---
date: 2018-08-08
title: TLS/SSL
menu:
    sidebar:
        parent: Tech
---


## History

- __SSL__: 1994
- __SSL v2__: 1995
    + Deprecated in 2011
- __SSL v3__: 1996
    + Deprecated in 2015
- __TLS 1.0__: 1999
- __TLS 1.2__: 2008
- __TLS 1.3__: 2018


## Questions

- How do you know if the IP address returned by DNS is legitimate? 
- How do you know if the certificate returned to you is legitimate?



## Resources

- Certificate Authority: trusted signing party.
- PKI: set of trusted authorities who can vouch for the validity of a public key.

You get a public key from a server, but you need to check with the trusted authority whether or not this is a legitimate one.

A private key can be used to prove ownership of a public key: the asserting party encrypts a bit of data with its private key, and sends both the encrypted and unencrypted data to the client. The clients decrypts the encrypted data, and compare it againts the unencrypted bit. If it matches, then the asserting party is legitimate.

A token/encrypted data pair is called a digital signature.


-------------------------


TLS requires a certificate on the server side, and contains among other things, a public key.

The server has the private key: the only key that can decrypt messages encrypted using the public key.

Since the certificate is sent from the server to the client without being encrypted, it contains a signature



## Summary

__Encryption: task__

1. Clear: decide which encryptions and TLS version to use.
1. Asymetric: exchange the symmetric encryption's shared key.
1. Symmetric: application data.


```
Client    Server
------    ------
Hello >   ...
...   <   Cert (public key, ...) & stuff.
Verifies cert.
Extract public key.
Ecrypts pre-master key using public key.
Pre-master key >  Decrypts it using private key.
...
```


## Public key formats

- X.509
- PKI X.509
- ...


## Getting a certificate
- Generate a private and public keys using RSA:2048 and over.
- Most CSRs are created in the base-64 encoded PEM format.


### Certificate signing request

Aka. CSR

- CommonName
	+ Ex: www.dubeg.ca
- Organization
- OrganizationalUnit
- City/Locality
- State
- Country
- EmailAddress
- Public Key


### Other notes
```
# TLS / SSL
1. Unencrypted messages to decide which symmetric encryption and TLS versions to use.
   - Symmetric encryption to communicate data for the bulk of comm.
   - TLS to communicate using asymmetric encryption for exchanging the cypher's enc/dec key. 
2. TLS encryption to comm. the 


Client                      Server
------                      ------
Hello  >
                            < Cert (includes public key), and other stuff.
Verifies cert.
Extract pub. key
Encrypts pre-master
key using pub. key.

Pre-Master key > 
                            Decrypts pre-master key (using private key).

```
Both client and server now have a pre-master key.
They use it to compute a shared secret key.
```
Encrypts msg using shared key.
Msg >
                            Decrypts msg using shared key.
                            Encrypts msg using shared key.
                            < Msg
Decrypts msg using shared key.
Everything good.
Encrypts application data.
Data >
                            Decrypts data.
                            < Data
- Decrypts data.
Etc, until the end of times.


## Basic vs. mutually-authenticated handshake
The basic model lets the client verify the server, and
the majority of TLS sessions only require this.

However, some cipher suites will require the client to
send a certificate (with a public key) as well, for mutual
authentication of both parties.
Ex: when two banks are negotating a secure connection.

## Certificates
- Manually specified certificates
    + Every OS provides a mechanism to import any certificate you trust.
- Certificate authorities
    + A CA is a trusted third party that is trusted both by the cert owner 
    and the party relying upon the cert.

Certificate is composed of..
+ Identity (info on the key owner)
+ Public key (purportedly owned by the owner)
+ Digital signature (computer over the two previous parts, by a CA).

Example:
A website wants to communicate with you securely.
It provides you with a public key with which you encrypt data that only it can decrypt.
But how can you know it is really the desired server's public key, and not someone else's pub. key?

The solution to this are Certificate Authorities (CA).
They ensure the identity of owners of public keys by signing/issuing certificates for them.
CA's only sign certificates after having checked the will-be cert owner's identity through a 
one-time operation.

OSes have by default a pre-populated list of trusted CAs.
This can be modified at will, therefore you can add your own CA.
In this list, the CAs' public keys are stored within their certificates.

When a Google server sends you its certificate, it mentions it is signed by a CA.
If you trust that CA, you can verify that it truely did sign the Google server's cert,
using the CA's public key.

A digital signature is an encrypted hash of the data (data of the certificate?).
When a signature is verified using the CA's public key, it decrypts to a hash
matching the data. That hash should only be correct if it were decrypted with the CA's public key.


## Active Directory
```
## View available CA's in the network.
certutil -config - -ping
```
 
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

# References
https://security.stackexchange.com/questions/8034/how-digital-signature-verification-process-works
https://security.stackexchange.com/questions/20803/how-does-ssl-tls-work
```