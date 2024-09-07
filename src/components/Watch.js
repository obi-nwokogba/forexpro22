import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Line } from '@ant-design/plots';
import React from 'react';

import { COLORS } from '../Utils';
import { Footer, Navbar } from "./";
import "../styles.css";

export default function Watch(props) {

  const [quoteData, setQuoteData] = useState([]);
  const [fiftyTwoWeekPercent, setFiftyTwoWeekPercent] = useState(50.0);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(0);
  const fetchDataIntervalId = useRef();

  let tickerSymbol = props.tickerSymbol;
  tickerSymbol = 'BTC/USD';

  // outputsize is 1 to 1555
  // timeinterval can be 1min, 5min, 15min, 30min, 45min, 1h, 2h, 4h, 1day, 1week, 1month
  const options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/quote',
    params: {
      symbol: 'BTC/USD',
      outputsize: '30',
      format: 'json',
      interval: '1day'
    },
    headers: {
      'x-rapidapi-key': 'de9f03c511msh409345b99ecf623p16aa52jsnc3bf33da52c6',
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
    }
  };

  // Get Detailed Price Quote

  /*{
    "symbol": "AMZN", "name": "Amazon.com Inc",
    "exchange": "NASDAQ", "mic_code": "XNGS",
    "currency": "USD", "datetime": "2024-09-03", "timestamp": 1725393540, "open": "177.86000", "high": "178.25999",
    "low": "175.25999", "close": "176.28999", "volume": "35815574", "previous_close": "178.50000",
    "change": "-2.21001", "percent_change": "-1.23810", "average_volume": "30990617",
    "is_market_open": false,
    "fifty_two_week":
    {
      "low": "118.35000", "high": "201.20000", "low_change": "57.93999",
      "high_change": "-24.91000", "low_change_percent": "48.95648",
      "high_change_percent": "-12.38072", "range": "118.349998 - 201.199997"
    }
  }; */


  let data = [
    { year: '1991', price: 3 },
  ];

  const setFetchDataInterval = (interval) => {
    // Clear old interval
    if (fetchDataIntervalId.current) {
      clearInterval(fetchDataIntervalId.current);
      fetchDataIntervalId.current = 7000;
    }

    // Set new interval
    if (interval > 0) {
      fetchDataIntervalId.current = setInterval(() => {
        setFetchDataTrigger(Date.now());
      }, 7000);
    }
  };

  useEffect(() => {
    try {
      const response = axios.request(options).then((response) => {

        let rawQuoteData = response;
        setQuoteData(response.data);
        console.log(`rawQuoteData:`);
        console.log(`${JSON.stringify(rawQuoteData)}`);

        let current = quoteData.close;
        let fiftyTwoLow = 1;
        let fiftyTwoHigh = 100;
        let fiftyTwoPercent = ((current - fiftyTwoLow) / (fiftyTwoHigh - fiftyTwoLow)) * 100;
        fiftyTwoPercent = 20;
        setFiftyTwoWeekPercent(fiftyTwoPercent);

        /*


        {
  "data": {
    "symbol": "BTC/USD",
    "name": "Bitcoin US Dollar",
    "exchange": "Coinbase Pro",
    "datetime": "2024-09-06",
    "timestamp": 1725665290,
    "open": "56156.82000",
    "high": "56995.00000",
    "low": "52530.00000",
    "close": "53832.43000",
    "previous_close": "56156.82000",
    "change": "-2324.39000",
    "percent_change": "-4.13911",
    "rolling_1d_change": "-3.98256",
    "rolling_7d_change": "-9.08542",
    "rolling_change": "-3.98256",
    "is_market_open": true,
    "fifty_two_week": {
      "low": "24930.29688",
      "high": "73750.07031",
      "low_change": "28902.13313",
      "high_change": "-19917.64031",
      "low_change_percent": "115.93176",
      "high_change_percent": "-27.00694",
      "range": "24930.296875 - 73750.070312"
    }
  },


        */








        /*
        setFetchDataTrigger(7000);
        let arrayOfTimeSeries = response.data.values;
        console.log(`arrayOfTimeSeries ` + JSON.stringify(arrayOfTimeSeries));

        let year = 3000;

        let dataArray = [];
        data = [];
        arrayOfTimeSeries.forEach(timePeriod => {
          year++;
          // dataArray2.push({ 'year': timePeriod.datetime, value: Number(timePeriod.open) });
          data.push({ 'day': timePeriod.datetime, price: Number(timePeriod.open) });
        });

        setTimeSeries(dataArray);

        console.log(`TimeSeries for the GRAPH is:`);
        console.log(JSON.stringify(timeSeries));

        setLineChartConfig({
          data,
          xField: 'day',
          yField: 'price',
          point: {
            shapeField: 'circle',
            sizeField: 4,
          },
          interaction: {
            tooltip: {
              marker: false,
            },
          },
          style: {
            lineWidth: 4,
          }
        }); */

      }).catch((err) => console.warn(err));
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    // Clean up for unmount to prevent memory leak
    return () => clearInterval(fetchDataIntervalId.current);
  }, [options, fetchDataTrigger, quoteData, data]);


  return <>
    <div className="app-frame">
      <Navbar />
      <span className="page-heading-text">
        {quoteData.symbol} &middot;&nbsp;
        {quoteData.name} </span>

      <span className="page-heading-text-2">
        <img
          src={props.coinPriceChange >= 0 ? '../up-arrow.svg' : '../up-arrow.svg'}
          className={props.coinPriceChange >= 0 ? 'up-arrow' : 'down-arrow'}
          alt="" />

        {props.coinPriceChange}%

        <span className="tag1">24h</span>
        &nbsp;&nbsp;

        ${props.coinPrice} </span>



      <span className="page-heading-text-3">
        {quoteData.rolling_1d_change}% past 1 day
      </span>

      <span className="page-heading-text-3">
        {quoteData.rolling_7d_change}% past 7 days
      </span>

      <span className="page-heading-text-3">
        52 Week Low: $ {fiftyTwoWeekPercent}

        <div className="fifty-two-week-outer">
          <div className="fifty-two-week-inner"
            style={{
              marginLeft: fiftyTwoWeekPercent + '%',
              backgroundColor: fiftyTwoWeekPercent < 50 ? COLORS.red1 : COLORS.blue1
            }}>&nbsp;</div>
        </div>

      </span >

      <div className='currency-page-box'>
        <div className="block">

          {/* // 1min, 5min, 15min, 30min, 45min, 1h, 2h, 4h, 1day, 1week, 1month */}
          <span className="button-link-2">5 min</span>
          <span className="button-link-2">15 min</span>
          <span className="button-link-2">30 min</span>
          <span className="button-link-2">45 min</span>
          <span className="button-link-2">1 hr</span>
          <span className="button-link-2">2 hr</span>
        </div>

        {/*
      <Line {...lineChartConfig} /> */}

      </div> </div >
    <Footer />


  </>
}
