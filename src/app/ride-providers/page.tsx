import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StickyMobileCTA from '../../components/StickyMobileCTA';
import SearchCard from '../../components/SearchCard';
import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';

const PROVIDERS = [
  {
    id: 'prov-uber',
    name: 'Uber',
    initial: 'U',
    bg: 'bg-brand-dark',
    textColor: 'text-white',
    tagline: 'Reliable rides at the tap of a button',
    desc: 'Uber is one of the most widely available ride-hailing platforms in India, offering multiple ride categories across major cities.',
    categories: ['Cab', 'Auto', 'Bike', 'Premium', 'Intercity'],
    slug: 'uber',
  },
  {
    id: 'prov-ola',
    name: 'Ola',
    initial: 'O',
    bg: 'bg-yellow-500',
    textColor: 'text-white',
    tagline: "India\'s homegrown ride platform",
    desc: 'Ola operates across hundreds of Indian cities, providing auto, cab, and bike options with localized pricing.',
    categories: ['Cab', 'Auto', 'Bike', 'Outstation'],
    slug: 'ola',
  },
  {
    id: 'prov-rapido',
    name: 'Rapido',
    initial: 'R',
    bg: 'bg-orange-500',
    textColor: 'text-white',
    tagline: 'Fast, affordable bike rides for the city',
    desc: 'Rapido specializes in two-wheeler rides, offering one of the most affordable options for solo urban commuters.',
    categories: ['Bike', 'Auto'],
    slug: 'rapido',
  },
  {
    id: 'prov-indrive',
    name: 'inDrive',
    initial: 'i',
    bg: 'bg-green-600',
    textColor: 'text-white',
    tagline: 'Negotiate your fare, your way',
    desc: 'inDrive uses a unique fare negotiation model, letting riders propose a fare and drivers accept or counter-offer.',
    categories: ['Cab'],
    slug: 'indrive',
  },
  {
    id: 'prov-namma',
    name: 'Namma Yatri',
    initial: 'N',
    bg: 'bg-blue-600',
    textColor: 'text-white',
    tagline: 'Open-source mobility for everyone',
    desc: 'Namma Yatri is an open network-based platform popular in South India, particularly in Bengaluru, for auto and cab rides.',
    categories: ['Auto', 'Cab'],
    slug: 'namma-yatri',
  },
  {
    id: 'prov-bharat',
    name: 'Bharat Taxi',
    initial: 'B',
    bg: 'bg-red-600',
    textColor: 'text-white',
    tagline: 'Cab rides across tier-1 and tier-2 cities',
    desc: 'Bharat Taxi focuses on providing cab services across Indian cities, with an emphasis on reliability and coverage.',
    categories: ['Cab', 'Outstation'],
    slug: 'bharat-taxi',
  },
];

export default function RideProvidersPage() {
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
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">Participating Providers</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark mb-4">
                  Compare the ride apps you already use.
                </h1>
                <p className="text-secondary text-base mb-6 max-w-lg">
                  Farezy helps you compare available options from participating providers. Enter your trip once and see who has the best fare for your journey.
                </p>
                <div className="flex items-start gap-2 bg-accent/80 border border-primary/20 rounded-xl p-3 text-xs text-secondary max-w-md">
                  <Info size={14} className="text-primary flex-shrink-0 mt-0.5" />
                  <span>Availability may vary by location, ride type and provider. Farezy does not guarantee provider availability in your area.</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-3">Compare providers for your trip</p>
                <SearchCard variant="compact" />
              </div>
            </div>
          </div>
        </section>

        {/* Provider grid */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-brand-dark mb-8">
              Participating Providers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROVIDERS?.map((prov) => (
                <div key={prov?.id} className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4 provider-card-hover">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${prov?.bg} flex items-center justify-center flex-shrink-0`}>
                      <span className={`text-2xl font-black ${prov?.textColor}`}>{prov?.initial}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-brand-dark">{prov?.name}</h3>
                      <p className="text-xs text-muted-foreground">{prov?.tagline}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-secondary leading-relaxed flex-1">{prov?.desc}</p>

                  {/* Categories */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Ride Categories</p>
                    <div className="flex flex-wrap gap-1.5">
                      {prov?.categories?.map((cat) => (
                        <span key={`cat-${prov?.id}-${cat}`} className="px-2.5 py-1 bg-muted rounded-lg text-xs font-semibold text-secondary border border-border">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/compare-rides`}
                    className="btn-primary flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold"
                  >
                    Compare {prov?.name} <ArrowRight size={15} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-14 lg:py-20 bg-muted/40 border-t border-border">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark mb-3">
              See all providers for your trip
            </h2>
            <p className="text-secondary text-base mb-8 max-w-md mx-auto">
              Enter your route and Farezy will show you available options from participating providers.
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