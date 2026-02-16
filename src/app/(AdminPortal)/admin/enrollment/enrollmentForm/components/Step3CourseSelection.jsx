"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
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
  marginBottom: "20px",
  "@media (max-width: 768px)": {
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
      borderColor: "#AE9964",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#AE9964",
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
    color: "#AE9964",
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
    color: "#AE9964",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "#FEF7EA",
    },
  },
});

const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: "30px",
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

// ==================== COMPONENT ====================

const CourseSelection = ({
  formData,
  handleChange,
  onNext,
  onBack,
  enrollmentType
}) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [selectedCourseObj, setSelectedCourseObj] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("allCourses");
    console.log("Loaded courses from localStorage:", stored);
    if (stored) {
      setCourses(JSON.parse(stored));
    }
  }, []);

  // When course changes
  const handleCourseChange = (e) => {
    const selectedTitle = e.target.value;

    const courseObj = courses.find(
      (course) => course.title === selectedTitle
    );

    setSelectedCourseObj(courseObj || null);

    handleChange(e);

    // Reset dependent fields
    handleChange({ target: { name: "location", value: "" } });
    handleChange({ target: { name: "session", value: "" } });
  };

  // When location changes
  const handleLocationChange = (e) => {
    handleChange(e);
    handleChange({ target: { name: "session", value: "" } });
  };

  // Unique Locations
  const locations = useMemo(() => {
    if (!selectedCourseObj) return [];

    const activeClasses = selectedCourseObj.classes.filter(
      (cls) => cls.isActive
    );

    const unique = [
      ...new Map(
        activeClasses.map((cls) => [
          cls.location.id,
          cls.location,
        ])
      ).values(),
    ];

    return unique;
  }, [selectedCourseObj]);

  // Sessions filtered by location
  const sessions = useMemo(() => {
    if (!selectedCourseObj || !formData.location) return [];

    return selectedCourseObj.classes.filter(
      (cls) =>
        cls.location.name === formData.location &&
        cls.isActive
    );
  }, [selectedCourseObj, formData.location]);

  const formatSessionLabel = (cls) => {
    const startDate = new Date(cls.startDate).toLocaleDateString("en-AU");
    const endDate = new Date(cls.endDate).toLocaleDateString("en-AU");

    const startTime = new Date(cls.startTime).toLocaleTimeString("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const endTime = new Date(cls.endTime).toLocaleTimeString("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${startDate} - ${endDate} | ${cls.day} | ${startTime}-${endTime} | ${cls.location.name}`;
  };

   const validateEnrollmentForm = (formData) => {
    const newErrors = {};
    const fieldLabels = {
      ...(enrollmentType === "Course" && { classId: "Class" }),
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

  const handleNextClick = () => {
  setErrors({});

  const formError = validateEnrollmentForm(formData);
  if (Object.keys(formError).length > 0) {
    setErrors(formError);
    return;
  }

  // 🔥 Find selected class object
  const selectedClass = selectedCourseObj?.classes?.find(
    (cls) => cls.id === formData.session // or classId if you renamed it
  );

  if (!selectedClass) {
    console.log("Selected class not found");
    return;
  }

  localStorage.setItem("classId", selectedClass.id);
  localStorage.setItem("formData", JSON.stringify(formData));

  const enrollmentData = {
    studentName: (
      (formData.firstName || "") +
      " " +
      (formData.lastName || "")
    ).trim(),

    courseName: formData.course || "",

    location: selectedClass.location?.name || "",

    sessionDetails: `${selectedClass.day} - ${new Date(
      selectedClass.startDate
    ).toLocaleDateString("en-AU")} to ${new Date(
      selectedClass.endDate
    ).toLocaleDateString("en-AU")}`,

    sessionTime: `${new Date(
      selectedClass.startTime
    ).toLocaleTimeString("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${new Date(
      selectedClass.endTime
    ).toLocaleTimeString("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
    })}`,

    tutorName: `${selectedClass.tutor?.firstName || ""} ${
      selectedClass.tutor?.lastName || ""
    }`.trim(),

    availableSeats: selectedClass.availableSeats || 0,
  };

  localStorage.setItem(
    "enrollmentData",
    JSON.stringify(enrollmentData)
  );

  onNext();
};


  return (
    <Box>
      <ContentWrapper>
        <SectionTitle>Course Selection:</SectionTitle>

        <FormContent>
          <FormContainer>
            {/* COURSE */}
            <Box width="100%">
              <FieldLabel>
                Course: <span>*</span>
              </FieldLabel>
              <StyledFormControl fullWidth>
                <Select
                  name="course"
                  value={formData.course || ""}
                  onChange={handleCourseChange}
                  displayEmpty
                >
                  <StyledMenuItem value="">
                    Select
                  </StyledMenuItem>
                  {courses
                    .filter((c) => c.isActive)
                    .map((course) => (
                      <StyledMenuItem
                        key={course.id}
                        value={course.title}
                      >
                        {course.title}
                      </StyledMenuItem>
                    ))}
                </Select>
              </StyledFormControl>
            </Box>

            {/* LOCATION */}
            <Box width="100%">
              <FieldLabel>
                Location: <span>*</span>
              </FieldLabel>
              <StyledFormControl fullWidth>
                <Select
                  name="location"
                  value={formData.location || ""}
                  onChange={handleLocationChange}
                  disabled={!selectedCourseObj}
                  displayEmpty
                >
                  <StyledMenuItem value="">
                    Select
                  </StyledMenuItem>
                  {locations.map((loc) => (
                    <StyledMenuItem
                      key={loc.id}
                      value={loc.name}
                    >
                      {loc.name}
                    </StyledMenuItem>
                  ))}
                </Select>
              </StyledFormControl>
            </Box>
          </FormContainer>

          <FormContainer>
            {/* SESSION */}
            <Box width="100%">
              <FieldLabel>
                Session: <span>*</span>
              </FieldLabel>
              <StyledFormControl fullWidth>
                <Select
                  name="session"
                  value={formData.session || ""}
                  onChange={handleChange}
                  disabled={!formData.location}
                  displayEmpty
                >
                  <StyledMenuItem value="">
                    Select
                  </StyledMenuItem>
                  {sessions.map((cls) => (
                    <StyledMenuItem
                      key={cls.id}
                      value={cls.id}
                      // disabled={!cls.canEnroll}
                      disabled={cls.availableSeats === 0}
                    >
                      {formatSessionLabel(cls)}{" "}
                      ({cls.availableSeats} seats)
                    </StyledMenuItem>
                  ))}
                </Select>
              </StyledFormControl>
            </Box>

            {/* ENROLLMENT TYPE */}
            <Box width="100%">
              <FieldLabel>
                Enrollment Type: <span>*</span>
              </FieldLabel>
              <StyledFormControl fullWidth>
                <Select
                  name="enrollmentType"
                  value={formData.enrollmentType || ""}
                  onChange={handleChange}
                  displayEmpty
                >
                  <StyledMenuItem value="">
                    Select
                  </StyledMenuItem>
                  <StyledMenuItem value="Term Payment">
                    Term Payment
                  </StyledMenuItem>
                  <StyledMenuItem value="Full Year">
                    Full Year
                  </StyledMenuItem>
                  <StyledMenuItem value="Monthly">
                    Monthly
                  </StyledMenuItem>
                  <StyledMenuItem value="Trial Class">
                    Trial Class
                  </StyledMenuItem>
                </Select>
              </StyledFormControl>
            </Box>
          </FormContainer>

          <ButtonContainer>
            <BackButton
              onClick={onBack}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </BackButton>
            <NextButton
              onClick={handleNextClick}
              endIcon={<ArrowForwardIcon />}
            >
              Next
            </NextButton>
          </ButtonContainer>
        </FormContent>
      </ContentWrapper>
    </Box>
  );
};

export default CourseSelection;