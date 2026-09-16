import React from 'react';
import { Trophy, Zap, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const DEMO_RESULTS = [
  {
    id: 'demo-rapido',
    name: 'Rapido',
    type: 'Bike',
    fare: 121,
    eta: 5,
    badge: 'BEST PRICE',
    badgeClass: 'badge-best-price',
    badgeIcon: Trophy,
    savings: 35,
    cardBg: 'border-savings/40 bg-savings/5',
    initial: 'R',
    initialBg: 'bg-orange-500',
  },
  {
    id: 'demo-uber',
    name: 'Uber',
    type: 'Auto',
    fare: 156,
    eta: 2,
    badge: 'FASTEST',
    badgeClass: 'badge-fastest',
    badgeIcon: Zap,
    savings: null,
    cardBg: 'border-border bg-card',
    initial: 'U',
    initialBg: 'bg-brand-dark',
  },
  {
    id: 'demo-indrive',
    name: 'inDrive',
    type: 'Cab',
    fare: 137,
    eta: 4,
    badge: 'BEST VALUE',
    badgeClass: 'badge-best-value',
    badgeIcon: Star,
    savings: null,
    cardBg: 'border-border bg-card',
    initial: 'i',
    initialBg: 'bg-green-600',
  },
  {
    id: 'demo-ola',
    name: 'Ola',
    type: 'Auto',
    fare: 149,
    eta: 5,
    badge: null,
    badgeClass: '',
    badgeIcon: null,
    savings: null,
    cardBg: 'border-border bg-card',
    initial: 'O',
    initialBg: 'bg-yellow-500',
  },
];

export default function ComparisonPreview() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-accent border border-primary/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Example Comparison</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark mb-3">
            Mumbai → BKC
          </h2>
          <p className="text-secondary text-sm">
            These are demo values only. Actual fares depend on real-time availability and provider pricing.
          </p>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {DEMO_RESULTS?.map((result) => {
            const BadgeIcon = result?.badgeIcon;
            return (
              <div
                key={result?.id}
                className={`relative rounded-2xl border-2 p-5 provider-card-hover ${result?.cardBg}`}
              >
                {result?.badge && BadgeIcon && (
                  <div className={`absolute -top-3 left-4 flex items-center gap-1 ${result?.badgeClass}`}>
                    <BadgeIcon size={11} />
                    {result?.badge}
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${result?.initialBg} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-sm font-black text-white">{result?.initial}</span>
                  </div>
                  <div>
                    <p className="text-base font-bold text-brand-dark">{result?.name}</p>
                    <p className="text-xs text-muted-foreground">{result?.type}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-3xl font-black text-brand-dark font-tabular">₹{result?.fare}</p>
                  {result?.savings && (
                    <p className="text-sm font-bold text-savings mt-0.5">SAVE ₹{result?.savings}</p>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-xs font-semibold text-secondary">{result?.eta} min pickup</span>
                  </div>
                </div>

                <Link
                  href="/compare-rides"
                  className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-[0.97] ${
                    result?.badge === 'BEST PRICE' ?'btn-savings' :'btn-primary'
                  }`}
                >
                  Continue <ArrowRight size={13} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Savings callout */}
        <div className="bg-savings/10 border border-savings/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-sm font-semibold text-savings-foreground mb-1">On this example trip, you could save</p>
            <p className="text-4xl font-black text-savings font-tabular">₹35</p>
            <p className="text-xs text-muted-foreground mt-1">vs. the most expensive option shown</p>
          </div>
          <Link href="/compare-rides" className="btn-savings px-6 py-3 text-sm font-bold rounded-xl whitespace-nowrap">
            Compare My Ride →
          </Link>
        </div>
      </div>
    </section>
  );
}