"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

// ==================== STYLED COMPONENTS ====================

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    padding: "0px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
  },
});

const StyledDialogTitle = styled(DialogTitle)({
  padding: "24px 24px 16px",
  fontSize: "18px",
  fontWeight: 700,
  color: "#191919",
  lineHeight: "24px",
  position: "relative",
});

const StyledCloseButton = styled(IconButton)({
  position: "absolute",
  right: "16px",
  top: "16px",
  color: "#666666",
  padding: "4px",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
});

const StyledDialogContent = styled(DialogContent)({
  padding: "0px 24px 24px",
});

const DescriptionText = styled(Typography)({
  fontSize: "13px",
  fontWeight: 400,
  color: "#666666",
  lineHeight: "20px",
  marginBottom: "16px",
});

const AttendanceStats = styled(Box)({
  display: "flex",
  gap: "16px",
  marginBottom: "16px",
});

const StatItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

const StatNumber = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "type",
})(({ type }) => ({
  fontSize: "14px",
  fontWeight: 700,
  color: type === "absent" ? "#E85A4F" : "#4CAF50",
}));

const StyledTextField = styled(TextField)({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#FAFAFA",
    fontSize: "13px",
    fontWeight: 400,
    "& fieldset": {
      borderColor: "#E0E0E0",
    },
    "&:hover fieldset": {
      borderColor: "#B8936D",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#B8936D",
      borderWidth: "1px",
    },
  },
  "& .MuiInputBase-input": {
    padding: "12px 14px",
    fontSize: "13px",
    color: "#191919",
    "&::placeholder": {
      color: "#999999",
      opacity: 1,
    },
  },
});

const StyledDialogActions = styled(DialogActions)({
  padding: "16px 24px 24px",
  gap: "12px",
  justifyContent: "flex-end",
});

const CancelButton = styled(Button)({
  backgroundColor: "transparent",
  color: "#191919",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "8px 24px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#F5F5F5",
    borderColor: "#B0B0B0",
  },
});

const SaveButton = styled(Button)({
  backgroundColor: "#FFFFFF",
  color: "#433205",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "8px 24px",
  borderRadius: "8px",
  border: "none",
  boxShadow: "0 2px 8px rgba(82, 81, 79, 0.3)",
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

const AttendanceConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  absentCount = 2,
  presentCount = 10,
}) => {
  const [comments, setComments] = React.useState("");

  const handleConfirm = () => {
    onConfirm(comments);
    setComments("");
  };

  const handleClose = () => {
    setComments("");
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>
        Attendance Marked
        <StyledCloseButton onClick={handleClose}>
          <CloseIcon sx={{ fontSize: "20px" }} />
        </StyledCloseButton>
      </StyledDialogTitle>

      <StyledDialogContent>
        <DescriptionText>
          {`Attendance Will be marked for today. Data can't be undone once
          confirmed Please revise the below data and confirm.`}
        </DescriptionText>

        <AttendanceStats>
          <StatItem>
            <StatNumber type="absent">{absentCount} Absent</StatNumber>
          </StatItem>
          <StatItem>
            <StatNumber type="present">{presentCount} Present</StatNumber>
          </StatItem>
        </AttendanceStats>

        <StyledTextField
          multiline
          rows={4}
          placeholder="Add Comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </StyledDialogContent>

      <StyledDialogActions>
        <CancelButton onClick={handleClose}>Cancel</CancelButton>
        <SaveButton onClick={handleConfirm}>Save</SaveButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default AttendanceConfirmationModal;
