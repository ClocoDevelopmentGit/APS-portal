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
  IconButton,
  Chip,
  Avatar,
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import StudentDetailsPopup from "./StudentDetailsPopup";

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
      //   borderColor: "#AE9964",
      //   borderWidth: "2px",
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

const AddLeadButton = styled(Button)({
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
  fontSize: "13px",
  fontWeight: 500,
  color: "#191919",
});

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "statusType",
})(({ statusType }) => ({
  fontSize: "12px",
  fontWeight: 600,
  height: "28px",
  borderRadius: "6px",
  backgroundColor: statusType === "in-trail" ? "#E8F5E9" : "#FFF3E0",
  color: statusType === "in-trail" ? "#2E7D32" : "#F57C00",
  border: "none",
  "& .MuiChip-label": {
    padding: "0 10px",
  },
}));

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

// ==================== SAMPLE DATA ====================

const leadsData = [
  {
    id: 1,
    name: "Anna Hathaway",
    avatar: "/avatar1.jpg",
    age: 20,
    mobile: "+61 410 345 676",
    email: "annahathaway@gmail.com",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    status: "in-trail",
  },
  {
    id: 2,
    name: "Tim Cook",
    avatar: "/avatar2.jpg",
    age: 18,
    mobile: "+61 410 345 676",
    email: "annahathaway@gmail.com",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    status: "in-trail",
  },
  {
    id: 3,
    name: "Wolfrost Hentag",
    avatar: "/avatar3.jpg",
    age: 25,
    mobile: "+61 410 345 676",
    email: "annahathaway@gmail.com",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    status: "enquired",
  },
  {
    id: 4,
    name: "Jane Foster",
    avatar: "/avatar4.jpg",
    age: 14,
    mobile: "+61 410 345 676",
    email: "annahathaway@gmail.com",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    status: "enquired",
  },
  {
    id: 5,
    name: "Peter Griffin",
    avatar: "/avatar5.jpg",
    age: 12,
    mobile: "+61 410 345 676",
    email: "annahathaway@gmail.com",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    status: "enquired",
  },
  {
    id: 6,
    name: "Wayne Bruce",
    avatar: "/avatar6.jpg",
    age: 21,
    mobile: "+61 410 345 676",
    email: "annahathaway@gmail.com",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    status: "in-trail",
  },
  {
    id: 7,
    name: "Steffy Glitter",
    avatar: "/avatar7.jpg",
    age: 20,
    mobile: "+61 410 345 676",
    email: "annahathaway@gmail.com",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    status: "in-trail",
  },
  {
    id: 8,
    name: "Westhamtan",
    avatar: "/avatar8.jpg",
    age: "9 Years",
    mobile: "+61 410 345 676",
    email: "annahathaway@gmail.com",
    course: "Industry Driven Adults",
    session: "4:45 pm - 7:45 pm, 18 Oct - 6 Oct 2025",
    status: "in-trail",
  },
];

// ==================== COMPONENT ====================

const LeadsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDetailsPopup, setOpenDetailsPopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const itemsPerPage = 8;

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleAddLead = () => {
    setSelectedStudent(null);
    setIsEditMode(false);
    setOpenDetailsPopup(true);
  };

  const handleViewLead = (leadId) => {
    const student = leadsData.find((lead) => lead.id === leadId);
    setSelectedStudent(student);
    setIsEditMode(true);
    setOpenDetailsPopup(true);
  };

  // Calculate pagination
  const totalPages = Math.ceil(leadsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = leadsData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Title Section */}
      <TitleSection>
        <MainTitle>Leads</MainTitle>
        <SubTitle>List of Leads acquired</SubTitle>
      </TitleSection>

      <PageContainer>
        {/* Header Section */}
        <HeaderSection>
          <SearchContainer>
            <StyledTextField
              placeholder="Search student by name or phone number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
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
                <StyledMenuItem value="in-trail">In Trail</StyledMenuItem>
                <StyledMenuItem value="enquired">Enquired</StyledMenuItem>
                <StyledMenuItem value="all">All Leads</StyledMenuItem>
              </Select>
            </StyledFormControl>

            <AddLeadButton onClick={handleAddLead}>
              + Add New lead
            </AddLeadButton>
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
                  <StyledTableHeadCell sx={{ minWidth: "60px" }}>
                    Age
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "140px" }}>
                    Mobile Number
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "200px" }}>
                    Mail ID
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "180px" }}>
                    Course
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "230px" }}>
                    Session
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "100px" }}>
                    Status
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "80px" }}>
                    Action
                  </StyledTableHeadCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {currentData.map((lead) => (
                  <StyledTableRow key={lead.id}>
                    <StyledTableCell>
                      <ParticipantCell>
                        <Avatar
                          src={lead.avatar}
                          alt={lead.name}
                          sx={{ width: 32, height: 32 }}
                        >
                          {lead.name.charAt(0)}
                        </Avatar>
                        <ParticipantName>{lead.name}</ParticipantName>
                      </ParticipantCell>
                    </StyledTableCell>
                    <StyledTableCell>{lead.age}</StyledTableCell>
                    <StyledTableCell>{lead.mobile}</StyledTableCell>
                    <StyledTableCell>{lead.email}</StyledTableCell>
                    <StyledTableCell>{lead.course}</StyledTableCell>
                    <StyledTableCell>{lead.session}</StyledTableCell>
                    <StyledTableCell>
                      <StatusChip
                        label={
                          lead.status === "in-trail" ? "In trail" : "Enquired"
                        }
                        statusType={lead.status}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <ActionIconButton onClick={() => handleViewLead(lead.id)}>
                        <VisibilityOutlinedIcon sx={{ fontSize: "18px" }} />
                      </ActionIconButton>
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

      <StudentDetailsPopup
        open={openDetailsPopup}
        onClose={() => setOpenDetailsPopup(false)}
        studentData={selectedStudent}
        isEditMode={isEditMode}
      />
    </>
  );
};

export default LeadsPage;
