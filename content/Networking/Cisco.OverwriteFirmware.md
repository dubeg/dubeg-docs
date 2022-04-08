```
dir
dir /all # Hidden files
pwd
cd flash0
cd flash1
cd disk0
cd disk1
```

The Web interface will not work for you any longer since the images got too big. 
The Web interface likes to copy over the new image first and 
then delete the old one once it confirms it copied over successfully. 
Now you have to make a little leap of faith and use the command line to overwrite the existing software. 
- Set up a TFTP server somewhere with the software image on it. 
- Then telnet or SSH to the AP and use the following command syntax to load it on the AP:
```
archive download-sw /overwrite /reload tftp://10.0.0.10/c1200-k9w7-tar.12.3(8)JEC2.tar
```

Substitute your TFTP server's IP address for the 10.0.0.10 and then it's just a matter of verifying your software filename.

Enjoy.