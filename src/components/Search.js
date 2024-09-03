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

    if (currentSearchText === "") {
      setProducts([]);
      return;
    }

    // Key Search Logic
    const filterBySearch = productList.filter((item) => {
      if (item.ticker.toLowerCase().includes(currentSearchText) ||
        item.key.toLowerCase().includes(currentSearchText) ||
        item.name.toLowerCase().includes(currentSearchText) ||
        item.name.toLowerCase().includes(currentSearchText)
      ) {
        return item.ticker.toString();
      }
    });
    setSearchResult(filterBySearch);
    setProducts(filterBySearch);
  }

  function clearSearch() {
    setSearchVal('');
    // setProducts([]);
    setSearchResult([]);
    return;
  }



  return <><div className="search-container">
    <Space direction="vertical">
      <Search
        placeholder="search currency, coin, symbol"
        allowClear
        onClear={clearSearch}
        onChange={handleSearchType}
        onInput={handleSearchType}
        onPressEnter={handleSearchClick}
        onSearch={handleSearchClick}
        style={{ width: 450 }}
      />
    </Space>
    <br />
    <div className="search-result-display"
      style={{
        display: searchResult.length ? 'flex' : 'none',
      }}>

      <span className="text6"><b>{products.length}</b> Search Results</span>
      <div>

        <br />
        {products.map((product) => {
          return (
            <div className="individual-search-result">{product.ticker} &middot; {product.name}</div>
          )
        })
        }
      </div>
    </div>

  </div ></>;
}
