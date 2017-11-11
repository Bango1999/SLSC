@echo off

rem if the hash doesnt exist, we dont know whether to stash or not which is a problem
  If Not Exist hash\updater.hashfile (
    echo ERROR: missing file 'hash\updater.hashfile'. Updater will now close.
    pause
    Exit /b
  )

rem hash the current config.js into a variable md5_var
  call hash\MD5.bat config.js md5_var
rem pipe hash to file
  echo %md5_var% > hash\updater.hashfile.temp

rem compare the old hashfile with the current hashfile
  call FC hash\updater.hashfile hash\updater.hashfile.temp >NUL && set stash_var=0 || set stash_var=1

rem delete the temp (current) hashfile
  del /f hash\updater.hashfile.temp

rem if we need to stash, do so
  if "%stash_var%" == "1" (call git stash)

rem git pull and tell the user whats happening
  echo SLSC Updating...
  call git pull origin master

rem check again if we stashed, if so, unstash
  if "%stash_var%" == "1" (call git stash apply)

rem call npm update, tell the user whats happening
  echo SLSC Updating Dependencies...
  call npm update

rem all done
  echo Done
  pause
