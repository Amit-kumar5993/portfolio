# 🚀 Quick Deployment Checklist

## Before Deployment
- [ ] Update package.json with correct start script
- [ ] Create .env.example file with all required variables
- [ ] Update CORS configuration in server.js
- [ ] Test locally: `npm start`
- [ ] Commit all changes to Git

## For Railway Deployment (Recommended)
- [ ] Push code to GitHub
- [ ] Connect GitHub repo to Railway
- [ ] Set environment variables in Railway:
  - [ ] `MONGODB_URI` (MongoDB Atlas connection string)
  - [ ] `NODE_ENV=production`
  - [ ] `EMAIL_USER` (your Gmail)
  - [ ] `EMAIL_PASS` (Gmail app password)
- [ ] Deploy and test

## Environment Variables Needed
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
NODE_ENV=production
EMAIL_USER=amitanshu5993@gmail.com
EMAIL_PASS=your-gmail-app-password
```

## MongoDB Atlas Setup
1. Create free account at mongodb.com/atlas
2. Create new cluster (free tier M0)
3. Create database user
4. Whitelist all IPs (0.0.0.0/0)
5. Get connection string
6. Replace password in connection string

## Gmail App Password Setup
1. Enable 2-factor authentication
2. Go to Google Account → Security → 2-Step Verification → App Passwords
3. Generate password for "Mail"
4. Use 16-character password in EMAIL_PASS

## Testing Deployment
- [ ] All pages load correctly
- [ ] Contact form works
- [ ] All images display
- [ ] All links work
- [ ] Resume download works
- [ ] Mobile responsive
- [ ] No console errors

## Post-Deployment
- [ ] Update LinkedIn with live URL
- [ ] Update GitHub profile with live URL
- [ ] Test on different devices
- [ ] Share with potential employers

## Quick Commands
```bash
# Commit changes
git add .
git commit -m "Ready for deployment"

# Push to GitHub
git push origin main

# Test locally
npm start
```

## Live URLs
- Development: http://localhost:5000
- Production: [Your deployed URL here]

## Support
If you encounter issues:
1. Check Railway/platform logs
2. Verify environment variables
3. Test MongoDB connection
4. Check CORS settings
