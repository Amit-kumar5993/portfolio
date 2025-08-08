const mongoose = require('mongoose');
require('dotenv').config();

// Project Schema
const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    technologies: [String],
    githubUrl: String,
    liveUrl: String,
    images: [String],
    featured: Boolean,
    startDate: Date,
    endDate: Date,
    createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);

const seedProjects = [
    {
        title: 'Public Data for Impact: Energy Efficiency Dashboard in Excel',
        description: 'Developed a comprehensive Energy Efficiency Dashboard using Excel to analyze and visualize public data for impact assessment. The dashboard provides insights into energy consumption patterns, efficiency metrics, and environmental impact through interactive charts and data analysis. This project demonstrates advanced Excel skills including data modeling, pivot tables, and dashboard creation.',
        technologies: ['Microsoft Excel', 'Data Analysis', 'Dashboard Design', 'Data Visualization', 'Public Data'],
        githubUrl: 'https://github.com/Amit-kumar5993/IT-Contracts-Analysis-Project',
        liveUrl: '#',
        images: ['https://i.ibb.co/CKpPd1Ww/Screenshot-2025-08-08-235648.png'],
        featured: true,
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-07-01')
    },
    {
        title: 'Restaurant Ordering System',
        description: 'Developed a responsive restaurant ordering system using HTML, CSS, and JavaScript to showcase menus, enable online ordering, and manage customer interactions. Integrated interactive features like menu browsing, order customization, cart management, and order tracking for enhanced user experience. Ensured cross-device compatibility and smooth navigation with clean UI design and responsive layout.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'UI/UX'],
        githubUrl: 'https://github.com/Amit-kumar5993/restaurant',
        liveUrl: '#',
        images: ['https://i.ibb.co/4gYkjctx/1-6-Mq2-W-Dca7-Pp-YVw1-Jzoi-MQ.jpg'],
        featured: true,
        startDate: new Date('2023-09-01'),
        endDate: new Date('2023-10-01')
    },
    {
        title: 'Electric Vehicle Analysis',
        description: 'Conducted in-depth analysis of electric vehicle performance and market trends using Python, Numpy, and Pandas for data processing and visualization. Explored battery efficiency, range statistics, and charging patterns using real-world datasets and generated actionable insights through data-driven comparisons. Developed clear visual reports to support decision-making in EV adoption and infrastructure planning.',
        technologies: ['Python', 'Numpy', 'Pandas', 'Data Visualization', 'Analytics'],
        githubUrl: 'https://github.com/Amit-kumar5993/Electric-vehicle-analyze',
        liveUrl: '#',
        images: ['https://i.ibb.co/0RnvMwGv/1744464174139.jpg'],
        featured: true,
        startDate: new Date('2025-03-01'),
        endDate: new Date('2025-04-01')
    },
    {
        title: 'Portfolio Website (MEAN Stack)',
        description: 'Interactive and professional portfolio website built with MEAN stack (MongoDB, Express.js, Angular, Node.js). Features responsive design, contact form integration, project showcase, and admin panel for content management.',
        technologies: ['MongoDB', 'Express.js', 'Angular', 'Node.js', 'TypeScript', 'CSS3'],
        githubUrl: 'https://github.com/Amit-kumar5993/portfolio',
        liveUrl: '#',
        images: ['https://i.ibb.co/FkxFfgDG/Screenshot-2025-08-09-002554.png'],
        featured: true,
        startDate: new Date('2025-08-01'),
        endDate: new Date('2025-08-08')
    }
];

const seedDatabase = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_amit';
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        // Clear existing projects
        await Project.deleteMany({});
        console.log('Cleared existing projects');

        // Insert seed data
        const projects = await Project.insertMany(seedProjects);
        console.log(`Inserted ${projects.length} projects`);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
