"use strict";
const Util = require("./util.js");

function handle(client, name, args) {
  const command = client.commands.get(name);
  if (!command)
    return commandNotFound();
  else if (!command.permissions) // TODO: Verify the user has the correct permissions
    return permissionDenied();
  else if (args.length !== command.arguments.length)
    return invalidArgumentsCount();
  else
    return command.execute(args);
}

function commandNotFound() {
  const response = Util.createDiscordMessageEmbed(); 
  response.setTitle("Command not found!");
  return response;
}

function permissionDenied() {
  const response = Util.createDiscordMessageEmbed(); 
  response.setTitle("You don't have permission!");
  return response;
}

function invalidArgumentsCount() {
  const response = Util.createDiscordMessageEmbed(); 
  response.setTitle("Invalid usage!");
  return response;
}

module.exports = {
  handle
};
