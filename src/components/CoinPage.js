import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Line } from '@ant-design/plots';
import { ResponsiveLine } from '@nivo/line'
import React from 'react';
import ReactDOM from 'react-dom';

import COLORS from "../Constants";
import "../styles.css";

export default function CoinPage(props) {

  // const [lineChartConfig, setLineChartConfig] = ([]);
  const [timeSeries, setTimeSeries] = useState([]);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(0);
  const fetchDataIntervalId = useRef();

  let tickerSymbol = props.tickerSymbol;

  const options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/time_series',
    params: {
      outputsize: '30',
      symbol: tickerSymbol,
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


  let data = [
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


  data = [{ "year": "02", "value": 1.1046 }, { "year": "30", "value": 1.10766 }, { "year": "29", "value": 1.11198 }, { "year": "28", "value": 1.11835 }, { "year": "27", "value": 1.11599 }, { "year": "26", "value": 1.11914 }, { "year": "23", "value": 1.11089 }, { "year": "22", "value": 1.11506 }, { "year": "21", "value": 1.11293 }, { "year": "20", "value": 1.10837 }, { "year": "19", "value": 1.10253 }, { "year": "16", "value": 1.09736 }, { "year": "15", "value": 1.10122 }, { "year": "14", "value": 1.09906 }, { "year": "13", "value": 1.09306 }, { "year": "12", "value": 1.0913 }, { "year": "09", "value": 1.09162 }, { "year": "08", "value": 1.0922 }, { "year": "07", "value": 1.09302 }, { "year": "06", "value": 1.09502 }, { "year": "05", "value": 1.09065 }, { "year": "02", "value": 1.07918 }, { "year": "01", "value": 1.08265 }, { "year": "31", "value": 1.08137 }, { "year": "30", "value": 1.08229 }, { "year": "29", "value": 1.08562 }, { "year": "26", "value": 1.08457 }, { "year": "25", "value": 1.08412 }, { "year": "24", "value": 1.08533 }, { "year": "23", "value": 1.08918 }];


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




  const dataSample = [
    {
      "id": "line1",
      "color": "hsl(43, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 197
        },
        {
          "x": "helicopter",
          "y": 108
        },
        {
          "x": "boat",
          "y": 99
        },
        {
          "x": "train",
          "y": 22
        },
        {
          "x": "subway",
          "y": 154
        },
        {
          "x": "bus",
          "y": 52
        },
        {
          "x": "car",
          "y": 142
        },
        {
          "x": "moto",
          "y": 107
        },
        {
          "x": "bicycle",
          "y": 202
        },
        {
          "x": "horse",
          "y": 38
        },
        {
          "x": "skateboard",
          "y": 90
        },
        {
          "x": "others",
          "y": 290
        }
      ]
    },
  ];


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

      <span className="text1">  {timeSeries.length}</span>


      <ResponsiveLine
        data={dataSample}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle',
          truncateTickAt: 0
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle',
          truncateTickAt: 0
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />

      {timeSeries.length}


    </div></>
}
