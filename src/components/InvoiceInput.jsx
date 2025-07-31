import React, { useState, useEffect } from 'react';

export default function InvoiceInput({ data, onNext }) {
  const [status, setStatus] = useState('scanning');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    setTimeout(() => setStatus('success'), 2000);
  }, []);

  if (status === 'scanning') {
    return <p>Overujem odtlačok... (simulácia biometrie dokončená)</p>;
  }

  const handleCalculate = () => {
    const num = parseFloat(amount);
    if (isNaN(num)) {
      alert('Zadajte platnú sumu');
      return;
    }
    onNext({ mode: data.mode, amount: num });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Krok 3: Vstup faktúry</h2>
      <p>Overenie úspešné: <strong>{data.mode}</strong></p>

      <input
        type="number"
        placeholder="Suma bez DPH"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={handleCalculate}>Vypočítať DPH & Pokračovať</button>
    </div>
  );
}
