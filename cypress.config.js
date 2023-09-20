
const { defineConfig } = require("cypress");
module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
     },
     specPattern: "./cypress/e2e/**.*",
     baseUrl: "https://reqres.in/",
     "env": {
      "apiUrl": "https://reqres.in/api"
    },
     
  },
});