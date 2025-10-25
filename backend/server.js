// server.js - BridgeAI Tech Backend
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bridgeai', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Error:', err));

// ==================== SCHEMAS ====================

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor', 'viewer'], default: 'viewer' },
  createdAt: { type: Date, default: Date.now }
});

// Contact Form Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: String,
  phone: String,
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'contacted', 'qualified', 'closed'], default: 'new' },
  source: { type: String, default: 'website' },
  hubspotId: String,
  salesforceId: String,
  createdAt: { type: Date, default: Date.now }
});

// Blog Post Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: String,
  tags: [String],
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
  publishedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Case Study Schema
const caseStudySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  industry: { type: String, required: true },
  challenge: { type: String, required: true },
  solution: { type: String, required: true },
  results: [String],
  metrics: {
    metric1: { label: String, value: String },
    metric2: { label: String, value: String },
    metric3: { label: String, value: String }
  },
  testimonial: {
    quote: String,
    author: String,
    role: String
  },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Settings Schema
const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: mongoose.Schema.Types.Mixed,
  updatedAt: { type: Date, default: Date.now }
});

// Models
const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);
const BlogPost = mongoose.model('BlogPost', blogSchema);
const CaseStudy = mongoose.model('CaseStudy', caseStudySchema);
const Settings = mongoose.model('Settings', settingsSchema);

// ==================== MIDDLEWARE ====================

// JWT Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Role-based authorization
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

// ==================== EMAIL SETUP ====================

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// ==================== ROUTES ====================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ==================== AUTH ROUTES ====================

// Register
app.post('/api/auth/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'viewer' // Default role
    });

    await user.save();

    res.status(201).json({ 
      message: 'User created successfully',
      userId: user._id 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login
app.post('/api/auth/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Get current user
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

// ==================== CONTACT ROUTES ====================

// Submit contact form
app.post('/api/contact', [
  body('name').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('message').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, company, phone, message } = req.body;

    // Save to database
    const contact = new Contact({
      name,
      email,
      company,
      phone,
      message,
      status: 'new'
    });

    await contact.save();

    // Send email notification
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@bridgeaitech.com',
        to: process.env.ADMIN_EMAIL || 'hello@bridgeaitech.com',
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      });

      // Send confirmation to user
      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@bridgeaitech.com',
        to: email,
        subject: 'Thank you for contacting BridgeAI Tech',
        html: `
          <h2>Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>We've received your message and will get back to you within 24 hours.</p>
          <p>Best regards,<br>BridgeAI Tech Team</p>
        `
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Continue even if email fails
    }

    // TODO: Push to HubSpot/Salesforce (implement based on your setup)
    // await pushToHubSpot(contact);
    // await pushToSalesforce(contact);

    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      contactId: contact._id 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Error submitting contact form' });
  }
});

// Get all contacts (Admin only)
app.get('/api/contacts', authenticateToken, authorizeRoles('admin', 'editor'), async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Contact.countDocuments(query);

    res.json({
      contacts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contacts' });
  }
});

// Update contact status
app.patch('/api/contacts/:id', authenticateToken, authorizeRoles('admin', 'editor'), async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Error updating contact' });
  }
});

// ==================== BLOG ROUTES ====================

// Get all blog posts (public)
app.get('/api/blog', async (req, res) => {
  try {
    const { category, featured, page = 1, limit = 10 } = req.query;
    const query = { published: true };
    
    if (category) query.category = category;
    if (featured) query.featured = true;

    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-content'); // Exclude full content for list view

    const count = await BlogPost.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blog posts' });
  }
});

// Get single blog post by slug (public)
app.get('/api/blog/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ 
      slug: req.params.slug, 
      published: true 
    });

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blog post' });
  }
});

// Create blog post (Admin/Editor only)
app.post('/api/blog', authenticateToken, authorizeRoles('admin', 'editor'), [
  body('title').trim().notEmpty(),
  body('slug').trim().notEmpty(),
  body('content').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = new BlogPost(req.body);
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Slug already exists' });
    }
    res.status(500).json({ error: 'Error creating blog post' });
  }
});

// Update blog post
app.put('/api/blog/:id', authenticateToken, authorizeRoles('admin', 'editor'), async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error updating blog post' });
  }
});

// Delete blog post
app.delete('/api/blog/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting blog post' });
  }
});

// ==================== CASE STUDY ROUTES ====================

// Get all case studies (public)
app.get('/api/case-studies', async (req, res) => {
  try {
    const { industry, featured } = req.query;
    const query = { published: true };
    
    if (industry) query.industry = industry;
    if (featured) query.featured = true;

    const caseStudies = await CaseStudy.find(query).sort({ createdAt: -1 });

    res.json(caseStudies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching case studies' });
  }
});

// Get single case study by slug (public)
app.get('/api/case-studies/:slug', async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOne({ 
      slug: req.params.slug, 
      published: true 
    });

    if (!caseStudy) {
      return res.status(404).json({ error: 'Case study not found' });
    }

    res.json(caseStudy);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching case study' });
  }
});

// Create case study (Admin/Editor only)
app.post('/api/case-studies', authenticateToken, authorizeRoles('admin', 'editor'), async (req, res) => {
  try {
    const caseStudy = new CaseStudy(req.body);
    await caseStudy.save();

    res.status(201).json(caseStudy);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Slug already exists' });
    }
    res.status(500).json({ error: 'Error creating case study' });
  }
});

// Update case study
app.put('/api/case-studies/:id', authenticateToken, authorizeRoles('admin', 'editor'), async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!caseStudy) {
      return res.status(404).json({ error: 'Case study not found' });
    }

    res.json(caseStudy);
  } catch (error) {
    res.status(500).json({ error: 'Error updating case study' });
  }
});

// Delete case study
app.delete('/api/case-studies/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findByIdAndDelete(req.params.id);

    if (!caseStudy) {
      return res.status(404).json({ error: 'Case study not found' });
    }

    res.json({ message: 'Case study deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting case study' });
  }
});

// ==================== SETTINGS ROUTES ====================

// Get settings
app.get('/api/settings', authenticateToken, async (req, res) => {
  try {
    const settings = await Settings.find();
    const settingsObj = {};
    settings.forEach(s => {
      settingsObj[s.key] = s.value;
    });
    res.json(settingsObj);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching settings' });
  }
});

// Update settings
app.put('/api/settings', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const updates = req.body;
    const promises = Object.entries(updates).map(([key, value]) => {
      return Settings.findOneAndUpdate(
        { key },
        { key, value, updatedAt: Date.now() },
        { upsert: true, new: true }
      );
    });

    await Promise.all(promises);

    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating settings' });
  }
});

// ==================== ERROR HANDLING ====================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ==================== START SERVER ====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});