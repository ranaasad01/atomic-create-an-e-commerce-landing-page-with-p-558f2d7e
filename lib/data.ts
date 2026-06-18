export type NavLink = {
  label: string;
  href: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  badge?: "sale" | "new" | "featured" | "bestseller";
  description: string;
};

export const APP_NAME = "Lumière";
export const APP_TAGLINE = "Curated for the discerning eye.";
export const APP_CTA_LABEL = "Shop Now";
export const APP_CTA_HREF = "#products";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];