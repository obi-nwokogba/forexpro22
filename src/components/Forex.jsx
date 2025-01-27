import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

import { getRealSymbol } from '../Utils';
import { CoinPage, Footer, Navbar } from "./";
import "../styles.css";


export default function Forex({ name }) {
  let { urlSymbol } = useParams();
  urlSymbol = urlSymbol?.toLowerCase() || 'eurusd';
  const tickerSymbol = getRealSymbol(urlSymbol);

  let interval = 6000;

  const [coinData, setCoinData] = useState([]);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(0);
  const fetchDataIntervalId = useRef();

  const options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/quote',
    params: {
      symbol: tickerSymbol,
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
      fetchDataIntervalId.current = 6000;
    }

    // Set new interval
    if (interval > 0) {
      fetchDataIntervalId.current = setInterval(() => {
        setFetchDataTrigger(Date.now());
      }, 6000);
    }
  };


  useEffect(() => {
    try {
      const response = axios.request(options).then((response) => {
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
      <CoinPage
        coinName={coinData.name}
        coinSymbol={coinData.symbol}
        coinPriceChange={coinData.percent_change}
        coinPrice={coinData.open}
        tickerSymbol={tickerSymbol} />
    </div>
    <Footer />
  </>



}
