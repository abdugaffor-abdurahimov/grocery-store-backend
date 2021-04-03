import { ApiClient, useAction } from "admin-bro";
import React, { useState, useEffect } from "react";

import { Box } from "@admin-bro/design-system";

const api = new ApiClient();

const Dashboard = () => {
  const [data, setData] = useState({});

  const { href, handleClick } = useAction(
    action,
    {
      resourceId,
      recordId,
      recordIds,
    },
    actionPerformed
  );

  console.log(action);

  useEffect(() => {
    api.getDashboard().then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <Box variant="grey">
      <Box variant="white">
        <h1>Grocery store {data.some}</h1>
        <Button as="a" onClick={handleClick} href={href}>
          Click this action
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
