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

  it('Cria um edital médio conforme especificação', () => {

    // Identificação do Edital
    cy.preencheEdital();

    // Restrições
    cy.get('[data-cy="restricoes"]').click(); //Clica na aba Restrições para seguir para a página de Restrições
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check(); //Marca a opção "Definir Duração do Projeto em Meses"
    cy.get('[data-cy="duracaoProjetoEmMeses"]').type('6'); //Preenche o campo "Duração do Projeto em Meses com o valor 6"
    cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check(); //Marca a opção "Pesquisador pode submeter várias propostas"

    // Termo de Aceite
    cy.get('[data-cy="termo-de-aceite"]').click(); //Clica na aba Termo de Aceite para seguir para a página de Termo de Aceite
    cy.get('[data-cy="termoDeAceite"]').click().realType('Aceito os termos de aceite')// Encontra a área editável do CKEditor, clica para ativar e depois digita.

    // Texto do Edital
    cy.get('[data-cy="texto-do-edital"]').click(); //Clica na aba
    cy.get('[data-cy="texto"]').realType('Texto completo do Edital Medio.'); //Preenche o campo "Texto do Edital" com o texto "Texto completo do Edital Médio."

    // Abrangência
    cy.get('[data-cy="abrangencia"]').click(); //Clica na aba Abrangência para seguir para a página de Abrangência
    cy.get('[data-cy="estado-amazonas"]').click(); //Clica no botão "Amazonas" para criar uma nova Abrangência
    cy.get('[data-cy="estado-pernambuco"]').click(); //Clica no botão "Pernambuco" para criar uma nova Abrangência
    cy.get('[data-cy="estado-mato-grosso-do-s"]').click(); //Clica no botão "Mato Grosso do Sul" para criar uma nova Abrangência

    // Cronograma
    cy.get('[data-cy="cronograma"]').click(); //Clica na aba Cronograma para seguir para a página de Cronograma
    cy.get('[data-cy="periodo-de-submissao"]').click(); //Clica na aba Período de Submissão para seguir para a página de Período de Submissão
    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar um novo Período de Submissão

const now = new Date();
const nextYear = new Date();
nextYear.setFullYear(now.getFullYear() + 1);

const pad = n => n.toString().padStart(2, '0');
const formatDateTime = d =>
    `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

cy.get('[data-cy="chamadaUnsaved.inicio"]').type(formatDateTime(now));
cy.get('[data-cy="chamadaUnsaved.termino"]').type(formatDateTime(nextYear));;



        cy.get('[data-cy="chamada-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações do Período de Submissão

    // Orçamento
    cy.get('[data-cy="orcamento"]').click(); //Clica na aba Orçamento para exibir as opções de Orçamento

    cy.get('[data-cy="programa"]').click(); //Clica em Programa para seguir para a página de Programa
    cy.get('[data-cy="programaId"]').click(); //Clica no campo de seleção de Programa
    cy.get('[data-cy-index="programaId-item-0"]').click(); //Seleciona o primeiro Programa da lista de Programas

    /* Perguntas
    cy.get('[data-cy="perguntas"]').click(); //Clica na aba Perguntas para seguir para a página de Perguntas

    cy.get('[data-cy="indicadores-de-producao"]').click(); //Clica no botão "Adicionar Pergunta" para criar uma nova Pergunta
    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar Indicador" para criar o primeiro Indicador de Produção
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click(); //Clica no campo de seleção de Indicador de Produção
    cy.get('#mui-59-option-0').click(); //Seleciona o primeiro da lista
    cy.get('[data-cy="indicadorProducao-confirmar"]').click();

    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar Indicador" para criar segundo Indicador de Produção
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click(); //Clica no campo de seleção de Indicador de Produção
    cy.get('#mui-59-option-1').click(); // Seleciona o segundo da lista
    cy.get('[data-cy="indicadorProducao-confirmar"]').click();

    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar Indicador" para criar terceiro Indicador de Produção
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click(); //Clica no campo de seleção de Indicador de Produção
    cy.get('#mui-59-option-2').click(); // Seleciona o terceiro da lista
    cy.get('[data-cy="indicadorProducao-confirmar"]').click();
*/
        
    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações do Edital
    cy.get('[data-cy="menu-finalizar"]').click(); //Clica no botão "Finalizar" para salvar e sair da área de adição do Edital
    
  });
});