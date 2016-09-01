# ssv-ng2-dojo
Playground/dojo for angular2 with a sample project structure, namely for testing purposes.
It also features a mini application showcasing [Hereos of the Storm](http://us.battle.net/heroes/en/) heroes :).

## What does it have?
 - typescript 2
 - gulp
 - sass
 - systemjs
 - angular 2
 - routing
 - [redux](http://redux.js.org/) using [@ngrx](https://github.com/ngrx/store)
 - structure
   - sass theming
   - per feature structure
 - sexy styling ;)

![Dojo App](./screenshot.png)

## What it doesn't have?
Structure is not entirely polished for production e.g. no bundling

# Getting started

## Install

### Automated
 - Open powershell within dir **as admin**
 - run `.\setup.ps1`
 - run `gulp watch`

### Manual
 - run `npm install`
 - create symbolic link in `wwwroot` to point to `node_modules`
 - run `gulp build`
 - run `gulp watch`


## Utils

### Build

```
gulp build
```

### Run/watch

```
gulp watch
```