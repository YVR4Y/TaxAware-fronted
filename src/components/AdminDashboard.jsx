import React, { useState, useEffect } from 'react';
import { getAuditLog } from '../utils/auditLog';

const ACTION_COLORS = {
  added:   '#1eff00ff',
  edited:  '#ff6600ff',
  deleted: '#ff0000ff',
  sent:    '#0004ffff'
};

export default function AdminDashboard({ onBack }) {
  const [log, setLog]             = useState([]);
  const [filterIco, setFilterIco] = useState('');

  useEffect(() => {
    setLog(getAuditLog());
  }, []);

  const displayed = filterIco
    ? log.filter(e => e.ico.includes(filterIco.trim()))
    : log;

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={onBack}>← Späť</button>
      <h2>Audit log (admin)</h2>

      <div style={{ margin: '1rem 0' }}>
        <input
          type="text"
          placeholder="Filtrovať podľa IČO"
          value={filterIco}
          onChange={e => setFilterIco(e.target.value)}
          style={{ padding: '0.5rem', width: '200px' }}
        />
        {filterIco && (
          <button
            onClick={() => setFilterIco('')}
            style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}
          >
            Zrušiť
          </button>
        )}
      </div>

      <table
        border="1"
        cellPadding="6"
        style={{ width: '100%', borderCollapse: 'collapse' }}
      >
        <thead style={{ background: '#f3f4f6' }}>
          <tr>
            <th>#</th>
            <th>IČO</th>
            <th>Akcia</th>
            <th>Payload</th>
            <th>Timestamp</th>
            <th>PrevHash</th>
            <th>Hash</th>
          </tr>
        </thead>
        <tbody>
          {displayed.map((e, i) => (
            <tr
              key={i}
              style={{ background: ACTION_COLORS[e.action] || 'transparent' }}
            >
              <td>{i + 1}</td>
              <td>{e.ico}</td>
              <td>{e.action}</td>
              <td>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(e.payload, null, 2)}
                </pre>
              </td>
              <td>{e.timestamp}</td>
              <td style={{ fontFamily: 'monospace' }}>
                {e.prevHash.slice(0, 8)}…
              </td>
              <td style={{ fontFamily: 'monospace' }}>
                {e.hash.slice(0, 8)}…
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
