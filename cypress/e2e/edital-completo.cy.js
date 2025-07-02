import { getCurrentDateTime } from '../helpers/date.helper';

describe('Teste de E.M. (Edital Médio)', () => {
  beforeEach(() => {
    // Gancho em nível raíz
    // executa antes de realizar cada teste(it)
    cy.login(
      '/',// [URL do sistema]
      Cypress.env("username"), // [E-mail do usuário]
      Cypress.env("password"), // [Senha do usuário]
    ); //Acessa a página de login usando as credenciais do usuário e senha.
  });

  it('Cria um edital completo conforme especificação', () => {

    // Identificação do Edital
    cy.preencheEdital("Completo");
    cy.preencheCronograma();
    cy.preencheOrcamento("Completo");
    cy.preenchePergunta();
  });
});