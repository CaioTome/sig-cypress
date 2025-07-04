import { getCurrentDateTime } from '../helpers/date.helper';
import moment from 'moment';

describe('Teste de E.M. (Edital Médio)',()=>{
      beforeEach(() => {
    cy.login(
      '/',
      Cypress.env("username"),
      Cypress.env("password"),
    );
  });
    it('Realiza login no sistema e cria um edital medio',()=>{
        cy.intercept("POST","/edital").as("criarEdital")
        cy.preencheEdital("Medio");
        cy.preencheCronograma();
        cy.preencheOrcamento();
        cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações do Edital
        cy.wait("@criarEdital").then((req)=>{
          cy.get('[data-cy="menu-finalizar"]').click(); //Clica no botão "Finalizar" para salvar e sair da área de adição do Edital
          expect(req.response.statusCode).to.equal(201);
          cy.get('table[aria-labelledby="tableTitle"]').should("contain","Grupo-06 E.S. ");

        })
      });
});
// ## Atividade 

// Após a realização do Teste Cypress se espera que o Edital tenha sido criado com sucesso e apareça na tela de visualização dos Editais.

// ---
