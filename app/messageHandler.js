"use strict";
const utils = require("./utils.js");

function onMessage(message) {
	utils.log(utils.formatText("Message: %s", message), utils.LOG_LEVEL.ERROR);
}

module.exports = { onMessage };
