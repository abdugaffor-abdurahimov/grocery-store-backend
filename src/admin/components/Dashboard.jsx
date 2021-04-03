import { ApiClient } from "admin-bro";
import React, { useState, useEffect } from "react";

import { Box } from "@admin-bro/design-system";

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
        <a href="/api/api-docs">API Documentation</a>
      </Box>
    </Box>
  );
};

export default Dashboard;
