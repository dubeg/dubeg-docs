---
date: 2018-06-01
title: Golang
menu:
    sidebar:
        parent: Applications
---


## Packages
Example: Package Abc
Files within the same directory, with "package Abc" as the first line of code
are included in the package.

A package that is never imported will not be compiled.

## Build Constraint
When building, ie. `go build main.go`, you can specify build flags that
are used to constraint the build.

Ex: `go build main.go -flags "sqlite"`. 
Files will build constraint "sqlite" should now compile as well.

```Example of sqlite.go
//+build sqlite

package main
...
```

## Testing
Files named "_test.go" are excluded form normal builds,
and executed using `go test ..`.