"use strict";
const fs = require("fs");
const path = require("path");
const process = require("process");
const { Writable } = require("stream");
const { Console } = console;

// Writes input to two streams
class SplitStream extends Writable {
  constructor(a, b) {
    super();
    this.a = a;
    this.b = b;
  }
  _write(chunk, encoding, callback) {
    this.a.write(chunk);
    this.b.write(chunk);
    callback();
  }
}

// Make sure the directory exists
const logDirPath = path.resolve(__dirname, "..", "logs");
if (!fs.existsSync(logDirPath))
  fs.mkdirSync(logDirPath);

// Logfile paths
const latestLogfilePath = path.resolve(logDirPath, "latest.txt");
const archivedLogfilePath = path.resolve(logDirPath, new Date().toISOString() + ".log");

// Logfile write streams
const latestLogfileStream = fs.createWriteStream(latestLogfilePath);
const archivedLogfileStream = fs.createWriteStream(archivedLogfilePath);

// Merging write streams
const logfilesStream = new SplitStream(latestLogfileStream, archivedLogfileStream);
const loggerStream = new SplitStream(process.stdout, logfilesStream);

module.exports = {
  console: new Console(loggerStream, loggerStream)
};
