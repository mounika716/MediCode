import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Galaxy from '../components/animations/Galaxy';
import CursorLayer from '../components/layout/CursorLayer';
import ShinyText from '../components/text/ShinyText';
import SplitText from '../components/text/SplitText';
import SpecularButton from '../components/ui-custom/SpecularButton';
import ErrorBoundary from '../components/ErrorBoundary';

const FEATURES = [
  { label: 'Clinical Note Summarizer', accent: '#8b5cf6' },
  { label: 'Lab Report Explainer', accent: '#22d3ee' },
  { label: 'Smart Triage Assistant', accent: '#f97316' },
  { label: 'Medication Interaction Check', accent: '#ef4444' },
  { label: 'Resource Forecast', accent: '#10b981' },
];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', college: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const data = await register(form);
      if (data && data.token) { navigate('/dashboard'); return; }
      navigate('/verify-email', { state: { email: form.email } });
    } catch (err) {
      setError(err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Registration failed.');
    } finally {
      setBusy(false);
    }
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="relative min-h-screen bg-[#050507] text-white overflow-hidden">
      <CursorLayer />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ErrorBoundary silent>
          <Galaxy color1="#5227FF" color2="#00FFB2" color3="#B497CF" speed={0.35} density={1.0} />
        </ErrorBoundary>
      </div>
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 40%, transparent 0%, rgba(5,5,7,0.6) 60%, #050507 100%)' }} />
      <div className="relative z-10 min-h-screen flex flex-col">
        <nav className="px-6 h-16 flex items-center justify-between max-w-7xl mx-auto w-full">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <span className="text-black font-bold text-sm">M</span>
            </div>
            <span className="font-bold tracking-tight text-sm">MediCode</span>
          </Link>
          <Link to="/login" className="text-[13px] text-white/60 hover:text-white transition">
            Already have an account? <span className="text-white underline underline-offset-4">Sign in</span>
          </Link>
        </nav>
        <div className="flex-1 grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto w-full px-6 py-12">
          <div className="hidden lg:flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-px bg-white/20" />
              <ShinyText text="GET STARTED" speed={4} className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono" />
            </div>
            <h1 className="text-6xl xl:text-7xl font-bold tracking-tighter leading-[1.02] mb-6">
              <span className="text-white">Join </span>
              <span className="bg-gradient-to-br from-red-400 via-red-500 to-red-700 bg-clip-text text-transparent">MediCode</span>
            </h1>
            <div className="max-w-md mb-10">
              <SplitText text="Five clinical AI workflows, one platform. Free to start, no credit card." className="text-white/50 text-base leading-relaxed" delay={20} duration={1} />
            </div>
            <ul className="space-y-4 max-w-md">
              {FEATURES.map((f) => (
                <li key={f.label} className="flex items-center gap-3 text-sm text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: f.accent, boxShadow: '0 0 8px ' + f.accent }} />
                  {f.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8 md:p-10 shadow-[0_0_80px_-20px_rgba(255,45,45,0.3)]">
              <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px" style={{ background: 'linear-gradient(90deg, transparent, #ff2d2d, transparent)' }} />
              <h2 className="text-2xl font-bold tracking-tight mb-1">Create account</h2>
              <p className="text-sm text-white/40 mb-8">Takes 20 seconds</p>
              <form onSubmit={onSubmit} className="space-y-5">
                <Field label="Full Name" value={form.name} onChange={set('name')} placeholder="Jane Doe" required />
                <Field label="Email" type="email" value={form.email} onChange={set('email')} placeholder="you@hospital.com" required />
                <Field label="Password" type="password" value={form.password} onChange={set('password')} placeholder="Minimum 6 characters" required minLength={6} />
                <Field label="College / Institution" value={form.college} onChange={set('college')} placeholder="Optional" />
                {error && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/[0.08] border border-red-500/25 text-red-200 text-sm">
                    <span className="text-red-400 mt-0.5">⚠</span>
                    <p>{error}</p>
                  </div>
                )}
                <div className="pt-2">
                  <SpecularButton type="submit" disabled={busy}>
                    {busy ? 'Creating account' : 'Create Account'}
                  </SpecularButton>
                </div>
              </form>
              <p className="mt-6 text-center text-sm text-white/40">
                Already registered? <Link to="/login" className="text-white hover:text-white/80 underline underline-offset-4">Sign in</Link>
              </p>
            </div>
            <p className="text-[11px] text-white/25 text-center mt-6 font-mono tracking-wider">Free · No credit card · Powered by Groq</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type, value, onChange, placeholder, required, minLength }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-white/40 mb-2 font-medium">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input type={type || 'text'} value={value} onChange={onChange} placeholder={placeholder} required={required} minLength={minLength}
        autoComplete={type === 'password' ? 'new-password' : 'off'}
        className="cursor-target w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-sm text-white placeholder-white/25 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.04] transition" />
    </div>
  );
}