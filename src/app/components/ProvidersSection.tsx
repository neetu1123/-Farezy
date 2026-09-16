import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const PROVIDERS = [
  { id: 'prov-uber', name: 'Uber', initial: 'U', bg: 'bg-brand-dark', color: 'text-white', desc: 'Cab, Auto, Bike' },
  { id: 'prov-ola', name: 'Ola', initial: 'O', bg: 'bg-yellow-500', color: 'text-white', desc: 'Cab, Auto, Bike' },
  { id: 'prov-rapido', name: 'Rapido', initial: 'R', bg: 'bg-orange-500', color: 'text-white', desc: 'Bike, Auto' },
  { id: 'prov-indrive', name: 'inDrive', initial: 'i', bg: 'bg-green-600', color: 'text-white', desc: 'Cab' },
  { id: 'prov-namma', name: 'Namma Yatri', initial: 'N', bg: 'bg-blue-600', color: 'text-white', desc: 'Auto, Cab' },
  { id: 'prov-bharat', name: 'Bharat Taxi', initial: 'B', bg: 'bg-red-600', color: 'text-white', desc: 'Cab' },
];

export default function ProvidersSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark mb-3">
            Compare the ride apps you already use.
          </h2>
          <p className="text-secondary text-base max-w-lg mx-auto">
            Farezy aggregates options from participating providers. Availability may vary by location, ride type and provider.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {PROVIDERS?.map(({ id, name, initial, bg, color, desc }) => (
            <div key={id} className="bg-card border border-border rounded-2xl p-5 text-center provider-card-hover flex flex-col items-center gap-3">
              <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center`}>
                <span className={`text-xl font-black ${color}`}>{initial}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-brand-dark">{name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/ride-providers"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-xl text-sm font-bold hover:bg-accent transition-all"
          >
            View All Providers <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}