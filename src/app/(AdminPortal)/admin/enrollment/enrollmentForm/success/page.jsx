"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { sendEnrollmentEmail } from "@/redux/slices/userSlice";

// ==================== STYLED COMPONENTS ====================

const PageWrapper = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#B38349",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 20px",
});

const SuccessCard = styled(Box)({
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  padding: "50px 100px",
  maxWidth: "1000px",
  width: "100%",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
  "@media (max-width: 768px)": {
    padding: "40px 25px",
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
  marginBottom: "20px",
  lineHeight: "33px",
});

const SuccessDescription = styled(Typography)({
  fontSize: "15px",
  fontWeight: 600,
  color: "#5E5E5E",
  textAlign: "center",
  marginBottom: "30px",
  lineHeight: "28px",
  "@media (max-width: 468px)": {
    fontSize: "13px",
  },
});

const InfoBox = styled(Box)({
  backgroundColor: "#E8F5E9",
  borderLeft: "4px solid #4CAF50",
  borderRadius: "12px",
  padding: "15px 25px",
  marginBottom: "25px",
  boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.10)",
});

const InfoTitle = styled(Typography)({
  fontSize: "15px",
  fontWeight: 700,
  color: "#4CAF50",
  marginBottom: "8px",
  lineHeight: "24px",
});

const InfoText = styled(Typography)({
  fontSize: "13px",
  fontWeight: 400,
  color: "#666666",
  lineHeight: "23px",
  letterSpacing: "0.28px",
  "& strong": {
    fontWeight: 600,
  },
});

const DetailsCard = styled(Box)({
  backgroundColor: "#F9F9F9",
  border: "1px solid #D0D0D0",
  borderRadius: "10px",
  padding: "30px 50px",
  marginBottom: "30px",
  boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.10)",
  "@media (max-width: 568px)": {
    padding: "30px 20px",
  },
});

const DetailsHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  paddingBottom: "15px",
  borderBottom: "1px solid #E5E5E5",
  "@media (max-width: 468px)": {
    flexDirection: "column",
    gap: "10px",
    alignItems: "flex-start",
  },
});

const DetailsTitle = styled(Typography)({
  fontSize: "17px",
  fontWeight: 600,
  color: "#181818",
  lineHeight: "27px",
});

const BookingID = styled(Box)({
  backgroundColor: "#FFFBF5",
  border: "1px solid #B38349",
  borderRadius: "5px",
  padding: "4px 10px",
  fontSize: "10px",
  fontWeight: 600,
  color: "#B38349",
});

const DetailsRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "5px",
  padding: "10px 0",
  "&:last-child": {
    borderBottom: "none",
  },
});

const DetailsLabel = styled(Typography)({
  fontSize: "13px",
  fontWeight: 400,
  color: "#666666",
  "@media (max-width: 468px)": {
    fontSize: "11px",
  },
});

const DetailsValue = styled(Typography)({
  fontSize: "13px",
  fontWeight: 500,
  color: "#333333",
  textAlign: "right",
  "@media (max-width: 468px)": {
    fontSize: "11px",
  },
});

const TotalRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 0 0",
  marginTop: "10px",
  borderTop: "2px solid #E5E5E5",
});

const TotalLabel = styled(Typography)({
  fontSize: "16px",
  fontWeight: 600,
  color: "#191919",
  lineHeight: "27px",
  "@media (max-width: 468px)": {
    fontSize: "14px",
  },
});

const TotalValue = styled(Typography)({
  fontSize: "18px",
  fontWeight: 600,
  color: "#B38349",
  lineHeight: "30px",
  "@media (max-width: 468px)": {
    fontSize: "15px",
  },
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
  padding: "4px 30px",
  borderRadius: "7px",
  boxShadow: "0 2px 4px rgba(179, 131, 73, 0.3)",
  "&:hover": {
    backgroundColor: "#A17F4F",
    boxShadow: "0 4px 8px rgba(179, 131, 73, 0.4)",
  },
  "@media (max-width: 568px)": {
    width: "100%",
  },
});

const SecondaryButton = styled(Button)({
  color: "#191919",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "4px 30px",
  border: "1px solid #E5E5E5",
  borderRadius: "7px",
  backgroundColor: "#FFFFFF",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
  "&:hover": {
    backgroundColor: "#F5F5F5",
    borderColor: "#B38349",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.12)",
  },
  "@media (max-width: 568px)": {
    width: "100%",
  },
});

// ==================== COMPONENT ====================

const ManualEnrollmentSuccess = () => {
  const [enrollmentData, setEnrollmentData] = useState(null);
  const dispatch = useDispatch();

  const handleViewDashboard = () => {
    // Navigate to dashboard
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
    <PageWrapper>
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

        {/* Confirmation Email Info */}
        <InfoBox>
          <InfoTitle>Confirmation Email sent</InfoTitle>
          <InfoText>
            We have sent a Confirmation Email to{" "}
            <strong>{enrollmentData?.email}</strong>{" "}
            {enrollmentData?.newUser
              ? "with your credentials and a temporary password, "
              : ""}
            enrollment details, receipt, and class information.
          </InfoText>
        </InfoBox>

        {/* Enrollment Details */}
        <DetailsCard>
          <DetailsHeader>
            <DetailsTitle>Enrollment Details</DetailsTitle>
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
        </DetailsCard>

        {/* Action Buttons */}
        <ButtonContainer>
          <PrimaryButton onClick={handleViewDashboard}>
            View Dashboard
          </PrimaryButton>
          <SecondaryButton onClick={handleDownloadReceipt}>
            Download Receipt
          </SecondaryButton>
        </ButtonContainer>
      </SuccessCard>
    </PageWrapper>
  );
};

export default ManualEnrollmentSuccess;
