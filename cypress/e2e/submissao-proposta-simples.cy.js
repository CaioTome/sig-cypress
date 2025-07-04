describe('Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas', () => {
  beforeEach(() => {
    cy.login(
      '/',// [URL do sistema]
      Cypress.env("username"), // [E-mail do usuário]
      Cypress.env("password"), // [Senha do usuário]
    ); //Acessa a página de login usando as credenciais do usuário e senha.
  });
  it('Realiza login no sistema e submete uma proposta', () => {
    cy.intercept("GET","/area-de-conhecimento/grandearea").as("grandeArea");
    cy.get('[data-cy="breadcrumb-home"]').click(); //Clica no botão "Home" para retornar à página anterior
    cy.get('[data-cy="editais-ver-mais"]').click(); //Clica no botão "Ver Mais" para acessar a página de Editais
    cy.get('input[aria-label="pesquisar mensagens"]').type('Grupo-06 E.S.')
    cy.get('[data-cy="visualizar-edital-grupo-06-e-s-001"]').click(); //Edite essa linha para selecionar o Edital respectivo

    cy.wait(300); //Aguarda 300ms para garantir que a página foi carregada completamente
    cy.get('[data-cy="criar-proposta"]').click(); //Clica no botão "Criar Proposta" para iniciar o processo de criação de uma nova proposta
    cy.get('[data-cy="tituloDoProjeto"]').type(
        'Submissão de Proposta Cypress', //Preenche o campo "Título do Projeto" com o valor "Submissão de Proposta de Teste"
        { delay: 0 },
    )
    cy.get('[data-cy="areaDeConhecimento-area-de-conhecim-remover"]').click();
    cy.get('button[data-cy="areaDeConhecimento-adicionar"]').click();
    cy.get('[data-cy="areaDeConhecimento-area-de-conhecim-expandable-item"]').find('[data-testid="ExpandMoreIcon"]').last().click();
    cy.wait('@grandeArea').then((g)=>{
      let gANome = g.response.body[Math.floor(Math.random() * g.response.body.length)];
      cy.intercept("GET","/area-de-conhecimento/area/"+gANome.grandeAreaId).as("area")
      cy.get('[data-cy="areaDeConhecimento.0.grandeAreaId"]').click();
      cy.contains(gANome.grandeAreaNome).click();
      cy.get('[data-cy="areaDeConhecimento.0.areaId"]').click();
      cy.wait("@area").then((a)=>{
        if(a.response.body.length>0){
          let area = a.response.body[Math.floor(Math.random() * a.response.body.length)];
          cy.intercept("GET","/area-de-conhecimento/area/"+area.grandeAreaId).as("subArea")
          cy.contains(area.areaNome).click();
        }
        
      });
      //Abrangência
      cy.get('[data-cy="abrangencia"]').click();
      cy.get('[data-cy="abrangencia-adicionar"]').click();
      cy.get('[data-cy="abrangencia.0.estadoId"]').click();
      cy.contains('São Paulo').click();
      cy.get('[data-cy="abrangencia.0.abrangenciaMunicipio"]').click();
      cy.contains('Adamantina').click();

      //Dados Pessoais
      cy.get('[data-cy="coordenacao"]').click();
      cy.get('[data-cy="dados-pessoais"]').click()
      cy.get('input[data-cy="criadoPor.nome"]').should('have.value', 'Grupo 6 Gestor');
      cy.get('[data-cy="criadoPor.paisId"]').click();
      cy.contains("Brasil").click();
      cy.get('input[data-cy="criadoPor.documento"]').type('19040706042');

    
      //Endereço
      cy.get('[data-cy="endereco"]').click();
      cy.get('[data-cy="criadoPor.endereco.cep"]').type("79080190");
      cy.wait(1000);
      cy.get('[data-cy="criadoPor.endereco.numero"]').type('1');
      cy.get('[data-cy="criadoPor.endereco.municipio"]').should("have.value",'Campo Grande');

      //Dados Acadêmicos
      cy.get('[data-cy="dados-academicos"]').click();
      cy.get('[data-cy="criadoPor.instituicaoId"]').click();
      cy.contains('UFMS').click();
      cy.get('[data-cy="criadoPor.nivelAcademicoId"]').click();
      cy.contains('Ensino Superior').click();
      cy.get('button[data-cy="criadoPor.areaDeConhecimento-area-de-conhecim-remover"]').click();
      cy.get('[data-cy="criadoPor.areaDeConhecimento-adicionar"]').click();
      cy.get('[data-cy="criadoPor.areaDeConhecimento-area-de-conhecim-expandable-item"]').click();
      gANome = g.response.body[Math.floor(Math.random() * g.response.body.length)];
      cy.get('[data-cy="criadoPor.areaDeConhecimento.0.grandeAreaId"]').click();
      cy.intercept("GET","/area-de-conhecimento/area/"+gANome.grandeAreaId).as("dAArea")
      cy.contains(gANome.grandeAreaNome).click();
      //Dados Profissionais
      //Termo de Aceite
      cy.get('[data-cy="termos"]').click();
      cy.get('[data-cy="termo-de-aceite"]').click();
      cy.get('[data-cy="edital.termoDeAceite"]').realType("Termo");
      cy.get('input[data-cy="termoDeAceiteAceito"]').check();

      cy.get('button[data-cy="menu-salvar"]').click();
      cy.get('button[data-cy="menu-verificar-penden"]').click();


    });
  }); 
});