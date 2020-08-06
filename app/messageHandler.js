"use strict";
const Utils = require("./utils.js");

function onMessage(message) {
	Utils.log(Utils.formatText("Message: %s", message), Utils.LOG_LEVEL.ERROR);
}

module.exports = { onMessage };
