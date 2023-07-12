const { defineConfig } = require("cypress");
const neatCsv = require("neat-csv");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://reqres.in",
    async setupNodeEvents(on, config) {
      const filePath = path.join(__dirname, "cypress/fixtures/users.csv");
      const text = fs.readFileSync(filePath, "utf8");
      const usersTable = await neatCsv(text);

      config.env.usersTable = usersTable;

      return config;
    },
  },
});
