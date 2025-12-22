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
  Slider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconX } from "@tabler/icons-react";
import DescriptionBox from "./DescriptionBox";
import MediaFileUpload from "@/app/components/image-upload/media-upload";
import { useDispatch } from "react-redux";
import { createCourse, updateCourse } from "@/redux/slices/courseSlice";
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
  // marginBottom: "20px",
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

const ErrorText = styled(Typography)({
  fontSize: "12px",
  color: "#E85A4F",
  marginTop: "4px",
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
const CreateCourse = ({
  open,
  onClose,
  type,
  data = null,
  categories = {},
  setAlert,
  setOverlayLoading,
}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    courseName: "",
    courseCategory: "",
    ageRange: [4, 18],
    description: "",
    status: "",
    homePageStatus: "",
    courseImage: null,
    imageType: "",
  });

  const [courseImage, setCourseImage] = useState({
    file: null,
    previewUrl: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        const ageArray =
          typeof data.ageRange === "string"
            ? data.ageRange === "18+"
              ? [18, 18]
              : data.ageRange.split("-").map(Number)
            : data.ageRange;

        setFormData({
          courseName: data.title || "",
          courseCategory: data.courseCategoryId || "",
          ageRange: ageArray || [4, 18],
          description: data.description || "",
          status: data.isActive ? "Active" : "Inactive",
          homePageStatus: data.displayOnHomePage ? "Active" : "Inactive",
          courseImage: data.mediaUrl || null,
          imageType: data.mediaType || "",
        });
        setCourseImage({ file: null, previewUrl: data.mediaUrl || null });
      }
    };
    fetchData();
  }, [data, open]);

  const handleFileSelect = (file, previewUrl) => {
    setCourseImage({ file, previewUrl });
  };

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

  const validateCourseForm = (formData) => {
    const newErrors = {};
    const fieldLabels = {
      courseName: "Course Name",
      courseCategory: "Category",
      homePageStatus: "Display On HomePage",
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

    if (!courseImage.file) {
      newErrors.courseImage = "Course Image/Video is required";
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
    const id = data?.id;
    const newErrors = validateCourseForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setOverlayLoading(true);
    setLoading(true);
    const ageString = Array.isArray(formData.ageRange)
      ? formData.ageRange.includes(18)
        ? "18+"
        : formData.ageRange.join("-")
      : formData.ageRange;

    const payload = new FormData();

    payload.append("title", formData.courseName);
    payload.append("courseCategoryId", formData.courseCategory);
    payload.append("isActive", formData.status === "Active");
    payload.append("displayOnHomePage", formData.homePageStatus === "Active");
    payload.append("link", generateSlug(formData.courseName || ""));
    payload.append("createdBy", "admin");
    if (formData.description) {
      payload.append("description", formData.description);
    }
    if (formData.ageRange) {
      payload.append("ageRange", ageString);
    }
    if (courseImage.file) {
      payload.append("course", courseImage.file);
    }
    try {
      if (type === "edit" && id) {
        await dispatch(updateCourse({ formData: payload, id }))
          .unwrap()
          .then(() => {
            setAlert({
              severity: "success",
              message: "Course Updated Successfully",
            });
            handleCancel();
          })
          .catch((error) => {
            console.log(error);
            handleCancel();
          });
      } else {
        await dispatch(createCourse({ formData: payload }))
          .unwrap()
          .then(() => {
            setAlert({
              severity: "success",
              message: "Course Created Successfully",
            });
            handleCancel();
          })
          .catch((error) => {
            console.log(error);
            handleCancel();
          });
        onClose();
      }
    } catch (error) {
      console.log(error);
      setAlert({ severity: "error", message: error || "Something went wrong" });
    } finally {
      setLoading(false);
      setOverlayLoading(false);
    }
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
      imageType: "",
    });
    setCourseImage({ file: null, previewUrl: null });
    setErrors({});
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <StyledDialogTitle>
        {type === "add" ? "Create New Course" : "Update Course"}
        <CloseButton onClick={handleCancel}>
          <IconX size={20} />
        </CloseButton>
      </StyledDialogTitle>

      <StyledDialogContent>
        {/* Course Name */}
        <Box
          sx={{
            marginBottom: "20px",
          }}
        >
          <FormLabel>Course Name:</FormLabel>
          <StyledTextField
            fullWidth
            placeholder="Senior Kids Acting - Teens"
            value={formData.courseName}
            onChange={(e) => handleChange("courseName", e.target.value)}
          />
          {errors.courseName && <ErrorText>{errors.courseName}</ErrorText>}
        </Box>

        {/* Course Category */}
        <Box sx={{ marginBottom: "20px" }}>
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
            {errors.courseCategory && (
              <ErrorText>{errors.courseCategory}</ErrorText>
            )}
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

        <Box pb={3}>
          <FormLabel>Upload Media:</FormLabel>
          <MediaFileUpload
            label="Course Image/Video:"
            onFileSelect={handleFileSelect}
            acceptedTypes=".jpg,.jpeg,.png,.gif,.mp4"
            maxSize={5}
            mediaUrl={formData.courseImage}
            mediaType={formData.imageType}
          />
          {errors.courseImage && <ErrorText>{errors.courseImage}</ErrorText>}
        </Box>

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
                      <span style={{ color: "#757575" }}>Select Status</span>
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

          {/* Disply in HomePage Status */}
          <Box sx={{ flex: 1 }}>
            <FormLabel>Display On HomePage:</FormLabel>
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
              {errors.homePageStatus && (
                <ErrorText>{errors.homePageStatus}</ErrorText>
              )}
            </StyledFormControl>
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
  );
};

export default CreateCourse;
