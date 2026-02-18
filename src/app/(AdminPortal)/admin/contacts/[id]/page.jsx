"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useRouter } from "next/navigation";

// ==================== STYLED COMPONENTS ====================

const PageContainer = styled(Box)({
  minHeight: "100vh",
  padding: "0 24px",
  "@media (max-width: 768px)": {
    padding: " 0 16px",
  },
});

const PageHeader = styled(Box)({
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  padding: "15px 24px",
  marginBottom: "20px",
  boxShadow: " 0 0 4px 0 rgba(0, 0, 0, 0.25)",
});

const PageTitle = styled(Typography)({
  fontSize: "18px",
  fontWeight: 700,
  color: "#191919",
  marginBottom: "24px",
});

const ProfileSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
  "@media (max-width: 568px)": {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

const ProfileInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  flex: 1,
});

const ProfileAvatar = styled(Avatar)({
  width: "50px",
  height: "50px",
  backgroundColor: "#B38349",
  fontSize: "24px",
  fontWeight: 600,
  borderRadius: "8px",
});

const ProfileDetails = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

const ProfileName = styled(Typography)({
  fontSize: "16px",
  fontWeight: 700,
  color: "#191919",
});

const ProfileMetaContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
});

const ProfileMeta = styled(Typography)({
  fontSize: "12px",
  fontWeight: 400,
  color: "#666666",
});

const EditButton = styled(Button)({
  backgroundColor: "#FFFFFF",
  border: "1px solid #E0E0E0",
  color: "#191919",
  fontSize: "13px",
  fontWeight: 600,
  textTransform: "none",
  padding: "8px 20px",
  height: "36px",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "#B8936D",
    borderColor: "none",
  },
  "@media (max-width: 568px)": {
    width: "100%",
  },
});

const StyledAccordion = styled(Accordion)({
  backgroundColor: "#FFFFFF",
  borderRadius: "12px !important",
  marginBottom: "16px",
  boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: "0 0 16px 0",
  },
});

const StyledAccordionSummary = styled(AccordionSummary)({
  backgroundColor: "rgba(103, 90, 58, 0.23)",
  borderRadius: "12px !important",
  padding: "16px 20px",
  minHeight: "auto",
  "&.Mui-expanded": {
    minHeight: "auto",
    borderRadius: "12px 12px 0 0 !important",
  },
  "& .MuiAccordionSummary-content": {
    margin: "0",
    "&.Mui-expanded": {
      margin: "0",
    },
  },
});

const AccordionTitle = styled(Typography)({
  fontSize: "15px",
  fontWeight: 700,
  color: "#191919",
});

const StyledAccordionDetails = styled(AccordionDetails)({
  padding: "20px 24px",
  borderTop: "1px solid #F0F0F0",
});

const InfoGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
  "@media (max-width: 1200px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@media (max-width: 600px)": {
    gridTemplateColumns: "1fr",
  },
});

const InfoField = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

const InfoLabel = styled(Typography)({
  fontSize: "12px",
  fontWeight: 500,
  color: "#999999",
});

const InfoValue = styled(Typography)({
  fontSize: "14px",
  fontWeight: 600,
  color: "#191919",
});

const StyledTableContainer = styled(TableContainer)({
  overflowX: "auto",
  border: "1px solid #DFDFDF",
  borderRadius: "8px",
  "&::-webkit-scrollbar": {
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#F5F5F5",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#CCCCCC",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "#B8936D",
    },
  },
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: "rgba(103, 90, 58, 0.23)",
  borderRadius: "0px",
});

const StyledTableHeadCell = styled(TableCell)({
  fontSize: "12px",
  fontWeight: 700,
  color: "#433205",
  padding: "16px",
  borderBottom: "none",
  whiteSpace: "nowrap",
});

const StyledTableRow = styled(TableRow)({
  "&:hover": {
    backgroundColor: "#FAFAFA",
  },
  "&:last-child td": {
    borderBottom: "none",
  },
});

const StyledTableCell = styled(TableCell)({
  fontSize: "12px",
  fontWeight: 600,
  color: "#464646",
  padding: "16px",
  borderBottom: "1px solid #DFDFDF",
});

const CourseStatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "statusType",
})(({ statusType }) => ({
  fontSize: "11px",
  fontWeight: 600,
  height: "24px",
  borderRadius: "4px",
  backgroundColor: statusType === "active" ? "#E8F5E9" : "#FFF3E0",
  color: statusType === "active" ? "#2E7D32" : "#F57C00",
  border: "none",
  "& .MuiChip-label": {
    padding: "0 8px",
  },
}));

const PaymentStatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "statusType",
})(({ statusType }) => ({
  fontSize: "11px",
  fontWeight: 600,
  height: "24px",
  borderRadius: "4px",
  backgroundColor:
    statusType === "paid"
      ? "#E8F5E9"
      : statusType === "pending"
        ? "#FFF3E0"
        : "#FFEBEE",
  color:
    statusType === "paid"
      ? "#2E7D32"
      : statusType === "pending"
        ? "#F57C00"
        : "#C62828",
  border: "none",
  "& .MuiChip-label": {
    padding: "0 8px",
  },
}));

