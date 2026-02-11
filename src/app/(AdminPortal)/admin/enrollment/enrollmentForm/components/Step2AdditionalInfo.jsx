"use client";
import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
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
  "@media (max-width: 625px)": {
    flexDirection: "column",
    gap: "0px",
  },
});

const SubSectionTitle = styled(Typography)({
  fontSize: "15px",
  fontWeight: 600,
  color: "#AE9964",
  marginBottom: "15px",
  marginTop: "15px",
  paddingBottom: "10px",
  borderBottom: "1px solid #E5E5E5",
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
  },
});

const StyledTextArea = styled(TextField)({
  marginBottom: "0px", // Changed from 5px
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    backgroundColor: "#FFFFFF",
    padding: "0",
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
    paddingBottom: "32px",
    fontSize: "14px",
    color: "#333333",
    lineHeight: "19.6px",
    letterSpacing: "-0.28px",
    fontWeight: 400,
    textAlign: "left",
    "&::placeholder": {
      color: "#999999",
      opacity: 1,
      textAlign: "left",
    },
  },
});

const CharCountInside = styled(Box)({
  fontSize: "12px",
  color: "#999999",
  position: "absolute",
  bottom: "10px",
  right: "14px",
  pointerEvents: "none",
  zIndex: 1,
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
      borderColor: "#B38349",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#B38349",
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
    color: "#B38349",
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
    color: "#B38349",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "#FEF7EA",
    },
  },
});

const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
  marginTop: "20px",
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

const NDISContainer = styled(Box)({
  marginTop: "20px",
});

