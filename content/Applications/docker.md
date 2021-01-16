---
date: 2018-09-27
title: Docker
menu:
    sidebar:
        parent: Applications
---

## MSSQL Linux container
I'm using the Linux MSSQL version just so I can run a Linux container instead of a Windows container, because it seems that the MSSQL Windows container suck: I experienced freezes many times and just bad performance overall with it.

```
docker pull mcr.microsoft.com/mssql/server:2017-latest

# Note:
# Setting the port is needed to be able 
# to connect from outside the container.
docker run `
    -e "ACCEPT_EULA=Y" `
    -e "SA_PASSWORD=<redacted>" `
    -p 1433:1433 `
    --name sqldev2 `
    -d mcr.microsoft.com/mssql/server:2017-latest
```
The Docker run command creates and starts a container from an image, in this case the image we pulled just before running the command.

You can stop the container by issuing `docker stop sqldev2`.
You can start it again by ussing `docker start sqldev2`.

To connect from your host to the MSSQL instance within the container, use `localhost`, or `localhost,<port>` if you used a non-mssql-standard port when creating the container. 
Ex: `localhost,1433`.



## Import databases
I wasnt able to mount a host directory on my container, so instead I copied
the individual files on my host to the c:/ drive of my container. 
Note: i think the container needs to be stopped in order to copy files to it.

docker cp .\db.bak sqldev2:var/databases



## Useful commands
```
docker inspect sqldev2
docker ps
docker exec <containerName> <cmd> 
docker exec sqldev2 ls
docker container ls
docker container ls -a
docker cp <hostPath> <containerName>:<containerPath>
```