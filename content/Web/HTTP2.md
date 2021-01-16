---
date: 2018-09-27
title: HTTP
menu:
    sidebar:
        parent: Web
---


# HTTP today (v1.1)
- HTTP/1.1 has been around for 15 years now.
- HTTP/1.1 practically only allows one outstanding request per connection.

- HTTP/1.1 is used for virtually everything on the Internet.
- HTTP/1.1 is huge. (176 pages of spec) It includes many details, subtleties and a lot of optional parts.
- HTTP/1.1 includes so many stuff, resulting in almost no implementation ever implementing everything.
- HTTP/1.1 could use TCP better.
- HTTP/1.1 is very latency sensitive, partly because of buggy HTTP pipelining implementations which no one uses.

## Pipeline
HTTP pipelining is a way to send another request while waiting for the response to a previous request. 

What is it?

Even today (2015), desktop browsers ship with HTTP pipelining disabled by default.

## Overcoming latency pains

## Spriting
Spriting describes a set of images bundled together in a single, larger image. Then, Javascript/CSS is used to point to a single image in the larger one.

This method is used to speed up website loading. It is faster to download a single, larger image, than getting multiple smaller ones.

Downsides
- If the website only wants to show a few images among many in the file.
- All images get evicted from the cache at the same time.

## Inlining
Inlining describes embedding the image data in the CSS files using url() and base64 (only?).

## Concatenation
In Javascript files or CSS.

## Sharding
Sharding means serving aspects of your service on as many different hosts as possible. Why?

Initially, HTTP/1.1 allowed two (2) TCP connections MAX for each host. Now, this limitation was softened to around 6-8 connections. But devs still bumped the number of hosts to allow for more connections, because it is never enough.

Another reason is also to put images or resources on a separate hostname that doesn't use cookies, as the size of cookies can sometimes be significant.

# HTTP2
https://http2.github.io/faq/

- Binary protocol
    - Easier implementation
    - Not easily human-readable
        - But since HTTP2 features compression, and will often run over TLS, it being human-readable over the wire is pointless.
        - Use Wireshark inspector and the likes instead.
- Multiplexed streams
    - A stream ID is included in every frame sent over HTTP2, to associate it with a "stream".
    - Stream
        + Independent, bi-directional sequence of frames between a client and server within an HTTP2 connection
        + The order in which frames are sent within a stream is significant.
        + Can be  open/closed by either endpoint.
        + Each stream has a priority (weight), which tells its importance in case resources are parse.
        + Streams may have dependent child-streams.
    - HTTP2 connection
        + Can contain multiple concurrently-open streams, with either endpoint interleaving frames from multiple streams.
- Header Compression (HPACK)
- Reset (stream)
- Server push
    - Also named cache push
    - Idea is if a client asks for X, the server knows it will want Y too. So Y is sent without being asked explicitely. 
    - Must be explicitely allowed by the client.
- Flow control

## Do NOTs
- Spriting
- Inlining
- Sharding

# After HTTP2
HTTP2 includes an update mechanism that will permit easier updates to the protocols.

QUIC (QUIC UDP Internet Connection) is another protocol developped by Google, aiming to be nearly equivalent to an independent TCP connection, but with much reduced latency. It is an experimental transport layer network protocol.

If QUIC features prove effective, those features could migrate into a later version of TCP and TLS. 