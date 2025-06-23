const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 720,
  viewportWidth: 1280,
  e2e: {
    setupNodeEvents(on,config){
      require('cypress-env')(on, config, __dirname)
      return config;
    }
  },
})