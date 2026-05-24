import { Service, Project, Testimonial, ProcessStep, StatItem, TrustIndicator } from "./types";

export const TRUST_INDICATORS: TrustIndicator[] = [
  {
    id: "ti-fast",
    title: "Ultra-Fast Delivery",
    description: "Launch in record time. Advanced developer optimization guarantees rapid turnaround without cutting quality corners.",
    iconName: "Zap"
  },
  {
    id: "ti-responsive",
    title: "Pixel-Perfect Responsive UI",
    description: "Gorgeously fluid layouts designed to provide flawless experiences across mobile, tablet, and desktop displays.",
    iconName: "Laptop"
  },
  {
    id: "ti-seo",
    title: "SEO Meta-Optimized",
    description: "Engineered from the ground up for high search engine visibility, structured data schemas, and fast indexation.",
    iconName: "Search"
  },
  {
    id: "ti-admin",
    title: "Sleek Admin Dashboards",
    description: "Stay in control with easy-to-use, powerful content management and analytics dashboards tailored specifically for you.",
    iconName: "Sliders"
  },
  {
    id: "ti-secure",
    title: "Bank-Grade Security",
    description: "Protected against common attack vectors. Implemented through SSL, safe headers, and locked-down database rules.",
    iconName: "ShieldCheck"
  },
  {
    id: "ti-uiux",
    title: "Modern Premium UI/UX",
    description: "Stunning Swiss-aligned minimalist typography, modern container grid flows, and smooth fluid animations.",
    iconName: "Cpu"
  },
  {
    id: "ti-ai",
    title: "AI Integrated Solutions",
    description: "Supercharge your software with generative autocomplete, custom chat assistants, smart analysis, and workflow speedups.",
    iconName: "Sparkles"
  }
];

