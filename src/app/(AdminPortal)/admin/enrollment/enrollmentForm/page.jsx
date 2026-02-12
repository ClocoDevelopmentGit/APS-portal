"use client";
import React, { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ProgressStepper from "./components/ProgressStepper";
import Step1StudentInfo from "./components/Step1StudentInfo";
import Step2AdditionalInfo from "./components/Step2AdditionalInfo";
import Step3CourseSelection from "./components/Step3CourseSelection";
import Step4Payment from "./components/Step4Payment";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    currentAge: "",
    guardianName: "",
    guardianContact: "",
    guardianEmail: "",
    relationship: "",

    // Step 2
    gender: "",
    schoolYearLevel: "",
    hearAboutUs: "",
    addressLine1: "",
    addressLine2: "",
    suburb: "",
    postcode: "",
    state: "",
    country: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyRelationship: "",
    medicalConditions: "",
    supportNeeds: "",
    photoPermission: "",
    ndisPlan: "",

    // NDIS Fields
    ndisProviderName: "",
    ndisProviderContact: "",
    ndisProviderEmail: "",
    ndisNumber: "",
    ndisCategoryName: "",
    ndisEmergencyContact: "",
    ndisCarerPhone: "",

    // Step 3 - NEW
    course: "",
    location: "",
    session: "",
    enrollmentType: "",
  });

  const steps = [
    { number: 1, label: "Student Information" },
    { number: 2, label: "Additional Information" },
    { number: 3, label: "Course Selection" },
    { number: 4, label: "Payment" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Enrollment submitted successfully!");
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
          />
        );
      case 4:
        return (
          <Step4Payment
            formData={formData}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

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
