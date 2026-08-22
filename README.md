# SupportAI - Multi-Tenant AI Customer Support SaaS

SupportAI is a production-ready, multi-tenant AI-powered customer support platform. It enables SaaS founders, businesses, and agencies to easily generate and embed a lightweight, customizable AI chatbot widget on any external website with a single script tag—similar to Intercom, Crisp, or Tidio.

---

## Key Features

- **AI-Powered Automated Support:** Uses Google Gemini API to deliver instant, context-aware responses to customer queries.
- **Multi-Tenant Architecture:** Built to support multiple organizations, domains, and users seamlessly.
- **Embeddable Chat Widget:** Generates a lightweight script tag that can be integrated into any frontend framework (React, Vue, HTML, Shopify, WordPress).
- **Enterprise Auth & Orgs:** Authentication and multi-organization management powered by Scalekit.
- **Centralized Admin Dashboard:** Real-time settings, customization options, chat history logs, and user management.
- **Modern & Responsive UI:** Fully accessible, ultra-responsive user interface built with Next.js App Router.
- **Production Deployment:** Optimized for zero-downtime serverless deployment on Vercel.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Database:** MongoDB via Mongoose
- **Authentication & Orgs:** Scalekit
- **AI Integration:** Google Gemini API
- **Deployment:** Vercel
- **Language:** TypeScript / JavaScript

---

## Quick Start & Local Setup

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/support-ai.git](https://github.com/your-username/support-ai.git)
cd support-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Setup

Create a `.env.local` file in the root directory and add the following keys:

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# MongoDB Database
MONGODB_URI=your_mongodb_connection_string

# Scalekit Auth & Organization Config
SCALEKIT_ENV_URL=your_scalekit_env_url
SCALEKIT_CLIENT_ID=your_scalekit_client_id
SCALEKIT_CLIENT_SECRET=your_scalekit_client_secret

# AI Engine
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to view the application.

---

## How to Embed the Chatbot

Businesses can integrate the chatbot into their website by pasting this single snippet into their website's `<head>` or `<body>`:

```html
<!-- SupportAI Chatbot Script -->
<script 
  src="[https://support-ai-nine-kappa.vercel.app/script.js](https://support-ai-nine-kappa.vercel.app/script.js)" 
  data-org-id="YOUR_ORGANIZATION_ID">
</script>
```

---
