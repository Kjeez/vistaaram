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
  logo: "/images/new_logo.png",
  links: [
    { label: "Shop", href: "/shop" },
    { label: "Our Story", href: "/story" },
    { label: "Process", href: "/#process" },
    { label: "Rituals", href: "/#rituals" },
    { label: "Reviews", href: "/#testimonials" },
  ],
  whatsappLink: "https://wa.me/917819058084",
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

/* ────────────── Story Page Gallery ────────────── */

export const storiesContent = {
  sectionEyebrow: "From flower to flame",
  sectionTitle: "How a Vistaaram Cup Is Made",
  sectionSubtitle: "Every cup starts as an offering in a Devbhoomi temple.",
  stories: [
    { image: "/images/process_step_1.jpg", caption: "Temple flowers, collected after the day's offerings" },
    { image: "/images/process_step_2.jpg", caption: "Petals sorted by hand" },
    { image: "/images/process_step_4.jpg", caption: "Herbs ground in a stone mortar" },
    { image: "/images/process_step_5.jpg", caption: "Each cup filled and shaped by hand" },
    { image: "/images/slide2.jpg", caption: "Guided by the pandits of Devbhoomi" },
    { image: "/images/ritual-1.jpg", caption: "Ready for your evening puja" },
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
    {
      question: "Is Cash on Delivery available?",
      answer: "Yes. Choose Cash on Delivery at checkout and pay the courier when your order arrives. There is no extra COD fee.",
    },
    {
      question: "Do I need an account to order?",
      answer: "No, you can check out as a guest. With a free account (email or Google sign-in) you can track orders, save addresses, keep a wishlist and check out faster.",
    },
    {
      question: "How do I track my order?",
      answer: "We send a tracking link by SMS/WhatsApp once your order ships. You can also see order status under My Orders in your account, use our Track Order page, or WhatsApp us your order number.",
    },
    {
      question: "I ordered as a guest. Can I see that order in my account?",
      answer: "Yes. Sign up with the same email you used at checkout and tap “Find my past orders” under My Orders. With Google sign-in it is added instantly; otherwise we email you a link to confirm.",
    },
    {
      question: "What is your return policy?",
      answer: "We offer 7-day easy returns on unused packs. Request a return from My Orders (or WhatsApp us) and we arrange a free pickup where available. Damaged or wrong items are replaced or refunded.",
    },
    {
      question: "How do refunds work for Cash on Delivery orders?",
      answer: "Once we receive the returned item, we refund COD orders by UPI or bank transfer within 5–7 business days.",
    },
    {
      question: "Do you take bulk orders for temples or events?",
      answer: "Yes. Message us on WhatsApp or through the Contact page with the quantity and date, and we will share bulk pricing.",
    },
  ] as FAQ[],
};

/* ────────────── Coming Soon ────────────── */

