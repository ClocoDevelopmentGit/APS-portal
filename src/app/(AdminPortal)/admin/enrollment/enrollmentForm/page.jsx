"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ProgressStepper from "./components/ProgressStepper";
import Step1StudentInfo from "./components/Step1StudentInfo";
import Step2AdditionalInfo from "./components/Step2AdditionalInfo";
import Step3CourseSelection from "./components/Step3CourseSelection";
import Step4Payment from "./components/Step4Payment";
import { useDispatch } from "react-redux";
import { registerUser } from "@/redux/slices/userSlice";

// ==================== STYLED COMPONENTS ====================

const PageContainer = styled(Box)({
  padding: "0 10px",
  backgroundColor: "transparent",
  minHeight: "100vh",
});

const HeaderSection = styled(Box)({
  marginBottom: "24px",
});

const PageTitle = styled(Typography)({
  fontSize: "20px",
  fontWeight: 700,
  color: "#191919",
  lineHeight: "24px",
  marginBottom: "6px",
});

const Breadcrumb = styled(Typography)({
  fontSize: "14px",
  fontWeight: 400,
  color: "#666666",
  lineHeight: "18px",
});

const InfoBanner = styled(Box)({
  backgroundColor: "#AE9964",
  borderRadius: "5px",
  padding: "14px 20px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  height: "45px",
  marginBottom: "25px",
});

const InfoText = styled(Typography)({
  fontSize: "13px",
  fontWeight: 500,
  color: "#FFFFFF",
  lineHeight: "18px",
});

const ContentCard = styled(Box)({
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
});

const FormBox1 = styled(Box)({
  padding: "30px 40px 0px 40px",
  "@media (max-width: 768px)": {
    padding: "30px 15px 0px 15px",
  },
});

const FormBox2 = styled(Box)({
  padding: "0px 50px 40px 50px",
  "@media (max-width: 768px)": {
    padding: "0px 20px 20px 20px",
  },
});

const StyledDivider = styled(Divider)({
  borderColor: "#E5E5E5",
  margin: "30px 0",
});

// ==================== COMPONENT ====================

