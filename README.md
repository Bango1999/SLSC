## Synopsis

(SLmod Stats Cron) converts a LUA table into JSON object, & sends it to any web server via POST request

**SLSC NOW WORKS SEAMLESSLY WITH STANDARD [SLMOD](https://github.com/mrSkortch/DCS-SLmod/tree/develop)**

More technically, it finds your stats table, hashes it, compares it against the previous hash to see if the 2 tables are different.  If the hashes are different, it tries to POST the JSON to a web server.
Easy personal configuration by editing config.js; Seamless integration with [S3](https://github.com/Bango1999/S3)

### This app is meant to be deployed on every DCS + SLmod game server you want to post statistics for.
If you plan on running this app alongside an S3 server, you will need to setup valid authenticators (id, token) pair of values from the S3 server.<br/>
If you do not plan on running an S3 server, that's OK too!  SLSC is agnostic.  You can send the SLmod stats as a JSON object to any server you like that accepts POST requests.

## Dependencies / Prerequisites

- Git
- [Node.js](https://nodejs.org/en/download/)
- Be hosting a DCS mission using [SLmod](https://github.com/mrSkortch/DCS-SLmod/tree/develop)
- ( Optional ) Create/have someone create/someone already created an [S3](https://github.com/Bango1999/S3) server ([See it in action](http://webdev.science:229))

## Usage

Edit global config variables in config.js<br />
Then run the app:
- type 'node cron.js' in terminal from repo directory
- ctrl + c to terminate the node application running in the terminal window.

Flags:
- 'node cron.js -v': verbose logging (recommended to get set up)
- 'node cron.js -s': no logging (silent) except for errors
- 'node cron.js -d': (default) normal logging

WINDOWS ONLY EASE OF ACCESS:
- you can run the app from any of the SLSC.bat files
- you can update the app with Update_SLSC.bat
- you can create shortcuts to SLSC.bat files and place them anywhere you want, and run from that

## Motivation

I fly helicopter simulations with a unit called the 229th. The simulator is DCS, and the mod is SLmod, which is really neat because it logs game statistics.

The idea was, let's get that data from SLmod and make it web-facing so people can look anytime, say, what their flight hours are for a particular server.

This could help IP's see logged hours, or just let people go and see their kills or deaths.

## Installation

1) From a terminal, `git clone https://github.com/Bango1999/SLSC.git`

2) Windows users can then click and run 'Update_SLSC.bat' from the new SLSC folder
   Otherwise, run the command `npm update` from inside the SLSC folder

3) Edit config.js in a text editor<br />
   You will see a bunch of 'const' variables<br />
   Set their values according to your personal wants and needs. Defaults should mostly be fine :)

4) Windows users can then click and run 'SLSC_Debug.bat'
   Otherwise, run the server with the command `node cron.js -v` from the SLSC folder

5) Similarly to steps 1-4, install & configure your [S3](https://github.com/Bango1999/S3) server

6)  By default it will check for new stats once a minute, so be patient while you wait for it to log its first attempt.<br />
    When you start seeing logs, use them to troubleshoot or confirm everything is working.
    ctrl + c to terminate the node application running in the command prompt window.

## License

MIT
