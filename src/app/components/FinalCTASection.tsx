import React from 'react';
import SearchCard from '../../components/SearchCard';

export default function FinalCTASection() {
  return (
    <section className="py-16 lg:py-24 gradient-hero border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark mb-4">
            Your next ride could cost less.
          </h2>
          <p className="text-secondary text-base max-w-lg mx-auto">
            Compare before you book with Farezy. Enter your trip below and see available options in seconds.
          </p>
        </div>
        <div className="max-w-lg mx-auto">
          <SearchCard variant="hero" />
        </div>
      </div>
    </section>
  );
}