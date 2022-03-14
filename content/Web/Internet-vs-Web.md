---
date: 2018-09-27
title: Internet & Web
menu:
    sidebar:
        parent: Web
---

You've seen these words all too often:

- HTML
- DNS
- HTTP
- TCP
- IP
- Web servers and browsers

To me, the Internet conceptually represents the way computers are connected together at the physical level: computers are connected (wired or wireless) to switches or routers to talk to each other. But technically, the Internet refers to the software side of it: the data travelling within those cables use a mix of protocols to get to their destination: Ethernet or Wifi, and IP, the Internet Protocol. TCP or UDP are two other very common protocols that build on top of IP to provide certain guarantees to the exchange of data.

The web, for its part, builds on top of the internet to provide websites, and it includes a bunch of technologies to do so:

- HTTP: communication protocol between browsers and servers. 
- URL: links to webpages
- HTML: structure of a webpage (header, footer, body, etc.)
- CSS: styles of a webpage (color, font, etc.)
- JavaScript: programming language of webpages.
- SVG: graphics encoded in XML.
- ...

Although websites are mostly visual pages to the common man, it is not necessarily so. You can also access web resources using non-GUI tools, such as CURL or Powershell's Invoke-WebRequest. They still speak the language of the web (HTTP), and use URLs to access resources. A common example is to download an image or an application served by a website, locally to a folder on your computer.

Note:  
DNS wasn't defined by the Web Standard guys, but it is used in URLs. DNS's main purpose is to map a textual name to an IP Address, so that humans only have to remember names (eg. `www.google.com`) instead of numbers (`8.8.8.8`).