import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StickyMobileCTA from '../../components/StickyMobileCTA';
import SearchCard from '../../components/SearchCard';
import Link from 'next/link';
import { Bike, Zap, Car, Star, Users, Clock, IndianRupee, ArrowRight } from 'lucide-react';
import Icon from '../../components/ui/AppIcon';



const RIDE_TYPES = [
  {
    id: 'rt-bike',
    icon: Bike,
    title: 'Bike',
    tagline: 'Fast, affordable, solo city rides',
    desc: 'Bike rides are the most affordable option for solo commuters in Indian cities. Perfect for short to medium distances where beating traffic is the priority.',
    whenToChoose: [
      'Solo commute through busy city areas',
      'Short distances under 10 km',
      'When you want the fastest pickup',
      'Budget-conscious travel',
    ],
    useCases: 'Office commute, quick errands, college travel, last-mile connectivity',
    providers: ['Rapido', 'Ola', 'Uber'],
    priceRange: '₹40–₹180',
    avgEta: '3–6 min',
    passengers: '1',
    href: '/compare-rides?type=bike',
    color: 'text-orange-500',
    bg: 'bg-orange-50 border-orange-100',
    iconBg: 'bg-orange-500',
    btnClass: 'bg-orange-500 hover:bg-orange-600 text-white',
    accentColor: 'bg-orange-500/10 border-orange-200 text-orange-700',
  },
  {
    id: 'rt-auto',
    icon: Zap,
    title: 'Auto',
    tagline: 'Open-air comfort for 1–2 passengers',
    desc: 'Auto-rickshaws are a staple of Indian urban transport. Economical, widely available, and great for short to medium distances with 1–2 passengers.',
    whenToChoose: [
      'Travelling with one companion',
      'Medium distances in city areas',
      'When cab prices are too high',
      'Prefer open-air travel',
    ],
    useCases: 'Local city travel, market trips, school/college commute, neighbourhood errands',
    providers: ['Uber', 'Ola', 'Namma Yatri', 'Rapido'],
    priceRange: '₹60–₹250',
    avgEta: '4–8 min',
    passengers: '1–2',
    href: '/compare-rides?type=auto',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50 border-yellow-100',
    iconBg: 'bg-yellow-500',
    btnClass: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    accentColor: 'bg-yellow-500/10 border-yellow-200 text-yellow-700',
  },
  {
    id: 'rt-cab',
    icon: Car,
    title: 'Cab',
    tagline: 'Comfortable, air-conditioned rides for groups',
    desc: 'Cabs provide the most comfortable ride experience with air conditioning and room for up to 4 passengers. Ideal for longer distances and group travel.',
    whenToChoose: [
      'Travelling with family or colleagues',
      'Longer distances or intercity trips',
      'Airport and station pickups/drops',
      'When comfort is a priority',
    ],
    useCases: 'Airport transfers, corporate travel, family outings, long-distance city trips',
    providers: ['Uber', 'Ola', 'inDrive', 'Bharat Taxi', 'Namma Yatri'],
    priceRange: '₹120–₹600',
    avgEta: '3–7 min',
    passengers: '1–4',
    href: '/compare-rides?type=cab',
    color: 'text-primary',
    bg: 'bg-accent border-primary/20',
    iconBg: 'bg-primary',
    btnClass: 'btn-primary',
    accentColor: 'bg-primary/10 border-primary/20 text-primary',
  },
  {
    id: 'rt-premium',
    icon: Star,
    title: 'Premium',
    tagline: 'Elevated comfort for special journeys',
    desc: 'Premium rides offer higher-end vehicles with additional amenities. Perfect for business travel, important meetings, or when you want a superior experience.',
    whenToChoose: [
      'Business or client meetings',
      'Special occasions or events',
      'Airport travel when presentation matters',
      'When you want extra comfort and space',
    ],
    useCases: 'Corporate travel, business meetings, airport VIP transfers, special occasions',
    providers: ['Uber', 'Ola'],
    priceRange: '₹250–₹900',
    avgEta: '5–12 min',
    passengers: '1–4',
    href: '/compare-rides?type=premium',
    color: 'text-purple-600',
    bg: 'bg-purple-50 border-purple-100',
    iconBg: 'bg-purple-600',
    btnClass: 'bg-purple-600 hover:bg-purple-700 text-white',
    accentColor: 'bg-purple-500/10 border-purple-200 text-purple-700',
  },
];

