'use client';
import React, { useState, useEffect } from 'react';
import { Trophy, Zap, Star, ArrowRight, RefreshCw, AlertCircle, Filter } from 'lucide-react';
import Icon from '../../../components/ui/AppIcon';


type RideType = 'bike' | 'auto' | 'cab' | 'premium';
type SortKey = 'cheapest' | 'fastest' | 'best-value';

interface RideResult {
  id: string;
  provider: string;
  initial: string;
  initialBg: string;
  rideType: RideType;
  fare: number;
  etaMin: number;
  badge: 'BEST PRICE' | 'FASTEST' | 'BEST VALUE' | null;
  surgeActive: boolean;
  available: boolean;
}

const ALL_RESULTS: RideResult[] = [
  { id: 'res-rapido-bike', provider: 'Rapido', initial: 'R', initialBg: 'bg-orange-500', rideType: 'bike', fare: 121, etaMin: 5, badge: 'BEST PRICE', surgeActive: false, available: true },
  { id: 'res-uber-auto', provider: 'Uber', initial: 'U', initialBg: 'bg-brand-dark', rideType: 'auto', fare: 156, etaMin: 2, badge: 'FASTEST', surgeActive: false, available: true },
  { id: 'res-indrive-cab', provider: 'inDrive', initial: 'i', initialBg: 'bg-green-600', rideType: 'cab', fare: 137, etaMin: 4, badge: 'BEST VALUE', surgeActive: false, available: true },
  { id: 'res-ola-auto', provider: 'Ola', initial: 'O', initialBg: 'bg-yellow-500', rideType: 'auto', fare: 149, etaMin: 5, badge: null, surgeActive: false, available: true },
  { id: 'res-namma-auto', provider: 'Namma Yatri', initial: 'N', initialBg: 'bg-blue-600', rideType: 'auto', fare: 132, etaMin: 7, badge: null, surgeActive: false, available: true },
  { id: 'res-bharat-cab', provider: 'Bharat Taxi', initial: 'B', initialBg: 'bg-red-600', rideType: 'cab', fare: 168, etaMin: 6, badge: null, surgeActive: true, available: true },
  { id: 'res-uber-cab', provider: 'Uber', initial: 'U', initialBg: 'bg-brand-dark', rideType: 'cab', fare: 189, etaMin: 3, badge: null, surgeActive: true, available: true },
  { id: 'res-ola-cab', provider: 'Ola', initial: 'O', initialBg: 'bg-yellow-500', rideType: 'cab', fare: 175, etaMin: 4, badge: null, surgeActive: false, available: true },
];

const SORT_OPTIONS: { id: SortKey; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: 'cheapest', label: 'Cheapest', icon: Trophy },
  { id: 'fastest', label: 'Fastest Pickup', icon: Zap },
  { id: 'best-value', label: 'Best Value', icon: Star },
];

const FILTER_TYPES: { id: RideType | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'bike', label: 'Bike' },
  { id: 'auto', label: 'Auto' },
  { id: 'cab', label: 'Cab' },
  { id: 'premium', label: 'Premium' },
];

function sortResults(results: RideResult[], sort: SortKey): RideResult[] {
  const sorted = [...results];
  if (sort === 'cheapest') sorted.sort((a, b) => a.fare - b.fare);
  else if (sort === 'fastest') sorted.sort((a, b) => a.etaMin - b.etaMin);
  else {
    sorted.sort((a, b) => {
      const scoreA = a.fare * 0.6 + a.etaMin * 5;
      const scoreB = b.fare * 0.6 + b.etaMin * 5;
      return scoreA - scoreB;
    });
  }
  return sorted;
}

interface ResultsGridProps {
  pickup: string;
  destination: string;
  rideType: RideType;
}

