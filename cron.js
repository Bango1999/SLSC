const process = require('process');
const request = require('request');
const lua2json = require('lua2json');
const cron = require('node-cron');
const crypto = require('crypto');
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
  //helper function, backup the JSON object to a JSON file
  function backupJson(json) {
    log('   Backing up JSON to file...',i);
    fs.writeFile(CONFIG.getJsonPath(), JSON.stringify(json),
      function(err) {
        if (err) { log(err,e) }
        else { log('   Backup JSON saved',i) }
      }
    );
  }
  //helper function, prints type of variable
  function send(obj) {
    log('Sending updated stats',t);
    log('   Sending update to ' + CONFIG.getPostPath(),i);
    request.post(CONFIG.getPostPath(), {json: true, body: obj}, function(err, res, body) {
      if (res && res.statusCode === 200) {
        log('   Update Handshake',i);
        //S3 server sends 'pass' or 'fail' if it updated or not
        if (res.body === 'fail') { //S3 Update Fail condition
          log('JSON Sent, but failed to update the S3 DB',e);
          log('   Make sure the access token and server ID are configured correctly in config.js',i);
        }
        else if (res.body === 'pass') { log('S3 Server Update Successful',t) } //S3 Update Condition
        else { log('Update Sent',t) } //generic response
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
  //helper function, overwrite the old hash file
  function writeHashFile(hash) {
    //write the new stats hash to the old hash file
    fs.writeFile(CONFIG.getHashPath(), hash, function(err) {
      if(err) {
        log('Error overwriting hash at ' + CONFIG.getHashPath(), e);
      } else {
        log('   Stats hash replaced', i);
      }
    });
  }
  //helper function, write the new hash, get JSON ready for S3 and send it
  function updateAndSend(hash, json) {
    writeHashFile(hash);
    send(servify(json));
  }
  //helper function, compare the 2 hashes, send if necessary
  function compareAndSend(newHash,json) {
    //if old hash file exists, read it, compare it with newHash
    if (fs.existsSync(CONFIG.getHashPath())) {
      fs.readFile(CONFIG.getHashPath(), 'utf8', function (err,hash) {
        if (err) {
          log('Error reading Hash file at ' + CONFIG.getHashPath(), e);
          return;
        } else {
          if (newHash != '' && hash != newHash) {
            //weve got changes, so we need to update
            updateAndSend(newHash, json);
            return;
          } else {
            log('No new changes. Waiting...',t);
            return;
          }
        }
      });
    //we dont have an old hash, but if we have a new one, thats good enough to update
    } else if (newHash != '') {
      updateAndSend(newHash, json);
      return;
    } else {
      log('Error: New hash is an empty string',e);
      return;
    }
    return;
  }
  //parent function, which is called each time the cron task runs
  function sendLatestChanges() {
    log(' ',t);
    log('Checking for updated stats...',t);
    //here is where we parse the lua to json
    lua2json.getVariable(CONFIG.getStatsPath(), CONFIG.getStatsVar(), function(err, json) {
      if (err) {
	       log('ERROR parsing LUA to JSON!  Be sure your config setting for statsDir is correct.',e);
		     log(err,e);
         return false;
      } else {
        log('   LUA parsed to JSON',i);
        //hash the new info, to compare with old hash
        var newHash = crypto.createHash('md5').update(JSON.stringify(json)).digest("hex");
        //offload the rest of the work like comparing and sending to this function
        compareAndSend(newHash, json);
      }
    });
  }

  //---------------------------------------------------------------
  //enough defining helper functions, do the stuff already!
  sendLatestChanges();
  log('Interval Setting: (' + CONFIG.getSchedule() +')',i);
}, false);

//start the cron task once and let it run until interrupt
log('Starting a Recurring CRON Task w/ Interval (' + CONFIG.getSchedule() +')',t);
try {task.start()}
catch(err) {log(err,e)} //start the task we just created above
// By: Huckleberry
