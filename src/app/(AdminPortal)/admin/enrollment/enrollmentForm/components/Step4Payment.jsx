"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { useRouter } from "next/navigation";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { generateBookingId } from "@/app/utils/Providers/bookingIdGenerator";
import { addPayment } from "@/redux/slices/paymentSlice";

const CheckmarkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="8"
    viewBox="0 0 10 8"
    fill="none"
  >
    <path
      d="M0.75 4.84091C0.75 4.84091 1.60714 4.84091 2.75 6.75C2.75 6.75 5.92657 1.74982 8.75 0.75"
      stroke="#62B260"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="26"
    viewBox="0 0 11 13"
    fill="none"
  >
    <path
      d="M8.52126 3.84045C9.20926 3.67905 10.1054 2.9576 10.2418 2.60229C10.3218 2.3943 9.9229 2.06932 9.81627 1.93825C9.57223 1.63927 9.67067 1.49194 9.765 1.13555C9.87266 0.730409 9.61735 0.283021 9.2554 0.107533C8.89346 -0.0679554 8.46076 -0.012709 8.09676 0.158446C7.73277 0.329602 7.42209 0.60475 7.11756 0.875566C6.89506 0.727159 6.54029 0.0717854 5.9661 0.497507C5.56929 0.791071 5.53341 1.4302 5.58467 1.94041C5.70464 3.11792 5.97943 3.72888 6.49723 3.89353C7.1514 4.10152 7.87529 3.99211 8.52126 3.84045Z"
      fill="#FFCA28"
    />
    <path
      d="M9.6392 0.453125C9.55205 2.0401 8.08683 3.09303 7.39165 3.55667L7.8428 3.96614C7.8428 3.96614 8.12887 3.97264 8.52055 3.84049C9.19215 3.61517 10.1734 2.97821 10.2411 2.60232C10.3405 2.05527 9.80941 2.17443 9.68945 1.74221C9.6269 1.51364 9.99397 1.08142 9.6392 0.453125ZM7.11891 0.87668C7.11891 0.87668 6.85745 0.593949 6.66366 0.465041C6.56727 0.656778 6.49858 0.864765 6.46474 1.07925C6.40425 1.45623 6.46474 1.99136 6.60726 2.39C6.62982 2.45174 6.7139 2.44199 6.72313 2.377C6.84617 1.52014 7.11891 0.87668 7.11891 0.87668Z"
      fill="#E2A610"
    />
    <path
      d="M5.29085 3.70244C5.29085 3.70244 2.09281 4.0675 0.65015 7.00098C-0.792509 9.93445 0.433802 11.7132 1.73189 12.361C3.02997 13.0087 6.30082 13.2373 8.4284 12.7044C10.556 12.1714 11.0881 11.0665 10.9887 9.99945C10.8441 8.44172 9.47426 7.48411 9.47426 7.48411C9.47426 7.48411 9.5286 5.56024 8.11567 4.31124C6.86168 3.20198 5.29085 3.70244 5.29085 3.70244Z"
      fill="#FFCA28"
    />
    <path
      d="M6.60409 8.63549C5.91814 7.72121 5.10811 7.5988 4.8487 7.27058C4.70721 7.09184 4.62415 6.91093 4.65594 6.6867C4.68977 6.44838 4.95124 6.28373 5.15425 6.24364C5.39111 6.19598 5.95607 6.2209 6.43081 6.69861C6.5436 6.81127 6.50258 6.98676 6.49951 7.14384C6.4913 7.48073 6.94758 7.80787 7.3167 7.52623C7.68685 7.2435 7.40283 6.61412 7.16393 6.30864C6.98347 6.07791 6.3293 5.56986 5.5162 5.48969C5.28755 5.46695 4.36782 5.32287 3.83669 6.38989C3.68391 6.69645 3.62752 7.4374 4.42729 8.06352C4.59442 8.1946 5.46186 8.6604 5.70281 8.96263C6.12013 9.48585 5.83406 9.94623 5.508 10.0069C4.61903 10.1716 4.11558 9.6635 4.02228 9.3851C3.95563 9.18687 4.02535 8.97238 3.93922 8.78606C3.85104 8.59432 3.67058 8.51849 3.47987 8.58241C2.85441 8.79256 3.05333 9.5151 3.33017 9.91265C3.62649 10.3384 3.99049 10.5951 4.3996 10.7359C5.92634 11.2613 6.66048 10.4315 6.78865 9.82383C6.88298 9.3786 6.87273 8.99296 6.60409 8.63549Z"
      fill="#6B4B46"
    />
    <path
      d="M6.23357 4.87305C4.93446 7.80435 4.71094 11.5059 4.71094 11.5059"
      stroke="#6B4B46"
      strokeWidth="0.625"
      strokeMiterlimit="10"
    />
    <path
      d="M7.31478 3.02957C8.18017 3.32747 8.37191 4.154 8.30936 4.37931C8.23451 4.64363 7.27581 3.61453 5.85059 3.67628C5.35227 3.69794 5.49684 3.37513 5.72755 3.18881C6.03207 2.94291 6.54372 2.76525 7.31478 3.02957Z"
      fill="#6D4C41"
    />
    <path
      d="M7.31478 3.02957C8.18017 3.32747 8.37191 4.154 8.30936 4.37931C8.23451 4.64363 7.27581 3.61453 5.85059 3.67628C5.35227 3.69794 5.49684 3.37513 5.72755 3.18881C6.03207 2.94291 6.54372 2.76525 7.31478 3.02957Z"
      fill="#6B4B46"
    />
    <path
      d="M8.83205 5.94358C8.94073 5.8645 9.30576 6.00099 9.40829 6.75603C9.45853 7.12542 9.47391 7.48289 9.47391 7.48289C9.47391 7.48289 9.04327 7.07451 8.90075 6.78744C8.72131 6.42455 8.65159 6.07357 8.83205 5.94358Z"
      fill="#E2A610"
    />
  </svg>
);

