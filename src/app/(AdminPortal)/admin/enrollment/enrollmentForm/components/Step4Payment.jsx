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
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { generateBookingId } from "@/app/utils/Providers/bookingIdGenerator";

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

const CardDetailsBox = styled(Box)({
  border: "1px solid #D0D0D0",
  borderRadius: "10px",
  padding: "20px",
  marginBottom: "20px",
  backgroundColor: "#FAFAFA",
  boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.10)",
});

// ==================== COMPONENT ====================

const Step4Payment = ({ formData, onSubmit, onBack, enrollmentType }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("term");
  // const [enrollmentType, setEnrollmentType] = useState("");
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

      const calculateWeeks = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (end < start) return 0;

    return Math.floor((end - start) / (1000 * 60 * 60 * 24 * 7)) + 1;
  };

    const fetchClassDetails = async () => {
      let classDetail;
      if (typeof window !== "undefined") {
        classDetail = localStorage.getItem("selectedClass");
      }
      console.log("Class ID from localStorage:", classDetail);
      if (classDetail && classDetail !== "undefined") {
        const data = JSON.parse(classDetail);
        console.log("Fetched class details:", data);
        setClassDetails(data);
        setPaymentMethod(enrollmentType);
        const today = new Date();
        const startDate = new Date(data?.startDate);
        const endDate = new Date(data?.endDate);
        const totalWeeks = calculateWeeks(startDate, endDate);
        console.log("Total weeks in term:", totalWeeks);
        setTotalWeeksForTerm(data?.term?.totalWeeks || 1);
        const remainingWeeks = calculateWeeks(today, endDate);
        console.log("Remaining weeks in term:", remainingWeeks);
        const pricePerClass = data?.fees / totalWeeks;
        console.log("Price per class:", pricePerClass);
        const totalPrice = pricePerClass * remainingWeeks;
        console.log("Calculated total price:", totalPrice);
        const annualPrice = totalPrice + 3 * data?.fees;
        console.log("Calculated annual price:", annualPrice);
        const discount = 10;
        setDiscountApplied(discount);
        setPrice(totalPrice);
        setYearlyPrice(annualPrice);
        enrollmentType = formData.enrollmentType;
        console.log("Enrollment type:", enrollmentType);
        const creditAmount =
          enrollmentType === "Course" || enrollmentType === "Term"
              ? totalPrice
              : enrollmentType === "Workshop"
                ? data?.fees
                : enrollmentType === "Trial"
                  ? data?.fees / 10
                  : 0;
        setCreditAmount(creditAmount);
        console.log("Calculated credit amount:", creditAmount);
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

    const processEnrollment = async (paymentIntent) => {
      
      const enrollmentData = JSON.parse(localStorage.getItem("enrollmentData"));
      console.log("Enrollment data before update:", enrollmentData);
      const paymentData = {
          paymentMethod: "card",
          transactionId: paymentIntent?.id || "",
          totalAmount: `$${creditAmount.toFixed(2)}`,
          bookingId: generateBookingId(),
          email: formData.email || formData.guardianEmail,
          enrollmentType: formData.enrollmentType,
          newUser: formData.newUser,
          paymentStatus: String(paymentIntent?.status),
          requestAt: paymentIntent?.requestAt,
          responseAt: paymentIntent?.responseAt,
      };
        const updatedEnrollmentData = {
          ...enrollmentData,
          ...paymentData
        };
        localStorage.setItem(
          "enrollmentData",
          JSON.stringify(updatedEnrollmentData),
        );
        console.log("Updated enrollment data with payment info:", updatedEnrollmentData);
        const user = localStorage.getItem("user");
        const parsedUser = user ? JSON.parse(user) : null;
        const selectedClass = localStorage.getItem("selectedClass");
        const parsedSelectedClass = selectedClass ? JSON.parse(selectedClass) : null;
        const selectedEvent = localStorage.getItem("eventId");
        const parsedSelectedEvent = selectedEvent ? JSON.parse(selectedEvent) : null;
        console.log("User ID:", parsedUser?.id);
        // if (user && parsedUser.id && parsedUser.id != null) {
        //   updatedEnrollmentData.userId = parsedUser.id;
        //   updatedEnrollmentData.courseId = parsedSelectedClass.courseId;
        //   updatedEnrollmentData.classId = parsedSelectedClass.id;
        //   updatedEnrollmentData.eventId = parsedSelectedEvent?.id || null;
        //   localStorage.setItem(
        //   "enrollmentData",
        //   JSON.stringify(updatedEnrollmentData),
        // );
        //   const result = await dispatch(addPayment(updatedEnrollmentData));
        //   console.log("Payment result passing user:", result);
        // }
        // else {
          const saved = await onSubmit(true);
        console.log("Payment result new user:", saved);
        // }
  };

  const handleSubmit = async () => {
  if (!stripe || !elements) return;

  try {
    // 1️⃣ Create PaymentIntent

    const paymentIntentRequestTime = new Date().toISOString();

    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: creditAmount,
      }),
    });

    const { clientSecret } = await response.json();

    // 2️⃣ Confirm payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.firstName + " " + formData.lastName,
            email: formData.email || formData.guardianEmail,
          },
        },
      },
    );

    const stripeResponseTime = new Date().toISOString();
    const paymentData = {
      ...paymentIntent,
      requestAt: paymentIntentRequestTime,
      responseAt: stripeResponseTime,
    }
    if (error) {
      console.error(error);
      router.replace("/Pages/enrollment/failed");
      return;
    }

    console.log("PaymentIntent:", paymentData);
    if (paymentIntent.status === "succeeded") {
      await processEnrollment(paymentData);
      router.replace("/admin/enrollment/enrollmentForm/success");
    }
    else {
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
  } catch (err) {
    console.error(err);
    const updatedEnrollmentData = {
          ...enrollmentData,
          paymentStatus: "Failed",
          amountToPay: `$${creditAmount.toFixed(2)}`,
        };
        localStorage.setItem(
          "enrollmentData",
          JSON.stringify(updatedEnrollmentData),
        );
        router.replace("/admin/enrollment/failed");
  }
};


  // ==================== UI ====================

  return (
    <Box>
      <FormContainer>
         <CardDetailsBox>
            <CardElement options={{ hidePostalCode: true, disableLink: true }} />
            </CardDetailsBox>
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
