import React, { useState } from 'react';
import Welcome         from './components/Welcome';
import AuthChoice      from './components/AuthChoice';
import LoginForm       from './components/LoginForm';
import AdminDashboard  from './components/AdminDashboard';
import InvoiceManager  from './components/InvoiceManager';
import Confirmation    from './components/Confirmation';

export default function App() {
  const [step, setStep] = useState(0);
  const [ctx, setCtx]   = useState({});

  const next = data => {
    if (data) setCtx(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };
  const prev = () => setStep(prev => Math.max(prev - 1, 0));

  switch (step) {
    case 0:
      return <Welcome        onNext={next} />;
    case 1:
      return <AuthChoice     onNext={next} onBack={prev} />;
    case 2:
      return <LoginForm      onNext={next} onBack={prev} />;
    case 3:
      return ctx.user?.role === 'admin'
        ? <AdminDashboard  onBack={prev} />
        : <InvoiceManager  onBack={prev} />;
    case 4:
      return <Confirmation   onBack={prev} />;
    default:
      return <div>Neznámy krok: {step}</div>;
  }
}
