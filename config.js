 /*------------------------------------------/
 /                CONFIG.JS                  /
 /  Edit this file according to your needs   /
 /------------------------------------------*/

// Default: 'Server Running SLmod'
// what is the server called?

 const serverName = 'Server Running SLmod';

// these variables should be given to you by the person hosting the stats server

 const serverId = 0;
 const serverToken = "token_for_server_0";

// Default: http://1stcav.servegame.com:229/api/dcs/slmod/update
// Hosted on my local machine and routed using ddns

const sendURL = 'http://1stcav.servegame.com:229/api/dcs/slmod/update';

// Default: 'C:\\Users\\dcs\\Saved Games\\Slmod\\slmod_official_lua_stats.lua';
// The Directory + Filename of the lua stats file for node

//const statsDir = 'C:\\Users\\dcs\\Saved Games\\Slmod\\slmod_official_lua_stats.lua';

const statsDir = 'C:\\Users\\Bango\\Saved Games\\stats.lua';

// Default: 'stats'
// The Name of the Table in the lua file to parse into JSON

const statsVar = 'stats';

// Default: '* * * * *'
// Default: (AKA, once every minute)
// How often should it check for new stats?
// https://code.tutsplus.com/tutorials/scheduling-tasks-with-cron-jobs--net-8800

const schedule = '* * * * *';

// Default: false
// Make true if you want to Backup the latest sent JSON data

const writeJson = true;

// Default: process.cwd() + '\\json\\stats.json'
// Or specify a specific Directory + Filename to Backup the latest sent JSON data to

const jsonDir = process.cwd() + '\\json\\stats.json';




// DO NOT TOUCH THE REST
module.exports = {
    getSchedule: function() {
        return schedule
    },
    getSendURL: function() {
        return sendURL
    },
    getStatsDir: function() {
        return statsDir
    },
    getStatsVar: function() {
        return statsVar
    },
    getWriteJson: function() {
        return writeJson
    },
    getJsonDir: function() {
        return jsonDir
    },
    getServerName: function() {
        return serverName
    },
    getServerId: function() {
        return serverId
    },
    getServerToken: function() {
        return serverToken
    }
};
// By: Huckleberry
