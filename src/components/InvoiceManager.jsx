import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { appendLogEntry } from '../utils/auditLog';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];
const ICO = '12345678';

export default function InvoiceManager({ onBack }) {
  const [invoices, setInvoices] = useState([]);
  const [form,     setForm]    = useState({ id:null, amount:'' });
  const [editing,  setEditing] = useState(false);
  const [chartType,setChart]   = useState('pie');

  const handleAdd = e => {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (isNaN(amount)) return alert('Zadajte platnú sumu');
    const inv = {
      id:     editing ? form.id : Date.now(),
      amount,
      vat:    parseFloat((amount*0.20).toFixed(2)),
      base:   parseFloat((amount-amount*0.20).toFixed(2)),
      action: editing ? 'edited' : 'added',
      sent:   false
    };
    setInvoices(list => {
      const updated = editing
        ? list.map(i => i.id===inv.id ? { ...inv, sent:i.sent } : i)
        : [...list, inv];
      appendLogEntry({ ico:ICO, action:inv.action, payload:inv });
      return updated;
    });
    setEditing(false);
    setForm({ id:null, amount:'' });
  };

  const handleEdit = inv => {
    setEditing(true);
    setForm({ id:inv.id, amount:inv.amount.toString() });
  };

  const handleDelete = id => {
    setInvoices(list => {
      const updated = list.map(i => i.id===id ? { ...i, action:'deleted' } : i);
      appendLogEntry({ ico:ICO, action:'deleted', payload:{ id } });
      return updated;
    });
  };

  const handleSend = id => {
    setInvoices(list => {
      const updated = list.map(i => i.id===id ? { ...i, sent:true } : i);
      appendLogEntry({ ico:ICO, action:'sent', payload:{ id, sent:true } });
      return updated;
    });
  };

  const actionsSummary = ['added','edited','deleted','sent'].map(act => ({
    name:act, value:invoices.filter(i => i.action===act || (act==='sent' && i.sent)).length
  }));
  const amountsSummary = [
    { name:'bez DPH', value:invoices.reduce((s,i)=>s+i.base,0) },
    { name:'DPH',     value:invoices.reduce((s,i)=>s+i.vat,0) },
    { name:'celkom',  value:invoices.reduce((s,i)=>s+i.amount,0) }
  ];

  return (
    <div style={{ padding:'1rem' }}>
      <button onClick={onBack}>← Späť</button>
      <h2>Správa faktúr</h2>

      <form onSubmit={handleAdd} style={{ margin:'1rem 0' }}>
        <input
          type="number"
          placeholder="Suma (EUR)"
          value={form.amount}
          onChange={e=>setForm({...form,amount:e.target.value})}
          style={{ padding:'0.5rem', marginRight:'0.5rem' }}
        />
        <button type="submit" style={{ padding:'0.5rem 1rem' }}>
          {editing?'Upraviť':'Pridať'} faktúru
        </button>
        {editing && (
          <button
            type="button"
            onClick={()=>{setEditing(false);setForm({id:null,amount:''});}}
            style={{ marginLeft:'0.5rem', padding:'0.5rem 1rem' }}
          >
            Zrušiť
          </button>
        )}
      </form>

      <table border="1" cellPadding="6" style={{ width:'100%',borderCollapse:'collapse' }}>
        <thead style={{ background:'#f3f4f6' }}>
          <tr>
            <th>ID</th><th>Suma</th><th>DPH</th><th>Bez DPH</th>
            <th>Akcia</th><th>✏️</th><th>🗑️</th><th>Odoslať</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv=>(
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.amount.toFixed(2)}</td>
              <td>{inv.vat.toFixed(2)}</td>
              <td>{inv.base.toFixed(2)}</td>
              <td>{inv.action}</td>
              <td><button onClick={()=>handleEdit(inv)}>✏️</button></td>
              <td><button onClick={()=>handleDelete(inv.id)}>🗑️</button></td>
              <td>
                {inv.sent
                  ? <span style={{ color:'#10b981' }}>Odoslané</span>
                  : <button onClick={()=>handleSend(inv.id)}>Odoslať</button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ margin:'1rem 0' }}>
        <button onClick={()=>setChart('pie')}>Koláčové</button>
        <button onClick={()=>setChart('bar')} style={{ marginLeft:'0.5rem' }}>Stĺpcové</button>
      </div>

      {chartType==='pie' ? (
        <div style={{ display:'flex',justifyContent:'space-around' }}>
          <PieChart width={300} height={300}>
            <Pie data={actionsSummary} dataKey="value" nameKey="name" outerRadius={80}>
              {actionsSummary.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
            </Pie>
            <ReTooltip/><Legend/>
          </PieChart>
          <PieChart width={300} height={300}>
            <Pie data={amountsSummary} dataKey="value" nameKey="name" outerRadius={80}>
              {amountsSummary.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
            </Pie>
            <ReTooltip/><Legend/>
          </PieChart>
        </div>
      ) : (
        <div style={{ display:'flex',justifyContent:'space-around' }}>
          <BarChart width={400} height={300} data={actionsSummary}>
            <CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/>
            <ReTooltip/><Legend/><Bar dataKey="value" fill={COLORS[0]}/>
          </BarChart>
          <BarChart width={400} height={300} data={amountsSummary}>
            <CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/>
            <ReTooltip/><Legend/><Bar dataKey="value" fill={COLORS[1]}/>
          </BarChart>
        </div>
      )}
    </div>
);
}
