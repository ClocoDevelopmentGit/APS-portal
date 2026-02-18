"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
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
  Switch,
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import dayjs from "dayjs";
import "./MarkAttendance.css";
import AttendanceConfirmationModal from "./components/AttendanceConfirmationModal";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/navigation";

// ==================== PICKER THEME ====================

const pickerTheme = createTheme({
  palette: {
    primary: {
      main: "#AE9964",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#B38349",
            color: "white",
          },
          "&.Mui-selected": {
            backgroundColor: "#AE9964",
            color: "white",
          },
        },
      },
    },
    MuiClockNumber: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#B38349",
            color: "white",
          },
          "&.Mui-selected": {
            backgroundColor: "#AE9964",
            color: "white",
          },
        },
      },
    },
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#AE9964",
          color: "white",
        },
      },
    },
  },
});

// ==================== STYLED COMPONENTS ====================

const TitleSection = styled(Box)({
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  gap: "20px",
});

const BackButton = styled(Button)({
  backgroundColor: "#E9E9E9",
  color: "#635738",
  fontSize: "10px",
  fontWeight: 600,
  textTransform: "none",
  padding: "5px 20px",
  borderRadius: "12px",
  "&:hover": {
    backgroundColor: "#E8E8E8",
  },
});

const TitleContent = styled(Box)({
  flex: 1,
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
  fontWeight: 500,
  color: "#635738",
  lineHeight: "20px",
});

const PageContainer = styled(Box)({
  boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  borderRadius: "8px",
});

const HeaderSection = styled(Box)({
  backgroundColor: "#FFFFFF",
  borderRadius: "8px 8px 0 0",
  padding: "20px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  flexWrap: "wrap",
  gap: "12px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  "@media (max-width: 968px)": {
    flexDirection: "column",
    alignItems: "stretch",
  },
});

const HeaderTitleSection = styled(Box)({
  flex: 1,
});

const HeaderTitle = styled(Typography)({
  fontSize: "12px",
  fontWeight: 700,
  color: "#644C10",
  marginBottom: "4px",
});

const HeaderSubtitle = styled(Typography)({
  fontSize: "11px",
  fontWeight: 400,
  color: "#8F8F8F",
});

const FiltersContainer = styled(Box)({
  display: "flex",
  gap: "12px",
  alignItems: "center",
  flexWrap: "wrap",
  "@media (max-width: 968px)": {
    justifyContent: "flex-start",
    width: "100%",
  },
});

const FilterButtonsContainer = styled(Box)({
  backgroundColor: "#F7F7F7",
  borderRadius: "8px",
  padding: "4px",
  display: "inline-flex",
  gap: "4px",
});

const FilterButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }) => ({
  backgroundColor: active ? "#FFFFFF" : "transparent",
  color: "#191919",
  fontSize: "12px",
  fontWeight: 500,
  textTransform: "none",
  padding: "6px 16px",
  borderRadius: "6px",
  border: "none",
  boxShadow: active ? "0 1px 3px rgba(0, 0, 0, 0.1)" : "none",
  minWidth: "auto",
  "&:hover": {
    backgroundColor: active ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)",
  },
}));

const StyledDatePicker = styled(DatePicker)({
  width: "170px",
  "& .MuiInputBase-input": {
    padding: "10px 14px",
    fontSize: "12px",
    fontWeight: 600,
    color: "#433205",
  },
  "& .MuiSvgIcon-root": {
    color: "#2A3547",
  },
});

const RefreshButton = styled(IconButton)({
  width: "40px",
  height: "40px",
  border: "1px solid #E0E0E0",
  borderRadius: "12px",
  backgroundColor: "#F8F8F8",
  boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.25)",
  "&:hover": {
    backgroundColor: "#F9F9F9",
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
  textAlign: "center",
  "&:first-of-type": {
    textAlign: "left",
    position: "sticky",
    left: 0,
    zIndex: 2,
    borderRight: "1px solid #C3C0B9",
    backgroundColor: "#d8d5cd",
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
  textAlign: "center",
  "&:first-of-type": {
    textAlign: "left",
    position: "sticky",
    left: 0,
    backgroundColor: "#FFFFFF",
    zIndex: 1,
    borderRight: "1px solid #C3C0B9",
  },
});

const StudentNameCell = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const StudentName = styled(Typography)({
  fontSize: "12px",
  fontWeight: 600,
  color: "#433205",
});

const AttendanceIcon = styled(Box, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ status }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: status === "present" ? "#4CAF50" : "#E85A4F",
}));

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

