# Getting Started

## Install dependencies

```bash
yarn or npm install
```

# Architecture

## scss

holds all scss files including mixins and utilities

the main and only page to add customizations to is _theme.scss

all variables can be found in _variables.scss

all functions can be found in _functions

_mixins.scss, _utilities.css are files that import mixins and utilities into one place before compiling. 

the scss files at the bottom of the list pull the respective files into their proper compilation space.
Ex: bootstrap.scss 
@import 'functions';
@import 'variables';
@import 'mixins';
@import 'fonts';
@import 'print';
@import 'reboot';
@import 'type';
@import 'images';
@import 'code';
@import 'grid';
@import 'tables';
@import 'forms';
@import 'buttons';
@import 'transitions';

if you create a new mixin/utility file make sure to add it to this file or it will not make it in the final compilation.

## scss > mixins

all mixins go here

## scss > utilities

display helpers, sizing, visibility, etc go here

## project structure
this project works side by side with the npdb-usafb-template website. When compiling the necessary files are ported to the template website. This can be edited in package.json to be copied to dist if need be.

simple structure:

# USAFB
## npdb-usafb-templates > css (compiled files end up here)
## bootstrap.4.0.0-dev


## build it
look for css-compile in the build task menu. This will check for errors compile and prefix your classes. below is the script.

"css-compile": "node-sass --output-style expanded --source-map true --source-map-contents true --precision 6 scss/bootstrap.scss dist/css/bootstrap.css && node-sass --output-style expanded --source-map true --source-map-contents true --precision 6 scss/bootstrap.scss ../npdb-usafb-templates/css/usafb-bootstrap.css && node-sass --output-style expanded --source-map true --source-map-contents true --precision 6 scss/bootstrap-grid.scss dist/css/bootstrap-grid.css && node-sass --output-style expanded --source-map true --source-map-contents true --precision 6 scss/bootstrap-reboot.scss dist/css/bootstrap-reboot.css && gulp autoprefixme",

