---
date: 2018-09-27
title: Docker MsSQL
menu:
    sidebar:
        parent: Applications
---
Instructions for running MSSQL under Docker on WSL2.

```
# https://docs.docker.com/docker-for-windows/wsl/
# https://docs.microsoft.com/en-us/windows/wsl/wsl2-kernel

wsl --set-default-version 2
wsl --list --verbose
```


## Configuring
Dockerfile
```
FROM mcr.microsoft.com/mssql/server:latest
ENV accept_eula="Y" \
    sa_password="..." \
    mssql_pid="Express" 
EXPOSE 1433
VOLUME C:/users/gdube/SharedWithDocker:/var/opt/mssql/data
CMD /opt/mssql/bin/sqlservr
```
A. Create dockerfile in a directory.
B. Run: `docker build -t <tagName>`
C. Run: `docker run <image> -d`



## Running
```
docker run `
    -e "ACCEPT_EULA=Y" `
    -e "SA_PASSWORD=..." `
    -e "MSSQL_PID=Express" `
    -p 1433:1433 `
    -v C:/users/gdube/SharedWithDocker:/var/opt/mssql/backup `
    -d  `
    --name SqlDev `
    mcr.microsoft.com/mssql/server:latest


-e: set environment variable.
-d: detached mode. Remove this arg if you want to see stdout/stderr
-p: specify host:container port mapping.

MSSQLPID:
- Developer (default)
- Express
- ...

SA_PASSWORD: 
Make sure your SA password is complex enough.
Otherwise, the container will be stopped by an error from the installation.

restore_dbs: it seems to be an environment variable that was available for MSSQL Windows containers, not Linux containers. Too bad, can't use it.
```


## Get container IP:
```
docker container ls
docker ps
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <containerName>
```


## Azure Data Studio
```
Server: localhost,1433
```