const SaveButton = styled(Button)({
  backgroundColor: "#FFFFFF",
  color: "#433205",
  fontSize: "13px",
  fontWeight: 600,
  textTransform: "none",
  padding: "5px 24px",
  borderRadius: "8px",
  border: "1px solid #D0D0D0",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  position: "absolute",
  right: "20px",
  "&:hover": {
    backgroundColor: "#F9F9F9",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
  },
  "@media (max-width: 768px)": {
    position: "static",
    order: 3,
    width: "100%",
  },
});

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

const attendanceData = [
  {
    id: 1,
    name: "Anna Hathaway",
    avatar: "/avatar1.jpg",
    attendance: {
      "2 Feb": false,
      "9 Feb": true,
      "16 Feb": true,
      "23 Feb": true,
      "1 Mar": true,
      "8 Mar": true,
    },
    todayPresent: true,
  },
  {
    id: 2,
    name: "Anna Hathaway",
    avatar: "/avatar2.jpg",
    attendance: {
      "2 Feb": false,
      "9 Feb": true,
      "16 Feb": true,
      "23 Feb": true,
      "1 Mar": true,
      "8 Mar": true,
    },
    todayPresent: false,
  },
  {
    id: 3,
    name: "Anna Hathaway",
    avatar: "/avatar3.jpg",
    attendance: {
      "2 Feb": false,
      "9 Feb": true,
      "16 Feb": true,
      "23 Feb": true,
      "1 Mar": true,
      "8 Mar": true,
    },
    todayPresent: true,
  },
  {
    id: 4,
    name: "Anna Hathaway",
    avatar: "/avatar4.jpg",
    attendance: {
      "2 Feb": false,
      "9 Feb": true,
      "16 Feb": true,
      "23 Feb": true,
      "1 Mar": true,
      "8 Mar": true,
    },
    todayPresent: true,
  },
  {
    id: 5,
    name: "Anna Hathaway",
    avatar: "/avatar5.jpg",
    attendance: {
      "2 Feb": false,
      "9 Feb": true,
      "16 Feb": true,
      "23 Feb": true,
      "1 Mar": true,
      "8 Mar": true,
    },
    todayPresent: true,
  },
  {
    id: 6,
    name: "Anna Hathaway",
    avatar: "/avatar6.jpg",
    attendance: {
      "2 Feb": false,
      "9 Feb": true,
      "16 Feb": true,
      "23 Feb": true,
      "1 Mar": true,
      "8 Mar": true,
    },
    todayPresent: false,
  },
  {
    id: 7,
    name: "Anna Hathaway",
    avatar: "/avatar7.jpg",
    attendance: {
      "2 Feb": false,
      "9 Feb": true,
      "16 Feb": true,
      "23 Feb": true,
      "1 Mar": true,
      "8 Mar": true,
    },
    todayPresent: true,
  },
  {
    id: 8,
    name: "Anna Hathaway",
    avatar: "/avatar8.jpg",
    attendance: {
      "2 Feb": false,
      "9 Feb": true,
      "16 Feb": true,
      "23 Feb": true,
      "1 Mar": true,
      "8 Mar": true,
    },
    todayPresent: true,
  },
];

const dates = ["2 Feb", "9 Feb", "16 Feb", "23 Feb", "1 Mar", "8 Mar"];

// ==================== COMPONENT ====================

const AttendanceMarkPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("this-week");
  const [students, setStudents] = useState(attendanceData);
  const [selectedDate, setSelectedDate] = useState(dayjs("2026-03-15"));
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(students.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = students.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleToggleAttendance = (studentId) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? { ...student, todayPresent: !student.todayPresent }
          : student,
      ),
    );
  };

  const handleSave = () => {
    setOpenConfirmModal(true);
  };

  const handleRefresh = () => {
    console.log("Refreshing...");
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleConfirmSave = (comments) => {
    console.log("Saving attendance with comments:", comments, students);
    alert("Attendance saved successfully!");
    setOpenConfirmModal(false);
  };

  const absentCount = students.filter((s) => !s.todayPresent).length;
  const presentCount = students.filter((s) => s.todayPresent).length;

  return (
    <ThemeProvider theme={pickerTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* Title Section */}
        <TitleSection>
          <BackButton
            onClick={handleGoBack}
            startIcon={<ArrowBackIcon style={{ width: "13px" }} />}
          >
            Go Back
          </BackButton>
          <TitleContent>
            <MainTitle>Teen Acting (ages13-17)</MainTitle>
            <SubTitle>Select a course to mark student attendance</SubTitle>
          </TitleContent>
        </TitleSection>

        <PageContainer className="mark-attendance">
          {/* Header Section */}
          <HeaderSection>
            <HeaderTitleSection>
              <HeaderTitle>
                Monday - 4:30 PM TO 6:00 PM Batch (Kids 7 to 13)
              </HeaderTitle>
              <HeaderSubtitle>
                This batch is designated for structured instructional delivery
                to students belonging to the 7-13 year age group
              </HeaderSubtitle>
            </HeaderTitleSection>

            <FiltersContainer>
              <FilterButtonsContainer>
                <FilterButton
                  active={activeFilter === "this-week"}
                  onClick={() => setActiveFilter("this-week")}
                >
                  This Week
                </FilterButton>
                <FilterButton
                  active={activeFilter === "this-month"}
                  onClick={() => setActiveFilter("this-month")}
                >
                  This Month
                </FilterButton>
                <FilterButton
                  active={activeFilter === "last-month"}
                  onClick={() => setActiveFilter("last-month")}
                >
                  Last Month
                </FilterButton>
              </FilterButtonsContainer>

              <StyledDatePicker
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                format="DD - MM - YYYY"
                slotProps={{
                  textField: {
                    size: "small",
                    placeholder: "dd - mm - yyyy",
                  },
                  popper: {
                    sx: {
                      "& .MuiPaper-root": {
                        backgroundColor: "#FFF",
                      },
                    },
                  },
                }}
              />

              <RefreshButton onClick={handleRefresh}>
                <RefreshIcon sx={{ fontSize: "20px", color: "#666666" }} />
              </RefreshButton>
            </FiltersContainer>
          </HeaderSection>

          {/* Table Section */}
          <ContentCard>
            <StyledTableContainer>
              <Table sx={{ minWidth: 1000 }}>
                <StyledTableHead>
                  <TableRow>
                    <StyledTableHeadCell sx={{ minWidth: "200px" }}>
                      Student Name
                    </StyledTableHeadCell>
                    {dates.map((date) => (
                      <StyledTableHeadCell
                        key={date}
                        sx={{ minWidth: "100px" }}
                      >
                        {date}
                      </StyledTableHeadCell>
                    ))}
                    <StyledTableHeadCell sx={{ minWidth: "120px" }}>
                      Today, 15 Mar
                    </StyledTableHeadCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {currentData.map((student) => (
                    <StyledTableRow key={student.id}>
                      <StyledTableCell>
                        <StudentNameCell>
                          <Avatar
                            src={student.avatar}
                            alt={student.name}
                            sx={{ width: 28, height: 28, borderRadius: "6px" }}
                          >
                            {student.name.charAt(0)}
                          </Avatar>
                          <StudentName>{student.name}</StudentName>
                        </StudentNameCell>
                      </StyledTableCell>
                      {dates.map((date) => (
                        <StyledTableCell key={date}>
                          <AttendanceIcon
                            status={
                              student.attendance[date] ? "present" : "absent"
                            }
                          >
                            {student.attendance[date] ? (
                              <CheckIcon sx={{ fontSize: "20px" }} />
                            ) : (
                              <CloseIcon sx={{ fontSize: "20px" }} />
                            )}
                          </AttendanceIcon>
                        </StyledTableCell>
                      ))}
                      <StyledTableCell>
                        <StyledSwitch
                          checked={student.todayPresent}
                          onChange={() => handleToggleAttendance(student.id)}
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
              <SaveButton onClick={handleSave}>Save</SaveButton>
            </PaginationContainer>
          </ContentCard>
        </PageContainer>

        <AttendanceConfirmationModal
          open={openConfirmModal}
          onClose={() => setOpenConfirmModal(false)}
          onConfirm={handleConfirmSave}
          absentCount={absentCount}
          presentCount={presentCount}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default AttendanceMarkPage;
