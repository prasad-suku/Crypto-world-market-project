import React, { useContext, useState, useEffect } from "react";
import { Coincontext } from "../../context/Coincontext";
import { useNavigate } from "react-router-dom";
import "./allcoins.css";
const Allcoins = () => {
  const { allcoins, currency, Convertshortamt } = useContext(Coincontext);
  const navigatetoCoin = useNavigate();

  const [displaycoins, setdisplaycoins] = useState([]);
  const [input, setinput] = useState("");

  // handle input function
  const handleInputChange = (e) => {
    setinput(e.target.value);
    if (input === "") {
      setdisplaycoins(allcoins);
    }
  };

  // navigate to coin page function
  const handleCoinClick = (coinname) => {
    // let [coin] = coinname.split(" ");
    navigatetoCoin(`/coin/${coinname}`);
  };

  // handle search function based on user input value
  const handleSearch = (e) => {
    e.preventDefault();
    const coins = allcoins.filter((coins) => {
      return coins.name.toLowerCase().includes(input.toLowerCase());
    });
    setdisplaycoins(coins);
    setCurrentPage(1); // Reset to first page after search
  };

  useEffect(() => {
    setdisplaycoins(allcoins);
  }, [allcoins]);

  return (
    <>
      <div className="form-container flex  md:justify-end  sm:m-5 my-5 mx-2">
        {/* input search */}
        <form onSubmit={handleSearch} className="mx-auto">
          <input
            type="text"
            value={input}
            list="listitem"
            onChange={handleInputChange}
            placeholder="Search Coins.."
          />
          <datalist id="listitem">
            {allcoins.map((item, i) => (
              <option key={i} value={item.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>

      {/* coin container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
        {displaycoins.slice(0, 10).map((crypto, i) => (
          <div
            onClick={() => handleCoinClick(crypto.id)}
            key={i}
            className="bg-blue-700 p-4 rounded-lg shadow-md hover:bg-blue-800 hover:cursor-pointer duration-200"
          >
            <div className="flex items-center justify-between mb-4 pb-2  border-b-2">
              <img
                src={crypto.image}
                alt={`icon`}
                className="w-10 h-10  mr-2"
              />
              <h2 className="text-lg font-semibold text-slate-200">
                {crypto.name}
              </h2>
            </div>
            <p className="pb-2">Rank: {crypto.market_cap_rank}</p>
            <p className="pb-2">
              Price: {crypto.current_price.toLocaleString()} {currency.symbol}
            </p>
            <p className="pb-2">
              Market Cap: {Convertshortamt(crypto.market_cap)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Allcoins;
