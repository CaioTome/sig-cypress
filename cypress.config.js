const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '8tc4tp',
  viewportHeight: 720,
  viewportWidth: 1280,
  e2e: {
    setupNodeEvents(on, config) {
      // Se você ainda precisa do cypress-env, mantenha esta linha
      require('cypress-env')(on, config, __dirname)
      return config;
    }
  },
});