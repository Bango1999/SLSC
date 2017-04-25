## Synopsis

(SLmod Stats Cron) converts lua table to json object, sends to an arbitrary web-based API via POST request

### This app is meant to be deployed on every DCS + SLmod_S3 game server you want to post statistics for.
If you plan on running this app alongside an S3 server, you will need valid authenticators (id, token) pair of values from the S3 server.<br/>
If you do not plan on running an S3 server, that's OK too!  SLSC is agnostic.  You can send the SLmod stats as a JSON object to any server you like that accepts POST requests.

## Usage

Prereqs:
- Be hosting a DCS mission using [SLmod_S3](https://github.com/Bango1999/SLmod_S3)
- ( Optional ) Create/have someone create/someone already created an [S3 server](https://github.com/Bango1999/S3) ([See it in action](http://stats.229ahb.com:4000/))


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
- you can create shortcuts to SLSC.bat files and place them anywhere you want, and run from that

## Motivation

I fly helicopters in a simulator with a unit called the 229th. The simulator is DCS, and the mod is SLmod, which is really neat because it logs game statistics.

The idea was, let's get that data from SLmod and make it [web-facing](http://stats.229ahb.com:4000/) so people can look anytime, say, what their flight hours are for a particular server.

This could help IP's see logged hours, or just let people go and see their kills or deaths.

## Installation

1) Install node.js (full installer .msi file for Windows)<br />
   https://nodejs.org/en/download/<br/>
   or in linux (apt-get/yum install nodejs)

2) from a terminal, git clone https://github.com/Bango1999/SLSC.git

3a) If Windows, go to the project folder you just cloned in file explorer and run the file Update_SLSC.bat<br/>
3b) If not Windows, stay inside the terminal and run 'npm update'

6) Edit config.js in a text editor.<br />
   At the top of the file, you will see a bunch of 'const' variables.<br />
   Set them according to your personal server/setup. Defaults should mostly be fine.

7a) If Windows, run the file SLSC_Debug.bat
7b) If not Windows, test by running 'node cron.js -v' in the cmd prompt window<br />
    By default it will run once a minute, so be patient while you wait for it to log its first attempt.<br />
    When you start seeing logs, use them to troubleshoot or confirm everything is working.
    ctrl + c to terminate the node application running in the cmd window.
## License

MIT
