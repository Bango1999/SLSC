 /*------------------------------------------/
 /                CONFIG.JS                  /
 /  Edit this file according to your needs   /
 /------------------------------------------*/



// ---------------------------
// SERVER NAME
// Default: 'Server Running SLmod'
// what is the server called?
// ---------------------------
 const serverName = 'Server Running SLmod';

// ---------------------------
// SERVER ID, SERVER TOKEN
// Default: 0, 'token_for_server_0'
// these 2 variables should be given to you by the person hosting the stats server
// Only necessary to configure if you are POSTing to an S3 server
// ---------------------------
 const serverId = 0;
 const serverToken = 'token_for_server_0';


// ---------------------------
// S3 SERVER POST PATH
// Default: 'http://localhost:4000/api/dcs/slmod/update'
// The link to your S3 server, + the default S3 API route
//   If you ARE running an S3 server, only edit serverURL to match the URL of your S3 server
//   If you are NOT running an S3 server, you will need to edit the route in postPath to fit the route for your own API
// ---------------------------
const serverURL = 'http://localhost:4000';
  const postPath = serverURL + '/api/dcs/slmod/update';


// ---------------------------
// STATS LOCATION & FILENAME
// Default: 'C:\\Users\\Huckleberry\\Saved Games\\DCS\\Slmod\\SlmodStats.lua'
// The Directory + Filename of the lua stats file for node
//   You will likely need to edit windowsUsername
//   If you are running a DCS other than stable, edit DCS folder name in dcsVersion
//----------------------------
  const windowsUsername = 'Huckleberry';
  const dcsVersion = 'DCS'; // if youre in beta, it would be 'DCS.openbeta', etc
const statsPath = 'C:\\Users\\'+ windowsUsername +'\\Saved Games\\'+ dcsVersion +'\\Slmod\\SlmodStats.lua';


// ---------------------------
// UPDATE FREQUENCY
// Default: '* * * * *'
// How often should it check for new stats?
// For testing, every minute is fine.  Otherwise, 3x/hr is plenty
// Format: [minute] [hour] [day-of-month] [month] [day-of-week]
// Examples: ('*' = all)
//    '* * * * *'         <- Run every minute
//    '*/5 * * * *'       <- Run every 5 minutes
//    '0,20,40 * * * *'   <- Run 3 times per hour, at minutes 0, 20, and 40
//    '30 2 * * *'        <- Run once a day at 2:30 AM
// https://code.tutsplus.com/tutorials/scheduling-tasks-with-cron-jobs--net-8800
// ---------------------------
const schedule = '* * * * *';


// ---------------------------
// BACKUP AS JSON?
// Default: false
// Make true if you want to Backup the latest sent JSON data
// ---------------------------
const writeJson = false;


// ---------------------------
// JSON LOCATION & FILENAME
// Default: process.cwd() + '\\json\\stats.json'
// Or specify a specific Directory + Filename to Backup the latest sent JSON data to
// ---------------------------
const jsonPath = process.cwd() + '\\json\\stats.json';

// ---------------------------
// HASH LOCATION & FILENAME
// Default: process.cwd() + '\\json\\hash.txt'
// Probably good to keep this wherever the backup JSON is being stored
// Unlike the JSON backup, the hash file is mandatory.
// ---------------------------
const hashPath = process.cwd() + '\\json\\hash.txt';


// ---------------------------
// STATS VARIABLE NAME
// Default: 'stats'
// The Name of the Table in the lua file to parse into JSON
// This is the default value in SLmod, so leave it alone...
// unless at some point, SLmod is updated, and 'stats' is no longer the key name
// ---------------------------
const statsVar = 'stats';



//----------------------------------------
// DO NOT EDIT PAST THIS LINE


module.exports = {
  getJsonPath: function() { return jsonPath },
  getHashPath: function() { return hashPath },
  getPostPath: function() { return postPath },
  getSchedule: function() { return schedule },
  getStatsVar: function() { return statsVar },
  getServerId: function() { return serverId },
  getStatsPath: function() { return statsPath },
  getWriteJson: function() { return writeJson },
  getServerName: function() { return serverName },
  getServerToken: function() { return serverToken },
};
// By: Huckleberry
