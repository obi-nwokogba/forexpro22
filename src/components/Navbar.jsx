import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
// import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";

const Navbar = () => {
  const { Search } = Input;

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
        <Link to="/" className="topmost-nav-link">Home</Link>
        <Link to="/currency/btc" className="topmost-nav-link">Bitcoin</Link>
        <Link to="/currency/eth" className="topmost-nav-link">Ethereum</Link>
        <Link to="/forex/eurusd" className="topmost-nav-link">EUR/USD</Link>
        <Link to="/forex/usdjpy" className="topmost-nav-link">USD/JPY</Link>
        <Link to="/forex/usdchf" className="topmost-nav-link">USD/CHF</Link>
      </div>
      <div className="nav-container">
        <div className="logo-container">forexpro22</div>
        <div className="search-container">
          <Space direction="vertical">
            <Search
              placeholder="search currency, coin, symbol"
              allowClear
              // onSearch={onSearch}
              style={{ width: 304 }}
            />
          </Space>
        </div>
      </div>
    </>
  );
};

export default Navbar;
