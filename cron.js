const process = require('process');
const request = require('request');
const lua2json = require('lua2json');
const cron = require('node-cron');
const fs = require('fs');

//config globals
const CONFIG = require(process.cwd() + '\\config.js'); //get config params
const LOGLEVEL = process.argv[2] || '-d';

//vars for easy logging
const e = 'error';
const i = 'info';
const t = 'task';

//global function for succinct logging ability
//only log what the process wanted us to log
function log(data, level) {
  switch (level) {
    case 'error': //log all errors
      console.log(data);
      break;
    case 'info': //only log info if verbose flag
      if (LOGLEVEL == '-v') {console.log(data)}
      break;
    case 'task': //log task-level log only if the silent flag is not set
      if (LOGLEVEL != '-s') {console.log(data)}
      break;
    default: //something is amiss, we better just log it
      console.log(data);
  }
}

// instantiate the task:
// check periodically for new stats, send it to the mothership
var task = cron.schedule(CONFIG.getSchedule(), function() {
  //helper function, remove the stats.lua file so we wont keep sending the same 'new' data
  function removeLua() {
    log('Removing old LUA...',i);
    fs.unlink(CONFIG.getStatsDir(), function(err) {
      if(err && err.code == 'ENOENT') { log('Old LUA does not exist, remove failed at ' + CONFIG.getStatsDir(), e) }
      else if (err) { log('Something went wrong while trying to remove old LUA at ' + CONFIG.getStatsDir(), e) }
      else { log('Old LUA removed',i) }
    });
  }
  //helper function, backup the JSON object to a JSON file
  function backupJson(json) {
    log('Backing up JSON to file...','info');
    fs.writeFile(CONFIG.getJsonDir(), JSON.stringify(json),
      function(err) {
        if (err) { log('ERROR: ' + err,e) }
        else { log('Backup JSON saved',i) }
      }
    );
  }
  //helper function, prints type of variable
  function send(obj) {
    log('Sending update to ' + CONFIG.getPostPath(),'task');
    request.post(CONFIG.getPostPath(), {json: true, body: obj}, function(err, res, body) {
      if (res && res.statusCode === 200) {
        log('Sent Successfully',i);
        removeLua(); //delete the evidence
      }
      else { log(err || res, e) }
	    if (CONFIG.getWriteJson()) { backupJson(obj); } //backup json if applicable
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
      if (err) { log(err,e) }
      else {
        log('LUA parsed to JSON',i);
        send(servify(json));
      }
    });
  }

  //---------------------------------------------------------------
  //start actually doing stuff instead of defining helper functions
  log('   Checking for new LUA...','task');
  if (fs.existsSync(CONFIG.getStatsDir())) {
    log('   Found new LUA file, will send.',t);
    sendNewJson();
  } else {log('   Waiting for next Interval on (' + CONFIG.getSchedule() +')',t)}
}, false);

//start the cron task once and let it run until interrupt
log('Starting a Recurring CRON Task w/ Interval (' + CONFIG.getSchedule() +')',t);
try {task.start()}
catch(err) {log(err,e)} //start the task we just created above
// By: Huckleberry
