# Dashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.3.

For run this project you need changes the next ts

Note: if you up your angular app in different host and port than  OAuth2 server you will have across origin.

## auth.service.ts
function:
 - login
    * const headers = {
    *    Authorization: 'Basic ' + btoa('CLIENT_ID:PASSWORD_CLIENT_ID'),
    *    'Content-type': 'application/x-www-form-urlencoded',
    *  };

    * return this.http.post('http://localhost:9000/auth/oauth/token', loginPayload, {
    *    headers,
    *  });

* sometimes, dependes your configuration your customer oauth2 with jwt or ldap the username will come the next way
     * username -> normal configuration
     * user_name -> customer configuration 
     * preferred_username -> ldap
     
* Check the next function or method and set the correct, for will know what is the correct username you can check access_token on  [JWT IO](https://jwt.io/)
  - user 
  - isAuthenticated
  
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
