"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Star, ShoppingCart, Heart, ArrowRight, Truck, Shield, RefreshCw, Sparkles, ChevronRight, Check, Quote } from 'lucide-react';
import {
  APP_NAME,
  APP_TAGLINE,
  APP_CTA_LABEL,
  APP_CTA_HREF,
  type Product,
} from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const products: Product[] = [
  {
    id: "1",
    name: "Velvet Noir Candle",
    price: 48,
    originalPrice: 64,
    rating: 4.9,
    reviewCount: 312,
    image: "https://www.commonwealthcandle.com/cdn/shop/files/PXL_20250906_205503986_2000x2000.jpg?v=1760395282",
    category: "Home & Scent",
    badge: "bestseller",
    description:
      "Hand-poured soy wax with notes of black amber, sandalwood, and smoked vanilla. Burns for 60+ hours.",
  },
  {
    id: "2",
    name: "Silk Revive Serum",
    price: 92,
    rating: 4.8,
    reviewCount: 204,
    image: "https://m.media-amazon.com/images/I/710LNXZ4QzL.jpg",
    category: "Beauty",
    badge: "new",
    description:
      "Lightweight vitamin-C serum with hyaluronic acid and bakuchiol. Visibly brightens in 14 days.",
  },
  {
    id: "3",
    name: "Linen Cloud Throw",
    price: 135,
    originalPrice: 180,
    rating: 4.7,
    reviewCount: 178,
    image: "http://parachutehome.com/cdn/shop/files/cloud-linen-gauze-throw-bone_01_aa1d7894-0a89-49f0-9b63-4cf0b4aeee5f.jpg?v=1762839028",
    category: "Home & Living",
    badge: "sale",
    description:
      "Stone-washed Belgian linen in a generous 140×200 cm drape. Naturally temperature-regulating.",
  },
  {
    id: "4",
    name: "Obsidian Desk Clock",
    price: 220,
    rating: 4.9,
    reviewCount: 89,
    image: "https://i.ebayimg.com/images/g/GhgAAOSwBbxlYmId/s-l1200.jpg",
    category: "Accessories",
    badge: "featured",
    description:
      "Solid obsidian base with brushed-gold hands. Silent quartz movement. A statement for any workspace.",
  },
  {
    id: "5",
    name: "Cashmere Cocoon Wrap",
    price: 310,
    originalPrice: 390,
    rating: 5.0,
    reviewCount: 56,
    image: "https://www.beggxco.com/cdn/shop/files/BEGG_CO_AW25_ECOMMERCE_COCOON_WRAP_BROWN_UNDYED_09-07-25__006.jpg?v=1755078438&width=2000",
    category: "Fashion",
    badge: "sale",
    description:
      "Grade-A Mongolian cashmere in a relaxed oversized silhouette. Feather-light, endlessly warm.",
  },
  {
    id: "6",
    name: "Amber Glass Carafe",
    price: 74,
    rating: 4.6,
    reviewCount: 143,
    image: "http://slowdownstudio.com/cdn/shop/files/Amber1.jpg?v=1698812141",
    category: "Home & Living",
    badge: "new",
    description:
      "Hand-blown borosilicate glass with a cork stopper. Holds 1.2 L. Dishwasher safe.",
  },
];

