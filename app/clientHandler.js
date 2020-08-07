"use strict";
const process = require("process");
const Utils = require("./utils.js");
const config = require("../data/config.json");

function onReady(client) {
	this.client = client;
	this.client.user.setPresence(config.defaults.status);
	Utils.log(
		Utils.formatText("Client ready, logged in as '%s'.", this.client.user.username),
		Utils.LOG_LEVEL.NOTEWORTHY);
}

function onShardReady(id, unavailableGuilds) {
	Utils.log(
		Utils.formatText("Shard %s ready.", id),
		Utils.LOG_LEVEL.NOTEWORTHY);
	if (unavailableGuilds && unavailableGuilds.size !== 0)
		Utils.log(
			Utils.formatText("Shard %s's following guilds are unavailable:\n%s.", id, unavailableGuilds),
			Utils.LOG_LEVEL.WARNING);
}

function onShardResume(id, replayedEvents) {
	Utils.log(
		Utils.formatText("Shard %s has resumed. Number of replayed events: %s", id, replayedEvents),
		Utils.LOG_LEVEL.NOTEWORTHY);
}

function onShardError(error, id) {
	Utils.log(
		Utils.formatText("Shard %s has encounted an error: %s", id, error.message),
		Utils.LOG_LEVEL.WARNING);
}

function onShardReconnecting(id) {
	Utils.log(
		Utils.formatText("Shard %s is reconnecting...", id),
		Utils.LOG_LEVEL.NOTEWORTHY);
}

function onShardDisconnect(event, id) {
	Utils.log(
		Utils.formatText("Shard %s has disconnected! Reason: ", id, event.reason),
		Utils.LOG_LEVEL.WARNING);
}

function setStatus(status, activity, text) {
	this.client.user.setPresence({
		status: status,
		activity: { type: activity.toUpperCase(), name: text }
	});
}

function exit() {
	Utils.log("Exiting...", Utils.LOG_LEVEL.NOTEWORTHY);
	this.client.destroy();
	process.exit(0);
}

module.exports = {
	onReady, onShardReady, onShardResume,
	onShardError, onShardReconnecting, onShardDisconnect,
	setStatus, exit
};
