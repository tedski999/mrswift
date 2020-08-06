"use strict";
const fs = require("fs");
const util = require("util");
const process = require("process");

const LOG_VERBOSE = process.env.VERBOSE;
const LOG_FILE_HEADER = "\n==============================\nStarting new logging session...\n==============================\n";
const LOG_LEVEL = { VERBOSE:"VERB", INFO:"INFO", NOTEWORTHY:"NOTE", WARNING:"WARN", ERROR:"ERRR" };

// Logs a message to console and file with appropriate formatting
function log(message, level = LOG_LEVEL.INFO) {
	if (!LOG_VERBOSE && level === LOG_LEVEL.VERBOSE)
		return;

	let now = new Date();
	let output = "";
	if (!log.startTime) {
		log.startTime = now.getTime();
		output += LOG_FILE_HEADER;
	}

	let currentTime = (now.getTime() - log.startTime) / 1000;
	output += formatText("%s [%s] %s", currentTime.toFixed(3), level, message);
	try {
		fs.appendFileSync("./logs/" + now.toISOString().slice(0, 10) + ".txt", output + "\n");
	} catch (err) {
		output += formatText("\nError writing to log file: %s", err.message);
		level = LOG_LEVEL.ERROR;
	}

	switch (level) {
	case LOG_LEVEL.VERBOSE:
	case LOG_LEVEL.INFO:
		console.info(output);
		break;

	case LOG_LEVEL.NOTEWORTHY:
	case LOG_LEVEL.WARNING:
		console.warn(output);
		break;

	default:
	case LOG_LEVEL.ERROR:
		console.error(output);
		process.exit(-1);
	}
}

// Returns a formatted string using printf syntax with args
function formatText(format, ...args) {
	args.unshift(format);
	return util.format.apply(util, args);
}

module.exports = { log, formatText, LOG_LEVEL };
