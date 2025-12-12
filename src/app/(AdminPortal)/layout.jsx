"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled, useTheme } from "@mui/material/styles";
import React, { useContext, useEffect } from "react";
import Header from "./layout/vertical/header/Header";
import Sidebar from "./layout/vertical/sidebar/Sidebar";
import { CustomizerContext } from "@/app/context/customizerContext";
import config from "@/app/context/config";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "@/redux/slices/userSlice";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  width: "100%",
  backgroundColor: "transparent",
}));

export default function RootLayout({ children }) {
  const { isLayout, activeMode, isCollapse } = useContext(CustomizerContext);
  const theme = useTheme();
  const MiniSidebarWidth = config.miniSidebarWidth;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <MainWrapper className="mainwrapper">
      <Sidebar />
      <PageWrapper className="page-wrapper">
        <Header />
        <Container
          sx={{
            padding: "10px 10px 0px 10px !important",
            maxWidth: isLayout === "boxed" ? "lg" : "100%!important",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
