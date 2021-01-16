# EditContext issue
After modifying the EditContext.Model reference, 
my JSInterop method isn't fired anymore.


## Workaround 1 - Never change EditContext.Model by using a container model
```
EditContext.Model = new FormModel()
class FormModel {
    <Model> Model
}
```
- Pretty simple.
- Requires the ObjectGraphDataAnnotationsValidator 
  component from the experimental package.


## Workaround 2 - Never change EditContext.Model by using a model that mutates itself heavily
- The original way I tried to work around that problem.
- Involves logic that is hard to follow.





## Mini-Repro
Create a minimal repro project,
and if the issue persists, create an issue.