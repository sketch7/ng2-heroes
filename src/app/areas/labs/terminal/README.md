# Terminal
Terminal console commands for debugging, in order not to bloat the UI and instead having a central
command system.

## Todo
 - Service
	- command name aliases e.g. [help, ?]
	- track executed commands (name, count, time)
		- recent executed commands
		- most executed commands
 - Component
	- esc to clear
	- show current selected command info?
	- parse command naming for UI selection when passing args
	- handle autocompletation click to prefill command
 - Command
	- Icon?
	- tag?

# Usage

TODO


## Configure Global

### Decorator default name formatter
Change default name formatter when using `@registerCommand` decorator e.g. from camelCase to kebabs.
e.g. `doSomething` => `do-something`.

```ts
CONFIG.nameFormatter = (name: string): string => _.kebabCase(name);
```
