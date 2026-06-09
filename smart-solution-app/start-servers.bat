@echo off
echo ======================================
echo  SMART SOLUTION - Starting Servers
echo ======================================
echo.
start "Backend Server" cmd /k "cd backend && npm run dev"
timeout /t 3 >nul
start "Frontend Server" cmd /k "cd frontend && npm start"
echo.
echo Both servers started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
pause
