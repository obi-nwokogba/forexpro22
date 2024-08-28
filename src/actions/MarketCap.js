/*import {
  FETCH_MARKET_CAP,
  FETCH_MARKET_CAP_SUCCEED,
  FETCH_MARKET_CAP_FAILED,
} from "./Types";
*/
import axios from "axios";

export const fetchMarketCap = () => async (dispatch) => {
  const options = {
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

  const res = await axios.fetch(options);

  const response = await axios.fetch(options).then((marketcaps) =>
    dispatch({
      type: FETCH_MARKET_CAP_SUCCEED,
      payload: marketcaps.Data,
    })
  );
};