export const SERVICES: Service[] = [
  {
    id: "srv-ecommerce",
    title: "Ecommerce Website Development",
    description: "Build high-converting storefronts with fluid checkout streams, live payment gateway processing, custom product catalogs, and custom dynamic animations.",
    category: "Business & Retail",
    iconName: "ShoppingCart",
    features: [
      "Dynamic Product Filtering & Zoom",
      "One-Page Fluid Checkout Flow",
      "Full CMS for Inventory & Sales",
      "Customer Cart & Order Retention",
      "Automated Tax & Shipping Tables"
    ],
    priceStart: "₹30,000 – ₹40,000+",
    deliveryTime: "2-3 Weeks"
  },
  {
    id: "srv-coaching",
    title: "Coaching Institute Websites",
    description: "Premium platforms tailored for educators and coaching systems. Includes easy course listings, class tables, inquiry funnels, and student signup cards.",
    category: "Education",
    iconName: "GraduationCap",
    features: [
      "Intuitive Syllabus & Course View",
      "Dynamic Timetables & Schedules",
      "Interactive Multi-Step Lead Forms",
      "Frictionless Payment Collection",
      "FAQ Accordions & Secure Resources"
    ],
    priceStart: "₹20,000 – ₹35,000",
    deliveryTime: "1-2 Weeks"
  },
  {
    id: "srv-portfolio",
    title: "Personal Portfolio Websites",
    description: "Stand out with a high-end, visual-forward personal brand design. High-fidelity glassmorphism elements, micro-interactions, and conversion-ready CTA layouts.",
    category: "Branding",
    iconName: "User",
    features: [
      "Bespoke Typographic System",
      "Framer Motion Entrance Effects",
      "Case Study Detail Overlays",
      "Interactive Tech Stack Meters",
      "Integrated Inquiry Funnels"
    ],
    priceStart: "₹20,000 – ₹30,000",
    deliveryTime: "4-7 Days"
  },
  {
    id: "srv-landing",
    title: "High-Converting Landing Pages",
    description: "Single page copy and visual layouts engineered meticulously to drive registrations, signups, or instant product purchases.",
    category: "Marketing",
    iconName: "Target",
    features: [
      "A/B Tested Modular Section Hierarchies",
      "Sticky Visual Signup Forms",
      "Social Proof Slider Modules",
      "Optimized Above-The-Fold Copy Focus",
      "Ultra-Fast Load Speeds (<0.5s)"
    ],
    priceStart: "₹15,000 – ₹25,000",
    deliveryTime: "3-5 Days"
  },
  {
    id: "srv-dashboard",
    title: "Custom Admin Dashboards",
    description: "Control your operations with precision. Interactive analytical charts, sales metrics reporting, user permissions, and custom search filters.",
    category: "Management",
    iconName: "Layout",
    features: [
      "Real-Time Data Visualization",
      "Subtle Interactive Grid Controls",
      "Multi-Role Permission Systems",
      "CSV/Excel Data Downloaders",
      "Audit Trail Action Logging"
    ],
    priceStart: "₹40,000 – ₹80,000+",
    deliveryTime: "3-4 Weeks"
  },
  {
    id: "srv-ai",
    title: "AI Integrated Websites",
    description: "Unleash custom generative AI within your product. Connect natural language models, visual render generators, smart analytics, and bots.",
    category: "Advanced",
    iconName: "Sparkles",
    features: [
      "Gemini/GPT Large Language Model Hooks",
      "Interactive Natural Chat Widgets",
      "Auto-Categorization & Summarizing",
      "Smart Content Sentiment Analyser",
      "Custom Assistant Personalities"
    ],
    priceStart: "₹45,000 – ₹1,00,000+",
    deliveryTime: "3-4 Weeks"
  },
  {
    id: "srv-redesign",
    title: "Complete Website Redesign",
    description: "Transform outdated, slow layouts into modern, lightning-fast digital powerhouses aligned perfectly with current 2026 aesthetics.",
    category: "Revamp",
    iconName: "RefreshCw",
    features: [
      "Legacy Codebase Performance Audits",
      "Modern Tailwind CSS Layout Styling",
      "Responsive Fluid Grid Architecture",
      "Interactive Component Facelifts",
      "SEO URL Retention Safe-Guards"
    ],
    priceStart: "₹15,000 – ₹30,000",
    deliveryTime: "1-2 Weeks"
  },
  {
    id: "srv-payment",
    title: "Payment Gateway Integration",
    description: "Implement reliable, high-security transaction frameworks like Stripe, Razorpay, or PayPal for digital checkout streams.",
    category: "Finance",
    iconName: "CreditCard",
    features: [
      "Secure Webhook Success Managers",
      "Automated PDF Invoices Dispatcher",
      "Transparent Error Resolution States",
      "Subscription / Recurring Billing Layouts",
      "Full Transaction Logging Dashboards"
    ],
    priceStart: "₹10,000 – ₹15,000",
    deliveryTime: "3-5 Days"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-ecommerce",
    title: "Apex Horizon E-Store",
    category: "Ecommerce Store",
    description: "A premium direct-to-consumer athletic wear shop sporting an dynamic multi-category grid, interactive card cart slides, coupon systems, and optimized checkout pages.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Stripe API", "Firebase Store"],
    features: [
      "Animated 'Sliding Cart Drawer' with instant count state updates",
      "Advanced product filtration (size, color, prices, sort values)",
      "Adaptive checkout card validation & promo trigger logic",
      "Dedicated Admin panel for inventory updates and order counts"
    ],
    demoUrl: "https://shop.quantumwebcode.com",
    colorScheme: {
      bg: "bg-[#EEF2F6]",
      text: "text-blue-600",
      border: "border-blue-100",
      accent: "from-blue-600 to-indigo-600",
      accentGlow: "bg-blue-400/20"
    }
  },
  {
    id: "proj-coaching",
    title: "Summit Academy Platform",
    category: "Coaching Website",
    description: "An elegant portal for a high-end test preparation institute featuring a course explorer, interactive class booking calendar, syllabus downloads, and teacher profiles.",
    technologies: ["React", "Lucide Icons", "Tailwind CSS", "Firebase Auth", "Firestore DB"],
    features: [
      "Dynamic interactive course search catalog with custom filters",
      "Step-by-step syllabus inquiry flow saving leads immediately",
      "Modern interactive student review slider with user ratings",
      "High performance static landing pages optimized for Google Lighthouse"
    ],
    demoUrl: "https://summit.quantumwebcode.com",
    colorScheme: {
      bg: "bg-[#EEF7F4]",
      text: "text-emerald-600",
      border: "border-emerald-100",
      accent: "from-emerald-500 to-teal-600",
      accentGlow: "bg-emerald-400/20"
    }
  },
  {
    id: "proj-restaurant",
    title: "La Couronne Gourmet",
    category: "Restaurant Website",
    description: "A digital flagship for an upscale restaurant showcasing a live menu book, customized booking tables, elegant gallery layouts, and event managers.",
    technologies: ["HTML5", "CSS Grid", "React", "motion", "Lucide Icons"],
    features: [
      "Sleek visual-first digital menu with high-resolution imagery",
      "Custom reservation calendar with instant email notifications",
      "Micro-animations on menu category toggling",
      "Complete localization with dual language settings"
    ],
    demoUrl: "https://lacouronne.quantumwebcode.com",
    colorScheme: {
      bg: "bg-[#FDF8EE]",
      text: "text-amber-600",
      border: "border-amber-100",
      accent: "from-amber-500 to-orange-600",
      accentGlow: "bg-amber-400/20"
    }
  },
  {
    id: "proj-gym",
    title: "Pulse Fitness Studio",
    category: "Gym Website",
    description: "Energetic digital home for a high-performance fitness center featuring live trainer timetables, membership plan grids, student dashboards, and shop elements.",
    technologies: ["React", "Framer Motion", "Tailwind CSS", "Lucide Icons"],
    features: [
      "Interactive horizontal schedule grid showing class times",
      "Responsive BMI dynamic calculator widget on-page",
      "Pricing tier comparison grid with floating CTA buttons",
      "Trainer profile slides with social follow icons"
    ],
    demoUrl: "https://pulse.quantumwebcode.com",
    colorScheme: {
      bg: "bg-[#FEF1F3]",
      text: "text-rose-600",
      border: "border-rose-100",
      accent: "from-rose-500 to-red-600",
      accentGlow: "bg-rose-400/20"
    }
  },
  {
    id: "proj-realestate",
    title: "Elysian Estate Brokers",
    category: "Real Estate Website",
    description: "A luxury property showcase listing system with an interactive map, fluid slider controls, filters, agent communication panels, and tour selectors.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Google Maps API", "Firebase DB"],
    features: [
      "Interactive map overlays plotting properties with styled pins",
      "High-end 3D visual carousel for luxury house viewings",
      "Multi-variable advanced property matchmaker selector",
      "Instant scheduling booking module for onsite realtors"
    ],
    demoUrl: "https://elysian.quantumwebcode.com",
    colorScheme: {
      bg: "bg-[#F3F1FC]",
      text: "text-violet-600",
      border: "border-violet-100",
      accent: "from-violet-500 to-indigo-600",
      accentGlow: "bg-violet-400/20"
    }
  },
  {
    id: "proj-saas",
    title: "Synapse AI Platform",
    category: "AI SaaS Website",
    description: "A premium software website showcasing generative AI engines with animated playground sliders, multi-tier pricing, documentation sidebars, and API builders.",
    technologies: ["React", "Framer Motion", "Tailwind CSS", "Recharts", "Lucide Icons"],
    features: [
      "Interactive prompt sandbox rendering simulated text and visual outputs",
      "Stunning SVG grid background animations mimicking neural networks",
      "Live analytics mock dashboard charting usage statistics",
      "Responsive modern system documentation side navigation panel"
    ],
    demoUrl: "https://synapse.quantumwebcode.com",
    colorScheme: {
      bg: "bg-[#F0F5FD]",
      text: "text-cyan-600",
      border: "border-cyan-100",
      accent: "from-cyan-500 to-blue-600",
      accentGlow: "bg-cyan-400/20"
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Vikram Malhotra",
    role: "Founder & CEO",
    company: "Malhotra Athletics Co.",
    review: "Amazing website quality and smooth communication from start to finish. The team at Quantum Web Code completely transformed our customer funnel, resulting in a 42% spike in store checkout conversions within weeks.",
    rating: 5
  },
  {
    id: "test-2",
    name: "Dr. Ananya Sharma",
    role: "Director of Education",
    company: "Apex Academy",
    review: "Professional UI design and fast delivery! Our brand coaching portal has never looked this sharp or worked so quickly on mobile devices. Students love the new schedule viewer.",
    rating: 5
  },
  {
    id: "test-3",
    name: "Chef Raymond Mercier",
    role: "Executive Head Chef",
    company: "La Couronne Group",
    review: "Highly recommended for modern business websites! We wanted a high-end digital agency layout that built client trust instantly, and this portfolio exceeded our standards. Absolute masterpiece.",
    rating: 5
  },
  {
    id: "test-4",
    name: "Elena Rostova",
    role: "Product Lead",
    company: "Synapse Labs",
    review: "The level of graphic consistency, custom framer-motion transitions, and micro-interactions was fantastic. Their responsiveness is unbeatable—they make building websites completely stress-free.",
    rating: 5
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Requirement Discussion",
    description: "We host a comprehensive launch session where we pinpoint your target customer, brand tone, visual expectations, and core feature goals.",
    duration: "1 - 2 Days",
    features: ["Target persona mapping", "Scope outlining & budgeting", "Competitor visual audit"]
  },
  {
    step: "02",
    title: "UI/UX Design",
    description: "We map high-fidelity visual system screens featuring responsive wireframes, tailored custom assets, polished typography pairings, and interaction animations preview.",
    duration: "3 - 5 Days",
    features: ["Glassmorphism layout drafts", "Color scheme pairing matrix", "Interactive prototype testing"]
  },
  {
    step: "03",
    title: "Development",
    description: "Your approved prototype is coded from scratch in modular React, using Tailwind CSS utility paths and fluid motion physics to guarantee sub-half-second load speeds.",
    duration: "5 - 10 Days",
    features: ["Component-based codebase structure", "Absolute SEO and structured semantics", "Interactive scroll bindings"]
  },
  {
    step: "04",
    title: "Rigorous Testing",
    description: "We test code responsiveness across over 20 devices, evaluate loading speeds via Lighthouse, secure forms against spam, and check cross-browser compliance.",
    duration: "2 - 3 Days",
    features: ["Multi-device cross checkout testing", "Page latency loading validation", "Spam & script security tests"]
  },
  {
    step: "05",
    title: "Polished Launch",
    description: "We safely publish your application to production servers, configure custom DNS profiles, handle metadata SEO caches, and hand over complete document training.",
    duration: "1 Day",
    features: ["Vercel / Cloud Run deployment", "Domain & DNS configuration setup", "Performance dashboard setup"]
  }
];