// ==================== STYLED COMPONENTS ====================

const ContentWrapper = styled(Box)({
  padding: "0",
  marginTop: "30px",
  overflow: "hidden",
  backgroundColor: "#FFFFFF",
});

const FormContent = styled(Box)({
  padding: "0 30px 30px 30px",
  display: "grid",
  gridTemplateColumns: "1.2fr 1fr",
  gap: "30px",
  "@media (max-width: 1024px)": {
    gridTemplateColumns: "1fr",
    padding: "0 20px 20px 20px",
  },
  "@media (max-width: 568px)": {
    padding: "0 0px 20px 0px",
  },
});

const PaymentSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const SummarySection = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const SectionLabel = styled(Typography)({
  fontSize: "15px",
  fontWeight: 600,
  color: "#191919",
  marginBottom: "15px",
  lineHeight: "21px",
});

const PaymentModeBox = styled(Box)({
  border: "1px solid #B38349",
  borderRadius: "8px",
  padding: "12px 16px",
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  cursor: "pointer",
  backgroundColor: "#FAFAFA",
  "&:hover": {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.12)",
  },
});

const PaymentIcon = styled(Box)({
  color: "#B38349",
  display: "flex",
  alignItems: "center",
});

const PaymentText = styled(Typography)({
  fontSize: "15px",
  fontWeight: 500,
  color: "#333333",
  lineHeight: "21px",
});

const CardDetailsBox = styled(Box)({
  border: "1px solid #D0D0D0",
  borderRadius: "10px",
  padding: "20px",
  marginBottom: "20px",
  backgroundColor: "#FAFAFA",
  boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.10)",
});

