---
date: 2020-04-28
title: Generics
menu:
    sidebar:
        parent: .NET
---

Value Types
- Struct
- Enum
- Tuple


- Struct
	- value type.
	- int.., float.., bool, char.
	- Can't be null.
- Class
	+ reference type.
	+ string, object, etc.



Constraints

- Type
- Value type
	- `class A<T> where T : struct`
	- Any of built-in value types: int, ..
- Reference type
	- `class A<T> where T : class`
	- Excludes structs, value types.
	- May be null.
	- Can use `as`.
- New
	+ `class A<T> where T : new()`
- Unmanaged
	- Requires type to be valuetype, and
	  that it contains only valuetype members.
	- To support interop scenarios, as these can be
	  safely & efficiently passed to unmanaged code.
- notnull
	+ `class A<T> where T : notnull`
	+ Introduced in C# 8.0.
	+ Allows value types  & non-nullable references.
- Delegate
	+ `class A<T> where T : Delegate`
- Enum
	+ `class A<T> where T : Enum`
