import React from 'react';
import Link from 'next/link';
import { TrendingDown, ArrowRight } from 'lucide-react';

export default function SavingsSection() {
  return (
    <section className="py-16 lg:py-24 gradient-brand text-white relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/3 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-savings/10 blur-3xl" />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
            <TrendingDown size={14} className="text-savings" />
            <span className="text-xs font-semibold text-savings uppercase tracking-wider">Smart Savings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Why pay more for the same journey?
          </h2>
          <p className="text-white/70 text-base max-w-xl mx-auto">
            Fares vary across providers based on demand, time, and availability. Farezy helps you see the difference before you decide.
          </p>
        </div>

        {/* Fare comparison visual */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: 'Rapido', fare: 121, type: 'Bike', highlight: true },
              { name: 'inDrive', fare: 137, type: 'Cab', highlight: false },
              { name: 'Ola', fare: 149, type: 'Auto', highlight: false },
              { name: 'Uber', fare: 156, type: 'Auto', highlight: false },
            ]?.map((item) => (
              <div
                key={`savings-${item?.name}`}
                className={`rounded-xl p-4 text-center border ${
                  item?.highlight
                    ? 'bg-savings/20 border-savings/50' :'bg-white/5 border-white/10'
                }`}
              >
                <p className="text-xs font-semibold text-white/60 mb-1">{item?.name}</p>
                <p className={`text-2xl font-black font-tabular mb-0.5 ${item?.highlight ? 'text-savings' : 'text-white'}`}>
                  ₹{item?.fare}
                </p>
                <p className="text-xs text-white/50">{item?.type}</p>
                {item?.highlight && (
                  <span className="inline-block mt-1.5 badge-best-price text-xs">BEST</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <p className="text-white/60 text-sm mb-1">You could save up to</p>
            <p className="text-5xl font-black text-savings font-tabular">₹35</p>
            <p className="text-white/50 text-xs mt-1">vs. the most expensive option on this example trip</p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/compare-rides" className="btn-savings inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-xl">
            Compare My Ride <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}