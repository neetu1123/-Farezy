'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Navigation, ArrowLeftRight, Search, X, Bike, Car, Zap, Star } from 'lucide-react';
// import Icon from '@/components/ui/AppIcon';


export type RideType = 'bike' | 'auto' | 'cab' | 'premium';

interface Location {
  name: string;
  area: string;
  full: string;
}

interface SearchCardProps {
  variant?: 'hero' | 'compact';
  defaultPickup?: string;
  defaultDestination?: string;
  defaultRideType?: RideType;
  className?: string;
}

const POPULAR_LOCATIONS: Location[] = [
  { name: 'Bandra Kurla Complex', area: 'Mumbai, Maharashtra', full: 'Bandra Kurla Complex, Mumbai' },
  { name: 'Connaught Place', area: 'New Delhi', full: 'Connaught Place, New Delhi' },
  { name: 'Koramangala', area: 'Bengaluru, Karnataka', full: 'Koramangala, Bengaluru' },
  { name: 'Hitech City', area: 'Hyderabad, Telangana', full: 'Hitech City, Hyderabad' },
  { name: 'T. Nagar', area: 'Chennai, Tamil Nadu', full: 'T. Nagar, Chennai' },
  { name: 'Andheri West', area: 'Mumbai, Maharashtra', full: 'Andheri West, Mumbai' },
  { name: 'Indiranagar', area: 'Bengaluru, Karnataka', full: 'Indiranagar, Bengaluru' },
  { name: 'Sector 18', area: 'Noida, Uttar Pradesh', full: 'Sector 18, Noida' },
  { name: 'Salt Lake', area: 'Kolkata, West Bengal', full: 'Salt Lake, Kolkata' },
  { name: 'Aundh', area: 'Pune, Maharashtra', full: 'Aundh, Pune' },
];

const RIDE_TYPES: { id: RideType; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: 'bike', label: 'Bike', icon: Bike },
  { id: 'auto', label: 'Auto', icon: Zap },
  { id: 'cab', label: 'Cab', icon: Car },
  { id: 'premium', label: 'Premium', icon: Star },
];

function filterLocations(query: string): Location[] {
  if (!query) return POPULAR_LOCATIONS.slice(0, 5);
  const q = query.toLowerCase();
  return POPULAR_LOCATIONS.filter(
    (l) => l.name.toLowerCase().includes(q) || l.area.toLowerCase().includes(q)
  ).slice(0, 5);
}

