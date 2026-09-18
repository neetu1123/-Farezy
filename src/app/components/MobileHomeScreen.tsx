'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  ChevronDown,
  IndianRupee,
  MapPin,
  Search,
  Shield,
  Star,
  Wallet,
} from 'lucide-react';

const LOCATIONS = [
  { name: 'Mumbai', full: 'Mumbai' },
  { name: 'BKC', full: 'Bandra Kurla Complex, Mumbai' },
  { name: 'Andheri West', full: 'Andheri West, Mumbai' },
  { name: 'Bandra Kurla Complex', full: 'Bandra Kurla Complex, Mumbai' },
  { name: 'Connaught Place', full: 'Connaught Place, New Delhi' },
  { name: 'Koramangala', full: 'Koramangala, Bengaluru' },
  { name: 'Hitech City', full: 'Hitech City, Hyderabad' },
];

const FEATURES = [
  { icon: IndianRupee, ring: 'border-primary text-primary', title: 'Best Prices', subtitle: 'Compare & Save' },
  { icon: Wallet, ring: 'border-savings text-savings', title: 'Exciting Cashback', subtitle: 'On Every Ride' },
  { icon: Shield, ring: 'border-primary text-primary', title: 'Trusted Partners', subtitle: 'Safe & Reliable' },
  { icon: Star, ring: 'border-savings text-savings', title: 'Rewards', subtitle: 'Earn Every Time' },
];

function filterLocations(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return LOCATIONS.slice(0, 5);
  return LOCATIONS.filter(
    (l) => l.name.toLowerCase().includes(q) || l.full.toLowerCase().includes(q)
  ).slice(0, 5);
}

