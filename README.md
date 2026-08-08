# Premium IT Portfolio

A personal portfolio website for Rohan Garje built with Node.js, Express, and EJS.

## Overview

This repository contains a portfolio website with:
- dynamic landing page rendering via `EJS`
- portfolio project detail pages
- blog and admin dashboard views
- contact form submission handling
- optional MongoDB persistence with a local JSON fallback
- security middleware for HTTP headers, rate limiting, and input sanitization

## Features

- Express server with `EJS` templates
- `/` home page and project detail pages
- `/blog` page for articles and technical write-ups
- `/admin` dashboard for reviewing contact submissions
- contact form endpoint: `POST /contact`
- MongoDB connection fallback to local JSON storage when `MONGODB_URI` is unavailable
- auto port retry when the default port is busy

## Tech stack

- Node.js
- Express
- EJS templates
- MongoDB / Mongoose
- Nodemailer
- Helmet, CORS, cookie-parser
- Rate limiting middleware

## Getting started

### Prerequisites

- Node.js 18+ recommended
- npm
- Optional: MongoDB for persistent contact storage

### Install dependencies

```bash
npm install
```

### Configure environment

Copy the example environment file and update values:

```bash
copy .env.example .env
```

Set your SMTP and MongoDB values in `.env`.

### Run locally

```bash
npm start
```

For local development with auto-reload:

```bash
npm run dev
```

The app will start on `http://localhost:3000` by default, or the next available port if 3000 is already in use.

## Environment variables

The app reads configuration from `.env`:

- `PORT` — server port
- `NODE_ENV` — environment mode
- `MONGODB_URI` — MongoDB connection string
- `EMAIL_HOST` — SMTP host
- `EMAIL_PORT` — SMTP port
- `EMAIL_SECURE` — use TLS/SSL for SMTP
- `EMAIL_USER` — SMTP username
- `EMAIL_PASS` — SMTP password
- `CONTACT_RECEIVER` — destination email for contact messages
- `SESSION_SECRET` — cookie/session secret

## Admin dashboard

Visit `/admin` in a browser.

The admin console uses a simple query-based authorization flow in this project. To authorize manually, request `/admin?password=admin123` and then the session cookie is set for 15 minutes.

## Project structure

- `server.js` — main application entry point
- `routes/` — Express route definitions
- `controllers/` — request handlers and page rendering logic
- `config/` — database and profile configuration
- `middlewares/` — security middleware and input sanitization
- `models/` — Mongoose schemas for contact and visitor data
- `utils/` — fallback JSON storage and email helper
- `views/` — EJS templates
- `public/` — static assets

## Deployment

This app can be deployed to any Node.js hosting platform that supports Express applications. Popular choices include:

- Vercel (with a custom server configuration)
- Render
- Railway
- Heroku
- DigitalOcean App Platform

Make sure your production environment includes:

- `NODE_ENV=production`
- a valid `MONGODB_URI` if you want persistent storage
- SMTP credentials for email delivery
- a secure `SESSION_SECRET`

## Notes

- If `MONGODB_URI` is not set or the connection fails, the app falls back to local JSON persistence for visitors and contact submissions.
- The admin authentication implemented here is minimal and intended for portfolio/demo use only.

## License

MIT
