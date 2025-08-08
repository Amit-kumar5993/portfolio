// API Base URL - automatically detects environment
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api'
    : '/api';

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
const loadingSpinner = document.getElementById('loading-spinner');
const notification = document.getElementById('notification');

// State
let portfolioData = null;
let isLoading = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    try {
        showLoading();
        
        // Fetch portfolio data
        await fetchPortfolioData();
        
        // Initialize components
        initializeNavigation();
        initializeScrollAnimations();
        initializeContactForm();
        
        // Load dynamic content
        loadSkills();
        loadProjects();
        loadCertifications();
        
        hideLoading();
        
        // Animate sections on scroll
        observeSections();
        
    } catch (error) {
        console.error('Error initializing app:', error);
        showNotification('Failed to load portfolio data', 'error');
        hideLoading();
    }
}

// API Functions
async function fetchPortfolioData() {
    try {
        const response = await fetch(`${API_BASE_URL}/portfolio`);
        if (!response.ok) {
            throw new Error('Failed to fetch portfolio data');
        }
        portfolioData = await response.json();
        return portfolioData;
    } catch (error) {
        console.error('Error fetching portfolio data:', error);
        // Use fallback data if API is not available
        portfolioData = getFallbackData();
        return portfolioData;
    }
}

async function fetchProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects/featured`);
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        const projects = await response.json();
        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        const fallbackProjects = getFallbackProjects();
        return fallbackProjects;
    }
}

async function submitContactForm(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Failed to send message');
        }
        
        return result;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
}

// Navigation
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Navbar background on scroll
    window.addEventListener('scroll', updateNavbarBackground);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (scrollPos >= top && scrollPos < top + height) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Contact Form
function initializeContactForm() {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (isLoading) return;
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Validate form
        if (!validateContactForm(formData)) {
            return;
        }

        try {
            setFormLoading(true);
            
            const result = await submitContactForm(formData);
            
            showNotification(result.message || 'Message sent successfully!', 'success');
            contactForm.reset();
            
        } catch (error) {
            showNotification(error.message || 'Failed to send message. Please try again.', 'error');
        } finally {
            setFormLoading(false);
        }
    });
}

function validateContactForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name || data.name.length < 2) {
        showNotification('Please enter a valid name', 'error');
        return false;
    }
    
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    if (!data.subject || data.subject.length < 3) {
        showNotification('Please enter a subject', 'error');
        return false;
    }
    
    if (!data.message || data.message.length < 10) {
        showNotification('Please enter a message with at least 10 characters', 'error');
        return false;
    }
    
    return true;
}

function setFormLoading(loading) {
    isLoading = loading;
    const button = contactForm.querySelector('button[type="submit"]');
    const btnText = button.querySelector('.btn-text');
    const btnLoading = button.querySelector('.btn-loading');
    
    if (loading) {
        button.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
    } else {
        button.disabled = false;
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
    }
}

// Dynamic Content Loading
function loadSkills() {
    const skillsContainer = document.getElementById('skills-container');
    
    if (!portfolioData || !portfolioData.skills) {
        return;
    }
    
    const skills = portfolioData.skills;
    
    const skillCategories = [
        {
            title: 'Programming Languages',
            icon: 'fas fa-code',
            skills: skills.languages || []
        },
        {
            title: 'Web Technologies',
            icon: 'fas fa-globe',
            skills: skills.webTechnologies || []
        },
        {
            title: 'Platforms & Tools',
            icon: 'fas fa-tools',
            skills: skills.platforms || []
        }
    ];
    
    skillsContainer.innerHTML = skillCategories.map(category => `
        <div class="skill-category section-animate">
            <h3>
                <i class="${category.icon}"></i>
                ${category.title}
            </h3>
            <div class="skill-list">
                ${category.skills.map(skill => `
                    <span class="skill-tag">${skill}</span>
                `).join('')}
            </div>
        </div>
    `).join('');
}

async function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    try {
        const projects = await fetchProjects();
        
        if (!projects || projects.length === 0) {
            projectsGrid.innerHTML = '<div class="col-12"><p class="text-center text-muted">No projects available at this time.</p></div>';
            return;
        }
        
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card section-animate animate">
                <div class="project-image">
                    ${project.images && project.images.length > 0 && project.images[0].startsWith('http') ? 
                        `<img src="${project.images[0]}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">` :
                        `<i class="fas fa-laptop-code"></i>`
                    }
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `
                            <span class="tech-tag">${tech}</span>
                        `).join('')}
                    </div>
                    <div class="project-links">
                        ${project.githubUrl ? `
                            <a href="${project.githubUrl}" class="project-link" target="_blank">
                                <i class="fab fa-github"></i>
                                View Code
                            </a>
                        ` : ''}
                        ${project.liveUrl && project.liveUrl !== '#' ? `
                            <a href="${project.liveUrl}" class="project-link" target="_blank">
                                <i class="fas fa-external-link-alt"></i>
                                Live Demo
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = `
            <div class="col-12">
                <p class="text-center text-muted">Unable to load projects at this time.</p>
            </div>
        `;
    }
}

function loadCertifications() {
    const certificationsGrid = document.getElementById('certifications-grid');
    
    if (!portfolioData || !portfolioData.certifications) {
        return;
    }
    
    const certifications = portfolioData.certifications;
    
    certificationsGrid.innerHTML = certifications.map(cert => `
        <div class="certification-card section-animate">
            <h4 class="certification-title">${cert.title}</h4>
            <p class="certification-issuer">${cert.issuer}</p>
            <p class="certification-year">${cert.year}</p>
        </div>
    `).join('');
}

