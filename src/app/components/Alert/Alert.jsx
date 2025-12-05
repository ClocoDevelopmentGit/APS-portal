import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";
import { useEffect } from "react";

const StyledAlert = styled(Alert)(({ severity }) => ({
  ...(severity === "success" && {
    backgroundColor: "#388e3c",
    color: "#ffffff",
    ".MuiAlert-icon": {
      color: "#ffffff",
    },
  }),
  ...(severity === "error" && {
    backgroundColor: "#d32f2f",
    color: "#ffffff",
    ".MuiAlert-icon": {
      color: "#ffffff",
    },
  }),
}));

const Alerts = ({ severity, message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (!onClose) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);
  if (!message) return null;

  return (
    <Stack
      sx={{
        width: "25%",
        position: "absolute",
        top: "30px",
        right: "30px",
        zIndex: 99999999999999,
      }}
      spacing={2}
    >
      <StyledAlert variant="filled" severity={severity} onClose={onClose}>
        <AlertTitle>
          {severity.charAt(0).toUpperCase() + severity.slice(1)}
        </AlertTitle>
        {message}
      </StyledAlert>
    </Stack>
  );
};

export default Alerts;
