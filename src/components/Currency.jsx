import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Layout } from "antd";

import { Navbar, CoinBox1 } from "./";
import { useParams } from 'react-router-dom';

import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

import "../styles.css";


export default function Currency({ name }) {

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


  useEffect(() => {

    try {

      const response = axios.request(options).then((response) => {

        setJoke(response.data.data.coins[0].name);
        setCoinData(response.data.data.coins.map((coin) => (
          <CoinBox1
            coinName={coin.name}
            coinSymbol={coin.symbol}
            coinPrice={coin.price}
            coinPriceChange={coin.change} />
        )));

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
