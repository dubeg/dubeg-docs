---
date: 2020-05-01
title: Containers
menu:
    sidebar:
        parent: Windows
---

Deployment efficiency

> What developers usually want is an easy way to deploy & run a single or set of programs in a testing | production environment, without constantly having to care about filesystems, server updates, etc.

Execution efficiency

> For the purpose of running a single or set of related programs, simulating the entirety of an x86 host on another seemed like a ridiculous waste of resources. 

Docker

> Docker & co. virtualizes the OS instead of an entire host (i.e. hardware intricaties), and called those instances of virtualization __containers__. It provides tooling to automate deployment and executions of containers on clusters of physical hosts.


## Deployment
Containers for ease of deployment: devs can automate deployment steps using a single tool and a config file: copies these files, assign this IP, run on this cluster of servers, etc.

Ex dockerfile
```
FROM <dockerImage>
RUN <cmd>
```

- So, `docker build <dockerfile>` gives us a docker image. 
- It built an new image from a base image.


## Tools to build images
### Image2Docker
Generates dockerfiles from images (WIM, VHD, running servers, etc).

Ex: you have a server with an instance of SQL Server installed, and you want to make a docker image out of it to run as a container.

- Looks at Roles & Features, alogn with installed programs.
- IIS
    + HTTP handlers in IIS configuration
    + IIS Websites
    + ASP.NET apps
- SQL Server Instances
- Apache Web Server
- ...

Example
```
ConvertTo-Dockerfile 
    -RemotePath \\UNC\C$
    -OutputPath C:\newDockerfile
    -Artifact IIS 
```
Output:
```
FROM microsoft/aspnet:windowsservercore..
SHELL [""
RUN Remove-Website 'Default Web Site';
RUN New-Item -Path C:\iis\iis-env -Type Directory -Force;
RUN New-Website -Name 'iis-env' -PhysicalPath 'C:\iis\iis-env' -Port 8090 -Force;
EXPOSE 8090
COPY []
```





## On Windows
Windows Server Containers 

+ If running on the same host:
    + they can share the same Windows kernel, or
    + they can run under Hyper-V isolation, each with their own kernel (Windows or Linux, depending on which type of container ).