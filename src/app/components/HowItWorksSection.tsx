import React from 'react';
import Link from 'next/link';
import { MapPin, Search, CheckCircle2, ExternalLink, ArrowRight } from 'lucide-react';
import Icon from '../../components/ui/AppIcon';


const STEPS = [
  {
    id: 'step-enter',
    num: '01',
    icon: MapPin,
    title: 'Enter Your Trip',
    desc: 'Type your pickup location and destination. Select your preferred ride type — bike, auto, cab or premium.',
    color: 'text-primary bg-accent border-primary/20',
  },
  {
    id: 'step-compare',
    num: '02',
    icon: Search,
    title: 'Farezy Compares',
    desc: 'Farezy checks available options from participating ride providers for your route and ride type.',
    color: 'text-savings bg-savings/10 border-savings/30',
  },
  {
    id: 'step-choose',
    num: '03',
    icon: CheckCircle2,
    title: 'Choose Your Best Option',
    desc: 'Compare fares, pickup times, and ride type across providers. Filter by cheapest, fastest, or best value.',
    color: 'text-success bg-success/10 border-success/30',
  },
  {
    id: 'step-book',
    num: '04',
    icon: ExternalLink,
    title: 'Continue to Provider',
    desc: 'Once you pick the option that works for you, continue to the provider&apos;s app to complete your booking.',
    color: 'text-warning bg-warning/10 border-warning/30',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent border border-primary/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Simple Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark mb-4">
            Compare your ride in seconds.
          </h2>
          <p className="text-secondary text-base max-w-lg mx-auto">
            No account needed. No app switching. Just enter your trip and compare.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {STEPS?.map((step, i) => {
            const Icon = step?.icon;
            return (
              <div key={step?.id} className="relative">
                {/* Connector line */}
                {i < STEPS?.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%-12px)] w-6 h-0.5 bg-border z-10" />
                )}
                <div className="bg-card border border-border rounded-2xl p-6 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${step?.color}`}>
                      <Icon size={22} />
                    </div>
                    <span className="text-3xl font-black text-muted-foreground/40 leading-none pt-1">{step?.num}</span>
                  </div>
                  <h3 className="text-base font-bold text-brand-dark mb-2">{step?.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: step?.desc }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact CTA */}
        <div className="bg-accent border border-primary/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-brand-dark mb-1">Ready to compare your next ride?</h3>
            <p className="text-sm text-secondary">Takes less than 10 seconds. No account required.</p>
          </div>
          <Link href="/compare-rides" className="btn-primary flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl whitespace-nowrap">
            Compare Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}