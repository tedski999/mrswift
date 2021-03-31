"use strict";
const Commands = require("../commands.js");

function execute(client, message) {

  // Ignore other bots
  if (message.author.bot)
    return;

  // TODO: Custom responses module

  const prefix = "!"; // TODO: load from config.json or guild settings

  // Attempt to parse and execute messages that look like commands
  if (message.content.startsWith(prefix)) {
    const commandArgs = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = commandArgs.shift().toLowerCase();
    const response = Commands.handle(client, commandName, commandArgs);
    message.channel.send(response);
  }
}

module.exports = {
  name: "message",
  execute
};
