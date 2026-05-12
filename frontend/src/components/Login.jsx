export default function Login({ onLogin, message }) {
  async function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await onLogin({
      userid: form.get('userid'),
      password: form.get('password')
    });
  }

  return (
    <section className="panel login-panel">
      <div>
        <p className="eyebrow">Secure access</p>
        <h2>Login</h2>
        <p className="muted">Use a course demo account to create a server-side session.</p>
      </div>

      <form onSubmit={submit} className="login-form">
        <label>
          User ID
          <input name="userid" defaultValue="alice" autoComplete="username" required />
        </label>
        <label>
          Password
          <input name="password" type="password" defaultValue="password123" autoComplete="current-password" required />
        </label>
        {message ? <p className="form-message">{message}</p> : null}
        <button className="primary-button" type="submit">
          Log in
        </button>
      </form>
    </section>
  );
}
