import { createContext, useEffect, useState } from "react";

export const Coincontext = createContext();

const Cointcontextprovider = ({ children }) => {
  const [allcoins, setallcoin] = useState([]);
  const [currency, setcurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  // logics for convert amount into 2B,3M,1k
  function Convertshortamt(num) {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B"; // Billions
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"; // Millions
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K"; // Thousands
    } else {
      return num.toString(); // Less than 1,000
    }
  }

  //    fetching api coin data's function
  const fetchCoins = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-nHrSj179nHcvgs4SqwXmPyfc",
      },
    };

    await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((res) => res.json())
      .then((res) => setallcoin(res))
      .catch((err) => console.error(err));
  };

  const contextvalue = { allcoins, Convertshortamt, setcurrency, currency };

  useEffect(() => {
    fetchCoins();
  }, [currency]);
  return (
    <Coincontext.Provider value={contextvalue}>{children}</Coincontext.Provider>
  );
};

export default Cointcontextprovider;
