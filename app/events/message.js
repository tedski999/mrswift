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

    // Construct a command from the message
    const command = {
      tokens: message.content.slice(prefix.length).trim().split(/ +/),
      user: message.user,
      message: message.id
      // TODO: member/guild/channel
    };

    // Attempt to find and execute the command
    const response = Commands.handle(client, command);
    message.channel.send(response);
  }
}

module.exports = {
  name: "message",
  execute
};
