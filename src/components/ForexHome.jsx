import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

import { getRealSymbol } from '../Utils';
import { CoinPage, Footer, Navbar } from "./";
import CONSTANTS from "../Constants";
import "../styles.css";



export default function ForexHome({ name }) {
  let { urlSymbol } = useParams();
  urlSymbol = urlSymbol || 'eurusd';
  console.log(urlSymbol);
  const tickerSymbol = getRealSymbol(urlSymbol);
  console.log(`tickerSymbol is: `, tickerSymbol);

  let interval = 6000;

  const [coinData, setCoinData] = useState([[], []]);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(0);
  const fetchDataIntervalId = useRef();

  // TODO : Optimize This. 1976 Results are being returned. Too many.
  const options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/forex_pairs',
    params: {
      format: 'json'
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

        console.log(`FOREX MOVERS:`);
        console.log(JSON.stringify(response));

        let majorPairs = response.data.data.map(forexPair => {
          if (forexPair.currency_group === "Major") {
            let symbolForUrl = forexPair.symbol.replace('/', '');
            return (<Link to={'/forex/' + symbolForUrl} className="button-link-1" > {forexPair.symbol}</Link >);
          }
        });

        let minorPairs = response.data.data.map(forexPair => {
          if (forexPair.currency_group === "Minor") {
            return (<span className="button-link-1">{forexPair.symbol}</span>);
          }
        });

        setCoinData([majorPairs, minorPairs]);
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
      <div class="page-container">
        <div class="flow-container">
          <h2>Major Pairs</h2>
          {coinData[0]}

          <h2>Minor Pairs</h2>
          {coinData[1]}
        </div>
      </div>
    </div>

    <Footer />
  </>



}
