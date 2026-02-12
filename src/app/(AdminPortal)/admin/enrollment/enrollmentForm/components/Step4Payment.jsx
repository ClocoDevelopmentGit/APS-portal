"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { ImPaypal } from "react-icons/im";

// ==================== STYLED COMPONENTS ====================

const PaymentMethodContainer = styled(Box)({
  display: "flex",
  gap: "16px",
  marginBottom: "30px",
  "@media (max-width: 768px)": {
    flexDirection: "column",
  },
});

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  display: "flex",
  width: "100%",
  gap: "16px",
  "& .MuiToggleButtonGroup-grouped": {
    border: "1px solid #D0D0D0",
    borderRadius: "7px !important",
    "&:not(:first-of-type)": {
      marginLeft: 0,
      borderLeft: "1px solid #D0D0D0",
    },
    "&.Mui-selected": {
      borderLeft: "1px solid #AE9964 !important",
      borderRight: "1px solid #AE9964 !important",
      borderTop: "1px solid #AE9964 !important",
      borderBottom: "1px solid #AE9964 !important",
    },
  },
});

const StyledToggleButton = styled(ToggleButton)({
  flex: 1,
  padding: "12px 20px",
  textTransform: "none",
  fontSize: "15px",
  fontWeight: 500,
  color: "#333333",
  backgroundColor: "#FAFAFA",
  border: "1px solid #D0D0D0 !important",
  borderRadius: "7px !important",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "15px",
  "&:hover": {
    backgroundColor: "#FEF7EA",
    borderColor: "#AE9964 !important",
  },
  "&.Mui-selected": {
    backgroundColor: "#FAFAFA",
    borderColor: "#AE9964 !important",
    border: "1px solid #AE9964 !important",
    "&:hover": {
      backgroundColor: "#FEF7EA",
    },
  },
});

const FormContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  marginBottom: "20px",
  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
    gap: "0px",
  },
});

const FieldLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: 500,
  color: "#191919",
  marginBottom: "8px",
  "& span": {
    color: "#EE5B54",
  },
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    backgroundColor: "#FFFFFF",
    height: "45px",
    "& fieldset": {
      borderColor: "#E5E5E5",
    },
    "&:hover fieldset": {
      borderColor: "#C9B382",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#C9B382",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "12px 14px",
    fontSize: "14px",
    color: "#333333",
    "&::placeholder": {
      color: "#999999",
      opacity: 1,
    },
  },
});

const StyledFormControl = styled(FormControl)({
  marginBottom: "20px",
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    backgroundColor: "#FFFFFF",
    height: "45px",
    "& fieldset": {
      borderColor: "#E5E5E5",
    },
    "&:hover fieldset": {
      borderColor: "#C9B382",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#C9B382",
    },
  },
  "& .MuiSelect-select": {
    padding: "12px 14px",
    fontSize: "14px",
    color: "#333333",
    lineHeight: "19.6px",
    letterSpacing: "-0.28px",
    fontWeight: 400,
  },
  "& .MuiSelect-icon": {
    color: "#C9B382",
  },
});

const StyledMenuItem = styled(MenuItem)({
  fontSize: "14px",
  color: "#333333",
  fontWeight: 400,
  padding: "10px 16px",
  "&:hover": {
    backgroundColor: "#FEF7EA",
  },
  "&.Mui-selected": {
    backgroundColor: "#FEF7EA",
    color: "#C9B382",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "#FEF7EA",
    },
  },
});

const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "16px",
  marginTop: "30px",
  "@media (max-width: 568px)": {
    justifyContent: "space-between",
  },
});

const BackButton = styled(Button)({
  backgroundColor: "#AE9964",
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "5px 24px",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#AE9964",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
});

const NextButton = styled(Button)({
  backgroundColor: "#AE9964",
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "5px 24px",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#AE9964",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
});

// ==================== COMPONENT ====================

