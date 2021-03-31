"use strict";
const fs = require("fs");
const path = require("path");
const DiscordJS = require("discord.js");

// TODO: this probably doesn't concat files very well, not tested with multiple directories
function readdirRecursiveSync(root = ".") {
  const entries = fs.readdirSync(root, { withFileTypes: true });
  return entries.map(entry => {
    const res = path.resolve(root, entry.name);
    return entry.isDirectory() ? readdirRecursiveSync(res) : res;
  });
}

function createDiscordMessageEmbed() {
  return new DiscordJS.MessageEmbed();
}

async function createDiscordAPIMessage(client, interaction, content) {
  const channel = client.channels.resolve(interaction.channel_id);
  const apiMessage = DiscordJS.APIMessage.create(channel, content);
  const { data, files } = await apiMessage.resolveData().resolveFiles();
  return { ...data, files };
}

module.exports = {
  readdirRecursiveSync,
  createDiscordMessageEmbed,
  createDiscordAPIMessage
};
