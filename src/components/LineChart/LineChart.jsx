import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const LineChart = ({ coinname, currencyname, previousHistoricaldata }) => {
  const [data, setData] = useState([["Date", "Price"]]);

  const historicalChartsdata = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-nHrSj179nHcvgs4SqwXmPyfc",
      },
    };

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinname}/market_chart?vs_currency=${currencyname}&days=${previousHistoricaldata}`,
        options
      );
      const result = await res.json();

      // Check if result has prices data
      if (result && result.prices) {
        const dataCopy = [["Date", "Price"]];
        result.prices.forEach((item) => {
          dataCopy.push([new Date(item[0]).toLocaleDateString(), item[1]]);
        });
        setData(dataCopy);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    historicalChartsdata();
  }, [coinname, currencyname, previousHistoricaldata]); // Call whenever coinname or currencyname changes

  return <Chart chartType="LineChart" data={data} height="100%" />;
};

export default LineChart;
