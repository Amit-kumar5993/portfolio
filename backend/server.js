const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:4200',
        process.env.FRONTEND_URL,
        // Add your production URL here
        'https://your-domain.com'
    ].filter(Boolean),
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_amit', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model('Contact', contactSchema);

// Project Schema
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: [{
        type: String
    }],
    githubUrl: {
        type: String
    },
    liveUrl: {
        type: String
    },
    images: [{
        type: String
    }],
    featured: {
        type: Boolean,
        default: false
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Project = mongoose.model('Project', projectSchema);

// Routes

// Get portfolio data
app.get('/api/portfolio', async (req, res) => {
    try {
        const portfolioData = {
            personal: {
                name: 'Amit Kumar',
                email: 'amitanshu5993@gmail.com',
                phone: '+91-9142549502',
                location: 'Punjab, India',
                title: 'Computer Science Student',
                bio: 'Passionate Computer Science student with expertise in web development, data analysis, and emerging technologies. Currently pursuing Bachelor of Technology at Lovely Professional University.',
                avatar: '/assets/images/amit-avatar.jpg'
            },
            education: [
                {
                    institution: 'Lovely Professional University',
                    degree: 'Bachelor of Technology - Computer Science',
                    location: 'Punjab, India',
                    duration: '2023 - 2027',
                    cgpa: '6.34 CGPA'
                }
            ],
            skills: {
                languages: ['C++', 'Python', 'Java', 'SQL'],
                webTechnologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Angular', 'Node.js'],
                platforms: ['MS Excel', 'Windows 7/10', 'Git', 'MongoDB'],
                frameworks: ['Express.js', 'Flask', 'Bootstrap']
            },
            certifications: [
                {
                    title: 'Responsive Web Design',
                    issuer: 'Free Code Camp',
                    year: '2023'
                },
                {
                    title: 'Microsoft Excel',
                    issuer: 'Coursera',
                    year: '2023'
                },
                {
                    title: 'Getting Started with Business Analysis',
                    issuer: 'Simplilearn',
                    year: '2023'
                },
                {
                    title: 'Python and Flask Framework Complete Course for Beginners',
                    issuer: 'Udemy',
                    year: '2024'
                },
                {
                    title: 'Cloud Computing',
                    issuer: 'NPTEL',
                    year: '2024'
                },
                {
                    title: 'Computational Theory',
                    issuer: 'Infosys',
                    year: '2024'
                }
            ]
        };
        
        res.json(portfolioData);
    } catch (error) {
        console.error('Error fetching portfolio data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get featured projects
app.get('/api/projects/featured', async (req, res) => {
    try {
        const featuredProjects = await Project.find({ featured: true }).sort({ createdAt: -1 });
        res.json(featuredProjects);
    } catch (error) {
        console.error('Error fetching featured projects:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add project (admin endpoint)
app.post('/api/projects', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(400).json({ message: 'Error creating project', error: error.message });
    }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate input
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Save to database
        const contact = new Contact({
            name,
            email,
            subject,
            message
        });

        await contact.save();

        // Send email notification
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'amitanshu5993@gmail.com',
                pass: process.env.EMAIL_PASS || 'your-app-password'
            }
        });

        const mailOptions = {
            from: email,
            to: 'amitanshu5993@gmail.com',
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <hr>
                <p>Sent from Amit Kumar's Portfolio Website</p>
            `
        };

        // Send email (optional, depends on email configuration)
        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (emailError) {
            console.log('Email sending failed:', emailError.message);
            // Continue execution even if email fails
        }

        res.status(201).json({ 
            message: 'Message sent successfully! Thank you for reaching out.',
            contact: {
                id: contact._id,
                name: contact.name,
                email: contact.email,
                subject: contact.subject,
                createdAt: contact.createdAt
            }
        });

    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// Get all contacts (admin endpoint)
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Portfolio API is running',
        timestamp: new Date().toISOString()
    });
});

// Serve frontend for all non-API routes (SPA support)
app.get('*', (req, res) => {
    // Only serve frontend for non-API routes
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(__dirname, '../frontend/index.html'));
    } else {
        res.status(404).json({ message: 'API route not found' });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
});

// Start server
const startServer = async () => {
    await connectDB();
    
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
        console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
    });
};

startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});

module.exports = app;
