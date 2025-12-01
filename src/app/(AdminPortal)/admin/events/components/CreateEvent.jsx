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
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { IconX } from "@tabler/icons-react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./CreateEvent.css";
import DescriptionBox from "../../classes/components/DescriptionBox";

// ==================== STYLED COMPONENTS ====================
const pickerTheme = createTheme({
  palette: {
    primary: {
      main: "#AE9964",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
  components: {
    // === Calendar Day Hover Color ===
    MuiPickersDay: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#B38349",
            color: "white",
          },
          "&.Mui-selected": {
            backgroundColor: "#AE9964",
            color: "white",
          },
        },
      },
    },

    // === Time Clock Hour/Minute Hover Color ===
    MuiClockNumber: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#B38349",
            color: "white",
          },
          "&.Mui-selected": {
            backgroundColor: "#AE9964",
            color: "white",
          },
        },
      },
    },

    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#AE9964",
          color: "white",
        },
      },
    },
  },
});

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

const StyledDatePicker = styled(DatePicker)({
  width: "100%",
  marginBottom: "20px",
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

const StyledTimePicker = styled(TimePicker)({
  width: "100%",
  marginBottom: "20px",
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
const CreateEvent = ({ open, onClose, courseId }) => {
  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    instructorName: "",
    location: "",
    status: "",
    day: "",
    fromDate: null,
    toDate: null,
    startTime: null,
    endTime: null,
    fees: "",
    slots: "",
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    console.log(
      "event submitted:",
      {
        ...formData,
        fromDate: formData.fromDate
          ? formData.fromDate.format("YYYY-MM-DD")
          : null,
        toDate: formData.toDate ? formData.toDate.format("YYYY-MM-DD") : null,
        startTime: formData.startTime
          ? formData.startTime.format("HH:mm")
          : null,
        endTime: formData.endTime ? formData.endTime.format("HH:mm") : null,
      },
      "for course:",
      courseId
    );
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      eventName: "",
      description: "",
      instructorName: "",
      location: "",
      status: "",
      day: "",
      fromDate: null,
      toDate: null,
      startTime: null,
      endTime: null,
      fees: "",
      slots: "",
    });
    onClose();
  };

  return (
    <ThemeProvider theme={pickerTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledDialog
          className="create-event"
          open={open}
          onClose={handleCancel}
          maxWidth="sm"
          fullWidth
        >
          <StyledDialogTitle>
            Create New Event
            <CloseButton onClick={handleCancel}>
              <IconX size={20} />
            </CloseButton>
          </StyledDialogTitle>

          <StyledDialogContent>
            {/* Instructor Name */}
            <Box>
              <FormLabel>Event Name:</FormLabel>
              <StyledTextField
                fullWidth
                placeholder="Harrison Lane"
                value={formData.eventName}
                onChange={(e) => handleChange("eventName", e.target.value)}
              />
            </Box>

            {/* Description */}
            <Box>
              <FormLabel>Description:</FormLabel>
              <DescriptionBox
                value={formData.description}
                onChange={(value) => handleChange("description", value)}
                placeholder="Enter event description..."
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              {/* Location */}
              <Box sx={{ flex: 1 }}>
                <FormLabel>Location:</FormLabel>
                <StyledFormControl fullWidth>
                  <Select
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span style={{ color: "#999999" }}>
                            Select Location
                          </span>
                        );
                      }
                      return selected;
                    }}
                  >
                    <StyledMenuItem value="Ringwood">Ringwood</StyledMenuItem>
                    <StyledMenuItem value="Moorabbin">Moorabbin</StyledMenuItem>
                    <StyledMenuItem value="Yarraville">
                      Yarraville
                    </StyledMenuItem>
                    <StyledMenuItem value="Narre Warren">
                      Narre Warren
                    </StyledMenuItem>
                    <StyledMenuItem value="Melbourne CBD">
                      Melbourne CBD
                    </StyledMenuItem>
                  </Select>
                </StyledFormControl>
              </Box>

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
                          <span style={{ color: "#999999" }}>
                            Select Status
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

            <Box sx={{ display: "flex", gap: 2 }}>
              {/* Day */}
              <Box sx={{ flex: 1 }}>
                <FormLabel>Day:</FormLabel>
                <StyledFormControl fullWidth>
                  <Select
                    value={formData.day}
                    onChange={(e) => handleChange("day", e.target.value)}
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span style={{ color: "#999999" }}>Select Day</span>
                        );
                      }
                      return selected;
                    }}
                  >
                    <StyledMenuItem value="Monday">Monday</StyledMenuItem>
                    <StyledMenuItem value="Tuesday">Tuesday</StyledMenuItem>
                    <StyledMenuItem value="Wednesday">Wednesday</StyledMenuItem>
                    <StyledMenuItem value="Thursday">Thursday</StyledMenuItem>
                    <StyledMenuItem value="Friday">Friday</StyledMenuItem>
                    <StyledMenuItem value="Saturday">Saturday</StyledMenuItem>
                    <StyledMenuItem value="Sunday">Sunday</StyledMenuItem>
                  </Select>
                </StyledFormControl>
              </Box>

              {/* Slots */}
              <Box sx={{ flex: 1 }}>
                <FormLabel>Instructor Name:</FormLabel>
                <StyledTextField
                  fullWidth
                  placeholder="Harrison Lane"
                  value={formData.instructorName}
                  onChange={(e) =>
                    handleChange("instructorName", e.target.value)
                  }
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              {/* Fees */}
              <Box sx={{ flex: 1 }}>
                <FormLabel>Fees:</FormLabel>
                <StyledTextField
                  fullWidth
                  placeholder="$0.00"
                  value={formData.fees}
                  onChange={(e) => handleChange("fees", e.target.value)}
                />
              </Box>

              {/* Slots */}
              <Box sx={{ flex: 1 }}>
                <FormLabel>No.of Slots:</FormLabel>
                <StyledTextField
                  fullWidth
                  placeholder="0"
                  value={formData.slots}
                  onChange={(e) => handleChange("slots", e.target.value)}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              {/* From Date */}
              <Box sx={{ flex: 1 }}>
                <FormLabel>From Date:</FormLabel>
                <StyledDatePicker
                  value={formData.fromDate}
                  onChange={(newValue) => handleChange("fromDate", newValue)}
                  format="DD-MM-YYYY"
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
              </Box>

              {/* To Date */}
              <Box sx={{ flex: 1 }}>
                <FormLabel>To Date:</FormLabel>
                <StyledDatePicker
                  value={formData.toDate}
                  onChange={(newValue) => handleChange("toDate", newValue)}
                  format="DD-MM-YYYY"
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
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              {/* Start Time */}
              <Box sx={{ flex: 1 }}>
                <FormLabel>Start Time:</FormLabel>
                <StyledTimePicker
                  value={formData.startTime}
                  onChange={(newValue) => handleChange("startTime", newValue)}
                  format="hh:mm A"
                  slotProps={{
                    textField: {
                      placeholder: "09:30 AM",
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
              </Box>

              {/* End Time */}
              <Box sx={{ flex: 1 }}>
                <FormLabel>End Time:</FormLabel>
                <StyledTimePicker
                  value={formData.endTime}
                  onChange={(newValue) => handleChange("endTime", newValue)}
                  format="hh:mm A"
                  slotProps={{
                    textField: {
                      placeholder: "10:30 AM",
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
              </Box>
            </Box>

            {/* Action Buttons */}
            <ButtonGroup>
              <SaveButton onClick={handleSubmit}>Save</SaveButton>
              <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            </ButtonGroup>
          </StyledDialogContent>
        </StyledDialog>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default CreateEvent;
