@echo off
setlocal enabledelayedexpansion

set /p baseDir="Enter the base directory path: "

for %%F in ("%baseDir%\*.wmv") do (
    set "filename=%%~nF"
    set "output=!baseDir!\!filename!.mp4"
    ffmpeg -i "%%F" "!output!"
)

del "!baseDir!\*.wmv"

echo Conversion of wmv files to mp4 completed