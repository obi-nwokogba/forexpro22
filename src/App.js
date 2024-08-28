import { useState, useRef, useEffect, createContext } from "react";
import axios from "axios";

import "./styles.css";
// import BigTextDisplay from "./BigTextDisplay";
// import ColorSampleCircle from "./ColorSampleCircle";
// import Footer from "./Footer";
// import RandomColors from "./RandomColors";
// import RGBSlider from "./RGBSlider";
// import Shades from "./Shades";
// import Variants from "./Variants";

export const CurrentColorContext = createContext(null);

function App() {
  /*
  const [post, updatePost] = useState({ title: "" });

  useEffect(() => {
    axios.get("https://api.myjson.com/bins/19dtxc").then(({ data }) => {
      updatePost(data);
    });
  });*/

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

  let response = "";
  let displayResponse;

  async function getData() {
    try {
      response = await axios.request(options);
      displayResponse = response.data.data;
      // displayResponse = response.map((record) => (
      //   <tr>
      //     <td>{record.teacherID}</td>
      //     <td>{record.teacherName}</td>
      //     <td>{record.teacherEmail}</td>
      //   </tr>
      // ));
      console.log(displayResponse);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  getData();

  return (
    <>
      <div className="topLogoBrand">forexpro22</div>
      <div className="appContainer">
        <div>
          <p>{displayResponse}</p>
          ...
        </div>
      </div>
    </>
  );
}

export default App;
