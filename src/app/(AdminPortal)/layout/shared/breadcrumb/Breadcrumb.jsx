"use client";
import React from "react";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";

// import breadcrumbImg from "public/images/breadcrumb/ChatBc.png";
import { IconCircle } from "@tabler/icons-react";

const Breadcrumb = ({ items, title }) => (
  <Box>
    <Typography variant="h4">{title}</Typography>
    <Breadcrumbs
      separator={
        <IconCircle
          size="5"
          fill="textSecondary"
          fillOpacity={"0.6"}
          style={{ margin: "0 5px" }}
        />
      }
      sx={{ alignItems: "center", mt: items ? "10px" : "" }}
      aria-label="breadcrumb"
    >
      {items
        ? items.map((item) => (
            <div key={item.title}>
              {item.to ? (
                <NextLink href={item.to} passHref>
                  <Typography color="textSecondary">{item.title}</Typography>
                </NextLink>
              ) : (
                <Typography color="textPrimary">{item.title}</Typography>
              )}
            </div>
          ))
        : ""}
    </Breadcrumbs>
  </Box>
);

export default Breadcrumb;
