"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import jsPDF from "jspdf";
import "jspdf-autotable";

// ==================== STYLED COMPONENTS ====================

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    padding: "0px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
    backgroundColor: "#FFFFFF",
  },
});

const StyledDialogTitle = styled(DialogTitle)({
  padding: "32px 32px 24px",
  fontSize: "20px",
  fontWeight: 700,
  color: "#191919",
  lineHeight: "28px",
  position: "relative",
  borderBottom: "none",
});

const StyledCloseButton = styled(IconButton)({
  position: "absolute",
  right: "24px",
  top: "24px",
  color: "#666666",
  padding: "8px",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    color: "#333333",
  },
});

const StyledDialogContent = styled(DialogContent)({
  padding: "20px",
  paddingTop: "20px !important",
  margin: "0 15px 30px",
  backgroundColor: "rgba(236, 236, 236, 0.28)",
  borderRadius: "12px",
});

const ContentBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  textAlign: "left",
  paddingBottom: "20px",
});

const Description = styled(Typography)({
  fontSize: "14px",
  fontWeight: 400,
  color: "#666666",
  lineHeight: "20px",
});

const StyledDialogActions = styled(DialogActions)({
  padding: "25px 0 0",
  gap: "12px",
  justifyContent: "flex-end",
});

const CancelButton = styled(Button)({
  backgroundColor: "transparent",
  color: "#191919",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "10px 24px",
  height: "40px",
  border: "none",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#333333",
  },
});

const ConfirmButton = styled(Button)({
  backgroundColor: "#FFFFFF",
  color: "#191919",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "10px 24px",
  height: "40px",
  borderRadius: "9px",
  boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  "&:hover": {
    backgroundColor: "#9A7340",
    boxShadow: "0 2px 8px rgba(179, 131, 73, 0.3)",
  },
  "&:disabled": {
    backgroundColor: "#D4C4B0",
    color: "#FFFFFF",
  },
});

// ==================== COMPONENT ====================

const DownloadReceiptPopup = ({ open, onClose, invoiceData }) => {
  const handleDownload = () => {
    if (!invoiceData) return;

    // Create PDF
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Receipt", 105, 20, { align: "center" });

    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // Receipt details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    let yPosition = 40;

    // Transaction ID
    doc.setFont("helvetica", "bold");
    doc.text("Transaction ID:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(invoiceData.transactionId, 70, yPosition);

    yPosition += 10;

    // Date
    doc.setFont("helvetica", "bold");
    doc.text("Date:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(new Date().toLocaleDateString(), 70, yPosition);

    yPosition += 15;

    // Participant Information
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Participant Information", 20, yPosition);

    yPosition += 10;
    doc.setFontSize(12);

    doc.setFont("helvetica", "bold");
    doc.text("Name:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(invoiceData.name, 70, yPosition);

    yPosition += 8;

    doc.setFont("helvetica", "bold");
    doc.text("Mobile:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(invoiceData.mobile, 70, yPosition);

    yPosition += 8;

    doc.setFont("helvetica", "bold");
    doc.text("Email:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(invoiceData.email, 70, yPosition);

    yPosition += 15;

    // Course Information
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Course Information", 20, yPosition);

    yPosition += 10;
    doc.setFontSize(12);

    doc.setFont("helvetica", "bold");
    doc.text("Course:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    const courseText = doc.splitTextToSize(invoiceData.course, 110);
    doc.text(courseText, 70, yPosition);

    yPosition += courseText.length * 6 + 10;

    // Payment Information
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Information", 20, yPosition);

    yPosition += 10;
    doc.setFontSize(12);

    doc.setFont("helvetica", "bold");
    doc.text("Payment Method:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(invoiceData.paymentMethod, 70, yPosition);

    yPosition += 8;

    doc.setFont("helvetica", "bold");
    doc.text("Status:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(46, 125, 50); // Green color
    doc.text("Paid", 70, yPosition);
    doc.setTextColor(0, 0, 0); // Reset to black

    // Add footer
    yPosition = 270;
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 190, yPosition);

    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text(
      "This is a computer-generated receipt and does not require a signature.",
      105,
      yPosition,
      { align: "center" },
    );

    yPosition += 5;
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, yPosition, {
      align: "center",
    });

    // Save the PDF
    doc.save(
      `Receipt_${invoiceData.transactionId}_${invoiceData.name.replace(
        /\s+/g,
        "_",
      )}.pdf`,
    );

    // Close the popup
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <StyledDialogTitle>
        Download Receipt
        <StyledCloseButton onClick={handleCancel}>
          <CloseIcon sx={{ fontSize: "20px" }} />
        </StyledCloseButton>
      </StyledDialogTitle>

      <StyledDialogContent>
        <ContentBox>
          <Description>
            Download payment receipt of {invoiceData?.name || "participant"}.
          </Description>
        </ContentBox>

        <StyledDialogActions>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          <ConfirmButton onClick={handleDownload}>Confirm</ConfirmButton>
        </StyledDialogActions>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default DownloadReceiptPopup;
