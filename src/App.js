import { Component } from "react";
import axios from "axios";
import CONSTANTS from "./Constants";
import { Navbar, Home, Currency, Forex } from "./components";
import "./styles.css";
import { Layout } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import * as d3 from "d3";

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
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/quote',
      params: {
        symbol: 'EUR/USD',
        outputsize: '30',
        format: 'json',
        interval: '1day'
      },
      headers: {
        'x-rapidapi-key': 'de9f03c511msh409345b99ecf623p16aa52jsnc3bf33da52c6',
        'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
      }
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
                color: coin.change > 0 ? CONSTANTS.COLORS.blue1 : CONSTANTS.COLORS.red1,
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Forex />}></Route>
          <Route path="/forex/:urlSymbol" element={<Forex />}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
