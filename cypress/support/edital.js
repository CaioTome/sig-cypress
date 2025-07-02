import { getCurrentDateTime } from '../helpers/date.helper';

Cypress.Commands.add("preencheEdital",(nivel)=>{
     //Teste edital simples, se houver mais de um teste, o it.only executa apenas esse teste.
    cy.get('[data-cy="nav-group-edital"]').click(); //Clica na aba Editais
    cy.get('[data-cy="nav-item-publicar-edital"]').click(); //Clica na opção Editais para acessar da página de Editais
    cy.get('[data-cy="add-publicar-edital"]').click(); //Clica no botão "Adicionar" para criação de um novo Edital
    cy.get('div[title="Fechar menu"]').click();
    cy.get('[data-cy="nome"]').type('Grupo-06 E.S. 001/2025 robert-coenga',{ delay: 0 }); //Preenche o campo "Nome" do Edital
    cy.get('[data-cy="restricoes"]').click(); //Clica na aba Restrições para seguir para a página de Restrições
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check(); //Marca a opção "Definir Duração do Projeto em Meses"
    cy.get('[data-cy="duracaoProjetoEmMeses"]').type('6'); //Preenche o campo "Duração do Projeto em Meses com o valor 6"
    cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check(); //Marca a opção "Pesquisador pode submeter várias propostas"
  switch(nivel){
    case "Medio":
      cy.intercept("/estado?withDeleted=false").as("estados")
      cy.get('[data-cy="termo-de-aceite"]').click()//Clica na aba Termo de Aceite das Informações do Edital
      cy.get('p[data-placeholder="Digite algum texto aqui para começar..."]').click().realType();
      cy.get('[data-cy="texto-do-edital"]').click()
      cy.get('p[data-placeholder="Digite algum texto aqui para começar..."]').invoke('val').then((v)=>{
        v = "Adicionando texto do edital";
      });
      cy.get('data-cy="abrangencia"').click();//Clica na aba de Abrangência
      cy.wait("@estados").then((e)=>{
        console.log(e.response.body.data);
      });

    break;
    case "Completo":
    break;
    default:
    break;
  }
 
});
Cypress.Commands.add("preencheSubimissao",()=>{
    cy.get('[data-cy="cronograma"]').click(); //Clica na aba Cronograma para seguir para a página de Cronograma
    cy.get('[data-cy="periodo-de-submissao"]').click(); //Clica na aba Período de Submissão para seguir para a página de Período de Submissão
    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar um novo Período de Submissão
    cy.get('[data-cy="chamadaUnsaved.inicio"]').type(getCurrentDateTime()); //Preenche o campo "Início" do Período de Submissão com a data do dia de hoje
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(getCurrentDateTime({ addYears: 1 })); //Preenche o campo "Término" do Período de Submissão com a data do dia de hoje + 1 ano
    cy.get('[data-cy="chamada-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações do Período de Submissão
  });
Cypress.Commands.add("selecionaPrograma",()=>{
    cy.get('[data-cy="orcamento"]').click(); //Clica na aba Orçamento para exibir as opções de Orçamento
    cy.get('[data-cy="programa"]').click(); //Clica em Programa para seguir para a página de Programa
    cy.get('[data-cy="programaId"]').click(); //Clica no campo de seleção de Programa
    cy.get('[data-cy-index="programaId-item-0"]').click(); //Seleciona o primeiro Programa da lista de Programas
});