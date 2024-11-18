import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import { Coincontext } from "../../context/Coincontext";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const Home = () => {
  const navigatetoCoin = useNavigate();
  const { allcoins, currency } = useContext(Coincontext);
  const [displaycoins, setdisplaycoins] = useState([]);
  const [input, setinput] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const recordsPerPage = 10; // Number of records per page

  // Calculate total pages
  const totalPages = Math.ceil(displaycoins.length / recordsPerPage);

  // handle input function
  const handleInputChange = (e) => {
    setinput(e.target.value);
    if (input === "") {
      setdisplaycoins(allcoins);
    }
  };

  // navigate to coin page function
  const handleCoinClick = (coinname) => {
    let [coin] = coinname.split(" ");
    navigatetoCoin(`/coin/${coin.toLowerCase()}`);
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

  // Pagination data slice
  const paginatedData = displaycoins.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  // Page change handlers
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <div className="home">
        <div className="hero">
          <h1>
            Largest <br /> Crypto Marketplace
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum porro
            in nam voluptates quod Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Nemo incidunt reiciendis excepturi beatae!quam
            accusamus omnis magni suscipit assumenda.
          </p>
          <form onSubmit={handleSearch}>
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

        {/* Crypto data table */}
        <div className="cryptodatatable">
          <table className="table table-dark table-hover m-4">
            <thead>
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Coins</th>
                <th className="p-3">Price</th>
                <th className="p-3">24hr Change</th>
                <th className="p-3">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((coin, i) => (
                  <tr key={i} onClick={() => handleCoinClick(coin.name)}>
                    <td>{coin.market_cap_rank}</td>
                    <td className="coin_img">
                      <img src={coin.image} alt="coin_img" />
                      {coin.name + " - " + coin.symbol}
                    </td>
                    <td>
                      {currency.symbol} {coin.current_price.toLocaleString()}
                    </td>
                    <td
                      className={
                        coin.market_cap_change_percentage_24h > 0
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {Math.floor(coin.market_cap_change_percentage_24h * 100) /
                        100}
                    </td>
                    <td>
                      {currency.symbol + " " + coin.market_cap.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-danger h3">
                    No Results!
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="pagination">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
