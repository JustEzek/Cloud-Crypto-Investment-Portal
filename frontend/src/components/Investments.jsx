export default function Investments({ investments }) {
  return (
    <section className="panel table-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Session protected</p>
          <h2>Investment Balances</h2>
        </div>
        <span>{investments.length} record{investments.length === 1 ? '' : 's'}</span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>USD</th>
              <th>BTC</th>
              <th>ETH</th>
              <th>EUR</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment) => (
              <tr key={investment.id}>
                <td>
                  <strong>{investment.user.name}</strong>
                  <small>{investment.user.userid}</small>
                </td>
                <td>{investment.user.role}</td>
                <td>${Number(investment.usdBalance).toLocaleString()}</td>
                <td>{Number(investment.btcBalance).toFixed(4)}</td>
                <td>{Number(investment.ethBalance).toFixed(4)}</td>
                <td>EUR {Number(investment.eurBalance).toLocaleString()}</td>
                <td>{investment.riskLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

