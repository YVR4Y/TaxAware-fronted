import React, { useState } from 'react';

export default function InvoiceUpload({ onNext }) {
  const [fileName, setFileName] = useState('');
  const [amount, setAmount] = useState(null);

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        // očakávame JSON { "amount": number }
        const json = JSON.parse(reader.result);
        setAmount(parseFloat(json.amount));
      } catch {
        alert('Nepodarilo sa načítať sumu z faktúry. Nahraj JSON vo formáte {"amount":100}');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Krok 3: Nahranie faktúry</h2>
      <input 
        type="file" 
        accept=".json" 
        onChange={handleFileChange} 
      />
      {fileName && <p>Vybraný súbor: <strong>{fileName}</strong></p>}
      {amount != null && (
        <>
          <p>Rozpoznaná suma: <strong>{amount} €</strong></p>
          <button onClick={() => onNext({ amount })}>
            Pokračovať
          </button>
        </>
      )}
    </div>
  );
}
