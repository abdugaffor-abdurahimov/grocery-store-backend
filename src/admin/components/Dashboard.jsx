import { ApiClient } from "admin-bro";
import React, { useState, useEffect } from "react";

import { Box } from "@admin-bro/design-system";
import LineChart from "./chart/Barchar";

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
        <LineChart charges={data.charges} />
      </Box>
    </Box>
  );
};

export default Dashboard;
