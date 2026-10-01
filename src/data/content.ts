// ─── Vistaaram Content Data ─────────────────────────────────────
// All homepage copy in one place. Components import from here — zero hardcoded strings in JSX.

/* ────────────── Types ────────────── */

// HeroSlide type is defined below with the hero data

export interface USP {
  icon: string;       // emoji or icon name
  title: string;
  description: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  name: string;
  tagline: string;
  description: string;
  price: number;
  mrp: number;
  discount: string;
  images: ProductImage[];
  features: string[];
  cta: string;
  ctaLink: string;
  badge: string;
}

export interface HowToUseStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  image: string;
}

export interface ComparisonRow {
  feature: string;
  vistaaram: string;
  others: string;
}

export interface Ritual {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ComingSoonItem {
  name: string;
  description: string;
  image: string;
  features?: string[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface TickerItem {
  text: string;
  icon?: string;
}

/* ────────────── Ticker ────────────── */

export const tickerContent: TickerItem[] = [
  { text: "Free Shipping above ₹499", icon: "🚚" },
  { text: "Crafted in Devbhoomi", icon: "🛕" },
  { text: "100% Natural Origin", icon: "🌿" },
  { text: "Knowledge of 500+ Pandits", icon: "📿" },
];

/* ────────────── Navbar ────────────── */

export const navbarContent = {
  logo: "/images/logo.png",
  links: [
    { label: "Shop", href: "/product/natural-sambrani-hawan-cup" },
    { label: "Our Story", href: "/story" },
    { label: "Process", href: "/#process" },
    { label: "Rituals", href: "/#rituals" },
    { label: "Reviews", href: "/#testimonials" },
  ],
  whatsappLink: "https://wa.me/91XXXXXXXXXX",
  taglineSide: { line1: "A SMALL RITUAL", line2: "A BRIGHTER", line3: "TOMORROW" },
};

/* ────────────── Hero Slider ────────────── */

export interface HeroSlide {
  id: number;
  image: string;
  label: string;
  headline: string;
  subheadline: string;
  cta: string;
  ctaLink: string;
  ctaSecondary: string;
  ctaSecondaryLink: string;
  stats: { icon: string; value: string; label: string }[];
  bottomLeft: { line1: string; line2: string };
  bottomRight: { line1: string; line2: string; line3: string };
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/images/slide1.jpg",
    label: "FROM DEVBHOOMI, UTTARAKHAND",
    headline: "The Land of Gods,\nIn Your Home.",
    subheadline:
      "Natural Sambrani Hawan Cups — temple flowers & cow dung, blessed by 500+ pandits. Charcoal-free. Chemical-free.",
    cta: "ADD TO CART — ₹279",
    ctaLink: "/product/natural-sambrani-hawan-cup",
    ctaSecondary: "OUR PROCESS ↓",
    ctaSecondaryLink: "/#process",
    stats: [
      { icon: "⭐", value: "4.8", label: "" },
      { icon: "📦", value: "12", label: "Cups" },
      { icon: "🏔️", value: "", label: "Made in Uttarakhand" },
    ],
    bottomLeft: { line1: "ANCIENT TRADITIONS", line2: "A BRIGHTER TOMORROW" },
    bottomRight: { line1: "Same Sacred Mountains", line2: "Now in Your Home", line3: "" },
  },
  {
    id: 2,
    image: "/images/slide2.jpg",
    label: "BLESSED BY DEVBHOOMI PANDITS",
    headline: "500+ Pandits'\nSacred Wisdom.",
    subheadline:
      "Our formulations carry centuries of Vedic knowledge, passed down through generations of temple priests.",
    cta: "ADD TO CART — ₹279",
    ctaLink: "#product",
    ctaSecondary: "OUR STORY ↓",
    ctaSecondaryLink: "#story",
    stats: [
      { icon: "⭐", value: "4.8", label: "" },
      { icon: "📦", value: "12", label: "Cups" },
      { icon: "🏔️", value: "", label: "Made in Uttarakhand" },
    ],
    bottomLeft: { line1: "ANCIENT TRADITIONS", line2: "A BRIGHTER TOMORROW" },
    bottomRight: { line1: "Same Sacred Mountains", line2: "Now in Your Home", line3: "" },
  },
  {
    id: 3,
    image: "/images/slide3.jpg",
    label: "100% NATURAL, ZERO CHEMICALS",
    headline: "Zero Charcoal.\nPure Devotion.",
    subheadline:
      "Unlike conventional dhoop, our Sambrani Hawan Cup is 100% natural — just pure ingredients, nothing else.",
    cta: "ADD TO CART — ₹279",
    ctaLink: "#product",
    ctaSecondary: "SEE THE DIFFERENCE ↓",
    ctaSecondaryLink: "#comparison",
    stats: [
      { icon: "⭐", value: "4.8", label: "" },
      { icon: "📦", value: "12", label: "Cups" },
      { icon: "🏔️", value: "", label: "Made in Uttarakhand" },
    ],
    bottomLeft: { line1: "ANCIENT TRADITIONS", line2: "A BRIGHTER TOMORROW" },
    bottomRight: { line1: "Same Sacred Mountains", line2: "Now in Your Home", line3: "" },
  },
];

/* ────────────── Why Vistaaram (USPs) ────────────── */

export const whyVistaaramContent = {
  sectionTitle: "Why Vistaaram?",
  sectionSubtitle: "What makes our Sambrani truly sacred",
  usps: [
    {
      icon: "🏔️",
      title: "Born in Devbhoomi",
      description:
        "Crafted in Uttarakhand, the Land of Gods — where every ingredient is blessed by nature.",
    },
    {
      icon: "🙏",
      title: "500+ Pandits' Wisdom",
      description:
        "Formulated with knowledge passed down through generations of temple priests and Vedic scholars.",
    },
    {
      icon: "🌿",
      title: "100% Natural",
      description:
        "No charcoal, no chemicals, no synthetic fragrances. Just temple flowers, cow dung, and pure herbs.",
    },
    {
      icon: "🔥",
      title: "Perfect for Hawan",
      description:
        "Designed to burn cleanly and release a sacred fragrance that purifies your space.",
    },
  ] as USP[],
};

/* ────────────── Product PDP ────────────── */

export const productContent: Product = {
  name: "Natural Sambrani Hawan Cup",
  tagline: "Sacred Fragrance for Your Daily Rituals",
  description:
    "Handcrafted in Devbhoomi Uttarakhand using temple flowers, cow dung, and natural herbs. Each cup burns for 20-25 minutes, releasing a divine fragrance that purifies your home and elevates your spiritual practice. Completely free from charcoal, chemicals, and synthetic additives.",
  price: 279,
  mrp: 399,
  discount: "30% OFF",
  images: [
    { src: "/images/product/1.jpg", alt: "Sambrani Hawan Cup - Front View" },
    { src: "/images/product/2.jpg", alt: "Sambrani Hawan Cup - Burning" },
    { src: "/images/product/3.jpg", alt: "Sambrani Hawan Cup - Ingredients" },
    { src: "/images/product/4.jpg", alt: "Sambrani Hawan Cup - Packaging" },
    { src: "/images/product/5.jpg", alt: "Sambrani Hawan Cup - In Use" },
  ],
  features: [
    "12 cups per pack",
    "20-25 min burn time",
    "100% charcoal-free",
    "Chemical-free formula",
    "Temple flowers & cow dung",
    "Handcrafted in Uttarakhand",
  ],
  cta: "Add to Cart — ₹279",
  ctaLink: "#",
  badge: "Best Seller",
};

/* ────────────── How to Use ────────────── */

export const howToUseContent = {
  sectionTitle: "How to Use",
  sectionSubtitle: "Simple steps for a sacred experience",
  steps: [
    {
      step: 1,
      title: "Light the Cup",
      description: "Hold a flame to the edge of the Sambrani cup for 10-15 seconds until it catches.",
      icon: "🔥",
    },
    {
      step: 2,
      title: "Let It Glow",
      description: "Once lit, gently blow out the flame. The cup will begin to smolder and glow.",
      icon: "✨",
    },
    {
      step: 3,
      title: "Place Safely",
      description: "Set the cup on a heat-resistant surface or traditional holder.",
      icon: "🪔",
    },
    {
      step: 4,
      title: "Breathe & Pray",
      description: "Let the divine fragrance fill your space for 20-25 minutes of sacred ambiance.",
      icon: "🙏",
    },
  ] as HowToUseStep[],
};

/* ────────────── Process / Our Journey ────────────── */

export const processContent = {
  sectionTitle: "From Sacred Land to Your Home",
  sectionSubtitle: "Every cup carries the essence of Devbhoomi",
  steps: [
    {
      step: 1,
      title: "Temple Flower Collection",
      description:
        "We collect flowers offered at temples across Uttarakhand, giving them a second sacred purpose.",
      image: "/images/process-1.jpg",
    },
    {
      step: 2,
      title: "Traditional Preparation",
      description:
        "Flowers are sun-dried and blended with pure cow dung, natural herbs, and Vedic ingredients.",
      image: "/images/process-2.jpg",
    },
    {
      step: 3,
      title: "Hand-Molding",
      description:
        "Each cup is hand-molded by artisans in Uttarakhand, preserving the ancient craft.",
      image: "/images/process-3.jpg",
    },
    {
      step: 4,
      title: "Quality & Blessing",
      description:
        "Every batch is checked for purity and blessed before being packed for your home.",
      image: "/images/process-4.jpg",
    },
  ] as ProcessStep[],
};

/* ────────────── Pandit Story ────────────── */

export const panditStoryContent = {
  sectionTitle: "Rooted in 500+ Pandits' Knowledge",
  description:
    "For centuries, the pandits of Devbhoomi Uttarakhand have guarded the ancient wisdom of sacred rituals. Our Sambrani formulation draws from this living tradition — blending Vedic knowledge with the purest natural ingredients found only in the Himalayan foothills. Every cup is a bridge between ancient wisdom and modern devotion.",
  image: "/images/pandits.jpg",
  stats: [
    { value: "500+", label: "Temple Pandits Consulted" },
    { value: "100%", label: "Natural Ingredients" },
    { value: "0", label: "Chemicals Used" },
    { value: "20+", label: "Sacred Herbs" },
  ],
};

/* ────────────── Comparison ────────────── */

export const comparisonContent = {
  sectionTitle: "The Vistaaram Difference",
  sectionSubtitle: "See why conscious devotees choose us",
  rows: [
    { feature: "Base Material", vistaaram: "Cow Dung & Temple Flowers", others: "Charcoal & Sawdust" },
    { feature: "Fragrance Source", vistaaram: "Natural Herbs & Flowers", others: "Synthetic Chemicals" },
    { feature: "Smoke Quality", vistaaram: "Clean, Light & Pleasant", others: "Heavy, Dark & Irritating" },
    { feature: "Health Impact", vistaaram: "Air-Purifying", others: "Potentially Harmful" },
    { feature: "Environmental", vistaaram: "100% Biodegradable", others: "Non-Biodegradable Residue" },
    { feature: "Burn Time", vistaaram: "20-25 Minutes", others: "10-15 Minutes" },
    { feature: "Origin", vistaaram: "Devbhoomi, Uttarakhand", others: "Mass Factory Production" },
  ] as ComparisonRow[],
};

/* ────────────── Rituals ────────────── */

export const ritualsContent = {
  sectionTitle: "Perfect for Every Sacred Moment",
  sectionSubtitle: "From daily puja to festive celebrations",
  rituals: [
    {
      id: 1,
      name: "Morning Puja",
      description: "Start your day with the divine fragrance that invites positivity into your home.",
      image: "/images/ritual-1.jpg",
    },
    {
      id: 2,
      name: "Evening Aarti",
      description: "Enhance your evening prayers with the sacred aroma of Devbhoomi.",
      image: "/images/ritual-2.jpg",
    },
    {
      id: 3,
      name: "Hawan & Yagna",
      description: "The perfect companion for traditional fire ceremonies and Vedic rituals.",
      image: "/images/ritual-3.jpg",
    },
    {
      id: 4,
      name: "Meditation & Yoga",
      description: "Create a serene atmosphere for deeper meditation and spiritual practice.",
      image: "/images/ritual-4.jpg",
    },
  ] as Ritual[],
};

/* ────────────── Testimonials ────────────── */

export const testimonialsContent = {
  sectionTitle: "What Devotees Say",
  sectionSubtitle: "Trusted by families across India",
  testimonials: [
    {
      id: 1,
      name: "Neha Sharma",
      location: "Delhi, India",
      quote: "Sambrani cups ki fragrance bahut natural hai. Pooja ke time mann ko bahut shanti milti hai. Mere ghar ka atmosphere bilkul alag feel hota hai.",
      rating: 5,
      avatar: "/images/avatar-1.jpg",
    },
    {
      id: 2,
      name: "Amit Joshi",
      location: "Dehradun, Uttarakhand",
      quote: "Quality bahut acchi hai aur jalane mein bhi easy hai. Mandir ka mahal bilkul alag ho jata hai. Highly recommended!",
      rating: 5,
      avatar: "/images/avatar-2.jpg",
    },
    {
      id: 3,
      name: "Priya Mehta",
      location: "Bengaluru, India",
      quote: "Ghar mein ek positive energy feel hoti hai. Fragrance zyada strong nahi, bilkul perfect aur natural hai. Regular use kar rahi hoon.",
      rating: 5,
      avatar: "/images/avatar-3.jpg",
    },
  ] as Testimonial[],
};

/* ────────────── Stories Carousel ────────────── */

export const storiesContent = {
  sectionTitle: "Stories from Devbhoomi",
  sectionSubtitle: "Glimpses of the sacred land where Vistaaram is born",
  stories: [
    { image: "/images/story-1.jpg", caption: "Sunrise over the Himalayas" },
    { image: "/images/story-2.jpg", caption: "Temple flowers being collected" },
    { image: "/images/story-3.jpg", caption: "Artisans at work" },
    { image: "/images/story-4.jpg", caption: "The sacred Ganga" },
  ],
};

/* ────────────── FAQ ────────────── */

export const faqContent = {
  sectionTitle: "Questions, Answered",
  sectionSubtitle: "",
  faqs: [
    {
      question: "How long does one cup burn?",
      answer: "About 12–15 minutes of gentle smoke.",
    },
    {
      question: "Is it safe around children and pets?",
      answer: "Keep the burning cup on a stable holder, out of reach; never leave unattended.",
    },
    {
      question: "How is this different from agarbatti or dhoop?",
      answer: "No charcoal core, no synthetic fragrance — just temple flowers, cow dung and herbs.",
    },
    {
      question: "How long does shipping take?",
      answer: "Dispatch in 24 hours; delivery in 3–5 days across India. Free above ₹499.",
    },
    {
      question: "What is the shelf life?",
      answer: "Best before 18 months from manufacturing; store in a cool, dry place.",
    },
  ] as FAQ[],
};

/* ────────────── Coming Soon ────────────── */

export const comingSoonContent = {
  sectionTitle: "Coming Soon",
  sectionSubtitle: "More sacred offerings from Devbhoomi",
  items: [
    {
      name: "Daily Puja Kit",
      description: "A complete set of natural puja essentials for your everyday prayers.",
      image: "/images/coming-soon-1.jpg",
      features: ["Sandalwood", "Kapoor", "Ghee Wicks", "Ganga Water"]
    },
    {
      name: "Hawan Samagri",
      description: "Pure, natural hawan samagri made from temple flowers, herbs and sacred wood.",
      image: "/images/coming-soon-2.jpg",
      features: ["Temple Flowers", "Sacred Herbs", "Aromatic Wood"]
    },
    {
      name: "Devotional Gifting Pack",
      description: "Thoughtful, traditional gifting for festivals, housewarmings and special occasions.",
      image: "/images/coming-soon-3.jpg",
      features: ["Premium Packaging", "Custom Hampers", "Perfect for Gifting"]
    },
  ] as ComingSoonItem[],
};

/* ────────────── Footer ────────────── */

export const footerContent = {
  brand: "Vistaaram",
  tagline: "Sacred Fragrance from Devbhoomi, Uttarakhand",
  description:
    "Bringing the purity of Uttarakhand's sacred traditions to your home. Every product is handcrafted with love, blessed by pandits, and made from 100% natural ingredients.",
  sections: [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/product/natural-sambrani-hawan-cup" },
        { label: "Our Story", href: "/story" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Policies",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Shipping Policy", href: "/shipping" },
        { label: "Return Policy", href: "/returns" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "hello@vistaaram.in", href: "mailto:hello@vistaaram.in" },
        { label: "Instagram", href: "https://instagram.com/vistaaram" },
        { label: "WhatsApp", href: "https://wa.me/91XXXXXXXXXX" },
      ],
    },
  ] as FooterSection[],
  copyright: `© ${new Date().getFullYear()} Vistaaram. All rights reserved.`,
  madeIn: "Made with 🙏 in Devbhoomi, Uttarakhand",
};

