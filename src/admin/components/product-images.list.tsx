import React from "react";
import { BasePropertyProps } from "admin-bro";
import { Box } from "@admin-bro/design-system";

const Edit: React.FC<BasePropertyProps> = (props) => {
  const { record } = props;
  const srcImg = record.params["images.0"];

  return <Box>{true ? <img src={srcImg} width="100px" /> : "no image"}</Box>;
};

export default Edit;
