"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import "./Edit.css";

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
  },
});

// ==================== STYLED COMPONENTS ====================

const PageContainer = styled(Box)({
  minHeight: "100vh",
  "@media (max-width: 768px)": {
    padding: "16px",
  },
});

const PageTitle = styled(Typography)({
  fontSize: "18px",
  fontWeight: 700,
  color: "#191919",
  marginBottom: "20px",
});

const ContentContainer = styled(Box)({
  backgroundColor: "#FFFFFF",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  "@media (max-width: 768px)": {
    padding: "20px",
  },
});

const ProfilePhotoSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  marginBottom: "30px",
  padding: "20px",
  backgroundColor: "#F8F6F3",
  borderRadius: "12px",
  "@media (max-width: 568px)": {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

const StyledAvatar = styled(Avatar)({
  width: "80px",
  height: "80px",
  backgroundColor: "#B38349",
  fontSize: "28px",
  fontWeight: 600,
  color: "#FFFFFF",
  borderRadius: "8px",
});

const PhotoInfoBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "3px",
});

const PhotoTitle = styled(Typography)({
  fontSize: "16px",
  fontWeight: 700,
  color: "#181818",
});

const PhotoDescription = styled(Typography)({
  fontSize: "13px",
  fontWeight: 400,
  color: "#757575",
  marginBottom: "5px",
});

const PhotoButtonGroup = styled(Box)({
  display: "flex",
  gap: "12px",
  alignItems: "center",
});

const UploadButton = styled(Button)({
  backgroundColor: "#FFFFFF",
  border: "1px solid #E0E0E0",
  color: "#191919",
  fontSize: "13px",
  fontWeight: 600,
  textTransform: "none",
  padding: "5px 20px",
  height: "30px",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "#B8936D",
    borderColor: "none",
    color: "#FFFFFF",
  },
});

const RemoveButton = styled(Button)({
  color: "#333333",
  fontSize: "13px",
  fontWeight: 500,
  textTransform: "none",
  padding: "5px 16px",
  borderRadius: "4px",
  border: "1px solid #D3D3D3",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#E85A4F",
  },
});

const SectionTitle = styled(Typography)({
  fontSize: "16px",
  fontWeight: 600,
  color: "#B38349",
  marginBottom: "20px",
  paddingBottom: "10px",
  marginTop: "10px",
  borderBottom: "2px solid #D3D3D3",
});

const FormContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  marginBottom: "20px",
  "@media (max-width: 625px)": {
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

const StyledTextField = styled(TextField)({
  marginBottom: "5px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    fontSize: "14px",
    fontWeight: 400,
    boxShadow: "0 1px 4px 0 rgba(142, 142, 142, 0.25) inset",
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #B8936D",
    },
    "&.Mui-disabled": {
      backgroundColor: "#F5F5F5",
    },
  },
  "& .MuiInputBase-input": {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#333333",
    "&::placeholder": {
      color: "#999999",
      opacity: 1,
    },
    "&.Mui-disabled": {
      color: "#191919",
      WebkitTextFillColor: "#191919",
    },
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&[type=number]": {
      MozAppearance: "textfield",
    },
  },
});

const StyledTextArea = styled(TextField)({
  marginBottom: "5px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    padding: "0",
    boxShadow: "0 1px 4px 0 rgba(142, 142, 142, 0.25) inset",
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #B8936D",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#333333",
    "&::placeholder": {
      color: "#999999",
      opacity: 1,
    },
  },
});

const StyledDatePicker = styled(DatePicker)({
  marginBottom: "5px",
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    height: "45px",
    boxShadow: "0 1px 4px 0 rgba(142, 142, 142, 0.25) inset",
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #B8936D",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#333333",
    height: "45px",
    boxSizing: "border-box",
  },
  "& .MuiSvgIcon-root": {
    color: "#191919",
  },
});

const NDISContainer = styled(Box)({
  marginTop: "20px",
  marginBottom: "20px",
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

const CancelButton = styled(Button)({
  color: "#666666",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "3px 25px",
  border: "1px solid #D3D3D3",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#F5F5F5",
    borderColor: "#B38349",
  },
});

const SaveButton = styled(Button)({
  backgroundColor: "#B38349",
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "3px 25px",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#A17F4F",
  },
});

