"use strict";
const Discord = require("discord.js");
const ClientHandler = require("./clientHandler.js");
const GuildHandler = require("./guildHandler.js");
const MessageHandler = require("./messageHandler.js");
const Utils = require("./utils.js");
const privateData = require("../data/private.json");

Utils.log("Setting up bot...", Utils.LOG_LEVEL.NOTEWORTHY);
let client = new Discord.Client();

Utils.log("Setting up event callbacks...", Utils.LOG_LEVEL.VERBOSE);
client.on("debug", (info) => Utils.log("[DISCORDJS]: " + info, Utils.LOG_LEVEL.VERBOSE));
client.on("warn", (info) => Utils.log("[DISCORDJS]: " + info, Utils.LOG_LEVEL.WARNING));
client.on("error", (error) => Utils.log("[DISCORDJS]: " + error, Utils.LOG_LEVEL.ERROR));
client.on("ready", () => ClientHandler.onReady(client));
client.on("shardReady", (id, unavailableGuilds) => ClientHandler.onShardReady(id, unavailableGuilds));
client.on("shardResume", (id, replayedEvents) => ClientHandler.onShardResume(id, replayedEvents));
client.on("shardError", (error, id) => ClientHandler.onShardError(error, id));
client.on("shardReconnecting", (id) => ClientHandler.onShardReconnecting(id));
client.on("shardDisconnect", (event, id) => ClientHandler.onShardDisconnect(event, id));
client.on("message", (message) => MessageHandler.onMessage(message));
client.on("guildCreate", (guild) => GuildHandler.onGuildCreate(guild));
client.on("guildDelete", (guild) => GuildHandler.onGuildDelete(guild));

Utils.log("Logging into Discord...", Utils.LOG_LEVEL.VERBOSE);
client.login(privateData.key);
