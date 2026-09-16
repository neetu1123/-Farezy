import React from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const OLD_WAY = [
  { app: 'Uber', action: 'Open app. Check price. ₹156.' },
  { app: 'Ola', action: 'Open app. Check price. ₹149.' },
  { app: 'Rapido', action: 'Open app. Check price. ₹121.' },
  { app: 'inDrive', action: 'Open app. Check price. ₹137.' },
];

const NEW_WAY = [
  'Enter pickup once',
  'Enter destination once',
  'Choose ride type',
  'Farezy compares all options',
  'Pick the best fare',
];

export default function ValuePropSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/40">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark mb-4">
            Stop checking ride apps one by one.
          </h2>
          <p className="text-secondary text-base max-w-xl mx-auto">
            The average commuter checks 3–4 ride apps before booking. That&apos;s 3–4 minutes of switching, comparing, and deciding. There&apos;s a smarter way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Before */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                <X size={16} className="text-destructive" />
              </div>
              <h3 className="text-lg font-bold text-destructive">Without Farezy</h3>
            </div>
            <div className="space-y-3">
              {OLD_WAY?.map((item) => (
                <div key={`old-${item?.app}`} className="flex items-start gap-3 p-3 bg-white/60 rounded-xl border border-destructive/10">
                  <div className="w-6 h-6 rounded-md bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-black text-destructive">{item?.app?.[0]}</span>
                  </div>
                  <p className="text-sm text-foreground">{item?.action}</p>
                </div>
              ))}
              <div className="p-3 bg-destructive/10 rounded-xl border border-destructive/20 text-center">
                <p className="text-sm font-semibold text-destructive">
                  4 apps opened. 4–5 minutes wasted. Still not sure which is best.
                </p>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="bg-success/5 border border-success/20 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 size={16} className="text-success" />
              </div>
              <h3 className="text-lg font-bold text-success">With Farezy</h3>
            </div>
            <div className="space-y-3">
              {NEW_WAY?.map((step, i) => (
                <div key={`new-${i}`} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-success/10">
                  <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-black text-white">{i + 1}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{step}</p>
                </div>
              ))}
              <div className="p-3 bg-success/10 rounded-xl border border-success/20 text-center">
                <p className="text-sm font-bold text-success">
                  One search. Multiple options. Best fare found in seconds.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/compare-rides" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-xl">
            Try Farezy Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}