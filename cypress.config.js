const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '8tc4tp',
  viewportHeight: 720,
  viewportWidth: 1280,
  e2e: {
    baseUrl: "https://novo-sig.ledes.net/",
    specPattern: "cypress/e2e/**/**.js",
    env: {
      username: "grupo6_gestor@sig.com",
      password: "Grupo6@sig",
      envName: "test",
      nomeEdital: "Grupo-06 E.S. 005/2025 joão-teixeira" // nome do edital usado nos testes
      
    },
    setupNodeEvents(on, config) {
      // Se você ainda precisa do cypress-env, mantenha esta linha
      require('cypress-env')(on, config, __dirname)
      return config;
    }
  },
});