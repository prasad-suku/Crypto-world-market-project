import React, { useContext, useEffect, useState } from "react";
import "./coin.css";
import { useParams, Link } from "react-router-dom";
import { Coincontext } from "../../context/Coincontext";
import LineChart from "../../components/LineChart/LineChart";
import Footer from "../../components/footer/Footer";

const Coin = () => {
  const { currency, Convertshortamt } = useContext(Coincontext);
  const { coinid } = useParams();
  const [coindata, setcoindata] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [previousHistoricaldata, setPreviousHistoricaldata] = useState(1);

  // fetch coin-data function
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchcoindata = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-nHrSj179nHcvgs4SqwXmPyfc",
          },
        };

        let response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinid}`,
          options
        );
        let data = await response.json();
        // console.log(data);
        setcoindata(data);

        setError(false);
      } catch (e) {
        setError(true);
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchcoindata();
  }, []);

  // loader functionality
  if (loading) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  //  Error or no data case
  if (error || !coindata || !coindata.name) {
    return (
      <div className="error min-h-100  ">
        <img
          className="w-50 h-50 mb-5 mx-auto mt-20 m-4"
          src="https://th.bing.com/th?id=OIP.EIEHSpTPA7nVq6Nck8SL1gHaGw&w=261&h=238&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
          alt=""
        />
        <p>Coin Not Found</p>
      </div>
    );
  }

  return (
    <>
      <div className="main">
        <div className="coin grid grid-cols-12 h-auto  gap-6  p-8">
          {/* Left-side info */}
          <div className="left-side-info col-span-12 lg:col-span-4 md:col-span-12 flex flex-col items-center">
            <div className="space-y-5 w-full">
              <div className="flex items-center space-x-2">
                <img
                  src={coindata.image.thumb}
                  alt="Bitcoin logo"
                  className="w-8 h-8"
                />
                <h1 className="text-xl font-bold">
                  {coindata.name.toUpperCase()} <span>{coindata.symbol}</span>
                </h1>
                <span className="text-white font-thin">
                  #{coindata.market_cap_rank}
                </span>
              </div>
              <div className="text-4xl font-bold flex items-center gap-2">
                Price: {currency.symbol}
                {Convertshortamt(
                  coindata.market_data.current_price[currency.name]
                ).toLocaleString()}
                <span
                  className={`${
                    coindata.market_data
                      .price_change_percentage_24h_in_currency[currency.name] <
                    0
                      ? "text-red-600 text-sm p-1 rounded-full bg-slate-300"
                      : "text-green-700 text-sm p-1 rounded-full bg-slate-300"
                  }`}
                >
                  {coindata.market_data.price_change_percentage_24h_in_currency[
                    currency.name
                  ].toFixed(2)}
                  %
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-2 bg-gray-100 rounded-lg text-center">
                  <div className="text-black text-sm">Rank</div>
                  <div className="text-lg font-bold text-black">
                    #{coindata.market_cap_rank}
                  </div>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg text-center">
                  <div className="text-black text-sm">Market cap</div>
                  <div className="text-lg font-bold text-black">
                    {currency.symbol}
                    {Convertshortamt(
                      coindata.market_data.market_cap[currency.name]
                    )}
                  </div>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg text-center">
                  <div className="text-black text-sm">24H_LOW</div>
                  <div className="text-lg font-bold text-pink-700">
                    {currency.symbol}
                    {Convertshortamt(
                      coindata.market_data.low_24h[currency.name]
                    ).toLocaleString()}
                  </div>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg text-center">
                  <div className="text-black text-sm">24H_High</div>
                  <div className="text-lg font-bold text-green-600">
                    {currency.symbol}
                    {Convertshortamt(
                      coindata.market_data.high_24h[currency.name]
                    ).toLocaleString()}
                  </div>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg text-center">
                  <div className="text-black text-sm">Total Supply</div>
                  <div className="text-lg font-bold text-black">
                    {Convertshortamt(
                      coindata.market_data.total_supply
                    ).toLocaleString()}
                  </div>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg text-center">
                  <div className="text-black text-sm">Max Supply</div>
                  <div className="text-lg font-bold text-black">∞</div>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg text-center col-span-2">
                  <div className="text-black text-sm">Circulation Supply</div>
                  <div className="text-lg font-bold text-black">
                    {Convertshortamt(
                      coindata.market_data.circulating_supply
                    ).toLocaleString()}
                  </div>
                </div>
              </div>

              <hr />
              <div className="social_links space-y-2 ">
                <p className="text-lg text-center">{coindata.name} - Links</p>
                <ul className="space-y-1">
                  <li className="flex gap-3">
                    <span>Website:</span>
                    <a
                      className="text-green-200 text-wrap hover:text-white"
                      href={coindata.links.homepage}
                    >
                      {coindata.links.homepage}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <span>Github:</span>
                    <a
                      className="text-green-200 hover:text-white"
                      href={
                        coindata.links.repos_url.github[1]
                          ? coindata.links.repos_url.github[1]
                          : "#"
                      }
                    >
                      {coindata.links.repos_url.github[1]
                        ? coindata.links.repos_url.github[1]
                        : "Not Provided"}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="balance col-span-12 lg:col-span-8 md:col-span-12 flex flex-col items-center ">
            <div className="coin-description flex flex-col sm:mb-5 mb-8 items-center">
              <img className="w-20" src={coindata.image.large} alt="coin_img" />
              <p className="text-2xl mt-2">
                {coindata.name.toUpperCase()}({coindata.symbol})
              </p>
              <hr className="h-1 w-40 bg-white my-1" />
              <p className="font-light text-wrap text-center sm:px-20">
                {coindata.description.en.split(".").slice(0, 1)}
              </p>
            </div>

            {/* linechart */}

            <div className=" mt-2 sm:mt-2 linechart sm:h-[300px] ">
              {/* historical data selection */}
              <div className="coin_price-chart flex justify-around items-center">
                <p className="text-xl font-semibold underline-offset-2">
                  {coindata.name.toUpperCase()} Price Chart
                </p>
                <select
                  name="historydata"
                  id="history"
                  className="my-3 w-40 "
                  onChange={(e) => setPreviousHistoricaldata(e.target.value)}
                >
                  <option value="1">1 Day</option>
                  <option value="7">7 Days</option>
                  <option value="30">1 Month</option>
                  <option value="90">3 Months</option>
                  <option value="180">6 Months</option>
                  <option value="360">1 Year</option>
                </select>
              </div>

              <LineChart
                coinname={coinid}
                currencyname={currency.name}
                previousHistoricaldata={previousHistoricaldata}
              />
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Coin;
