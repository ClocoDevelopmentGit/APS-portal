"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconX } from "@tabler/icons-react";
import { createCategory } from "@/redux/slices/categorySlice";
import { useDispatch } from "react-redux";

// ==================== STYLED COMPONENTS ====================

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    padding: "0px",
    maxWidth: "600px",
    width: "100%",
  },
});

const StyledDialogTitle = styled(DialogTitle)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 24px 15px",
  fontSize: "18px",
  fontWeight: 700,
  color: "#191919",
  lineHeight: "21px",
  borderBottom: "1px solid #D3D3D3",
  marginBottom: "20px",
});

const CloseButton = styled(IconButton)({
  padding: "4px",
  color: "#666666",
  "&:hover": {
    color: "#191919",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
});

const StyledDialogContent = styled(DialogContent)({
  padding: "8px 24px 24px 24px",
});

const FormLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: 500,
  color: "#191919",
  marginBottom: "8px",
  display: "block",
  lineHeight: "19px",
  letterSpacing: "-0.14px",
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    padding: "0px",
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
  "& .MuiInputBase-input": {
    fontSize: "13px",
    padding: "10px 14px",
    color: "#181818",
    fontWeight: 400,
    "&::placeholder": {
      color: "#757575",
      opacity: 1,
    },
  },
});

const StyledFormControl = styled(FormControl)({
  marginBottom: "20px",
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#FFFFFF",
    fontSize: "13px",
    fontWeight: 400,
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
  "& .MuiSelect-select": {
    padding: "10px 14px",
    fontSize: "13px",
    fontWeight: 400,
    color: "#181818",
  },
  "& .MuiSelect-icon": {
    color: "#2A3547",
  },
});

const StyledMenuItem = styled(MenuItem)({
  fontSize: "13px",
  color: "#181818",
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

const ErrorText = styled(Typography)({
  fontSize: "12px",
  color: "#E85A4F",
  marginTop: "4px",
});

const ButtonGroup = styled(Box)({
  display: "flex",
  gap: "12px",
  marginTop: "5px",
  marginBottom: "15px",
});

const SaveButton = styled(Button)({
  backgroundColor: "#B38349",
  color: "#FFFFFF",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 700,
  height: "35px",
  padding: "8px 24px",
  borderRadius: "5px",
  lineHeight: "19px",
  letterSpacing: "-0.14px",
  "&:hover": {
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    backgroundColor: "#B38349",
  },
  "&:disabled": {
    backgroundColor: "#D4C4B0",
    color: "#FFFFFF",
    boxShadow: "none",
    cursor: "not-allowed",
    opacity: 0.6,
  },
});

const CancelButton = styled(Button)({
  color: "#191919",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 700,
  height: "35px",
  padding: "8px 24px",
  borderRadius: "5px",
  lineHeight: "19px",
  letterSpacing: "-0.14px",
  border: "1px solid #D3D3D3",
  background: "#FFF",
  "&:hover": {
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    backgroundColor: "#FFF",
    color: "#191919",
  },
});

// ==================== COMPONENT ====================

const CreateCategory = ({ open, onClose, setAlert, setOverlayLoading }) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    type: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const validateCategoryForm = (formData) => {
    const newErrors = {};
    const fieldLabels = {
      categoryName: "Category Name",
      type: "Type",
      status: "Status",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateCategoryForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setOverlayLoading(true);

    const payload = {
      name: formData.categoryName,
      type: formData.type,
      isActive: formData.status === "Active",
    };

    try {
      await dispatch(createCategory({ formData: payload }))
        .unwrap()
        .then(() => {
          setAlert({
            severity: "success",
            message: "Category Created Successfully",
          });
          handleCancel();
        })
        .catch((error) => {
          console.log(error);
          setAlert({
            severity: "error",
            message: error || "Something went wrong",
          });
          handleCancel();
        });
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOverlayLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      categoryName: "",
      type: "",
      status: "",
    });
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <StyledDialogTitle>
        Create Course Category
        <CloseButton onClick={handleCancel}>
          <IconX size={20} />
        </CloseButton>
      </StyledDialogTitle>

      <StyledDialogContent>
        {/* Category Course Name */}
        <Box sx={{ marginBottom: "20px" }}>
          <FormLabel>Category Course Name:</FormLabel>
          <StyledTextField
            fullWidth
            placeholder="Enter category name"
            value={formData.categoryName}
            onChange={(e) => handleChange("categoryName", e.target.value)}
          />
          {errors.categoryName && <ErrorText>{errors.categoryName}</ErrorText>}
        </Box>

        {/* Status */}
        <Box>
          <FormLabel>Type:</FormLabel>
          <StyledFormControl fullWidth>
            <Select
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return <span style={{ color: "#999999" }}>Select Type</span>;
                }
                return selected;
              }}
            >
              <StyledMenuItem value="Course">Course</StyledMenuItem>
              <StyledMenuItem value="Workshop">Workshop</StyledMenuItem>
            </Select>
            {errors.status && <ErrorText>{errors.status}</ErrorText>}
          </StyledFormControl>
        </Box>

        {/* Status */}
        <Box>
          <FormLabel>Status:</FormLabel>
          <StyledFormControl fullWidth>
            <Select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return (
                    <span style={{ color: "#999999" }}>Select Status</span>
                  );
                }
                return selected;
              }}
            >
              <StyledMenuItem value="Active">Active</StyledMenuItem>
              <StyledMenuItem value="Inactive">Inactive</StyledMenuItem>
            </Select>
            {errors.status && <ErrorText>{errors.status}</ErrorText>}
          </StyledFormControl>
        </Box>

        {/* Action Buttons */}
        <ButtonGroup>
          <SaveButton disabled={loading} onClick={handleSubmit}>
            {loading ? "Saving..." : "Save"}
          </SaveButton>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        </ButtonGroup>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default CreateCategory;