export default function RideTypesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="gradient-hero py-14 lg:py-20 border-b border-border">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-accent border border-primary/20 rounded-full px-4 py-1.5 mb-5">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">All Ride Types</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark mb-4">
                  Choose the ride that fits your journey.
                </h1>
                <p className="text-secondary text-base max-w-lg">
                  Bike, Auto, Cab, or Premium — compare fares and availability for every ride type across participating providers.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-3">Compare rides now</p>
                <SearchCard variant="compact" />
              </div>
            </div>
          </div>
        </section>

        {/* Ride type cards */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {RIDE_TYPES?.map((rt, i) => {
                const Icon = rt?.icon;
                return (
                  <div
                    key={rt?.id}
                    className={`bg-card border-2 rounded-2xl overflow-hidden ${rt?.bg}`}
                  >
                    <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left: main info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center gap-4 mb-5">
                          <div className={`w-14 h-14 rounded-2xl ${rt?.iconBg} flex items-center justify-center flex-shrink-0`}>
                            <Icon size={26} className="text-white" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-extrabold text-brand-dark">{rt?.title}</h2>
                            <p className="text-sm font-medium text-secondary">{rt?.tagline}</p>
                          </div>
                        </div>

                        <p className="text-sm text-secondary leading-relaxed mb-5">{rt?.desc}</p>

                        {/* Stats row */}
                        <div className="grid grid-cols-3 gap-3 mb-5">
                          {[
                            { icon: IndianRupee, label: 'Typical fare', value: rt?.priceRange },
                            { icon: Clock, label: 'Avg pickup', value: rt?.avgEta },
                            { icon: Users, label: 'Passengers', value: rt?.passengers },
                          ]?.map(({ icon: StatIcon, label, value }) => (
                            <div key={`stat-${rt?.id}-${label}`} className={`rounded-xl border p-3 ${rt?.accentColor}`}>
                              {React.createElement(StatIcon, { size: 14, className: "mb-1" })}
                              <p className="text-xs font-medium opacity-70">{label}</p>
                              <p className="text-sm font-bold">{value}</p>
                            </div>
                          ))}
                        </div>

                        {/* When to choose */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">When to choose {rt?.title}</p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {rt?.whenToChoose?.map((item, wi) => (
                              <li key={`when-${rt?.id}-${wi}`} className="flex items-start gap-2 text-sm text-secondary">
                                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${rt?.iconBg}`} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold">Common use cases:</span> {rt?.useCases}
                        </p>
                      </div>

                      {/* Right: providers + CTA */}
                      <div className="flex flex-col gap-4">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Available on</p>
                          <div className="flex flex-wrap gap-2">
                            {rt?.providers?.map((prov) => (
                              <span key={`prov-${rt?.id}-${prov}`} className="px-3 py-1 bg-card border border-border rounded-lg text-xs font-semibold text-secondary">
                                {prov}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Availability varies by location and provider.
                          </p>
                        </div>

                        <div className="mt-auto pt-4 border-t border-border/60">
                          <Link
                            href={rt?.href}
                            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all active:scale-[0.97] ${rt?.btnClass}`}
                          >
                            Compare {rt?.title} Rides <ArrowRight size={15} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-14 lg:py-20 gradient-hero border-t border-border">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark mb-3">
              Not sure which ride type to pick?
            </h2>
            <p className="text-secondary text-base mb-8 max-w-md mx-auto">
              Enter your trip and Farezy will show you all available options — across every ride type and provider.
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