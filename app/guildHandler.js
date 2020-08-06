"use strict";
const Utils = require("./utils.js");

function onGuildCreate(guild) {
	Utils.log(Utils.formatText("Joined new guild: %s", guild));
}

function onGuildDelete(guild) {
	Utils.log(Utils.formatText("Left guild: %s", guild));
}

module.exports = { onGuildCreate, onGuildDelete };
