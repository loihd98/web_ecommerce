# Deploy Backend to Vercel
Write-Host "=== Deploying Backend to Vercel ===" -ForegroundColor Green

# Navigate to backend directory
Set-Location backend

# Install Vercel CLI if not already installed
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Build the project
Write-Host "Building backend project..." -ForegroundColor Yellow
npm run build

# Deploy to Vercel
Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host "Backend deployment completed!" -ForegroundColor Green
Write-Host "Don't forget to set environment variables in Vercel dashboard:" -ForegroundColor Yellow
Write-Host "- MONGODB_URI" -ForegroundColor Cyan
Write-Host "- JWT_SECRET" -ForegroundColor Cyan
Write-Host "- NODE_ENV=production" -ForegroundColor Cyan

# Go back to root directory
Set-Location ..
