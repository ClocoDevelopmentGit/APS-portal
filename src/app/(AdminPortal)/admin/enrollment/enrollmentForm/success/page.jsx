"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { sendEnrollmentEmail } from "@/redux/slices/userSlice";

// ==================== STYLED COMPONENTS ====================

const PageContainer = styled(Box)({
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

const SuccessIconContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",
});

const SuccessIcon = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60px",
  width: "60px",
  borderRadius: "40px",
  backgroundColor: "#4CAF50",
});

const SuccessTitle = styled(Typography)({
  fontSize: "22px",
  fontWeight: 700,
  color: "#4CAF50",
  textAlign: "center",
  marginBottom: "16px",
  lineHeight: "33px",
  "@media (max-width: 768px)": {
    fontSize: "18px",
  },
});

const SuccessDescription = styled(Typography)({
  fontSize: "15px",
  fontWeight: 600,
  color: "#5E5E5E",
  textAlign: "center",
  marginBottom: "40px",
  lineHeight: "24px",
  "@media (max-width: 768px)": {
    fontSize: "14px",
  },
});

const SummaryCard = styled(Box)({
  backgroundColor: "#FAFAFA",
  border: "1px solid #E5E5E5",
  borderRadius: "8px",
  padding: "24px",
  maxWidth: "800px",
  margin: "0 auto 40px",
  boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.10)",
});

const SummaryHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  paddingBottom: "15px",
  borderBottom: "1px solid #D3D3D3",
  borderRadius: "0px",
  "@media (max-width: 568px)": {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
  },
});

const SummaryTitle = styled(Typography)({
  fontSize: "18px",
  fontWeight: 600,
  color: "#191919",
  lineHeight: "22px",
  "@media (max-width: 768px)": {
    fontSize: "16px",
  },
});

const EnrollmentID = styled(Box)({
  backgroundColor: "#FFFBF5",
  border: "1px solid #635738",
  borderRadius: "5px",
  padding: "2px 12px",
  fontSize: "10px",
  fontWeight: 600,
  color: "#635738",
});

const SummaryRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "20px",
  padding: "8px 0",
});

const SummaryLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: 400,
  color: "#666666",
  minWidth: "50%",
  "@media (max-width: 768px)": {
    fontSize: "13px",
  },
});

const SummaryValue = styled(Typography)({
  fontSize: "14px",
  fontWeight: 500,
  color: "#333333",
  textAlign: "right",
  flex: 1,
  "@media (max-width: 768px)": {
    fontSize: "13px",
  },
});

const TotalRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 0 0",
  marginTop: "12px",
  borderTop: "1px solid #D3D3D3",
  borderRadius: "0px",
});

const TotalLabel = styled(Typography)({
  fontSize: "17px",
  fontWeight: 600,
  color: "#181818",
  lineHeight: "24px",
  "@media (max-width: 768px)": {
    fontSize: "15px",
  },
});

const TotalValue = styled(Typography)({
  fontSize: "19px",
  fontWeight: 700,
  color: "#AE9964",
  lineHeight: "28px",
  "@media (max-width: 768px)": {
    fontSize: "17px",
  },
});

const ButtonContainer = styled(Box)({
  display: "flex",
  gap: "16px",
  justifyContent: "center",
  "@media (max-width: 568px)": {
    flexDirection: "column",
  },
});

const PrimaryButton = styled(Button)({
  backgroundColor: "#AE9964",
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "5px 24px",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#AE9964",
    color: "#FFFFFF",
    boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.10)",
  },
  "@media (max-width: 568px)": {
    width: "100%",
  },
});

const SecondaryButton = styled(Button)({
  backgroundColor: "#FFFFFF",
  color: "#191919",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "5px 24px",
  borderRadius: "5px",
  border: "1px solid #D3D3D3",
  "&:hover": {
    backgroundColor: "#FFFFFF",
    color: "#191919",
    boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.10)",
  },
  "@media (max-width: 568px)": {
    width: "100%",
  },
});

// ==================== COMPONENT ====================

