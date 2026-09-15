import type { Dictionary } from "@/lib/i18n";

const en: Dictionary = {
  meta: {
    title: "Baan Kaffe — Specialty Coffee in Ari, Bangkok",
    description:
      "A cosy neighbourhood coffee house in Ari, Bangkok. Specialty coffee, loose-leaf tea and pastries baked every morning.",
  },
  common: {
    opensNewTab: "(opens in a new tab)",
  },
  header: {
    contact: "Contact",
    call: "Call",
    lineLabel: "Message us on LINE",
    language: "Language",
  },
  hero: {
    eyebrow: "Coffee house · Ari, Bangkok",
    tagline: "Slow coffee, warm bakes, and a table that feels like home.",
    hoursSummary: "Tue – Sun · from 7:30",
    viewMenu: "View Menu",
    imageAlt: "Sunlit interior of Baan Kaffe with a wooden coffee bar",
  },
  menu: {
    eyebrow: "Our menu",
    title: "Made slowly, served warm",
    intro: "Everything is prepared to order. Oat and almond milk available at no extra charge.",
    categoriesLabel: "Menu categories",
    pricePrefix: "Price:",
    categories: {
      coffee: { title: "Coffee", note: "Beans roasted weekly from farms in Chiang Rai and Nan." },
      tea: { title: "Tea", note: "Loose-leaf from the northern highlands, brewed to order." },
      bakery: { title: "Bakery", note: "Baked in-house every morning. When it’s gone, it’s gone." },
    },
    items: {
      "iced-americano": {
        name: "Iced Americano",
        description: "Double shot over ice, bright and chocolatey. Bangkok’s favourite.",
        alt: "Iced americano in a tall glass",
      },
      "baan-latte": {
        name: "Baan Latte",
        description: "Our house blend with silky steamed milk and a touch of palm sugar.",
        alt: "Latte with rosetta latte art on a saucer by the window",
        tag: "Signature",
      },
      "flat-white": {
        name: "Flat White",
        description: "Ristretto shots and silky milk, served iced in a tall glass with a velvety foam cap.",
        alt: "Iced flat white with milk foam in a tall glass on a wooden café table",
      },
      "hot-mocha": {
        name: "Hot Mocha",
        description: "Espresso, Chanthaburi dark chocolate, cloud of milk foam.",
        alt: "Mocha topped with milk foam",
      },
      "thai-milk-tea": {
        name: "Thai Milk Tea",
        description: "Strong Thai black tea and condensed milk over ice, crowned with milk foam.",
        alt: "Iced Thai milk tea with milk foam on a cork coaster",
        tag: "Classic",
      },
      "passion-fruit-iced-tea": {
        name: "Passion Fruit Iced Tea",
        description: "Black tea shaken with fresh passion fruit pulp, mint and crushed ice.",
        alt: "Passion fruit iced tea with mint in a tall glass",
      },
      "iced-matcha-latte": {
        name: "Iced Matcha Latte",
        description: "Ceremonial-grade matcha whisked with oat or dairy milk, poured over ice.",
        alt: "Iced matcha latte in a glass tumbler on a sunlit counter",
      },
      "jasmine-tea": {
        name: "Jasmine Tea",
        description: "Delicate green tea scented with jasmine blossoms, served hot. Refills welcome.",
        alt: "Hot jasmine tea in a textured glass mug",
      },
      "butter-croissant": {
        name: "Butter Croissant",
        description: "Laminated for three days, shatteringly crisp outside.",
        alt: "Golden butter croissant",
      },
      "cardamom-bun": {
        name: "Cardamom Bun",
        description: "Swedish-style knot with cardamom sugar and pearl sugar crunch.",
        alt: "Two cardamom buns on a wooden board",
        tag: "Bestseller",
      },
      "lemon-bundt-cake": {
        name: "Lemon Bundt Cake",
        description: "Mini bundt soaked in lemon syrup. Perfect with a pour-over.",
        alt: "Mini lemon bundt cakes on a plate",
      },
      "sourdough-eggs": {
        name: "Sourdough & Eggs",
        description: "Fried eggs on garlic yoghurt, chilli butter, crispy chickpeas, toast.",
        alt: "Fried eggs with sourdough toast",
      },
    },
  },
  about: {
    eyebrow: "About us",
    title: "A little house for slow mornings",
    intro: {
      emphasis: "Baan",
      rest: " means “home” in Thai — and that’s exactly what we wanted to build. A quiet corner off busy Phahonyothin Road where you can linger over a cup, open a laptop, or just watch the soi wake up.",
    },
    body: "We work directly with small growers in Chiang Rai and Nan, roast in small batches every week, and bake everything on site before the doors open. No shortcuts, no syrups from a bottle.",
    facts: [
      { value: "2019", label: "Opened in Ari" },
      { value: "100%", label: "Thai-grown beans" },
      { value: "6 am", label: "Ovens on daily" },
    ],
    gallery: {
      label: "Photos of Baan Kaffe",
      previous: "Previous photo",
      next: "Next photo",
      showPhoto: "Show photo",
      photo: "Photo",
      of: "of",
      alts: {
        counter: "Espresso bar with milk cartons, syrups and cups lined up on the counter",
        bar: "Barista and a guest at the wooden bar of Baan Kaffe",
        "pour-over": "Three baristas preparing pour-over coffee behind the counter",
      },
    },
  },
  location: {
    eyebrow: "Find us",
    title: "Come say hello",
    addressTitle: "Address",
    addressLines: ["12 Soi Phahonyothin 7 (Ari 1)", "Phaya Thai, Bangkok 10400"],
    note: "3 min walk from BTS Ari, Exit 1",
    directions: "Get directions →",
    hoursTitle: "Opening hours",
    closed: "Closed",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    mapTitle: "Map showing Baan Kaffe in Ari, Bangkok",
  },
  footer: {
    tagline: "Coffee house in Ari, Bangkok",
    rights: "All rights reserved.",
    demo: "Demo project — not a real business",
  },
};

export default en;
