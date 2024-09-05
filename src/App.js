import { Component } from "react";
import { Forex, ForexHome } from "./components";
import "./styles.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ForexHome />}></Route>
          <Route path="/crypto/:urlSymbol" element={<Forex />}></Route>
          <Route path="/forex/:urlSymbol" element={<Forex />}></Route>
          <Route path="/forex" element={<ForexHome />}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
