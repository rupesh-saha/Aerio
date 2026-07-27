# Aerio - Premium Smart Air Purification

**Live Site URL:** [https://aerio-air.vercel.app/](https://aerio-air.vercel.app/)

## 📖 Overview

Aerio is a modern, high-end e-commerce platform for smart air purifiers. Built to offer a seamless and luxurious shopping experience, the application features smooth scroll animations, immersive 3D-like parallax interactions, and a fully functional AI-powered shopping assistant. From dynamic product browsing to an intelligent Home Strategy planner that analyzes your living space, Aerio sets a new standard for smart home retail.

## ✨ Core Features

* **AI Concierge & Home Strategy:** Integrated Groq-powered AI shopping assistant that answers questions, analyzes room sizes, and generates tailored product recommendations.
* **Immersive Premium UI:** High-performance animations and scroll-driven interactions built with GSAP and Framer Motion, offering an editorial, luxury aesthetic.
* **Full E-Commerce Flow:** Robust cart management, product shelves, dynamic shop pages, and detail views.
* **Secure Authentication:** User accounts and session management handled natively via BetterAuth and a MongoDB backend adapter.
* **Performance Optimized:** Statically generated and server-rendered routes with Next.js App Router for optimal SEO and instantaneous load times.

## 🛠️ Technology Stack

* **Frontend:** Next.js (App Router), Tailwind CSS v4, Lucide React
* **Animations:** GSAP (ScrollTrigger), Framer Motion, Lenis (Smooth Scrolling), React Three Fiber
* **Backend:** Node.js API Routes, MongoDB
* **Authentication:** BetterAuth
* **AI Integration:** Next.js AI SDK, Groq (Llama-3.3-70b-versatile)

## 📦 Dependencies

```
next
react
react-dom
tailwindcss
gsap
framer-motion
lenis
three
@react-three/fiber
@react-three/drei
better-auth
mongodb
ai
@ai-sdk/openai
lucide-react
zod
```

## 🚀 Getting Started Locally

1. Clone the repo

   ```bash
   git clone https://github.com/rupesh-saha/Aerio.git
   cd Aerio
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables — create a `.env` file in the root:

   ```env
   BETTER_AUTH_SECRET=your_auth_secret_here
   BETTER_AUTH_URL=http://localhost:3000
   AERIO_DB_URI=your_mongodb_connection_string
   GROQ_API_KEY=your_groq_api_key
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

4. Run the dev server

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔗 Links

* **Live Site:** [https://aerio-air.vercel.app/](https://aerio-air.vercel.app/)
