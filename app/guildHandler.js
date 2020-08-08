"use strict";
const utils = require("./utils.js");

function onGuildCreate(guild) {
	utils.log(utils.formatText("Joined new guild: %s", guild));
}

function onGuildDelete(guild) {
	utils.log(utils.formatText("Left guild: %s", guild));
}

module.exports = { onGuildCreate, onGuildDelete };