const ErrorText = styled(Typography)({
  fontSize: "12px",
  color: "#E85A4F",
  marginTop: "5px",
  marginBottom: "15px",
});

// ==================== SAMPLE DATA ====================

const initialStudentData = {
  id: "1",
  firstName: "Emma",
  lastName: "Watson",
  dob: "2012-04-15",
  currentAge: "13",
  email: "emma.watson@gmail.com",
  phone: "+61 412 345 678",
  gender: "Female",
  schoolYearLevel: "Year 8",
  guardianName: "Tom Cruise",
  guardianContact: "+61 3 9555 5678",
  guardianEmail: "tom.cruise@email.com",
  relation: "Father",
  emergencyContactName: "Sarah Watson",
  emergencyContactNumber: "+61 3 9555 5678",
  emergencyContactRelation: "Mother",
  medicalCondition: "Asthma (mild), Peanuts, Tree nuts",
  supportNeeds:
    "Ventolin inhaler (as needed), Keep inhaler accessible during classes",
  photoPermission: "true",
  NDISPlan: "true",
  addresses: {
    addressLine1: "121 Main Street",
    addressLine2: "",
    suburb: "Moorabbin",
    postcode: "3189",
    state: "VIC",
    country: "Australia",
  },
  NDIS: {
    providerName: "Provider Brown",
    providerContactName: "ABC",
    providerEmail: "abcone@gmail.com",
    number: "0123456789",
    categoryName: "XYZ",
    emergencyContactNumber: "+61 547 874 123",
    providerContactNumber: "+61 547 874 123",
  },
  photoPath: "",
};

// ==================== COMPONENT ====================

