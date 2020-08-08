"use strict";
const process = require("process");
const Discord = require("discord.js");
const clientHandler = require("./clientHandler.js");
const guildHandler = require("./guildHandler.js");
const messageHandler = require("./messageHandler.js");
const utils = require("./utils.js");
const privateData = require("../data/private.json");

utils.log("Setting up bot...");
let client = new Discord.Client();

utils.log("Setting up event callbacks...", utils.LOG_LEVEL.VERBOSE);
client.on("debug", (info) => process.env.DEBUG ? utils.log("[DISCORDJS]: " + info, utils.LOG_LEVEL.VERBOSE) : null);
client.on("warn", (info) => utils.log("[DISCORDJS]: " + info, utils.LOG_LEVEL.WARNING));
client.on("error", (error) => utils.log("[DISCORDJS]: " + error, utils.LOG_LEVEL.ERROR));
client.on("ready", () => clientHandler.onReady(client));
client.on("shardReady", (id, unavailableGuilds) => clientHandler.onShardReady(id, unavailableGuilds));
client.on("shardResume", (id, replayedEvents) => clientHandler.onShardResume(id, replayedEvents));
client.on("shardError", (error, id) => clientHandler.onShardError(error, id));
client.on("shardReconnecting", (id) => clientHandler.onShardReconnecting(id));
client.on("shardDisconnect", (event, id) => clientHandler.onShardDisconnect(event, id));
client.on("message", (message) => messageHandler.onMessage(message));
client.on("guildCreate", (guild) => guildHandler.onGuildCreate(guild));
client.on("guildDelete", (guild) => guildHandler.onGuildDelete(guild));

utils.log("Logging into Discord...", utils.LOG_LEVEL.VERBOSE);
client.login(privateData.key);
