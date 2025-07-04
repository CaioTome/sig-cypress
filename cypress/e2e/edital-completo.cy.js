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
    cy.intercept("POST","/edital").as("criarEdital")
    // Identificação do Edital
    cy.preencheEdital("Completo");
    cy.preencheCronograma();
    cy.preencheOrcamento("Completo");
    cy.preenchePergunta();
    cy.get('[data-cy="menu-salvar"]').click();
    cy.wait("@criarEdital").then((req)=>{
      cy.get('[data-cy="menu-finalizar"]').click(); //Clica no botão "Finalizar" para salvar e sair da área de adição do Edital
      expect(req.response.statusCode).to.equal(201);
    cy.get('table[aria-labelledby="tableTitle"]').should("contain","Grupo-06 E.S. ");
    });
  });
});