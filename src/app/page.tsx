import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from './components/HeroSection';
import ComparisonPreview from './components/ComparisonPreview';
import ValuePropSection from './components/ValuePropSection';
import HowItWorksSection from './components/HowItWorksSection';
import RideTypesSection from './components/RideTypesSection';
import ProvidersSection from './components/ProvidersSection';
import SavingsSection from './components/SavingsSection';
import FinalCTASection from './components/FinalCTASection';
import MobileHomeScreen from './components/MobileHomeScreen';

export default function HomePage() {
  return (
    <>
      <MobileHomeScreen />

      <div className="desktop-home min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <ComparisonPreview />
          <ValuePropSection />
          <HowItWorksSection />
          <SavingsSection />
          <RideTypesSection />
          <ProvidersSection />
          <FinalCTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}