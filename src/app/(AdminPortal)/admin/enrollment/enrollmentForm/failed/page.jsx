"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

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

const FailedCard = styled(Box)({
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  padding: "50px",
  margin: "0 auto",
  boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.10)",
  "@media (max-width: 768px)": {
    padding: "30px 20px",
  },
});

const FailedIconContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",
});

const FailedIcon = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60px",
  width: "60px",
  borderRadius: "40px",
  backgroundColor: "#D32F2F",
});

const FailedTitle = styled(Typography)({
  fontSize: "22px",
  fontWeight: 700,
  color: "#D32F2F",
  textAlign: "center",
  marginBottom: "16px",
  lineHeight: "33px",
  "@media (max-width: 768px)": {
    fontSize: "18px",
  },
});

const FailedDescription = styled(Typography)({
  fontSize: "15px",
  fontWeight: 400,
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
  marginBottom: "20px",
  paddingBottom: "15px",
  borderBottom: "1px solid #D3D3D3",
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
    backgroundColor: "#9A8556",
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
    borderColor: "#D3D3D3",
    boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.10)",
  },
  "@media (max-width: 568px)": {
    width: "100%",
  },
});

// ==================== COMPONENT ====================

const ManualEnrollmentFailed = () => {
    const [enrollmentData, setEnrollmentData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem("enrollmentData");
      if (storedData) {
        setEnrollmentData(JSON.parse(storedData));
      }
    };
    fetchData();
  }, []);

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleBackToEnrollments = () => {
    window.location.href = "/admin/enrollments";
  };

  return (
    <PageContainer>
      <HeaderSection>
        <PageTitle>Manual Enrollment</PageTitle>
        <Breadcrumb>Enrollments / Manual Enrollment / Failed</Breadcrumb>
      </HeaderSection>

      <FailedCard>
        {/* Failed Icon */}
        <FailedIconContainer>
          <FailedIcon>
            <CloseIcon sx={{ fontSize: "40px", color: "#FFFFFF" }} />
          </FailedIcon>
        </FailedIconContainer>

        {/* Failed Title */}
        <FailedTitle>Payment Failed!</FailedTitle>

        {/* Failed Description */}
        <FailedDescription>
          Your enrollment has not been completed and no charges have been made
          to your card.
          <br />
          Your spot is still available for the next 24 hours.
        </FailedDescription>

        {/* Enrollment Summary */}
        <SummaryCard>
          <SummaryHeader>
            <SummaryTitle>Enrollment Summary</SummaryTitle>
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
          <PrimaryButton onClick={handlePrintReceipt}>
            Print Receipt
          </PrimaryButton>
          <SecondaryButton onClick={handleBackToEnrollments}>
            Back to Enrollments
          </SecondaryButton>
        </ButtonContainer>
      </FailedCard>
    </PageContainer>
  );
};

export default ManualEnrollmentFailed;
