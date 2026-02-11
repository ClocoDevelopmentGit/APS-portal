"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/navigation";

// ==================== STYLED COMPONENTS ====================

const PageContainer = styled(Box)({
  padding: "0 10px",
  backgroundColor: "transparent",
  minHeight: "100vh",
});

const HeaderSection = styled(Box)({
  marginBottom: "24px",
});

const PageTitle = styled(Typography)({
  fontSize: "20px",
  fontWeight: 700,
  color: "#191919",
  lineHeight: "24px",
  marginBottom: "6px",
});

const Breadcrumb = styled(Typography)({
  fontSize: "14px",
  fontWeight: 400,
  color: "#666666",
  lineHeight: "18px",
});

const InfoBanner = styled(Box)({
  backgroundColor: "#AE9964",
  borderRadius: "5px",
  padding: "14px 20px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  height: "45px",
  marginBottom: "25px",
});

const InfoText = styled(Typography)({
  fontSize: "13px",
  fontWeight: 500,
  color: "#FFFFFF",
  lineHeight: "18px",
});

const ContentCard = styled(Box)({
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  padding: "40px",
  "@media (max-width: 768px)": {
    padding: "20px 15px",
  },
});

const SectionTitle = styled(Typography)({
  fontSize: "18px",
  fontWeight: 600,
  color: "#191919",
  marginBottom: "24px",
});

const SearchSection = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  marginBottom: "30px",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    alignItems: "stretch",
  },
});

const SearchBox = styled(Box)({
  display: "flex",
  gap: "12px",
  flex: 1,
  "@media (max-width: 768px)": {
    flexDirection: "column",
  },
});

const StyledTextField = styled(TextField)({
  flex: 1,
  maxWidth: "470px",
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    height: "40px",
    "& fieldset": {
      borderColor: "#D0D0D0",
    },
    "&:hover fieldset": {
      borderColor: "#B8936D",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#B8936D",
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "14px",
    fontWeight: 400,
    color: "#999999",
    padding: "12px 16px",
    "&::placeholder": {
      color: "#999999",
      opacity: 1,
    },
  },
  "@media (max-width: 768px)": {
    maxWidth: "100%",
  },
});

const SearchButton = styled(Button)({
  backgroundColor: "#AE9964",
  color: "#FFFFFF",
  padding: "10px 25px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  height: "40px",
  minWidth: "100px",
  whiteSpace: "nowrap",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#9A8556",
    boxShadow: "none",
  },
});

const NewEnrollmentButton = styled(Button)({
  backgroundColor: "#AE9964",
  color: "#FFFFFF",
  padding: "10px 24px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  height: "40px",
  whiteSpace: "nowrap",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#9A8556",
    boxShadow: "none",
  },
});

const StyledTableContainer = styled(TableContainer)({
  border: "1px solid #E8E8E8",
  borderRadius: "0px",
  marginBottom: "20px",
  boxShadow: "none",
  overflowX: "auto",
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: "#FAFAFA",
  borderBottom: "1px solid #E8E8E8",
});

const StyledTableHeadCell = styled(TableCell)({
  fontSize: "14px",
  fontWeight: 600,
  color: "#000000",
  borderBottom: "1px solid #E8E8E8",
  padding: "18px 16px",
  backgroundColor: "#FAFAFA",
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
  fontSize: "14px",
  fontWeight: 400,
  color: "#000000",
  padding: "15px 15px",
  borderBottom: "1px solid #F5F5F5",
});

const PaymentChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ status }) => ({
  fontSize: "12px",
  fontWeight: 600,
  height: "26px",
  borderRadius: "4px",
  backgroundColor: status === "paid" ? "#E8F5E9" : "#FFF3E0",
  color: status === "paid" ? "#2E7D32" : "#F57C00",
  border: "none",
  "& .MuiChip-label": {
    padding: "0 10px",
  },
}));

const PaginationBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: "20px",
  gap: "20px",
  "@media (max-width: 768px)": {
    justifyContent: "center",
  },
});

const PaginationText = styled(Typography)({
  fontSize: "14px",
  fontWeight: 400,
  color: "#666666",
});

