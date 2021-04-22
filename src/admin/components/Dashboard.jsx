import { ApiClient } from "admin-bro";
import React, { useState, useEffect } from "react";

import { Box, Loader } from "@admin-bro/design-system";
import LineChart from "./chart/Linechart";
import BarChart from "./chart/BarChart";

const api = new ApiClient();

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    api.getDashboard().then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <Box variant="grey">
      <Box variant="white">
        <h1>Grocery store {data.some}</h1>
        <br />
        {data.charges ? (
          <>
            <LineChart charges={data.charges} />
            <BarChart selledProducts={data.selledProducts} />
          </>
        ) : (
          <Loader />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
