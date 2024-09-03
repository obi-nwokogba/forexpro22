import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Line } from '@ant-design/plots';
import React from 'react';
import ReactDOM from 'react-dom';

import COLORS from "../Constants";
import "../styles.css";

export default function CoinPage(props) {

  const [lineChartConfig, setLineChartConfig] = ([]);
  const [timeSeries, setTimeSeries] = useState([]);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(0);
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
        // console.log(typeof (arrayOfTimeSeries));

        let year = 2000;

        let dataArray2 = [];
        arrayOfTimeSeries.forEach(timePeriod => {
          dataArray2.push({ x: timePeriod.datetime, y: Number(timePeriod.open) });
        });


        // for Ant Charts
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
          "id": 'Somesteing',
          "color": "hsl(43, 70%, 50%)",
          "data": dataArray2
        }]);

        console.log('refined Timeseries: ', JSON.stringify(timeSeries));



      }).catch((err) => console.warn(err));
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    // Clean up for unmount to prevent memory leak
    return () => clearInterval(fetchDataIntervalId.current);
  }, [options, fetchDataTrigger, timeSeries, data]);

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


    </div></>
}
