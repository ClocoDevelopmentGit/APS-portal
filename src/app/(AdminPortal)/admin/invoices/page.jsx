"use client";
import React, { useState, useEffect } from "react";
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
  IconButton,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import { FaFileArrowDown } from "react-icons/fa6";
import DownloadReceiptPopup from "./DownloadReceiptPopup";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInvoices } from "@/redux/slices/invoiceSlice";
import Loading from "@/app/loading";

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

const ActionIconButton = styled(IconButton)({
  width: "32px",
  height: "32px",
  color: "#666666",
  "&:hover": {
    backgroundColor: "#F5F5F5",
    color: "#333333",
  },
});

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

const NavButton = styled(IconButton)({
  width: "32px",
  height: "32px",
  backgroundColor: "#FFFFFF",
  color: "#666666",
  border: "1px solid #E0E0E0",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: "#F9F9F9",
    borderColor: "#B8936D",
  },
  "&:disabled": {
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

// ==================== HELPERS ====================

/**
 * Maps the API invoice response to the shape the UI expects.
 * Adjust field mappings here if your API changes.
 */
const mapInvoiceToUI = (inv) => ({
  id: inv.id,
  name: `${inv.user?.firstName ?? ""} ${inv.user?.lastName ?? ""}`.trim(),
  avatar: null, // API doesn't provide avatars
  mobile: inv.user?.phone ?? "—",
  email: inv.user?.email ?? "—",
  // No course name in response — use enrollmentType + bookingId as a readable fallback
  course: `${inv.payment?.enrollmentType ?? "—"} · ${inv.payment?.bookingId ?? ""}`,
  transactionId: inv.payment?.transactionId ?? "—",
  paymentMethod: inv.payment?.paymentMethod ?? "—",
  totalAmount: inv.payment?.totalAmount ?? "—",
  paymentStatus: inv.payment?.paymentStatus ?? "—",
  enrolledAt: inv.userCourse?.enrollment ?? null,
  rawData: inv, // keep original for download popup
});

const filterByDate = (invoices, filterValue) => {
  if (!filterValue) return invoices;
  const now = new Date();

  return invoices.filter((inv) => {
    if (!inv.enrolledAt) return true;
    const date = new Date(inv.enrolledAt);

    if (filterValue === "thisMonth") {
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }
    if (filterValue === "lastMonth") {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return (
        date.getMonth() === lastMonth.getMonth() &&
        date.getFullYear() === lastMonth.getFullYear()
      );
    }
    if (filterValue === "thisYear") {
      return date.getFullYear() === now.getFullYear();
    }
    return true; // "all"
  });
};

// ==================== COMPONENT ====================

const InvoicesPage = () => {
  const dispatch = useDispatch();
  const { invoices, loading, error } = useSelector((state) => state.invoice);

  const [invoicesList, setInvoicesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDownloadPopup, setOpenDownloadPopup] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const itemsPerPage = 8;

  // Fetch invoices on mount
  useEffect(() => {
    dispatch(fetchAllInvoices());
  }, [dispatch]);

  // Sync Redux state → local mapped list
  useEffect(() => {
    if (invoices && invoices.length > 0) {
      setInvoicesList(invoices.map(mapInvoiceToUI));
    } else {
      // Fallback: try localStorage (populated by the thunk)
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem("allInvoices");
        if (cached) {
          const parsed = JSON.parse(cached);
          setInvoicesList(parsed.map(mapInvoiceToUI));
        }
      }
    }
  }, [invoices]);

  // ---- Filtering & Search ----
  const filtered = filterByDate(invoicesList, filterBy).filter((inv) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      inv.name.toLowerCase().includes(q) ||
      inv.mobile.toLowerCase().includes(q) ||
      inv.email.toLowerCase().includes(q)
    );
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterBy]);

  // ---- Pagination ----
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleViewInvoice = (invoiceId) => {
    console.log("Viewing invoice:", invoiceId);
  };

  const handleDownloadInvoice = (invoiceId) => {
    const invoice = invoicesList.find((inv) => inv.id === invoiceId);
    setSelectedInvoice(invoice);
    setOpenDownloadPopup(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading && invoicesList.length === 0) {
    return <Loading overlay={false} />;
  }

  return (
    <>
      {/* Title Section */}
      <TitleSection>
        <MainTitle>Invoice</MainTitle>
        <SubTitle>List of Invoice</SubTitle>
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
                onChange={(e) => {
                  setFilterBy(e.target.value);
                  setCurrentPage(1);
                }}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#999999" }}>Filter by</span>;
                  }
                  return selected === "thisMonth"
                    ? "This Month"
                    : selected === "lastMonth"
                      ? "Last Month"
                      : selected === "thisYear"
                        ? "This Year"
                        : "All Time";
                }}
              >
                <StyledMenuItem value="thisMonth">This Month</StyledMenuItem>
                <StyledMenuItem value="lastMonth">Last Month</StyledMenuItem>
                <StyledMenuItem value="thisYear">This Year</StyledMenuItem>
                <StyledMenuItem value="all">All Time</StyledMenuItem>
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
                  <StyledTableHeadCell sx={{ minWidth: "140px" }}>
                    Mobile Number
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "200px" }}>
                    Mail ID
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "250px" }}>
                    Course
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "150px" }}>
                    Transaction ID
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "140px" }}>
                    Payment Method
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "100px" }}>
                    Action
                  </StyledTableHeadCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {currentData.length > 0 ? (
                  currentData.map((invoice) => (
                    <StyledTableRow key={invoice.id}>
                      <StyledTableCell>
                        <ParticipantCell>
                          <Avatar
                            src={invoice.avatar}
                            alt={invoice.name}
                            sx={{ width: 28, height: 28, borderRadius: "6px" }}
                          >
                            {invoice.name.charAt(0)}
                          </Avatar>
                          <ParticipantName>{invoice.name}</ParticipantName>
                        </ParticipantCell>
                      </StyledTableCell>
                      <StyledTableCell>{invoice.mobile}</StyledTableCell>
                      <StyledTableCell>{invoice.email}</StyledTableCell>
                      <StyledTableCell>{invoice.course}</StyledTableCell>
                      <StyledTableCell>{invoice.transactionId}</StyledTableCell>
                      <StyledTableCell>{invoice.paymentMethod}</StyledTableCell>
                      <StyledTableCell>
                        <Box sx={{ display: "flex", gap: "5px" }}>
                          <ActionIconButton
                            onClick={() => handleViewInvoice(invoice.id)}
                          >
                            <VisibilityOutlinedIcon sx={{ fontSize: "18px" }} />
                          </ActionIconButton>
                          <ActionIconButton
                            onClick={() => handleDownloadInvoice(invoice.id)}
                          >
                            <FaFileArrowDown size={18} />
                          </ActionIconButton>
                        </Box>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell
                      colSpan={7}
                      align="center"
                      sx={{ padding: "40px", color: "#999" }}
                    >
                      {error ? `Error: ${error}` : "No invoices found"}
                    </StyledTableCell>
                  </StyledTableRow>
                )}
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

      <DownloadReceiptPopup
        open={openDownloadPopup}
        onClose={() => setOpenDownloadPopup(false)}
        invoiceData={selectedInvoice}
      />
    </>
  );
};

export default InvoicesPage;