#!/bin/bash#!/bin/bash#!/bin/bash



# BridgeAI Tech - Railway Deployment Script

# Starts the backend server for production

# BridgeAI Tech - Railway Deployment Script# BridgeAI Tech - Complete Startup Script

echo "🚀 Starting BridgeAI Tech Backend..."

# Starts the backend server for production# This script starts both backend and frontend servers

# Navigate to backend directory

cd backend



# Start the backend server (Railway uses PORT environment variable)echo "🚀 Starting BridgeAI Tech Backend..."echo "🚀 Starting BridgeAI Tech Application..."

echo "✅ Starting server on port $PORT..."

npm startecho "========================================"


# Navigate to backend directory

cd backend# Check if Node.js is installed

if ! command -v node &> /dev/null; then

# Start the backend server (Railway uses PORT environment variable)    echo "❌ Node.js is not installed. Please install Node.js first."

echo "✅ Starting server on port $PORT..."    exit 1

npm startfi


echo "✅ Node.js version: $(node --version)"

# Check if MongoDB is running (optional check)
if command -v mongod &> /dev/null; then
    if ! pgrep -x "mongod" > /dev/null; then
        echo "⚠️  Warning: MongoDB doesn't appear to be running."
        echo "   Please start MongoDB with: mongod"
    else
        echo "✅ MongoDB is running"
    fi
fi

# Function to check if dependencies are installed
check_dependencies() {
    if [ ! -d "$1/node_modules" ]; then
        echo "📦 Installing dependencies for $1..."
        cd "$1" && npm install && cd ..
    fi
}

# Check and install backend dependencies
check_dependencies "backend"

# Check and install frontend dependencies
check_dependencies "frontend"

# Check if database has been seeded
if [ ! -f ".db_seeded" ]; then
    echo "🌱 Seeding database with initial data..."
    cd backend && npm run seed && cd ..
    touch .db_seeded
    echo "✅ Database seeded successfully"
fi

echo ""
echo "🎯 Starting servers..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Function to handle cleanup on script exit
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Set up trap to catch Ctrl+C
trap cleanup INT TERM

# Start backend in background
echo "⚙️  Starting backend server on http://localhost:5000..."
cd backend && npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Check if backend started successfully
if kill -0 $BACKEND_PID 2>/dev/null; then
    echo "✅ Backend server started (PID: $BACKEND_PID)"
else
    echo "❌ Backend server failed to start. Check backend.log for details."
    exit 1
fi

# Start frontend in background
echo "🎨 Starting frontend server on http://localhost:3000..."
cd frontend && npm start > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait for frontend to start
sleep 5

# Check if frontend started successfully
if kill -0 $FRONTEND_PID 2>/dev/null; then
    echo "✅ Frontend server started (PID: $FRONTEND_PID)"
else
    echo "❌ Frontend server failed to start. Check frontend.log for details."
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Application started successfully!"
echo ""
echo "📱 URLs:"
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:5000"
echo ""
echo "📧 Admin Login:"
echo "   Email:     admin@bridgeaitech.com"
echo "   Password:  admin123"
echo ""
echo "📝 Logs:"
echo "   Backend:   backend.log"
echo "   Frontend:  frontend.log"
echo ""
echo "⏹️  Press Ctrl+C to stop all servers"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Wait for user to press Ctrl+C
wait