export const SKILL_CATEGORIES = [
  {
    id: "cat-core",
    title: "Core Programming",
    skills: [
      { name: "HTML & Semantic Markup", value: 95 },
      { name: "Modern CSS & Tailwind CSS", value: 98 },
      { name: "JavaScript (ES6+)", value: 94 }
    ]
  },
  {
    id: "cat-frameworks",
    title: "Frontend Engineering",
    skills: [
      { name: "React (Functional & Hooks)", value: 96 },
      { name: "Vite & Build Optimization", value: 92 },
      { name: "Framer Motion Animations", value: 95 }
    ]
  },
  {
    id: "cat-backend",
    title: "Backend & Server Services",
    skills: [
      { name: "Node.js & Express API Routes", value: 88 },
      { name: "Firebase (Firestore, Database, Auth)", value: 90 },
      { name: "Vercel & Netlify Deployments", value: 92 }
    ]
  }
];

export const STATISTICS: StatItem[] = [
  {
    id: "stat-projects",
    count: 124,
    label: "Projects Completed",
    suffix: "+",
    iconName: "FolderOpen"
  },
  {
    id: "stat-clients",
    count: 98,
    label: "Happy Clients",
    suffix: "+",
    iconName: "Users"
  },
  {
    id: "stat-delivered",
    count: 112,
    label: "Websites Delivered",
    suffix: "+",
    iconName: "Globe"
  },
  {
    id: "stat-experience",
    count: 6,
    label: "Years of Experience",
    suffix: "+",
    iconName: "Award"
  }
];
