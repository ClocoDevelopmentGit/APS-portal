"use client";
import React, { use, useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { fetchAllStudents } from "@/redux/slices/studentSlice";

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


// ==================== COMPONENT ====================

const ManualEnrollmentPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const itemsPerPage = 10;

  const calculateAge = (dob) => {
  if (!dob) return "-";
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};


  useEffect(() => {
    const fetchEnrollmentData = async () => {
      setLoading(true);
      try {
        // const response = await dispatch(fetchAllStudents());
        
        const response = await dispatch(fetchAllStudents()).unwrap();
            const formattedData = response.map((student) => {
          const courses = student.userCourses?.map((uc) => {
            const classData = uc.class;

            const courseTitle = classData?.course?.title || "-";

            const session =
              classData?.startDate && classData?.endDate
                ? `${new Date(classData.startDate).toLocaleDateString()} - ${new Date(classData.endDate).toLocaleDateString()}`
                : "-";

            
            const isPaid = student.invoices?.some(
              (invoice) => { 
                return invoice.userCourseId === uc.id;
              }
            );

            return {
              course: courseTitle,
              session,
              paymentStatus: isPaid ? "Paid" : "Unpaid",
            };
          });

          return {
            id: student.id,
            name: `${student.firstName} ${student.lastName}`,
            age: calculateAge(student.dob),
            mobile: student.phone,
            courses, // <-- array of course info
          };
        });
        console.log("Fetched enrollment data:", formattedData);
        setEnrollmentData(formattedData);
        // setEnrollmentData(response.payload);
      } catch (error) {
        console.error("Error fetching enrollment data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollmentData();
  }, [dispatch]);

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
        <ContentCard>
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
                {/* Student Info */}
                <StyledTableCell>
                  {row.name}
                </StyledTableCell>

                <StyledTableCell>
                  {row.age}
                </StyledTableCell>

                <StyledTableCell>
                  {row.mobile}
                </StyledTableCell>

                {/* Courses Column */}
                <StyledTableCell>
                  {row.courses && row.courses.length > 0 ? (
                    row.courses.map((courseItem, index) => (
                      <div key={index} style={{ marginBottom: "6px" }}>
                        {courseItem.course}
                      </div>
                    ))
                  ) : (
                    "-"
                  )}
                </StyledTableCell>

                {/* Sessions Column */}
                <StyledTableCell>
                  {row.courses && row.courses.length > 0 ? (
                    row.courses.map((courseItem, index) => (
                      <div key={index} style={{ marginBottom: "6px" }}>
                        {courseItem.session}
                      </div>
                    ))
                  ) : (
                    "-"
                  )}
                </StyledTableCell>

                {/* Payment Column */}
                <StyledTableCell>
                  {row.courses && row.courses.length > 0 ? (
                    row.courses.map((courseItem, index) => (
                      <div key={index} style={{ marginBottom: "6px" }}>
                        <PaymentChip
                          label={courseItem.paymentStatus}
                          status={courseItem.paymentStatus}
                        />
                      </div>
                    ))
                  ) : (
                    <PaymentChip label="Unpaid" status="Unpaid" />
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          </Table>
        </StyledTableContainer>
        <PaginationContainer>
          <PaginationButtons>
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
