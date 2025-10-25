// seed.js - Database Seeder
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bridgeai', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Import schemas (same as in server.js)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: { type: Date, default: Date.now }
});

const blogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  author: String,
  category: String,
  tags: [String],
  featured: Boolean,
  published: Boolean,
  publishedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

const caseStudySchema = new mongoose.Schema({
  title: String,
  slug: String,
  company: String,
  industry: String,
  challenge: String,
  solution: String,
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
  featured: Boolean,
  published: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const BlogPost = mongoose.model('BlogPost', blogSchema);
const CaseStudy = mongoose.model('CaseStudy', caseStudySchema);

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await BlogPost.deleteMany({});
    await CaseStudy.deleteMany({});

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@bridgeaitech.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('✅ Admin user created');

    // Seed blog posts
    const blogPosts = [
      {
        title: 'Understanding AI Agents and RAG Systems',
        slug: 'understanding-ai-agents-rag-systems',
        excerpt: 'A comprehensive guide to AI agents and Retrieval-Augmented Generation systems for enterprise deployment.',
        content: `
          <h2>What are AI Agents?</h2>
          <p>AI agents are autonomous systems that can perceive their environment, make decisions, and take actions to achieve specific goals. Unlike simple chatbots, AI agents can:</p>
          <ul>
            <li>Execute complex multi-step workflows</li>
            <li>Integrate with multiple systems and APIs</li>
            <li>Make decisions based on context and data</li>
            <li>Learn and improve over time</li>
          </ul>

          <h2>RAG Systems Explained</h2>
          <p>Retrieval-Augmented Generation (RAG) combines the power of large language models with your organization's specific data. This approach enables:</p>
          <ul>
            <li>Accurate, context-aware responses using your data</li>
            <li>Reduced hallucinations and improved reliability</li>
            <li>Integration with existing knowledge bases</li>
            <li>Compliance with data governance requirements</li>
          </ul>

          <h2>Enterprise Deployment Considerations</h2>
          <p>When deploying AI agents and RAG systems in enterprise environments, consider:</p>
          <ul>
            <li><strong>Security:</strong> Data encryption, access controls, and audit logging</li>
            <li><strong>Infrastructure:</strong> Azure, GCP, or on-premises deployment options</li>
            <li><strong>Integration:</strong> Seamless connection with existing systems</li>
            <li><strong>Governance:</strong> Content controls, approval workflows, and monitoring</li>
          </ul>

          <h2>Getting Started</h2>
          <p>Our approach focuses on practical implementation with measurable outcomes. Contact us to discuss your specific use cases and infrastructure requirements.</p>
        `,
        author: 'BridgeAI Tech Team',
        category: 'AI Technology',
        tags: ['AI Agents', 'RAG', 'Enterprise AI'],
        featured: true,
        published: true,
        publishedAt: new Date('2025-10-15')
      },
      {
        title: 'Deploying AI on Azure vs GCP: What You Need to Know',
        slug: 'deploying-ai-azure-gcp-comparison',
        excerpt: 'Compare cloud platforms for AI deployment and choose the best option for your organization.',
        content: `
          <h2>Azure AI Services</h2>
          <p>Microsoft Azure offers comprehensive AI services with strong enterprise integration:</p>
          <ul>
            <li><strong>Azure OpenAI Service:</strong> Enterprise-grade GPT models</li>
            <li><strong>Cognitive Services:</strong> Pre-built AI capabilities</li>
            <li><strong>Machine Learning Studio:</strong> Complete MLOps platform</li>
            <li><strong>Bot Framework:</strong> Conversational AI development</li>
          </ul>

          <h2>Google Cloud Platform AI</h2>
          <p>GCP provides powerful AI/ML services with advanced research capabilities:</p>
          <ul>
            <li><strong>Vertex AI:</strong> Unified ML platform</li>
            <li><strong>PaLM API:</strong> Advanced language models</li>
            <li><strong>AutoML:</strong> No-code machine learning</li>
            <li><strong>Dialogflow:</strong> Conversational interfaces</li>
          </ul>

          <h2>Key Considerations</h2>
          <p>When choosing between Azure and GCP for AI deployment:</p>
          <ul>
            <li><strong>Integration:</strong> Azure integrates better with Microsoft ecosystem</li>
            <li><strong>Innovation:</strong> GCP often leads in AI research and capabilities</li>
            <li><strong>Compliance:</strong> Both offer enterprise-grade security and compliance</li>
            <li><strong>Pricing:</strong> Cost models vary based on usage patterns</li>
          </ul>
        `,
        author: 'BridgeAI Tech Team',
        category: 'Cloud Infrastructure',
        tags: ['Azure', 'GCP', 'Cloud AI', 'Deployment'],
        featured: false,
        published: true,
        publishedAt: new Date('2025-10-10')
      },
      {
        title: 'ROI Measurement for Enterprise AI Initiatives',
        slug: 'roi-measurement-enterprise-ai',
        excerpt: 'Learn how to measure and demonstrate return on investment for your AI projects.',
        content: `
          <h2>Defining Success Metrics</h2>
          <p>Successful AI implementations require clear, measurable outcomes:</p>
          <ul>
            <li>Cost savings from automation</li>
            <li>Revenue increase from improved processes</li>
            <li>Time savings and productivity gains</li>
            <li>Quality improvements and error reduction</li>
          </ul>

          <h2>Common ROI Frameworks</h2>
          <p>Use these frameworks to calculate AI ROI:</p>
          <ul>
            <li><strong>Net Present Value (NPV):</strong> Long-term value assessment</li>
            <li><strong>Payback Period:</strong> Time to recoup investment</li>
            <li><strong>Total Cost of Ownership (TCO):</strong> Complete cost analysis</li>
            <li><strong>Value Creation Metrics:</strong> Business impact measurement</li>
          </ul>

          <h2>Best Practices</h2>
          <p>Ensure accurate ROI measurement:</p>
          <ul>
            <li>Establish baseline metrics before implementation</li>
            <li>Track both quantitative and qualitative benefits</li>
            <li>Account for implementation and maintenance costs</li>
            <li>Regular review and adjustment of success criteria</li>
          </ul>
        `,
        author: 'BridgeAI Tech Team',
        category: 'Business Strategy',
        tags: ['ROI', 'Business Value', 'Metrics', 'Strategy'],
        featured: false,
        published: true,
        publishedAt: new Date('2025-10-05')
      }
    ];

    for (const post of blogPosts) {
      await BlogPost.create(post);
    }
    console.log('✅ Blog posts created');

    // Seed case studies
    const caseStudies = [
      {
        title: 'AI-Powered Sales Intelligence Platform',
        slug: 'ai-sales-intelligence-platform',
        company: 'TechCorp Solutions',
        industry: 'Technology Services',
        challenge: 'Sales team struggled with manual research and qualification of leads, spending 60% of time on administrative tasks rather than selling.',
        solution: 'Implemented AI agents for automated account research, lead scoring, and proposal generation integrated with existing CRM system.',
        results: [
          'Reduced lead qualification time by 75%',
          'Increased proposal win rate by 40%',
          'Improved sales team productivity by 300%',
          'Generated $2.3M additional revenue in first year'
        ],
        metrics: {
          metric1: { label: 'Time Saved', value: '75%' },
          metric2: { label: 'Win Rate Increase', value: '40%' },
          metric3: { label: 'ROI', value: '340%' }
        },
        testimonial: {
          quote: 'BridgeAI transformed our sales process. Our team now focuses on high-value activities while AI handles the research and documentation.',
          author: 'Sarah Johnson',
          role: 'VP of Sales, TechCorp Solutions'
        },
        featured: true,
        published: true
      },
      {
        title: 'Intelligent Document Processing System',
        slug: 'intelligent-document-processing',
        company: 'FinanceFirst Bank',
        industry: 'Financial Services',
        challenge: 'Manual processing of loan applications and compliance documents created bottlenecks and compliance risks.',
        solution: 'Deployed RAG system for automated document analysis, risk assessment, and compliance checking with human oversight.',
        results: [
          'Reduced document processing time by 85%',
          'Improved compliance accuracy by 95%',
          'Decreased operational costs by $1.8M annually',
          'Enhanced customer satisfaction scores by 60%'
        ],
        metrics: {
          metric1: { label: 'Processing Time', value: '-85%' },
          metric2: { label: 'Cost Savings', value: '$1.8M' },
          metric3: { label: 'Accuracy', value: '95%' }
        },
        testimonial: {
          quote: 'The AI system handles complex document analysis while ensuring we meet all regulatory requirements. It\'s been a game-changer.',
          author: 'Michael Chen',
          role: 'Chief Operations Officer, FinanceFirst Bank'
        },
        featured: true,
        published: true
      },
      {
        title: 'Marketing Automation and Personalization',
        slug: 'marketing-automation-personalization',
        company: 'RetailMax Inc',
        industry: 'E-commerce',
        challenge: 'Generic marketing campaigns resulted in low engagement rates and poor conversion across diverse customer segments.',
        solution: 'Built AI-powered marketing platform for content personalization, campaign optimization, and customer journey automation.',
        results: [
          'Increased email engagement by 180%',
          'Improved conversion rates by 65%',
          'Reduced marketing costs by 45%',
          'Generated 250% increase in marketing ROI'
        ],
        metrics: {
          metric1: { label: 'Engagement', value: '+180%' },
          metric2: { label: 'Conversions', value: '+65%' },
          metric3: { label: 'Marketing ROI', value: '+250%' }
        },
        testimonial: {
          quote: 'Our marketing is now truly personalized at scale. The AI understands our customers better than we ever could manually.',
          author: 'Lisa Rodriguez',
          role: 'CMO, RetailMax Inc'
        },
        featured: false,
        published: true
      }
    ];

    for (const study of caseStudies) {
      await CaseStudy.create(study);
    }
    console.log('✅ Case studies created');

    console.log('🎉 Database seeding completed successfully!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`- Admin user: admin@bridgeaitech.com / admin123`);
    console.log(`- Blog posts: ${blogPosts.length} created`);
    console.log(`- Case studies: ${caseStudies.length} created`);
    console.log('');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
}

// Run the seeder
seedDatabase();