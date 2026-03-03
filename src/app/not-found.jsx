"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";

const Error = () => (
  <Box
    sx={{
      backgroundColor: "#635738",
      borderRadius: "0px",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      textAlign: "center",
      justifyContent: "center",
    }}
  >
    <Container maxWidth="md">
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          mb: 4,
          "@media (max-width: 768px)": {
            maxWidth: "350px",
          },
          "@media (max-width: 480px)": {
            maxWidth: "250px",
          },
        }}
      >
        <Image
          src={"/Images/APSlogo.png"}
          alt="404"
          width={500}
          height={500}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </Box>
      <Typography
        align="center"
        variant="h1"
        sx={{
          mb: 4,
          color: "#FFFFFF",
          paddingTop: "20px",
          fontSize: {
            xs: "1.5rem",
            sm: "2rem",
            md: "3rem",
          },
        }}
      >
        Opps!!!
      </Typography>
      <Typography
        align="center"
        variant="h4"
        sx={{
          mb: 4,
          color: "#FFFFFF",
          fontSize: {
            xs: "0.8rem",
            sm: "1rem",
            md: "1.5rem",
          },
        }}
      >
        This page you are looking for could not be found.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        component={Link}
        href="/admin"
        disableElevation
        sx={{
          backgroundColor: "#FFFFFF",
          color: "#191919",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: 600,
        }}
      >
        Go Back to Home
      </Button>
    </Container>
  </Box>
);

export default Error;
