# Terminal
Terminal console commands for debugging, in order not to bloat the UI and instead having a central
command system.

## Todo
 - Service
	- command name aliases e.g. [help, ?]
	- recent executed commands
 - Component
	- esc to clear


# Usage


## Configure Global

### Decorator default name formatter
Change default name formatter when using `@RegisterCommand` decorator e.g. from camelCase to kebabs.
e.g. `doSomething` => `do-something`.

```ts
CONFIG.nameFormatter = (name: string): string => _.kebabCase(name);
```
