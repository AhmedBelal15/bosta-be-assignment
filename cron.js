const fetch = require('node-fetch');
const cron = require("node-cron");

cron.schedule("*/1 * * * *", () => {
  console.log("Performing Checks Every 1 Minute");
  fetch("http://localhost:5000/api/v1/checks/do")
});
