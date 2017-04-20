const request = require('request');
const lua2json = require('lua2json');
const cron = require('node-cron');
const fs = require('fs');
const CONFIG = require(process.cwd() + '\\config.js');

//instantiate the task:
// check periodically for new stats, send it to the mothership
var task = cron.schedule(CONFIG.getSchedule(), function() {
  //helper function, remove the stats.lua file so we wont keep sending the same 'new' data
  function removeLua() {
    console.log('Removing old LUA...');
    fs.unlink(CONFIG.getStatsDir(), function(err) {
      if(err && err.code == 'ENOENT') { // file doesn't exist
          console.log('Old LUA does not exist, remove failed at ' + CONFIG.getStatsDir());
      } else if (err) { // maybe we don't have enough permission
          console.log('Something went wrong while trying to remove old LUA at ' + CONFIG.getStatsDir());
      } else {
          console.log('Old LUA removed');
      }
    });
  }
  //helper function, backup the JSON object to a JSON file
  function backupJson(json) {
    console.log('Backing up JSON to file...');
    fs.writeFile(CONFIG.getJsonDir(), JSON.stringify(json),
      function(err) {
        if (err) { console.log('ERROR: ' + err); }
        else { console.log('Backup JSON saved'); }
      }
    );
  }
  //helper function, prints type of variable
  function send(obj) {
    console.log('Sending update to ' + CONFIG.getSendURL());
    request.post(CONFIG.getSendURL(), {json: true, body: obj}, function(err, res, body) {
      if (res && res.statusCode === 200) {
          console.log('Sent Successfully');
      } else {
        console.log('Sending Failed:');
        console.log(err || res);
      }
	  if (CONFIG.getWriteJson()) { backupJson(obj); } //backup json if applicable
      removeLua(); //delete the evidence
    });
  }
  //helper function, puts json into a parent object which has server info
  function servify(json) {
    var serverjson = {
      "id": CONFIG.getServerId(),
      "name": CONFIG.getServerName(),
      "token": CONFIG.getServerToken(),
      "stats": {}
    }
    serverjson['stats'] = json;
    return serverjson;
  }
  //helper function, is called when there is a new lua file found
  //parse lua to json, servify and send json
  function sendNewJson() {
    //process lua table into json string, write that string to file
    lua2json.getVariable(CONFIG.getStatsDir(), CONFIG.getStatsVar(), function(err, json) {
      if (err) { console.log('ERROR parsing LUA to JSON!  Be sure your config setting for statsDir is correct.'); }
      else {
        console.log('LUA parsed to JSON');
        send(servify(json));
      }
    });
  }
  //---------------------------------------------------------------
  //start actually doing stuff instead of defining helper functions
  console.log('   Checking for new LUA...');
  if (fs.existsSync(CONFIG.getStatsDir())) {
    console.log('Found new LUA file Parsing...');
    sendNewJson();
  } else {
    console.log('   Waiting for next Interval on (' + CONFIG.getSchedule() +')');
  }
}, false);

console.log('Starting a Recurring CRON Task w/ Interval (' + CONFIG.getSchedule() +')');
task.start(); //start the task we just created above
// By: Huckleberry
