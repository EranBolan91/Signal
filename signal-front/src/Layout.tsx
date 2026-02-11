import Navbar from "./components/Navbar";
import { Box } from "@mui/material";
import React from "react";

type Props = { children?: React.ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <Box sx={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      {children}
    </Box>
  );
};

export default Layout;
