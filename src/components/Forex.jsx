import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Layout } from "antd";
import COLORS from "../Constants";
import { Navbar } from "./";
import { useParams } from 'react-router-dom';

import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

import "../styles.css";


export default function Forex({ name }) {

  let interval = 7000;

  const [coinData, setCoinData] = useState([]);
  const [coin, setCoin] = useState('');
  const [joke, setJoke] = useState('');
  const [data, setData] = useState([]);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(0);
  const fetchDataIntervalId = useRef();

  const setFetchDataInterval = (interval) => {
    // Clear old interval
    if (fetchDataIntervalId.current) {
      clearInterval(fetchDataIntervalId.current);
      fetchDataIntervalId.current = undefined;
    }

    // Set new interval
    if (interval > 0) {
      fetchDataIntervalId.current = setInterval(() => {
        setFetchDataTrigger(Date.now());
      }, interval);
    }
  };


  let options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      tiers: "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "100",
      offset: "0",
    },
    headers: {
      "x-rapidapi-key": "de9f03c511msh409345b99ecf623p16aa52jsnc3bf33da52c6",
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    },
  };


  useEffect(() => {

    try {
      // let objDataFromAPI = [];
      const response = axios.request(options).then((response) => {

        setJoke(response.data.data.coins[0].name);

        setCoinData(response.data.data.coins.map((coin) => (
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
          </div>)));

      }).catch((err) => console.warn(err));
      console.log(response.data.data.coins);
    } catch (error) {
      console.error(error);
    }

    // Clean up for unmount to prevent memory leak
    return () => clearInterval(fetchDataIntervalId.current);
  }, [options, fetchDataTrigger]);


  return <>
    <div className="app-frame">
      <Navbar />
      <span className="page-heading-text">
        {/* { this.state.coin }  */}

        forex :
        {coinData.length}
        : {window.location.href} </span>
      <span className="page-heading-text">{joke}</span>
      <Layout>
        <div className="routes"></div>
      </Layout>

      <div className="app-container">
        {coinData}
      </div>
    </div>
  </>
}


/*
class Forex extends Component {

   //{ coinId } = useParams();

  state = {

    joke: "",
    coinData: [],
    coin:""
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
      <div className="app-frame">
        <Navbar />
        <span className="page-heading-text">{ this.state.coin } forex : { this.state.coin } : {window.location.href} </span>
        <Layout>
          <div className="routes"></div>
        </Layout>

        <div className="app-container">{this.state.coinData}</div>
        </div>
      </>
    );
  }
} */
