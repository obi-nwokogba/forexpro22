import { Component, useState, useRef, useEffect, createContext } from "react";

import ReactDOM from "react-dom";

import "./styles.css";
import { fetchMarketCap } from "./Actions/Marketcap";

// import BigTextDisplay from "./BigTextDisplay";
// import ColorSampleCircle from "./ColorSampleCircle";
// import Footer from "./Footer";
// import RandomColors from "./RandomColors";
// import RGBSlider from "./RGBSlider";
// import Shades from "./Shades";
// import Variants from "./Variants";

class App extends Component {
  componentDidMount() {
    setInterval(this.props.fetchMarketCap(), 3000);
  }
  componentDidUpdate() {}

  componentWillUnmount() {
    // this.destroyConnection();
  }

  // let response = {};
  /*
  let realCoinData = [];
  const [displayResponse, setDisplayResponse] = useState([]);

  componentDidMount(){
    axios.request(options)
      .then(res => {
        setDisplayResponse(res.data.data.coins);
      });
  }; */

  render() {
    return <></>;
  }
}

export default App;
