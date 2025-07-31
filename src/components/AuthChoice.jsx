import React from 'react';

export default function AuthChoice({ onNext, onBack }) {
  return (
    <div style={{ padding:'1rem' }}>
      <button onClick={onBack}>← Späť</button>
      <h2>Prihlásenie alebo registrácia</h2>
      <div style={{ marginTop:'1rem' }}>
        <button
          onClick={() => onNext({ auth: 'login' })}
          style={{ marginRight:'1rem', padding:'0.75rem' }}
        >
          Prihlásiť sa
        </button>
        <button
          onClick={() => onNext({ auth: 'register' })}
          style={{ padding:'0.75rem' }}
        >
          Registrovať sa
        </button>
      </div>
    </div>
  );
}
