"use strict";
const Util = require("./util.js");
const Commands = require("./commands.js");

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
