import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Line } from '@ant-design/plots';
import React from 'react';
import ReactDOM from 'react-dom';

import COLORS from "../Constants";
import "../styles.css";

export default function CoinPage(props) {

  const [lineChartConfig, setLineChartConfig] = useState([]);
  const [lineChartConfig2, setLineChartConfig2] = useState([]);
  const [timeSeries, setTimeSeries] = useState([]);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(0);
  const [quoteData, setQuoteData] = useState([]);
  const fetchDataIntervalId = useRef();

  let tickerSymbol = props.tickerSymbol;

  const options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/time_series',
    params: {
      outputsize: '40',
      symbol: tickerSymbol,
      interval: '1day',
      format: 'json'
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

  // TODO : Use 52 week data
  const options2 = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/quote',
    params: {
      symbol: 'AMZN',
      outputsize: '30',
      format: 'json',
      interval: '1day'
    },
    headers: {
      'x-rapidapi-key': 'de9f03c511msh409345b99ecf623p16aa52jsnc3bf33da52c6',
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
    }
  };

  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

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

        // console.log(`RESPONSE TICKER SYMBOL TIME SERIES is: ${JSON.stringify(response)}`);
        // console.log(`${JSON.stringify(response)}`);

        let arrayOfTimeSeries = response.data.values;
        console.log(`arrayOfTimeSeries ` + arrayOfTimeSeries);

        let year = 2000;


        let dataArray2 = [];
        arrayOfTimeSeries.forEach(timePeriod => {
          dataArray2.push({ x: timePeriod.datetime, value: Number(timePeriod.open) });
        });


        // for Ant Charts
        /*
        setLineChartConfig2({
          timeSeries,
          xField: 'year',
          yField: 'value',
          point: {
            shapeField: 'square',
            sizeField: 4,
          },
          interaction: {
            tooltip: {
              marker: false,
            },
          },
          style: {
            lineWidth: 2,
          },
        }); */


        setLineChartConfig({
          data,
          xField: 'year',
          yField: 'value',
          point: {
            shapeField: 'square',
            sizeField: 4,
          },
          interaction: {
            tooltip: {
              marker: false,
            },
          },
          style: {
            lineWidth: 2,
          },
        });




        // Delete?
        setTimeSeries([{

          "data": dataArray2
        }]);

        console.log('timeseries: ', JSON.stringify(timeSeries));



      }).catch((err) => console.warn(err));
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    /*
        try {
          const response2 = axios.request(options2).then((response2) => {

            // console.log(`RESPONSE TICKER SYMBOL TIME SERIES is: ${JSON.stringify(response)}`);
            // console.log(`${JSON.stringify(response)}`);

            let arrayOfTimeSeries = response2.data.values;
            console.log(`arrayOfTimeSeries line 180: ` + JSON.stringify(arrayOfTimeSeries));

            let theYear = 2000;

            let dataArray2 = [];
            arrayOfTimeSeries.forEach(timePeriod => {
              theYear++;
              // timePeriod.datetime
              dataArray2.push({ year: theYear, value: Number(timePeriod.open) });
            });

          }).catch((err) => console.warn(err));
          console.log(response2);
        } catch (error) {
          console.error(error);
        } */


    // Clean up for unmount to prevent memory leak
    return () => clearInterval(fetchDataIntervalId.current);
  }, [options, options2, fetchDataTrigger, timeSeries, data]);

  return <>
    <span className="page-heading-text">
      {props.coinSymbol} &middot;&nbsp;
      {props.coinName} </span>

    <span className="page-heading-text-2">
      <img
        src={props.coinPriceChange >= 0 ? '../up-arrow.svg' : '../up-arrow.svg'}
        className={props.coinPriceChange >= 0 ? 'up-arrow' : 'down-arrow'}
        alt="" />

      {props.coinPriceChange}%

      <span className="tag1">24h</span>
      &nbsp;&nbsp;

      ${props.coinPrice} </span>

    <div className='currency-page-box'>

      <span className="text1">timeSeries.length: {timeSeries.length}</span>
      <br />
      <span className="text1">data.length: {data.length}</span>

      <Line {...lineChartConfig} />

      {/* <Line {...lineChartConfig} /> */}


    </div></>
}
