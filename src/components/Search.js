import { useEffect, useRef, useState } from "react";
import { Input, Space } from "antd";

import { CONSTANTS2 } from '../Utils';


export default function Search() {

  let productList = [];
  for (const [key, value] of Object.entries(CONSTANTS2.FOREXSYMBOLS)) {
    productList.push(`${value} ${key}`);
  }
  const { Search } = Input;

  const [products, setProducts] = useState(['']);
  const [searchVal, setSearchVal] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  function handleSearchClick() {
    if (searchVal === "") { setProducts(productList); return; }
    const filterBySearch = productList.filter((item) => {
      if (item.toLowerCase()
        .includes(searchVal.toLowerCase())) { return item; }
    })
    setProducts(filterBySearch);
  }

  function handleSearchType(e) {
    let currentSearchText = e.target.value.toString();
    console.log(`currentSearchText is ${currentSearchText}`);

    if (currentSearchText === "") { setProducts([]); return; }

    const filterBySearch = productList.filter((item) => {
      return item.toLowerCase().includes(currentSearchText);
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
    <div className="searchResultDisplay">
      <span className="text6 block"> {productList.length} financial instruments monitored</span>

      <span className="text6">{products.length} Search Results</span>
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

  </div></>;
}