const collections = [
  {
    id: "c1",
    title: "The Sanctuary Edit",
    subtitle: "Home & Scent",
    count: 24,
    image: "https://thesanctuaryedit.com/wp-content/uploads/2025/07/cropped-sanctuaryeditlogo-2.png",
    accent: "from-amber-900/60 to-amber-950/80",
  },
  {
    id: "c2",
    title: "Luminous Skin",
    subtitle: "Beauty & Wellness",
    count: 18,
    image: "https://thesanctuaryedit.com/wp-content/uploads/2025/07/cropped-sanctuaryeditlogo-2.png",
    accent: "from-rose-900/60 to-rose-950/80",
  },
  {
    id: "c3",
    title: "Dressed in Quiet",
    subtitle: "Fashion & Textiles",
    count: 31,
    image: "https://hips.hearstapps.com/hmg-prod/images/gorgeous-face-stock-photo-royalty-free-image-1724235215.jpg?crop=1xw:0.68223xh;center,top&resize=640:*",
    accent: "from-indigo-900/60 to-indigo-950/80",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Worldwide Shipping",
    description:
      "Complimentary delivery on all orders over $150. Tracked, insured, and beautifully packaged.",
  },
  {
    icon: Shield,
    title: "Authenticity Guaranteed",
    description:
      "Every product is curated and verified by our in-house team. No compromises, ever.",
  },
  {
    icon: RefreshCw,
    title: "Effortless Returns",
    description:
      "Changed your mind? Return within 30 days for a full refund — no questions asked.",
  },
  {
    icon: Sparkles,
    title: "Luxury Gift Wrapping",
    description:
      "Complimentary signature gift wrapping with a handwritten note on every order.",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Isabelle Moreau",
    role: "Interior Designer, Paris",
    avatar: "https://aztecdiamond.com/cdn/shop/files/0Y3A8394_09bf55ba-b11c-45a1-8aec-5521833a2a48.jpg?v=1751556321&width=3645",
    rating: 5,
    text: "Lumière has completely transformed how I source pieces for my clients. The curation is impeccable — every item feels considered and rare.",
  },
  {
    id: "t2",
    name: "James Whitfield",
    role: "Creative Director, London",
    avatar: "https://www.nga.org/wp-content/uploads/2018/12/James_whitfield_Gov.jpg",
    rating: 5,
    text: "I've ordered from dozens of luxury retailers. None match the attention to detail in Lumière's packaging and product quality. Truly exceptional.",
  },
  {
    id: "t3",
    name: "Yuki Tanaka",
    role: "Architect, Tokyo",
    avatar: "https://cdn-test.poetryfoundation.org/cdn-cgi/image/w=2292,h=3438,q=80/content/images/Yuki-Tanaka-c-Ippei-and-Janine-Photography.jpg",
    rating: 5,
    text: "The Obsidian Desk Clock sits on my desk every day. It's a conversation piece. Lumière understands that objects should have meaning.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function BadgePill({ badge }: { badge: Product["badge"] }) {
  if (!badge) return null;
  const styles: Record<NonNullable<Product["badge"]>, string> = {
    sale: "bg-rose-100 text-rose-700",
    new: "bg-emerald-100 text-emerald-700",
    featured: "bg-violet-100 text-violet-700",
    bestseller: "bg-amber-100 text-amber-700",
  };
  const labels: Record<NonNullable<Product["badge"]>, string> = {
    sale: "Sale",
    new: "New",
    featured: "Featured",
    bestseller: "Best Seller",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[badge]}`}
    >
      {labels[badge]}
    </span>
  );
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-neutral-200 text-neutral-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-neutral-500">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const shouldReduce = useReducedMotion();

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: index * 0.08 },
    },
  };

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : null;

  return (
    <motion.div
      variants={cardVariant}
      whileHover={shouldReduce ? {} : { y: -6 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-neutral-100 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-neutral-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <button
          onClick={() => setWished((w) => !w)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110 active:scale-95"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              wished ? "fill-rose-500 text-rose-500" : "text-neutral-500"
            }`}
          />
        </button>
        {/* Badge */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <BadgePill badge={product.badge} />
          {discount !== null && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-600 text-white">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <p className="text-xs font-medium text-violet-600 uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="text-base font-semibold text-neutral-900 leading-snug">
            {product.name}
          </h3>
          <p className="text-sm text-neutral-500 mt-1.5 line-clamp-2">
            {product.description}
          </p>
        </div>

        <StarRating rating={product.rating} count={product.reviewCount} />

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-neutral-100">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-neutral-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <motion.button
            whileHover={shouldReduce ? {} : { scale: 1.05 }}
            whileTap={shouldReduce ? {} : { scale: 0.95 }}
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-violet-600 hover:bg-violet-700 text-white"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" /> Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-indigo-950 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-600/40 rounded-full blur-[90px]" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-medium">
                <Sparkles className="w-4 h-4 text-violet-400" />
                New Collection
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6 font-playfair"
            >
              {APP_NAME}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-white/60 font-light tracking-wide mb-4"
            >
              {APP_TAGLINE}
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="max-w-xl mx-auto text-base text-white/50 leading-relaxed mb-10"
            >
              Rare objects, considered beauty, and enduring craft — sourced from
              the world&apos;s finest ateliers and delivered to your door.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href={APP_CTA_HREF}
                whileHover={shouldReduce ? {} : { scale: 1.04 }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg shadow-violet-900/40 hover:shadow-violet-900/60 transition-shadow duration-300 text-base"
              >
                {APP_CTA_LABEL}
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#collections"
                whileHover={shouldReduce ? {} : { scale: 1.04 }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/15 transition-colors duration-200 text-base"
              >
                View Collections
                <ChevronRight className="w-5 h-5" />
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
            >
              {[
                { value: "12K+", label: "Happy Clients" },
                { value: "340+", label: "Curated Products" },
                { value: "4.9★", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            animate={shouldReduce ? {} : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <section className="bg-white py-16 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {valueProps.map((vp) => {
              const Icon = vp.icon;
              return (
                <motion.div
                  key={vp.title}
                  variants={fadeInUp}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center group-hover:bg-violet-100 transition-colors duration-200">
                    <Icon className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900 mb-1">
                      {vp.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {vp.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── COLLECTIONS ──────────────────────────────────────────────────── */}
      <section
        id="collections"
        className="bg-neutral-50 py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-3"
            >
              Curated Worlds
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-neutral-900 font-playfair"
            >
              Shop by Collection
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-neutral-500 max-w-xl mx-auto"
            >
              Each collection is a carefully composed universe of objects that
              share a sensibility, a mood, a way of living.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {collections.map((col) => (
              <motion.a
                key={col.id}
                href="#products"
                variants={scaleIn}
                whileHover={shouldReduce ? {} : { scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer group block"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${col.accent}`}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  <p className="text-white/70 text-xs uppercase tracking-widest mb-1">
                    {col.subtitle}
                  </p>
                  <h3 className="text-white text-2xl font-bold font-playfair leading-tight mb-2">
                    {col.title}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {col.count} pieces
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────────────────── */}
      <section id="products" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
          >
            <div>
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-3"
              >
                Handpicked for You
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl sm:text-4xl font-bold text-neutral-900 font-playfair"
              >
                Featured Products
              </motion.h2>
            </div>
            <motion.a
              variants={fadeInUp}
              href="#collections"
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors duration-200 group"
            >
              View all products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT / BRAND STORY ──────────────────────────────────────────── */}
      <section
        id="about"
        className="bg-neutral-950 py-28 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInLeft}
            >
              <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">
                Our Philosophy
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-playfair leading-tight mb-6">
                Beauty is not an
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                  accident.
                </span>
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-5">
                Lumière was founded on a single conviction: that the objects we
                surround ourselves with shape how we feel, think, and live. We
                travel the world — from Parisian ateliers to Kyoto ceramicists —
                to find pieces that carry genuine craft and intention.
              </p>
              <p className="text-neutral-400 leading-relaxed mb-8">
                Every product in our catalogue is tested, touched, and approved
                by our team before it reaches you. We stock fewer things, but
                better things. That&apos;s the Lumière promise.
              </p>
              <ul className="space-y-3">
                {[
                  "Ethically sourced from 40+ countries",
                  "Carbon-neutral shipping on every order",
                  "1% of revenue donated to artisan communities",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-neutral-300">
                    <span className="w-5 h-5 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-violet-400" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Image mosaic */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInRight}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-800">
                  <img
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80"
                    alt="Atelier craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square bg-neutral-800">
                  <img
                    src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&q=80"
                    alt="Luxury detail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden aspect-square bg-neutral-800">
                  <img
                    src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80"
                    alt="Curated objects"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-800">
                  <img
                    src="https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&q=80"
                    alt="Elegant living"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-3"
            >
              Voices of Lumière
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-neutral-900 font-playfair"
            >
              What Our Clients Say
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                className="bg-neutral-50 rounded-2xl p-8 flex flex-col gap-5 border border-neutral-100"
              >
                <Quote className="w-8 h-8 text-violet-300" />
                <p className="text-neutral-700 leading-relaxed text-sm flex-1">
                  {t.text}
                </p>
                <div className="flex items-center gap-0.5 mb-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-violet-950 via-indigo-950 to-neutral-950 py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/70 text-sm">
                <Sparkles className="w-4 h-4 text-violet-400" />
                Members get early access
              </span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-white font-playfair mb-4"
            >
              Join the Inner Circle
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/60 mb-8 leading-relaxed"
            >
              Be the first to discover new arrivals, exclusive offers, and
              stories from our ateliers around the world.
            </motion.p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 text-emerald-400 font-semibold"
              >
                <Check className="w-5 h-5" />
                You&apos;re on the list. Welcome to Lumière.
              </motion.div>
            ) : (
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-violet-400 transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity duration-200 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="bg-neutral-950 border-t border-neutral-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white font-playfair mb-3">
                {APP_NAME}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
                Rare objects, considered beauty, and enduring craft — curated
                for those who believe the everyday deserves to be extraordinary.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Shop
              </h4>
              <ul className="space-y-2.5">
                {["New Arrivals", "Collections", "Featured", "Sale"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-2.5">
                {["About", "Journal", "Careers", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-neutral-600 text-xs">
              &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
