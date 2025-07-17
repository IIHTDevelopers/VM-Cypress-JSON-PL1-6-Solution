const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    downloadsFolder: 'cypress/downloads',

    setupNodeEvents(on, config) {
      // Register reporter plugin
      require('cypress-mochawesome-reporter/plugin')(on);
     
      // All tasks in one object — do NOT register on('task') multiple times
      on('task', {
        logMessage(message) {
          console.log('LOG FROM TEST:', message);
          return null;
        },

        isFileDownloaded(fileName) {
          const filePath = path.join(__dirname, 'cypress/downloads', fileName);
          return fs.existsSync(filePath);
        }
      });

      return config;
    }
  }
});
