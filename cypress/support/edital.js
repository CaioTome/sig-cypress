Cypress.Commands.add("preencheEdital",()=>{
    //Teste edital simples, se houver mais de um teste, o it.only executa apenas esse teste.
    cy.get('[data-cy="nav-group-edital"]').click(); //Clica na aba Editais
    cy.get('[data-cy="nav-item-publicar-edital"]').click(); //Clica na opção Editais para acessar da página de Editais
    cy.get('[data-cy="add-publicar-edital"]').click(); //Clica no botão "Adicionar" para criação de um novo Edital
  cy.get('[data-cy="nome"]').type(
    String(Cypress.env('nomeEdital') || 'Grupo-06 E.S. 005/2025'), //Edite essa linha para preencher o nome do Edital
      { delay: 0 },
    ); //Preenche o campo "Nome" do Edital
});