import React from "react";
import { BasePropertyProps } from "admin-bro";
import { Box } from "@admin-bro/design-system";

const Show: React.FC<BasePropertyProps> = (props) => {
  const { record } = props;
  const srcImg = record.params["images.0"];

  return (
    <Box marginBottom="xxl">
      <h1>Image</h1>
      {true ? <img src={srcImg} width="300px" alt="product img" /> : "no image"}
    </Box>
  );
};

export default Show;
