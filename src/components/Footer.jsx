import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer-container">

      <div>
        <Link to="/" className="topmost-nav-link">Home</Link>
        <Link to="/forex/eurusd" className="topmost-nav-link">EUR/USD</Link>
        <Link to="/forex/usdjpy" className="topmost-nav-link">USD/JPY</Link>
        <Link to="/forex/usdchf" className="topmost-nav-link">USD/CHF</Link>
      </div>
      <div>
        <Link to="/" className="topmost-nav-link">Home</Link>
        <Link to="/forex/btcusd" className="topmost-nav-link">Bitcoin</Link>
        <Link to="/forex/ethusd" className="topmost-nav-link">Ethereum</Link>
        <Link to="/forex/solusd" className="topmost-nav-link">Solana</Link>
        <Link to="/forex/adausd" className="topmost-nav-link">Cardano</Link>

      </div>

    </div>
  );
}
