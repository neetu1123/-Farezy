import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StickyMobileCTA from '../../components/StickyMobileCTA';
import CompareRidesClient from './components/CompareRidesClient';

export default function CompareRidesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-20">
        <CompareRidesClient />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}