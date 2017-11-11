@echo off
for /f %%i in ('call git status --porcelain') do set stash=%%i
if [%stash%] == [] (
  echo Stashing local changes...
  call git add .
  call git stash
)
echo Updating SLSC App...
call git pull origin master
if [%stash%] == [] (
  echo Restoring local changes...
  call git stash apply
)
echo Updating SLSC Dependencies...
call npm update
echo Done
pause
