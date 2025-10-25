# BridgeAI Tech - Enterprise AI Solutions

A full-stack web application for BridgeAI Tech, featuring a React frontend and Node.js/Express backend with MongoDB.

## 🏗️ Project Structure

```
bridgeai-tech2/
├── backend/                 # Node.js Express API
│   ├── server.js           # Main server file
│   ├── seed.js             # Database seeder
│   ├── package.json        # Backend dependencies
│   ├── .env                # Environment variables
│   └── .env.example        # Environment template
│
├── frontend/               # React application
│   ├── public/
│   │   ├── index.html      # HTML template
│   │   └── manifest.json   # PWA manifest
│   ├── src/
│   │   ├── app.js          # Main app component
│   │   ├── index.js        # React entry point
│   │   ├── index.css       # Tailwind imports & styles
│   │   └── components/     # React components
│   ├── package.json        # Frontend dependencies
│   ├── tailwind.config.js  # Tailwind configuration
│   └── postcss.config.js   # PostCSS configuration
│
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd bridgeai-tech2

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
# Update MongoDB URI, JWT secret, email settings, etc.
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Create environment file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

## ⚙️ Configuration

### Backend Configuration (.env)

```env
# Server
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/bridgeai

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this

# Email (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@bridgeaitech.com
ADMIN_EMAIL=hello@bridgeaitech.com

# Optional: HubSpot
HUBSPOT_API_KEY=your-hubspot-key

# Optional: Salesforce
SALESFORCE_CLIENT_ID=your-sf-client-id
SALESFORCE_CLIENT_SECRET=your-sf-secret
```

### Frontend Configuration (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🏃 Running the Application

### 1. Start MongoDB

**macOS with Homebrew:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Windows:**
```bash
net start MongoDB
```

### 2. Seed the Database

```bash
cd backend
npm run seed
```

This creates:
- **Admin user:** `admin@bridgeaitech.com` / `admin123`
- **Sample blog posts** (3 posts)
- **Sample case studies** (3 case studies)

### 3. Start Backend Server

```bash
cd backend
npm run dev
```

Server will start on `http://localhost:5000`

### 4. Start Frontend Development Server

```bash
cd frontend
npm start
```

Frontend will start on `http://localhost:3000`

## 📊 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/blog` | Get blog posts |
| GET | `/api/blog/:slug` | Get single blog post |
| GET | `/api/case-studies` | Get case studies |
| GET | `/api/case-studies/:slug` | Get single case study |

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| GET | `/api/auth/me` | Get current user |

### Admin Endpoints (Authentication Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contacts` | Get all contacts |
| PATCH | `/api/contacts/:id` | Update contact status |
| POST | `/api/blog` | Create blog post |
| PUT | `/api/blog/:id` | Update blog post |
| DELETE | `/api/blog/:id` | Delete blog post |
| POST | `/api/case-studies` | Create case study |
| PUT | `/api/case-studies/:id` | Update case study |
| DELETE | `/api/case-studies/:id` | Delete case study |

## 🎨 Frontend Components

### Pages
- **HomePage** - Landing page with hero section
- **WhatWeDoPage** - Services overview
- **UseCasesPage** - AI use cases
- **ApproachPage** - Implementation approach
- **TechnologyPage** - Technology stack
- **SecurityPage** - Security & compliance
- **ContactPage** - Contact form
- **CaseStudiesPage** - Case studies listing
- **CaseStudyDetail** - Individual case study
- **BlogPage** - Blog posts listing
- **BlogDetail** - Individual blog post
- **LoginPage** - Admin authentication
- **AdminDashboard** - Admin panel

### Components
- **Navigation** - Site navigation with mobile menu
- **Footer** - Site footer with links
- **Chatbot** - Interactive AI assistant

## 🛠️ Development

### Backend Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
```

### Frontend Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test          # Run tests
```

## 🔐 Security Features

- **JWT Authentication** - Secure user sessions
- **Role-based Access Control** - Admin, editor, viewer roles
- **Rate Limiting** - Prevent API abuse
- **CORS Protection** - Cross-origin request security
- **Helmet.js** - Security headers
- **Input Validation** - Express-validator & Joi
- **Password Hashing** - bcryptjs

## 📧 Email Integration

The application includes email functionality for:
- Contact form notifications
- User confirmation emails
- Admin alerts

Configure SMTP settings in `.env` file.

## 🚀 Production Deployment

### Environment Variables

Ensure these are set in production:

```env
NODE_ENV=production
JWT_SECRET=secure-random-string
MONGODB_URI=mongodb://production-server/bridgeai
FRONTEND_URL=https://yourdomain.com
```

### Build Frontend

```bash
cd frontend
npm run build
```

### Start Backend

```bash
cd backend
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email hello@bridgeaitech.com or create an issue in the repository.