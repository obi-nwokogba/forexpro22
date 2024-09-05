import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer-container">

      <div>
        <Link to="/" className="footer-link">Home</Link>
        <br />
        <Link to="/forex/audcad" className="footer-link">AUD/CAD</Link>
        <Link to="/forex/audchf" className="footer-link">AUD/CHF</Link>
        <Link to="/forex/audjpy" className="footer-link">AUD/JPY</Link>
        <Link to="/forex/audnzd" className="footer-link">AUD/NZD</Link>
        <Link to="/forex/usdjpy" className="footer-link">USD/JPY</Link>
        <Link to="/forex/usdchf" className="footer-link">USD/CHF</Link>
      </div>
      <div>
        <Link to="/forex/btcusd" className="footer-link">Bitcoin</Link>
        <Link to="/forex/ethusd" className="footer-link">Ethereum</Link>
        <Link to="/forex/solusd" className="footer-link">Solana</Link>
        <Link to="/forex/adausd" className="footer-link">Cardano</Link>
      </div>
      <div>
        &copy; 2024 forexpro22<br />
        <Link to="https://github.com/obi-nwokogba/forexpro22" className="footer-link">forexpro22 on GitHub</Link>
      </div>

    </div>
  );
}