/* ────────────── Our Story Page ────────────── */

export const ourStoryContent = {
  hero: {
    eyebrow: "THE VISTAARAM STORY",
    headline: "It Begins in Devbhoomi",
    image: "/images/our_story_banner.jpg",
  },
  chapters: [
    {
      id: 1,
      number: "CHAPTER ONE",
      title: "The Land of Gods",
      body: "High in the Himalayas lies Devbhoomi — the land of gods. Home to the four dhams, thousands of temples, and a tradition of worship that is thousands of years old. This is where Vistaaram was born.",
      image: "/images/Elderly Hands Lighting a Sacred Diya.jpg",
      dhams: [
        { name: "Yamunotri", icon: "🛕" },
        { name: "Gangotri", icon: "🛕" },
        { name: "Kedarnath", icon: "🛕" },
        { name: "Badrinath", icon: "🛕" },
      ],
      pullQuote: null,
    },
    {
      id: 2,
      number: "CHAPTER TWO",
      title: "Why We Started",
      body: "Every day, tons of sacred flowers offered in temples are discarded. At the same time, most homes burn chemical-based dhoop and agarbattis filled with synthetic fragrances.\n\nWe saw a gap — a way to turn temple flowers into something pure, natural and meaningful, so that every home can experience the same divinity found in the temples of Devbhoomi.",
      image: "/images/Golden Temple Flowers at Sunset.jpg",
      dhams: null,
      pullQuote: "We wanted every home to smell like a temple, not a chemistry lab.",
    }
  ],
  panditNetwork: {
    eyebrow: "500+ YEARS OF WISDOM",
    headline: "Blessed by the Pandits of Devbhoomi",
    body: "Every blend is guided by the knowledge of 500+ pandits — the same hands that have performed hawans in Devbhoomi's temples for generations.",
    image: "/images/pandits.jpg",
  },
  timeline: [
    { year: "2023 · DEHRADUN", title: "The First Blend", desc: "Our first hawan cups, hand-made in a small Dehradun workshop.", image: "/images/process-1.jpg" },
    { year: "2024 · ACROSS INDIA", title: "100 Homes", desc: "Our first 100 orders shipped across India.", image: "/images/product/4.jpg" },
    { year: "2024 · UTTARAKHAND", title: "The Pandit Network", desc: "500+ pandits began guiding every blend.", image: "/images/pandits.jpg" },
    { year: "2025 · OUR BRAND", title: "The Final Packaging", desc: "Our box, our promise, ready for every home.", image: "/images/product/1.jpg" },
    { year: "2026 · A BIGGER VISION", title: "What's Next", desc: "The Daily Puja Kit, coming soon.", image: "/images/coming-soon-1.jpg" },
  ],
  founders: [
    {
      name: "Pankaj Sati",
      role: "FOUNDER",
      note: "Founder bio placeholder — replace this with the approved 2-3 line personal note.",
      image: "/images/founder.jpg",
      instagram: "https://instagram.com/vistaaram"
    }
  ],
  values: [
    { icon: "🌿", title: "Purity", desc: "100% natural, charcoal-free, chemical-free." },
    { icon: "🪔", title: "Devotion", desc: "Guided by the knowledge of 500+ pandits." },
    { icon: "🏔️", title: "Devbhoomi", desc: "Sourced and packed in Uttarakhand, creating local livelihoods." },
  ],
  cta: {
    headline: "Bring Devbhoomi Into Your Home",
    buttonText: "ADD TO CART — ₹279",
    buttonLink: "/product/natural-sambrani-hawan-cup",
  }
};
