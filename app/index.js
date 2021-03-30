const { Client } = require("discord.js");
const { token } = require("../data/private.json");
const client = new Client();

client.on("ready", () => {
  console.log("smh my head here we go again");
});

client.login(token);