export default function SearchCard({
  variant = 'hero',
  defaultPickup = '',
  defaultDestination = '',
  defaultRideType = 'cab',
  className = '',
}: SearchCardProps) {
  const router = useRouter();
  const [pickup, setPickup] = useState(defaultPickup);
  const [destination, setDestination] = useState(defaultDestination);
  const [rideType, setRideType] = useState<RideType>(defaultRideType);
  const [pickupFocused, setPickupFocused] = useState(false);
  const [destFocused, setDestFocused] = useState(false);
  const [pickupError, setPickupError] = useState('');
  const [destError, setDestError] = useState('');
  const [locatingMe, setLocatingMe] = useState(false);

  const pickupRef = useRef<HTMLInputElement>(null);
  const destRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pickupSuggestions = filterLocations(pickup);
  const destSuggestions = filterLocations(destination);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPickupFocused(false);
        setDestFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSwap = () => {
    const tmp = pickup;
    setPickup(destination);
    setDestination(tmp);
    setPickupError('');
    setDestError('');
  };

  const handleCurrentLocation = () => {
    setLocatingMe(true);
    // Backend integration point: navigator.geolocation + reverse geocoding API
    setTimeout(() => {
      setPickup('Current Location');
      setLocatingMe(false);
      setPickupFocused(false);
    }, 900);
  };

  const handleCompare = () => {
    let valid = true;
    if (!pickup.trim()) {
      setPickupError('Please enter a pickup location');
      valid = false;
    } else {
      setPickupError('');
    }
    if (!destination.trim()) {
      setDestError('Please enter a destination');
      valid = false;
    } else {
      setDestError('');
    }
    if (!valid) return;
    // Navigate to compare-rides with query params
    const params = new URLSearchParams({ pickup, destination, type: rideType });
    router.push(`/compare-rides?${params.toString()}`);
  };

  const isHero = variant === 'hero';

  return (
    <div
      ref={dropdownRef}
      className={`bg-card rounded-xl shadow-hero border border-border/60 ${isHero ? 'p-6 sm:p-8' : 'p-4 sm:p-5'} ${className}`}
    >
      {isHero && (
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-5">
          Where are you going?
        </p>
      )}

      <div className="flex flex-col gap-3">
        {/* Pickup + Destination container */}
        <div className="relative flex flex-col gap-2">
          {/* Route indicator line */}
          <div className="absolute left-[18px] top-[44px] bottom-[44px] w-0.5 bg-gradient-to-b from-primary to-savings z-0 hidden sm:block" />

          {/* Pickup field */}
          <div className="relative">
            <div className={`flex items-center gap-3 input-field px-4 ${isHero ? 'py-3.5' : 'py-3'} cursor-text ${pickupError ? 'border-destructive' : ''}`}>
              <div className="route-dot-blue flex-shrink-0 z-10" />
              <input
                ref={pickupRef}
                type="text"
                value={pickup}
                onChange={(e) => { setPickup(e.target.value); setPickupError(''); }}
                onFocus={() => { setPickupFocused(true); setDestFocused(false); }}
                placeholder="Pickup location"
                className={`flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground ${isHero ? 'text-base' : 'text-sm'} font-medium`}
              />
              {pickup && (
                <button onClick={() => { setPickup(''); setPickupError(''); pickupRef.current?.focus(); }} className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
                  <X size={15} />
                </button>
              )}
            </div>
            {pickupError && <p className="text-xs text-destructive mt-1 ml-1">{pickupError}</p>}

            {/* Pickup dropdown */}
            {pickupFocused && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-slide-down">
                <button
                  onMouseDown={(e) => { e.preventDefault(); handleCurrentLocation(); }}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-accent transition-colors border-b border-border"
                >
                  <Navigation size={15} className="text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-primary">
                    {locatingMe ? 'Locating...' : 'Use current location'}
                  </span>
                </button>
                {pickupSuggestions.map((loc) => (
                  <button
                    key={`pickup-sug-${loc.full}`}
                    onMouseDown={(e) => { e.preventDefault(); setPickup(loc.full); setPickupFocused(false); }}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-accent transition-colors text-left"
                  >
                    <MapPin size={14} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{loc.name}</p>
                      <p className="text-xs text-muted-foreground">{loc.area}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap button */}
          <div className="flex justify-end pr-1">
            <button
              onClick={handleSwap}
              className="w-8 h-8 rounded-full bg-muted hover:bg-accent border border-border flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              title="Swap pickup and destination"
            >
              <ArrowLeftRight size={14} className="text-secondary" />
            </button>
          </div>

          {/* Destination field */}
          <div className="relative">
            <div className={`flex items-center gap-3 input-field px-4 ${isHero ? 'py-3.5' : 'py-3'} cursor-text ${destError ? 'border-destructive' : ''}`}>
              <div className="route-dot-green flex-shrink-0 z-10" />
              <input
                ref={destRef}
                type="text"
                value={destination}
                onChange={(e) => { setDestination(e.target.value); setDestError(''); }}
                onFocus={() => { setDestFocused(true); setPickupFocused(false); }}
                placeholder="Where to?"
                className={`flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground ${isHero ? 'text-base' : 'text-sm'} font-medium`}
              />
              {destination && (
                <button onClick={() => { setDestination(''); setDestError(''); destRef.current?.focus(); }} className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
                  <X size={15} />
                </button>
              )}
            </div>
            {destError && <p className="text-xs text-destructive mt-1 ml-1">{destError}</p>}

            {/* Destination dropdown */}
            {destFocused && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-slide-down">
                {destSuggestions.map((loc) => (
                  <button
                    key={`dest-sug-${loc.full}`}
                    onMouseDown={(e) => { e.preventDefault(); setDestination(loc.full); setDestFocused(false); }}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-accent transition-colors text-left"
                  >
                    <MapPin size={14} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{loc.name}</p>
                      <p className="text-xs text-muted-foreground">{loc.area}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Ride type selector */}
        <div>
          {isHero && <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2.5">Ride Type</p>}
          <div className="grid grid-cols-4 gap-2">
            {RIDE_TYPES.map(({ id, label, icon: Icon }) => (
              <button
                key={`ridetype-${id}`}
                onClick={() => setRideType(id)}
                className={`flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-xl border-2 transition-all duration-150 ${
                  rideType === id
                    ? 'border-primary bg-accent text-primary' :'border-border bg-muted/40 text-secondary hover:border-primary/40 hover:bg-accent/60'
                }`}
              >
                <Icon size={isHero ? 20 : 16} />
                <span className={`font-semibold ${isHero ? 'text-xs' : 'text-xs'}`}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Compare button */}
        <button
          onClick={handleCompare}
          className={`btn-primary w-full flex items-center justify-center gap-2.5 font-bold rounded-xl transition-all duration-150 active:scale-[0.98] ${isHero ? 'py-4 text-base' : 'py-3 text-sm'}`}
        >
          <Search size={isHero ? 18 : 16} />
          Compare Rides
        </button>
      </div>
    </div>
  );
}