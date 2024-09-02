import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Line } from '@ant-design/plots';

import COLORS from "../Constants";
import "../styles.css";

export default function CoinPage(props) {

  const [timeSeries, setTimeSeries] = useState([]);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(0);
  const fetchDataIntervalId = useRef();

  let tickerSymbol = props.tickerSymbol;

  const options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/time_series',
    params: {
      outputsize: '30',
      symbol: 'EUR/USD',
      interval: '1day',
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

        setTimeSeries(arrayOfTimeSeries.map(timePeriod => {
          // return ({ year: timePeriod.dateTime.slice(0, 4), value: timePeriod.open, category: 'forex' });

          let newTimeObj = { year: String(timePeriod.datetime).slice(0, 4), value: timePeriod.open };
          return newTimeObj;
        }));

        console.log('refined Timeseries: ', timeSeries);

      }).catch((err) => console.warn(err));
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    // Clean up for unmount to prevent memory leak
    return () => clearInterval(fetchDataIntervalId.current);
  }, [options, fetchDataTrigger]);




  const lineChartConfig = {
    data: {
      type: 'fetch',
      value: timeSeries,
    },
    xField: (d) => new Date(d.year),
    yField: 'value',
    sizeField: 'value',
    shapeField: 'trail',
    legend: { size: false },
    colorField: 'category',
  };


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









    <div className='currency-box-1'>

      <span className="text1">  {timeSeries.length}</span>

      {/* <Line {...lineChartConfig} /> */}
      {timeSeries.length}


    </div></>
}