export const comingSoonContent = {
  sectionTitle: "Coming Soon",
  sectionSubtitle: "More sacred offerings from Devbhoomi",
  notifyCta: "Notify me on WhatsApp",
  notifyMessage: (product: string) => `Hi Vistaaram, please notify me when the ${product} launches.`,
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
        { label: "Shop", href: "/shop" },
        { label: "Our Story", href: "/story" },
        { label: "FAQ", href: "/#faq" },
        { label: "Track Order", href: "/track" },
        { label: "Contact Us", href: "/contact" },
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
        { label: "contact@vistaaram.in", href: "mailto:contact@vistaaram.in" },
        { label: "Instagram", href: "https://instagram.com/vistaaram" },
        { label: "WhatsApp", href: "https://wa.me/917819058084" },
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
      // TODO(owner): add the approved 2-3 line founder bio. Left empty so no placeholder text renders.
      note: "",
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

/* ────────────── Contact Page ────────────── */

export const contactContent = {
  header: {
    eyebrow: "WE'D LOVE TO HEAR FROM YOU",
    headline: "Get in Touch",
    subline:
      "Questions about your order, bulk bookings for temples, or just want to say Har Har Mahadev? We reply within 24 hours.",
  },
  info: {
    cards: [
      {
        type: "address",
        label: "VISIT US",
        lines: ["Sati Enterprises,", "Sahastradhara Road,", "Dehradun, Uttarakhand - 248013"],
      },
      {
        type: "email",
        label: "WRITE TO US",
        lines: ["contact@vistaaram.in"],
        href: "mailto:contact@vistaaram.in",
      },
      {
        type: "phone",
        label: "CALL US",
        lines: ["+91 7819058084"],
        note: "Mon-Sat, 10 AM - 7 PM IST",
        href: "tel:+917819058084",
      },
      {
        type: "whatsapp",
        label: "WHATSAPP US",
        sublabel: "fastest replies",
        ctaText: "Chat on WhatsApp",
        href: "https://wa.me/917819058084",
      },
    ],
    footnote: "For order queries, please share your order number for faster help.",
  },
  form: {
    title: "Send Us a Message",
    subjectOptions: [
      "Order Support",
      "Product Question",
      "Bulk or Temple Order",
      "Collaboration",
      "Other",
    ],
    directEmail: "contact@vistaaram.in",
    cta: "SEND MESSAGE",
  },
  map: {
    src: "https://maps.google.com/maps?q=Sahastradhara+Road+Dehradun+Uttarakhand&output=embed",
    overlayLine1: "Vistaaram - Sati Enterprises",
    overlayLine2: "Sahastradhara Road, Dehradun",
  },
  quickHelp: {
    headline: "Before You Reach Out",
    subline: "Here are some quick links that might help you find what you're looking for.",
    cards: [
      {
        type: "track",
        title: "Track My Order",
        desc: "Check your tracking link from the SMS/WhatsApp we sent you.",
        cta: "Learn more",
        href: "/track",
      },
      {
        type: "returns",
        title: "Returns & Refunds",
        desc: "7-day easy returns on unused packs.",
        cta: "Learn more",
        href: "/returns",
      },
      {
        type: "faq",
        title: "FAQs",
        desc: "Burn time, shipping, safety - answered instantly.",
        cta: "Learn more",
        href: "/#faq",
      },
    ],
  },
};

/* ────────────── Business Details (legal) ────────────── */

// TODO(owner): confirm every field below against your GST / business registration before
// Razorpay live-mode review. Blank fields are hidden on the site — fill them, don't guess.
//   - legalName / addressLines: currently what the site already shows; confirm they are the registered name + address.
//   - gstin: add your GSTIN (shown in the footer and on policy pages once set).
//   - grievanceOfficer: name of the Grievance Officer (Consumer Protection (E-Commerce) Rules, 2020).
//   - jurisdictionCity: courts named in the Terms; confirm with your advisor.
export const businessDetails = {
  brand: "Vistaaram",
  legalName: "Sati Enterprises",
  addressLines: ["Sahastradhara Road", "Dehradun, Uttarakhand - 248013", "India"],
  email: "contact@vistaaram.in",
  phone: "+91 7819058084",
  phoneHref: "tel:+917819058084",
  whatsappNumber: "917819058084",
  whatsappLink: "https://wa.me/917819058084",
  supportHours: "Mon-Sat, 10 AM - 7 PM IST",
  gstin: "",
  grievanceOfficer: "",
  jurisdictionCity: "Dehradun, Uttarakhand",
};

/* ────────────── Store Policies (shared facts) ────────────── */

// Single source for the numbers the policy pages quote. Keep in sync with
// CartContext (₹49 shipping, free from ₹499) and the PDP promises.
export const storePolicy = {
  dispatchTime: "within 24 hours",
  deliveryTime: "3-5 business days",
  shippingFee: 49,
  freeShippingThreshold: 499,
  returnWindowDays: 7,
  // TODO(owner): confirm refund timeline with Razorpay / your bank.
  refundTimeline: "5-7 business days",
};

/* ────────────── Policy Pages ────────────── */

export interface PolicySection {
  heading: string;
  body?: string[];
  bullets?: string[];
}

export interface PolicyPageContent {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  subline: string;
  lastUpdated: string;
  sections: PolicySection[];
}

const { email, phone, legalName, brand } = businessDetails;
const { dispatchTime, deliveryTime, shippingFee, freeShippingThreshold, returnWindowDays, refundTimeline } = storePolicy;
const POLICY_UPDATED = "18 October 2026";

export const privacyContent: PolicyPageContent = {
  metaTitle: "Privacy Policy — Vistaaram",
  metaDescription:
    "How Vistaaram collects, uses and protects your personal information when you shop natural sambrani hawan cups with us.",
  eyebrow: "YOUR TRUST MATTERS",
  headline: "Privacy Policy",
  subline: "What we collect, why we collect it, and how we keep it safe.",
  lastUpdated: POLICY_UPDATED,
  sections: [
    {
      heading: "Who we are",
      body: [
        `This website (vistaaram.in) is operated by ${legalName} under the brand ${brand}. In this policy, "we", "us" and "our" refer to ${legalName}. By using our website or placing an order, you agree to this Privacy Policy.`,
      ],
    },
    {
      heading: "Information we collect",
      bullets: [
        "Order details: your name, phone number, email address, and shipping/billing address.",
        "Messages you send us through the contact form, WhatsApp, email or phone.",
        "Basic technical data such as browser type, device and pages visited, used to keep the site working and secure.",
        "Your cart contents, stored in your browser so your cart is still there when you come back.",
      ],
    },
    {
      heading: "Payment information",
      body: [
        "Online payments (UPI, cards, net banking, wallets) are processed securely by Razorpay. Your card, UPI or bank details are entered on Razorpay's secure checkout and are never stored on our servers. We only receive a payment reference and status to confirm your order.",
        "For Cash on Delivery orders, no payment details are collected online.",
      ],
    },
    {
      heading: "How we use your information",
      bullets: [
        "To process, ship and deliver your order, and to handle returns and refunds.",
        "To send order updates by SMS, WhatsApp or email.",
        "To reply to your questions and provide customer support.",
        "To prevent fraud and comply with tax and legal requirements.",
        "To send offers or launch updates only if you have asked for them. You can opt out anytime.",
      ],
    },
    {
      heading: "Who we share it with",
      body: [
        "We do not sell or rent your personal information. We share only what is needed to complete your order with:",
      ],
      bullets: [
        "Razorpay, our payment gateway, for online payments.",
        "Courier and logistics partners, who need your name, address and phone number to deliver.",
        "Our e-commerce and hosting providers, who store order data on our behalf.",
        "Government or law enforcement authorities, when required by law.",
      ],
    },
    {
      heading: "Cookies and local storage",
      body: [
        "We use your browser's local storage and essential cookies to remember your cart and keep checkout working. You can clear these from your browser settings at any time; your cart will be emptied if you do.",
      ],
    },
    {
      heading: "Data retention and security",
      body: [
        "We keep order records for as long as needed to fulfil your order and as required by Indian tax and accounting laws. We use reasonable technical and organisational measures to protect your data, but no method of transmission over the internet is completely secure.",
      ],
    },
    {
      heading: "Your choices",
      body: [
        `You can ask us to access, correct or delete your personal information, or to stop sending you marketing messages, by writing to ${email}. Some order records may need to be kept for legal reasons.`,
      ],
    },
    {
      heading: "Grievances and contact",
      body: [
        `For any privacy concern or grievance, contact us at ${email} or ${phone}. We will acknowledge your complaint within 48 hours and aim to resolve it within 30 days.`,
        "We may update this policy from time to time. The latest version will always be on this page.",
      ],
    },
  ],
};

export const termsContent: PolicyPageContent = {
  metaTitle: "Terms & Conditions — Vistaaram",
  metaDescription:
    "Terms and conditions for buying Vistaaram natural sambrani hawan cups — orders, pricing, payment, COD, shipping and returns.",
  eyebrow: "THE FINE PRINT",
  headline: "Terms & Conditions",
  subline: "Simple terms for shopping with Vistaaram.",
  lastUpdated: POLICY_UPDATED,
  sections: [
    {
      heading: "About these terms",
      body: [
        `These terms govern your use of vistaaram.in and any purchase you make from us. The website is operated by ${legalName} under the brand ${brand}. By using the website or placing an order, you agree to these terms.`,
      ],
    },
    {
      heading: "Products",
      body: [
        "Our sambrani hawan cups are handmade from natural ingredients, so colour, size and fragrance may vary slightly from batch to batch and from the photos on the website. Burn times are approximate.",
        "Our products are meant for puja, hawan and home fragrance only. Light them on a heat-resistant surface, keep them away from children, pets and flammable materials, and never leave a burning cup unattended.",
      ],
    },
    {
      heading: "Prices and orders",
      bullets: [
        "All prices are in Indian Rupees (₹) and include applicable taxes unless stated otherwise.",
        `Shipping is ₹${shippingFee} per order, and free on orders of ₹${freeShippingThreshold} or more.`,
        "Placing an order is an offer to buy. We may cancel an order if a product is unavailable, if there is a pricing error, or if we suspect fraud. If you have already paid, you will get a full refund.",
        "We currently deliver only within India.",
      ],
    },
    {
      heading: "Payment",
      bullets: [
        "Online payments (UPI, cards, net banking and wallets) are processed securely by Razorpay.",
        "Cash on Delivery (COD) is available. Please keep the exact amount ready at delivery. We may restrict COD for some pincodes or orders.",
        "Refusing a COD order at the doorstep without a valid reason may lead to COD being disabled for future orders.",
      ],
    },
    {
      heading: "Shipping, returns and refunds",
      body: [
        "Delivery timelines are explained in our Shipping Policy, and returns, cancellations and refunds in our Returns & Refund Policy. Both form part of these terms.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        `All content on this website, including the ${brand} name, logo, photos and text, belongs to ${legalName} and may not be copied or used without our written permission.`,
      ],
    },
    {
      heading: "Limitation of liability",
      body: [
        "To the extent permitted by law, our total liability for any claim relating to an order is limited to the amount you paid for that order. We are not responsible for delays or failures caused by events outside our reasonable control, such as natural disasters, strikes or courier disruptions.",
      ],
    },
    {
      heading: "Governing law",
      body: [
        `These terms are governed by the laws of India. Any dispute will be subject to the courts of ${businessDetails.jurisdictionCity}.`,
      ],
    },
    {
      heading: "Contact",
      body: [
        `Questions about these terms? Write to ${email} or call ${phone}. We may update these terms from time to time; the latest version will always be on this page.`,
      ],
    },
  ],
};

export const shippingContent: PolicyPageContent = {
  metaTitle: "Shipping Policy — Vistaaram",
  metaDescription: `Vistaaram ships ${dispatchTime} with delivery in ${deliveryTime} across India. ₹${shippingFee} shipping, free on orders of ₹${freeShippingThreshold}+. COD available.`,
  eyebrow: "FROM DEVBHOOMI TO YOUR DOORSTEP",
  headline: "Shipping Policy",
  subline: "How and when your sambrani reaches you.",
  lastUpdated: POLICY_UPDATED,
  sections: [
    {
      heading: "Where we ship",
      body: [
        "We ship across India through trusted courier partners. We do not ship outside India at the moment.",
      ],
    },
    {
      heading: "Dispatch and delivery time",
      bullets: [
        `Orders are packed and dispatched ${dispatchTime} (excluding Sundays and public holidays).`,
        `Delivery usually takes ${deliveryTime} after dispatch, depending on your location.`,
        "Remote areas and the North-East may take a few extra days. Festivals, weather and courier disruptions can also cause delays; we will keep you posted.",
      ],
    },
    {
      heading: "Shipping charges",
      bullets: [
        `₹${shippingFee} per order for orders below ₹${freeShippingThreshold}.`,
        `Free shipping on orders of ₹${freeShippingThreshold} or more.`,
        "The shipping charge is shown in your cart before you pay.",
      ],
    },
    {
      heading: "Cash on Delivery",
      body: [
        "COD is available on most pincodes. Please pay the courier the order amount in cash at delivery.",
      ],
    },
    {
      heading: "Tracking your order",
      body: [
        "Once your order is dispatched, we send you a tracking link by SMS, WhatsApp or email. You can also visit our Track Order page or WhatsApp us your order number.",
      ],
    },
    {
      heading: "Damaged or missing parcels",
      body: [
        `If your parcel arrives damaged, opened or with items missing, please share photos or an unboxing video with us within 48 hours of delivery on WhatsApp or at ${email}. We will send a replacement or a full refund.`,
      ],
    },
    {
      heading: "Wrong address or failed delivery",
      body: [
        "Please double-check your address and phone number at checkout. If a parcel comes back to us because of an incorrect address or because the recipient was unavailable after repeated attempts, we can re-ship it once you pay the shipping charge again, or refund a prepaid order minus shipping charges.",
      ],
    },
  ],
};

export const returnsContent: PolicyPageContent = {
  metaTitle: "Returns & Refund Policy — Vistaaram",
  metaDescription: `${returnWindowDays}-day easy returns on Vistaaram sambrani hawan cups. Cancellations, replacements and refunds for online and COD orders.`,
  eyebrow: "SHOP WITH PEACE OF MIND",
  headline: "Returns & Refund Policy",
  subline: `${returnWindowDays}-day easy returns, cancellations and refunds — explained simply.`,
  lastUpdated: POLICY_UPDATED,
  sections: [
    {
      heading: `${returnWindowDays}-day returns`,
      body: [
        `You can request a return within ${returnWindowDays} days of delivery. Because our sambrani cups are burnt during use, we accept returns of packs that are unused and in their original packaging.`,
      ],
    },
    {
      heading: "Damaged, defective or wrong items",
      body: [
        `If you receive a damaged, defective or wrong product, tell us within ${returnWindowDays} days of delivery with photos (an unboxing video helps). We will send a free replacement or give you a full refund, including shipping — your choice.`,
      ],
    },
    {
      heading: "How to request a return",
      bullets: [
        `WhatsApp us or email ${email} with your order number and the reason for return.`,
        "We will confirm within 24 hours and arrange a free reverse pickup where available. If pickup is not available at your pincode, we will share the address to send the item back to us.",
        "Once we receive and check the item, we will process your refund or replacement.",
      ],
    },
    {
      heading: "Refunds",
      bullets: [
        `Prepaid (Razorpay) orders: refunded to your original payment method within ${refundTimeline} after we receive the returned item.`,
        `COD orders: refunded by UPI or bank transfer to the details you share with us, within ${refundTimeline} after we receive the returned item.`,
        "Original shipping charges are refunded only if the item was damaged, defective or wrong.",
      ],
    },
    {
      heading: "Cancellations",
      bullets: [
        "You can cancel your order free of charge before it is dispatched. WhatsApp or call us with your order number.",
        "Once dispatched, the order cannot be cancelled, but you can return it under this policy.",
        `Cancelled prepaid orders are refunded in full to the original payment method within ${refundTimeline}.`,
      ],
    },
    {
      heading: "Need help?",
      body: [`WhatsApp us, call ${phone} or email ${email}. We are happy to help.`],
    },
  ],
};

/* ────────────── Track Order Page ────────────── */

export const trackContent = {
  metaTitle: "Track Your Order — Vistaaram",
  metaDescription:
    "Track your Vistaaram order. Enter your order number and phone number, or message us on WhatsApp for a status update.",
  eyebrow: "WHERE IS MY SAMBRANI?",
  headline: "Track Your Order",
  subline:
    "We send a tracking link by SMS/WhatsApp as soon as your order ships. Can't find it? Share your order number below and we'll reply with the latest status on WhatsApp.",
  form: {
    orderLabel: "Order number",
    orderPlaceholder: "e.g. 1024",
    phoneLabel: "Phone number used for the order",
    phonePlaceholder: "10-digit mobile number",
    cta: "GET STATUS ON WHATSAPP",
    orderError: "Please enter your order number.",
    phoneError: "Please enter a valid 10-digit mobile number.",
  },
  whatsappMessage: (order: string, mobile: string) =>
    `Hi Vistaaram, please share the status of my order #${order}. Phone: ${mobile}`,
  steps: [
    { title: "Packed & dispatched", desc: `Usually ${dispatchTime} of your order.` },
    { title: "Tracking link sent", desc: "By SMS, WhatsApp or email once it ships." },
    { title: "Delivered", desc: `In ${deliveryTime} across India.` },
  ],
  helpTitle: "Prefer to talk?",
};

/* ────────────── PDP Pincode Check ────────────── */

export const pincodeCheckContent = {
  placeholder: "Enter delivery pincode",
  cta: "Check",
  invalid: "Please enter a valid 6-digit pincode.",
  success: (pin: string) => `Delivers to ${pin} in ${storePolicy.deliveryTime} · COD available`,
  promise: `COD available · Ships ${storePolicy.dispatchTime} · ${storePolicy.returnWindowDays}-day easy returns`,
};