// Scroll Animations
function initializeScrollAnimations() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function observeSections() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.section-animate').forEach(section => {
        observer.observe(section);
    });
}

// Utility Functions
function showLoading() {
    loadingSpinner.style.display = 'flex';
}

function hideLoading() {
    loadingSpinner.style.display = 'none';
}

function showNotification(message, type = 'success') {
    const notificationIcon = notification.querySelector('.notification-icon');
    const notificationMessage = notification.querySelector('.notification-message');
    
    notification.className = `notification ${type}`;
    notificationMessage.textContent = message;
    
    if (type === 'success') {
        notificationIcon.className = 'notification-icon fas fa-check-circle';
    } else {
        notificationIcon.className = 'notification-icon fas fa-exclamation-circle';
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Fallback Data
function getFallbackData() {
    return {
        personal: {
            name: 'Amit Kumar',
            email: 'amitanshu5993@gmail.com',
            phone: '+91-9142549502',
            location: 'Punjab, India',
            title: 'Computer Science Student',
            bio: 'Passionate Computer Science student with expertise in web development, data analysis, and emerging technologies.',
            avatar: '/assets/images/amit-avatar.jpg'
        },
        skills: {
            languages: ['C++', 'Python', 'Java', 'SQL'],
            webTechnologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Angular', 'Node.js'],
            platforms: ['MS Excel', 'Windows 7/10', 'Git', 'MongoDB']
        },
        certifications: [
            { title: 'Responsive Web Design', issuer: 'Free Code Camp', year: '2023' },
            { title: 'Microsoft Excel', issuer: 'Coursera', year: '2023' },
            { title: 'Getting Started with Business Analysis', issuer: 'Simplilearn', year: '2023' },
            { title: 'Python and Flask Framework Complete Course for Beginners', issuer: 'Udemy', year: '2024' },
            { title: 'Cloud Computing', issuer: 'NPTEL', year: '2024' },
            { title: 'Computational Theory', issuer: 'Infosys', year: '2024' }
        ]
    };
}

function getFallbackProjects() {
    return [
        {
            title: 'Public Data for Impact: Energy Efficiency Dashboard in Excel',
            description: 'Comprehensive Energy Efficiency Dashboard using Excel to analyze and visualize public data for impact assessment with interactive charts and data analysis.',
            technologies: ['Microsoft Excel', 'Data Analysis', 'Dashboard Design', 'Data Visualization'],
            githubUrl: 'https://github.com/Amit-kumar5993/IT-Contracts-Analysis-Project',
            liveUrl: '#',
            images: ['https://i.ibb.co/CKpPd1Ww/Screenshot-2025-08-08-235648.png'],
            featured: true
        },
        {
            title: 'Restaurant Ordering System',
            description: 'Responsive restaurant ordering system with menu browsing, order customization, cart management, and order tracking.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
            githubUrl: 'https://github.com/Amit-kumar5993/restaurant',
            liveUrl: '#',
            images: ['https://i.ibb.co/4gYkjctx/1-6-Mq2-W-Dca7-Pp-YVw1-Jzoi-MQ.jpg'],
            featured: true
        },
        {
            title: 'Electric Vehicle Analysis',
            description: 'Data analysis project exploring EV performance and market trends using Python and data visualization.',
            technologies: ['Python', 'Numpy', 'Pandas', 'Data Visualization'],
            githubUrl: 'https://github.com/Amit-kumar5993/Electric-vehicle-analyze',
            liveUrl: '#',
            images: ['https://i.ibb.co/0RnvMwGv/1744464174139.jpg'],
            featured: true
        },
        {
            title: 'Portfolio Website',
            description: 'Professional portfolio website built with MEAN stack featuring responsive design and contact integration.',
            technologies: ['MongoDB', 'Express.js', 'Angular', 'Node.js'],
            githubUrl: 'https://github.com/Amit-kumar5993/portfolio',
            liveUrl: '#',
            images: ['https://i.ibb.co/FkxFfgDG/Screenshot-2025-08-09-002554.png'],
            featured: true
        }
    ];
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Close notification
        notification.classList.remove('show');
    }
});

// Performance optimization
window.addEventListener('load', () => {
    // Update hero avatar with professional picture
    const heroAvatarImg = document.getElementById('hero-avatar-img');
    if (heroAvatarImg) {
        heroAvatarImg.src = 'https://i.ibb.co/GfhZDkwy/Screenshot-2025-08-08-235849.png';
        heroAvatarImg.alt = 'Amit Kumar - Professional Photo';
    }
    
    // Preload images
    const imageUrls = [
        'https://i.ibb.co/GfhZDkwy/Screenshot-2025-08-08-235849.png',
        'https://i.ibb.co/CKpPd1Ww/Screenshot-2025-08-08-235648.png',
        'https://i.ibb.co/4gYkjctx/1-6-Mq2-W-Dca7-Pp-YVw1-Jzoi-MQ.jpg',
        'https://i.ibb.co/0RnvMwGv/1744464174139.jpg',
        'https://i.ibb.co/FkxFfgDG/Screenshot-2025-08-09-002554.png'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
});

// Error handling for uncaught errors
window.addEventListener('error', (e) => {
    console.error('Uncaught error:', e.error);
    showNotification('An unexpected error occurred. Please refresh the page.', 'error');
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Register service worker when available
        // navigator.serviceWorker.register('/sw.js');
    });
}
