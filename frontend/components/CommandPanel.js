import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function CommandPanel({ serverUrl }) {
  const [socket, setSocket] = useState(null);
  const [to, setTo] = useState('');
  const [resp, setResp] = useState(null);

  useEffect(() => {
    const s = io(serverUrl);
    setSocket(s);
    s.on('connect', ()=> console.log('socket connected to backend'));
    s.on('ok', d => setResp(JSON.stringify(d)));
    s.on('error', e => setResp(JSON.stringify(e)));
    return () => s.disconnect();
  }, [serverUrl]);

  const sendCommand = (cmd) => {
    if (!socket) { setResp('Not connected to backend'); return; }
    if (!to) { setResp('Enter target phone number (e.g. 9477xxxxxxx)'); return; }
    socket.emit('command', { command: cmd, to });
  };

  return (
    <div className="card">
      <div style={{fontWeight:700}}>Command Panel</div>
      <div className="small" style={{marginTop:8}}>Send bot commands to a WhatsApp chat (use phone without @s.whatsapp.net)</div>
      <div style={{height:10}} />
      <input className="input" placeholder="phone e.g. 94771234567" value={to} onChange={e=>setTo(e.target.value)}/>
      <div style={{height:10}} />
      <div style={{display:'flex', gap:8}}>
        <button className="button" onClick={()=>sendCommand('.menu')}>.menu</button>
        <button className="button" onClick={()=>sendCommand('.sticker')}>.sticker</button>
        <button className="button" onClick={()=>sendCommand('.download https://example.com/file.pdf')}>.download</button>
      </div>
      <div style={{height:10}} />
      <div className="small">Response: {resp}</div>
    </div>
  );
}
