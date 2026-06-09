#!/bin/bash
echo "======================================"
echo " SMART SOLUTION - Starting Servers"
echo "======================================"
echo ""

# Start backend in new terminal
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    osascript -e 'tell application "Terminal" to do script "cd '"$(pwd)"'/backend && npm run dev"'
    sleep 3
    osascript -e 'tell application "Terminal" to do script "cd '"$(pwd)"'/frontend && npm start"'
else
    # Linux
    gnome-terminal -- bash -c "cd $(pwd)/backend && npm run dev; exec bash" &
    sleep 3
    gnome-terminal -- bash -c "cd $(pwd)/frontend && npm start; exec bash" &
fi

echo ""
echo "Both servers starting..."
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
