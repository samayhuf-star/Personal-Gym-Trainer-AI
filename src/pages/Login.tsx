import { useEffect, useState, FormEvent } from 'react';
import { Loader2, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/layout/Logo';
import { useAuth } from '@/contexts/AuthContext';

const RESEND_WAIT = 45;

const Login = () => {
  const { sendCode, verifyCode } = useAuth();
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeLength, setCodeLength] = useState(6);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [wait, setWait] = useState(0);

  useEffect(() => {
    if (wait <= 0) return;
    const t = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(t);
  }, [wait]);

  const requestCode = async () => {
    setBusy(true);
    setError('');
    try {
      const length = await sendCode(email.trim().toLowerCase());
      setCodeLength(length);
      setCode('');
      setStep('code');
      setWait(RESEND_WAIT);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const onEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!busy) requestCode();
  };

  const onCode = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      await verifyCode(email.trim().toLowerCase(), code);
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{ background: 'var(--gradient-hero)' }}>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>
        <div className="glass-card rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
          {step === 'email' ? (
            <form onSubmit={onEmail} className="space-y-5">
              <div>
                <h1 className="text-2xl font-bold">Sign in</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter your email and we will send you a login code. No password needed.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoFocus
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full gap-2 btn-glow" disabled={busy || !email.trim()}>
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                Email me a code
              </Button>
            </form>
          ) : (
            <form onSubmit={onCode} className="space-y-5">
              <div>
                <h1 className="text-2xl font-bold">Check your email</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  We sent your {codeLength}-digit code to <span className="text-foreground font-medium">{email.trim().toLowerCase()}</span>.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Login code</Label>
                <Input
                  id="code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  autoFocus
                  required
                  maxLength={codeLength}
                  placeholder={'•'.repeat(codeLength)}
                  className="text-center text-2xl tracking-[0.4em] h-14 font-semibold"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, codeLength))}
                />
              </div>
              {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full btn-glow gap-2" disabled={busy || code.length !== codeLength}>
                {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                Sign in
              </Button>
              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                  onClick={() => { setStep('email'); setError(''); }}
                >
                  <ArrowLeft className="w-4 h-4" /> Change email
                </button>
                <button
                  type="button"
                  className="text-primary disabled:text-muted-foreground"
                  disabled={busy || wait > 0}
                  onClick={requestCode}
                >
                  {wait > 0 ? `Resend in ${wait}s` : 'Resend code'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
