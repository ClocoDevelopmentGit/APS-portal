"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "./Enrollment.css";
import { checkUserExist } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

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
  marginBottom: "5px",
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
    "&[type=number]": {
      MozAppearance: "textfield",
      "&::-webkit-outer-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
      "&::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
    },
  },
});

const StyledDatePicker = styled(DatePicker)({
  marginBottom: "5px",
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

const ErrorText = styled(Typography)({
  fontSize: "12px",
  color: "#E85A4F",
  marginTop: "5px",
  marginBottom: "15px",
});

// ==================== COMPONENT ====================

const Step1StudentInfo = ({ formData, handleChange, onNext, onBack }) => {
  const selectedStudent = useSelector(
  (state) => state.student.selectedStudent);
  const dispatch = useDispatch();
  const [overlayLoading, setOverlayLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleDateChange = (field, value) => {
    handleChange({ target: { name: field, value: value } });
    const birthDate = dayjs(value);
    const today = dayjs();
    const age = today.diff(birthDate, "year");
    handleChange({ target: { name: "currentAge", value: age } });
  };

  const validateEnrollmentForm = (formData) => {
    const newErrors = {};
    const fieldLabels = {
      firstName: "First Name",
      lastName: "Last Name",
      dob: "DOB",
      currentAge: "Current Age",
      ...(Number(formData.currentAge) >= 18 && { email: "Email" }),
      ...(Number(formData.currentAge) >= 18 && { phone: "Mobile Number" }),
      ...(Number(formData.currentAge) < 18 && {
        guardianName: "Guardian Name",
      }),
      ...(Number(formData.currentAge) < 18 && {
        guardianContact: "Guardian Mobile Number",
      }),
      ...(Number(formData.currentAge) < 18 && {
        guardianEmail: "Guardian Email",
      }),
      ...(Number(formData.currentAge) < 18 && { relation: "Relationship" }),
    };

    Object.keys(fieldLabels).forEach((key) => {
      const value = formData[key];
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        value === 0
      ) {
        newErrors[key] = `${fieldLabels[key]} is required`;
      }
    });

    return newErrors;
  };

  const handleNextClick = async () => {
    setOverlayLoading(true);
    setErrors({});
    const formError = validateEnrollmentForm(formData);
    if (Object.keys(formError).length > 0) {
      setErrors(formError);
      return;
    }

    const email = formData.email || formData.guardianEmail;
    const studentId = selectedStudent?.studentId;

      if (!studentId) {
      console.log("passed");
      const checkEmail = await dispatch(checkUserExist(email));
      console.log(checkEmail, "check email result");
      if (checkEmail.payload === false) {
        localStorage.setItem("formData", JSON.stringify(formData));
        onNext();
        return;
      }
    else
    {      
      setErrors({ email: "Email already exists. Please use a different email." ,
      guardianEmail: "Email already exists. Please use a different email." });
    }
   }
    setOverlayLoading(false);
  };

  return (
    <ThemeProvider theme={pickerTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box className="step1-student-info">
          {/* Student Information */}
          <FormContainer>
            <Box width={"100%"}>
              <FieldLabel>
                First Name: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(e) => handleChange(e)}
                fullWidth
              />
              {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
            </Box>

            <Box width={"100%"}>
              <FieldLabel>
                Last Name: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(e) => handleChange(e)}
                fullWidth
              />
              {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
            </Box>
          </FormContainer>

          <FormContainer>
            <Box width={"100%"}>
              <FieldLabel>
                Date of Birth: <span>*</span>
              </FieldLabel>
              <StyledDatePicker
                value={formData.dob ? dayjs(formData.dob) : null}
                onChange={(newValue) => handleDateChange("dob", newValue)}
                format="DD-MM-YYYY"
                maxDate={dayjs()}
                slotProps={{
                  textField: {
                    placeholder: "dd-mm-yyyy",
                  },
                  popper: {
                    sx: {
                      "& .MuiPaper-root": {
                        backgroundColor: "#FFF",
                      },
                    },
                  },
                }}
              />
              {errors.dob && <ErrorText>{errors.dob}</ErrorText>}
            </Box>

            <Box width={"100%"}>
              <FieldLabel>
                Current Age: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="currentAge"
                placeholder="20"
                value={formData.currentAge}
                fullWidth
                disabled
              />
              {errors.currentAge && <ErrorText>{errors.currentAge}</ErrorText>}
            </Box>
          </FormContainer>

          {Number(formData.currentAge) >= 18 && !!formData.currentAge && (
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
                  onChange={(e) => handleChange(e)}
                  fullWidth
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </Box>

              <Box width={"100%"}>
                <FieldLabel>
                  Mobile Number: <span>*</span>
                </FieldLabel>
                <StyledTextField
                  name="phone"
                  type="number"
                  placeholder="0400 000 000"
                  value={formData.phone}
                  onChange={(e) => handleChange(e)}
                  fullWidth
                />
                {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
              </Box>
            </FormContainer>
          )}

          {Number(formData.currentAge) < 18 && !!formData.currentAge && (
            <>
              {/* Parent / Guardian Information */}
              <SubSectionTitle>Parent / Guardian Information:</SubSectionTitle>

              <FormContainer>
                <Box width={"100%"}>
                  <FieldLabel>
                    Parent / Guardian Name: <span>*</span>
                  </FieldLabel>
                  <StyledTextField
                    name="guardianName"
                    placeholder="Enter guardian name"
                    value={formData.guardianName || ""}
                    onChange={(e) => handleChange(e)}
                    fullWidth
                  />
                  {errors.guardianName && (
                    <ErrorText>{errors.guardianName}</ErrorText>
                  )}
                </Box>

                <Box width={"100%"}>
                  <FieldLabel>
                    Parent / Guardian Contact Number: <span>*</span>
                  </FieldLabel>
                  <StyledTextField
                    name="guardianContact"
                    placeholder="example: +61 412 345 678"
                    value={formData.guardianContact || ""}
                    onChange={(e) => handleChange(e)}
                    fullWidth
                  />
                  {errors.guardianContact && (
                    <ErrorText>{errors.guardianContact}</ErrorText>
                  )}
                </Box>
              </FormContainer>

              <FormContainer>
                <Box width={"100%"}>
                  <FieldLabel>
                    Parent / Guardian Email Address: <span>*</span>
                  </FieldLabel>
                  <StyledTextField
                    name="guardianEmail"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.guardianEmail || ""}
                    onChange={(e) => handleChange(e)}
                    fullWidth
                  />
                  {errors.guardianEmail && (
                    <ErrorText>{errors.guardianEmail}</ErrorText>
                  )}
                </Box>

                <Box width={"100%"}>
                  <FieldLabel>
                    Relationship to Student: <span>*</span>
                  </FieldLabel>
                  <StyledTextField
                    name="relation"
                    placeholder="Father"
                    value={formData.relation || ""}
                    onChange={(e) => handleChange(e)}
                    fullWidth
                  />
                  {errors.relation && <ErrorText>{errors.relation}</ErrorText>}
                </Box>
              </FormContainer>
            </>
          )}

          <ButtonContainer>
            <BackButton onClick={onBack} startIcon={<ArrowBackIcon />}>
              Back
            </BackButton>
            <NextButton
              onClick={handleNextClick}
              endIcon={<ArrowForwardIcon />}
            >
              Next
            </NextButton>
          </ButtonContainer>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Step1StudentInfo;
