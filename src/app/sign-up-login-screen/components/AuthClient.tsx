'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import AppLogo from '../../../components/ui/AppLogo';
import {
  Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2,
  Copy, Check, MapPin, TrendingDown, Shield
} from 'lucide-react';
import Icon from '../../../components/ui/AppIcon';


type AuthTab = 'login' | 'signup';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

const DEMO_CREDENTIALS = {
  email: 'priya.sharma@farezy.in',
  password: 'FarezyDemo@2026',
};

const BRAND_FEATURES = [
  { icon: TrendingDown, text: 'Compare fares across 6+ providers instantly' },
  { icon: MapPin, text: 'Enter your trip once — see all available options' },
  { icon: Shield, text: 'No account needed for basic comparison' },
  { icon: CheckCircle2, text: 'Save favourite routes and recent searches' },
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="p-1.5 rounded-lg hover:bg-white/20 transition-colors flex-shrink-0"
      title="Copy to clipboard"
    >
      {copied ? <Check size={13} className="text-savings" /> : <Copy size={13} className="text-white/60" />}
    </button>
  );
}

function LoginForm({ onAutofill }: { onAutofill: (email: string, password: string) => void }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginForm>();

  const [showPass, setShowPass] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    // Backend integration point: POST /api/auth/login
    await new Promise((r) => setTimeout(r, 1000));
    if (data.email !== DEMO_CREDENTIALS.email || data.password !== DEMO_CREDENTIALS.password) {
      setError('root', {
        message: 'Invalid credentials — use the demo account below to sign in',
      });
      return;
    }
    setSuccess(true);
  };

  const handleAutofill = () => {
    setValue('email', DEMO_CREDENTIALS.email);
    setValue('password', DEMO_CREDENTIALS.password);
    onAutofill(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center">
          <CheckCircle2 size={32} className="text-success" />
        </div>
        <h3 className="text-lg font-bold text-brand-dark">Welcome back!</h3>
        <p className="text-sm text-secondary">You are now signed in to Farezy.</p>
        <Link href="/" className="btn-primary px-6 py-2.5 text-sm font-bold rounded-xl">
          Go to Homepage
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Root error */}
      {errors.root && (
        <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-xl text-sm text-destructive font-medium animate-fade-in">
          {errors.root.message}
        </div>
      )}

      {/* Email */}
      <div>
        <label htmlFor="login-email" className="block text-sm font-semibold text-brand-dark mb-1.5">
          Email address
        </label>
        <div className="relative">
          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
            })}
            className={`input-field w-full pl-10 pr-4 py-3 text-sm ${errors.email ? 'border-destructive' : ''}`}
          />
        </div>
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="login-password" className="block text-sm font-semibold text-brand-dark">
            Password
          </label>
          <a href="#" className="text-xs font-semibold text-primary hover:underline">
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            id="login-password"
            type={showPass ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
            className={`input-field w-full pl-10 pr-11 py-3 text-sm ${errors.password ? 'border-destructive' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
      </div>

      {/* Remember me */}
      <div className="flex items-center gap-2.5">
        <input
          id="remember-me"
          type="checkbox"
          {...register('rememberMe')}
          className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30"
        />
        <label htmlFor="remember-me" className="text-sm text-secondary">
          Remember me for 30 days
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            Sign In <ArrowRight size={16} />
          </>
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground font-medium">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Google */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 py-3 border border-border rounded-xl text-sm font-semibold text-brand-dark hover:bg-muted transition-all active:scale-[0.98]"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
          <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
          <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
          <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>

      {/* Demo credentials */}
      <div className="bg-brand-dark rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-white/70 uppercase tracking-wider">Demo Account</p>
          <button
            type="button"
            onClick={handleAutofill}
            className="text-xs font-bold text-savings hover:text-savings/80 transition-colors"
          >
            Autofill →
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 bg-white/5 rounded-lg px-3 py-2">
            <div className="min-w-0">
              <p className="text-xs text-white/40 mb-0.5">Email</p>
              <p className="text-xs font-mono text-white truncate">{DEMO_CREDENTIALS.email}</p>
            </div>
            <CopyButton value={DEMO_CREDENTIALS.email} />
          </div>
          <div className="flex items-center justify-between gap-2 bg-white/5 rounded-lg px-3 py-2">
            <div className="min-w-0">
              <p className="text-xs text-white/40 mb-0.5">Password</p>
              <p className="text-xs font-mono text-white">{DEMO_CREDENTIALS.password}</p>
            </div>
            <CopyButton value={DEMO_CREDENTIALS.password} />
          </div>
        </div>
      </div>
    </form>
  );
}

function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>();

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const password = watch('password');

  const onSubmit = async (data: SignupForm) => {
    // Backend integration point: POST /api/auth/signup
    await new Promise((r) => setTimeout(r, 1200));
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center">
          <CheckCircle2 size={32} className="text-success" />
        </div>
        <h3 className="text-lg font-bold text-brand-dark">Account created!</h3>
        <p className="text-sm text-secondary max-w-xs">Welcome to Farezy. Start comparing rides to find your best fare.</p>
        <Link href="/compare-rides" className="btn-primary px-6 py-2.5 text-sm font-bold rounded-xl">
          Compare Rides Now
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* Name */}
      <div>
        <label htmlFor="signup-name" className="block text-sm font-semibold text-brand-dark mb-1.5">
          Full name
        </label>
        <div className="relative">
          <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            placeholder="Priya Sharma"
            {...register('name', {
              required: 'Full name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
            className={`input-field w-full pl-10 pr-4 py-3 text-sm ${errors.name ? 'border-destructive' : ''}`}
          />
        </div>
        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="signup-email" className="block text-sm font-semibold text-brand-dark mb-1.5">
          Email address
        </label>
        <div className="relative">
          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
            })}
            className={`input-field w-full pl-10 pr-4 py-3 text-sm ${errors.email ? 'border-destructive' : ''}`}
          />
        </div>
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="signup-password" className="block text-sm font-semibold text-brand-dark mb-1.5">
          Password
        </label>
        <p className="text-xs text-muted-foreground mb-1.5">At least 8 characters with a number or symbol</p>
        <div className="relative">
          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            id="signup-password"
            type={showPass ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Create a strong password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
              pattern: {
                value: /^(?=.*[0-9!@#$%^&*])/,
                message: 'Include at least one number or symbol',
              },
            })}
            className={`input-field w-full pl-10 pr-11 py-3 text-sm ${errors.password ? 'border-destructive' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
      </div>

      {/* Confirm password */}
      <div>
        <label htmlFor="signup-confirm" className="block text-sm font-semibold text-brand-dark mb-1.5">
          Confirm password
        </label>
        <div className="relative">
          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            id="signup-confirm"
            type={showConfirm ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Re-enter your password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (val: string) => val === password || 'Passwords do not match',
            })}
            className={`input-field w-full pl-10 pr-11 py-3 text-sm ${errors.confirmPassword ? 'border-destructive' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.confirmPassword && <p className="mt-1 text-xs text-destructive">{errors.confirmPassword.message}</p>}
      </div>

      {/* Terms */}
      <div className="flex items-start gap-2.5">
        <input
          id="agree-terms"
          type="checkbox"
          {...register('agreeTerms', { required: 'You must agree to the terms to continue' })}
          className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 mt-0.5 flex-shrink-0"
        />
        <label htmlFor="agree-terms" className="text-sm text-secondary leading-relaxed">
          I agree to Farezy&apos;s{' '}
          <a href="#" className="text-primary font-semibold hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-primary font-semibold hover:underline">Privacy Policy</a>
        </label>
      </div>
      {errors.agreeTerms && <p className="text-xs text-destructive -mt-2">{errors.agreeTerms.message}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Creating account...
          </>
        ) : (
          <>
            Create Account <ArrowRight size={16} />
          </>
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground font-medium">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Google */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 py-3 border border-border rounded-xl text-sm font-semibold text-brand-dark hover:bg-muted transition-all active:scale-[0.98]"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
          <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
          <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
          <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
        </svg>
        Sign up with Google
      </button>
    </form>
  );
}

export default function AuthClient() {
  const [tab, setTab] = useState<AuthTab>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleAutofill = (email: string, password: string) => {
    setLoginEmail(email);
    setLoginPassword(password);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-[45%] gradient-brand flex-col justify-between p-10 xl:p-14 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/3 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-savings/10 blur-3xl" />
        </div>

        {/* Top: logo */}
        <div className="relative flex items-center gap-3">
          <AppLogo size={40} />
          <span className="font-extrabold text-2xl tracking-tight text-white">Farezy</span>
        </div>

        {/* Middle: hero text */}
        <div className="relative">
          <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight mb-4">
            Compare Every Ride.<br />
            <span className="text-savings">Find the Best Fare.</span>
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-8 max-w-sm">
            One search. Multiple ride options. One smarter choice. Join thousands of commuters who compare before they book.
          </p>

          {/* Features list */}
          <div className="space-y-3">
            {BRAND_FEATURES.map(({ icon: Icon, text }) => (
              <div key={`bf-${text}`} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-savings" />
                </div>
                <p className="text-sm text-white/80 font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: example comparison card */}
        <div className="relative bg-white/8 border border-white/15 rounded-2xl p-4 backdrop-blur-sm">
          <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Example comparison</p>
          <div className="space-y-2">
            {[
              { name: 'Rapido', fare: '₹121', type: 'Bike', badge: true },
              { name: 'inDrive', fare: '₹137', type: 'Cab', badge: false },
              { name: 'Uber', fare: '₹156', type: 'Auto', badge: false },
            ].map((item) => (
              <div key={`auth-ex-${item.name}`} className={`flex items-center justify-between p-2.5 rounded-xl ${item.badge ? 'bg-savings/20 border border-savings/40' : 'bg-white/5 border border-white/10'}`}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                    <span className="text-xs font-black text-white">{item.name[0]}</span>
                  </div>
                  <span className="text-xs font-semibold text-white">{item.name}</span>
                  <span className="text-xs text-white/50">{item.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-black font-tabular ${item.badge ? 'text-savings' : 'text-white'}`}>{item.fare}</span>
                  {item.badge && <span className="badge-best-price text-xs">BEST</span>}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/40 mt-2 text-center">Demo values only</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20 overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2.5 mb-8">
          <AppLogo size={32} />
          <span className="font-extrabold text-lg tracking-tight text-brand-dark">Farezy</span>
        </div>

        <div className="w-full max-w-md mx-auto lg:mx-0">
          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-dark mb-1.5">
              {tab === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-sm text-secondary">
              {tab === 'login' ?'Sign in to access your saved routes and preferences.' :'Join Farezy to save routes, track savings, and compare faster.'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-muted rounded-xl mb-7">
            {(['login', 'signup'] as AuthTab[]).map((t) => (
              <button
                key={`auth-tab-${t}`}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-150 ${
                  tab === t
                    ? 'bg-card text-brand-dark shadow-sm-custom'
                    : 'text-secondary hover:text-foreground'
                }`}
              >
                {t === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Form */}
          {tab === 'login' ? (
            <LoginForm onAutofill={handleAutofill} />
          ) : (
            <SignupForm />
          )}

          {/* Switch */}
          <p className="mt-6 text-center text-sm text-secondary">
            {tab === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <button onClick={() => setTab('signup')} className="text-primary font-semibold hover:underline">
                  Sign up free
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button onClick={() => setTab('login')} className="text-primary font-semibold hover:underline">
                  Log in
                </button>
              </>
            )}
          </p>

          {/* Guest CTA */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground mb-3">No account needed for basic comparison</p>
            <Link
              href="/compare-rides"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              Compare rides without an account →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}