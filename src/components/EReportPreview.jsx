import React from 'react';

export default function EReportPreview({ data, onNext }) {
  const { mode, amount } = data;
  const tax = parseFloat((amount * 0.20).toFixed(2));
  const total = parseFloat((amount + tax).toFixed(2));
  const payload = {
    mode,
    amount,
    tax,
    total,
    timestamp: new Date().toISOString()
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Krok 4: Náhľad e-reportu</h2>
      <pre style={{
        background: '#f3f4f6',
        padding: '1rem',
        borderRadius: '4px',
        maxHeight: '300px',
        overflow: 'auto'
      }}>
        {JSON.stringify(payload, null, 2)}
      </pre>
      <button style={{ marginTop: '1rem' }} onClick={() => onNext(payload)}>
        Odoslať e-report
      </button>
    </div>
  );
}