const ManualEnrollmentPage = () => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [enrollmentType, setEnrollmentType] = useState("");
  const [classDetails, setClassDetails] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseAge, setCourseAge] = useState("");
  const [formData, setFormData] = useState({
    // Step 1
    firstName: "",
    lastName: "",
    dob: "",
    currentAge: "",
    email: "",
    phone: "",
    guardianName: "",
    guardianContact: "",
    guardianEmail: "",
    relation: "",

    // Step 2
    gender: "",
    schoolYearLevel: "",
    infoAboutAPS: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyContactRelation: "",
    medicalCondition: "",
    supportNeeds: "",
    photoPermission: "",
    NDISPlan: "",
    addresses: {
      addressLine1: "",
      addressLine2: "",
      suburb: "",
      postcode: "",
      state: "",
      country: "",
    },

    // NDIS Fields
    NDIS: {
      providerName: "",
      providerContactName: "",
      providerEmail: "",
      number: "",
      categoryName: "",
      emergencyContactNumber: "",
      providerContactNumber: "",
    },

    //class selection
    classId: "",

    //event
    eventId: "",

    //newUser
    newUser: false,
  });
  const [loading, setLoading] = useState(false);
  const [overlayLoading, setOverlayLoading] = useState(false);

  const steps = [
    { number: 1, label: "Student Information" },
    { number: 2, label: "Additional Information" },
    { number: 3, label: "Course Selection" },
    { number: 4, label: "Payment" },
  ];

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      let step;
      let registrationData = {};
      let enrollmentType;
      let classId;
      let eventId;
      let courseDetails = {};
      let classDetails = [];
      let userData = null;
      if (typeof window !== "undefined") {
        step = localStorage.getItem("currentStep");
        registrationData = localStorage.getItem("formData");
        enrollmentType = localStorage.getItem("enrollmentType");
        classId = localStorage.getItem("classId");
        eventId = localStorage.getItem("eventId");
        courseDetails = JSON.parse(localStorage.getItem("courseDetails"));
        classDetails =
          courseDetails &&
          courseDetails !== "undefined" &&
          courseDetails !== "null"
            ? courseDetails?.classes
            : [];
        userData = localStorage.getItem("user");
      }
      const isUserDataMissing =
        userData === undefined || userData === "undefined";
      if (
        registrationData &&
        registrationData !== "undefined" &&
        (isUserDataMissing || registrationData?.classId)
      ) {
        const data = JSON.parse(registrationData);
        setFormData({ ...data, 
    newUser: false, });
      } else if (userData && userData !== "undefined") {
        const user = JSON.parse(userData);
        if (user?.role === "Student") {
          const birthDate = dayjs(user.dob);
          const today = dayjs();
          const age = today.diff(birthDate, "year");
          setFormData(() => ({
            ...user,
            currentAge: age,
            photoPermission: user.photoPermission ? "true" : "false",
            NDISPlan: user.NDISPlan ? "true" : "false",
    newUser: false,
          }));
        } else if (user?.role === "Parent") {
          const active = localStorage.getItem("activeChild");
          const birthDate = dayjs(user.dependents[Number(active)].dob);
          const today = dayjs();
          const age = today.diff(birthDate, "year");
          setFormData(() => ({
            ...user.dependents[Number(active)],
            currentAge: age,
            guardianName: `${user.firstName} ${user.lastName || ""}`.trim(),
            guardianEmail: user.email,
            guardianContact: user.phone,
            photoPermission: user.dependents[Number(active)].photoPermission
              ? "true"
              : "false",
            NDISPlan: user.dependents[Number(active)].NDISPlan
              ? "true"
              : "false",
            newUser: false,
          }));
        }
      }
      if (step && step !== "undefined") {
        setCurrentStep(Number(step));
      }
      if (enrollmentType && enrollmentType !== "undefined") {
        setEnrollmentType(enrollmentType);
      }
      if (courseDetails && courseDetails !== "undefined") {
        setCourseName(courseDetails.title || "");
        setCourseAge(courseDetails.ageRange || "");
      }
      setClassDetails(
        Array.isArray(classDetails) && classDetails.length > 0
          ? classDetails
          : courseDetails
      );

      if (classId && classId !== "null" && classId !== "undefined") {
        setFormData((prev) => ({
          ...prev,
          classId,
        }));
      }
      if (eventId && eventId !== "null" && eventId !== "undefined") {
        setFormData((prev) => ({
          ...prev,
          eventId,
        }));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

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

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      localStorage.setItem("currentStep", currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      localStorage.setItem("currentStep", currentStep - 1);
    }
  };

  const buildUserData = (formData, email, mobile, saveType) => ({
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.currentAge >= 18 ? email : null,
    phone: mobile,
    dob: formData.dob,
    age: formData.currentAge,
    infoAboutAPS: formData.infoAboutAPS,
    schoolYearLevel: formData.schoolYearLevel,
    gender: formData.gender,
    role: "Student",
    relation: formData.relation,
    emergencyContactName: formData.emergencyContactName,
    emergencyContactNumber: formData.emergencyContactNumber,
    emergencyContactRelation: formData.emergencyContactRelation,
    supportNeeds: formData.supportNeeds,
    medicalCondition: formData.medicalCondition,
    photoPermission: formData.photoPermission === "true",
    NDISPlan: formData.NDISPlan === "true",
    providerName: formData.NDIS.providerName,
    providerContactName: formData.NDIS.providerContactName,
    providerContactNumber: formData.NDIS.providerContactNumber,
    providerEmail: formData.NDIS.providerEmail,
    number: formData.NDIS.number,
    categoryName: formData.NDIS.categoryName,
    nDISEmergencyContactNumber: formData.NDIS.emergencyContactNumber,
    addressLine1: formData.addresses.addressLine1,
    addressLine2: formData.addresses.addressLine2 || null,
    suburb: formData.addresses.suburb,
    state: formData.addresses.state,
    country: formData.addresses.country,
    postcode: formData.addresses.postcode,
    ...(formData.currentAge >= 18 && { password: "Welcome@123" }),
    classId: formData.classId || null,
    eventId: formData.eventId || null,
    paymentStatus: saveType ? "Paid" : "Unpaid",
    enrollmentType: enrollmentType,
  });

  const handleSubmit = async (saveType = false) => {
    try {
      setOverlayLoading(true);
      let parentsData = null;
      let studentData = null;
      let usersData = [];

      if (formData.guardianEmail) {
        const nameParts = formData.guardianName.trim().split(/\s+/);
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || null;
        parentsData = {
          firstName,
          lastName,
          email: formData.guardianEmail,
          phone: formData.guardianContact,
          password: "Welcome@123",
          role: "Parent",
          relation: formData.relation,
        };
        studentData = buildUserData(
          formData,
          formData.guardianEmail,
          formData.guardianContact,
          saveType
        );
        usersData = [parentsData, studentData];
      } else {
        studentData = buildUserData(
          formData,
          formData.email,
          formData.phone,
          saveType
        );
        usersData = [studentData];
      }
      await dispatch(registerUser(usersData)).unwrap();
      setOverlayLoading(false);
      return true;
    } catch (error) {
      console.log(error);
      setOverlayLoading(false);
      return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1StudentInfo
            formData={formData}
            handleChange={handleChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <Step2AdditionalInfo
            formData={formData}
            handleChange={handleChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <Step3CourseSelection
            formData={formData}
            handleChange={handleChange}
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleSubmit}
            courseName={courseName}
            classDetails={classDetails}
            enrollmentType={enrollmentType}
            setCurrentStep={setCurrentStep}
          />
        );
      case 4:
        return (
          <Step4Payment
            formData={formData}
            onBack={handleBack}
            onSubmit={handleSubmit}
            courseName={courseName}
            courseAge={courseAge}
            enrollmentType={enrollmentType}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <Loading overlay={false} />;
  }
  return (
    <PageContainer>
      <HeaderSection>
        <PageTitle>Manual Enrollment</PageTitle>
        <Breadcrumb>
          Enrollments / Manual Enrollment / Enrollment Form
        </Breadcrumb>
      </HeaderSection>

      <InfoBanner>
        <InfoOutlinedIcon sx={{ color: "#FFFFFF", fontSize: "20px" }} />
        <InfoText>
          Fill in the enrollment details below. Required fields are marked with
          *
        </InfoText>
      </InfoBanner>

      <ContentCard>
        <FormBox1>
          <ProgressStepper currentStep={currentStep} steps={steps} />
        </FormBox1>
        <StyledDivider />
        <FormBox2>{renderStep()}</FormBox2>
      </ContentCard>
    </PageContainer>
  );
};

export default ManualEnrollmentPage;
