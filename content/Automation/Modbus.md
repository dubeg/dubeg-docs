# ModBus
- 1979: manufacturer Modicon published the Modbus communication interface.
    * Modican is now a brand of Schneider Electrics.
- Implements a multi-drop network
- Master/client architecture.
- Communication between Modbus nodes was done with messages.
- Open standard describing the messaging structure.
- Physical layer: undefined/free to choose.
- First, it ran over RS-232 (physical interface).
- Then, RS-485 (longer distances, higher speeds, true multi-drop)


It first ran over wired serial lines (COM), but then wireless and Ethernet over TCP/IP was implemented.


- Message structure: peer-to-peer
- Able to work with point-to-pont or multi-drop networks.
    + How?
- Conversation always started by the master in the Modbus network.
-  A master sends a message and, depending of the contents of the message, a slave takes action and responds to it.
- There can be multiple masters in a network.
- Addressing in the message header is used to define which device should respond to a message. 
- All other nodes in the network ignore a message if not addressed to them.


## Serial Transmission Modes
The modes define the way the messages are coded. All nodes in a network must use the same mode to function properly.

- ASCII
    * ModBus/ASCII
    * String format
- RTU
    * ModBus/RTU
    * Remote Terminal Unit 
    * Binary format