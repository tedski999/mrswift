"use strict";
const Util = require("./util.js");

function handle(client, input) {

  // Walk the command tree
  // TODO: use input.tokens to find the command in client.commandTree
  const command = {
    // TODO: This will be filled with the appropriate command fields
    client,
    input
  };

  if (!command)
    return Util.createDiscordMessageEmbed().setTitle("Command not found!");
  else if (!command.permissions) // TODO: Verify the user has the correct permissions
    return Util.createDiscordMessageEmbed().setTitle("You don't have permission!");
  else
    return command.execute();
}

function generateTree(root = ".") {
  // TODO: recursively import commands
  return root;
}

module.exports = {
  handle,
  generateTree
};
