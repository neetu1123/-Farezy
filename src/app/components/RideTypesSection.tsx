import React from 'react';
import Link from 'next/link';
import { Bike, Zap, Car, Star } from 'lucide-react';
import Icon from '../../components/ui/AppIcon';


const RIDE_TYPES = [
  {
    id: 'type-bike',
    icon: Bike,
    title: 'Bike',
    tagline: 'Fast & affordable solo rides',
    desc: 'Ideal for short solo trips through busy city streets. Beat traffic and reach faster.',
    href: '/compare-rides?type=bike',
    color: 'text-orange-500 bg-orange-50 border-orange-100',
    btnClass: 'bg-orange-500 hover:bg-orange-600 text-white',
  },
  {
    id: 'type-auto',
    icon: Zap,
    title: 'Auto',
    tagline: 'Comfortable & open air',
    desc: 'Great for 1–2 passengers. Economical, widely available, and perfect for medium distances.',
    href: '/compare-rides?type=auto',
    color: 'text-yellow-600 bg-yellow-50 border-yellow-100',
    btnClass: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  },
  {
    id: 'type-cab',
    icon: Car,
    title: 'Cab',
    tagline: 'Comfortable for groups',
    desc: 'Air-conditioned, comfortable rides for 1–4 passengers. Perfect for longer distances.',
    href: '/compare-rides?type=cab',
    color: 'text-primary bg-accent border-primary/20',
    btnClass: 'btn-primary',
  },
  {
    id: 'type-premium',
    icon: Star,
    title: 'Premium',
    tagline: 'Superior comfort & class',
    desc: 'Higher-end vehicles for a premium travel experience. Great for business or special occasions.',
    href: '/compare-rides?type=premium',
    color: 'text-purple-600 bg-purple-50 border-purple-100',
    btnClass: 'bg-purple-600 hover:bg-purple-700 text-white',
  },
];

export default function RideTypesSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/40">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark mb-3">
            Choose the ride that fits your journey.
          </h2>
          <p className="text-secondary text-base max-w-lg mx-auto">
            From quick bike rides to premium cabs — compare options across all ride types.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RIDE_TYPES?.map(({ id, icon: Icon, title, tagline, desc, href, color, btnClass }) => (
            <div key={id} className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4 provider-card-hover">
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${color}`}>
                <Icon size={22} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-brand-dark mb-0.5">{title}</h3>
                <p className="text-xs font-semibold text-muted-foreground mb-2">{tagline}</p>
                <p className="text-sm text-secondary leading-relaxed">{desc}</p>
              </div>
              <Link
                href={href}
                className={`w-full flex items-center justify-center py-2.5 rounded-xl text-sm font-bold transition-all active:scale-[0.97] ${btnClass}`}
              >
                Compare {title} Rides
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/ride-types" className="text-sm font-semibold text-primary hover:underline">
            Learn more about ride types →
          </Link>
        </div>
      </div>
    </section>
  );
}