// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './login'
import './edital'

//import para lidar com o CKEditor5
import 'cypress-iframe';
import 'cypress-real-events';

Cypress.on('uncaught:exception', (err) => {
  // Ignora erros do CKEditor5 relacionados a "o is null"
  if (err.message && err.message.includes('o is null')) {
    return false;
  }
  // Permite que outros erros quebrem o teste normalmente
});