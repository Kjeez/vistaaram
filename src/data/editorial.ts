/**
 * Content for the editorial Product, Shop and Story pages (Claude Design: "Story and Shop Redesign").
 * Prices and pack details come from PACK_OPTIONS; shipping and returns from storePolicy.
 */
import { storePolicy } from "@/data/content";

const { freeShippingThreshold, shippingFee, dispatchTime, deliveryTime, returnWindowDays } = storePolicy;

// TODO(owner): confirm these figures with the client. They mirror the homepage and are kept in one place.
export const socialProof = {
  rating: "4.8",
  homes: "2,000+",
  ordersShipped: "500+",
};

export const productHighlights = ["Charcoal free", "Chemical free", "Temple flowers & cow dung"];

export const insideContent = {
  eyebrow: "100% natural, zero chemicals",
  title: ["Zero Charcoal.", "Pure Devotion."],
  intro: "Unlike conventional dhoop, our Sambrani Hawan Cup is 100% natural — just pure ingredients, nothing else.",
  items: [
    { n: "01", title: "Temple flowers", text: "Collected after the day's offerings at Uttarakhand's temples." },
    { n: "02", title: "Cow dung", text: "The traditional base for a clean and natural burn." },
    { n: "03", title: "Sacred herbs", text: "Ground in a stone mortar, blended with ancient knowledge." },
    { n: "—", title: "Nothing else", text: "No charcoal. No synthetic fragrance. Nothing artificial." },
  ],
};

export const howToUseSteps = [
  { title: "Tilt the cup and light it", text: "Use a matchstick on the open rim." },
  { title: "Gently blow out the flame", text: "Set the cup on a heat-safe plate." },
  { title: "Let it fill your home", text: "About 12–15 minutes of gentle smoke." },
];

export const ritualCards = [
  { title: "Morning Pooja", text: "Start your day with positive energy and divine blessings.", image: "/images/ritual-1.jpg" },
  { title: "Meditation & Yoga", text: "Create a calm and focused atmosphere.", image: "/images/ritual-4.jpg" },
  { title: "Festival Hawan", text: "Perfect for Diwali, Navratri and all sacred occasions.", image: "/images/ritual-3.jpg" },
  { title: "Home Cleansing", text: "Purify your home and remove negativity naturally.", image: "/images/ritual-2.jpg" },
];

export const processSteps = [
  { title: "Sacred Temple Flowers Collected", text: "Fresh flowers from Uttarakhand's temples are collected with care." },
  { title: "Carefully Sorted by Hand", text: "Each flower is carefully sorted to remove impurities." },
  { title: "Naturally Sun-Dried", text: "Dried naturally in the pure mountain air." },
  { title: "Blended with Sacred Ingredients", text: "Mixed with cow dung and traditional herbs using ancient knowledge." },
  { title: "Hand-Filled into Hawan Cups", text: "Lovingly filled by hand into eco-friendly cups." },
  { title: "Packed in Dehradun", text: "Hygienically packed at our facility in Dehradun, Uttarakhand." },
];

/** The six photographed steps on the Story page carousel. */
export const madeSteps = [
  { caption: "Temple flowers, collected after the day's offerings", image: "/images/process_step_1.jpg" },
  { caption: "Petals sorted by hand", image: "/images/process_step_2.jpg" },
  { caption: "Herbs ground in a stone mortar", image: "/images/process_step_3.jpg" },
  { caption: "Each cup filled and shaped by hand", image: "/images/process_step_4.jpg" },
  { caption: "Guided by the pandits of Devbhoomi", image: "/images/process_step_5.jpg" },
  { caption: "Ready for your evening puja", image: "/images/process_step_6.jpg" },
];

export const shortFaqs = [
  { q: "How long does one cup burn?", a: "About 12–15 minutes of gentle smoke." },
  { q: "Is Cash on Delivery available?", a: "Yes. Pay when your order arrives." },
  { q: "How long does shipping take?", a: `Orders ship ${dispatchTime} and are delivered in ${deliveryTime}.` },
  { q: "Is shipping free?", a: `Shipping is free on orders above ₹${freeShippingThreshold}, and ₹${shippingFee} below that.` },
  { q: "What is your return policy?", a: `${returnWindowDays}-day easy returns on unused packs.` },
];

export const shopPromises = [
  { title: "Charcoal Free", text: "A clean and natural burn." },
  { title: "Chemical Free", text: "Pure ingredients, nothing artificial." },
  { title: "Temple Flowers & Cow Dung", text: "Sacred offerings, thoughtfully repurposed." },
  { title: "500+ Pandit Ji's Knowledge", text: "Traditional wisdom in every blend." },
];

export const shopTrust = [
  { title: "Cash on Delivery", text: "Pay when your order arrives" },
  { title: `Free shipping above ₹${freeShippingThreshold}`, text: `₹${shippingFee} below that` },
  { title: `Ships ${dispatchTime}`, text: `Delivered in ${deliveryTime}` },
  { title: `${returnWindowDays}-day easy returns`, text: "On unused packs" },
];

export const storyTimeline = [
  { year: "2023", place: "Dehradun", title: "The First Blend", text: "Our first hawan cups, hand-made in a small Dehradun workshop." },
  { year: "2024", place: "Across India", title: "100 Homes", text: "Our first 100 orders shipped across India." },
  { year: "2024", place: "Uttarakhand", title: "The Pandit Network", text: "500+ pandits began guiding every blend." },
  { year: "2025", place: "Our Brand", title: "The Final Packaging", text: "Our box, our promise, ready for every home." },
  { year: "2026", place: "A Bigger Vision", title: "What's Next", text: "The Daily Puja Kit, coming soon.", upcoming: true },
];

export const storyChapters = [
  { id: "land", title: "The Land of Gods" },
  { id: "why", title: "Why We Started" },
  { id: "made", title: "How a Cup Is Made" },
  { id: "pandits", title: "The Pandits" },
  { id: "journey", title: "The Journey So Far" },
];

export const HINDI_TAGLINE = "देवभूमि की पवित्र सुगंध, अब आपके घर में।";
export const DHAMS = ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath"];
