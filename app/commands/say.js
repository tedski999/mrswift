"use strict";

function execute(message, isSneaky) {
  if (isSneaky)
    ; // TODO: delete user message
  return message;
}

function help() {
  return "ur dum";
}

module.exports = {
  arguments: [
    { type: 5, required: true, "name": "message", "description": "The message to respond with" },
    { type: 4, required: false, "name": "isSneaky", "description": "If to delete your message" },
  ],
  defaultPermission: 0,
  guildExecutable: true,
  dmExecutable: true,
  execute,
  help
};
