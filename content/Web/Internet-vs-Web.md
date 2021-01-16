---
date: 2018-09-27
title: Internet vs web
menu:
    sidebar:
        parent: Web
---


## Internet and the web
- HTML
- DNS
- HTTP
- TCP
- IP
- Web servers and browsers

First, a note on the Internet and the Web (World Wide Web). The Internet is a massive network of networks. It is a networking infrastructure. Information that travels over the Internet does so in a variety of protocols.

The web is a way of accessing information over the Internet. It uses the HTTP protocol, to obtain web resources such as web documents (webpages), which are often linked to other documents via hyperlinks.

The web is just one way that information is transmitted over the Internet. Indeed, the Internet is also used for email, Usenet news group, instant messaging, file transfer using FTP, etc.

### Web protocols
Most Internet protocols are specified by Internet documents known as a Request for Comments, or RFCs. Ex: HTTPv1 is specified by RFC 1945.

### HTTP
https://tools.ietf.org/html/rfc2616

"The Hypertext Transfer Protocol (HTTP) is an application-level protocol for distributed, collaborative, hypermedia information systems"

The first version was a simple protocol for raw data transfer on the Internet. HTTP/1.0 improved the protocol by allowing MIME-like messages, containing META info about the data being transferred. HTTP/1.1 includes more strict requirements than its previous version.   

- Communication as client & server (request & response)
- Sits on top of the TCP layer in the protocol stack.
- Used by web servers and browsers.
- Connectionless
    - Clients sends requests to servers for web resources.
    - After the request is serviced, the connection between the client and server is disconnected.
    - A new connection must be made for each request.
- Text based


#### Request/response cycle
1. A human types a URL in the address bar of a browser.
2. The browser uses the URL to find the associated IP address through DNS.
3. With the IP address, the browser initiates a request to the server and waits for a response.
4. The server processes the request, and sends back a response containing an HTTP header (META), followed by the resource (document) requested if it exists.
5. The browser receives the response and closes the connection.
6. The browser parses through the document, and looks for other elements required by the document.
7. For each required elements, the browser makes additional connections and HTTP requests to the server for these elements.
8. The page is then rendered in the window of the browser. However, the rendering can begin before all elements are completed loaded. You might want to check how the different browsers handle the rendering.

N: nowadays, for convenience, the URLs won't often reveal which actual files/ressources you are accessing. This is made possible by configuring the web server.

#### Types of content
On the internet, there are different types of content grouped into 4 categories:
- Plain text
- Web standards (HTML, CSS, JS, etc.)
- Server-side languages (PHP, ASP.NET (C#), JSP)
- Others (formats requiring other apps/plugins)

### SMTP
Another commonly used Internet services is mail. E-mail uses a protocol called Simple Mail Transfer Protocol (SMTP).

Details
- Text based
- Connection oriented
- More complicated than HTTP

### Transmission Control Protocol (TCP)
Under the application layer in the protocol stack is the TCP layer. When applications open a connection to another computer on the internet, the messages they send (using a specific application layer protocol such as HTTP, SMTP, etc) get passed down the stack to the TCP layer.

TCP is responsible for routing application protocols to the correct application on the destination computer. To accomplish this, port numbers are used.

Details
- Connection-oriented
- Reliable
    + Each packet transmitted must be received.
    + Checksum for error-checking the data
- Byte stream

N: TCP doesn't know anything about IP addresses. Its job is to deliver data from application to application reliably.

#### Ports
Ports can be thought of as separate channels on each computer. When a packet arrives at a computer and makes its way up the protocol stack, the TCP layer decides which application receives the packet based on a port number.

Ex: you can surf the web while reading e-mail.
This is because these 2 applications used different port numbers.

Details 
- When the TCP layer receives the data from the application layer (above in the stack), it segments it into manageable 'chunks' and adds a TCP header with specific TCP data to each chunk. This meta data includes the port number of the application the data needs to be sent to.
- When the TCP layer receives the data from the IP layer (below in the stack), it strips the TCP header from the packet, does some data reconstruction if required, and then sends the data to the correct application using the port number taken from the TCP header.

Common ports
- FTP: 20/21
- Telnet: 23
- SMTP: 25
- HTTP: 80

### Internet Protocol (IP)
IP's job is to send and route packets to other computers. IP packets are independent entities and may arrive out of order or not at all. It is TCP's job to make sure packets arrive and are in the correct order.

Details
- Unreliable
- Connectionless

```
    A complete packet
    |-----------|-----------|-------------------------------|
    IP header    TCP header  Application layer Data
```

