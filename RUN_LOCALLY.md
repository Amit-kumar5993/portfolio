# 🏠 Run Amit's Portfolio Locally - Friend's Guide

## What You'll See
A professional portfolio website for Amit Kumar showcasing:
- Modern, responsive design
- Interactive projects section
- Skills and certifications
- Working contact form
- Professional layout

## Quick Setup (10 minutes)

### Prerequisites
You need these installed on your computer:
- **Node.js** (Download from [nodejs.org](https://nodejs.org))
- **Git** (Download from [git-scm.com](https://git-scm.com))

### Step 1: Get the Code
```bash
# Clone the repository
git clone https://github.com/Amit-kumar5993/portfolio.git
cd portfolio

# Or if you received a ZIP file, extract it and navigate to the folder
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment (Optional)
The site will work without this, but for full functionality:

1. Copy the environment file:
```bash
cp .env.example .env
```

2. For **MongoDB** (optional - projects will use fallback data):
   - Install MongoDB locally OR use the default settings
   - The app works without database - uses fallback project data

3. For **Email** (optional - contact form):
   - The contact form will show success without actually sending emails

### Step 4: Start the Project
```bash
npm run dev
```

This starts:
- Backend server on `http://localhost:5000`
- Frontend on `http://localhost:3000`

### Step 5: View the Portfolio
Open your browser and go to: **http://localhost:3000**

## What Works Without Setup
- ✅ Homepage with Amit's info
- ✅ Projects section (uses fallback data)
- ✅ Skills and technologies
- ✅ Responsive design
- ✅ All animations and interactions
- ✅ Contact form (shows success message)
- ✅ Resume download
- ✅ All navigation

## What Needs Setup for Full Functionality
- 🔧 Database connection (for dynamic projects)
- 🔧 Email sending (for actual contact form emails)

## If You Have Issues

### "npm not found"
Install Node.js from [nodejs.org](https://nodejs.org)

### "git not found"
Install Git from [git-scm.com](https://git-scm.com)

### Port already in use
```bash
# Kill existing processes
taskkill /f /im node.exe
npm run dev
```

### Dependencies failed to install
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

## Alternative: Simple Frontend Only
If you just want to see the design without backend:

1. Navigate to the `frontend` folder
2. Open `index.html` in your browser
3. The projects section will show "Loading..." but everything else works

## Project Structure
```
portfolio-amit/
├── frontend/           # Website files
│   ├── index.html     # Main page
│   ├── styles.css     # Styling
│   └── script.js      # Functionality
├── backend/           # Server files
│   └── server.js      # API server
└── package.json       # Dependencies
```

## Features to Check Out
1. **Responsive Design** - Try resizing your browser
2. **Smooth Animations** - Scroll through sections
3. **Project Gallery** - Hover over project cards
4. **Interactive Contact Form** - Try filling it out
5. **Mobile Menu** - Resize to mobile view
6. **Professional Layout** - Notice the clean design

## Amit's Information
- **Name**: Amit Kumar
- **Email**: amitanshu5993@gmail.com
- **Education**: B.Tech Computer Science at LPU
- **GitHub**: https://github.com/Amit-kumar5993
- **LinkedIn**: https://www.linkedin.com/in/amit-kumar-5993ka/

## Tech Stack Used
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Email**: Nodemailer
- **Styling**: Custom CSS with modern features

---

## Quick Commands Summary
```bash
# Get the code
git clone [repository-url]
cd portfolio

# Install and run
npm install
npm run dev

# Open browser to:
http://localhost:3000
```

**Enjoy exploring Amit's professional portfolio! 🚀**

---

*If you have any questions, contact Amit at amitanshu5993@gmail.com*
