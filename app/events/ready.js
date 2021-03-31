"use strict";

function execute(client) {
  // TODO: this could be registering interactions, setting state, etc
  console.log(`Successfully logged in as '${client.user.username}'.`);
}

module.exports = {
  name: "ready",
  execute
};
