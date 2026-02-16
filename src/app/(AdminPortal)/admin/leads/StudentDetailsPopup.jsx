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
  MenuItem,
  Select,
  FormControl,
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
    // Hide number input arrows
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&[type=number]": {
      MozAppearance: "textfield",
    },
  },
});

const StyledSelect = styled(Select)({
  borderRadius: "8px",
  backgroundColor: "#F5F5F5",
  fontSize: "14px",
  fontWeight: 400,
  boxShadow: "0 1px 4px 0 rgba(142, 142, 142, 0.25) inset",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSelect-select": {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#333333",
    "&.Mui-disabled": {
      color: "#191919",
      WebkitTextFillColor: "#191919",
    },
  },
  "&.Mui-disabled": {
    backgroundColor: "#F5F5F5",
  },
});

const StyledMenuItem = styled(MenuItem)({
  fontSize: "13px",
  color: "#191919",
  fontWeight: 400,
  padding: "10px 16px",
  "&:hover": {
    backgroundColor: "rgba(242, 242, 242, 0.77)",
    color: "#333333",
  },
  "&.Mui-selected": {
    backgroundColor: "rgba(242, 242, 242, 0.77)",
    color: "#333333",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "rgba(242, 242, 242, 0.77)",
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
  // Initialize form data based on studentData prop
  const getInitialFormData = () => {
    if (studentData) {
      return {
        studentName: studentData.name || "",
        contactNumber: studentData.mobile || "",
        studentAge: studentData.age || "",
        mailId: studentData.email || "",
        course: studentData.course || "",
        suburb: studentData.suburb || "",
        parentName: studentData.parentName || "",
        status: studentData.status || "in-trail",
      };
    }
    return {
      studentName: "",
      contactNumber: "",
      studentAge: "",
      mailId: "",
      course: "",
      suburb: "",
      parentName: "",
      status: "in-trail",
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());

  // Reset form data when dialog opens with new data
  React.useEffect(() => {
    if (open) {
      setFormData(getInitialFormData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleChange = (field) => (event) => {
    const value = event.target.value;

    // For contact number field, only allow numbers
    if (field === "contactNumber") {
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
          {/* Student Name */}
          <FormField>
            <FieldLabel>Student Name</FieldLabel>
            <StyledTextField
              placeholder="Enter student name"
              value={formData.studentName}
              onChange={handleChange("studentName")}
              disabled={isEditMode}
            />
          </FormField>

          {/* Contact Number */}
          <FormField>
            <FieldLabel>Contact Number</FieldLabel>
            <StyledTextField
              type="tel"
              placeholder="Enter contact number"
              value={formData.contactNumber}
              onChange={handleChange("contactNumber")}
              disabled={isEditMode}
            />
          </FormField>

          {/* Student Age */}
          <FormField>
            <FieldLabel>Student Age</FieldLabel>
            <StyledTextField
              placeholder="Enter age"
              value={formData.studentAge}
              onChange={handleChange("studentAge")}
              disabled={isEditMode}
            />
          </FormField>

          {/* Mail ID */}
          <FormField>
            <FieldLabel>Mail ID</FieldLabel>
            <StyledTextField
              type="email"
              placeholder="Enter email"
              value={formData.mailId}
              onChange={handleChange("mailId")}
              disabled={isEditMode}
            />
          </FormField>

          {/* Course */}
          <FormField>
            <FieldLabel>Course</FieldLabel>
            <StyledTextField
              placeholder="Enter course"
              value={formData.course}
              onChange={handleChange("course")}
              disabled={isEditMode}
            />
          </FormField>

          {/* Suburb */}
          <FormField>
            <FieldLabel>Suburb</FieldLabel>
            <StyledTextField
              placeholder="Enter suburb"
              value={formData.suburb}
              onChange={handleChange("suburb")}
              disabled={isEditMode}
            />
          </FormField>

          {/* Parent Name */}
          <FormField>
            <FieldLabel>Parent Name</FieldLabel>
            <StyledTextField
              placeholder="Enter parent name"
              value={formData.parentName}
              onChange={handleChange("parentName")}
              disabled={isEditMode}
            />
          </FormField>

          {/* Status */}
          <FormField>
            <FieldLabel>Status</FieldLabel>
            <FormControl fullWidth>
              <StyledSelect
                value={formData.status}
                onChange={handleChange("status")}
                disabled={isEditMode}
              >
                <StyledMenuItem value="in-trail">In trail</StyledMenuItem>
                <StyledMenuItem value="enquired">Enquired</StyledMenuItem>
                <StyledMenuItem value="enrolled">Enrolled</StyledMenuItem>
              </StyledSelect>
            </FormControl>
          </FormField>
        </FormGrid>

        <StyledDialogActions>
          <CancelButton onClick={handleCancel}>
            {isEditMode ? "Close" : "Cancel"}
          </CancelButton>
          {!isEditMode && (
            <SaveButton onClick={handleSave}>Save changes</SaveButton>
          )}
        </StyledDialogActions>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default StudentDetailsPopup;
