import React from 'react';

export default function Welcome({ onNext }) {
  return (
    <div style={{
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      height:'100vh', background:'#f9fafb'
    }}>
      <h1 style={{ fontSize:'3rem', marginBottom:'2rem' }}>TaxAware</h1>
      <button
        onClick={() => onNext()}
        style={{
          padding:'1rem 2rem', fontSize:'1.25rem',
          background:'#3b82f6', color:'white',
          border:'none', borderRadius:'0.5rem',
          cursor:'pointer'
        }}
      >
        Začať
      </button>
    </div>
  );
}
