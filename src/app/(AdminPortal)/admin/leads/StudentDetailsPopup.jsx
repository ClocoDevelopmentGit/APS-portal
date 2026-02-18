"use client";
import React, { useState } from "react";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

// ==================== STYLED COMPONENTS ====================

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    padding: "0px",
    maxWidth: "900px",
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

const FormGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "24px",
  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
  },
});

const FormField = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const FullWidthFormField = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  gridColumn: "1 / -1",
});

const FieldLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: 500,
  color: "#191919",
  lineHeight: "20px",
  "& span": {
    color: "#EE5B54",
  },
});

const StyledTextField = styled(TextField)({
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
  },
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

const StudentDetailsPopup = ({ open, onClose, studentData, isEditMode }) => {
  const getInitialFormData = () => {
    if (studentData) {
      return {
        parentName: studentData.parentName || "",
        participantName: studentData.participantName || "",
        participantAge: studentData.participantAge || "",
        suburb: studentData.suburb || "",
        emailAddress: studentData.emailAddress || "",
        mobileNumber: studentData.mobileNumber || "",
        preferredClassType: studentData.preferredClassType || "",
        preferredContactMethod: studentData.preferredContactMethod || "",
        message: studentData.message || "",
      };
    }
    return {
      parentName: "",
      participantName: "",
      participantAge: "",
      suburb: "",
      emailAddress: "",
      mobileNumber: "",
      preferredClassType: "",
      preferredContactMethod: "",
      message: "",
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());

  React.useEffect(() => {
    if (open) {
      setFormData(getInitialFormData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleChange = (field) => (event) => {
    const value = event.target.value;

    if (field === "mobileNumber") {
      const numericValue = value.replace(/[^0-9+\-\s()]/g, "");
      setFormData({
        ...formData,
        [field]: numericValue,
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleSave = () => {
    console.log("Saving student data:", formData);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
      <StyledDialogTitle>
        Student Details
        <StyledCloseButton onClick={handleCancel}>
          <CloseIcon sx={{ fontSize: "20px" }} />
        </StyledCloseButton>
      </StyledDialogTitle>

      <StyledDialogContent>
        <FormGrid>
          {/* Parent's Name */}
          <FormField>
            <FieldLabel>
              {`Parent's Name:`} <span>*</span>
            </FieldLabel>
            <StyledTextField
              placeholder="Enter parent name"
              value={formData.parentName}
              onChange={handleChange("parentName")}
              disabled={isEditMode}
            />
          </FormField>

          {/* Participant's Name */}
          <FormField>
            <FieldLabel>
              {`Participant's Name:`} <span>*</span>
            </FieldLabel>
            <StyledTextField
              placeholder="Enter participant name"
              value={formData.participantName}
              onChange={handleChange("participantName")}
              disabled={isEditMode}
            />
          </FormField>

          {/* Participant's Age */}
          <FormField>
            <FieldLabel>
              {`Participant's Age:`} <span>*</span>
            </FieldLabel>
            <StyledTextField
              placeholder="Enter age"
              value={formData.participantAge}
              onChange={handleChange("participantAge")}
              disabled={isEditMode}
            />
          </FormField>

          {/* Suburb */}
          <FormField>
            <FieldLabel>
              Suburb: <span>*</span>
            </FieldLabel>
            <StyledTextField
              placeholder="Enter suburb"
              value={formData.suburb}
              onChange={handleChange("suburb")}
              disabled={isEditMode}
            />
          </FormField>

          {/* Email Address */}
          <FormField>
            <FieldLabel>
              Email Address: <span>*</span>
            </FieldLabel>
            <StyledTextField
              type="email"
              placeholder="Enter email address"
              value={formData.emailAddress}
              onChange={handleChange("emailAddress")}
              disabled={isEditMode}
            />
          </FormField>

          {/* Mobile Number */}
          <FormField>
            <FieldLabel>
              Mobile Number: <span>*</span>
            </FieldLabel>
            <StyledTextField
              type="tel"
              placeholder="Enter mobile number"
              value={formData.mobileNumber}
              onChange={handleChange("mobileNumber")}
              disabled={isEditMode}
            />
          </FormField>

          {/* Preferred Class Type */}
          <FormField>
            <FieldLabel>
              Preferred Class Type: <span>*</span>
            </FieldLabel>
            <StyledTextField
              placeholder="Enter preferred class type"
              value={formData.preferredClassType}
              onChange={handleChange("preferredClassType")}
              disabled={isEditMode}
            />
          </FormField>

          {/* Preferred Contact Method */}
          <FormField>
            <FieldLabel>
              Preferred Contact Method: <span>*</span>
            </FieldLabel>
            <StyledTextField
              placeholder="Enter preferred contact method"
              value={formData.preferredContactMethod}
              onChange={handleChange("preferredContactMethod")}
              disabled={isEditMode}
            />
          </FormField>

          {/* Message - Full Width */}
          <FullWidthFormField>
            <FieldLabel>
              Message: <span>*</span>
            </FieldLabel>
            <StyledTextArea
              placeholder="Enter message"
              value={formData.message}
              onChange={handleChange("message")}
              multiline
              rows={4}
              disabled={isEditMode}
            />
          </FullWidthFormField>
        </FormGrid>

        <StyledDialogActions>
          <CancelButton onClick={handleCancel}>
            {isEditMode ? "Close" : "Cancel"}
          </CancelButton>
          {!isEditMode && <SaveButton onClick={handleSave}>Save</SaveButton>}
        </StyledDialogActions>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default StudentDetailsPopup;
