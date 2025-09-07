# VuaXeMoHinh E-commerce Deployment Script
# This script builds and starts both frontend and backend services

Write-Host "🚀 Starting VuaXeMoHinh E-commerce Deployment..." -ForegroundColor Green

# Check if Node.js is installed
Write-Host "📦 Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Build Backend
Write-Host "🔧 Building Backend..." -ForegroundColor Yellow
Set-Location "backend"
try {
    npm run build
    Write-Host "✅ Backend build completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend build failed!" -ForegroundColor Red
    exit 1
}

# Build Frontend  
Write-Host "🔧 Building Frontend..." -ForegroundColor Yellow
Set-Location "../frontend"
try {
    npm run build
    Write-Host "✅ Frontend build completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    exit 1
}

# Start Backend in background
Write-Host "🚀 Starting Backend Server..." -ForegroundColor Yellow
Set-Location "../backend"
Start-Process powershell -ArgumentList "-Command", "cd '$PWD'; npm start" -WindowStyle Minimized
Start-Sleep -Seconds 3
Write-Host "✅ Backend server started on http://localhost:5000" -ForegroundColor Green

# Start Frontend in background  
Write-Host "🚀 Starting Frontend Server..." -ForegroundColor Yellow
Set-Location "../frontend"
Start-Process powershell -ArgumentList "-Command", "cd '$PWD'; npm start" -WindowStyle Minimized
Start-Sleep -Seconds 3
Write-Host "✅ Frontend server started on http://localhost:3000" -ForegroundColor Green

# Display information
Write-Host ""
Write-Host "🎉 VuaXeMoHinh E-commerce Deployment Complete!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "🌐 Frontend Application: http://localhost:3000" -ForegroundColor White
Write-Host "🔗 Backend API Server:   http://localhost:5000" -ForegroundColor White  
Write-Host "📚 API Documentation:    http://localhost:5000/api/docs" -ForegroundColor White
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "🏎️  VuaXeMoHinh - Model Cars Collection" -ForegroundColor Magenta
Write-Host "🔥 Features Available:" -ForegroundColor Yellow
Write-Host "   • Multi-language support (8 languages)" -ForegroundColor White
Write-Host "   • Dark/Light theme switching" -ForegroundColor White
Write-Host "   • Forgot password functionality" -ForegroundColor White
Write-Host "   • CORS properly configured" -ForegroundColor White
Write-Host "   • Mobile-responsive design" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the servers when done." -ForegroundColor Gray

# Return to project root
Set-Location ".."
