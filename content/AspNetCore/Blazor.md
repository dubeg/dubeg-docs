---
date: 2020-05-15
title: Blazor
menu:
    sidebar:
        parent: AspNetCore
---



## Route Parameters
```
@page "/RouteParameter"
@page "/RouteParameter/{Parameter}"

@code {
    [Parameter]
    public string Parameter { get; set; }
}
```
- Parameters can't be optional.
	+ Instead, set multiple routes (using `@page` directives).

- DUBEG:
	+ Can parameters be other types?



## Component Parameters
- Define public properties.
- Annotate them using `[Parameter]`.
- A component shouldn't write to its own parameter properties.
	+ Use private backing fields instead.



## Component with children
```
@page "/PageOne"
<h1>Title</h1>
<Panel OnClickCallback="@ShowMessage">
    Content.
</Panel>
```
```Panel.razor
<div>
    @ChildContent
    <button @onclick="OnClickCallback">Update</button>
</div>

@code {
    [Parameter]
    public RenderFragment ChildContent { get; set; }

    [Parameter]
    public EventCallback<MouseEventArgs> OnClickCallback { get; set; }
}
```



## Static Assets
- Javascript/css files are located in `/wwwroot` as usual.
- Reference: `/folder/file` `=>` `/wwwroot/folder/file`
	+ Using `~/` is not supported.



## Lifecycle Methods
- OnInitialized[Async]
- SetParameters[Async]
- OnParametersSet[Async]
- OnAfterRender[Async]
	+ May be used to manipulate any ref set.
	+ Activating JS libraries on rendered DOM.



## Forms
```
<EditForm Model="@x" OnValidSubmit="HandleValidSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />
    <InputText id="name" @bind-Value="x.Name" />
    <button type="submit">Submit</button>
</EditForm>
```
- DataAnnotationsValidator
- ValidationSummary
- Watch out: bind-Value is case-sensitive.



## EF Core

Use this:
```
Razor Page
@inject MyService Service

Startup
services.AddDbContext<MyContext>(ServiceLifetime.Transient);
services.AddTransient<MyService>();
c.f.
```


OR (?)
```
Razor Page
@inherits OwningComponentBase<Data.MyService>

Startup
services.AddDbContext<MyContext>();
services.AddScoped<MyService>();
```