const PaginationControls = styled(Box)({
  display: "flex",
  gap: "8px",
  alignItems: "center",
});

const PaginationButton = styled(IconButton)({
  width: "32px",
  height: "32px",
  border: "1px solid #E0E0E0",
  borderRadius: "4px",
  padding: "4px",
  "&:hover": {
    backgroundColor: "#F5F5F5",
    borderColor: "#C0C0C0",
  },
  "&:disabled": {
    opacity: 0.3,
    borderColor: "#E0E0E0",
  },
});

// ==================== SAMPLE DATA ====================

const enrollmentData = [
  {
    id: 1,
    name: "Andres Watson",
    age: "20 yrs",
    mobile: "+61 410 345 678",
    course: "Industry Driven – Adults",
    session: "18 Oct - 6 Dec, 2025 | 4:45pm...",
    paymentStatus: "paid",
  },
  {
    id: 2,
    name: "Billy Adams",
    age: "08 yrs",
    mobile: "+61 412 012 658",
    course: "Junior Kids Acting",
    session: "18 Oct - 6 Dec, 2025 | 4:45pm...",
    paymentStatus: "unpaid",
  },
  {
    id: 3,
    name: "Daniel Brown",
    age: "05 yrs",
    mobile: "+61 400 245 521",
    course: "Kinder Kids Musical Theatre",
    session:
      "18 Oct - 6 Dec, 2025 | 4:45pm - 6:45pm| Moorabbin | Harrison Lane",
    paymentStatus: "unpaid",
  },
  {
    id: 4,
    name: "Elle Briam",
    age: "07 yrs",
    mobile: "+61 342 755 003",
    course: "Senior Kids Industry Driven",
    session: "18 Oct - 6 Dec, 2025 | 4:45pm...",
    paymentStatus: "paid",
  },
  {
    id: 5,
    name: "Liam River",
    age: "12 yrs",
    mobile: "+61 456 222 343",
    course: "Teens Musical Theatre",
    session: "18 Oct - 6 Dec, 2025 | 4:45pm...",
    paymentStatus: "paid",
  },
  {
    id: 6,
    name: "Priya Sharma",
    age: "13 yrs",
    mobile: "+61 448 565 657",
    course: "Teens Musical Theatre",
    session: "18 Oct - 6 Dec, 2025 | 4:45pm...",
    paymentStatus: "paid",
  },
  {
    id: 7,
    name: "Richard Bell",
    age: "15 yrs",
    mobile: "+61 678 785 247",
    course: "Industry Driven – Teens",
    session: "18 Oct - 6 Dec, 2025 | 4:45pm...",
    paymentStatus: "paid",
  },
  {
    id: 8,
    name: "Sara Mitchel",
    age: "24 yrs",
    mobile: "+61 545 025 778",
    course: "Industry Driven – Adults",
    session: "18 Oct - 6 Dec, 2025 | 4:45pm...",
    paymentStatus: "unpaid",
  },
  {
    id: 9,
    name: "William Scott",
    age: "06 yrs",
    mobile: "+61 657 755 348",
    course: "Kinder Kids Acting",
    session: "18 Oct - 6 Dec, 2025 | 4:45pm...",
    paymentStatus: "paid",
  },
  {
    id: 10,
    name: "Zara Noor",
    age: "05 yrs",
    mobile: "+61 657 755 745",
    course: "Kinder Kids Acting",
    session: "18 Oct - 6 Dec, 2025 | 4:45pm...",
    paymentStatus: "paid",
  },
  {
    id: 11,
    name: "Emma Thompson",
    age: "09 yrs",
    mobile: "+61 523 891 234",
    course: "Junior Kids Musical Theatre",
    session: "18 Oct - 6 Dec, 2025 | 3:30pm...",
    paymentStatus: "unpaid",
  },
  {
    id: 12,
    name: "Oliver Martinez",
    age: "16 yrs",
    mobile: "+61 687 432 109",
    course: "Teens Industry Driven",
    session: "18 Oct - 6 Dec, 2025 | 5:00pm - 7:00pm| Carlton | Sarah Miller",
    paymentStatus: "paid",
  },
  {
    id: 13,
    name: "Sophia Chen",
    age: "11 yrs",
    mobile: "+61 412 567 890",
    course: "Senior Kids Acting",
    session: "18 Oct - 6 Dec, 2025 | 4:15pm...",
    paymentStatus: "paid",
  },
  {
    id: 14,
    name: "Noah Anderson",
    age: "22 yrs",
    mobile: "+61 398 765 432",
    course: "Industry Driven – Adults",
    session: "18 Oct - 6 Dec, 2025 | 6:30pm...",
    paymentStatus: "unpaid",
  },
  {
    id: 15,
    name: "Mia Roberts",
    age: "04 yrs",
    mobile: "+61 445 123 789",
    course: "Kinder Kids Acting",
    session: "18 Oct - 6 Dec, 2025 | 2:45pm - 4:45pm| Richmond | Emma Davis",
    paymentStatus: "paid",
  },
];

