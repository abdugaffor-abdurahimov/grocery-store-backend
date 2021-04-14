import React from "react";
import { Label, Box, DropZone, DropZoneProps } from "@admin-bro/design-system";
import { BasePropertyProps } from "admin-bro";

const Edit: React.FC<BasePropertyProps> = (props) => {
  const { onChange, property } = props;

  const handleDropZoneChange: DropZoneProps["onChange"] = (files) => {
    onChange(property.name, files[0].name);
  };

  return (
    <>
      <Box>
        <Label>{property.label}</Label>
        <DropZone onChange={handleDropZoneChange} />
      </Box>
      <br />
      <br />
    </>
  );
};

export default Edit;
