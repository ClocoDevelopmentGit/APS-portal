"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";

// ==================== STYLES ====================

const FormContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  marginBottom: "20px",
  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
  },
});

const FieldLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: 500,
  marginBottom: "8px",
  "& span": { color: "#EE5B54" },
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    height: "45px",
  },
});

const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "16px",
  marginTop: "30px",
});

const StyledButton = styled(Button)({
  backgroundColor: "#AE9964",
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "5px 24px",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#AE9964",
  },
});

// ==================== COMPONENT ====================

const Step4Payment = ({ formData, onSubmit, onBack, enrollmentType }) => {
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("term");
  const [creditAmount, setCreditAmount] = useState(0);
  const router = useRouter();
  const [classDetails, setClassDetails] = useState(null);
  const [totalWeeksForTerm, setTotalWeeksForTerm] = useState(1);
  const [price, setPrice] = useState(0);
  const [yearlyPrice, setYearlyPrice] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(0);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvc: "",
  });

    useEffect(() => {
    // Fetch class details based on formData.classId
    const fetchClassDetails = async () => {
      let classDetail;
      if (typeof window !== "undefined") {
        classDetail = localStorage.getItem("selectedClass");
      }
      if (classDetail && classDetail !== "undefined") {
        const data = JSON.parse(classDetail);
        console.log("Fetched class details:", data);
        setClassDetails(data);
        setPaymentMethod(enrollmentType);
        const today = new Date();
        const startDate = new Date(data?.startDate);
        const endDate = new Date(data?.endDate);
        const totalWeeks = calculateWeeks(startDate, endDate);
        setTotalWeeksForTerm(data?.term?.totalWeeks || 1);
        const remainingWeeks = calculateWeeks(today, endDate);
        const pricePerClass = data?.fees / totalWeeks;
        const totalPrice = pricePerClass * remainingWeeks;
        const annualPrice = totalPrice + 3 * data?.fees;
        const discount = 10;
        setDiscountApplied(discount);
        setPrice(totalPrice);
        setYearlyPrice(annualPrice);
        const creditAmountPrice =
          paymentMethod === "term"
            ? totalPrice
            : (annualPrice * (100 - discount)) / 100;
        const creditAmount =
          !formData.classId && !formData.eventId
            ? 0
            : enrollmentType === "Course"
              ? creditAmountPrice
              : enrollmentType === "Workshop"
                ? data?.fees
                : enrollmentType === "Trial"
                  ? data?.fees / 10
                  : 0;
        setCreditAmount(creditAmount);
      }
    };
    fetchClassDetails();
  }, [enrollmentType, formData.classId, paymentMethod, formData.eventId]);


  // ==================== HANDLERS ====================

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatExpiryDate = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 2) {
      return digits.slice(0, 2) + "/" + digits.slice(2);
    }
    return digits;
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setPaymentData((prev) => ({
      ...prev,
      expiryDate: formatted,
    }));
  };

  // ==================== VALIDATION ====================

  const validate = () => {
    const newErrors = {};

    const cardDigits = paymentData.cardNumber.replace(/\D/g, "");
    if (!cardDigits) newErrors.cardNumber = "Card Number is required";
    else if (cardDigits.length !== 16)
      newErrors.cardNumber = "Card Number must be 16 digits";

    if (!paymentData.cardHolderName)
      newErrors.cardHolderName = "Card Holder Name is required";

    if (!paymentData.expiryDate)
      newErrors.expiryDate = "Expiry Date is required";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.expiryDate))
      newErrors.expiryDate = "Expiry must be MM/YY";

    const cvcDigits = paymentData.cvc.replace(/\D/g, "");
    if (!cvcDigits) newErrors.cvc = "CVC is required";
    else if (cvcDigits.length < 3 || cvcDigits.length > 4)
      newErrors.cvc = "CVC must be 3 or 4 digits";

    return newErrors;
  };

  // ==================== SUBMIT ====================

  const handleSubmit = async () => {
    setErrors({});
    // const formError = validateEnrollmentForm(formData);
    // if (Object.keys(formError).length > 0) {
    //   setErrors(formError);
    //   return;
    // }
    validate();
    // Validate and process payment
    if (onSubmit) {
      const saved = await onSubmit(true);
      const enrollmentData = JSON.parse(localStorage.getItem("enrollmentData"));
      console.log("Enrollment data before update:", enrollmentData);
      console.log("Payment result:", saved);
      if (saved) {
        const updatedEnrollmentData = {
          ...enrollmentData,
          paymentMethod: "Visa •••• 4321",
          transactionId: "TXN1234567890",
          totalAmount: `$${creditAmount.toFixed(2)}`,
          bookingId: "BKNG-EC-APS-2023-1234",
          email: formData.email || formData.guardianEmail,
          enrollmentType: enrollmentType,
          newUser: formData.newUser,
        };
        localStorage.setItem(
          "enrollmentData",
          JSON.stringify(updatedEnrollmentData),
        );
        router.replace("/admin/enrollment/enrollmentForm/success");
      } else {
        const updatedEnrollmentData = {
          ...enrollmentData,
          paymentStatus: "Failed",
          amountToPay: `$${creditAmount.toFixed(2)}`,
        };
        localStorage.setItem(
          "enrollmentData",
          JSON.stringify(updatedEnrollmentData),
        );
        router.replace("/admin/enrollment/enrollmentForm/failed");
      }
    }
  };

  // ==================== UI ====================

  return (
    <Box>
      <FormContainer>
        <Box>
          <FieldLabel>
            Card Number: <span>*</span>
          </FieldLabel>
          <StyledTextField
            name="cardNumber"
            placeholder="1234 1234 1234 1234"
            value={paymentData.cardNumber}
            onChange={handleInputChange}
            error={!!errors.cardNumber}
            helperText={errors.cardNumber}
            fullWidth
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
            onChange={handleInputChange}
            error={!!errors.cardHolderName}
            helperText={errors.cardHolderName}
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
            onChange={handleExpiryChange}
            inputProps={{ maxLength: 5 }}
            error={!!errors.expiryDate}
            helperText={errors.expiryDate}
            fullWidth
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
            onChange={handleInputChange}
            inputProps={{ maxLength: 4 }}
            error={!!errors.cvc}
            helperText={errors.cvc}
            fullWidth
          />
        </Box>
      </FormContainer>

      <ButtonContainer>
        <StyledButton
          onClick={onBack}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </StyledButton>
        <StyledButton
          onClick={handleSubmit}
          endIcon={<ArrowForwardIcon />}
        >
          Next
        </StyledButton>
      </ButtonContainer>
    </Box>
  );
};

export default Step4Payment;
