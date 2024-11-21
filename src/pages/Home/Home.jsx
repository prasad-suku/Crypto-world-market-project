import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import { Coincontext } from "../../context/Coincontext";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import home_img from "../../assets/main-page-img.jpg";
const Home = () => {
  const navigatetoCoin = useNavigate();
  const { allcoins, currency, Convertshortamt } = useContext(Coincontext);
  // navigate to coin page function
  const handleCoinClick = (coinname) => {
    // let [coin] = coinname.split(" ");
    navigatetoCoin(`/coin/${coinname}`);
  };
  return (
    <>
      <div className="home">
        <div className="hero grid grid-cols-1 m-10 items-center gap-4 sm:grid-cols-1 md:grid-cols-2">
          <div
            data-aos="fade-down"
            data-aos-duration="800"
            data-aos-once="true"
            className="left-side flex flex-col space-y-3"
          >
            <h1 className="sm:text-6xl text-4xl text-center font-bold mb-4 text-teal-400">
              Step into <br /> Crypto MarketWorld.
            </h1>
            <p className="font-semibold text-slate-300 sm:px-10 px-15">
              Discover up-to-date market data, price trends, and in-depth
              analytics for top cryptocurrencies. provides clear, concise, and
              real-time insights to help you stay informed in the fast-paced
              world of digital assets.
            </p>
          </div>

          {/* right side div section */}
          <div
            className="right-side"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            <img src={home_img} className="w-screen rounded-lg" alt="" />
          </div>

          {/* input form is here */}
        </div>
      </div>

      <h2 className="flex justify-between  mb-7 px-4 items-center   py-4 text-wrap gap-3 text-sm bg-black md:text-2xl">
        TOP 10 Cryptocurrencies in the World{" "}
        <span className="font-bold   md:text-2xl text-lg text-white hover:cursor-pointer">
          <Link to="/allcoins"> Explore more</Link>
        </span>
      </h2>

      {/* top 10 coins */}
      <div className="container mx-auto  p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {allcoins.slice(0, 10).map((crypto, i) => (
            <div
              onClick={() => {
                handleCoinClick(crypto.id);
              }}
              key={i}
              className="bg-blue-700 p-4 hover:cursor-pointer hover:bg-blue-800 rounded-lg shadow-lg hover:shadow-2xl duration-200"
            >
              <div className="flex items-center justify-between mb-4 pb-2  border-b-2">
                <img
                  src={crypto.image}
                  alt={`icon`}
                  className="w-10 h-10 mr-2"
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
      </div>

      {/* footer  section */}

      <Footer />
    </>
  );
};

export default Home;
