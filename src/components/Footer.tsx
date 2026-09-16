import React from 'react';
import Link from 'next/link';
import AppLogo from './ui/AppLogo';
import { Smartphone } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Compare Rides', href: '/compare-rides' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Why Farezy', href: '/how-it-works' },
    { label: 'Ride Providers', href: '/ride-providers' },
    { label: 'Ride Types', href: '/ride-types' },
  ],
  company: [
    { label: 'About', href: '/' },
    { label: 'Blog', href: '/' },
    { label: 'For Riders', href: '/' },
    { label: 'Rewards', href: '/' },
    { label: 'Contact', href: '/' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/' },
    { label: 'Terms of Service', href: '/' },
    { label: 'Cookie Policy', href: '/' },
    { label: 'Disclaimer', href: '/' },
  ],
};

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

const socialLinks = [
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: FacebookIcon, label: 'Facebook' },
  { icon: TwitterIcon, label: 'X / Twitter' },
  { icon: LinkedinIcon, label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="gradient-brand text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <AppLogo size={36} />
              <span className="font-extrabold text-xl tracking-tight text-white">Farezy</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-6 max-w-xs">
              Compare Every Ride.<br />Find the Best Fare.<br /><br />
              One search. Multiple ride options. One smarter choice.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {socialLinks?.map(({ icon, label }) => {
                const SocialIcon = icon;
                return (
                  <a
                    key={`social-${label}`}
                    href="#"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <SocialIcon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-700 text-white/50 uppercase tracking-widest mb-4 font-bold">Product</h4>
            <ul className="space-y-2.5">
              {footerLinks?.product?.map((link) => (
                <li key={`footer-product-${link?.label}`}>
                  <Link href={link?.href} className="text-sm text-white/75 hover:text-white transition-colors">
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-700 text-white/50 uppercase tracking-widest mb-4 font-bold">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks?.company?.map((link) => (
                <li key={`footer-company-${link?.label}`}>
                  <Link href={link?.href} className="text-sm text-white/75 hover:text-white transition-colors">
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + App */}
          <div>
            <h4 className="text-sm font-700 text-white/50 uppercase tracking-widest mb-4 font-bold">Legal</h4>
            <ul className="space-y-2.5 mb-8">
              {footerLinks?.legal?.map((link) => (
                <li key={`footer-legal-${link?.label}`}>
                  <Link href={link?.href} className="text-sm text-white/75 hover:text-white transition-colors">
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-sm font-700 text-white/50 uppercase tracking-widest mb-3 font-bold">Get the App</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-sm font-medium">
                <Smartphone size={16} />
                App Store
              </a>
              <a href="#" className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-sm font-medium">
                <Smartphone size={16} />
                Google Play
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">© 2026 Farezy. All rights reserved.</p>
          <p className="text-xs text-white/40 text-center sm:text-right max-w-md">
            Farezy is a comparison platform. Prices and availability are subject to change. Farezy does not control third-party provider pricing.
          </p>
        </div>
      </div>
    </footer>
  );
}