const Step4Payment = ({ formData, onSubmit, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvc: "",
    paymentStatus: "",
    amountPaid: "",
    transactionReference: "",
  });

  const handlePaymentMethodChange = (event, newMethod) => {
    if (newMethod !== null) {
      setPaymentMethod(newMethod);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Payment Data:", paymentData);
    console.log("Payment Method:", paymentMethod);
    onSubmit();
    window.location.href = "/admin/enrollment/enrollmentForm/success";
  };

  return (
    <Box>
      {/* Payment Method Selection */}
      {/* <PaymentMethodContainer>
        <StyledToggleButtonGroup
          value={paymentMethod}
          exclusive
          onChange={handlePaymentMethodChange}
        >
          <StyledToggleButton value="card">
            <CreditCardIcon sx={{ fontSize: "20px", color: "#AE9964" }} />
            Card
          </StyledToggleButton>
          <StyledToggleButton value="paypal">
            <ImPaypal size={20} color="#AE9964" />
            PayPal
          </StyledToggleButton>
          <StyledToggleButton value="bank">
            <AccountBalanceIcon sx={{ fontSize: "20px", color: "#AE9964" }} />
            Bank Transfer
          </StyledToggleButton>
        </StyledToggleButtonGroup>
      </PaymentMethodContainer> */}

      {/* Card Payment Form */}
      {paymentMethod === "card" && (
        <>
          <FormContainer>
            <Box>
              <FieldLabel>
                Card Number: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="cardNumber"
                placeholder="1234 1234 1234 1234"
                value={paymentData.cardNumber}
                onChange={handleChange}
                fullWidth
                slotProps={{
                  htmlInput: { maxLength: 19 },
                }}
              />
            </Box>

            <Box>
              <FieldLabel>
                Card Holder Name: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="cardHolderName"
                placeholder="Name"
                value={paymentData.cardHolderName}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </FormContainer>

          <FormContainer>
            <Box>
              <FieldLabel>
                Expiry Date: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentData.expiryDate}
                onChange={handleChange}
                fullWidth
                slotProps={{
                  htmlInput: { maxLength: 5 },
                }}
              />
            </Box>

            <Box>
              <FieldLabel>
                CVC: <span>*</span>
              </FieldLabel>
              <StyledTextField
                name="cvc"
                placeholder="123"
                value={paymentData.cvc}
                onChange={handleChange}
                fullWidth
                slotProps={{
                  htmlInput: { maxLength: 4 },
                }}
              />
            </Box>
          </FormContainer>
        </>
      )}

      {/* PayPal Payment */}
      {/* {paymentMethod === "paypal" && (
        <Box sx={{ textAlign: "center", padding: "40px 0" }}>
          <Typography sx={{ fontSize: "14px", color: "#666666", mb: 2 }}>
            You will be redirected to PayPal to complete your payment.
          </Typography>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#C9B382",
              color: "#C9B382",
              textTransform: "none",
              padding: "10px 30px",
              "&:hover": {
                borderColor: "#B8A375",
                backgroundColor: "#FEF7EA",
              },
            }}
          >
            Continue to PayPal
          </Button>
        </Box>
      )} */}

      {/* Bank Transfer */}
      {/* {paymentMethod === "bank" && (
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "#F9F9F9",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", fontWeight: 600, color: "#191919", mb: 2 }}
          >
            Bank Transfer Details:
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#666666", mb: 1 }}>
            <strong>Account Name:</strong> Acting Performance Studio
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#666666", mb: 1 }}>
            <strong>BSB:</strong> 063-000
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#666666", mb: 1 }}>
            <strong>Account Number:</strong> 1234 5678
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#666666", mt: 2 }}>
            Please include your name and enrollment reference in the payment
            description.
          </Typography>
        </Box>
      )} */}

      {/* Payment Status, Amount Paid, and Transaction Reference */}
      {/* <FormContainer>
        <Box>
          <FieldLabel>
            Payment Status: <span>*</span>
          </FieldLabel>
          <StyledFormControl fullWidth>
            <Select
              name="paymentStatus"
              value={paymentData.paymentStatus || ""}
              onChange={handleChange}
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return <span style={{ color: "#999999" }}>Select</span>;
                }
                return selected;
              }}
            >
              <StyledMenuItem value="Paid">Paid</StyledMenuItem>
              <StyledMenuItem value="Pending">Pending</StyledMenuItem>
              <StyledMenuItem value="Failed">Failed</StyledMenuItem>
              <StyledMenuItem value="Refunded">Refunded</StyledMenuItem>
            </Select>
          </StyledFormControl>
        </Box>

        <Box>
          <FieldLabel>
            Amount Paid: <span>*</span>
          </FieldLabel>
          <StyledTextField
            name="amountPaid"
            placeholder="$495.00"
            value={paymentData.amountPaid}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </FormContainer>

      <Box width={{ xs: "100%", sm: "49%" }}>
        <FieldLabel>Transaction Reference:</FieldLabel>
        <StyledTextField
          name="transactionReference"
          placeholder="Enter Transaction ID for reference"
          value={paymentData.transactionReference}
          onChange={handleChange}
          fullWidth
        />
      </Box> */}

      <ButtonContainer>
        <BackButton onClick={onBack} startIcon={<ArrowBackIcon />}>
          Back
        </BackButton>
        <NextButton onClick={handleSubmit} endIcon={<ArrowForwardIcon />}>
          Next
        </NextButton>
      </ButtonContainer>
    </Box>
  );
};

export default Step4Payment;
