import { useEffect, useState } from 'react';
import { api } from './api/client';
import Login from './components/Login.jsx';
import Investments from './components/Investments.jsx';
import Wallet from './components/Wallet.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [message, setMessage] = useState('');

  async function loadSession() {
    const data = await api('/api/auth/me');
    setUser(data.user);
    if (data.user) {
      await loadInvestments();
    }
  }

  async function loadInvestments() {
    const data = await api('/api/investments');
    setInvestments(data.investments);
  }

  useEffect(() => {
    loadSession().catch(() => setUser(null));
  }, []);

  async function login(credentials) {
    try {
      const data = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      setUser(data.user);
      setMessage(data.message);
      await loadInvestments();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function logout() {
    await api('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setInvestments([]);
    setMessage('Logged out.');
  }

  async function saveWallet(walletAddress) {
    const data = await api('/api/wallet', {
      method: 'POST',
      body: JSON.stringify({ walletAddress })
    });
    setUser(data.user);
    setMessage('MetaMask wallet saved to MySQL through Sequelize.');
  }

  return (
    <main>
      <header className="app-header">
        <div className="brand">
          <div className="brand-mark">ETH</div>
          <div>
            <h1>Cloud Crypto Investment Portal</h1>
            <p>React + Express + Sequelize + MySQL + AWS-ready Docker</p>
          </div>
        </div>
        {user ? (
          <button className="ghost-button" onClick={logout}>
            Log out
          </button>
        ) : null}
      </header>

      <section className="status-strip">
        <span>
          {user
            ? `${user.name} is logged in as ${user.role}. Session access is active.`
            : 'Not logged in. Investment data is protected by the server session.'}
        </span>
      </section>

      {!user ? (
        <Login onLogin={login} message={message} />
      ) : (
        <div className="dashboard-grid">
          <Wallet user={user} onWalletSaved={saveWallet} onError={setMessage} />
          <Investments investments={investments} />
          {message ? <p className="toast">{message}</p> : null}
        </div>
      )}
    </main>
  );
}
