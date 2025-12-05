"use client";
import React from "react";
import { Dialog, DialogContent, Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaExclamation } from "react-icons/fa";

// ==================== STYLED COMPONENTS ====================

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    padding: "40px 20px 25px",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
});

const IconWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginBottom: "16px",
});

const IconCircle = styled(Box)({
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  border: "3px solid #B38349",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#B38349",
});

const StyledDialogContent = styled(DialogContent)({
  padding: "0",
});

const Title = styled(Typography)({
  fontSize: "20px",
  fontWeight: 600,
  color: "#000000",
  marginBottom: "25px",
});

const Message = styled(Typography)({
  fontSize: "16px",
  fontWeight: 500,
  color: "#000000",
  marginBottom: "24px",
});

const ButtonGroup = styled(Box)({
  display: "flex",
  gap: "12px",
  justifyContent: "center",
  marginBottom: "15px",
});

const DeleteButton = styled(Button)({
  backgroundColor: "#B38349",
  color: "#FFFFFF",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 600,
  padding: "5px 24px",
  borderRadius: "8px",
  "&:hover": {
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    backgroundColor: "#B38349",
  },
});

const CancelButton = styled(Button)({
  backgroundColor: "#FFFFFF",
  color: "#191919",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  padding: "5px 24px",
  borderRadius: "8px",
  border: "1px solid #D3D3D3",
  "&:hover": {
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    backgroundColor: "#FFF",
    color: "#191919",
  },
});

// ==================== COMPONENT ====================

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  showDelete,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <StyledDialogContent>
        {/* Icon */}
        <IconWrapper>
          <IconCircle>
            <FaExclamation size={32} strokeWidth={2.5} />
          </IconCircle>
        </IconWrapper>

        {/* Title */}
        <Title>{title}</Title>

        {/* Message */}
        <Message>{message}</Message>

        {/* Action Buttons */}
        <ButtonGroup>
          {showDelete && (
            <DeleteButton onClick={handleConfirm}>Yes, delete it!</DeleteButton>
          )}
          <CancelButton onClick={onClose}>
            {showDelete ? "Cancel" : "Okay"}
          </CancelButton>
        </ButtonGroup>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default ConfirmationDialog;
