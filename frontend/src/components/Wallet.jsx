export default function Wallet({ user, onWalletSaved, onError }) {
  async function connectWallet() {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed in this browser.');
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await onWalletSaved(accounts[0]);
    } catch (error) {
      onError(error.message);
    }
  }

  return (
    <section className="panel wallet-panel">
      <div>
        <p className="eyebrow">Ethereum</p>
        <h2>MetaMask Wallet</h2>
        <p className="muted">
          {user.walletAddress ? user.walletAddress : 'No wallet connected yet.'}
        </p>
      </div>
      <button className="secondary-button" onClick={connectWallet}>
        Connect MetaMask
      </button>
    </section>
  );
}
