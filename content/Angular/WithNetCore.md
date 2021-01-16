---
date: 2019-03-28
title: With AspNetCore
menu:
    sidebar:
        parent: Angular
---

About the Angular template from AspNetCore.

The template includes a NetCore backend and an Angular front-end.
The project can be published as a single unit.


NetCore backend

- Data access
- Authorization
- Other server-side concerns.


Angular frontend

- Resides in the ClientApp directory.
- All UI concerns.
- Contains Bootstrap styles by default.


## Run the dev server
This is useful when you want to avoid the cost of compiling/running the Angular dev server everytime you want to reload the AspNetCore backend.


A. Tell the AspNetCore pipeline to use another Angular dev server.

Startup.cs
```
// Comment this out:
// spa.UseAngularCliServer();

// Add this:
spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
```

When the AspNetCore app will start, it won't launch its own Angular dev server. Instead, it will proxy requests to the Angular dev server. This enables the NetCore app to start and stop faster.


B. Start an Angular dev server.

```
cd ClientApp
npm start
```
It should be listening to the default URL, localhost:4200.


C. Start a AspNetCore app instance.




Hot module replacement
----------------------
Angular uses Webpack internally for multiple things, and luckily it offers a feature called Hot Module Remplacement (HMR), which is similar to live-reload in other systems.

To enable that development feature, you'll have to activate it both on client-side (in your angular application), and on the Angular development server.


### Development Server

`ClientApp\package.json`
```
{
    ...
    "scripts": {
        ...
        "start": "ng serve --hmr"
        ...
    }
    ...
}
```


### Client App


Install the HMR module for the app.


```
npm install --save-dev @angularclass/hmr
```



You'll need to change the bootstrap process a tiny bit.


Add the following file:

`ClientApp\src\hmr.ts`
```
import { NgModuleRef, ApplicationRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
  let ngModule: NgModuleRef<any>;
  module.hot.accept();
  bootstrap().then(mod => ngModule = mod);
  module.hot.dispose(() => {
    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const makeVisible = createNewHosts(elements);
    ngModule.destroy();
    makeVisible();
  });
};

```



Edit `main.ts`:

`ClientApp\src\main.ts`
```
...

// -----------------
// Add this:
// -----------------
import { hmrBootstrap } from './hmr';

...

// -----------------
// Add this:
// -----------------
const bootstrap = () => platformBrowserDynamic(providers).bootstrapModule(AppModule);

if (environment.hmr) {
  if (module[ 'hot' ]) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap();
}
```

At this point, when environment.hmr is true, HMR will be activated.
Now, we need to a way to set environment.hmr to true.


`ClientApp\src\environment\environment.ts`
```
export const environment = {
    ...
    // -----------
    // Add this:
    // -----------
    hmr: true
};

```
