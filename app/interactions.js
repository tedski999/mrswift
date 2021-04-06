"use strict";
const Util = require("./util.js");
const Commands = require("./commands.js");

// TODO: Interaction handling is blocked until Discord implements nested sub-groups.
// It's possible to work a hacky solution for now, but I'm one man. So instead I wait.
// Once the API is implemented and stable enough, hopefully I'll be able to integrate
// it with how I'm handling message commands (filesystem-tree walking).
async function handle(client, interaction) {
  const commandArgs = []; // TODO: parse args to expected format
  const commandName = interaction.data.name.toLowerCase();
  const response = Commands.handle(client, commandName, commandArgs);

  // Deal with embeded responses
  let data = { content: response };
  if (typeof data.content === "object") {
    data = await Util.createDiscordAPIMessage(client, interaction, data.content);
  }

  // Respond with the generated response
  client.api.interactions(interaction.id, interaction.token).callback.post({
    data: { type: 4, data }
  });
}

module.exports = {
  handle
};
