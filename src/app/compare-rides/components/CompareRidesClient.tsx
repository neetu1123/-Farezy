'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchCard from '../../../components/SearchCard';
import ResultsGrid from './ResultsGrid';
import { MapPin } from 'lucide-react';

function CompareRidesInner() {
  const params = useSearchParams();
  const pickup = params.get('pickup') || '';
  const destination = params.get('destination') || '';
  const type = (params.get('type') || 'cab') as 'bike' | 'auto' | 'cab' | 'premium';

  const hasSearch = pickup && destination;

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-dark mb-2">Compare Rides</h1>
        <p className="text-secondary text-sm">
          Enter your trip details to compare available ride options across participating providers.
        </p>
      </div>

      {/* Search form */}
      <div className="mb-10">
        <SearchCard
          variant="hero"
          defaultPickup={pickup}
          defaultDestination={destination}
          defaultRideType={type}
        />
      </div>

      {/* Results */}
      {hasSearch ? (
        <ResultsGrid pickup={pickup} destination={destination} rideType={type} />
      ) : (
        <EmptySearchState />
      )}
    </div>
  );
}

function EmptySearchState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-accent border border-primary/20 flex items-center justify-center mb-5">
        <MapPin size={28} className="text-primary" />
      </div>
      <h3 className="text-lg font-bold text-brand-dark mb-2">Enter your trip above</h3>
      <p className="text-sm text-secondary max-w-xs">
        Add a pickup location and destination to compare available ride options from participating providers.
      </p>
    </div>
  );
}

export default function CompareRidesClient() {
  return (
    <Suspense fallback={<div className="max-w-screen-xl mx-auto px-4 py-20 text-center text-secondary">Loading...</div>}>
      <CompareRidesInner />
    </Suspense>
  );
}