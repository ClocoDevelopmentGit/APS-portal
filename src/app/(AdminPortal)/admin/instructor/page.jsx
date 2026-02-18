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
  Switch,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import { FaUserEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import InstructorPopup from "./InstructorPopup";

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

const AddInstructorButton = styled(Button)({
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

const ShortBioText = styled(Typography)({
  fontSize: "12px",
  fontWeight: 600,
  color: "#464646",
  maxWidth: "300px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
});

const ProfilePhotoCell = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledAvatar = styled(Avatar)({
  width: "50px",
  height: "50px",
  borderRadius: "8px",
  backgroundColor: "#B38349",
  fontSize: "18px",
  fontWeight: 600,
});

const StyledSwitch = styled(Switch)({
  width: 36,
  height: 20,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#0DB089",
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 16,
    height: 16,
  },
  "& .MuiSwitch-track": {
    borderRadius: 20 / 2,
    backgroundColor: "#EB3223",
    opacity: 1,
  },
});

const ActionIconButton = styled(IconButton)({
  width: "40px",
  height: "40px",
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

const instructorsData = [
  {
    id: 1,
    firstName: "Naomi",
    lastName: "Derrick",
    profilePhoto: "",
    shortBio:
      "One of the directors of APS and Smallfry children's talent agency...",
    show: true,
  },
  {
    id: 2,
    firstName: "Harrison",
    lastName: "Lane",
    profilePhoto: "",
    shortBio: "Harrison Lane is a Melbourne based Director and Actor,...",
    show: true,
  },
  {
    id: 3,
    firstName: "Jasper",
    lastName: "Bagg",
    profilePhoto: "",
    shortBio: "Born in the USA, to a British father, and raised Down Under,...",
    show: true,
  },
  {
    id: 4,
    firstName: "Robyn",
    lastName: "Clancy",
    profilePhoto: "",
    shortBio:
      "Robyn Clancy has been involved in theatre, film, and television...",
    show: true,
  },
];

// ==================== COMPONENT ====================

const InstructorsPage = () => {
  const router = useRouter();
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [instructors, setInstructors] = useState(instructorsData);
  const itemsPerPage = 8;

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleAddInstructor = () => {
    setSelectedInstructor(null);
    setIsEditMode(false);
    setOpenPopup(true);
  };

  const handleToggleShow = (instructorId) => {
    setInstructors((prev) =>
      prev.map((instructor) =>
        instructor.id === instructorId
          ? { ...instructor, show: !instructor.show }
          : instructor,
      ),
    );
  };

  const handleEditInstructor = (instructorId) => {
    const instructor = instructors.find((i) => i.id === instructorId);
    setSelectedInstructor(instructor);
    setIsEditMode(true);
    setOpenPopup(true);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Calculate pagination
  const totalPages = Math.ceil(instructors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = instructors.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Title Section */}
      <TitleSection>
        <MainTitle>Instructors</MainTitle>
        <SubTitle>List of instructors</SubTitle>
      </TitleSection>

      <PageContainer>
        {/* Header Section */}
        <HeaderSection>
          <SearchContainer>
            <StyledTextField
              placeholder="Search instructor by name"
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

          <AddInstructorButton onClick={handleAddInstructor}>
            + Add Instructor
          </AddInstructorButton>
        </HeaderSection>

        {/* Table Section */}
        <ContentCard>
          <StyledTableContainer>
            <Table sx={{ minWidth: 1000 }}>
              <StyledTableHead>
                <TableRow>
                  <StyledTableHeadCell sx={{ minWidth: "120px" }}>
                    Profile Photo
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "150px" }}>
                    First Name
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "150px" }}>
                    Last Name
                  </StyledTableHeadCell>

                  <StyledTableHeadCell sx={{ minWidth: "350px" }}>
                    Short Bio
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "100px" }}>
                    Show
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{ minWidth: "100px" }}>
                    Actions
                  </StyledTableHeadCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {currentData.map((instructor) => (
                  <StyledTableRow key={instructor.id}>
                    <StyledTableCell>
                      <ProfilePhotoCell>
                        <StyledAvatar
                          src={instructor.profilePhoto || undefined}
                        >
                          {!instructor.profilePhoto &&
                            getInitials(
                              instructor.firstName,
                              instructor.lastName,
                            )}
                        </StyledAvatar>
                      </ProfilePhotoCell>
                    </StyledTableCell>
                    <StyledTableCell>{instructor.firstName}</StyledTableCell>
                    <StyledTableCell>{instructor.lastName}</StyledTableCell>

                    <StyledTableCell>
                      <ShortBioText>{instructor.shortBio}</ShortBioText>
                    </StyledTableCell>
                    <StyledTableCell>
                      <StyledSwitch
                        checked={instructor.show}
                        onChange={() => handleToggleShow(instructor.id)}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <ActionIconButton
                        onClick={() => handleEditInstructor(instructor.id)}
                      >
                        <FaUserEdit size={20} />
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

      <InstructorPopup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        instructorData={selectedInstructor}
        isEditMode={isEditMode}
      />
    </>
  );
};

export default InstructorsPage;
