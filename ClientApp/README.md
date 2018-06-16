# login.component
вызывает AuthenticationService . 
Если пароль и логин верные, то в сервисе вызывается do, а в login.component - subscribe
иначе в login.component  error => {...}

2.
2.1. подключаем jquery в npm i jquery --save, то же самое с bootstrap и toast
+
npm install --save-dev @types/jquery

Not all JavaScript libraries/frameworks have TypeScript declaration files. 
On the other hand, we might want to use libraries/frameworks in our TypeScript files without getting compilation errors. What can we do? 
One solution is to use the declare keyword. 
The declare keyword is used for ambient declarations where you want to define a variable that may not have originated from a TypeScript file.


2.2. подключаем 
 "styles": [
        "styles.css",
        "../node_modules/bootstrap/dist/css/bootstrap.min.css",
        "../node_modules/toastr/build/toastr.css"
      ],
      "scripts": [
        "../node_modules/jquery/dist/jquery.min.js",
        "../node_modules/bootstrap/dist/js/bootstrap.js",
        "../node_modules/toastr/build/toastr.min.js"

      ],

  2.3 в Error404Component 
	  declare let toastr;
	  declare let $;


# AngularCore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
