"use client";
import React from "react";
import { Box, Typography, Modal, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// ==================== STYLED COMPONENTS ====================

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
});

const ModalContent = styled(Box)({
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "700px",
  maxHeight: "95vh",
  overflowY: "auto",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  //   overflow: "hidden",
  outline: "none",
  "@media (max-width: 768px)": {
    width: "95%",
  },
});

const Header = styled(Box)({
  background: "linear-gradient(91deg, #98711B -10.58%, #404040 111.31%)",
  padding: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  borderRadius: "12px 12px 0 0",
  "@media (max-width: 768px)": {
    padding: "20px 16px",
  },
  "@media (max-width: 480px)": {
    padding: "16px 12px",
  },
});

const LogoImage = styled("img")({
  width: "auto",
  height: "45px",
  objectFit: "contain",
  position: "absolute",
  left: "30px",
  "@media (max-width: 768px)": {
    height: "35px",
    left: "16px",
  },
  "@media (max-width: 480px)": {
    height: "28px",
    left: "12px",
  },
});

const InvoiceTitle = styled(Typography)({
  fontSize: "18px",
  fontWeight: 600,
  color: "#FFFFFF",
  "@media (max-width: 768px)": {
    fontSize: "16px",
  },
  "@media (max-width: 480px)": {
    fontSize: "15px",
  },
});

const ContentSection = styled(Box)({
  position: "relative",
});

const SectionTitleBox = styled(Box)({
  padding: "30px 30px 20px",
  borderBottom: "2px solid #E7E7E7",
  borderRadius: "0",
  "@media (max-width: 768px)": {
    padding: "20px 20px 16px",
  },
  "@media (max-width: 480px)": {
    padding: "16px 16px 12px",
  },
});

const SectionTitle = styled(Typography)({
  fontSize: "14px",
  fontWeight: 600,
  color: "#909090",
  letterSpacing: "0.5px",
  "@media (max-width: 480px)": {
    fontSize: "13px",
  },
});

const PaymentDetailsSection = styled(Box)({
  margin: "15px",
  padding: "30px 30px 15px",
  backgroundColor: "#F6F6F6",
  borderRadius: "13px",
  "@media (max-width: 768px)": {
    margin: "12px",
    padding: "20px 20px 12px",
  },
  "@media (max-width: 480px)": {
    margin: "10px",
    padding: "16px 16px 10px",
  },
});

const AmountDisplay = styled(Typography)({
  fontSize: "22px",
  fontWeight: 700,
  color: "#644C10",
  marginBottom: "12px",
  "@media (max-width: 768px)": {
    fontSize: "20px",
  },
  "@media (max-width: 480px)": {
    fontSize: "18px",
  },
});

const StatusContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "12px",
});

const StatusText = styled(Typography)({
  fontSize: "14px",
  fontWeight: 600,
  color: "#45A206",
  "@media (max-width: 480px)": {
    fontSize: "13px",
  },
});

const InfoRow = styled(Box)({
  display: "flex",
  gap: "8px",
  marginBottom: "8px",
  "@media (max-width: 480px)": {
    flexDirection: "column",
    gap: "4px",
  },
});

const InfoLabel = styled(Typography)({
  fontSize: "13px",
  fontWeight: 600,
  color: "#909090",
  minWidth: "110px",
  "@media (max-width: 480px)": {
    fontSize: "12px",
    minWidth: "auto",
  },
});

const InfoValue = styled(Typography)({
  fontSize: "13px",
  fontWeight: 700,
  color: "#5A5A5A",
  wordBreak: "break-word",
  "@media (max-width: 480px)": {
    fontSize: "12px",
  },
});

const DetailsList = styled(Box)({
  padding: "10px 30px 0px",
  margin: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginBottom: "0px",
  "@media (max-width: 768px)": {
    padding: "10px 20px 0px",
    margin: "12px",
    gap: "16px",
  },
  "@media (max-width: 480px)": {
    padding: "10px 16px 0px",
    margin: "10px",
    gap: "14px",
  },
});

const DetailRow = styled(Box)({
  display: "flex",
  gap: "20px",
  alignItems: "flex-start",
  "@media (max-width: 480px)": {
    flexDirection: "column",
    gap: "4px",
  },
});

