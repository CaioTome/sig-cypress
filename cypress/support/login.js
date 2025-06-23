// cypress/support/commands.ts

Cypress.Commands.add('login', (url, username, password) => {
  cy.visit(url);
  cy.get('#login').type(username);
  cy.get('#senha').type(password);
  cy.get('button[type="submit"]:contains("Acessar")').click(); //Botão Acessar da página principal
});
