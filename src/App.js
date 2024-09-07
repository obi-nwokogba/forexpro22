import { Component } from "react";
import { Forex, ForexHome, Watch } from "./components";
import "./styles.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Watch />}></Route>
          <Route path="/forex" element={<Forex />}></Route>
          <Route path="/crypto/:urlSymbol" element={<Forex />}></Route>
          <Route path="/forex/:urlSymbol" element={<Forex />}></Route>
          <Route path="/watch/:urlSymbol" element={<Watch />}></Route>
          <Route path="/forexhome" element={<ForexHome />}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
