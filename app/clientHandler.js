"use strict";
const process = require("process");
const utils = require("./utils.js");
const config = require("../data/config.json");

function onReady(client) {
	this.client = client;
	this.client.user.setPresence(config.defaults.status);
	utils.log(
		utils.formatText("Client ready, logged in as '%s'.", this.client.user.username),
		utils.LOG_LEVEL.NOTEWORTHY);
}

function onShardReady(id, unavailableGuilds) {
	utils.log(
		utils.formatText("Shard %s ready.", id),
		utils.LOG_LEVEL.NOTEWORTHY);
	if (unavailableGuilds && unavailableGuilds.size !== 0)
		utils.log(
			utils.formatText("Shard %s's following guilds are unavailable:\n%s.", id, unavailableGuilds),
			utils.LOG_LEVEL.WARNING);
}

function onShardResume(id, replayedEvents) {
	utils.log(
		utils.formatText("Shard %s has resumed. Number of replayed events: %s", id, replayedEvents),
		utils.LOG_LEVEL.NOTEWORTHY);
}

function onShardError(error, id) {
	utils.log(
		utils.formatText("Shard %s has encounted an error: %s", id, error.message),
		utils.LOG_LEVEL.WARNING);
}

function onShardReconnecting(id) {
	utils.log(
		utils.formatText("Shard %s is reconnecting...", id),
		utils.LOG_LEVEL.NOTEWORTHY);
}

function onShardDisconnect(event, id) {
	utils.log(
		utils.formatText("Shard %s has disconnected! Reason: ", id, event.reason),
		utils.LOG_LEVEL.WARNING);
}

function setStatus(status, activity, text) {
	this.client.user.setPresence({
		status: status,
		activity: { type: activity.toUpperCase(), name: text }
	});
}

function exit() {
	utils.log("Exiting...", utils.LOG_LEVEL.NOTEWORTHY);
	this.client.destroy();
	process.exit(0);
}

module.exports = {
	onReady, onShardReady, onShardResume,
	onShardError, onShardReconnecting, onShardDisconnect,
	setStatus, exit
};
