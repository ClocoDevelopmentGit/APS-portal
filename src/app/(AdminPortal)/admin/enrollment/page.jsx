"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

// ==================== STYLED COMPONENTS ====================

const TitleSection = styled(Box)({
  marginBottom: "20px",
});

const MainTitle = styled(Typography)({
  fontSize: "18px",
  fontWeight: 700,
  color: "#191919",
  lineHeight: "24px",
  letterSpacing: "0.4px",
  marginBottom: "4px",
});

const SubTitle = styled(Typography)({
  fontSize: "13px",
  fontWeight: 400,
  color: "#666666",
  lineHeight: "20px",
});

const PageContainer = styled(Box)({
  boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  borderRadius: "8px",
  backgroundColor: "#FFFFFF",
});

const HeaderSection = styled(Box)({
  backgroundColor: "#FFFFFF",
  borderRadius: "8px 8px 0 0",
  padding: "16px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "16px",
  borderBottom: "1px solid #E0E0E0",
  "@media (max-width: 968px)": {
    flexDirection: "column",
    alignItems: "stretch",
  },
});

const SearchContainer = styled(Box)({
  display: "flex",
  gap: "12px",
  alignItems: "center",
  flex: 1,
  "@media (max-width: 968px)": {
    width: "100%",
  },
});

const StyledTextField = styled(TextField)({
  flex: 1,
  maxWidth: "400px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "9px",
    backgroundColor: "#F5F5F5",
    boxShadow: "0 1px 4px 0 rgba(142, 142, 142, 0.25) inset",
    height: "40px",
    border: "none",
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
  "& .MuiInputBase-input": {
    padding: "14px 20px",
    fontSize: "14px",
    fontWeight: 400,
    color: "#191919",
    "&::placeholder": {
      color: "#AAAAAA",
      opacity: 1,
    },
  },
  "@media (max-width: 968px)": {
    maxWidth: "100%",
  },
});

const SearchButton = styled(Button)({
  backgroundColor: "#98711B",
  border: "1px solid rgba(152, 113, 27, 0.39)",
  boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  color: "#FFFFFF",
  fontSize: "13px",
  fontWeight: 600,
  textTransform: "none",
  padding: "8px 24px",
  height: "40px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#9A7340",
    boxShadow: "0 2px 8px rgba(179, 131, 73, 0.3)",
  },
});

const NewEnrollmentButton = styled(Button)({
  backgroundColor: "#98711B",
  border: "1px solid rgba(152, 113, 27, 0.39)",
  boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  color: "#FFFFFF",
  fontSize: "13px",
  fontWeight: 600,
  textTransform: "none",
  padding: "8px 24px",
  height: "40px",
  borderRadius: "9px",
  whiteSpace: "nowrap",
  "&:hover": {
    backgroundColor: "#9A7340",
    boxShadow: "0 2px 8px rgba(179, 131, 73, 0.3)",
  },
  "@media (max-width: 968px)": {
    width: "100%",
  },
});

const ContentCard = styled(Box)({
  backgroundColor: "#FFFFFF",
  borderRadius: "0px 0px 8px 8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  overflow: "hidden",
});

const StyledTableContainer = styled(TableContainer)({
  overflowX: "auto",
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
  "&:first-of-type": {
    borderRight: "1px solid #C3C0B9",
  },
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
  "&:first-of-type": {
    borderRight: "1px solid #C3C0B9",
  },
});

const ParticipantCell = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const ParticipantName = styled(Typography)({
  fontSize: "12px",
  fontWeight: 600,
  color: "#433205",
});

const PaymentChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ status }) => ({
  fontSize: "12px",
  fontWeight: 600,
  height: "35px",
  borderRadius: "8px",
  backgroundColor: status === "paid" ? "#CBF2B1" : "#FFF3CE",
  color: status === "paid" ? "#3A8C03" : "#B88D01",
  border: "none",
  "& .MuiChip-label": {
    padding: "0 10px",
  },
}));

const TypeChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ status }) => ({
  fontSize: "12px",
  fontWeight: 600,
  height: "35px",
  borderRadius: "8px",
  backgroundColor: "transparent",
  color: status === "trial" ? "#B88D01" : "#3A8C03",
  border: "none",
  "& .MuiChip-label": {
    padding: "0 10px",
  },
}));

const PaginationContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "16px 20px",
  backgroundColor: "#D8D5CE",
  borderRadius: "0px 0px 8px 8px",
  border: "1px solid #D0D0D0",
  position: "relative",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    gap: "12px",
    padding: "16px",
  },
});

const PaginationText = styled(Typography)({
  fontSize: "13px",
  fontWeight: 600,
  color: "#644C10",
  position: "absolute",
  left: "20px",
  "@media (max-width: 768px)": {
    position: "static",
    order: 2,
  },
});

const PaginationButtons = styled(Box)({
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  justifyContent: "center",
  "@media (max-width: 768px)": {
    order: 1,
  },
});

const PageButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }) => ({
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: 500,
  cursor: "pointer",
  backgroundColor: active ? "#FFFFFF" : "#eeedea",
  color: "#644C10",
  border: active ? "1px solid #644C10" : "none",
  boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  "&:hover": {
    backgroundColor: "#FFFFFF",
    border: "1px solid #644C10",
  },
  "@media (max-width: 480px)": {
    width: "28px",
    height: "28px",
    fontSize: "12px",
  },
}));

