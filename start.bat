@echo off
echo Starting Amit Kumar's Portfolio Website...
echo.

echo Checking if MongoDB is running...
echo Please make sure MongoDB is installed and running on your system.
echo For MongoDB Atlas, ensure your connection string is in the .env file.
echo.

echo Installing dependencies if needed...
if not exist node_modules (
    echo Installing npm packages...
    npm install
)

echo.
echo Setting up environment...
if not exist .env (
    echo Creating .env file from template...
    copy .env.example .env
    echo Please edit the .env file with your configuration before continuing.
    pause
)

echo.
echo Seeding database with initial data...
npm run seed

echo.
echo Starting development servers...
echo Backend will run on http://localhost:5000
echo Frontend will run on http://localhost:3000
echo.
npm run dev

pause
