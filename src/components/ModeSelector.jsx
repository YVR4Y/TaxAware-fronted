// src/components/ModeSelector.jsx
import React, { useState } from 'react';

export default function ModeSelector({ onNext }) {
  const [mode, setMode] = useState('B2C');
  return (
    <div>
      <h2>Krok 1: Výber režimu</h2>
      {['B2C','B2B','B2G'].map(m => (
        <button
          key={m}
          style={{
            margin: 4,
            padding: 8,
            background: mode===m ? '#3b82f6' : '#e5e7eb',
            color: mode===m ? 'white' : 'black'
          }}
          onClick={() => setMode(m)}
        >{m}</button>
      ))}
      <div style={{ marginTop: 16 }}>
        <button onClick={() => onNext({ mode })}>Pokračovať</button>
      </div>
    </div>
  );
}