const CheckboxContainer = styled(Box)({
  border: "1px solid #D0D0D0",
  borderRadius: "10px",
  padding: "20px 0px 20px 30px",
  marginBottom: "20px",
  backgroundColor: "#FAFAFA",
  boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.10)",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const CheckboxLabel = styled(FormControlLabel)({
  gap: "5px",
  "& .MuiTypography-root": {
    fontSize: "13px",
    color: "#191919",
    lineHeight: "18px",
  },
  "& .MuiCheckbox-root": {
    color: "#666666",
    padding: "4px",
    "& svg": {
      width: "18px",
      height: "18px",
    },
    "&.Mui-checked": {
      color: "#B38349",
    },
  },
  "& a": {
    color: "#B38349",
    textDecoration: "none",
    fontWeight: 500,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  "@media (max-width: 568px)": {
    alignItems: "flex-start",
    "& .MuiCheckbox-root": {
      padding: "0 9px 0 0",
    },
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

const ProceedButton = styled(Button)({
  backgroundColor: "#B38349",
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "12px 24px",
  borderRadius: "5px",
  width: "100%",
  height: "45px",
  marginTop: "10px",
  marginBottom: "10px",
  boxShadow: "0 2px 4px rgba(179, 131, 73, 0.3)",
  "&:hover": {
    backgroundColor: "#A17F4F",
    boxShadow: "0 4px 8px rgba(179, 131, 73, 0.4)",
  },
  "&:disabled": {
    backgroundColor: "#D4C4B0",
    color: "#FFFFFF",
    boxShadow: "none",
  },
});

const SummaryBox = styled(Box)({
  border: "1px solid #D0D0D0",
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "20px",
  backgroundColor: "#FAFAFA",
  boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.10)",
});

const CourseTitle = styled(Typography)({
  fontSize: "16px",
  fontWeight: 700,
  color: "#191919",
  marginBottom: "8px",
  lineHeight: "22.4px",
});

const CourseSubtitle = styled(Typography)({
  fontSize: "11px",
  fontWeight: 400,
  color: "#666666",
  marginBottom: "20px",
});

const PriceDisplay = styled(Typography)({
  fontSize: "24px",
  fontWeight: 700,
  color: "#B38349",
  marginBottom: "5px",
});

const PriceSubtext = styled(Typography)({
  fontSize: "12px",
  fontWeight: 500,
  color: "#757575",
  marginBottom: "25px",
});

const IncludesList = styled(Box)({
  marginTop: "15px",
});

const IncludesTitle = styled(Typography)({
  fontSize: "12px",
  fontWeight: 600,
  color: "#757575",
  marginBottom: "10px",
});

const CheckIcon = styled(Box)({
  width: "14px",
  height: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  marginTop: "2px",
  "& svg": {
    width: "10px",
    height: "8px",
  },
});

const IncludesItem = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  gap: "8px",
  marginBottom: "12px",
  lineHeight: "1.5", // ✅ Consistent line height
});

const IncludesText = styled(Typography)({
  fontSize: "12px",
  fontWeight: 600,
  color: "#757575",
  lineHeight: "1.5", // ✅ Match parent line height
  "& p, & div, & span": {
    margin: 0,
    padding: 0,
    lineHeight: "inherit",
  },
});

const PriceBreakdown = styled(Box)({
  paddingTop: "40px",
  marginTop: "15px",
});

const PriceRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
});

const PriceLabel = styled(Typography)({
  fontSize: "12px",
  fontWeight: 400,
  color: "#666666",
});

const PriceValue = styled(Typography)({
  fontSize: "12px",
  fontWeight: 600,
  color: "#333333",
});

const TotalRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "10px",
  borderTop: "1px solid #D3D3D3",
  marginTop: "15px",
});

const TotalLabel = styled(Typography)({
  fontSize: "13px",
  fontWeight: 600,
  color: "#333333",
});

const TotalValue = styled(Typography)({
  fontSize: "15px",
  fontWeight: 600,
  color: "#B38349",
});

const PaymentMethodSection = styled(Box)({
  marginBottom: "30px",
});

const PaymentMethodTitle = styled(Typography)({
  fontSize: "15px",
  fontWeight: 600,
  color: "#191919",
  marginBottom: "15px",
  lineHeight: "24px",
});

const PaymentMethodGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px",
  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
  },
});

const PaymentMethodCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ selected }) => ({
  border: selected ? "1px solid #B38349" : "1px solid #E5E5E5",
  borderRadius: "8px",
  padding: "50px 20px 20px",
  cursor: "pointer",
  backgroundColor: selected ? "#FFFBF5" : "#FFFFFF",
  boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.10)",
  position: "relative",
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: "#B38349",
  },
}));

const RadioCircle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ selected }) => ({
  position: "absolute",
  top: "15px",
  right: "15px",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  border: selected ? "6px solid #B38349" : "2px solid #D3D3D3",
  backgroundColor: "#FFFFFF",
  transition: "all 0.2s ease",
}));

