const process = require("process");
const { Client } = require("discord.js");
const InteractionHandler = require("./interactions/handler.js");
const client = new Client();

//const SQLite = require("better-sqlite3");
//const sql = new SQLite("./scores.sqlite");

const { token } = require("../data/private.json");

client.on("ready", () => {
  console.log("Login successful");

  // DEBUG
  client.api.applications(client.user.id).guilds("729350100991737928").commands.post({
    data: {
      name: "ping",
      description: "description goes here"
    }
  });

  // Register interaction handler callback
  client.ws.on("INTERACTION_CREATE", InteractionHandler.bind(client));
});

// Parse CLI arguments
const args = process.argv.slice(2);
args.forEach(arg => {
  switch (arg) {
  case "-r":
  case "--register-global-interactions":
    // TODO: register all our global interactions once we've logged in
    break;
  }
});

// Start Discord bot
client.login(token);