const DetailLabel = styled(Typography)({
  fontSize: "13px",
  fontWeight: 500,
  color: "#3F3F3F",
  minWidth: "140px",
  flexShrink: 0,
  "@media (max-width: 768px)": {
    minWidth: "120px",
    fontSize: "12px",
  },
  "@media (max-width: 480px)": {
    minWidth: "auto",
    fontSize: "12px",
  },
});

const DetailValue = styled(Typography)({
  fontSize: "13px",
  fontWeight: 700,
  color: "#3F3F3F",
  wordBreak: "break-word",
  flex: 1,
  "@media (max-width: 768px)": {
    fontSize: "12px",
  },
  "@media (max-width: 480px)": {
    fontSize: "12px",
  },
});

const ButtonRow = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "0 15px 15px",
  "@media (max-width: 768px)": {
    padding: "0 12px 12px",
  },
  "@media (max-width: 480px)": {
    // justifyContent: "center",
    padding: "0 10px 12px",
  },
});

const CloseButton = styled(IconButton)({
  backgroundColor: "#FFFFFF",
  color: "#666666",
  fontSize: "13px",
  fontWeight: 600,
  textTransform: "none",
  padding: "10px 24px",
  borderRadius: "8px",
  border: "1px solid #E0E0E0",
  "&:hover": {
    backgroundColor: "#F5F5F5",
    borderColor: "#D0D0D0",
    color: "#333333",
  },
  "@media (max-width: 480px)": {
    padding: "8px 20px",
    fontSize: "12px",
  },
});

// ==================== COMPONENT ====================

const InvoiceModal = ({ open, onClose, invoiceData }) => {
  return (
    <StyledModal open={open} onClose={onClose}>
      <ModalContent>
        {/* Header */}
        <Header>
          <LogoImage src="/Images/APSlogo.png" alt="APS Logo" />
          <InvoiceTitle>Invoice</InvoiceTitle>
        </Header>

        {/* Content */}
        <ContentSection>
          {/* Section Title */}
          <SectionTitleBox>
            <SectionTitle>Payment Details</SectionTitle>
          </SectionTitleBox>

          {/* Payment Details Section */}
          <PaymentDetailsSection>
            <AmountDisplay>${invoiceData?.amount || "125.00"}</AmountDisplay>

            <StatusContainer>
              <CheckCircleIcon sx={{ fontSize: "20px", color: "#4CAF50" }} />
              <StatusText>Payment Completed</StatusText>
            </StatusContainer>

            <InfoRow>
              <InfoLabel>Paid on</InfoLabel>
              <InfoValue>
                {invoiceData?.paidDate || "2:15 PM, 18 Oct 2026"}
              </InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>Transaction ID</InfoLabel>
              <InfoValue>
                {invoiceData?.transactionId ||
                  "2Ti_jbjbjbNJBKBB1234Oo8B0756B57II"}
              </InfoValue>
            </InfoRow>
          </PaymentDetailsSection>

          {/* Details List */}
          <DetailsList>
            <DetailRow>
              <DetailLabel>Student Name</DetailLabel>
              <DetailValue>
                {invoiceData?.studentName || "Pravin CV"}
              </DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>Student ID</DetailLabel>
              <DetailValue>{invoiceData?.studentId || "APS007677"}</DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>Course</DetailLabel>
              <DetailValue>
                {invoiceData?.course ||
                  "Industry Driven Adults, Oct 18 - 6 2025"}
              </DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>Location</DetailLabel>
              <DetailValue>{invoiceData?.location || "Yarraville"}</DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>Payment Method</DetailLabel>
              <DetailValue>{invoiceData?.paymentMethod || "Card"}</DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>Transaction ID</DetailLabel>
              <DetailValue>
                {invoiceData?.transactionId ||
                  "Ti_jbjbjbNJBKBB1234Oo8B0756B57II"}
              </DetailValue>
            </DetailRow>
          </DetailsList>

          <ButtonRow>
            <CloseButton onClick={onClose}>
              <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
                Close
              </Typography>
            </CloseButton>
          </ButtonRow>
        </ContentSection>
      </ModalContent>
    </StyledModal>
  );
};

export default InvoiceModal;
