"use strict";
const fs = require("fs");
const utils = require("./utils.js");
const config = require("../data/config.json");

function onGuildCreate(guild) {
	utils.log(utils.formatText("Joined new guild: %s", guild));
	writeGuildSettings(guild, config.defaults.guildSettings);
}

function onGuildDelete(guild) {
	utils.log(utils.formatText("Left guild: %s", guild));
	deleteGuildSettings(guild);
}

function getGuildSettings(guild) {
	let path = "data/guilds/" + guild.id + ".json";
	if (!fs.existsSync(path))
		writeGuildSettings(guild, config.defaults.guildSettings);
	return JSON.parse(fs.readFileSync(path));
}

function writeGuildSettings(guild, settings) {
	let path = "data/guilds/" + guild.id + ".json";
	utils.log(utils.formatText("Writing settings to '%s'...", path));
	try {
		fs.writeFileSync(path, JSON.stringify(settings, null, 2));
	} catch (err) {
		utils.log(
			utils.formatText("Unable to write to file '%s': %s", path, err.message),
			utils.LOG_LEVEL.ERROR);
	}
}

function deleteGuildSettings(guild) {
	let path = "data/guilds/" + guild.id + ".json";
	utils.log(utils.formatText("Deleting guild settings at '%s'...", path));
	try {
		fs.unlinkSync(path);
	} catch (err) {
		utils.log(
			utils.formatText("Unable to delete file '%s': %s", path, err.message),
			utils.LOG_LEVEL.ERROR);
	}
}

module.exports = {
	onGuildCreate, onGuildDelete, getGuildSettings,
	writeGuildSettings, deleteGuildSettings
};
