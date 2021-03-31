"use strict";
const process = require("process");
const DiscordJS = require("discord.js");
const Util = require("./util.js");

// Handle CLI arguments
const args = process.argv.slice(2);
for (const arg of args) {
  switch (arg) {
  case "-r":
  case "--register-global-interactions":
    // TODO: register all our global interactions once we've logged in
    break;
  }
}

// Setup Discord bot
const client = new DiscordJS.Client();

// Register event callbacks
const eventFilepaths = Util.readdirRecursiveSync("./app/events");
for (const filename of eventFilepaths) {
  const event = require(filename);
  client.on(event.name, (...args) => event.execute(client, ...args));
}

// Register websocket interaction callback
const Interactions = require("./interactions.js");
client.ws.on("INTERACTION_CREATE", Interactions.handle.bind(null, client));

// Load commands
client.commands = new DiscordJS.Collection();
const commandFilepaths = Util.readdirRecursiveSync("./app/commands");
for (const filename of commandFilepaths) {
  const command = require(filename);
  client.commands.set(command.name, command);
}

// Start Discord bot
const { token } = require("../data/private.json");
client.login(token);
