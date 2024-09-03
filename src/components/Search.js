import { useEffect, useRef, useState } from "react";
import { Input, Space } from "antd";

import { FOREXSYMBOLS, CONSTANTS2 } from '../Utils';


export default function Search() {

  let productList = [];
  for (const [key, value] of Object.entries(FOREXSYMBOLS)) {
    value.key = key;
    productList.push(value);
  }
  const { Search } = Input;

  const [products, setProducts] = useState(['']);
  const [searchVal, setSearchVal] = useState("");
  const [searchResult, setSearchResult] = useState([]);


  function handleSearchClick() {
    /*
  if (searchVal === "") { setProducts(productList); return; }
  const filterBySearch = productList.filter((item) => {
    if (item.toLowerCase()
      .includes(searchVal.toLowerCase())) { return item; }
  })
  setProducts(filterBySearch);*/
  }

  function handleSearchType(e) {
    let currentSearchText = e.target.value.toString();
    setSearchVal(currentSearchText);
    console.log(`currentSearchText is ${currentSearchText}`);

    if (currentSearchText === "") { setProducts([]); return; }

    const filterBySearch = productList.filter((item) => {
      if (item.ticker.toLowerCase().includes(currentSearchText) ||
        item.key.toLowerCase().includes(currentSearchText)) {
        return item.ticker.toString();
      }
      /*
      return (item.ticker.toLowerCase().includes(currentSearchText) ||
        item.key.toLowerCase().includes(currentSearchText)
      );*/
    });

    setSearchResult(filterBySearch);
    setProducts(filterBySearch);
  }

  return <><div className="search-container">
    <Space direction="vertical">
      <Search
        placeholder="search currency, coin, symbol"
        allowClear
        onChange={handleSearchType}
        onInput={handleSearchType}
        onPressEnter={handleSearchClick}
        onSearch={handleSearchClick}
        style={{ width: 304 }}
      />
    </Space>
    <br />
    <div className="search-result-display"
      style={{
        display: searchResult.length ? 'flex' : 'none',
      }}>

      {/* <span className="text6">{8} financial instruments monitored</span>
      <span className="text6">{products.length} Search Results</span> */}
      <div>

        <br />
        {products.map((product) => {
          return (
            <div className="individual-search-result">{product}</div>
          )
        })
        }
      </div>
    </div>

  </div ></>;
}
