"use strict";

function execute() {
  // TODO: reset permission(s)
  return "ok";
}

function help() {
  return "ur dum";
}

module.exports = {
  arguments: [
    { type: 5, required: true, "name": "permission", "description": "The permission to reset" },
  ],
  defaultPermission: 0,
  guildExecutable: true,
  dmExecutable: false,
  execute,
  help
};
