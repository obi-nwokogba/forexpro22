import { Component } from "react";
import axios from "axios";
// import * as d3 from "d3";
import COLORS from "./Constants";

import { Navbar, Home, Currency } from "./components";
import "./styles.css";
import { Layout } from "antd";
import {
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

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
          <div className="currency-box-1">
            {coin.name}
            <span className="currencySymbol1">{coin.symbol}</span>
            <div
              style={{
                color: coin.change > 0 ? COLORS.blue1 : COLORS.red1,
              }}
            >
              {coin.change}%
            </div>
            ${coin.price}
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
        <Navbar />
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/forex">
                <Currency />
              </Route>
              <Route exact path="/currency">
                <Currency />
              </Route>
              <Route exact path="/exchanges">
                <Home />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Home />
              </Route>
              <Route exact path="/crypto/:coinId">
                <Currency />
              </Route>
              <Route exact path="/news">
                <Home />
              </Route>
            </Routes>
          </div>
        </Layout>
        <div className="app-container">{this.state.coinData}</div>
      </>
    );
  }
}

export default App;
