"use strict";

function execute() {
  // TODO: set permission(s)
  return "ok";
}

function help() {
  return "ur dum";
}

module.exports = {
  arguments: [
    { type: 5, required: true, "name": "permission", "description": "The permission to set" },
    { type: 4, required: true, "name": "value", "description": "The value to set" },
    { type: 7, required: false, "name": "channel", "description": "Affect only a specific channel" },
    { type: 6, required: false, "name": "user", "description": "Affect only a specific user" },
    { type: 8, required: false, "name": "role", "description": "Affect only a specific role" },
  ],
  defaultPermission: 0,
  guildExecutable: true,
  dmExecutable: false,
  execute,
  help
};