// ==================== SAMPLE DATA ====================

const studentData = {
  name: "Emma Watson",
  id: "APS001",
  dob: "DOB: 13 years - Teens",
  email: "Email: emma.watson@gmail.com",
  phone: "Phone: emma.watson@gmail.com",
  avatar: "",
  status: "ACTIVE STUDENT",
  participant: "KIDS PARTICIPANT",
};

const personalInfo = {
  fullName: "Emma Watson",
  dateOfBirth: "15 April, 2012",
  age: "13 years",
  gender: "Female",
  emailAddress: "emma.watson@gmail.com",
  mobileNumber: "+61 412 345 678",
  address: "121 Main Street, Moorabbin VIC 3189",
  enrolledSince: "22 Dec, 2025",
};

const guardianInfo = {
  guardianName: "Tom Cruise",
  relationship: "Father",
  emailAddress: "tom.cruise@email.com",
  mobileNumber: "+61 3 9555 5678",
};

const emergencyContact = {
  emergencyContactName: "Sarah Watson",
  relationship: "Mother",
  emailAddress: "sarah.watson@email.com",
  mobileNumber: "+61 3 9555 5678",
};

const healthInfo = {
  medicalConditions: "Asthma (mild), Peanuts, Tree nuts",
  allergies:
    "Ventolin inhaler (as needed), Keep inhaler accessible during classes",
};

const ndisInfo = {
  providerName: "Provider Brown",
  providerContactPerson: "ABC",
  ndisNumber: "0123456789",
  ndisCarerName: "+61 547 874 123",
  providerContactEmail: "abcone@gmail.com",
  ndisCategoryName: "XYZ",
  ndisCarerPhoneNumber: "+61 547 874 123",
};

const coursesData = [
  {
    courseName: "Teen Acting Classes",
    term: "Term 1",
    instructor: "Harrison Lane",
    invoice: "BRNV-2026-0147",
    date: "15 Jan 2026",
    amount: "$405.00",
    courseStatus: "active",
    paymentStatus: "pending",
  },
  {
    courseName: "Musical Theatre - Teens",
    term: "Term 4",
    instructor: "Harrison Lane",
    invoice: "BRNV-2026-0147",
    date: "22 Nov 2025",
    amount: "$405.00",
    courseStatus: "completed",
    paymentStatus: "paid",
  },
];

// ==================== COMPONENT ====================

