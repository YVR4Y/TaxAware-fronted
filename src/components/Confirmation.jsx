import React from 'react';

export default function Confirmation({ onBack }) {
  return (
    <div style={{
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      height:'100vh', background:'#f9fafb'
    }}>
      <button onClick={onBack} style={{ alignSelf:'flex-start', margin:'1rem' }}>
        ← Späť
      </button>
      <h2>Hotovo!</h2>
      <p>Ďakujeme, proces bol dokončený.</p>
    </div>
  );
}
