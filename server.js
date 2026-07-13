const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Config and setup imports
dotenv.config();
const { connectDB } = require('./config/db');
const { helmetConfig, generalLimiter } = require('./middlewares/security');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup database connection (Mongoose/MongoDB)
connectDB().then(success => {
  if (success) {
    console.log('✅ Connection to database cluster optimized.');
  } else {
    console.log('💡 Portfolio will store logs using fallback JSON databases.');
  }
});

// Setting views and template render engines
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Core middleware bindings
app.use(helmetConfig); // Custom Content-Security-Policy to protect against script injections
app.use(cors());
app.use(generalLimiter); // Protect overall routing structures
app.use(cookieParser(process.env.SESSION_SECRET || 'secret_secret'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting static files paths
app.use(express.static(path.join(__dirname, 'public')));

// Integrate project routes
app.use('/', routes);

// Custom 404 Route handler
app.use((req, res, next) => {
  res.status(404).render('pages/404', {
    pageTitle: 'Page Not Found - 404',
    message: 'The page you are looking for has been moved or does not exist.'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled runtime error:', err.stack);
  res.status(500).render('pages/404', {
    pageTitle: 'Server Error - 500',
    message: 'An unexpected server error occurred. Please try again later.'
  });
});

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const MAX_PORT_TRIES = 10;

function startServer(portToTry) {
  const server = app.listen(portToTry, () => {
    console.log(`🚀 Premium Portfolio engine running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${portToTry}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${portToTry} is already in use.`);
      if (portToTry < DEFAULT_PORT + MAX_PORT_TRIES) {
        const nextPort = portToTry + 1;
        console.log(`🔁 Trying port ${nextPort} instead...`);
        startServer(nextPort);
      } else {
        console.error(`❌ Unable to bind to any port between ${DEFAULT_PORT} and ${DEFAULT_PORT + MAX_PORT_TRIES}.`);
        process.exit(1);
      }
    } else {
      console.error('Unhandled server error:', err);
      process.exit(1);
    }
  });
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

startServer(DEFAULT_PORT);
