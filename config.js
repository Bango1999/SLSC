 /*------------------------------------------/
 /                CONFIG.JS                  /
 /  Edit this file according to your needs   /
 /------------------------------------------*/

// Default: 'Server Running SLmod'
// what is the server called?

 const serverName = 'Server Running SLmod';


// Default: 0, 'token_for_server_0'
// these 2 variables should be given to you by the person hosting the stats server
// Only necessary to configure if you are POSTing to an S3 server

 const serverId = 0;
 const serverToken = 'token_for_server_0';



// Default: http://localhost:4000/api/dcs/slmod/update
// The link to your S3 server + and the default S3 API route
//   If you are NOT running an S3 server, you will need to edit the route in postPath to fit the route for your own API
//   If you ARE running an S3 server, only edit serverURL to match where you are hosting your S3 server
const serverURL = 'http://localhost:4000';
  const postPath = serverURL + '/api/dcs/slmod/update';



// Default: 'C:\\Users\\dcs\\Saved Games\\Slmod\\slmod_official_lua_stats.lua';
// The Directory + Filename of the lua stats file for node

const statsDir = 'C:\\Users\\dcs\\Saved Games\\Slmod\\slmod_official_lua_stats.lua';



// Default: '* * * * *'
// Default: (AKA, once every minute)
// How often should it check for new stats?
// https://code.tutsplus.com/tutorials/scheduling-tasks-with-cron-jobs--net-8800

const schedule = '* * * * *';



// Default: false
// Make true if you want to Backup the latest sent JSON data

const writeJson = false;



// Default: process.cwd() + '\\json\\stats.json'
// Or specify a specific Directory + Filename to Backup the latest sent JSON data to

const jsonDir = process.cwd() + '\\json\\stats.json';



// Default: 'stats'
// The Name of the Table in the lua file to parse into JSON
// This is the default value for all of SLmod, so best leave it alone
//  unless you know something I don't

const statsVar = 'stats';



//----------------------------------------
// DO NOT EDIT PAST THIS LINE


module.exports = {
  getJsonDir: function() { return jsonDir },
  getSchedule: function() { return schedule },
  getPostPath: function() { return postPath },
  getStatsDir: function() { return statsDir },
  getStatsVar: function() { return statsVar },
  getServerId: function() { return serverId },
  getWriteJson: function() { return writeJson },
  getServerName: function() { return serverName },
  getServerToken: function() { return serverToken }
};
// By: Huckleberry
