@ECHO OFF
set /p msg="Enter message: "
git add .
git commit -am "%msg%"
git push