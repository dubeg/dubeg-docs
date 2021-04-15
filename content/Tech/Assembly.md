---
date: 2019-03-28
title: Notes on Assembly
menu:
    sidebar:
        parent: Tech
        identifier: x86-assembly
---

_The x86 instruction set._

## Stack
Modifying the stack:

- PUSH
- POP



## Common Registers
General purpose:

- EAX 
	+ Accumulator Register
- EBX
	+ Base Register
	+ reference point for modifying the stack.
- ECX
	+ Counter Register
	+ used for looping.
- EDX
	+ Data Register
	+ used in multiplication and division.
- ESI 
	+ source 
	+ used in memory operations.
- EDI
	+ destination 
	+ used in memory operations.

Note:
'E' = extended (32-bit)
Without E = 16-bit.
Suffix H & L = 8-bit each.
	- high
	- low

Example:
- EAX    (32 bit)
- AX     (16 bit)
- AH, AL (8 bit, 8 bit)



## Instructions
- MOV
	+ most used to load data in registers.
	+ used to load data in memory.

Example: 
	
	mov eax, dword ptr ds:[01009000]
	--------------------------------
	DWORD: 32 bit value
	PTR: pointer (data at address will be loaded)
	DS: data segment (loaded value is from the section .data)

- LEA
	+ load effective address
	+ slower than mov
	+ most used to prepare loading pointers into registers
	+ used to modify registers only.
	+ cant touch memory.

Example:

	1: LEA EAX, DWORD PTR SS:[EBP - 4]
	2: LEA EAX, [EAX + EBX * 4 + 256]
	------------------------------
	(1) load 32 bit value below the base stack.
	(2) accepts multi. and additon ops.

- ADD: add dest, srcOfAdd
- SUB: sub dest, srcOfSub
- SAL: sal dest, srcOfN    (shift left N times.)
- SAR: sar dest, srcOfN    (shift right N times.)
- INC: inc dest
- DEC: dec dest

- CMP
	+ comparing data
- JG(E): jump if greater (or equal)  : doesnt work on negative numbers.
- JL(E): jump if less (or equal)     : doesnt work on negative numbers.
- J(N)E: jump if equal (or not)
- JA(E): jump if above (or equal)
- JB(E): jump if below (or equal)

Ex:
	
	cmp eax, 1
	je 00401000
	----------
	Compare, then jump to 004.. if (eax == 1).

- TEST or AND
	+ compare if two values are equal or not
	  using a bitwise op.
	+ if values are equal, then ZF == 1.
	+ otherwise, ZeroFlag == 0.

- J(N)Z
	+ jump if ZeroFlag == 0 (or not)

Ex:
	
	test eax, 1
	jnz 00401000
	------------
	Let's suppose eax == 1:
	- result is 1 (aka. true).
	- jump will not occur.


## Segment Registers
DS: data segment (references the section .data)
CS: data segment (references the section .code)
SS: stack segment (references the stack)
ES: extra segment (rarely used)



## Pointer Registers
EBP: base pointer
ESP: stack pointer (offset to the EBP)
EIP: instruction pointer (points to the address of the next instruction)



## References
https://www.unknowncheats.me/forum/programming-for-beginners/63947-reverse-engineering-beginners-guide-x86-assembly-debugging-windows-apps.html