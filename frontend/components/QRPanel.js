import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

export default function QRPanel({ serverUrl }) {
  const [qrData, setQrData] = useState(null);
  const [status, setStatus] = useState('disconnected');
  const [name, setName] = useState(null);

  useEffect(() => {
    socket = io(serverUrl);
    socket.on('connect', () => {});
    socket.on('qr', (d) => {
      setQrData(d.dataUrl || null);
      setStatus('qr');
    });
    socket.on('connected', (d) => {
      setStatus('connected');
      setName(d.name);
      setQrData(null);
    });
    socket.on('disconnected', () => {
      setStatus('disconnected');
      setName(null);
    });
    return () => { socket.disconnect(); }
  }, [serverUrl]);

  return (
    <div className="card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div style={{fontSize:18,fontWeight:700}}>yehazz md — Pairing</div>
          <div className="small">Connect your WhatsApp to the bot via QR or Cloud</div>
        </div>
        <div className="small">Dark • v1</div>
      </div>

      <div style={{marginTop:16}} className="qr">
        {status === 'qr' && qrData && (
          <img src={qrData} alt="QR" style={{width:260,height:260}}/>
        )}
        {status === 'connected' && (
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:20,fontWeight:700}}>{name || 'yehazz md'}</div>
            <div className="small">Connected</div>
          </div>
        )}
        {status === 'disconnected' && (
          <div style={{textAlign:'center'}} className="small">No active session. Scan QR to connect.</div>
        )}
      </div>
      <div className="status">
        Status: <strong style={{color: status === 'connected' ? '#34d399' : '#f97316'}}>{status}</strong>
      </div>
    </div>
  );
}
