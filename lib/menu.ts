// Prices and photos only — names, descriptions, tags and alt text live in lib/dictionaries.

export type MenuCategoryId = "coffee" | "tea" | "bakery";

export type MenuItemId =
  | "iced-americano"
  | "baan-latte"
  | "flat-white"
  | "hot-mocha"
  | "thai-milk-tea"
  | "passion-fruit-iced-tea"
  | "iced-matcha-latte"
  | "jasmine-tea"
  | "butter-croissant"
  | "cardamom-bun"
  | "lemon-bundt-cake"
  | "sourdough-eggs";

export type PhotoCrop = {
  /** Photo size in px — only the ratio is used. */
  width: number;
  height: number;
  /** Area of the photo (fractions 0–1) that must stay fully visible in every card shape. */
  x: number;
  y: number;
  w: number;
  h: number;
};

export type MenuImage = {
  src: string;
  /** Precise framing; takes priority over `focus`/`zoom`. */
  crop?: PhotoCrop;
  /** CSS object-position — lets several items share one photo with different crops. */
  focus?: string;
  /** Extra zoom around `focus` for tighter crops. */
  zoom?: number;
};

export type MenuItem = {
  id: MenuItemId;
  price: number;
  image?: MenuImage;
  /** Colour tile shown when an item has no photo yet. */
  swatch?: string;
};

export type MenuCategory = {
  id: MenuCategoryId;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "coffee",
    items: [
      { id: "iced-americano", price: 85, image: { src: "/images/iced-americano.jpg", focus: "58% 60%" } },
      {
        id: "baan-latte",
        price: 110,
        image: {
          src: "/images/latte.jpg",
          crop: { width: 842, height: 1264, x: 0.203, y: 0.445, w: 0.62, h: 0.46 },
        },
      },
      {
        id: "flat-white",
        price: 95,
        image: {
          src: "/images/flat-white.jpg",
          crop: { width: 842, height: 1264, x: 0.215, y: 0.417, w: 0.58, h: 0.4 },
        },
      },
      {
        id: "hot-mocha",
        price: 120,
        image: {
          src: "/images/hot-mocha.jpg",
          crop: { width: 3456, height: 5184, x: 0.17, y: 0.4165, w: 0.64, h: 0.495 },
        },
      },
    ],
  },
  {
    id: "tea",
    items: [
      { id: "thai-milk-tea", price: 75, image: { src: "/images/thai-milk-tea.jpg", focus: "56% 45%" } },
      {
        id: "passion-fruit-iced-tea",
        price: 80,
        image: {
          src: "/images/passion-fruit-iced-tea.jpg",
          crop: { width: 842, height: 1264, x: 0.196, y: 0.328, w: 0.6, h: 0.48 },
        },
      },
      {
        id: "iced-matcha-latte",
        price: 115,
        image: {
          src: "/images/iced-matcha-latte.jpg",
          crop: { width: 842, height: 1264, x: 0.235, y: 0.355, w: 0.55, h: 0.36 },
        },
      },
      {
        id: "jasmine-tea",
        price: 90,
        image: {
          src: "/images/jasmine-tea.jpg",
          crop: { width: 1050, height: 1024, x: 0.18, y: 0.289, w: 0.62, h: 0.56 },
        },
      },
    ],
  },
  {
    id: "bakery",
    items: [
      { id: "butter-croissant", price: 85, image: { src: "/images/latte-croissant.jpg", focus: "50% 32%", zoom: 1.7 } },
      { id: "cardamom-bun", price: 95, image: { src: "/images/latte-cardamom-buns.jpg", focus: "63% 48%", zoom: 1.5 } },
      { id: "lemon-bundt-cake", price: 90, image: { src: "/images/filter-coffee-bundt.jpg", focus: "53% 45%", zoom: 1.6 } },
      { id: "sourdough-eggs", price: 185, image: { src: "/images/flat-white-eggs.jpg", focus: "38% 35%", zoom: 1.4 } },
    ],
  },
];
