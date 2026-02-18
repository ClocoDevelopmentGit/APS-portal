"use client";
import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

// ==================== STYLED COMPONENTS ====================

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    padding: "0px",
    maxWidth: "600px",
    width: "100%",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
    backgroundColor: "#FFFFFF",
  },
});

const StyledDialogTitle = styled(DialogTitle)({
  padding: "32px 32px 24px",
  fontSize: "20px",
  fontWeight: 700,
  color: "#191919",
  lineHeight: "28px",
  position: "relative",
  borderBottom: "none",
});

const StyledCloseButton = styled(IconButton)({
  position: "absolute",
  right: "24px",
  top: "24px",
  color: "#666666",
  padding: "8px",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    color: "#333333",
  },
});

const StyledDialogContent = styled(DialogContent)({
  padding: "20px",
  paddingTop: "20px !important",
  margin: " 0 15px 30px",
  backgroundColor: "rgba(236, 236, 236, 0.28)",
  borderRadius: "12px",
});

const FormField = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginBottom: "20px",
});

const FieldLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: 500,
  color: "#191919",
  lineHeight: "20px",
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    fontSize: "14px",
    fontWeight: 400,
    boxShadow: "0 1px 4px 0 rgba(142, 142, 142, 0.25) inset",
    height: "40px", // Added fixed height
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
  "& .MuiInputBase-input": {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#333333",
    height: "40px",
    boxSizing: "border-box",
    "&::placeholder": {
      color: "#999999",
      opacity: 1,
    },
  },
});

const StyledTextArea = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    fontSize: "14px",
    fontWeight: 400,
    boxShadow: "0 1px 4px 0 rgba(142, 142, 142, 0.25) inset",
    padding: "0",
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
  "& .MuiInputBase-input": {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#333333",
    "&::placeholder": {
      color: "#999999",
      opacity: 1,
    },
  },
});

const UploadInputContainer = styled(Box)({
  display: "flex",
  gap: "12px",
  alignItems: "center",
});

const FileInputWrapper = styled(Box)({
  flex: 1,
  position: "relative",
});

const FileInputDisplay = styled(Box)({
  borderRadius: "8px",
  backgroundColor: "#F5F5F5",
  boxShadow: "0 1px 4px 0 rgba(142, 142, 142, 0.25) inset",
  padding: "12px 16px",
  fontSize: "14px",
  color: "#999999",
  height: "40px", // Fixed height
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
  pointerEvents: "none", // Disable clicking on the field
  userSelect: "none", // Prevent text selection
});

const PreviewContainer = styled(Box)({
  marginTop: "12px",
  display: "flex",
  justifyContent: "center",
  padding: "16px",
  backgroundColor: "#FAFAFA",
  borderRadius: "8px",
  border: "1px solid #E0E0E0",
});

const PreviewImage = styled("img")({
  maxWidth: "200px",
  maxHeight: "200px",
  borderRadius: "8px",
  objectFit: "cover",
});

const UploadButton = styled(Button)({
  backgroundColor: "#B38349",
  color: "#FFFFFF",
  fontSize: "13px",
  fontWeight: 500,
  textTransform: "none",
  padding: "8px 20px",
  borderRadius: "8px",
  boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  "&:hover": {
    backgroundColor: "#9A7340",
  },
});

const UploadNote = styled(Typography)({
  fontSize: "12px",
  color: "#666666",
  fontStyle: "italic",
});

const StyledDialogActions = styled(DialogActions)({
  padding: "25px 0 0",
  gap: "12px",
  justifyContent: "flex-end",
});

const CancelButton = styled(Button)({
  backgroundColor: "transparent",
  color: "#191919",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "10px 24px",
  height: "40px",
  border: "none",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#333333",
  },
});

const SaveButton = styled(Button)({
  backgroundColor: "#FFFFFF",
  color: "#191919",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "10px 24px",
  height: "40px",
  borderRadius: "9px",
  boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  "&:hover": {
    backgroundColor: "#9A7340",
    boxShadow: "0 2px 8px rgba(179, 131, 73, 0.3)",
  },
  "&:disabled": {
    backgroundColor: "#D4C4B0",
    color: "#FFFFFF",
  },
});

// ==================== COMPONENT ====================

const InstructorPopup = ({ open, onClose, instructorData, isEditMode }) => {
  const fileInputRef = useRef(null);

  const getInitialFormData = () => {
    if (instructorData) {
      return {
        firstName: instructorData.firstName || "",
        lastName: instructorData.lastName || "",
        profilePhoto: instructorData.profilePhoto || "",
        shortBio: instructorData.shortBio || "",
      };
    }
    return {
      firstName: "",
      lastName: "",
      profilePhoto: "",
      shortBio: "",
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());
  const [photoPreview, setPhotoPreview] = useState("");
  const [fileName, setFileName] = useState("");

  React.useEffect(() => {
    if (open) {
      const initialData = getInitialFormData();
      setFormData(initialData);
      setPhotoPreview(initialData.profilePhoto);
      setFileName("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, instructorData]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        alert("Only JPG and PNG files are allowed");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      setFileName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData({
          ...formData,
          profilePhoto: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    console.log("Saving instructor data:", formData);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <StyledDialogTitle>
        {isEditMode ? "Edit" : "Create New"} Staff / Instructor
        <StyledCloseButton onClick={handleCancel}>
          <CloseIcon sx={{ fontSize: "20px" }} />
        </StyledCloseButton>
      </StyledDialogTitle>

      <StyledDialogContent>
        {/* First Name */}
        <FormField>
          <FieldLabel>First Name:</FieldLabel>
          <StyledTextField
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange("firstName")}
          />
        </FormField>

        {/* Last Name */}
        <FormField>
          <FieldLabel>Last Name:</FieldLabel>
          <StyledTextField
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange("lastName")}
          />
        </FormField>

        {/* Upload Profile Photo */}
        <FormField>
          <FieldLabel>Upload Profile Photo:</FieldLabel>
          <UploadInputContainer>
            <FileInputWrapper>
              {/* Hidden file input - only triggered by button */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/jpeg,image/png,image/jpg"
                onChange={handlePhotoUpload}
              />
              {/* Display field - not clickable */}
              <FileInputDisplay>
                {fileName || "No file chosen"}
              </FileInputDisplay>
            </FileInputWrapper>
            <UploadButton onClick={handleUploadClick}>Upload</UploadButton>
          </UploadInputContainer>
          <UploadNote>
            Note: Media files that are accepted are .jpg, .jpeg, .png - Max
            (5MB)
          </UploadNote>

          {/* Image Preview - Shows only when image is selected */}
          {photoPreview && (
            <PreviewContainer>
              <PreviewImage src={photoPreview} alt="Profile preview" />
            </PreviewContainer>
          )}
        </FormField>

        {/* Short Bio */}
        <FormField>
          <FieldLabel>Bio:</FieldLabel>
          <StyledTextArea
            placeholder="Enter short bio"
            value={formData.shortBio}
            onChange={handleChange("shortBio")}
            multiline
            rows={4}
          />
        </FormField>

        <StyledDialogActions>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          <SaveButton onClick={handleSave}>Save</SaveButton>
        </StyledDialogActions>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default InstructorPopup;
