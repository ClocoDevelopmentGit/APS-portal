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
  Slider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconX } from "@tabler/icons-react";
import DescriptionBox from "./DescriptionBox";

// ==================== STYLED COMPONENTS ====================

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    padding: "0px",
    maxWidth: "500px",
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
  color: "#757575",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    color: "#191919",
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
  marginBottom: "20px",
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
  padding: "8px 16px",
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

const AgeSliderContainer = styled(Box)({
  marginBottom: "10px",
  padding: "0 8px",
});

const StyledSlider = styled(Slider)({
  color: "#B38349",
  height: 4,
  "& .MuiSlider-thumb": {
    width: 16,
    height: 16,
    backgroundColor: "#B38349",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(174, 153, 100, 0.16)",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
    backgroundColor: "#B38349",
  },
  "& .MuiSlider-rail": {
    backgroundColor: "#75757580",
  },
  "& .MuiSlider-valueLabel": {
    backgroundColor: "#635738",
    borderRadius: "4px",
    padding: "2px 8px",
    fontSize: "10px",
  },
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
const CreateCourse = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    courseName: "",
    courseCategory: "",
    ageRange: [4, 18],
    description: "",
    status: "",
    homePageStatus: "",
    courseImage: null,
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleAgeChange = (event, newValue) => {
    setFormData({
      ...formData,
      ageRange: newValue,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      courseName: "",
      courseCategory: "",
      ageRange: [4, 18],
      description: "",
      status: "",
      homePageStatus: "",
      courseImage: null,
    });
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <StyledDialogTitle>
        Create New Course
        <CloseButton onClick={handleCancel}>
          <IconX size={20} />
        </CloseButton>
      </StyledDialogTitle>

      <StyledDialogContent>
        {/* Course Name */}
        <Box>
          <FormLabel>Course Name:</FormLabel>
          <StyledTextField
            fullWidth
            placeholder="Senior Kids Acting - Teens"
            value={formData.courseName}
            onChange={(e) => handleChange("courseName", e.target.value)}
          />
        </Box>

        {/* Course Category */}
        <Box>
          <FormLabel>Course Category:</FormLabel>
          <StyledFormControl fullWidth>
            <Select
              value={formData.courseCategory}
              onChange={(e) => handleChange("courseCategory", e.target.value)}
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return (
                    <span style={{ color: "#757575" }}>Select Category</span>
                  );
                }
                return selected;
              }}
            >
              <StyledMenuItem value="Acting Classes">
                Acting Classes
              </StyledMenuItem>
              <StyledMenuItem value="Musical Theatre">
                Musical Theatre
              </StyledMenuItem>
              <StyledMenuItem value="Voice Training">
                Voice Training
              </StyledMenuItem>
              <StyledMenuItem value="Dance">Dance</StyledMenuItem>
            </Select>
          </StyledFormControl>
        </Box>

        {/* Age Range */}
        <Box>
          <FormLabel>Age:</FormLabel>
          <AgeSliderContainer>
            <StyledSlider
              value={formData.ageRange}
              onChange={handleAgeChange}
              valueLabelDisplay="on"
              min={1}
              max={18}
            />
          </AgeSliderContainer>
        </Box>

        {/* Description */}
        <Box>
          <FormLabel>Description:</FormLabel>
          <DescriptionBox
            value={formData.description}
            onChange={(value) => handleChange("description", value)}
            placeholder="Enter course description..."
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Status */}
          <Box sx={{ flex: 1 }}>
            <FormLabel>Status:</FormLabel>
            <StyledFormControl fullWidth>
              <Select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span style={{ color: "#757575" }}>Select Status</span>
                    );
                  }
                  return selected;
                }}
              >
                <StyledMenuItem value="Active">Active</StyledMenuItem>
                <StyledMenuItem value="Inactive">Inactive</StyledMenuItem>
              </Select>
            </StyledFormControl>
          </Box>

          {/* Disply in HomePage Status */}
          <Box sx={{ flex: 1 }}>
            <FormLabel>Display in HomePage:</FormLabel>
            <StyledFormControl fullWidth>
              <Select
                value={formData.homePageStatus}
                onChange={(e) => handleChange("homePageStatus", e.target.value)}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span style={{ color: "#757575" }}>
                        Select Display Status
                      </span>
                    );
                  }
                  return selected;
                }}
              >
                <StyledMenuItem value="Active">Active</StyledMenuItem>
                <StyledMenuItem value="Inactive">Inactive</StyledMenuItem>
              </Select>
            </StyledFormControl>
          </Box>
        </Box>

        {/* Action Buttons */}
        <ButtonGroup>
          <SaveButton onClick={handleSubmit}>Save</SaveButton>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        </ButtonGroup>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default CreateCourse;
