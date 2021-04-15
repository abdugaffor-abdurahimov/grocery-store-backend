import React from "react";
import { BasePropertyProps } from "admin-bro";
import { Box } from "@admin-bro/design-system";

const List: React.FC<BasePropertyProps> = (props) => {
  const { record } = props;
  const description: string = record.params.description;

  return <Box width="300px">{description.slice(0, 100)}</Box>;
};

export default List;