const NavButton = styled(IconButton)({
  width: "32px",
  height: "32px",
  backgroundColor: "#eeedea",
  color: "#644C10",
  borderRadius: "8px",
  boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  "&:hover": {
    backgroundColor: "#FFFFFF",
    border: "1px solid #644C10",
  },
  "&:disabled": {
    backgroundColor: "#e0e0e0",
    color: "#999999",
    cursor: "not-allowed",
    opacity: 0.6,
  },
  "@media (max-width: 480px)": {
    width: "28px",
    height: "28px",
  },
});

// ==================== SAMPLE DATA ====================

const enrollmentData = [
  {
    id: 1,
    name: "Andres Watson",
    age: "20 Years",
    mobile: "+61 410 345 678",
    email: "andreswatson@gmail.com",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    paymentStatus: "paid",
    type: "enrolled",
  },
  {
    id: 2,
    name: "Billy Adams",
    age: "18 Years",
    mobile: "+61 412 012 658",
    email: "billyadams@gmail.com",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    paymentStatus: "paid",
    type: "enrolled",
  },
  {
    id: 3,
    name: "Daniel Brown",
    age: "12 Years",
    mobile: "+61 400 245 521",
    email: "danielbrown@gmail.com",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    paymentStatus: "unpaid",
    type: "trial",
  },
  {
    id: 4,
    name: "Elle Briam",
    age: "14 Years",
    mobile: "+61 342 755 003",
    email: "ellebriam@gmail.com",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    paymentStatus: "unpaid",
    type: "trial",
  },
  {
    id: 5,
    name: "Liam River",
    age: "12 Years",
    mobile: "+61 456 222 343",
    email: "liamriver@gmail.com",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    paymentStatus: "unpaid",
    type: "trial",
  },
  {
    id: 6,
    name: "Priya Sharma",
    age: "8 Years",
    mobile: "+61 448 565 657",
    email: "priyasharma@gmail.com",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    paymentStatus: "paid",
    type: "enrolled",
  },
  {
    id: 7,
    name: "Richard Bell",
    age: "14 Years",
    mobile: "+61 678 785 247",
    email: "richardbell@gmail.com",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    paymentStatus: "paid",
    type: "enrolled",
  },
  {
    id: 8,
    name: "Sara Mitchel",
    age: "9 Years",
    mobile: "+61 545 025 778",
    email: "saramitchel@gmail.com",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    paymentStatus: "paid",
    type: "enrolled",
  },
];

// ==================== COMPONENT ====================

const ManualEnrollmentPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleNewEnrollment = () => {
    router.push("/admin/enrollment/enrollmentForm");
  };

  // Calculate pagination
  const totalPages = Math.ceil(enrollmentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = enrollmentData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Title Section */}
      <TitleSection>
        <MainTitle>Manual Enrollments</MainTitle>
        <SubTitle>List of manual enrollments</SubTitle>
      </TitleSection>

      <PageContainer>
        {/* Header Section */}
        <HeaderSection>
          <SearchContainer>
            <StyledTextField
              placeholder="Search student by name or phone number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <SearchButton onClick={handleSearch} startIcon={<SearchIcon />}>
              Search
            </SearchButton>
          </SearchContainer>

          <NewEnrollmentButton onClick={handleNewEnrollment}>
            + New Enrollments
          </NewEnrollmentButton>
        </HeaderSection>

        {/* Table Section */}
        <ContentCard>
          <StyledTableContainer>
            <Table sx={{ minWidth: 1100 }}>
              <StyledTableHead>
                <TableRow>
                  <StyledTableHeadCell sx={{ minWidth: "180px" }}>
                    Name
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "90px" }}>
                    Age
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "140px" }}>
                    Mobile Number
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "200px" }}>
                    Mail ID
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "170px" }}>
                    Course
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "200px" }}>
                    Session
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "100px" }}>
                    Type
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "80px" }}>
                    Status
                  </StyledTableHeadCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {currentData.map((enrollment) => (
                  <StyledTableRow key={enrollment.id}>
                    <StyledTableCell>
                      <ParticipantCell>
                        <Avatar
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: "6px",
                          }}
                        >
                          {enrollment.name.charAt(0)}
                        </Avatar>
                        <ParticipantName>{enrollment.name}</ParticipantName>
                      </ParticipantCell>
                    </StyledTableCell>
                    <StyledTableCell>{enrollment.age}</StyledTableCell>
                    <StyledTableCell>{enrollment.mobile}</StyledTableCell>
                    <StyledTableCell>{enrollment.email}</StyledTableCell>
                    <StyledTableCell>{enrollment.course}</StyledTableCell>
                    <StyledTableCell>{enrollment.session}</StyledTableCell>
                    <StyledTableCell>
                      <TypeChip
                        label={
                          enrollment.type === "trial" ? "Trial" : "Enrolled"
                        }
                        status={enrollment.type}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <PaymentChip
                        label={
                          enrollment.paymentStatus === "paid"
                            ? "Paid"
                            : "Unpaid"
                        }
                        status={enrollment.paymentStatus}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>

          {/* Pagination */}
          <PaginationContainer>
            <PaginationText>
              Showing Pages {currentPage} of {totalPages}
            </PaginationText>
            <PaginationButtons>
              <NavButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon sx={{ fontSize: "18px" }} />
              </NavButton>

              {Array.from({ length: totalPages }, (_, index) => (
                <PageButton
                  key={index + 1}
                  active={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PageButton>
              ))}

              <NavButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon sx={{ fontSize: "18px" }} />
              </NavButton>
            </PaginationButtons>
          </PaginationContainer>
        </ContentCard>
      </PageContainer>
    </>
  );
};

export default ManualEnrollmentPage;
