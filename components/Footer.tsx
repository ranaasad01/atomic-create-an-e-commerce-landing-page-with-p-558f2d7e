"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Mail, Camera as Instagram, MessageCircle as Twitter, Globe as Facebook, ArrowRight } from 'lucide-react';
import { navLinks, APP_NAME, APP_TAGLINE } from "@/lib/data";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "#products" },
      { label: "Best Sellers", href: "#products" },
      { label: "Sale", href: "#products" },
      { label: "Collections", href: "#collections" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "#about" },
      { label: "Press", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "#contact" },
      { label: "Shipping Policy", href: "#contact" },
      { label: "Returns", href: "#contact" },
      { label: "Track Order", href: "#contact" },
    ],
  },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
];

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300">
      {/* Newsletter Banner */}
      <div className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <motion.div variants={fadeInUp} className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white font-playfair">
                Stay in the loop
              </h3>
              <p className="text-sm text-neutral-400 mt-1">
                Get early access to new arrivals and exclusive offers.
              </p>
            </motion.div>
            <motion.form
              variants={fadeInUp}
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full md:w-auto gap-2"
            >
              <div className="relative flex-1 md:w-72">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 transition-colors duration-200"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="px-5 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-violet-900/30 transition-shadow duration-200"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-playfair">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              {APP_TAGLINE} We bring you the finest selection of premium products
              crafted for modern living.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-violet-600 flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={getLinkHref(link.href)}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors duration-200"
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}