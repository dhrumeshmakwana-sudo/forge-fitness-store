// Shared split-screen layout for Login / Signup.
export default function AuthLayout({ children }) {
  return (
    <div className="auth-wrap">
      <div className="auth-side">
        <span className="eyebrow">Members Get More</span>
        <h2>Your Gains.<br /><em>Your Account.</em></h2>
        <p>Track orders, save your stack, earn Forge Points on every order and check out in seconds.</p>
        <ul>
          <li>Order tracking & easy reorders</li>
          <li>Member-only prices and early drops</li>
          <li>Forge Points on every purchase</li>
        </ul>
      </div>
      <div className="auth-main">{children}</div>
    </div>
  );
}
