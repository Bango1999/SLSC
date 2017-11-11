@echo off


for /f %%i in ('call git status --porcelain') do set stash=%%i
if [%stash%] == [] (
  echo "stash is empty"
) else (
  echo "stash plz"
)
pause
exit /b



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
