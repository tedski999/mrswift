"use strict";
const Logger = require("../logger.js");

function execute(client) {
  // TODO: this could be registering interactions, setting state, etc
  Logger.console.log(`Successfully logged in as '${client.user.username}'.`);
}

module.exports = {
  name: "ready",
  execute
};
