## Synopsis

(SLmod Stats Cron) converts lua table to json object, sends to a web-based API via POST request

This app is meant to be deployed on every 229th game server you want statistics for.<br />
App needs valid authenticators (id,token) pair of values from the S3 server.

## Usage

Prereqs:
- create/have someone create/someone already created an [S3 server](https://github.com/Bango1999/S3)
- be hosting a DCS mission using [SLmod_S3](https://github.com/Bango1999/S3)


Edit global config variables in config.js<br />
Then run the app:
- type 'node cron.js' in terminal from repo directory
- ctrl + c to terminate the node application running in the terminal window.

Simple as that

## Motivation

I fly helicopters in a simulator with a unit called the 229th. The simulator is DCS, and the mod is SLmod, which is really neat because it logs game statistics.

The idea was, let's get that data from SLmod and make it web-facing so people can look anytime, say, what their flight hours are for a particular server.

This could help IP's see logged hours, or just let people go and see their kills or deaths.

## Installation

1) Install node.js (full installer .msi file)<br />
   https://nodejs.org/en/download/

2) Download this repo

3) Extract the zip file to wherever you want the server files to live

4) Open a command prompt in the folder you just created (Windows)<br />
   http://stackoverflow.com/a/23700078/4445768

5) Type 'npm install' and press enter

6) Edit config.js in a text editor.<br />
   At the top of the file, you will see a bunch of 'const' variables.<br />
   Set them according to your personal server/setup. Defaults should mostly be fine.

7) Test by typing 'node cron.js' in the cmd prompt window and pressing enter.<br />
   By default it will run once a minute, so be patient while you wait for it to log its first attempt.<br />
   When you start seeing logs, use them to troubleshoot or confirm everything is working.

8) ctrl + c to terminate the node application running in the cmd window.


## License

MIT