const Step2AdditionalInfo = ({ formData, handleChange, onNext, onBack }) => {
  return (
    <Box>
      <ContentWrapper>
        <SectionTitle>Additional Information:</SectionTitle>

        <FormContent>
          {/* Gender and School Year Level */}
          <FormContainer>
            <Box width={"100%"}>
              <FieldLabel>
                Gender: <span>*</span>
              </FieldLabel>
              <StyledFormControl fullWidth>
                <Select
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#999999" }}>Select</span>;
                    }
                    return selected;
                  }}
                >
                  <StyledMenuItem value="Male">Male</StyledMenuItem>
                  <StyledMenuItem value="Female">Female</StyledMenuItem>
                  <StyledMenuItem value="Other">Other</StyledMenuItem>
                  <StyledMenuItem value="Prefer not to say">
                    Prefer not to say
                  </StyledMenuItem>
                </Select>
              </StyledFormControl>
            </Box>

            <Box width={"100%"}>
              <FieldLabel>
                School Year Level: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="schoolYearLevel"
                placeholder="YYYY"
                value={formData.schoolYearLevel || ""}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </FormContainer>

          {/* How did you hear about us */}
          <Box width={{ xs: "100%", sm: "49%" }}>
            <FieldLabel>How did you hear about us?</FieldLabel>
            <StyledFormControl fullWidth>
              <Select
                name="hearAboutUs"
                value={formData.hearAboutUs || ""}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#999999" }}>Select</span>;
                  }
                  return selected;
                }}
              >
                <StyledMenuItem value="Social Media">
                  Social Media
                </StyledMenuItem>
                <StyledMenuItem value="Friend/Family">
                  Friend/Family
                </StyledMenuItem>
                <StyledMenuItem value="Google Search">
                  Google Search
                </StyledMenuItem>
                <StyledMenuItem value="Advertisement">
                  Advertisement
                </StyledMenuItem>
                <StyledMenuItem value="Other">Other</StyledMenuItem>
              </Select>
            </StyledFormControl>
          </Box>

          {/* Address Section */}
          <SubSectionTitle>Address:</SubSectionTitle>

          <FormContainer>
            <Box width={"100%"}>
              <FieldLabel>
                Address Line 1: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="addressLine1"
                placeholder=""
                value={formData.addressLine1 || ""}
                onChange={handleChange}
                fullWidth
              />
            </Box>

            <Box width={"100%"}>
              <FieldLabel>Address Line 2:</FieldLabel>
              <StyledTextField
                name="addressLine2"
                placeholder=""
                value={formData.addressLine2 || ""}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </FormContainer>

          <FormContainer>
            <Box width={"100%"}>
              <FieldLabel>
                Suburb: <span>*</span>
              </FieldLabel>
              <StyledFormControl fullWidth>
                <Select
                  name="suburb"
                  value={formData.suburb || ""}
                  onChange={handleChange}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#999999" }}>Select</span>;
                    }
                    return selected;
                  }}
                >
                  <StyledMenuItem value="Melbourne">Melbourne</StyledMenuItem>
                  <StyledMenuItem value="Sydney">Sydney</StyledMenuItem>
                  <StyledMenuItem value="Brisbane">Brisbane</StyledMenuItem>
                </Select>
              </StyledFormControl>
            </Box>

            <Box width={"100%"}>
              <FieldLabel>
                Postcode: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="postcode"
                placeholder=""
                value={formData.postcode || ""}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </FormContainer>

          <FormContainer>
            <Box width={"100%"}>
              <FieldLabel>
                State: <span>*</span>
              </FieldLabel>
              <StyledFormControl fullWidth>
                <Select
                  name="state"
                  value={formData.state || ""}
                  onChange={handleChange}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#999999" }}>Select</span>;
                    }
                    return selected;
                  }}
                >
                  <StyledMenuItem value="Victoria">Victoria</StyledMenuItem>
                  <StyledMenuItem value="New South Wales">
                    New South Wales
                  </StyledMenuItem>
                  <StyledMenuItem value="Queensland">Queensland</StyledMenuItem>
                </Select>
              </StyledFormControl>
            </Box>

            <Box width={"100%"}>
              <FieldLabel>
                Country: <span>*</span>
              </FieldLabel>
              <StyledFormControl fullWidth>
                <Select
                  name="country"
                  value={formData.country || ""}
                  onChange={handleChange}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#999999" }}>Select</span>;
                    }
                    return selected;
                  }}
                >
                  <StyledMenuItem value="Australia">Australia</StyledMenuItem>
                  <StyledMenuItem value="New Zealand">
                    New Zealand
                  </StyledMenuItem>
                  <StyledMenuItem value="Other">Other</StyledMenuItem>
                </Select>
              </StyledFormControl>
            </Box>
          </FormContainer>

          {/* Contact and Emergency Details */}
          <SubSectionTitle>Contact and Emergency Details:</SubSectionTitle>

          <FormContainer>
            <Box width={"100%"}>
              <FieldLabel>
                Emergency Contact Name: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="emergencyContactName"
                placeholder=""
                value={formData.emergencyContactName || ""}
                onChange={handleChange}
                fullWidth
              />
            </Box>

            <Box width={"100%"}>
              <FieldLabel>
                Emergency Contact Number: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="emergencyContactNumber"
                placeholder=""
                value={formData.emergencyContactNumber || ""}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </FormContainer>

          <Box width={{ xs: "100%", sm: "49%" }}>
            <FieldLabel>
              Relationship to Student: <span>*</span>
            </FieldLabel>
            <StyledTextField
              name="emergencyRelationship"
              placeholder=""
              value={formData.emergencyRelationship || ""}
              onChange={handleChange}
              fullWidth
            />
          </Box>

          {/* Health & Permissions */}
          <SubSectionTitle>Health & Permissions:</SubSectionTitle>

          <FormContainer>
            <Box width={"100%"}>
              <FieldLabel>
                Medical Conditions: <span>*</span>
              </FieldLabel>
              <Box sx={{ position: "relative" }}>
                <StyledTextArea
                  name="medicalConditions"
                  placeholder='Are there any medical conditions or allergies that our teachers need to be aware of? If none, please enter "none".'
                  value={formData.medicalConditions || ""}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                  slotProps={{
                    htmlInput: { maxLength: 150 },
                  }}
                />
                <CharCountInside>
                  {formData.medicalConditions?.length || 0}/150
                </CharCountInside>
              </Box>
            </Box>

            <Box width={"100%"}>
              <FieldLabel>
                Support Needs: <span>*</span>
              </FieldLabel>
              <Box sx={{ position: "relative" }}>
                <StyledTextArea
                  name="supportNeeds"
                  placeholder='Are there any physical, intellectual, developmental, disabilities or behaviours that our teachers need to be aware of? If none, please enter "none".'
                  value={formData.supportNeeds || ""}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                  slotProps={{
                    htmlInput: { maxLength: 150 },
                  }}
                />
                <CharCountInside>
                  {formData.supportNeeds?.length || 0}/150
                </CharCountInside>
              </Box>
            </Box>
          </FormContainer>

          {/* Photo Permissions */}
          <Box sx={{ mb: 2, mt: 4 }}>
            <FieldLabel>
              Photo Permissions: <span>*</span>
            </FieldLabel>

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                color: "#191919",
                marginBottom: "8px",
                lineHeight: "22px",
              }}
            >
              Do you consent to having your photograph or video taken during
              classes or performances?
            </Typography>

            <RadioGroup
              row
              name="photoPermission"
              value={formData.photoPermission || ""}
              onChange={handleChange}
              sx={{ mb: 1 }}
            >
              <FormControlLabel
                value="Yes"
                control={
                  <Radio
                    sx={{
                      color: "#B38349",
                      "&.Mui-checked": { color: "#B38349" },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "14px", color: "#333333" }}>
                    Yes
                  </Typography>
                }
              />
              <FormControlLabel
                value="No"
                control={
                  <Radio
                    sx={{
                      color: "#B38349",
                      "&.Mui-checked": { color: "#B38349" },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "14px", color: "#333333" }}>
                    No
                  </Typography>
                }
              />
            </RadioGroup>

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                color: "#8F8F8F",
                lineHeight: "18px",
                lineHeight: "22px",
              }}
            >
              APS might photograph/video performances or classes. I/we give
              permission to APS for photographs/footage of me/my child to be
              used for APS promotional purposes such as social media and/or on
              the APS website.
            </Typography>
          </Box>

          {/* NDIS Plan */}
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                paddingBottom: "5px",
                borderBottom:
                  formData.ndisPlan === "Yes" ? "1px solid #E5E5E5" : "none",
                gap: 2,
              }}
            >
              <FieldLabel sx={{ mb: 0 }}>NDIS Plan:</FieldLabel>
              <RadioGroup
                row
                name="ndisPlan"
                value={formData.ndisPlan || ""}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Yes"
                  control={
                    <Radio
                      sx={{
                        color: "#B38349",
                        "&.Mui-checked": { color: "#B38349" },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "14px", color: "#333333" }}>
                      Yes
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="No"
                  control={
                    <Radio
                      sx={{
                        color: "#B38349",
                        "&.Mui-checked": { color: "#B38349" },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "14px", color: "#333333" }}>
                      No
                    </Typography>
                  }
                />
              </RadioGroup>
            </Box>
          </Box>

          {/* NDIS Details - Show only when "Yes" is selected */}
          {formData.ndisPlan === "Yes" && (
            <NDISContainer>
              <FormContainer>
                <Box width={"100%"}>
                  <FieldLabel>
                    Name of the Provider: <span>*</span>
                  </FieldLabel>
                  <StyledTextField
                    name="ndisProviderName"
                    placeholder=""
                    value={formData.ndisProviderName || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>

                <Box width={"100%"}>
                  <FieldLabel>
                    Provider Contact Person: <span>*</span>
                  </FieldLabel>
                  <StyledTextField
                    name="ndisProviderContact"
                    placeholder=""
                    value={formData.ndisProviderContact || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
              </FormContainer>

              <FormContainer>
                <Box width={"100%"}>
                  <FieldLabel>
                    Provider Contact Email: <span>*</span>
                  </FieldLabel>
                  <StyledTextField
                    name="ndisProviderEmail"
                    type="email"
                    placeholder=""
                    value={formData.ndisProviderEmail || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>

                <Box width={"100%"}>
                  <FieldLabel>
                    NDIS Number: <span>*</span>
                  </FieldLabel>
                  <StyledTextField
                    name="ndisNumber"
                    placeholder=""
                    value={formData.ndisNumber || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
              </FormContainer>

              <FormContainer>
                <Box width={"100%"}>
                  <FieldLabel>
                    NDIS Category Name: <span>*</span>
                  </FieldLabel>
                  <StyledTextField
                    name="ndisCategoryName"
                    placeholder=""
                    value={formData.ndisCategoryName || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>

                <Box width={"100%"}>
                  <FieldLabel>
                    Emergency Contact Number: <span>*</span>
                  </FieldLabel>
                  <StyledTextField
                    name="ndisEmergencyContact"
                    placeholder=""
                    value={formData.ndisEmergencyContact || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
              </FormContainer>

              <Box width={{ xs: "100%", sm: "49%" }}>
                <FieldLabel>
                  NDIS Carer Phone Number: <span>*</span>
                </FieldLabel>
                <StyledTextField
                  name="ndisCarerPhone"
                  placeholder=""
                  value={formData.ndisCarerPhone || ""}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
            </NDISContainer>
          )}

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

export default Step2AdditionalInfo;
