import React from 'react';
import SearchCard from '../../components/SearchCard';
import { MapPin, TrendingDown, Clock, CheckCircle2 } from 'lucide-react';
import Icon from '../../components/ui/AppIcon';


export default function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-savings/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: heading + search */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-accent border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">India&apos;s Ride Comparison Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark leading-[1.08] tracking-tight mb-5">
              Compare Every Ride.<br />
              <span className="text-primary">Find the Best Fare.</span>
            </h1>
            <p className="text-base sm:text-lg text-secondary leading-relaxed mb-8 max-w-lg">
              Enter your pickup and destination once. Farezy helps you compare available ride options across participating providers so you can choose the option that works best for your journey.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {[
                { icon: TrendingDown, text: 'Compare fares instantly' },
                { icon: Clock, text: 'See pickup times' },
                { icon: CheckCircle2, text: 'No account needed' },
              ]?.map(({ icon: Icon, text }) => (
                <div key={`trust-${text}`} className="flex items-center gap-1.5">
                  <Icon size={14} className="text-success flex-shrink-0" />
                  <span className="text-sm text-secondary font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* Search card */}
            <SearchCard variant="hero" />
          </div>

          {/* Right: visual */}
          <div className="hidden lg:flex items-center justify-center">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative w-full max-w-sm">
      {/* Main card */}
      <div className="bg-card rounded-2xl shadow-hero border border-border/60 p-6 relative">
        {/* Route header */}
        <div className="flex items-start gap-3 mb-5">
          <div className="flex flex-col items-center gap-1 pt-1 flex-shrink-0">
            <div className="route-dot-blue" />
            <div className="route-line" style={{ minHeight: '28px' }} />
            <div className="route-dot-green" />
          </div>
          <div className="flex-1">
            <div className="mb-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Pickup</p>
              <p className="text-sm font-bold text-brand-dark">Andheri West, Mumbai</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Destination</p>
              <p className="text-sm font-bold text-brand-dark">Bandra Kurla Complex</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-0.5">Distance</p>
            <p className="text-sm font-bold text-brand-dark font-tabular">8.2 km</p>
          </div>
        </div>

        {/* Mini provider cards */}
        <div className="space-y-2">
          {[
            { name: 'Rapido', type: 'Bike', fare: '₹121', eta: '5 min', badge: 'BEST PRICE', badgeClass: 'badge-best-price', savingsText: 'SAVE ₹35' },
            { name: 'inDrive', type: 'Cab', fare: '₹137', eta: '4 min', badge: 'BEST VALUE', badgeClass: 'badge-best-value', savingsText: null },
            { name: 'Uber', type: 'Auto', fare: '₹156', eta: '2 min', badge: 'FASTEST', badgeClass: 'badge-fastest', savingsText: null },
          ]?.map((opt) => (
            <div key={`hero-vis-${opt?.name}`} className={`flex items-center gap-3 p-3 rounded-xl border ${opt?.badge === 'BEST PRICE' ? 'border-savings/40 bg-savings/5' : 'border-border bg-muted/30'}`}>
              <div className="w-8 h-8 rounded-lg bg-brand-dark flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-black text-white">{opt?.name?.[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-sm font-bold text-brand-dark">{opt?.name}</span>
                  <span className={opt?.badgeClass}>{opt?.badge}</span>
                </div>
                <p className="text-xs text-muted-foreground">{opt?.type} · {opt?.eta} away</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-base font-black text-brand-dark font-tabular">{opt?.fare}</p>
                {opt?.savingsText && <p className="text-xs font-bold text-savings">{opt?.savingsText}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-4 p-3 rounded-xl bg-savings/10 border border-savings/30 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-savings-foreground">You could save</p>
            <p className="text-xl font-black text-savings font-tabular">₹35</p>
          </div>
          <button className="btn-savings px-4 py-2 text-xs font-bold rounded-xl">
            Continue to Rapido →
          </button>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -top-3 -right-3 bg-savings text-savings-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
        Compare 6+ providers
      </div>
      <div className="absolute -bottom-3 -left-3 bg-card border border-border shadow-card text-xs font-semibold text-brand-dark px-3 py-1.5 rounded-full flex items-center gap-1.5">
        <MapPin size={11} className="text-primary" />
        Live comparison
      </div>
    </div>
  );
}