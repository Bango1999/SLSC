   [ SS NODE_CHILD Application ]
   [ By: (A/229) Huckleberry   ]
   [        README.txt         ]

This package is meant to be deployed on every 229th game server you want statistics for.
Installation instructions are outlined directly below.  Standard operation is outlined at the bottom of this file.


1) Install node.js (full installer .msi file)
   https://nodejs.org/en/download/

2) Download node_child.zip from secure download location
   ? TS channel Flight Alpha file browser ?

3) Extract the zip file to wherever you want the server files to live

4) Open a command prompt in the folder you just created (Windows)
   http://stackoverflow.com/a/23700078/4445768

5) Type 'npm install' and press enter

6) Edit config.js in a text editor.
   At the top of the file, you will see a bunch of 'const' variables.
   Set them according to your personal server/setup. Defaults should mostly be fine.

7) Test by typing 'node cron.js' in the cmd prompt window and pressing enter.
   By default it will run once a minute, so be patient while you wait for it to log its first attempt.
   When you start seeing logs, use them to troubleshoot or confirm everything is working.

8) ctrl + c to terminate the node application running in the cmd window.

-------------------------------------------------------------------------------------------------------

Ease of Use:

[ Coming Soon ]
TODO: BAT scripting
