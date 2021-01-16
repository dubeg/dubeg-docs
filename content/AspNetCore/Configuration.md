---
date: 2019-03-28
title: Configuration
menu:
    sidebar:
        parent: AspNetCore
---


Startup.cs
```csharp
// Bind top-level properties to a class.
services.Configure<MyOptions>(Configuration);

// Bind a section to a class.
services.Configure<MySectionOptions>(Configuration.GetSection("MySection"));
```

Each call to Configure<MyOptions> adds a service to the service container.
The last added service wins and sets the config value.



AbcController.cs
```
public AbcController(IOptions<MyOptions> optionsAccessor)
```




## Reloading
Reloading configuration data with IOptionsSnapshot.

IOptionsSnapshot supports reloading options with minimal processing overhead. Options are computed once per request when accessed and cached for the lifetime of the request.




## Startup
IOptions can be used in Startup.Configure(...), since ConfigureServices(...) runs behorehand.

Startup.cs
```
public void Configure(..., IOptions<MyOptions> options) {
    ...
}
```


- IOptions shouldnt be used in Startup.ConfigureServices.