const EditContactDetails = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [profilePhoto, setProfilePhoto] = useState({ url: "", file: null });
  const [formData, setFormData] = useState(initialStudentData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    const birthDate = dayjs(value);
    const today = dayjs();
    const age = today.diff(birthDate, "year");
    setFormData((prev) => ({
      ...prev,
      currentAge: age.toString(),
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        alert("Only JPG and PNG files are allowed");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto({ url: reader.result, file: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoRemove = () => {
    setProfilePhoto({ url: "", file: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
    router.push(`/admin/contacts/${formData.id}`);
  };

  const handleCancel = () => {
    router.push(`/admin/contacts/${formData.id}`);
  };

  const getInitials = () => {
    return `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <ThemeProvider theme={pickerTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <PageContainer className="edit-contact">
          <PageTitle>Edit Contact Details</PageTitle>

          <ContentContainer>
            {/* Profile Photo Section */}
            <ProfilePhotoSection>
              <StyledAvatar src={profilePhoto?.url || undefined}>
                {!profilePhoto?.url && getInitials()}
              </StyledAvatar>
              <PhotoInfoBox>
                <PhotoTitle>Profile Photo</PhotoTitle>
                <PhotoDescription>
                  Upload a clear photo of the student (JPG, PNG - Max 5MB)
                </PhotoDescription>
                <PhotoButtonGroup>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    style={{ display: "none" }}
                    id="profile-photo-upload"
                    onChange={handlePhotoUpload}
                    ref={fileInputRef}
                  />
                  <label htmlFor="profile-photo-upload">
                    <UploadButton component="span">
                      Upload New Photo
                    </UploadButton>
                  </label>
                  {profilePhoto?.url && (
                    <RemoveButton onClick={handlePhotoRemove}>
                      Remove
                    </RemoveButton>
                  )}
                </PhotoButtonGroup>
              </PhotoInfoBox>
            </ProfilePhotoSection>

            {/* Basic Information */}
            <SectionTitle>Personal Information</SectionTitle>

            <FormContainer>
              <Box width={"100%"}>
                <FieldLabel>
                  First Name: <span>*</span>
                </FieldLabel>
                <StyledTextField
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  placeholder="13"
                  value={formData.currentAge}
                  fullWidth
                  disabled
                />
              </Box>
            </FormContainer>

            {formData.currentAge >= 18 && (
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
                  {errors.email && <ErrorText>{errors.email}</ErrorText>}
                </Box>

                <Box width={"100%"}>
                  <FieldLabel>
                    Mobile Number: <span>*</span>
                  </FieldLabel>
                  <StyledTextField
                    name="phone"
                    placeholder="0400 000 000"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                  />
                  {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                </Box>
              </FormContainer>
            )}

            <FormContainer>
              <Box width={"100%"}>
                <FieldLabel>
                  Gender: <span>*</span>
                </FieldLabel>
                <StyledTextField
                  name="gender"
                  placeholder="Select gender"
                  value={formData.gender}
                  onChange={handleChange}
                  fullWidth
                />
                {errors.gender && <ErrorText>{errors.gender}</ErrorText>}
              </Box>

              <Box width={"100%"}>
                <FieldLabel>
                  School Year Level: <span>*</span>
                </FieldLabel>
                <StyledTextField
                  name="schoolYearLevel"
                  placeholder="Enter year level"
                  value={formData.schoolYearLevel}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
            </FormContainer>

            {/* Parent / Guardian Information */}
            {formData.currentAge < 18 && (
              <>
                <SectionTitle>Parent / Guardian Information</SectionTitle>

                <FormContainer>
                  <Box width={"100%"}>
                    <FieldLabel>
                      Parent / Guardian Name: <span>*</span>
                    </FieldLabel>
                    <StyledTextField
                      name="guardianName"
                      placeholder="Enter guardian name"
                      value={formData.guardianName}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box>

                  <Box width={"100%"}>
                    <FieldLabel>
                      Parent / Guardian Contact Number: <span>*</span>
                    </FieldLabel>
                    <StyledTextField
                      name="guardianContact"
                      placeholder="example: +61 412 345 678"
                      value={formData.guardianContact}
                      onChange={handleChange}
                      fullWidth
                    />
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
                      value={formData.guardianEmail}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box>

                  <Box width={"100%"}>
                    <FieldLabel>
                      Relationship to Student: <span>*</span>
                    </FieldLabel>
                    <StyledTextField
                      name="relation"
                      placeholder="Father"
                      value={formData.relation}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box>
                </FormContainer>
              </>
            )}

            {/* Address Information */}
            <SectionTitle>Address Information</SectionTitle>

            <FormContainer>
              <Box width={"100%"}>
                <FieldLabel>
                  Address Line 1: <span>*</span>
                </FieldLabel>
                <StyledTextField
                  name="addresses.addressLine1"
                  placeholder=""
                  value={formData?.addresses?.addressLine1 || ""}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>

              <Box width={"100%"}>
                <FieldLabel>Address Line 2:</FieldLabel>
                <StyledTextField
                  name="addresses.addressLine2"
                  placeholder=""
                  value={formData?.addresses?.addressLine2 || ""}
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
                <StyledTextField
                  name="addresses.suburb"
                  placeholder=""
                  value={formData?.addresses?.suburb}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>

              <Box width={"100%"}>
                <FieldLabel>
                  Postcode: <span>*</span>
                </FieldLabel>
                <StyledTextField
                  name="addresses.postcode"
                  placeholder=""
                  value={formData?.addresses?.postcode}
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
                <StyledTextField
                  name="addresses.state"
                  placeholder=""
                  value={formData?.addresses?.state}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>

              <Box width={"100%"}>
                <FieldLabel>
                  Country: <span>*</span>
                </FieldLabel>
                <StyledTextField
                  name="addresses.country"
                  placeholder=""
                  value={formData?.addresses?.country}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
            </FormContainer>

            {/* Emergency Contact Information */}
            <SectionTitle>Emergency Contact Information</SectionTitle>

            <FormContainer>
              <Box width={"100%"}>
                <FieldLabel>
                  Emergency Contact Name: <span>*</span>
                </FieldLabel>
                <StyledTextField
                  name="emergencyContactName"
                  placeholder=""
                  value={formData.emergencyContactName}
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
                  value={formData.emergencyContactNumber}
                  onChange={handleChange}
                  fullWidth
                  type="number"
                />
              </Box>
            </FormContainer>

            <Box width={{ xs: "100%", sm: "49%" }}>
              <FieldLabel>
                Relationship to Student: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="emergencyContactRelation"
                placeholder=""
                value={formData.emergencyContactRelation}
                onChange={handleChange}
                fullWidth
              />
            </Box>

            {/* Health & Medical Information */}
            <SectionTitle>Health & Medical Information</SectionTitle>

            <FormContainer>
              <Box width={"100%"}>
                <FieldLabel>
                  Medical Conditions: <span>*</span>
                </FieldLabel>
                <StyledTextArea
                  name="medicalCondition"
                  placeholder='Are there any medical conditions or allergies that our teachers need to be aware of? If none, please enter "none".'
                  value={formData.medicalCondition}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>

              <Box width={"100%"}>
                <FieldLabel>
                  Support Needs: <span>*</span>
                </FieldLabel>
                <StyledTextArea
                  name="supportNeeds"
                  placeholder='Are there any physical, intellectual, developmental, disabilities or behaviours that our teachers need to be aware of? If none, please enter "none".'
                  value={formData.supportNeeds}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
            </FormContainer>

            {/* Photo Permissions */}
            <Box sx={{ mb: 2 }}>
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
                value={formData?.photoPermission || "true"}
                onChange={handleChange}
                sx={{ mb: 1 }}
              >
                <FormControlLabel
                  value="true"
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
                  value="false"
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

            {/* NDIS Plan Section */}
            <Box sx={{ mb: 2, mt: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: "0px",
                  borderBottom: "2px solid #D3D3D3",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#B38349",
                  }}
                >
                  NDIS Plan:
                </Typography>
                <RadioGroup
                  row
                  name="NDISPlan"
                  value={formData.NDISPlan}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="true"
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
                    value="false"
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

            {/* NDIS Details */}
            {formData.NDISPlan === "true" && (
              <NDISContainer>
                <FormContainer>
                  <Box width={"100%"}>
                    <FieldLabel>
                      Name of the Provider: <span>*</span>
                    </FieldLabel>
                    <StyledTextField
                      name="NDIS.providerName"
                      placeholder=""
                      value={formData?.NDIS?.providerName}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box>

                  <Box width={"100%"}>
                    <FieldLabel>
                      Provider Contact Person: <span>*</span>
                    </FieldLabel>
                    <StyledTextField
                      name="NDIS.providerContactName"
                      placeholder=""
                      value={formData?.NDIS?.providerContactName || ""}
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
                      name="NDIS.providerEmail"
                      type="email"
                      placeholder=""
                      value={formData?.NDIS?.providerEmail || ""}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box>

                  <Box width={"100%"}>
                    <FieldLabel>
                      NDIS Number: <span>*</span>
                    </FieldLabel>
                    <StyledTextField
                      name="NDIS.number"
                      placeholder=""
                      value={formData?.NDIS?.number || ""}
                      onChange={handleChange}
                      fullWidth
                      type="number"
                    />
                  </Box>
                </FormContainer>

                <FormContainer>
                  <Box width={"100%"}>
                    <FieldLabel>
                      NDIS Category Name: <span>*</span>
                    </FieldLabel>
                    <StyledTextField
                      name="NDIS.categoryName"
                      placeholder=""
                      value={formData?.NDIS?.categoryName || ""}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box>

                  <Box width={"100%"}>
                    <FieldLabel>
                      Emergency Contact Number: <span>*</span>
                    </FieldLabel>
                    <StyledTextField
                      name="NDIS.emergencyContactNumber"
                      placeholder=""
                      value={formData?.NDIS?.emergencyContactNumber || ""}
                      onChange={handleChange}
                      fullWidth
                      type="number"
                    />
                  </Box>
                </FormContainer>

                <Box width={{ xs: "100%", sm: "49%" }}>
                  <FieldLabel>
                    NDIS Career Phone Number: <span>*</span>
                  </FieldLabel>
                  <StyledTextField
                    name="NDIS.providerContactNumber"
                    placeholder=""
                    value={formData?.NDIS?.providerContactNumber || ""}
                    onChange={handleChange}
                    fullWidth
                    type="number"
                  />
                </Box>
              </NDISContainer>
            )}

            {/* Action Buttons */}
            <ButtonContainer>
              <CancelButton onClick={handleCancel}>Cancel</CancelButton>
              <SaveButton onClick={handleSubmit}>Save Changes</SaveButton>
            </ButtonContainer>
          </ContentContainer>
        </PageContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default EditContactDetails;
