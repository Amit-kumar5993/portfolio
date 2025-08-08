# Amit Kumar - Professional Portfolio Website

A modern, interactive, and professional portfolio website built with the MEAN stack (MongoDB, Express.js, Angular, Node.js) showcasing Amit Kumar's projects, skills, and achievements.
![Portfolio Screenshot](https://i.ibb.co/hx7SnDmp/Screenshot-2025-08-09-002554.png)
## 🚀 Features

- **Responsive Design**: Works perfectly on all devices (desktop, tablet, mobile)
- **Interactive UI**: Smooth animations and modern design
- **Contact Form**: Functional contact form with email integration
- **Project Showcase**: Dynamic project display with filtering
- **Skills Section**: Categorized skills and technologies
- **Certifications**: Display of professional certifications
- **Admin Panel Ready**: Backend API ready for admin functionality
- **Database Integration**: MongoDB for data persistence
- **Email Integration**: Nodemailer for contact form submissions

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Typography (Inter font family)

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Nodemailer**: Email sending functionality
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Development Tools
- **Nodemon**: Development server auto-restart
- **Concurrently**: Run multiple commands simultaneously
- **TypeScript**: Type definitions for better development

## 📂 Project Structure

```
portfolio-amit/
├── backend/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── server.js                # Main server file
│   └── seed.js                  # Database seeding script
├── frontend/
│   ├── index.html               # Main HTML file
│   ├── styles.css               # CSS styles
│   └── script.js                # JavaScript functionality
├── .env                         # Environment variables
├── .env.example                 # Environment variables template
├── package.json                 # Dependencies and scripts
└── README.md                    # Project documentation
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amit/portfolio.git
   cd portfolio-amit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio_amit
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start MongoDB**
   - For local MongoDB: Start your MongoDB service
   - For MongoDB Atlas: Ensure your connection string is correct

5. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

This will start:
- Backend server on `http://localhost:5000`
- Frontend server on `http://localhost:3000`

## 📱 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development servers (backend + frontend)
- `npm run server` - Start backend server only
- `npm run frontend` - Start frontend server only
- `npm run seed` - Seed database with initial data
- `npm run build` - Build for production

## 🌐 API Endpoints

### Portfolio Data
- `GET /api/portfolio` - Get personal information, education, skills
- `GET /api/health` - Health check endpoint

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `POST /api/projects` - Add new project (admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contact messages (admin)

## 📧 Contact Form Setup

To enable email functionality:

1. **Gmail Setup**:
   - Enable 2-Factor Authentication
   - Generate an App Password
   - Use the App Password in `EMAIL_PASS`

2. **Other Email Providers**:
   - Update the transporter configuration in `backend/server.js`

## 🔒 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/portfolio_amit` |
| `EMAIL_USER` | Email address for sending | `your-email@gmail.com` |
| `EMAIL_PASS` | Email password/app password | `your-app-password` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

## 📊 Personal Information

**Amit Kumar**
- 📧 Email: amitanshu5993@gmail.com
- 📱 Phone: +91-9142549502
- 📍 Location: Punjab, India
- 🎓 Education: B.Tech Computer Science, Lovely Professional University (2023-2027)
- 📈 CGPA: 6.34

### Featured Projects

1. **Restaurant Website** (HTML, CSS, JavaScript)
   - Responsive design with interactive features
   - Menu filtering and reservation forms
   - Cross-device compatibility

2. **Electric Vehicle Analysis** (Python, Numpy, Pandas)
   - Data analysis and visualization
   - Market trends and performance insights
   - Real-world dataset processing

3. **Portfolio Website** (MEAN Stack)
   - Full-stack web application
   - Interactive and professional design
   - Contact form integration

### Skills
- **Languages**: C++, Python, Java, SQL
- **Web Technologies**: HTML5, CSS3, JavaScript, React, Angular, Node.js
- **Platforms**: MS Excel, Windows, Git, MongoDB

### Certifications
- Responsive Web Design (Free Code Camp)
- Microsoft Excel (Coursera)
- Business Analysis (Simplilearn)
- Python & Flask (Udemy)
- Cloud Computing (NPTEL)
- Computational Theory (Infosys)

## 🚀 Deployment

### Local Development
The project is configured to run locally with the development scripts.

### Production Deployment
1. Set environment variables for production
2. Update MongoDB connection for production database
3. Configure email service for production
4. Use `npm start` to run the production server

### Hosting Suggestions
- **Backend**: Heroku, DigitalOcean, AWS, Vercel
- **Frontend**: Netlify, Vercel, GitHub Pages
- **Database**: MongoDB Atlas (recommended)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 Support

For support or questions, please contact:
- **Email**: amitanshu5993@gmail.com
- **Phone**: +91-9142549502

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- MongoDB for database solution
- Express.js community for the excellent framework
- All open-source contributors

---

**Built with ❤️ by Amit Kumar**
