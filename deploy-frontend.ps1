# Deploy Frontend to Vercel
Write-Host "=== Deploying Frontend to Vercel ===" -ForegroundColor Green

# Navigate to frontend directory
Set-Location frontend

# Install Vercel CLI if not already installed
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Build the project
Write-Host "Building frontend project..." -ForegroundColor Yellow
npm run build

# Deploy to Vercel
Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host "Frontend deployment completed!" -ForegroundColor Green
Write-Host "Don't forget to set environment variables in Vercel dashboard:" -ForegroundColor Yellow
Write-Host "- NEXT_PUBLIC_API_URL (Backend API URL)" -ForegroundColor Cyan
Write-Host "- NEXTAUTH_SECRET" -ForegroundColor Cyan
Write-Host "- NEXTAUTH_URL (Frontend URL)" -ForegroundColor Cyan

# Go back to root directory
Set-Location ..
