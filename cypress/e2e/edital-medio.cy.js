
describe('Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas',()=>{
      beforeEach(() => {
    // Gancho em nível raíz
    // executa antes de realizar cada teste(it)
    cy.login(
      '/',// [URL do sistema]
      Cypress.env("username"), // [E-mail do usuário]
      Cypress.env("password"), // [Senha do usuário]
    ); //Acessa a página de login usando as credenciais do usuário e senha.
  });
    it('Realiza login no sistema e cria um edital medio',()=>{
        cy.preencheEdital("Medio");
    });
});
// ## Atividade 1 - Realizar o Teste Edital Médio

// 1. Crie um novo teste e2e: `edital-medio.cy.ts`.
// 2. Neste teste resolva a solicitação abaixo:

// ## Teste de E.M. (Edital Médio)

// 1. Em Informações do Edital
// - Em Identificação do Edital
//     - Titulo do Edital
//     > Utilizar: `[grupoalunos-numero] [E.M.] [código]/[ano] [nomealuno-sobrenomealuno]`
//     >
//     > Exemplo: Grupo-01 E.M. 005/2025 joão-neves
//     >
//     > [grupoalunos-numero]: Número do Grupo definido pelo Professor (01 a 99)
//     >
//     > [E.M.]: Edital Médio
//     >
//     > [código]: Código de 3 digitos (000 a 999)
//     >
//     > [ano]: Ano de criação do Edital
//     >
//     > [nomealuno-sobrenomealuno]: nome e sobrenome do acadêmico
// - Em Restrições
//     - Opções de Restrições [Checkbox]
//     > Marcar a opção "Definir a duração do projeto em meses" e adicionar uma duração em quantidade de meses.
//     >
//     > Marcar a opção "Pesquisador pode submeter mais de uma proposta".
// - Em Termo de Aceite
//     - Adicionar um texto de Termo de Aceite
// - Em Texto do Edital
//     - Adicionar um Texto do Edital
// - Em Abrangência
//     - Adicionar mais de duas Abrangências (Escolha de preferência)
// 2. Em Cronograma
// - Em Período de Submissão
//     - Adicionar a data inicial e final.
//     > formato de data: DD/MM/YYYY hh:mm:ss
//     >
//     > A data final sempre deve ser posterior a data inicial.
// 3. Em Orçamento
// - Em Programa
//     - Adicionar um Programa a este Edital
//     > Selecionar um dos programas da `Caixa de Seleção`. 
// 4. Em Perguntas
// - Em Indicadores de Produção
//     - Adicionar os três Indicadores de Produção
// 5. Finalizar
//     - Clicar no botão Salvar.
//     - Clicar no botão Finalizar.

// **Resultado esperado:**

// Após a realização do Teste Cypress se espera que o Edital tenha sido criado com sucesso e apareça na tela de visualização dos Editais.

// ---