const ManualEnrollmentSuccess = () => {
  const [enrollmentData, setEnrollmentData] = useState(null);
  const dispatch = useDispatch();

  const handleBackToEnrollments = () => {
    window.location.href = "/admin/enrollment";
  };

  const handleDownloadReceipt = () => {
    // Generate and download receipt
    alert("Receipt download started");
  };

  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem("enrollmentData");
      if (storedData) {
        setEnrollmentData(JSON.parse(storedData));
      }
      localStorage.removeItem("formData");
      localStorage.removeItem("currentStep");
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (enrollmentData) {
      console.log("Enrollment data to be sent via email:", enrollmentData);
      dispatch(sendEnrollmentEmail(enrollmentData));
    }
  }, [enrollmentData, dispatch]);

  return (
    <PageContainer>
      <HeaderSection>
        <PageTitle>Manual Enrollment</PageTitle>
        <Breadcrumb>Enrollments / Manual Enrollment / Success</Breadcrumb>
      </HeaderSection>

      <SuccessCard>
        {/* Success Icon */}
        <SuccessIconContainer>
          <SuccessIcon>
            <CheckIcon style={{ color: "#FFFFFF", fontSize: "40px" }} />
          </SuccessIcon>
        </SuccessIconContainer>

        {/* Success Title */}
        <SuccessTitle>Payment Successful!</SuccessTitle>

        {/* Success Description */}
        <SuccessDescription>
          Thank you for enrolling at Acting Performance Studio.
          <br />
          Your payment has been processed successfully and your spot is
          confirmed.
        </SuccessDescription>

        {/* Enrollment Summary */}
        <SummaryCard>
          <SummaryHeader>
            <SummaryTitle>Enrollment Summary</SummaryTitle>
            <EnrollmentID>{enrollmentData?.bookingId}</EnrollmentID>
          </SummaryHeader>

          <SummaryRow>
            <SummaryLabel>Student Name:</SummaryLabel>
            <SummaryValue>{enrollmentData?.studentName}</SummaryValue>
          </SummaryRow>

          <SummaryRow>
            <SummaryLabel>Course Name:</SummaryLabel>
            <SummaryValue>{enrollmentData?.courseName}</SummaryValue>
          </SummaryRow>

          <SummaryRow>
            <SummaryLabel>Location:</SummaryLabel>
            <SummaryValue>{enrollmentData?.location}</SummaryValue>
          </SummaryRow>

          <SummaryRow>
            <SummaryLabel>Session Details:</SummaryLabel>
            <SummaryValue>{enrollmentData?.sessionDetails}</SummaryValue>
          </SummaryRow>

          <SummaryRow>
            <SummaryLabel>Session Time:</SummaryLabel>
            <SummaryValue>{enrollmentData?.sessionTime}</SummaryValue>
          </SummaryRow>

          <SummaryRow>
            <SummaryLabel>Payment Method:</SummaryLabel>
            <SummaryValue>{enrollmentData?.paymentMethod}</SummaryValue>
          </SummaryRow>

          <SummaryRow>
            <SummaryLabel>Transaction ID:</SummaryLabel>
            <SummaryValue>{enrollmentData?.transactionId}</SummaryValue>
          </SummaryRow>

          <TotalRow>
            <TotalLabel>Total Amount Paid:</TotalLabel>
            <TotalValue>{enrollmentData?.totalAmount}</TotalValue>
          </TotalRow>
        </SummaryCard>

        {/* Action Buttons */}
        <ButtonContainer>
          <PrimaryButton onClick={handleDownloadReceipt}>
            Download Receipt
          </PrimaryButton>
          <SecondaryButton onClick={handleBackToEnrollments}>
            Back to Enrolments
          </SecondaryButton>
        </ButtonContainer>

        {/* Enrollment Details */}
        {/* <DetailsCard>
          <DetailsHeader>
            <DetailsTitle>Enrolment Details</DetailsTitle>
            <BookingID>{enrollmentData?.bookingId}</BookingID>
          </DetailsHeader>

          <DetailsRow>
            <DetailsLabel>Student Name:</DetailsLabel>
            <DetailsValue>{enrollmentData?.studentName}</DetailsValue>
          </DetailsRow>

          <DetailsRow>
            <DetailsLabel>Course Name:</DetailsLabel>
            <DetailsValue>{enrollmentData?.courseName}</DetailsValue>
          </DetailsRow>

          <DetailsRow>
            <DetailsLabel>Location:</DetailsLabel>
            <DetailsValue>{enrollmentData?.location}</DetailsValue>
          </DetailsRow>

          <DetailsRow>
            <DetailsLabel>Session Details:</DetailsLabel>
            <DetailsValue>{enrollmentData?.sessionDetails}</DetailsValue>
          </DetailsRow>

          <DetailsRow>
            <DetailsLabel>Session Time:</DetailsLabel>
            <DetailsValue>{enrollmentData?.sessionTime}</DetailsValue>
          </DetailsRow>

          <DetailsRow>
            <DetailsLabel>Payment Method:</DetailsLabel>
            <DetailsValue>{enrollmentData?.paymentMethod}</DetailsValue>
          </DetailsRow>

          <DetailsRow>
            <DetailsLabel>Transaction ID:</DetailsLabel>
            <DetailsValue>{enrollmentData?.transactionId}</DetailsValue>
          </DetailsRow>

          <TotalRow>
            <TotalLabel>Total Amount Paid:</TotalLabel>
            <TotalValue>{enrollmentData?.totalAmount}</TotalValue>
          </TotalRow>
        </DetailsCard> */}

        {/* Action Buttons */}
        {/* <ButtonContainer>
          <PrimaryButton onClick={handleViewDashboard}>
            View Dashboard
          </PrimaryButton>
          <SecondaryButton onClick={handleDownloadReceipt}>
            Download Receipt
          </SecondaryButton>
        </ButtonContainer> */}
      </SuccessCard>
    </PageContainer>
  );
};

export default ManualEnrollmentSuccess;
