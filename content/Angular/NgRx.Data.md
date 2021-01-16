---
date: 2019-08-07
title: NgRx-Data
menu:
    sidebar:
        parent: Angular
---

[Docs](https://ngrx.io/guide/data)

- an extension symplying management of entity data
    + by reducing amount of explicitness.
- abstraction over Store, Effects, Entity.
- targets management of entities persisted to database.
- ill-suited to non-entities
    + Ex: session data, etc.
    + Prefer standard NgRx for these.


Entity
: object with long-lived data values.
  Typically persisted into database.
  Typically object in application domain.
  Ex: customer, order, product, user.


## Key Concepts
- automates creation of actions, reducers, effects, dispatchers, selectors.
- provides default HTTP GET, PUT, POST, DELETE methods for entities.
- holds entities as collections within a cache (a slice of NgRx store)
- supports optimistic|pessimistic saveStrategies.
- enables transactional saves of 1..N entities in same request.
- makes default implementation choices
- offers extension points for customizing defaults.


## Config Definition
A EntityMetadataMap tells NgRx Data about your entities. 
Add a property to the set for each entity name.

```typescript
import { EntityMetadataMap } from '@ngrx/data';
 
const entityMetadata: EntityMetadataMap = {
      Hero: {},
      Villain: {}
};
 
export const entityConfig = {
    entityMetadata,
    // Overrides for non-standard plural.
    pluralNames: { Hero: 'Heroes' }
};
```


## Config Registration
Register the previous config into the root store of NgRx.

```typescript
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
@NgModule({
    imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        EntityDataModule.forRoot(entityConfig)
    ]
})
export class AppModule {}
```


## Services Creation
NgRx-Data handles creating, retrieving, updating entities on the server,
by extending EntityCollectionServiceBase.

```ts
import { Injectable } from '@angular/core';
import {
      EntityCollectionServiceBase,
      EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Hero } from '../core';
 
@Injectable({ providedIn: 'root' })
export class HeroService extends EntityCollectionServiceBase<Hero> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Hero', serviceElementsFactory);
    }
}
```


## Usage
To access entities, components should inject entities' services.

In this example, you access a stream of heroes.
When state changes after HTTP GET (getAll), the stream
will emit an array of heroes.

By default, `loading$` indicates whether a request is ongoing.
This helps manage loading states.

```
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../../core';
import { HeroService } from '../hero.service';
 
@Component({
      selector: 'app-heroes',
      templateUrl: './heroes.component.html',
      styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
    loading$: Observable<boolean>;
    heroes$: Observable<Hero[]>;
 
    constructor(private heroService: HeroService) {
        this.heroes$ = heroService.entities$;
        this.loading$ = heroService.loading$;
    }

    ngOnInit() => this.getHeroes();
    add(hero: Hero) => this.heroService.add(hero);
    delete(hero: Hero) => this.heroService.delete(hero.id);
    getHeroes() => this.heroService.getAll();
    update(hero: Hero) => this.heroService.update(hero);
}
```


## Analyzing getAll
1. Component calls svc.getAll(). 
    + A QUERY_ALL action is dispatched to the store.


2. Memory Storage

  A. An EntityReducer reads `action.entityName`, and forwards the action and existing collection state to the right EntityCollectionReducer.
  
  B. The EntityCollectionReducer handles the action based on action.operation,
     then returns a new (updated) collection.
  
  C. Store updates the entity cache with the new collection.
  
  D. Selectors detect & signal changes (if any) to subscribers.


3. Remote Storage

  A. The original EntityAction then goes to the EntityEffects.

  B. Effect selects an EntityDataService for that entity type. 
   The service sends an HTTP request to the server.

  C. Effect turns HTTP response into new success action with heroes.
     Or an error action if the request failed.

  D. Effects dispatches the action to store, which reiterates step #2 to update the collection with heroes and refresh the view.