import QRPanel from '../components/QRPanel';
import CommandPanel from '../components/CommandPanel';

export default function Home() {
  const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:3001';
  return (
    <div className="container">
      <div className="header">
        <div className="brand">
          <div className="logo">Y</div>
          <div>
            <div style={{fontWeight:700}}>yehazz md — Bot Pairing</div>
            <div className="small">QR & Number pairing • Dark</div>
          </div>
        </div>
        <div className="small">Built for WhatsApp bots</div>
      </div>

      <div className="grid">
        <div>
          <QRPanel serverUrl={SERVER_URL} />
          <div style={{height:18}} />
          <CommandPanel serverUrl={SERVER_URL} />
        </div>
        <div>
          <div className="card">
            <div style={{fontWeight:700}}>Number / Cloud API pairing</div>
            <div className="small">If you use WhatsApp Cloud API, paste your token & phone details in your backend env and use Cloud API option.</div>
            <div style={{height:10}} />
            <div className="small">Important: Cloud API profile name is controlled in Meta Business settings.</div>
          </div>

          <div style={{height:12}} />
          <div className="card">
            <div style={{fontWeight:700}}>Pairing tips</div>
            <ul className="small" style={{marginTop:10,lineHeight:1.6}}>
              <li>Keep backend up and running so QR session stays valid.</li>
              <li>After scanning QR, messages sent from the phone will originate from that WhatsApp account (display name set to yehazz md where possible).</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer">© yehazz md • Pairing site</div>
    </div>
  );
}
