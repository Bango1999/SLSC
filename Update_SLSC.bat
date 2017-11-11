@echo off
for /f %%i in ('call git status --porcelain') do set stash=%%i
if not [%stash%] == [] (
  echo Stashing local changes...
  call git add .
  call git stash -q
)
echo Updating SLSC App...
call git pull origin master
if not [%stash%] == [] (
  echo Restoring local changes...
  call git stash apply -q
)
echo Updating SLSC Dependencies...
call npm update
echo Done
pause
