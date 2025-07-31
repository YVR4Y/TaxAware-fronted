// src/components/LoginForm.jsx
import React, { useState } from 'react';

export default function LoginForm({ onNext, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default user

  const handleSubmit = e => {
    e.preventDefault();
    if (!username || !password) {
      alert('Vyplňte meno aj heslo.');
      return;
    }
    // simulácia overenia – odovzdáme aj vybranú rolu
    onNext({ user: { username, role } });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#f9fafb'
    }}>
      <button
        onClick={onBack}
        style={{ alignSelf: 'flex-start', margin: '1rem' }}
      >
        ← Späť
      </button>
      <h2>Prihlásenie</h2>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px'
      }}>
        <input
          type="text"
          placeholder="Používateľské meno"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ padding: '0.75rem', fontSize: '1rem' }}
        />
        <input
          type="password"
          placeholder="Heslo"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: '0.75rem', fontSize: '1rem' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label>
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === 'user'}
              onChange={e => setRole(e.target.value)}
            /> Užívateľ
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === 'admin'}
              onChange={e => setRole(e.target.value)}
            /> Admin
          </label>
        </div>

        <button
          type="submit"
          style={{
            padding: '0.75rem',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Pokračovať
        </button>
      </form>
    </div>
  );
}
