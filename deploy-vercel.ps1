# Vercel Deployment Script for VuaXeMoHinh
param(
    [string]$Target = "both" # "backend", "frontend", or "both"
)

Write-Host "=== Vercel Deployment Script ===" -ForegroundColor Green

# Install Vercel CLI if not already installed
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Function to deploy backend
function Deploy-Backend {
    Write-Host "`n=== Deploying Backend to Vercel ===" -ForegroundColor Green
    
    Set-Location backend
    
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    
    Write-Host "Building backend project..." -ForegroundColor Yellow
    npm run build
    
    Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
    vercel --prod
    
    Write-Host "Backend deployment completed!" -ForegroundColor Green
    Write-Host "Required Environment Variables in Vercel Dashboard:" -ForegroundColor Yellow
    Write-Host "- MONGODB_URI" -ForegroundColor Cyan
    Write-Host "- JWT_SECRET" -ForegroundColor Cyan
    Write-Host "- NODE_ENV=production" -ForegroundColor Cyan
    Write-Host "- CORS_ORIGIN" -ForegroundColor Cyan
    
    Set-Location ..
}

# Function to deploy frontend
function Deploy-Frontend {
    Write-Host "`n=== Deploying Frontend to Vercel ===" -ForegroundColor Green
    
    Set-Location frontend
    
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    
    Write-Host "Building frontend project..." -ForegroundColor Yellow
    npm run build
    
    Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
    vercel --prod
    
    Write-Host "Frontend deployment completed!" -ForegroundColor Green
    Write-Host "Required Environment Variables in Vercel Dashboard:" -ForegroundColor Yellow
    Write-Host "- NEXT_PUBLIC_API_URL" -ForegroundColor Cyan
    Write-Host "- NEXTAUTH_SECRET" -ForegroundColor Cyan
    Write-Host "- NEXTAUTH_URL" -ForegroundColor Cyan
    
    Set-Location ..
}

# Execute based on target
switch ($Target.ToLower()) {
    "backend" {
        Deploy-Backend
    }
    "frontend" {
        Deploy-Frontend
    }
    "both" {
        Deploy-Backend
        Deploy-Frontend
    }
    default {
        Write-Host "Invalid target. Use 'backend', 'frontend', or 'both'" -ForegroundColor Red
        exit 1
    }
}

Write-Host "`n=== Deployment Complete ===" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Set environment variables in Vercel dashboard" -ForegroundColor White
Write-Host "2. Update CORS_ORIGIN in backend with frontend URL" -ForegroundColor White
Write-Host "3. Test the deployed applications" -ForegroundColor White
