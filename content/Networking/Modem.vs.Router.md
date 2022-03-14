---
date: 2021-12-24
title: Modem & Router
menu:
    sidebar:
        parent: Networking
---
Both devices serve a different purpose. 

- A router is a device that connects hosts (aka. computers) together using the IP protocol.
    + At home, your router would be a small device with 5 ports for wired connections, as well as offering WiFi.
    + Routers speak Ethernet through their wired connections, and WiFi through its antenna(s) if they have any.
    + Both of these protocols are encapsulated into the IP protocol to connect to the internet.
    + A router is usually connected to a cable|DSL Modem through its WAN port.
        - Without which, the router would not have access to the internet.

- A modem is used to connect your home to the internet through your ISP's equipment.
    + ISPs typically provide Internet through either Coax, DSL or Fiber. 
        - ISPs have been marketing coax as cable.
    + Cable modems use a coaxial connnection.
        - These are the most common modems today.
        - Coax is the same type of connection found on in TV / Cable boxes. 
    + DSL modems have a telephone connector.
        - These aren't used much or at all nowadays in first-world countries.
        - The speeds offered are just abysmal.
    + Fiber modems use a fiber connection.
        - Very expense.
        - Commonly found in the Enterprise world.

The reason a modem is required is because a router only speaks Ethernet through its RJ-45 ports. A different signaling protocol is used in Coax/DSL/Fiber connections, and so the modem is required to convert Coax/DSL/Fiber to Ethernet. In other words, the modem's job is to speak Ethernet over Coax/DSL/Fiber.

_Note: Ethernet is almost exclusived used with CAT5/6 cables and RJ-45 connectors._

Nowadays, ISPs offer two-in-one devices for convenience, ie. a device combining both Modem and Router.

Finally, the reason ISPs offer internet through eg. coaxial connections is because... I don't know. For one thing, Ethernet over CAT5/6 connections are just not suited for long distance connections. But it might just be a matter of reusing existing installations (TV cables already reaching into every home), or bandwidth.