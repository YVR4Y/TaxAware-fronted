// src/components/BiometricScan.jsx
import React, { useEffect, useState } from 'react';

export default function BiometricScan({ data, onNext }) {
  const [status, setStatus] = useState('scanning');
  useEffect(() => {
    setTimeout(() => setStatus('success'), 2000);
  }, []);
  if (status === 'scanning') return <p>Overujem odtlačok...</p>;
  return (
    <>
      <p>Overenie úspešné: {data.mode}</p>
      <button onClick={() => onNext()}>Pokračovať</button>
    </>
  );
}
