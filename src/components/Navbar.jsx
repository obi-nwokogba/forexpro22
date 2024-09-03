import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { Search } from "./";

const Navbar = () => {

  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <>
      <div className="topmost-popular-nav">
        <Link to="/" className="topmost-nav-link">{window.innerWidth}px</Link>
        <Link to="/" className="topmost-nav-link">Home</Link>
        <Link to="/forex/btcusd" className="topmost-nav-link">Bitcoin</Link>
        <Link to="/forex/ethusd" className="topmost-nav-link">Ethereum</Link>
        <Link to="/forex/bnbusd" className="topmost-nav-link">Binance</Link>
        <Link to="/forex/eurusd" className="topmost-nav-link">EUR/USD</Link>
        <Link to="/forex/usdjpy" className="topmost-nav-link">USD/JPY</Link>
        <Link to="/forex/usdchf" className="topmost-nav-link">USD/CHF</Link>

      </div>
      <div className="nav-container">
        <div className="logo-container">forexpro22</div>
        <Search />

      </div>
    </>
  );
};

export default Navbar;
