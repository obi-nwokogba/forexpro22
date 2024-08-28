import { Component, useState, useRef, useEffect, createContext } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import { Navbar } from "./components";
import "./styles.css";

class App extends Component {
  state = {
    joke: "",
    coinData: [],
  };

  componentDidMount() {
    this.getJoke();
    this.interval = setInterval(() => {
      this.getJoke();
    }, 6000);
  }

  async getJoke() {
    let options = {
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/coins",
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
        tiers: "1",
        orderBy: "marketCap",
        orderDirection: "desc",
        limit: "50",
        offset: "0",
      },
      headers: {
        "x-rapidapi-key": "de9f03c511msh409345b99ecf623p16aa52jsnc3bf33da52c6",
        "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.data.coins);
      this.setState({
        joke: response.data.data.coins[0].name,
        coinData: response.data.data.coins.map((coin) => (
          <div className="currencyBox1">
            {coin.name} <span className="currencySymbol1">{coin.symbol}</span>
            {coin.change}% ${coin.price}
          </div>
        )),
      });
    } catch (error) {
      console.error(error);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <>
        <div className="topLogoBrand">forexpro22</div>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="appContainer">{this.state.coinData}</div>
      </>
    );
  }
}

export default App;