const SaveBadge = styled(Box)({
  position: "absolute",
  top: "15px",
  left: "15px",
  backgroundColor: "#4CAF50",
  color: "#FFFFFF",
  fontSize: "11px",
  fontWeight: 600,
  padding: "4px 10px",
  borderRadius: "15px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
});

const MethodTitle = styled(Typography)({
  fontSize: "15px",
  fontWeight: 600,
  color: "#191919",
  marginBottom: "10px",
  lineHeight: "22.4px",
});

const PriceContainer = styled(Box)({
  display: "flex",
  alignItems: "baseline",
  gap: "8px",
  marginBottom: "8px",
});

const StrikePrice = styled(Typography)({
  fontSize: "13px",
  fontWeight: 400,
  color: "#8F8F8F",
  textDecoration: "line-through",
  lineHeight: "19.6px",
});

const MainPrice = styled(Typography)({
  fontSize: "20px",
  fontWeight: 600,
  color: "#B38349",
  lineHeight: "30.8px",
});

const Currency = styled("span")({
  fontSize: "13px",
  fontWeight: 600,
  color: "#B38349",
});

const MethodDescription = styled(Typography)({
  fontSize: "11px",
  fontWeight: 400,
  color: "#757575",
  marginBottom: "12px",
  lineHeight: "18px",
  paddingBottom: "5px",
  borderBottom: "1px solid #D3D3D3",
});

const FeatureList = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginBottom: "10px",
});

const FeatureItem = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  gap: "6px",
});

const FeatureCheckIcon = styled(Box)({
  width: "14px",
  height: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  marginTop: "2px",
  "& svg": {
    width: "10px",
    height: "8px",
  },
});

const FeatureText = styled(Typography)({
  fontSize: "10px",
  fontWeight: 600,
  color: "#757575",
});

const SavingsText = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  marginTop: "8px",
});

const BulbIconSmall = styled(Box)({
  width: "15px",
  height: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg": {
    width: "13px",
    height: "13px",
  },
});

const SavingsAmount = styled(Typography)({
  fontSize: "12px",
  fontWeight: 600,
  color: "#4CAF50",
});

// ==================== COMPONENT ====================

