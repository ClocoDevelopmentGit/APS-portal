"use client";
import React from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// ==================== STYLED COMPONENTS ====================

const ContentWrapper = styled(Box)({
  padding: "0",
  marginTop: "30px",
  overflow: "hidden",
});

const SectionTitle = styled(Box)({
  color: "#AE9964",
  padding: "12px 0px",
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: "22.4px",
  borderBottom: "1px solid #D3D3D3",
  borderRadius: "0px",
});

const FormContent = styled(Box)({
  padding: "30px 0px 40px",
  "@media (max-width: 768px)": {
    padding: "20px 0px 35px 0px",
  },
});

const FormContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  marginBottom: "20px",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    gap: "0px",
  },
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

const StyledFormControl = styled(FormControl)({
  marginBottom: "20px",
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    backgroundColor: "#FFFFFF",
    height: "45px",
    "& fieldset": {
      borderColor: "#E5E5E5",
    },
    "&:hover fieldset": {
      borderColor: "#AE9964",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#AE9964",
    },
  },
  "& .MuiSelect-select": {
    padding: "12px 14px",
    fontSize: "14px",
    color: "#333333",
    lineHeight: "19.6px",
    letterSpacing: "-0.28px",
    fontWeight: 400,
  },
  "& .MuiSelect-icon": {
    color: "#AE9964",
  },
});

const StyledMenuItem = styled(MenuItem)({
  fontSize: "14px",
  color: "#333333",
  fontWeight: 400,
  padding: "10px 16px",
  "&:hover": {
    backgroundColor: "#FEF7EA",
  },
  "&.Mui-selected": {
    backgroundColor: "#FEF7EA",
    color: "#AE9964",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "#FEF7EA",
    },
  },
});

const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: "30px",
  gap: "16px",
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

const CourseSelection = ({ formData, handleChange, onNext, onBack }) => {
  return (
    <Box>
      <ContentWrapper>
        <SectionTitle>Course Selection:</SectionTitle>

        <FormContent>
          {/* Course and Location */}
          <FormContainer>
            <Box width={"100%"}>
              <FieldLabel>
                Course: <span>*</span>
              </FieldLabel>
              <StyledFormControl fullWidth>
                <Select
                  name="course"
                  value={formData.course || ""}
                  onChange={handleChange}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#999999" }}>Select</span>;
                    }
                    return selected;
                  }}
                >
                  <StyledMenuItem value="Kinder Kids Acting">
                    Kinder Kids Acting
                  </StyledMenuItem>
                  <StyledMenuItem value="Junior Acting">
                    Junior Acting
                  </StyledMenuItem>
                  <StyledMenuItem value="Teen Drama">Teen Drama</StyledMenuItem>
                  <StyledMenuItem value="Musical Theatre">
                    Musical Theatre
                  </StyledMenuItem>
                  <StyledMenuItem value="Performance Workshop">
                    Performance Workshop
                  </StyledMenuItem>
                </Select>
              </StyledFormControl>
            </Box>

            <Box width={"100%"}>
              <FieldLabel>
                Location: <span>*</span>
              </FieldLabel>
              <StyledFormControl fullWidth>
                <Select
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#999999" }}>Select</span>;
                    }
                    return selected;
                  }}
                >
                  <StyledMenuItem value="Moorabbin">Moorabbin</StyledMenuItem>
                  <StyledMenuItem value="Glen Waverley">
                    Glen Waverley
                  </StyledMenuItem>
                  <StyledMenuItem value="Brighton">Brighton</StyledMenuItem>
                  <StyledMenuItem value="St Kilda">St Kilda</StyledMenuItem>
                  <StyledMenuItem value="Elsternwick">
                    Elsternwick
                  </StyledMenuItem>
                </Select>
              </StyledFormControl>
            </Box>
          </FormContainer>

          {/* Session and Enrollment Type */}
          <FormContainer>
            <Box width={"100%"}>
              <FieldLabel>
                Session: <span>*</span>
              </FieldLabel>
              <StyledFormControl fullWidth>
                <Select
                  name="session"
                  value={formData.session || ""}
                  onChange={handleChange}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#999999" }}>Select</span>;
                    }
                    return selected;
                  }}
                >
                  <StyledMenuItem value="18 Oct - 6 Dec, 2025 | 4:45pm-6:45pm | Harrison Lane">
                    18 Oct - 6 Dec, 2025 | 4:45pm-6:45pm | Harrison Lane
                  </StyledMenuItem>
                  <StyledMenuItem value="15 Jan - 5 Mar, 2026 | 10:00am-12:00pm | Brighton">
                    15 Jan - 5 Mar, 2026 | 10:00am-12:00pm | Brighton
                  </StyledMenuItem>
                  <StyledMenuItem value="20 Mar - 15 May, 2026 | 3:30pm-5:30pm | St Kilda">
                    20 Mar - 15 May, 2026 | 3:30pm-5:30pm | St Kilda
                  </StyledMenuItem>
                  <StyledMenuItem value="10 Jun - 30 Jul, 2026 | 5:00pm-7:00pm | Moorabbin">
                    10 Jun - 30 Jul, 2026 | 5:00pm-7:00pm | Moorabbin
                  </StyledMenuItem>
                </Select>
              </StyledFormControl>
            </Box>

            <Box width={"100%"}>
              <FieldLabel>
                Enrollment Type: <span>*</span>
              </FieldLabel>
              <StyledFormControl fullWidth>
                <Select
                  name="enrollmentType"
                  value={formData.enrollmentType || ""}
                  onChange={handleChange}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#999999" }}>Select</span>;
                    }
                    return selected;
                  }}
                >
                  <StyledMenuItem value="Term Payment ($495)">
                    Term Payment ($495)
                  </StyledMenuItem>
                  <StyledMenuItem value="Full Year ($1800)">
                    Full Year ($1800)
                  </StyledMenuItem>
                  <StyledMenuItem value="Monthly ($180)">
                    Monthly ($180)
                  </StyledMenuItem>
                  <StyledMenuItem value="Trial Class ($45)">
                    Trial Class ($45)
                  </StyledMenuItem>
                </Select>
              </StyledFormControl>
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
        </FormContent>
      </ContentWrapper>
    </Box>
  );
};

export default CourseSelection;
