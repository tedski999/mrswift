"use strict";
const path = require("path");
const process = require("process");
const DiscordJS = require("discord.js");
const Commands = require("./commands.js");
const Logger = require("./logger.js");
const Util = require("./util.js");

Logger.console.group("Processing Command-Line Arguments:");
const args = process.argv.slice(2);
for (const arg of args) {
  switch (arg) {
  case "-r":
  case "--register-global-interactions":
    Logger.console.error(arg + ": TODO register all our global interactions once we've logged in");
    break;
  default:
    Logger.console.error(arg + ": Argument not recognized!");
    process.exit();
  }
}
Logger.console.groupEnd();

Logger.console.group("Setting up DiscordJS:");

Logger.console.log("Initializing client...");
const client = new DiscordJS.Client();

Logger.console.group("Registering event callbacks:");
Logger.console.time("Done");
const eventFilepaths = Util.readdirRecursiveSync(path.resolve(__dirname, "events"));
for (const filepath of eventFilepaths) {
  const event = require(filepath);
  client.on(event.name, (...args) => event.execute(client, ...args));
  Logger.console.log("- ", event.name);
}
Logger.console.groupEnd();
Logger.console.timeStop("Done");

Logger.console.group("Generating command tree:");
Logger.console.time("Done");
client.commandTree = new Commands.generateTree(path.resolve(__dirname, "commands"));
Logger.console.groupEnd();
Logger.console.timeStop("Done");

Logger.console.log("Registering interaction callback...");
const Interactions = require("./interactions.js");
client.ws.on("INTERACTION_CREATE", Interactions.handle.bind(null, client));

Logger.console.groupEnd();
Logger.console.log("Setup complete.");

Logger.console.log("Logging into Discord...");
const { token } = require("../data/private.json");
client.login(token);