export default function ResultsGrid({ pickup, destination, rideType }: ResultsGridProps) {
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortKey>('cheapest');
  const [filter, setFilter] = useState<RideType | 'all'>('all');
  const [results, setResults] = useState<RideResult[]>([]);

  // Backend integration point: fetch real ride comparison data from API
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setResults(ALL_RESULTS);
      setLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, [pickup, destination, rideType]);

  const filtered = filter === 'all' ? results : results.filter((r) => r.rideType === filter);
  const sorted = sortResults(filtered, sort);
  const cheapestFare = sorted.length > 0 ? Math.min(...sorted.map((r) => r.fare)) : 0;
  const maxFare = sorted.length > 0 ? Math.max(...sorted.map((r) => r.fare)) : 0;

  return (
    <div>
      {/* Trip summary bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-card border border-border rounded-xl">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">From</span>
          <span className="font-bold text-brand-dark truncate max-w-[160px]">{pickup}</span>
        </div>
        <ArrowRight size={14} className="text-muted-foreground flex-shrink-0" />
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">To</span>
          <span className="font-bold text-brand-dark truncate max-w-[160px]">{destination}</span>
        </div>
        {sorted.length > 0 && !loading && (
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{sorted.length} options found</span>
            {maxFare - cheapestFare > 0 && (
              <span className="badge-best-price">Save up to ₹{maxFare - cheapestFare}</span>
            )}
          </div>
        )}
      </div>

      {/* Sort + Filter controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Sort:</span>
          <div className="flex gap-1.5">
            {SORT_OPTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={`sort-${id}`}
                onClick={() => setSort(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  sort === id ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-secondary hover:border-primary/40'
                }`}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:ml-auto">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
            <Filter size={12} /> Filter:
          </span>
          <div className="flex gap-1.5 flex-wrap">
            {FILTER_TYPES.map(({ id, label }) => (
              <button
                key={`filter-${id}`}
                onClick={() => setFilter(id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === id ? 'bg-brand-dark text-white' : 'bg-card border border-border text-secondary hover:border-brand-dark/40'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={`skel-${i}`} className="bg-card border border-border rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="skeleton-pulse w-10 h-10 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton-pulse h-4 w-20 rounded" />
                  <div className="skeleton-pulse h-3 w-14 rounded" />
                </div>
              </div>
              <div className="skeleton-pulse h-8 w-24 rounded" />
              <div className="skeleton-pulse h-3 w-28 rounded" />
              <div className="skeleton-pulse h-10 w-full rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && sorted.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sorted.map((result, idx) => (
            <ResultCard key={result.id} result={result} rank={idx} cheapestFare={cheapestFare} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && sorted.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mb-5">
            <AlertCircle size={28} className="text-destructive" />
          </div>
          <h3 className="text-lg font-bold text-brand-dark mb-2">No rides found for this route</h3>
          <p className="text-sm text-secondary max-w-xs mb-6">
            Try changing your pickup, destination, or ride type. Availability varies by location and time.
          </p>
          <button
            onClick={() => setFilter('all')}
            className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl"
          >
            <RefreshCw size={15} /> Show All Types
          </button>
        </div>
      )}

      {/* Disclaimer */}
      {!loading && sorted.length > 0 && (
        <p className="mt-8 text-xs text-muted-foreground text-center max-w-2xl mx-auto">
          Fares shown are estimates. Actual pricing is determined by the provider at time of booking. Availability may vary by location, demand, and time. Farezy does not control third-party provider pricing.
        </p>
      )}
    </div>
  );
}

function ResultCard({
  result,
  rank,
  cheapestFare,
}: {
  result: RideResult;
  rank: number;
  cheapestFare: number;
}) {
  const savings = result.fare - cheapestFare;
  const isCheapest = savings === 0;

  const badgeMap: Record<string, { cls: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = {
    'BEST PRICE': { cls: 'badge-best-price', icon: Trophy },
    'FASTEST': { cls: 'badge-fastest', icon: Zap },
    'BEST VALUE': { cls: 'badge-best-value', icon: Star },
  };
  const badge = result.badge ? badgeMap[result.badge] : null;

  return (
    <div
      className={`relative bg-card rounded-2xl border-2 p-5 flex flex-col gap-4 provider-card-hover ${
        result.badge === 'BEST PRICE' ? 'border-savings/50' : 'border-border'
      }`}
    >
      {/* Badge */}
      {badge && result.badge && (() => {
        const BadgeIcon = badge.icon;
        return (
          <div className={`absolute -top-3 left-4 flex items-center gap-1 ${badge.cls}`}>
            <BadgeIcon size={11} />
            {result.badge}
          </div>
        );
      })()}

      {/* Provider header */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${result.initialBg} flex items-center justify-center flex-shrink-0`}>
          <span className="text-sm font-black text-white">{result.initial}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-brand-dark">{result.provider}</p>
          <p className="text-xs text-muted-foreground capitalize">{result.rideType}</p>
        </div>
        {result.surgeActive && (
          <span className="text-xs font-semibold text-warning bg-warning/10 px-2 py-0.5 rounded-lg">Surge</span>
        )}
      </div>

      {/* Fare */}
      <div>
        <p className="text-3xl font-black text-brand-dark font-tabular">₹{result.fare}</p>
        {savings > 0 && (
          <p className="text-xs font-semibold text-muted-foreground mt-0.5">₹{savings} more than cheapest</p>
        )}
        {isCheapest && (
          <p className="text-xs font-bold text-savings mt-0.5">Cheapest option</p>
        )}
      </div>

      {/* ETA */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-success flex-shrink-0" />
        <span className="text-xs font-semibold text-secondary">{result.etaMin} min pickup</span>
      </div>

      {/* Continue button */}
      <a
        href="#"
        // Backend integration point: deeplink or redirect to provider app/website
        className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-[0.97] ${
          result.badge === 'BEST PRICE' ? 'btn-savings' : 'btn-primary'
        }`}
        onClick={(e) => e.preventDefault()}
      >
        Continue to {result.provider} <ArrowRight size={13} />
      </a>
    </div>
  );
}