const Step4Payment = ({ formData, onSubmit, onBack, enrollmentType }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const selectedStudent = useSelector((state) => state.student.selectedStudent);
  const enrollmentFee = 0;

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
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [refundAccepted, setRefundAccepted] = useState(false);
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
      // console.log("Class ID from localStorage:", classDetail);
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
      classId: formData.classId ?? null,
      eventId: formData.eventId ?? null,
    };
    const updatedEnrollmentData = {
      ...enrollmentData,
      ...paymentData,
    };
    localStorage.setItem(
      "enrollmentData",
      JSON.stringify(updatedEnrollmentData),
    );
    console.log(
      "Updated enrollment data with payment info:",
      updatedEnrollmentData,
    );
    const selectedClass = localStorage.getItem("selectedClass");
    const parsedSelectedClass = selectedClass
      ? JSON.parse(selectedClass)
      : null;
    const selectedEvent = localStorage.getItem("eventId");
    const parsedSelectedEvent = selectedEvent
      ? JSON.parse(selectedEvent)
      : null;
    console.log("formdata userCourseId", formData.userCourseId);
    if (formData.userCourseId && formData.userCourseId !== "") {
      updatedEnrollmentData.userId = selectedStudent.studentId;
      updatedEnrollmentData.courseId = formData.userCourseId;
      updatedEnrollmentData.classId = parsedSelectedClass.id;
      updatedEnrollmentData.eventId = parsedSelectedEvent?.id || null;
      localStorage.setItem(
        "enrollmentData",
        JSON.stringify(updatedEnrollmentData),
      );
      const result = await dispatch(addPayment(updatedEnrollmentData));
      console.log("Payment result passing user:", result);
    } else {
      const saved = await onSubmit(true);
      console.log("Payment result new user:", saved);
    }
  };

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    const enrollmentData = JSON.parse(localStorage.getItem("enrollmentData"));

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
      };
      if (error) {
        console.error(error);
        const updatedEnrollmentData = {
          ...enrollmentData,
          paymentStatus: "Failed",
          amountToPay: `$${creditAmount.toFixed(2)}`,
        };
        localStorage.setItem(
          "enrollmentData",
          JSON.stringify(updatedEnrollmentData),
        );
        const result = await dispatch(addPayment(updatedEnrollmentData));
        router.replace("/admin/enrollment/enrollmentForm/failed");
        return;
      }

      console.log("PaymentIntent:", paymentData);
      if (paymentIntent.status === "succeeded") {
        await processEnrollment(paymentData);
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
        const result = await dispatch(addPayment(updatedEnrollmentData));
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
      const result = await dispatch(addPayment(updatedEnrollmentData));
      router.replace("/admin/enrollment/enrollmentForm/failed");
    }
  };

  // ==================== UI ====================

  return (
    <Box>
      <ContentWrapper>
        <FormContent>
          <PaymentSection>
            {/* Payment Method Section */}
            {enrollmentType === "Course" && (
              <PaymentMethodSection>
                <PaymentMethodTitle>
                  Choose your payment method
                </PaymentMethodTitle>

                <PaymentMethodGrid>
                  {/* Term Payment */}
                  <PaymentMethodCard
                    selected={paymentMethod === "term"}
                    onClick={() => setPaymentMethod("term")}
                  >
                    <RadioCircle selected={paymentMethod === "term"} />

                    <MethodTitle>Term Payment</MethodTitle>

                    <PriceContainer>
                      <MainPrice>
                        ${price.toFixed(2)}
                        <Currency>AUD</Currency>
                      </MainPrice>
                    </PriceContainer>

                    <MethodDescription>
                      Pay for one term at a time
                    </MethodDescription>

                    <FeatureList>
                      <FeatureItem>
                        <FeatureCheckIcon>
                          <CheckmarkIcon />
                        </FeatureCheckIcon>
                        <FeatureText>
                          {totalWeeksForTerm}-week term enrolment
                        </FeatureText>
                      </FeatureItem>

                      <FeatureItem>
                        <FeatureCheckIcon>
                          <CheckmarkIcon />
                        </FeatureCheckIcon>
                        <FeatureText>
                          Pay every {totalWeeksForTerm} weeks
                        </FeatureText>
                      </FeatureItem>

                      <FeatureItem>
                        <FeatureCheckIcon>
                          <CheckmarkIcon />
                        </FeatureCheckIcon>
                        <FeatureText>4 terms per year</FeatureText>
                      </FeatureItem>
                    </FeatureList>
                  </PaymentMethodCard>

                  {/* Annual Payment */}
                  <PaymentMethodCard
                    selected={paymentMethod === "annual"}
                    onClick={() => setPaymentMethod("annual")}
                  >
                    <SaveBadge>SAVE {discountApplied}%</SaveBadge>
                    <RadioCircle selected={paymentMethod === "annual"} />

                    <MethodTitle>Annual Payment</MethodTitle>

                    <PriceContainer>
                      <StrikePrice>{price.toFixed(2)}</StrikePrice>
                      <MainPrice>
                        $
                        {(
                          (yearlyPrice * (100 - discountApplied)) /
                          100
                        ).toFixed(2)}
                        <Currency>AUD</Currency>
                      </MainPrice>
                    </PriceContainer>

                    <MethodDescription>
                      Pay for full year upfront
                    </MethodDescription>

                    <FeatureList>
                      <FeatureItem>
                        <FeatureCheckIcon>
                          <CheckmarkIcon />
                        </FeatureCheckIcon>
                        <FeatureText>All 4 terms included</FeatureText>
                      </FeatureItem>

                      <FeatureItem>
                        <FeatureCheckIcon>
                          <CheckmarkIcon />
                        </FeatureCheckIcon>
                        <FeatureText>
                          Only $
                          {(
                            (yearlyPrice * (100 - discountApplied)) /
                            100 /
                            10
                          ).toFixed(2)}
                          /month
                        </FeatureText>
                      </FeatureItem>

                      <FeatureItem>
                        <FeatureCheckIcon>
                          <CheckmarkIcon />
                        </FeatureCheckIcon>
                        <FeatureText>10% discount applied</FeatureText>
                      </FeatureItem>
                    </FeatureList>

                    <SavingsText>
                      <BulbIconSmall>
                        <BagIcon />
                      </BulbIconSmall>
                      <SavingsAmount>
                        You save $
                        {((yearlyPrice * discountApplied) / 100).toFixed(2)}{" "}
                        annually!
                      </SavingsAmount>
                    </SavingsText>
                  </PaymentMethodCard>
                </PaymentMethodGrid>
              </PaymentMethodSection>
            )}

            <SectionLabel>Choose your mode of payment</SectionLabel>

            <PaymentModeBox>
              <PaymentIcon>
                <CreditCardIcon />
              </PaymentIcon>
              <PaymentText>Card</PaymentText>
            </PaymentModeBox>

            {/* Card Details */}
            <CardDetailsBox>
              <CardElement
                options={{ hidePostalCode: true, disableLink: true }}
              />
            </CardDetailsBox>
          </PaymentSection>

          {/* Summary Section */}
          <SummarySection>
            <SummaryBox>
              <CourseTitle>
                {classDetails?.course?.title || "Course"}
              </CourseTitle>
              <CourseSubtitle>
                Age Group {classDetails?.course?.ageGroup || "-"}
              </CourseSubtitle>

              <PriceDisplay>${creditAmount.toFixed(2)}</PriceDisplay>
              {enrollmentType === "Course" && paymentMethod === "term" && (
                <PriceSubtext>Full term course fee</PriceSubtext>
              )}
              {enrollmentType === "Course" && paymentMethod === "annual" && (
                <PriceSubtext>Full Year course fee</PriceSubtext>
              )}
              {enrollmentType === "Trial" && (
                <PriceSubtext>
                  One-time trial class fee (10% of term fee)
                </PriceSubtext>
              )}

              <IncludesList>
                <IncludesTitle>COURSE INCLUDES:</IncludesTitle>

                {classDetails && classDetails?.description && (
                  <IncludesItem>
                    <CheckIcon>
                      <CheckmarkIcon />
                    </CheckIcon>
                    <IncludesText
                      dangerouslySetInnerHTML={{
                        __html: classDetails?.description,
                      }}
                    />
                  </IncludesItem>
                )}

                {classDetails && classDetails?.location && (
                  <IncludesItem>
                    <CheckIcon>
                      <CheckmarkIcon />
                    </CheckIcon>
                    <IncludesText>
                      Location: {classDetails.location?.name}
                    </IncludesText>
                  </IncludesItem>
                )}

                {classDetails && classDetails?.tutor && (
                  <IncludesItem>
                    <CheckIcon>
                      <CheckmarkIcon />
                    </CheckIcon>
                    <IncludesText>
                      Professional Instructor (
                      {(
                        (classDetails?.tutor?.firstName || "") +
                        " " +
                        (classDetails?.tutor?.lastName || "")
                      ).trim()}
                      )
                    </IncludesText>
                  </IncludesItem>
                )}

                {classDetails && classDetails?.availableSeats && (
                  <IncludesItem>
                    <CheckIcon>
                      <CheckmarkIcon />
                    </CheckIcon>
                    <IncludesText>
                      Small group experience (max {classDetails?.availableSeats}{" "}
                      students)
                    </IncludesText>
                  </IncludesItem>
                )}
              </IncludesList>

              <PriceBreakdown>
                <PriceRow>
                  <PriceLabel>Course Fee</PriceLabel>
                  <PriceValue>${creditAmount.toFixed(2)}</PriceValue>
                </PriceRow>

                <PriceRow>
                  <PriceLabel>Registration Fee</PriceLabel>
                  <PriceValue>${enrollmentFee.toFixed(2)}</PriceValue>
                </PriceRow>

                <TotalRow>
                  <TotalLabel>TOTAL AMOUNT (AUD)</TotalLabel>
                  <TotalValue>
                    ${(Number(creditAmount) + Number(enrollmentFee)).toFixed(2)}
                  </TotalValue>
                </TotalRow>
              </PriceBreakdown>
            </SummaryBox>
          </SummarySection>
        </FormContent>

        <ButtonContainer>
          <StyledButton onClick={onBack} startIcon={<ArrowBackIcon />}>
            Back
          </StyledButton>
          <StyledButton onClick={handleSubmit} endIcon={<ArrowForwardIcon />}>
            Next
          </StyledButton>
        </ButtonContainer>
      </ContentWrapper>
    </Box>
  );
};

export default Step4Payment;
