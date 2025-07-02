import { getCurrentDateTime } from '../helpers/date.helper';
import moment from 'moment';

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
    if(nivel != "Simples")
    {
      cy.intercept("/estado?withDeleted=false").as("estados")   
      // Termo de Aceite
      cy.get('[data-cy="termo-de-aceite"]').click(); //Clica na aba Termo de Aceite para seguir para a página de Termo de Aceite
      cy.get('[data-cy="termoDeAceite"]').click().realType('Aceito os termos de aceite')// Encontra a área editável do CKEditor, clica para ativar e depois digita.

      // Texto do Edital
      cy.get('[data-cy="texto-do-edital"]').click(); //Clica na aba
      cy.get('[data-cy="texto"]').realType('Texto completo do Edital Medio.'); //Preenche o campo "Texto do Edital" com o texto "Texto completo do Edital Médio."
      if(nivel == "Medio"){
        // Abrangência
        cy.get('[data-cy="abrangencia"]').click(); 
        cy.wait("@estados").then((e)=>{
          for(let i=0;i<3;i++){
            cy.contains(e.response.body.data[Math.floor(Math.random() * e.response.body.count)].nome).click();
          }
        });
      }
      else if(nivel == "Completo"){
        // Abrangência
        cy.get('[data-cy="abrangencia"]').click(); //Clica na aba Abrangência para seguir para a página de Abrangência
        cy.get('[data-cy="estado-todos"]').click(); //Clica no botão "todos" para criar uma nova Abrangência
        // Informacoes complementares
        cy.get('[data-cy="informacoes-complementares"]').click(); //Clica na aba informacoes

        cy.get('[data-cy="perguntaInfoId"]').click(); //Clica no campo de seleção de Pergunta
        cy.get('[data-cy="ocupacao-da-equi"]').click(); //Seleciona a Pergunta "Ocupação da Equipe" da lista de Perguntas
        cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click(); //Clica no botão "Adicionar Pergunta" para criar uma nova Pergunta

        cy.get('[data-cy="perguntaInfoId"]').click(); //Clica no campo de seleção de Pergunta
        cy.get('[data-cy="data-de-realizac"]').click(); //Clica no campo de seleção de Data de Realização
        cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click(); //botao add

        cy.get('[data-cy="perguntaInfoId"]').click(); //Clica no campo de seleção de Pergunta
        cy.get('[data-cy="porte-da-empresa"]').click(); //Seleciona a Pergunta "Porte da Empresa" da lista de Perguntas
        cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click(); //botao add

        cy.get('[data-cy="perguntaInfoId"]').click(); //Clica no campo de seleção de Pergunta
        cy.get('[data-cy="areas-tematicas"]').click(); //Seleciona a Pergunta "Áreas Temáticas" da lista de Perguntas
        cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click(); //botao add

        cy.get('[data-cy="perguntaInfoId"]').click(); //Clica no campo de seleção de Pergunta
        cy.get('[data-cy="objetivos-de-des"]').click(); //Seleciona a Pergunta "Objetivos de Desenvolvimento Sustentável" da lista de Perguntas
        cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click(); //botao add
      }
    }
 
});
Cypress.Commands.add("preencheCronograma",()=>{
    cy.get('[data-cy="cronograma"]').click(); //Clica na aba Cronograma para seguir para a página de Cronograma
    cy.get('[data-cy="periodo-de-submissao"]').click(); //Clica na aba Período de Submissão para seguir para a página de Período de Submissão
    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar um novo Período de Submissão
    cy.get('[data-cy="chamadaUnsaved.inicio"]').type(moment().format("DD/MM/YYYY HH:mm:ss"));//Preenche o campo "Início" do Período de Submissão com a data do dia de hoje
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(moment().add(1,'year').format("DD/MM/YYYY HH:mm:ss"));//Preenche o campo "Término" do Período de Submissão com a data do dia de hoje + 1 ano
    cy.get('[data-cy="chamada-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações do Período de Submissão
  });
Cypress.Commands.add("preencheOrcamento",(nivel)=>{
    // Orçamento
    cy.get('[data-cy="orcamento"]').click(); //Clica na aba Orçamento para exibir as opções de Orçamento
    cy.get('[data-cy="programa"]').click(); //Clica em Programa para seguir para a página de Programa
    cy.get('[data-cy="programaId"]').click(); //Clica no campo de seleção de Programa
    cy.get('[data-cy-index="programaId-item-0"]').click(); //Seleciona o primeiro Programa da lista de Programas
     if(nivel == "Completo"){
        // Rubricas
        cy.get('[data-cy="rubricas"]').click(); //Clica na aba Rubricas para seguir para a página de Rubricas
        //Rubrica1
        cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar uma nova Rubrica
        cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click(); //Clica no campo de seleção de Tipo de Rubrica
        cy.get('[data-cy="diarias"]').click(); //Seleciona o Tipo de Rubrica "Diárias" da lista de Tipos de Rubricas
        cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click(); //Clica no campo de seleção de Natureza da Despesa
        cy.get('[data-cy="custeio"]').click(); //Seleciona o Tipo de Rubrica "Custeio" da lista de Tipos de Rubricas
        cy.get('[data-cy="editalRubrica-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações da Rubrica
        //Rubrica2
        cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar uma nova Rubrica
        cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click(); //Clica no campo de seleção de Tipo de Rubrica
        cy.get('[data-cy="hospedagem-e-ali"]').click(); //Seleciona o Tipo de Rubrica "Diárias" da lista de Tipos de Rubricas
        cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click(); //Clica no campo de seleção de Natureza da Despesa
        cy.get('[data-cy="capital"]').click(); //Seleciona o Tipo de Rubrica "Custeio" da lista de Tipos de Rubricas
        cy.get('[data-cy="editalRubrica-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações da Rubrica
        //Rubrica3
        cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar uma nova Rubrica
        cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click(); //Clica no campo de seleção de Tipo de Rubrica
        cy.get('[data-cy="material-de-cons"]').click(); //Seleciona o Tipo de Rubrica "Diárias" da lista de Tipos de Rubricas
        cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click(); //Clica no campo de seleção de Natureza da Despesa
        cy.get('[data-cy="auxilio-a-pesqui"]').click(); //Seleciona o Tipo de Rubrica "Custeio" da lista de Tipos de Rubricas
        cy.get('[data-cy="editalRubrica-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações da Rubrica
        //Rubrica4
        cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar uma nova Rubrica
        cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click(); //Clica no campo de seleção de Tipo de Rubrica
        cy.get('[data-cy="material-permane"]').click(); //Seleciona o Tipo de Rubrica "Diárias" da lista de Tipos de Rubricas
        cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click(); //Clica no campo de seleção de Natureza da Despesa
        cy.get('[data-cy="capital"]').click(); //Seleciona o Tipo de Rubrica "Custeio" da lista de Tipos de Rubricas
        cy.get('[data-cy="editalRubrica-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações da Rubrica


        // Faixas de Financiamento
        cy.get('[data-cy="faixas-de-financiamento"]').click(); //Clica na aba Faixas de Financiamento para seguir para a página de Faixas de Financiamento

        cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar uma nova Faixa de Financiamento
        cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMinimo"]').type('0001'); // Valor Mínimo invertido
        cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').type('0005'); // Valor Máximo invertido
        cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').type('Faixa 1');
        cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]').type('Descrição da Faixa 1');
        cy.get('[data-cy="faixaFinanciamento-confirmar"]').click();

        cy.get('[data-cy="add-button"]').click(); // Segunda faixa
        cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMinimo"]').type('1005'); // invertido
        cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').type('00000000000001'); // invertido
        cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').type('Faixa 2');
        cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]').type('Descrição da Faixa 2');
        cy.get('[data-cy="faixaFinanciamento-confirmar"]').click();

        cy.get('[data-cy="add-button"]').click(); // Terceira faixa
        cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMinimo"]').type('011210'); // invertido
        cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').type('00000000002'); // invertido
        cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').type('Faixa 3');
        cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]').type('Descrição da Faixa 3');
        cy.get('[data-cy="faixaFinanciamento-confirmar"]').click();

        cy.get('[data-cy="add-button"]').click(); // Quarta faixa
        cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMinimo"]').type('02222'); // invertido
        cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').type('00555'); // invertido
        cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').type('Faixa 4');
        cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]').type('Descrição da Faixa 4');
        cy.get('[data-cy="faixaFinanciamento-confirmar"]').click();

        cy.get('[data-cy="add-button"]').click(); // Quinta faixa
        cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMinimo"]').type('105'); // invertido
        cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').type('100000001'); // invertido
        cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').type('Faixa 5');
        cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]').type('Descrição da Faixa 5');
        cy.get('[data-cy="faixaFinanciamento-confirmar"]').click();
      }
});
Cypress.Commands.add("preenchePergunta", ()=>{
      // Perguntas
      cy.get('[data-cy="perguntas"]').click(); //Clica na aba Perguntas para seguir para a página de Perguntas
  
      cy.get('[data-cy="indicadores-de-producao"]').click(); //Clica no botão "Adicionar Pergunta" para criar uma nova Pergunta
      cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar Indicador" para criar o primeiro Indicador de Produção
      cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click(); //Clica no campo de seleção de Indicador de Produção
      cy.get('[data-cy="producao-bibliog"]').click(); //Seleciona o primeiro da lista
      cy.get('[data-cy="indicadorProducao-confirmar"]').click();
  
      cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar Indicador" para criar segundo Indicador de Produção
      cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click(); //Clica no campo de seleção de Indicador de Produção
      cy.get('[data-cy="producao-cultura"]').click(); // Seleciona o segundo da lista
      cy.get('[data-cy="indicadorProducao-confirmar"]').click();
  
      cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar Indicador" para criar terceiro Indicador de Produção
      cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click(); //Clica no campo de seleção de Indicador de Produção
      cy.get('[data-cy="producao-tecnica"]').click(); // Seleciona o terceiro da lista
      cy.get('[data-cy="indicadorProducao-confirmar"]').click();
     
});