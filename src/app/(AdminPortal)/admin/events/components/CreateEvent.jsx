"use client";
import React, { useEffect, useState } from "react";
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
import MediaFileUpload from "@/app/components/image-upload/media-upload";
import { createEvent, updateEvent } from "@/redux/slices/eventSlice";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

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

const FormBox = styled(Box)({
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
  "@media (max-width: 578px)": {
    flexDirection: "column",
    gap: "20px",
  },
});

// ==================== COMPONENT ====================
const CreateEvent = ({
  open,
  onClose,
  type,
  setOverlayLoading,
  categories = {},
  setAlert,
  eventData = null,
  locations,
  instructors,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructorId: "",
    locationId: "",
    status: "",
    day: "",
    fromDate: null,
    toDate: null,
    startTime: null,
    endTime: null,
    fees: "",
    slots: "",
    room: "",
    notes: "",
    eventImage: null,
    imageType: "",
    eventCategory: "",
    homePageStatus: "",
  });
  const [isRoomPresent, setIsRoomPresent] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [eventMedia, setEventMedia] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      if (!eventData) return;

      setFormData({
        instructorId: eventData.instructorId || "",
        locationId: eventData.locationId || "",
        status: eventData.isActive ? "Active" : "Inactive",
        day: eventData.day || "",
        fromDate: eventData.startDate ? dayjs(eventData.startDate) : null,
        toDate: eventData.endDate ? dayjs(eventData.endDate) : null,
        startTime: eventData.startTime ? dayjs(eventData.startTime) : null,
        endTime: eventData.endTime ? dayjs(eventData.endTime) : null,
        fees: eventData.fees || 0,
        slots: eventData.availableSeats || 0,
        description: eventData.description || "",
        room: eventData.room || "",
        notes: eventData.notes || "",
        title: eventData.title || "",
        eventImage: eventData.mediaUrl || null,
        imageType: eventData.mediaType || "",
        eventCategory: eventData.categoryId || "",
        homePageStatus: eventData.displayOnHomePage ? "Active" : "Inactive",
      });
      setIsRoomPresent(eventData.room ? true : false);
      setEventMedia({ file: null, previewUrl: eventData.mediaUrl || null });
    };
    fetchData();
  }, [eventData, open]);

  const handleFileSelect = (file, previewUrl) => {
    setEventMedia({ file, previewUrl });
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const validateEventForm = (formData) => {
    const newErrors = {};
    const fieldLabels = {
      locationId: "Location",
      instructorId: "Instructor",
      day: "Day",
      fromDate: "Start Date",
      toDate: "End Date",
      startTime: "Start Time",
      endTime: "End Time",
      slots: "Available Seats",
      status: "Status",
      fees: "Fees",
      title: "Event Name",
      eventCategory: "Category",
      homePageStatus: "Display On HomePage",
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

    if (!newErrors.fromDate && !newErrors.toDate) {
      const start = new Date(formData.fromDate);
      const end = new Date(formData.toDate);
      if (start > end) newErrors.toDate = "End Date must be after Start Date";
    }

    if (!newErrors.startTime && !newErrors.endTime) {
      const t1 = new Date(formData.startTime);
      const t2 = new Date(formData.endTime);
      if (t1 >= t2) newErrors.endTime = "End Time must be after Start Time";
    }

    if (formData.slots && Number(formData.slots) <= 1) {
      newErrors.slots = "Available Seats must be greater than 1";
    }

    if (formData.fees && Number(formData.fees) <= 1) {
      newErrors.fees = "Fees must be greater than 1";
    }

    if (eventMedia === null) {
      newErrors.eventMedia = "Event Media is required";
    }

    return newErrors;
  };

  const generateSlug = (text = "") => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s\_]+/g, "-")
      .replace(/[^\w\-]+/g, "-")
      .replace(/\-\-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = eventData?.id;
    const newErrors = validateEventForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setOverlayLoading(true);
    setLoading(true);
    const payload = new FormData();
    if (eventMedia && eventMedia.file) {
      payload.append("event", eventMedia.file);
    }
    payload.append("title", formData.title || "");
    payload.append("description", formData.description || "");
    payload.append("locationId", formData.locationId);
    payload.append("categoryId", formData.eventCategory);
    payload.append("instructorId", formData.instructorId);
    payload.append("day", formData.day);
    payload.append(
      "startDate",
      formData.fromDate ? formData.fromDate.format("YYYY-MM-DD") : ""
    );
    payload.append("buttonLink", generateSlug(formData.title || ""));
    payload.append(
      "endDate",
      formData.toDate ? formData.toDate.format("YYYY-MM-DD") : ""
    );
    payload.append(
      "startTime",
      formData.startTime ? formData.startTime.format("HH:mm") : ""
    );
    payload.append(
      "endTime",
      formData.endTime ? formData.endTime.format("HH:mm") : ""
    );
    payload.append("room", formData.room);
    payload.append("notes", formData.notes || "");
    payload.append("availableSeats", String(Number(formData.slots) || 0));
    payload.append("createdBy", "admin");
    payload.append("isActive", formData.status === "Active" ? "true" : "false");
    payload.append("fees", parseFloat(formData.fees) || 0);
    payload.append(
      "displayOnHomePage",
      formData.homePageStatus === "Active" ? "true" : "false"
    );

    try {
      if (type === "edit" && id) {
        await dispatch(updateEvent({ formData: payload, id }))
          .unwrap()
          .then(() => {
            setAlert({
              severity: "success",
              message: "Event Updated Successfully",
            });
            handleCancel();
          })
          .catch((error) => {
            console.log("Error creating event:", error);
            setAlert({
              severity: "error",
              message: error,
            });
            handleCancel();
          });
      } else {
        await dispatch(createEvent({ formData: payload }))
          .unwrap()
          .then(() => {
            setAlert({
              severity: "success",
              message: "Event Created Successfully",
            });
            handleCancel();
          })
          .catch((error) => {
            console.log("Error creating event:", error);
            setAlert({
              severity: "error",
              message: error,
            });
            handleCancel();
          });
      }
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
      title: "",
      description: "",
      instructorId: "",
      locationId: "",
      status: "",
      day: "",
      fromDate: null,
      toDate: null,
      startTime: null,
      endTime: null,
      fees: "",
      slots: "",
      room: "",
      notes: "",
      eventImage: null,
      imageType: "",
      eventCategory: "",
      homePageStatus: "",
    });
    setIsRoomPresent(false);
    setEventMedia({ file: null, previewUrl: null });
    setErrors({});
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
            {type === "add" ? "Create New Workshop" : "Update Workshop"}
            <CloseButton onClick={handleCancel}>
              <IconX size={20} />
            </CloseButton>
          </StyledDialogTitle>

          <StyledDialogContent>
            {/* Instructor Name */}
            <Box sx={{ marginBottom: "20px" }}>
              <FormLabel>Name:</FormLabel>
              <StyledTextField
                fullWidth
                placeholder="Acting Basics"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              {errors.title && <ErrorText>{errors.title}</ErrorText>}
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

            <Box pb={3}>
              <FormLabel>Upload Media:</FormLabel>
              <MediaFileUpload
                label="Event Image/Video:"
                onFileSelect={handleFileSelect}
                acceptedTypes=".jpg,.jpeg,.png,.gif,.mp4"
                maxSize={5}
                mediaUrl={formData.eventImage}
                mediaType={formData.imageType}
              />
              {errors.eventMedia && <ErrorText>{errors.eventMedia}</ErrorText>}
            </Box>

            {/* Category */}
            <FormBox>
              <Box sx={{ flex: 1 }}>
                <FormLabel>Category:</FormLabel>
                <StyledFormControl fullWidth>
                  <Select
                    value={formData.eventCategory}
                    onChange={(e) =>
                      handleChange("eventCategory", e.target.value)
                    }
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span style={{ color: "#757575" }}>
                            Select Category
                          </span>
                        );
                      }
                      const selectedCategory = categories.find(
                        (cat) => cat.id === selected
                      );
                      return selectedCategory ? selectedCategory.name : "";
                    }}
                  >
                    {categories.length > 0 ? (
                      categories?.map((cat) => (
                        <StyledMenuItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </StyledMenuItem>
                      ))
                    ) : (
                      <StyledMenuItem>Loading...</StyledMenuItem>
                    )}
                  </Select>
                  {errors.eventCategory && (
                    <ErrorText>{errors.eventCategory}</ErrorText>
                  )}
                </StyledFormControl>
              </Box>

              {/* Location */}
              <Box sx={{ flex: 1 }}>
                <FormLabel>Location:</FormLabel>
                <StyledFormControl fullWidth>
                  <Select
                    value={formData.locationId}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      handleChange("locationId", selectedId);
                      const selectedLoc = locations.find(
                        (loc) => loc.id === selectedId
                      );
                      setSelectedLocation(selectedLoc);
                      setIsRoomPresent(selectedLoc?.rooms?.length > 0);
                      setFormData((prev) => ({
                        ...prev,
                        room: "",
                      }));
                    }}
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span style={{ color: "#999999" }}>
                            Select Location
                          </span>
                        );
                      }
                      const selectedLocation = locations.find(
                        (cat) => cat.id === selected
                      );
                      return selectedLocation
                        ? `${selectedLocation?.name?.trim() || ""}`.trim()
                        : "";
                    }}
                  >
                    {locations?.length > 0 ? (
                      locations?.map((location) => (
                        <StyledMenuItem key={location.id} value={location.id}>
                          {location.name}
                        </StyledMenuItem>
                      ))
                    ) : (
                      <StyledMenuItem>Loading...</StyledMenuItem>
                    )}
                  </Select>
                  {errors.locationId && (
                    <ErrorText>{errors.locationId}</ErrorText>
                  )}
                </StyledFormControl>
              </Box>
            </FormBox>

            {isRoomPresent && (
              <Box pb={3}>
                <FormLabel>Room:</FormLabel>
                <StyledFormControl fullWidth>
                  <Select
                    value={formData.room}
                    onChange={(e) => handleChange("room", e.target.value)}
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span style={{ color: "#999999" }}>Select Room</span>
                        );
                      }
                      return selected;
                    }}
                  >
                    {selectedLocation && selectedLocation?.rooms?.length > 0 ? (
                      selectedLocation?.rooms?.map((room) => (
                        <StyledMenuItem key={room} value={room}>
                          {room}
                        </StyledMenuItem>
                      ))
                    ) : (
                      <StyledMenuItem>Loading...</StyledMenuItem>
                    )}
                  </Select>
                </StyledFormControl>
              </Box>
            )}

            <FormBox>
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
                  {errors.status && <ErrorText>{errors.status}</ErrorText>}
                </StyledFormControl>
              </Box>

              {/* Status */}
              <Box sx={{ flex: 1 }}>
                <FormLabel>Display On HomePage:</FormLabel>
                <StyledFormControl fullWidth>
                  <Select
                    value={formData.homePageStatus}
                    onChange={(e) =>
                      handleChange("homePageStatus", e.target.value)
                    }
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
                  {errors.homePageStatus && (
                    <ErrorText>{errors.homePageStatus}</ErrorText>
                  )}
                </StyledFormControl>
              </Box>
            </FormBox>

            <FormBox>
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
                  {errors.day && <ErrorText>{errors.day}</ErrorText>}
                </StyledFormControl>
              </Box>

              {/* Slots */}
              <Box sx={{ flex: 1 }}>
                <FormLabel>Instructor Name:</FormLabel>
                <StyledFormControl fullWidth>
                  <Select
                    value={formData.instructorId}
                    onChange={(e) =>
                      handleChange("instructorId", e.target.value)
                    }
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span style={{ color: "#999999" }}>
                            Select Instructor
                          </span>
                        );
                      }
                      const selectedInstructor = instructors.find(
                        (cat) => cat.id === selected
                      );
                      return selectedInstructor
                        ? `${selectedInstructor?.firstName?.trim() || ""} ${
                            selectedInstructor?.lastName?.trim() || ""
                          }`.trim()
                        : "";
                    }}
                  >
                    {instructors.length > 0 ? (
                      instructors?.map((instructor) => (
                        <StyledMenuItem
                          key={instructor.id}
                          value={instructor.id}
                        >
                          {`${instructor.firstName?.trim() || ""} ${
                            instructor.lastName?.trim() || ""
                          }`.trim()}
                        </StyledMenuItem>
                      ))
                    ) : (
                      <StyledMenuItem>Loading...</StyledMenuItem>
                    )}
                  </Select>
                  {errors.instructorId && (
                    <ErrorText>{errors.instructorId}</ErrorText>
                  )}
                </StyledFormControl>
              </Box>
            </FormBox>

            <FormBox>
              {/* Fees */}
              <Box sx={{ flex: 1 }}>
                <FormLabel>Fees:</FormLabel>
                <StyledTextField
                  fullWidth
                  placeholder="$0.00"
                  value={formData.fees}
                  onChange={(e) => handleChange("fees", e.target.value)}
                />
                {errors.fees && <ErrorText>{errors.fees}</ErrorText>}
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
                {errors.slots && <ErrorText>{errors.slots}</ErrorText>}
              </Box>
            </FormBox>

            <FormBox>
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
                {errors.fromDate && <ErrorText>{errors.fromDate}</ErrorText>}
              </Box>

              {/* To Date */}
              <Box sx={{ flex: 1 }}>
                <FormLabel>To Date:</FormLabel>
                <StyledDatePicker
                  value={formData.toDate}
                  onChange={(newValue) => handleChange("toDate", newValue)}
                  format="DD-MM-YYYY"
                  minDate={dayjs()}
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
                {errors.toDate && <ErrorText>{errors.toDate}</ErrorText>}
              </Box>
            </FormBox>

            <FormBox>
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
                {errors.startTime && <ErrorText>{errors.startTime}</ErrorText>}
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
                {errors.endTime && <ErrorText>{errors.endTime}</ErrorText>}
              </Box>
            </FormBox>

            {/* Action Buttons */}
            <ButtonGroup>
              <SaveButton disabled={loading} onClick={(e) => handleSubmit(e)}>
                {loading ? "Saving..." : "Save"}
              </SaveButton>
              <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            </ButtonGroup>
          </StyledDialogContent>
        </StyledDialog>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default CreateEvent;
