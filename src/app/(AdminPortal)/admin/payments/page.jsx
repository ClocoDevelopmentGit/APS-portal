"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";

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
    borderRadius: "12px",
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

const FilterContainer = styled(Box)({
  display: "flex",
  gap: "12px",
  alignItems: "center",
  "@media (max-width: 968px)": {
    width: "100%",
  },
});

const StyledFormControl = styled(FormControl)({
  minWidth: "150px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "9px",
    backgroundColor: "#F2F2F2",
    height: "40px",
    fontSize: "13px",
    fontWeight: 400,
    boxShadow: "0 1px 4px 0 rgba(142, 142, 142, 0.25) inset",
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "#AE9964",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
  "& .MuiSelect-select": {
    padding: "10px 14px",
    fontSize: "13px",
    fontWeight: 400,
    color: "#181818",
  },
  "& .MuiSelect-icon": {
    color: "#2A3547",
  },
  "@media (max-width: 968px)": {
    width: "100%",
  },
});

const StyledMenuItem = styled(MenuItem)({
  fontSize: "13px",
  color: "#191919",
  fontWeight: 400,
  padding: "10px 16px",
  "&:hover": {
    backgroundColor: "rgba(242, 242, 242, 0.77)",
    color: "#333333",
  },
  "&.Mui-selected": {
    backgroundColor: "rgba(242, 242, 242, 0.77)",
    color: "#333333",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "rgba(242, 242, 242, 0.77)",
    },
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

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "statusType",
})(({ statusType }) => ({
  fontSize: "12px",
  fontWeight: 600,
  height: "28px",
  borderRadius: "6px",
  backgroundColor: statusType === "paid" ? "#E8F5E9" : "#FFF3E0",
  color: statusType === "paid" ? "#2E7D32" : "#F57C00",
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
  backgroundColor: "#F5F5F5",
  borderRadius: "0px 0px 8px 8px",
  position: "relative",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    gap: "12px",
    padding: "16px",
  },
});

const PaginationText = styled(Typography)({
  fontSize: "13px",
  fontWeight: 500,
  color: "#666666",
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
  borderRadius: "6px",
  fontSize: "13px",
  fontWeight: 500,
  cursor: "pointer",
  backgroundColor: active ? "#B38349" : "#FFFFFF",
  color: active ? "#FFFFFF" : "#666666",
  border: "1px solid #E0E0E0",
  "&:hover": {
    backgroundColor: active ? "#9A7340" : "#F9F9F9",
    borderColor: "#B8936D",
  },
  "@media (max-width: 480px)": {
    width: "28px",
    height: "28px",
    fontSize: "12px",
  },
}));

const NavButton = styled(Box)({
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
  color: "#666666",
  border: "1px solid #E0E0E0",
  borderRadius: "6px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#F9F9F9",
    borderColor: "#B8936D",
  },
  "&.disabled": {
    backgroundColor: "#F5F5F5",
    color: "#CCCCCC",
    cursor: "not-allowed",
    opacity: 0.6,
  },
  "@media (max-width: 480px)": {
    width: "28px",
    height: "28px",
  },
});

// ==================== SAMPLE DATA ====================

const paymentsData = [
  {
    id: 1,
    name: "Anna Hathaway",
    avatar: "/avatar1.jpg",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    transactionId: "TI_jbjbjbNJBKB81234Oo080756657ii",
    status: "paid",
  },
  {
    id: 2,
    name: "Tim Cook",
    avatar: "/avatar2.jpg",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    transactionId: "TI_jbjbjbNJBKB81234Oo080756657ii",
    status: "paid",
  },
  {
    id: 3,
    name: "Wolfrost Hentag",
    avatar: "/avatar3.jpg",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    transactionId: "TI_jbjbjbNJBKB81234Oo080756657ii",
    status: "failed",
  },
  {
    id: 4,
    name: "Jane Foster",
    avatar: "/avatar4.jpg",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    transactionId: "TI_jbjbjbNJBKB81234Oo080756657ii",
    status: "failed",
  },
  {
    id: 5,
    name: "Peter Griffin",
    avatar: "/avatar5.jpg",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    transactionId: "TI_jbjbjbNJBKB81234Oo080756657ii",
    status: "failed",
  },
  {
    id: 6,
    name: "Wayne Bruce",
    avatar: "/avatar6.jpg",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    transactionId: "TI_jbjbjbNJBKB81234Oo080756657ii",
    status: "paid",
  },
  {
    id: 7,
    name: "Steffy Glitter",
    avatar: "/avatar7.jpg",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    transactionId: "TI_jbjbjbNJBKB81234Oo080756657ii",
    status: "paid",
  },
  {
    id: 8,
    name: "Westhamtan",
    avatar: "/avatar8.jpg",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    transactionId: "TI_jbjbjbNJBKB81234Oo080756657ii",
    status: "paid",
  },
];

// ==================== COMPONENT ====================

const PaymentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const totalPages = Math.ceil(paymentsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = paymentsData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Title Section */}
      <TitleSection>
        <MainTitle>Payments</MainTitle>
        <SubTitle>List of student payments</SubTitle>
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

          <FilterContainer>
            <StyledFormControl size="small">
              <Select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#999999" }}>Filter by</span>;
                  }
                  return selected;
                }}
              >
                <StyledMenuItem value="all">All Payments</StyledMenuItem>
                <StyledMenuItem value="paid">Paid</StyledMenuItem>
                <StyledMenuItem value="failed">Failed</StyledMenuItem>
              </Select>
            </StyledFormControl>
          </FilterContainer>
        </HeaderSection>

        {/* Table Section */}
        <ContentCard>
          <StyledTableContainer>
            <Table sx={{ minWidth: 1100 }}>
              <StyledTableHead>
                <TableRow>
                  <StyledTableHeadCell sx={{ minWidth: "180px" }}>
                    {`Participant's Name`}
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "200px" }}>
                    Course
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "250px" }}>
                    Session
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "220px" }}>
                    Transaction ID
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "120px" }}>
                    Status
                  </StyledTableHeadCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {currentData.map((payment) => (
                  <StyledTableRow key={payment.id}>
                    <StyledTableCell>
                      <ParticipantCell>
                        <Avatar
                          src={payment.avatar}
                          alt={payment.name}
                          sx={{ width: 28, height: 28, borderRadius: "6px" }}
                        >
                          {payment.name.charAt(0)}
                        </Avatar>
                        <ParticipantName>{payment.name}</ParticipantName>
                      </ParticipantCell>
                    </StyledTableCell>
                    <StyledTableCell>{payment.course}</StyledTableCell>
                    <StyledTableCell>{payment.session}</StyledTableCell>
                    <StyledTableCell>{payment.transactionId}</StyledTableCell>
                    <StyledTableCell>
                      <StatusChip
                        label={payment.status === "paid" ? "Paid" : "Failed"}
                        statusType={payment.status}
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
                className={currentPage === 1 ? "disabled" : ""}
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
                className={currentPage === totalPages ? "disabled" : ""}
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

export default PaymentsPage;
