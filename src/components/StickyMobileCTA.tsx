'use client';
import React, { useState, useEffect } from 'react';
import { Car, X } from 'lucide-react';
import SearchCard from './SearchCard';

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-brand-dark/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Bottom sheet */}
      {open && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-2xl shadow-hero animate-slide-up max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-border">
            <h3 className="text-base font-bold text-brand-dark">Compare a Ride</h3>
            <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-muted transition-colors">
              <X size={18} className="text-secondary" />
            </button>
          </div>
          <div className="p-4">
            <SearchCard variant="compact" />
          </div>
        </div>
      )}

      {/* Sticky bar — only on mobile */}
      <div className="sticky-mobile-cta lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="btn-primary w-full flex items-center justify-center gap-2.5 py-3.5 text-sm font-bold rounded-xl"
        >
          <Car size={18} />
          Compare a Ride
        </button>
      </div>
    </>
  );
}