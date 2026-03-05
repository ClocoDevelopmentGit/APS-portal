"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { sendRegisterEmail } from "@/redux/slices/userSlice";

// ==================== STYLED COMPONENTS ====================

const PageWrapper = styled(Box)({
  padding: "0 10px",
  backgroundColor: "transpernt",
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

const SuccessCard = styled(Box)({
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  padding: "50px",
  margin: "0 auto",
  boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.10)",
  "@media (max-width: 768px)": {
    padding: "30px 20px",
  },
});

const SuccessTitle = styled(Typography)({
  fontSize: "22px",
  fontWeight: 700,
  color: "#B38349",
  textAlign: "center",
  marginBottom: "30px",
  lineHeight: "1.2",
});

const TopSection = styled(Box)({
  marginBottom: "30px",
  textAlign: "center",
});

const SectionTitle = styled(Typography)({
  fontSize: "15px",
  fontWeight: 700,
  color: "#635738",
  marginBottom: "8px",
  display: "inline",
});

const SectionText = styled(Typography)({
  fontSize: "15px",
  fontWeight: 400,
  color: "#5E5E5E",
  lineHeight: "28px",
  display: "inline",
});

const InfoCard = styled(Box)({
  backgroundColor: "#FFF8EF",
  borderLeft: "5px solid #B29067",
  boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.10)",
  borderRadius: "12px",
  padding: "20px 25px",
  marginBottom: "20px",
});

const InfoTitle = styled(Typography)({
  fontSize: "14px",
  fontWeight: 700,
  color: "#635738",
  marginBottom: "6px",
  lineHeight: "24px",
});

const InfoText = styled(Typography)({
  fontSize: "13px",
  fontWeight: 400,
  color: "#666666",
  lineHeight: "23px",
  letterSpacing: "0.28px",
});

const BlueInfoCard = styled(Box)({
  backgroundColor: "#E3F2FD",
  boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.10)",
  borderLeft: "5px solid #2196F3",
  borderRadius: "12px",
  padding: "20px 25px",
  marginBottom: "35px",
});

const BlueInfoTitle = styled(Typography)({
  fontSize: "14px",
  fontWeight: 700,
  color: "#1565C0",
  marginBottom: "6px",
  lineHeight: "24px",
});

const BlueInfoText = styled(Typography)({
  fontSize: "13px",
  fontWeight: 400,
  color: "#1579D1",
  lineHeight: "23px",
  letterSpacing: "0.28px",
});

const ButtonContainer = styled(Box)({
  display: "flex",
  gap: "15px",
  justifyContent: "center",
  "@media (max-width: 568px)": {
    flexDirection: "column",
  },
});

const PrimaryButton = styled(Button)({
  backgroundColor: "#B38349",
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "5px 35px",
  borderRadius: "7px",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#9A6F3E",
    boxShadow: "none",
  },
  "@media (max-width: 568px)": {
    width: "100%",
  },
});

const SecondaryButton = styled(Button)({
  color: "#333333",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "5px 35px",
  border: "1px solid #CCCCCC",
  borderRadius: "7px",
  backgroundColor: "#FFFFFF",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#F5F5F5",
    borderColor: "#B0B0B0",
    boxShadow: "none",
  },
  "@media (max-width: 568px)": {
    width: "100%",
  },
});

// ==================== COMPONENT ====================

const SaveSuccessful = () => {
  const router = useRouter();
  const [enrollmentData, setEnrollmentData] = useState(null);
  const dispatch = useDispatch();

  const handleViewDashboard = () => {
    window.location.href = "/admin/enrollment";
  };

  // const handleGoToHome = () => {
  //   router.push("/");
  // };

  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem("formData");
      console.log(storedData);
      if (storedData) {
        setEnrollmentData(JSON.parse(storedData));
        console.log(
          "Enrollment data retrieved from localStorage:",
          JSON.parse(storedData),
        );
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("enrollment data for send register email:", enrollmentData);
    if (!enrollmentData) return;

    if (enrollmentData?.newUser) {
      dispatch(
        sendRegisterEmail(
          enrollmentData?.email || enrollmentData?.guardianEmail,
        ),
      );
    }
  }, [enrollmentData, dispatch]);

  return (
    <PageWrapper>
      <HeaderSection>
        <PageTitle>Manual Enrollment</PageTitle>
        <Breadcrumb>Enrollments / Manual Enrollment / Success</Breadcrumb>
      </HeaderSection>

      <SuccessCard>
        {/* Success Title */}
        <SuccessTitle>Form Saved!</SuccessTitle>

        {/* Top Section with inline title */}
        <TopSection>
          <SectionTitle>Spot Not Yet Secured: </SectionTitle>
          <SectionText>
            Your enrollment will be finalized once payment is completed.
          </SectionText>
          <br />
          <SectionText>
            Classes may fill up quickly, so we recommend completing your
            enrollment as soon as possible.
          </SectionText>
        </TopSection>

        {/* Information Saved Info */}
        <InfoCard>
          <InfoTitle>Information Saved Securely</InfoTitle>
          <InfoText>
            {`All your enrollment details are securely stored in your account. You
            can complete any necessary payment process whenever you're ready.`}
          </InfoText>
        </InfoCard>

        {/* What Happens Next Info */}
        <InfoCard>
          <InfoTitle>What Happens Next & Account Access</InfoTitle>
          <InfoText>
            Our team will contact you within 24-48 hours to confirm your
            details.
            <br />
            {`We've sent temporary login credentials to your registered email
            address to help you access your account and complete your
            enrollment.`}
          </InfoText>
        </InfoCard>

        {/* Funding/Payment Status */}
        {enrollmentData?.NDISPlan === "true" && (
          <BlueInfoCard>
            <BlueInfoTitle>Funding/Payment Status</BlueInfoTitle>
            <BlueInfoText>
              If applicable, your NDIS funding or payment method has been
              recorded.
              <br />
              No payment is required at this stage. The course will be invoiced
              directly to your provider if using NDIS.
            </BlueInfoText>
          </BlueInfoCard>
        )}

        {/* Action Buttons */}
        <ButtonContainer>
          <PrimaryButton onClick={handleViewDashboard}>
            Back to Enrolment
          </PrimaryButton>
          {/* <SecondaryButton onClick={handleGoToHome}>
            Go to Home Page
          </SecondaryButton> */}
        </ButtonContainer>
      </SuccessCard>
    </PageWrapper>
  );
};

export default SaveSuccessful;