export default function MobileHomeScreen() {
  const router = useRouter();
  const [pickup, setPickup] = useState('Mumbai');
  const [destination, setDestination] = useState('BKC');
  const [pickupOpen, setPickupOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [pickupError, setPickupError] = useState('');
  const [destError, setDestError] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setPickupOpen(false);
        setDestOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleCompare = () => {
    let valid = true;
    if (!pickup.trim()) {
      setPickupError('Enter pickup location');
      valid = false;
    } else {
      setPickupError('');
    }
    if (!destination.trim()) {
      setDestError('Enter drop location');
      valid = false;
    } else {
      setDestError('');
    }
    if (!valid) return;
    const params = new URLSearchParams({ pickup, destination, type: 'cab' });
    router.push(`/compare-rides?${params.toString()}`);
  };

  const pickupSuggestions = filterLocations(pickup);
  const destSuggestions = filterLocations(destination);

  return (
    <div className="lg:hidden min-h-dvh bg-[#071427] flex flex-col mobile-home">
      <div className="relative flex-1 flex flex-col bg-gradient-to-b from-white via-[#F4F8FF] to-[#EEF6FF] rounded-b-[2.75rem] overflow-hidden">
        <Link
          href="/compare-rides"
          className="absolute top-4 right-5 z-20 text-sm font-semibold text-primary"
        >
          Skip
        </Link>

        <div className="pt-10 px-6 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-primary text-primary">
              <Check size={18} strokeWidth={3.5} />
            </span>
            <span className="text-[1.85rem] font-extrabold tracking-tight text-brand-dark leading-none">
              FAREZY
            </span>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2.5">
            <span className="h-px w-8 bg-primary/35" />
            <span className="text-[10px] font-semibold tracking-[0.32em] text-primary">
              MOBILITY
            </span>
            <span className="h-px w-8 bg-primary/35" />
          </div>

          <h1 className="mt-4 text-[1.85rem] font-extrabold leading-[1.12] tracking-tight text-brand-dark">
            One app.
            <br />
            <span className="text-primary">Every cab.</span>
          </h1>
          <p className="mt-2 text-sm text-secondary">Best ride for every journey.</p>
        </div>

        <div className="relative mx-auto h-[150px] w-full">
          <CityBackdrop />
          <Image
            src="/assets/images/mobile-hero-car.png?v=2"
            alt="Cab"
            width={280}
            height={150}
            priority
            unoptimized
            className="absolute left-1/2 top-[34px] z-10 w-[68%] max-w-[240px] -translate-x-1/2 object-contain"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse 72% 68% at 50% 58%, #000 58%, transparent 78%)',
              maskImage: 'radial-gradient(ellipse 72% 68% at 50% 58%, #000 58%, transparent 78%)',
            }}
          />
          <span className="absolute left-6 top-[52px] z-20 h-8 w-8 rounded-full bg-primary text-white shadow-md flex items-center justify-center">
            <MapPin size={16} fill="currentColor" />
          </span>
          <span className="absolute right-6 top-[52px] z-20 h-8 w-8 rounded-full bg-savings text-white shadow-md flex items-center justify-center">
            <MapPin size={16} fill="currentColor" />
          </span>
        </div>

        <div ref={cardRef} className="relative z-20 mx-4 -mt-2 rounded-[1.6rem] bg-white p-4 shadow-hero">
          <div className="flex gap-3">
            <div className="flex flex-col items-center pt-2.5 pb-2">
              <span className="route-dot-blue" />
              <span className="my-1 w-px flex-1 min-h-[22px] bg-gradient-to-b from-primary to-savings" />
              <span className="route-dot-green" />
            </div>
            <div className="flex-1 min-w-0">
              <LocationField
                label="Pickup location"
                value={pickup}
                open={pickupOpen}
                error={pickupError}
                suggestions={pickupSuggestions}
                onToggle={() => {
                  setPickupOpen((v) => !v);
                  setDestOpen(false);
                }}
                onChange={(v) => {
                  setPickup(v);
                  setPickupError('');
                  setPickupOpen(true);
                }}
                onSelect={(v) => {
                  setPickup(v);
                  setPickupError('');
                  setPickupOpen(false);
                }}
              />
              <div className="h-px bg-border my-1" />
              <LocationField
                label="Drop location"
                value={destination}
                open={destOpen}
                error={destError}
                suggestions={destSuggestions}
                onToggle={() => {
                  setDestOpen((v) => !v);
                  setPickupOpen(false);
                }}
                onChange={(v) => {
                  setDestination(v);
                  setDestError('');
                  setDestOpen(true);
                }}
                onSelect={(v) => {
                  setDestination(v);
                  setDestError('');
                  setDestOpen(false);
                }}
              />
            </div>
          </div>

          <Link
            href={`/compare-rides?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}&type=cab`}
            onClick={(e) => {
              if (!pickup.trim() || !destination.trim()) {
                e.preventDefault();
                handleCompare();
              }
            }}
            className="mt-3 w-full rounded-2xl bg-primary py-3.5 text-sm font-extrabold tracking-wide text-white shadow-[0_10px_24px_rgba(37,99,235,0.35)] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Search size={18} strokeWidth={2.5} />
            COMPARE RIDES
          </Link>
        </div>

        <div className="mx-4 mt-auto mb-4 rounded-[1.5rem] bg-white/90 border border-white px-2 py-3 shadow-sm-custom">
          <div className="grid grid-cols-4 gap-1">
            {FEATURES.map(({ icon: Icon, ring, title, subtitle }) => (
              <div key={title} className="flex flex-col items-center text-center px-0.5">
                <span className={`mb-2 flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] bg-white ${ring}`}>
                  <Icon size={18} strokeWidth={2} />
                </span>
                <p className="text-[11px] font-bold leading-tight text-brand-dark">{title}</p>
                <p className="mt-0.5 text-[9px] leading-tight text-secondary">{subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#071427] px-6 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-center gap-1.5 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
        </div>
        <p className="text-center text-sm text-white/80">
          New to Farezy?{' '}
          <Link href="/sign-up-login-screen" className="font-bold text-savings inline-flex items-center gap-1">
            Create Account
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </p>
      </div>
    </div>
  );
}

function LocationField({
  label,
  value,
  open,
  error,
  suggestions,
  onToggle,
  onChange,
  onSelect,
}: {
  label: string;
  value: string;
  open: boolean;
  error: string;
  suggestions: { name: string; full: string }[];
  onToggle: () => void;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="relative py-1.5">
      <div className="flex w-full items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => {
              if (!open) onToggle();
            }}
            placeholder={label}
            className="mt-0.5 w-full bg-transparent text-[15px] font-bold text-brand-dark outline-none placeholder:font-medium placeholder:text-muted-foreground"
          />
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="mt-3 text-muted-foreground"
          aria-label={`Toggle ${label} suggestions`}
        >
          <ChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {error && <p className="text-[11px] text-destructive mt-1">{error}</p>}
      {open && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-xl border border-border bg-white shadow-lg">
          {suggestions.map((loc) => (
            <button
              key={`${label}-${loc.full}`}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onSelect(loc.name);
              }}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-left hover:bg-accent"
            >
              <MapPin size={13} className="text-muted-foreground flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">{loc.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CityBackdrop() {
  return (
    <svg viewBox="0 0 390 180" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="roadGreen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#4ADE80" />
        </linearGradient>
      </defs>
      <path d="M-10 128 C 70 78, 140 168, 210 118 S 340 70, 410 128" fill="none" stroke="url(#roadGreen)" strokeWidth="3" opacity="0.85" />
      <path d="M-10 142 C 90 96, 160 176, 250 128 S 360 88, 410 140" fill="none" stroke="#93C5FD" strokeWidth="2.5" opacity="0.7" />

      <g fill="#B9D4F5" opacity="0.85">
        <rect x="28" y="78" width="22" height="52" rx="2" />
        <rect x="54" y="58" width="18" height="72" rx="2" />
        <rect x="76" y="70" width="26" height="60" rx="2" />
        <rect x="108" y="50" width="20" height="80" rx="2" />
        <rect x="250" y="62" width="24" height="68" rx="2" />
        <rect x="278" y="48" width="18" height="82" rx="2" />
        <rect x="300" y="72" width="30" height="58" rx="2" />
        <rect x="334" y="56" width="16" height="74" rx="2" />
      </g>

      <g transform="translate(318, 42)" fill="none" stroke="#C7DCF5" strokeWidth="2">
        <circle cx="24" cy="24" r="22" />
        <circle cx="24" cy="24" r="14" />
        <line x1="24" y1="2" x2="24" y2="46" />
        <line x1="2" y1="24" x2="46" y2="24" />
        <line x1="8" y1="8" x2="40" y2="40" />
        <line x1="40" y1="8" x2="8" y2="40" />
      </g>

      <path
        d="M58 92 C 130 58, 260 58, 332 92"
        fill="none"
        stroke="#94A3B8"
        strokeWidth="1.6"
        strokeDasharray="5 6"
      />
    </svg>
  );
}