// ==================== COMPONENT ====================

const EnrollmentListPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Add search logic here
  };

  const handleNewEnrollment = () => {
    router.push("/admin/enrollment/enrollmentForm");
  };

  const filteredData = enrollmentData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <PageContainer>
      <HeaderSection>
        <PageTitle>Manual Enrollment</PageTitle>
        <Breadcrumb>
          Enrollments / Manual Enrollment / Search Student
        </Breadcrumb>
      </HeaderSection>

      <InfoBanner>
        <InfoOutlinedIcon sx={{ color: "#FFFFFF", fontSize: "20px" }} />
        <InfoText>
          Search for an existing parent or student account by name, email, or
          phone number.
        </InfoText>
      </InfoBanner>

      <ContentCard>
        <SectionTitle>Search Existing Accounts</SectionTitle>

        <SearchSection>
          <SearchBox>
            <StyledTextField
              fullWidth
              placeholder="Search student by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <SearchButton onClick={handleSearch}>Search</SearchButton>
          </SearchBox>
          <NewEnrollmentButton
            onClick={handleNewEnrollment}
            startIcon={<span>+</span>}
          >
            New Enrollment
          </NewEnrollmentButton>
        </SearchSection>

        <StyledTableContainer>
          <Table sx={{ minWidth: 1000 }}>
            <StyledTableHead>
              <TableRow>
                <StyledTableHeadCell sx={{ width: "15%", minWidth: "150px" }}>
                  Name
                </StyledTableHeadCell>
                <StyledTableHeadCell sx={{ width: "10%", minWidth: "80px" }}>
                  Age
                </StyledTableHeadCell>
                <StyledTableHeadCell sx={{ width: "15%", minWidth: "140px" }}>
                  Mobile Number
                </StyledTableHeadCell>
                <StyledTableHeadCell sx={{ width: "20%", minWidth: "180px" }}>
                  Course
                </StyledTableHeadCell>
                <StyledTableHeadCell sx={{ width: "25%", minWidth: "220px" }}>
                  Session
                </StyledTableHeadCell>
                <StyledTableHeadCell sx={{ width: "15%", minWidth: "130px" }}>
                  Payment Status
                </StyledTableHeadCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {currentData.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell sx={{ width: "15%", minWidth: "150px" }}>
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "10%", minWidth: "80px" }}>
                    {row.age}
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "15%", minWidth: "140px" }}>
                    {row.mobile}
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "20%", minWidth: "180px" }}>
                    {row.course}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      width: "25%",
                      minWidth: "220px",
                      maxWidth: "250px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.session}
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "15%", minWidth: "130px" }}>
                    <PaymentChip
                      label={row.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                      status={row.paymentStatus}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>

        <PaginationBox>
          <PaginationText>
            {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of{" "}
            {filteredData.length}
          </PaginationText>
          <PaginationControls>
            <PaginationButton
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon />
            </PaginationButton>
            <PaginationButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRightIcon />
            </PaginationButton>
          </PaginationControls>
        </PaginationBox>
      </ContentCard>
    </PageContainer>
  );
};

export default EnrollmentListPage;
