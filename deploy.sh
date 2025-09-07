#!/bin/bash

echo "🚀 E-Commerce Deployment Script"
echo "==============================="

# Function to check if git is initialized
check_git() {
    if [ ! -d ".git" ]; then
        echo "Initializing Git repository..."
        git init
        git add .
        git commit -m "Initial commit for deployment"
    else
        echo "Git repository already exists"
        git add .
        git commit -m "Updates for deployment" || echo "No changes to commit"
    fi
}

# Deploy Backend
echo ""
echo "📦 Preparing Backend for Deployment..."
cd backend
check_git

echo ""
echo "🔗 Next steps for Backend:"
echo "1. Create a GitHub repository named 'ecommerce-backend'"
echo "2. Run: git remote add origin https://github.com/yourusername/ecommerce-backend.git"
echo "3. Run: git push -u origin main"
echo "4. Go to vercel.com and import the repository"
echo "5. Set environment variables in Vercel dashboard"

# Deploy Frontend
echo ""
echo "🎨 Preparing Frontend for Deployment..."
cd ../frontend
check_git

echo ""
echo "🔗 Next steps for Frontend:"
echo "1. Create a GitHub repository named 'ecommerce-frontend'"
echo "2. Run: git remote add origin https://github.com/yourusername/ecommerce-frontend.git"
echo "3. Run: git push -u origin main"
echo "4. Go to vercel.com and import the repository"
echo "5. Set environment variables in Vercel dashboard"

echo ""
echo "✅ Deployment preparation complete!"
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
