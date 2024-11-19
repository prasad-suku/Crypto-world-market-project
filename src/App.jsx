import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
import Footer from "./components/footer/Footer";
import "./App.css";
import SignIn from "./pages/SignIn/SignIn";
import Allcoins from "./pages/Allcoinspage/Allcoins";

const App = () => {
  // console.log("myapi key :", process.env.REACT_APP_API_KEY);

  return (
    <BrowserRouter>
      {/* <h1>my api key :{process.env.REACT_APP_API_KEY}</h1> */}
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allcoins" element={<Allcoins />} />

          <Route path="/coin/:coinid" element={<Coin />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
