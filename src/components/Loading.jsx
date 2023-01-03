import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Loading = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default Loading;
