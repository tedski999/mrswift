const DiscordJS = require("discord.js");

// TODO: 'this' should be 'client'
async function handler(interaction) {

  let data = null; // TODO: Send interaction to message handler

  // Deal with invalid commands
  if (!data) {
    data = { content: new DiscordJS.MessageEmbed() };
    data.content.setTitle("Command not found!");
    data.content.addField("test", "hi");
  }

  // Deal with embeded responses
  if (typeof data.content === "object") {
    data = await createAPIMessage(this, interaction, data.content);
  }

  // Respond with whatever was generated
  this.api.interactions(interaction.id, interaction.token).callback.post({
    data: { type: 4, data }
  });
}

async function createAPIMessage(client, interaction, content) {
  const channel = client.channels.resolve(interaction.channel_id);
  const apiMessage = DiscordJS.APIMessage.create(channel, content);
  const { data, files } = await apiMessage.resolveData().resolveFiles();
  return { ...data, files };
}

module.exports = handler;
