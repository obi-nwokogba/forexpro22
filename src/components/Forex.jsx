import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Layout } from "antd";

import { Navbar, CoinPage } from "./";
import { useParams } from 'react-router-dom';

import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

import "../styles.css";


export default function Forex({ name }) {

  let interval = 700000;

  const [coinData, setCoinData] = useState([]);
  const [coin, setCoin] = useState('');
  const [joke, setJoke] = useState('');
  const [data, setData] = useState([]);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(0);
  const fetchDataIntervalId = useRef();

  const options = {
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


  const setFetchDataInterval = (interval) => {
    // Clear old interval
    if (fetchDataIntervalId.current) {
      clearInterval(fetchDataIntervalId.current);
      fetchDataIntervalId.current = 700000;
    }

    // Set new interval
    if (interval > 0) {
      fetchDataIntervalId.current = setInterval(() => {
        setFetchDataTrigger(Date.now());
      }, 700000);
    }
  };


  useEffect(() => {
    try {
      const response = axios.request(options).then((response) => {
        console.log(`Response is: ${JSON.stringify(response)}`);
        setJoke(response.data.name);
        setCoinData(response.data);
      }).catch((err) => console.warn(err));
      console.log(response);
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
        {coinData.symbol} &middot;&nbsp;
        {coinData.name} </span>
      <span className="page-heading-text">{coinData.symbol}</span>
      <Layout>
        <div className="routes"></div>
      </Layout>

      <div className="app-container">
        {coinData.name}
        <CoinPage
          coinName={coinData.name}
          coinSymbol={coinData.symbol} />
      </div>
    </div>
  </>
}
