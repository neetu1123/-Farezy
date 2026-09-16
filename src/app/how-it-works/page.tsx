import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StickyMobileCTA from '../../components/StickyMobileCTA';
import SearchCard from '../../components/SearchCard';
import { MapPin, Search, CheckCircle2, ExternalLink, TrendingUp, Clock, Users, Percent, CloudRain, Tag } from 'lucide-react';
import Icon from '../../components/ui/AppIcon';



const STEPS = [
  {
    id: 'hiw-step-1',
    num: '01',
    icon: MapPin,
    title: 'Enter Your Trip',
    details: [
      'Type your pickup location or use current location',
      'Enter your destination',
      'Select your preferred ride type (Bike, Auto, Cab, Premium)',
      'Tap Compare Rides',
    ],
    color: 'text-primary bg-accent border-primary/20',
  },
  {
    id: 'hiw-step-2',
    num: '02',
    icon: Search,
    title: 'Farezy Compares',
    details: [
      'Farezy checks participating providers for your route',
      'Available options are fetched and displayed',
      'Fares, ETAs, and ride types are shown side by side',
      'Best options are highlighted automatically',
    ],
    color: 'text-savings bg-savings/10 border-savings/30',
  },
  {
    id: 'hiw-step-3',
    num: '03',
    icon: CheckCircle2,
    title: 'Choose Your Best Option',
    details: [
      'Compare fare, pickup time, and ride type',
      'Sort by cheapest, fastest, or best value',
      'Filter by ride category',
      'See savings vs the most expensive option',
    ],
    color: 'text-success bg-success/10 border-success/30',
  },
  {
    id: 'hiw-step-4',
    num: '04',
    icon: ExternalLink,
    title: 'Continue to Provider',
    details: [
      'Tap Continue on your chosen option',
      'You are directed to the provider\'s app or website',
      'Complete your booking directly with the provider',
      'Farezy does not handle the booking itself',
    ],
    color: 'text-warning bg-warning/10 border-warning/30',
  },
];

const WHY_COMPARE = [
  { id: 'why-demand', icon: TrendingUp, title: 'Demand & Surge', desc: 'Providers increase fares during peak hours, events, or high-demand periods.' },
  { id: 'why-time', icon: Clock, title: 'Time of Day', desc: 'Morning rush, late nights, and weekends can affect pricing across providers differently.' },
  { id: 'why-avail', icon: Users, title: 'Driver Availability', desc: 'Fewer available drivers in your area can affect both price and pickup time.' },
  { id: 'why-promo', icon: Percent, title: 'Promotions', desc: 'Providers run different offers and discounts at different times for different users.' },
  { id: 'why-weather', icon: CloudRain, title: 'Weather & Events', desc: 'Rain, local events, and holidays can cause fare differences across providers.' },
  { id: 'why-category', icon: Tag, title: 'Ride Category', desc: 'Auto, Bike, and Cab fares are priced differently per provider and route.' },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="gradient-hero py-16 lg:py-24 border-b border-border">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-accent border border-primary/20 rounded-full px-4 py-1.5 mb-5">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Simple & Fast</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark mb-4">
              Compare your ride in seconds.
            </h1>
            <p className="text-secondary text-base max-w-xl mx-auto mb-10">
              Farezy makes it easy to see available ride options from participating providers before you decide where to book.
            </p>

            {/* Compact search */}
            <div className="max-w-lg mx-auto">
              <SearchCard variant="compact" />
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark text-center mb-12">
              How it works
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {STEPS?.map((step) => {
                const Icon = step?.icon;
                return (
                  <div key={step?.id} className="bg-card border border-border rounded-2xl p-6 sm:p-8 flex gap-5">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${step?.color}`}>
                        <Icon size={22} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-black text-muted-foreground/50">{step?.num}</span>
                        <h3 className="text-base font-bold text-brand-dark">{step?.title}</h3>
                      </div>
                      <ul className="space-y-1.5">
                        {step?.details?.map((detail, di) => (
                          <li key={`step-detail-${step?.id}-${di}`} className="flex items-start gap-2 text-sm text-secondary">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Compare */}
        <section className="py-16 lg:py-20 bg-muted/40">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark mb-3">
                Why do fares differ across providers?
              </h2>
              <p className="text-secondary text-base max-w-xl mx-auto">
                Prices and availability can vary significantly based on several factors. That&apos;s exactly why comparing before booking makes sense.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {WHY_COMPARE?.map(({ id, icon: Icon, title, desc }) => (
                <div key={id} className="bg-card border border-border rounded-2xl p-5 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-dark mb-1">{title}</h4>
                    <p className="text-xs text-secondary leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 lg:py-20 gradient-hero border-t border-border">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark mb-3">
              Ready to compare your next ride?
            </h2>
            <p className="text-secondary text-base mb-8 max-w-md mx-auto">
              Takes less than 10 seconds. No account required.
            </p>
            <div className="max-w-lg mx-auto">
              <SearchCard variant="compact" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}