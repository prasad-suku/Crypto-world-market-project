import React, { useContext, useEffect, useState } from "react";
import "./coin.css";
import { useParams, Link } from "react-router-dom";
import { Coincontext } from "../../context/Coincontext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { currency, Convertshortamt } = useContext(Coincontext);
  const { coinid } = useParams();
  const [coindata, setcoindata] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  console.log("coin data", coindata);
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
      <div className="error">
        <img
          src="https://th.bing.com/th?id=OIP.EIEHSpTPA7nVq6Nck8SL1gHaGw&w=261&h=238&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
          alt=""
        />
        <p>Coin Not Found</p>
      </div>
    );
  }

  // // Constructing the history object
  // const historydata = {
  //   id: 1,
  //   name: coindata.name,
  //   price: coindata.market_data.current_price[currency.name],
  //   market_cap: coindata.market_data.market_cap[currency.name],
  //   "24hr_volume":
  //     coindata.market_data.price_change_percentage_24h_in_currency[
  //       currency.name
  //     ],
  //   symbol: coindata.symbol,
  //   description: coindata.description.en,
  //   coinimg: coindata.image.thumb,
  //   market_rank: coindata.market_cap_rank,
  //   "24h_low": coindata.market_data.low_24h[currency.name],
  //   total_supply: coindata.total_supply,
  //   max_supply: coindata.max_supply,
  //   circulation_supply: coindata.circulation_supply,
  // coin_link : coindata.links.homepage,
  //  git_hub  :coinndata.repos_url.github[0]
  // };

  return (
    <>
      <div class="main ">
        <div class="coin-container">
          <div class="coin grid lg:grid-cols-12  sm:grid-cols-2  gap-20  h-screen p-8">
            <div class="left-side-info col-span-12 md:col-span-12 space-y-4 block  h-screen  ">
              <div className="flex items-center space-x-2">
                <img
                  src={coindata.image.thumb}
                  alt="Bitcoin logo"
                  className="w-8 h-8"
                />
                <h1 className="text-xl font-bold">
                  {coindata.name} <span>{coindata.symbol}</span>
                </h1>
                <span className="text-white font-thin">
                  {coindata.market_cap_rank}
                </span>
              </div>
              <div className="text-4xl font-bold flex items-center gap-2">
                {currency.symbol}
                {coindata.market_data.current_price[
                  currency.name
                ].toLocaleString()}
                <span
                  className={`${
                    coindata.market_data
                      .price_change_percentage_24h_in_currency[currency.name] <
                    0
                      ? "text-red-600  text-sm p-1 rounded-full  bg-slate-300 "
                      : "24h-down text-sm  rounded-full p-1 bg-slate-300 text-green-700"
                  }  `}
                >
                  {coindata.market_data.price_change_percentage_24h_in_currency[
                    currency.name
                  ].toFixed(2)}
                  %
                </span>
              </div>

              <div className="grid sm:grid-cols-2  gap-4 mb-5">
                <div className="p-2 bg-gray-100 rounded-lg text-center">
                  <div className=" text-black text-sm">Rank</div>
                  <div className="lg:text-lg md:text-base text-sm font-bold text-black">
                    #{coindata.market_cap_rank}
                  </div>
                </div>

                <div className="p-2 bg-gray-100 rounded-lg text-center">
                  <div className=" text-black text-sm">Market cap</div>
                  <div className="lg:text-lg md:text-sm text-sm  font-bold text-black">
                    {currency.symbol}
                    {Convertshortamt(
                      coindata.market_data.market_cap[currency.name]
                    )}
                  </div>
                </div>
                {/* ------- */}
                <div className="p-2 bg-gray-100 rounded-lg text-center">
                  <div className=" text-black text-sm">24H_LOW</div>
                  <div className="text-lg font-bold text-pink-700">
                    {currency.symbol}
                    {Convertshortamt(
                      coindata.market_data.low_24h[currency.name]
                    ).toLocaleString()}
                  </div>
                </div>
                {/* ------- */}
                <div className="p-2 bg-gray-100 rounded-lg text-center">
                  <div className=" text-black text-sm">24H_High</div>
                  <div className="text-lg font-bold text-green-600">
                    {currency.symbol}
                    {Convertshortamt(
                      coindata.market_data.high_24h[currency.name]
                    ).toLocaleString()}
                  </div>
                </div>
                {/* ------- */}
                <div className="p-2 bg-gray-100 rounded-lg text-center">
                  <div className=" text-black text-sm">Total Supply</div>
                  <div className="text-lg font-bold text-black">
                    {Convertshortamt(
                      coindata.market_data.total_supply
                    ).toLocaleString()}
                  </div>
                </div>

                <div className="p-2 bg-gray-100 rounded-lg text-center">
                  <div className=" text-black text-sm">Max Supply</div>
                  <div className="text-lg font-bold text-black">∞</div>
                </div>

                <div className="p-2 bg-gray-100 rounded-lg text-center col-span-2 ">
                  <div className=" text-black text-sm">circulation Supply</div>
                  <div className="text-lg font-bold text-black">
                    {Convertshortamt(
                      coindata.market_data.circulating_supply
                    ).toLocaleString()}
                  </div>
                </div>
                {/* social links */}
                <div className="social_links space-y-2 col-span-2 p-2">
                  <p className="text-lg text-center">{coindata.name} - Links</p>
                  <ul className="space-y-1">
                    <li className="flex gap-3">
                      <span className="">WebSite:</span>{" "}
                      <a
                        className="text-green-200 hover:text-white"
                        href={coindata.links.homepage}
                      >
                        {coindata.links.homepage}
                      </a>{" "}
                    </li>
                    <li className="flex gap-3">
                      <span>Github:</span>
                      <a
                        className="text-green-200 hover:text-white"
                        href={coindata.links.repos_url.github[0]}
                      >
                        {coindata.links.repos_url.github[0]}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* historical pie chart */}
            <div class="left-side-info  col-span-12  md:col-span-9 items-center sm:h-3/6    text-white">
              <div className="coin-description flex flex-col items-center">
                <img
                  className="w-20"
                  src={coindata.image.large}
                  alt="coin_img"
                />
                <p className="text-2xl mt-2">
                  {coindata.name}({coindata.symbol})
                </p>
                <hr className="h-10 w-80 bg-white mb-10" />
                {/* description  */}
                <p className="text-wrap font-light sm:px-20 mb-3">
                  {coindata.description.en.split(".").slice(0, 1)}
                </p>
              </div>

              {/* linechart */}
              <LineChart coinname={coinid} currencyname={currency.name} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coin;
