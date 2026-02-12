"use client";
import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "./Enrollment.css";

// ==================== THEME ====================
const pickerTheme = createTheme({
  palette: {
    primary: {
      main: "#B38349",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#B38349",
            color: "white",
          },
          "&.Mui-selected": {
            backgroundColor: "#B38349",
            color: "white",
          },
        },
      },
    },
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#B38349",
          color: "white",
        },
      },
    },
  },
});

// ==================== STYLED COMPONENTS ====================

const FormContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
    gap: "0px",
  },
});

const SubSectionTitle = styled(Typography)({
  fontSize: "15px",
  fontWeight: 600,
  color: "#AE9964",
  marginBottom: "20px",
  marginTop: "30px",
});

const FieldLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: 500,
  color: "#191919",
  marginBottom: "8px",
  "& span": {
    color: "#EE5B54",
  },
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    backgroundColor: "#FFFFFF",
    height: "45px",
    "& fieldset": {
      borderColor: "#E5E5E5",
    },
    "&:hover fieldset": {
      borderColor: "#B38349",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#B38349",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "12px 14px",
    fontSize: "14px",
    color: "#333333",
    lineHeight: "19.6px",
    letterSpacing: "-0.28px",
    fontWeight: 400,
    height: "45px",
    boxSizing: "border-box",
    "&::placeholder": {
      color: "#999999",
      opacity: 1,
    },
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #FFFFFF inset !important",
      WebkitTextFillColor: "#333333 !important",
      transition: "background-color 5000s ease-in-out 0s",
    },
    "&:-webkit-autofill:hover": {
      WebkitBoxShadow: "0 0 0 1000px #FFFFFF inset !important",
      WebkitTextFillColor: "#333333 !important",
    },
    "&:-webkit-autofill:focus": {
      WebkitBoxShadow: "0 0 0 1000px #FFFFFF inset !important",
      WebkitTextFillColor: "#333333 !important",
    },
    "&:-webkit-autofill:active": {
      WebkitBoxShadow: "0 0 0 1000px #FFFFFF inset !important",
      WebkitTextFillColor: "#333333 !important",
    },
  },
});

const StyledDatePicker = styled(DatePicker)({
  marginBottom: "20px",
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#FFFFFF",
    "& fieldset": {
      borderColor: "#E0E0E0",
    },
    "&:hover fieldset": {
      borderColor: "#AE9964",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#AE9964",
      borderWidth: "2px",
    },
  },
  "& .MuiSvgIcon-root": {
    color: "#2A3547",
  },
});

const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "16px",
  marginTop: "30px",
  "@media (max-width: 568px)": {
    justifyContent: "space-between",
  },
});

const BackButton = styled(Button)({
  backgroundColor: "#AE9964",
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "5px 24px",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#AE9964",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
});

const NextButton = styled(Button)({
  backgroundColor: "#AE9964",
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "5px 24px",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#AE9964",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
});

// ==================== COMPONENT ====================

const Step1StudentInfo = ({ formData, handleChange, onNext, onBack }) => {
  const handleDateChange = (value) => {
    handleChange({
      target: {
        name: "dateOfBirth",
        value: value ? value.format("YYYY-MM-DD") : "",
      },
    });
  };

  return (
    <ThemeProvider theme={pickerTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box className="step1-student-info">
          {/* Student Information */}
          <FormContainer>
            <Box>
              <FieldLabel>
                First Name: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="firstName"
                placeholder="Emma"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
              />
            </Box>

            <Box>
              <FieldLabel>
                Last Name: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="lastName"
                placeholder="Watson"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </FormContainer>

          <FormContainer>
            <Box>
              <FieldLabel>
                Date of Birth: <span>*</span>
              </FieldLabel>
              <StyledDatePicker
                value={
                  formData.dateOfBirth ? dayjs(formData.dateOfBirth) : null
                }
                onChange={handleDateChange}
                format="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    placeholder: "dd-mm-yyyy",
                  },
                  actionBar: {
                    actions: ["clear", "today"],
                  },
                }}
              />
            </Box>

            <Box>
              <FieldLabel>Current Age:</FieldLabel>
              <StyledTextField
                name="currentAge"
                placeholder="13"
                value={formData.currentAge}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </FormContainer>

          <FormContainer>
            <Box width={"100%"}>
              <FieldLabel>
                Email Address: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />
            </Box>

            <Box width={"100%"}>
              <FieldLabel>
                Mobile Number: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="mobile"
                placeholder="0400 000 000"
                value={formData.mobile}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </FormContainer>

          {/* Parent / Guardian Information */}
          <SubSectionTitle>Parent / Guardian Information:</SubSectionTitle>

          <FormContainer>
            <Box>
              <FieldLabel>
                Parent / Guardian Name: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="guardianName"
                placeholder="Tom Cruise"
                value={formData.guardianName}
                onChange={handleChange}
                fullWidth
              />
            </Box>

            <Box>
              <FieldLabel>
                Parent / Guardian Contact Number: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="guardianContact"
                placeholder="+61 412 345 678"
                value={formData.guardianContact}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </FormContainer>

          <FormContainer>
            <Box>
              <FieldLabel>
                Parent / Guardian Email Address: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="guardianEmail"
                type="email"
                placeholder="tom.cruise@gmail.com"
                value={formData.guardianEmail}
                onChange={handleChange}
                fullWidth
              />
            </Box>

            <Box>
              <FieldLabel>
                Relationship to Student: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="relationship"
                placeholder="Father"
                value={formData.relationship}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </FormContainer>

          <ButtonContainer>
            <BackButton onClick={onBack} startIcon={<ArrowBackIcon />}>
              Back
            </BackButton>
            <NextButton onClick={onNext} endIcon={<ArrowForwardIcon />}>
              Next
            </NextButton>
          </ButtonContainer>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Step1StudentInfo;
