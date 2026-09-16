'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from './ui/AppLogo';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Compare Rides', href: '/compare-rides' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Ride Providers', href: '/ride-providers' },
  { label: 'Ride Types', href: '/ride-types' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-sm-custom' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <AppLogo size={36} />
            <span className="font-extrabold text-xl tracking-tight text-brand-dark group-hover:text-primary transition-colors">
              Farezy
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks?.map((link) => (
              <Link
                key={`nav-${link?.href}`}
                href={link?.href}
                className="px-4 py-2 text-sm font-500 text-secondary hover:text-primary hover:bg-accent rounded-lg transition-all duration-150 font-medium"
              >
                {link?.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/sign-up-login-screen"
              className="px-4 py-2 text-sm font-600 text-brand-dark hover:text-primary transition-colors font-semibold"
            >
              Log In
            </Link>
            <Link
              href="/compare-rides"
              className="btn-primary px-5 py-2.5 text-sm font-semibold rounded-xl inline-flex items-center gap-2"
            >
              Compare Rides
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} className="text-brand-dark" /> : <Menu size={22} className="text-brand-dark" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            {navLinks?.map((link) => (
              <Link
                key={`mobile-nav-${link?.href}`}
                href={link?.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-xl transition-all"
              >
                {link?.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border mt-2 flex flex-col gap-2">
              <Link
                href="/sign-up-login-screen"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center px-4 py-3 text-sm font-semibold text-brand-dark border border-border rounded-xl hover:bg-muted transition-all"
              >
                Log In
              </Link>
              <Link
                href="/compare-rides"
                onClick={() => setMobileOpen(false)}
                className="btn-primary flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-xl"
              >
                Compare Rides
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}