const profileData = require('../config/profile');
const mailer = require('../utils/mailer');
const jsonDb = require('../utils/jsonDb');
const { isMongoConnected } = require('../config/db');
const Contact = require('../models/Contact');
const Visitor = require('../models/Visitor');

// Render the main landing portfolio page
async function getHome(req, res) {
  let visitorCount = 105;

  try {
    if (isMongoConnected()) {
      // Find or create global counter
      let visitorDoc = await Visitor.findOne({ key: 'global_counter' });
      if (!visitorDoc) {
        visitorDoc = new Visitor({ key: 'global_counter', count: 105 });
      }
      visitorDoc.count += 1;
      visitorDoc.updatedAt = new Date();
      await visitorDoc.save();
      visitorCount = visitorDoc.count;
    } else {
      // Use local JSON storage fallback
      visitorCount = jsonDb.incrementVisitorCount();
    }
  } catch (error) {
    console.error('Error tracking visitor counter:', error.message);
    visitorCount = jsonDb.getVisitorCount();
  }

  // Load cookies to read theme customization state (dark/light, neon color accent)
  const theme = req.cookies?.theme || 'dark';
  const accentColor = req.cookies?.accentColor || '#6366f1'; // Default Indigo

  res.render('pages/index', {
    profile: profileData,
    visitorCount,
    theme,
    accentColor,
    pageTitle: 'Rohan Garje | Premium Tech Portfolio'
  });
}

// Handle contact form submission
async function postContact(req, res) {
  const { name, email, subject, message } = req.body;

  // Serverside Validation
  if (!name || name.trim() === '') {
    return res.status(400).json({ success: false, message: 'Please enter your name.' });
  }
  if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }
  if (!message || message.trim() === '') {
    return res.status(400).json({ success: false, message: 'Please write a message.' });
  }

  const contactPackage = { name, email, subject: subject || 'No Subject', message };

  try {
    let savedDoc;
    if (isMongoConnected()) {
      savedDoc = await Contact.create(contactPackage);
    } else {
      savedDoc = jsonDb.saveContact(contactPackage);
    }

    // Attempt to dispatch email notifications asynchronously
    mailer.sendContactEmail(contactPackage).catch(err => {
      console.error('Asynchronous email trigger failed:', err.message);
    });

    return res.status(200).json({
      success: true,
      message: 'Connection successful! Your message has been logged and Rohan has been paged.',
      data: savedDoc
    });
  } catch (error) {
    console.error('Contact submit error:', error);
    return res.status(500).json({
      success: false,
      message: 'A database error occurred. Your message was not logged.'
    });
  }
}

// Fetch project detailed review page
function getProjectDetail(req, res) {
  const projectId = req.params.id;
  const project = profileData.projects.find(p => p.id === projectId);

  if (!project) {
    return res.status(404).render('pages/404', {
      pageTitle: 'Project Not Found',
      message: 'The requested project could not be found or does not exist.'
    });
  }

  res.render('pages/project-details', {
    project,
    profile: profileData,
    pageTitle: `${project.title} - Detailed Review`
  });
}

// Render dynamic tech blog page
function getBlog(req, res) {
  res.render('pages/blog', {
    profile: profileData,
    pageTitle: 'Insights & Writeups - Rohan Garje'
  });
}

// Render private admin logs console
async function getAdmin(req, res) {
  // Check simple query authorization
  const authCookie = req.cookies?.adminAuth;
  const authQuery = req.query?.password;

  let isAuthorized = false;
  if (authCookie === 'authorized' || authQuery === 'admin123') {
    isAuthorized = true;
    if (authQuery === 'admin123') {
      res.cookie('adminAuth', 'authorized', { maxAge: 900000, httpOnly: true }); // 15 mins
    }
  }

  let submissions = [];
  let databaseType = 'JSON Local Database';

  if (isAuthorized) {
    try {
      if (isMongoConnected()) {
        submissions = await Contact.find().sort({ createdAt: -1 });
        databaseType = 'MongoDB Cloud Database';
      } else {
        submissions = jsonDb.getContacts().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    } catch (err) {
      console.error('Error fetching submissions for admin: ', err);
    }
  }

  res.render('pages/admin', {
    profile: profileData,
    isAuthorized,
    submissions,
    databaseType,
    pageTitle: 'Admin Cockpit Console'
  });
}

// Clear authorization for admin dashboard
function getLogoutAdmin(req, res) {
  res.clearCookie('adminAuth');
  res.redirect('/admin');
}

module.exports = {
  getHome,
  postContact,
  getProjectDetail,
  getBlog,
  getAdmin,
  getLogoutAdmin
};