const ViewContactDetails = () => {
  const router = useRouter();
  const [expanded, setExpanded] = useState({
    personal: true,
    guardian: true,
    emergency: true,
    health: true,
    ndis: true,
    courses: true,
  });

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded((prev) => ({ ...prev, [panel]: isExpanded }));
  };

  const handleEditDetails = () => {
    router.push(`/admin/contacts/${studentData.id}/edit`);
  };

  return (
    <PageContainer>
      {/* Header Section */}
      <PageTitle>View Contact Details</PageTitle>

      <PageHeader>
        <ProfileSection>
          <ProfileInfo>
            <ProfileAvatar>{studentData.name.charAt(0)}</ProfileAvatar>
            <ProfileDetails>
              <ProfileName>{studentData.name}</ProfileName>
              <ProfileMetaContainer>
                <ProfileMeta>{studentData.id}</ProfileMeta>
              </ProfileMetaContainer>
            </ProfileDetails>
          </ProfileInfo>

          <EditButton
            startIcon={<EditOutlinedIcon sx={{ fontSize: "16px" }} />}
            onClick={handleEditDetails}
          >
            Edit Details
          </EditButton>
        </ProfileSection>
      </PageHeader>

      {/* Personal Information */}
      <StyledAccordion
        expanded={expanded.personal}
        onChange={handleAccordionChange("personal")}
      >
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <AccordionTitle>Personal Information</AccordionTitle>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <InfoGrid>
            <InfoField>
              <InfoLabel>Full Name</InfoLabel>
              <InfoValue>{personalInfo.fullName}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>Date of Birth</InfoLabel>
              <InfoValue>{personalInfo.dateOfBirth}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>Age</InfoLabel>
              <InfoValue>{personalInfo.age}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>Gender</InfoLabel>
              <InfoValue>{personalInfo.gender}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>Email address</InfoLabel>
              <InfoValue>{personalInfo.emailAddress}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>Mobile Number</InfoLabel>
              <InfoValue>{personalInfo.mobileNumber}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>Address</InfoLabel>
              <InfoValue>{personalInfo.address}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>Enrolled Since</InfoLabel>
              <InfoValue>{personalInfo.enrolledSince}</InfoValue>
            </InfoField>
          </InfoGrid>
        </StyledAccordionDetails>
      </StyledAccordion>

      {/* Guardian / Parent Information */}
      <StyledAccordion
        expanded={expanded.guardian}
        onChange={handleAccordionChange("guardian")}
      >
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <AccordionTitle>Guardian / Parent Information</AccordionTitle>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <InfoGrid>
            <InfoField>
              <InfoLabel>Guardian Name</InfoLabel>
              <InfoValue>{guardianInfo.guardianName}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>Relationship</InfoLabel>
              <InfoValue>{guardianInfo.relationship}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>Email Address</InfoLabel>
              <InfoValue>{guardianInfo.emailAddress}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>Mobile Number</InfoLabel>
              <InfoValue>{guardianInfo.mobileNumber}</InfoValue>
            </InfoField>
          </InfoGrid>
        </StyledAccordionDetails>
      </StyledAccordion>

      {/* Emergency Contact Information */}
      <StyledAccordion
        expanded={expanded.emergency}
        onChange={handleAccordionChange("emergency")}
      >
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <AccordionTitle>Emergency Contact Information</AccordionTitle>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <InfoGrid>
            <InfoField>
              <InfoLabel>Emergency Contact Name</InfoLabel>
              <InfoValue>{emergencyContact.emergencyContactName}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>Relationship</InfoLabel>
              <InfoValue>{emergencyContact.relationship}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>Email Address</InfoLabel>
              <InfoValue>{emergencyContact.emailAddress}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>Mobile Number</InfoLabel>
              <InfoValue>{emergencyContact.mobileNumber}</InfoValue>
            </InfoField>
          </InfoGrid>
        </StyledAccordionDetails>
      </StyledAccordion>

      {/* Health & Medical Information */}
      <StyledAccordion
        expanded={expanded.health}
        onChange={handleAccordionChange("health")}
      >
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <AccordionTitle>Health & Medical Information</AccordionTitle>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <InfoGrid>
            <InfoField>
              <InfoLabel>Medical Conditions and allergies</InfoLabel>
              <InfoValue>{healthInfo.medicalConditions}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>Allergies</InfoLabel>
              <InfoValue>{healthInfo.allergies}</InfoValue>
            </InfoField>
          </InfoGrid>
        </StyledAccordionDetails>
      </StyledAccordion>

      {/* NDIS Information */}
      <StyledAccordion
        expanded={expanded.ndis}
        onChange={handleAccordionChange("ndis")}
      >
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <AccordionTitle>NDIS Information</AccordionTitle>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <InfoGrid>
            <InfoField>
              <InfoLabel>Name of the Provider</InfoLabel>
              <InfoValue>{ndisInfo.providerName}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>Provider Contact Person</InfoLabel>
              <InfoValue>{ndisInfo.providerContactPerson}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>NDIS Number</InfoLabel>
              <InfoValue>{ndisInfo.ndisNumber}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>NDIS Carer Name</InfoLabel>
              <InfoValue>{ndisInfo.ndisCarerName}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>Provider Contact Email</InfoLabel>
              <InfoValue>{ndisInfo.providerContactEmail}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>NDIS Category Name</InfoLabel>
              <InfoValue>{ndisInfo.ndisCategoryName}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>NDIS Carer Phone Number</InfoLabel>
              <InfoValue>{ndisInfo.ndisCarerPhoneNumber}</InfoValue>
            </InfoField>
          </InfoGrid>
        </StyledAccordionDetails>
      </StyledAccordion>

      {/* Enrolled Courses & Payment History */}
      <StyledAccordion
        expanded={expanded.courses}
        onChange={handleAccordionChange("courses")}
      >
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <AccordionTitle>Enrolled Courses & Payment History</AccordionTitle>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <StyledTableContainer>
            <Table sx={{ minWidth: 900 }}>
              <StyledTableHead>
                <TableRow>
                  <StyledTableHeadCell sx={{ minWidth: "180px" }}>
                    Course Name
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "80px" }}>
                    Term
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "140px" }}>
                    Instructor
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "140px" }}>
                    Invoice #
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "120px" }}>
                    Date
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "100px" }}>
                    Amount
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "120px" }}>
                    Course Status
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "120px" }}>
                    Payment Status
                  </StyledTableHeadCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {coursesData.map((course, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{course.courseName}</StyledTableCell>
                    <StyledTableCell>{course.term}</StyledTableCell>
                    <StyledTableCell>{course.instructor}</StyledTableCell>
                    <StyledTableCell>{course.invoice}</StyledTableCell>
                    <StyledTableCell>{course.date}</StyledTableCell>
                    <StyledTableCell>{course.amount}</StyledTableCell>
                    <StyledTableCell>
                      <CourseStatusChip
                        label={
                          course.courseStatus === "active"
                            ? "Active"
                            : "Completed"
                        }
                        statusType={course.courseStatus}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <PaymentStatusChip
                        label={
                          course.paymentStatus === "paid" ? "Paid" : "Pending"
                        }
                        statusType={course.paymentStatus}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </StyledAccordionDetails>
      </StyledAccordion>
    </PageContainer>
  );
};

export default ViewContactDetails;
