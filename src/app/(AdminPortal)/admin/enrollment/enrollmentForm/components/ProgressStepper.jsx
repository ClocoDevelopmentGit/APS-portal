"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const ProgressTitle = styled(Typography)({
  fontSize: "17px",
  fontWeight: 700,
  color: "#635738",
  textAlign: "center",
  marginBottom: "30px",
  letterSpacing: "0.5px",
});

const StepperContainer = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  position: "relative",
  "@media (max-width: 568px)": {
    marginBottom: "20px",
  },
});

const StepItem = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 1,
  position: "relative",
  zIndex: 2,
  minWidth: 0,
});

const StepCircle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "completed",
})(({ active, completed }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: active || completed ? "#AE9964" : "#FFFFFF",
  color: active || completed ? "#FFFFFF" : "#666666",
  border: active || completed ? "none" : "2px solid #D0D0D0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  fontWeight: 600,
  marginBottom: "12px",
  flexShrink: 0,
  "@media (max-width: 568px)": {
    width: "35px",
    height: "35px",
    fontSize: "14px",
  },
}));

const StepLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }) => ({
  fontSize: "13px",
  fontWeight: active ? 500 : 400,
  color: active ? "#191919" : "#A0A0A0",
  textAlign: "center",
  wordBreak: "break-word",
  hyphens: "auto",
  maxWidth: "100%",
  lineHeight: "18px",
  "@media (max-width: 568px)": {
    fontSize: "11px",
  },
}));

const StepLineContainer = styled(Box)({
  position: "absolute",
  top: "20px",
  left: "0",
  right: "0",
  height: "2px",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  "@media (max-width: 568px)": {
    top: "17px",
  },
});

const StepLine = styled(Box)({
  position: "absolute",
  top: "0",
  height: "2px",
  backgroundColor: "#E5E5E5",
  left: "12.5%",
  right: "12.5%",
});

const StepLineProgress = styled(Box, {
  shouldForwardProp: (prop) => prop !== "progress",
})(({ progress }) => ({
  position: "absolute",
  top: "0",
  height: "2px",
  backgroundColor: "#AE9964",
  left: "12.5%",
  width: `calc(${progress}% * 0.75)`,
  transition: "width 0.3s ease",
}));

const ProgressStepper = ({ currentStep, steps }) => {
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <Box>
      <ProgressTitle>ENROLMENT PROGRESS</ProgressTitle>
      <StepperContainer>
        <StepLineContainer>
          <StepLine />
          <StepLineProgress progress={progressPercentage} />
        </StepLineContainer>
        {steps.map((step) => (
          <StepItem key={step.number}>
            <StepCircle
              active={currentStep === step.number}
              completed={currentStep > step.number}
            >
              {step.number}
            </StepCircle>
            <StepLabel active={currentStep === step.number}>
              {step.label}
            </StepLabel>
          </StepItem>
        ))}
      </StepperContainer>
    </Box>
  );
};

export default ProgressStepper;
