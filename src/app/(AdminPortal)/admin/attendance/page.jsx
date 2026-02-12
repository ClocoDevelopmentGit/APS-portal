"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
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
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import dayjs from "dayjs";
import "./Styles.css";
import CheckIcon from "@mui/icons-material/Check";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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
    // === Calendar Day Hover Color ===
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

    // === Time Clock Hour/Minute Hover Color ===
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
  padding: "16px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "16px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  "@media (max-width: 968px)": {
    flexDirection: "column",
    alignItems: "stretch",
  },
});

const HeaderTitle = styled(Typography)({
  fontSize: "13px",
  fontWeight: 600,
  color: "#644C10",
  lineHeight: "24px",
});

const FiltersContainer = styled(Box)({
  display: "flex",
  gap: "12px",
  alignItems: "center",
  flex: 1,
  justifyContent: "flex-end",
  flexWrap: "wrap",
  "@media (max-width: 968px)": {
    justifyContent: "flex-start",
    width: "100%",
  },
});

const StyledFormControl = styled(FormControl)({
  minWidth: "150px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "9px",
    backgroundColor: "#F2F2F2",
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
      borderColor: "#AE9964",
      borderWidth: "2px",
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
  color: "#181818",
  fontWeight: 400,
  padding: "10px 16px",
  "&:hover": {
    backgroundColor: "#FEF7EA",
  },
  "&.Mui-selected": {
    backgroundColor: "#FEF7EA",
    color: "#B38349",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "#FEF7EA",
    },
  },
});

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

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ status }) => ({
  fontSize: "12px",
  fontWeight: 600,
  height: "35px",
  borderRadius: "8px",
  backgroundColor:
    status === "completed"
      ? "#CBF2B1"
      : status === "on-process"
        ? "#FFF3CE"
        : "#EDEDED",
  color:
    status === "completed"
      ? "#3A8C03"
      : status === "on-process"
        ? "#B88D01"
        : "#8A8A8A",
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
    borderColor: "#644C10",
  },
  "&:disabled": {
    backgroundColor: "#e0e0e0",
    color: "#999999",
    cursor: "not-allowed",
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
    className: "Kids Acting (Ages 7 - 12)",
    time: "09:00 AM - 10:00 AM",
    location: "Ringwood",
    instructor: "Sarah Mitchell",
    students: 10,
    attendance: "8 Present, 2 Absent",
    status: "completed",
  },
  {
    id: 2,
    className: "Musical Theatre - Kids",
    time: "09:00 AM - 10:00 AM",
    location: "Ringwood",
    instructor: "Sarah Mitchell",
    students: 10,
    attendance: "8 Present, 2 Absent",
    status: "completed",
  },
  {
    id: 3,
    className: "Adult Acting (18+)",
    time: "09:00 AM - 10:00 AM",
    location: "Ringwood",
    instructor: "Sarah Mitchell",
    students: 10,
    attendance: "8 Present, 2 Absent",
    status: "on-process",
  },
  {
    id: 4,
    className: "Teens Acting (13-17)",
    time: "09:00 AM - 10:00 AM",
    location: "Ringwood",
    instructor: "Sarah Mitchell",
    students: 10,
    attendance: "8 Present, 2 Absent",
    status: "on-process",
  },
  {
    id: 5,
    className: "Teens Acting (Ages 13-17)",
    time: "09:00 AM - 10:00 AM",
    location: "Ringwood",
    instructor: "Sarah Mitchell",
    students: 10,
    attendance: "8 Present, 2 Absent",
    status: "on-process",
  },
  {
    id: 6,
    className: "Adult Acting (18+)",
    time: "09:00 AM - 10:00 AM",
    location: "Ringwood",
    instructor: "Sarah Mitchell",
    students: 10,
    attendance: "8 Present, 2 Absent",
    status: "yet-to-start",
  },
  {
    id: 7,
    className: "Musical Theatre - Teens",
    time: "09:00 AM - 10:00 AM",
    location: "Ringwood",
    instructor: "Sarah Mitchell",
    students: 10,
    attendance: "8 Present, 2 Absent",
    status: "yet-to-start",
  },
  {
    id: 8,
    className: "Adult Acting (18+)",
    time: "09:00 AM - 10:00 AM",
    location: "Ringwood",
    instructor: "Sarah Mitchell",
    students: 10,
    attendance: "8 Present, 2 Absent",
    status: "yet-to-start",
  },
  {
    id: 9,
    className: "Junior Kids Acting",
    time: "10:30 AM - 11:30 AM",
    location: "Moorabbin",
    instructor: "Harrison Lane",
    students: 12,
    attendance: "10 Present, 2 Absent",
    status: "completed",
  },
  {
    id: 10,
    className: "Senior Kids Musical Theatre",
    time: "11:00 AM - 12:00 PM",
    location: "Carlton",
    instructor: "Emma Davis",
    students: 15,
    attendance: "12 Present, 3 Absent",
    status: "on-process",
  },
  {
    id: 11,
    className: "Kinder Kids Acting",
    time: "01:00 PM - 02:00 PM",
    location: "Ringwood",
    instructor: "Sarah Mitchell",
    students: 8,
    attendance: "6 Present, 2 Absent",
    status: "yet-to-start",
  },
  {
    id: 12,
    className: "Teens Industry Driven",
    time: "02:00 PM - 03:30 PM",
    location: "Moorabbin",
    instructor: "Harrison Lane",
    students: 14,
    attendance: "11 Present, 3 Absent",
    status: "completed",
  },
  {
    id: 13,
    className: "Adult Musical Theatre",
    time: "03:00 PM - 04:30 PM",
    location: "Carlton",
    instructor: "Emma Davis",
    students: 10,
    attendance: "9 Present, 1 Absent",
    status: "on-process",
  },
  {
    id: 14,
    className: "Kids Screen Acting",
    time: "04:00 PM - 05:00 PM",
    location: "Ringwood",
    instructor: "Sarah Mitchell",
    students: 12,
    attendance: "10 Present, 2 Absent",
    status: "yet-to-start",
  },
  {
    id: 15,
    className: "Teens Voice & Speech",
    time: "05:00 PM - 06:00 PM",
    location: "Moorabbin",
    instructor: "Harrison Lane",
    students: 10,
    attendance: "8 Present, 2 Absent",
    status: "completed",
  },
  {
    id: 16,
    className: "Musical Theatre - Adults",
    time: "06:00 PM - 07:30 PM",
    location: "Carlton",
    instructor: "Emma Davis",
    students: 16,
    attendance: "14 Present, 2 Absent",
    status: "on-process",
  },
  {
    id: 17,
    className: "Kids Improvisation",
    time: "09:30 AM - 10:30 AM",
    location: "Ringwood",
    instructor: "Sarah Mitchell",
    students: 11,
    attendance: "9 Present, 2 Absent",
    status: "yet-to-start",
  },
  {
    id: 18,
    className: "Teens Audition Techniques",
    time: "11:00 AM - 12:30 PM",
    location: "Moorabbin",
    instructor: "Harrison Lane",
    students: 13,
    attendance: "11 Present, 2 Absent",
    status: "completed",
  },
];

// ==================== COMPONENT ====================

const AttendancePage = () => {
  const [location, setLocation] = useState("");
  const [instructor, setInstructor] = useState("");
  const [status, setStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs("2026-01-29"));
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleViewAttendance = (classId) => {
    console.log("View attendance for class:", classId);
  };

  const handleMarkAttendance = (classId) => {
    console.log("Mark attendance for class:", classId);
  };

  // Calculate pagination
  const totalPages = Math.ceil(attendanceData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = attendanceData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <ThemeProvider theme={pickerTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* Title Section */}
        <TitleSection>
          <MainTitle>Staff Attendance Management</MainTitle>
          <SubTitle>Select a course to mark student attendance</SubTitle>
        </TitleSection>

        <PageContainer className="attendance-page">
          {/* Header Section */}
          <HeaderSection>
            <HeaderTitle>
              Classes for {selectedDate.format("dddd, MMMM DD, YYYY")}
            </HeaderTitle>

            <FiltersContainer>
              <StyledFormControl size="small">
                <Select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <span style={{ color: "#757575" }}>
                          Select Location
                        </span>
                      );
                    }
                    return selected;
                  }}
                >
                  <StyledMenuItem value="ringwood">Ringwood</StyledMenuItem>
                  <StyledMenuItem value="moorabbin">Moorabbin</StyledMenuItem>
                  <StyledMenuItem value="carlton">Carlton</StyledMenuItem>
                </Select>
              </StyledFormControl>

              <StyledFormControl size="small">
                <Select
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <span style={{ color: "#757575" }}>
                          Select Instructor
                        </span>
                      );
                    }
                    return selected;
                  }}
                >
                  <StyledMenuItem value="sarah">Sarah Mitchell</StyledMenuItem>
                  <StyledMenuItem value="harrison">
                    Harrison Lane
                  </StyledMenuItem>
                  <StyledMenuItem value="emma">Emma Davis</StyledMenuItem>
                </Select>
              </StyledFormControl>

              <StyledFormControl size="small">
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <span style={{ color: "#757575" }}>Select Status</span>
                      );
                    }
                    return selected;
                  }}
                >
                  <StyledMenuItem value="completed">Completed</StyledMenuItem>
                  <StyledMenuItem value="on-process">On Process</StyledMenuItem>
                  <StyledMenuItem value="yet-to-start">
                    Yet to Start
                  </StyledMenuItem>
                </Select>
              </StyledFormControl>

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
              <Table sx={{ minWidth: 1100 }}>
                <StyledTableHead>
                  <TableRow>
                    <StyledTableHeadCell sx={{ minWidth: "180px" }}>
                      Class Name
                    </StyledTableHeadCell>
                    <StyledTableHeadCell sx={{ minWidth: "140px" }}>
                      Time
                    </StyledTableHeadCell>
                    <StyledTableHeadCell sx={{ minWidth: "100px" }}>
                      Location
                    </StyledTableHeadCell>
                    <StyledTableHeadCell sx={{ minWidth: "120px" }}>
                      Instructor
                    </StyledTableHeadCell>
                    <StyledTableHeadCell sx={{ minWidth: "80px" }}>
                      Students
                    </StyledTableHeadCell>
                    <StyledTableHeadCell sx={{ minWidth: "160px" }}>
                      Attendance (Student)
                    </StyledTableHeadCell>
                    <StyledTableHeadCell sx={{ minWidth: "100px" }}>
                      Status
                    </StyledTableHeadCell>
                    <StyledTableHeadCell sx={{ minWidth: "100px" }}>
                      Actions
                    </StyledTableHeadCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {currentData.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell>{row.className}</StyledTableCell>
                      <StyledTableCell>{row.time}</StyledTableCell>
                      <StyledTableCell>{row.location}</StyledTableCell>
                      <StyledTableCell>{row.instructor}</StyledTableCell>
                      <StyledTableCell>{row.students}</StyledTableCell>
                      <StyledTableCell>{row.attendance}</StyledTableCell>
                      <StyledTableCell>
                        <StatusChip
                          label={
                            row.status === "completed"
                              ? "Completed"
                              : row.status === "on-process"
                                ? "On Process"
                                : "Yet to Start"
                          }
                          status={row.status}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Box sx={{ display: "flex", gap: "2px" }}>
                          <ActionIconButton
                            onClick={() => handleViewAttendance(row.id)}
                          >
                            <VisibilityOutlinedIcon sx={{ fontSize: "18px" }} />
                          </ActionIconButton>
                          <ActionIconButton
                            onClick={() => handleMarkAttendance(row.id)}
                          >
                            <CheckIcon sx={{ fontSize: "18px" }} />
                          </ActionIconButton>
                          <ActionIconButton
                            onClick={() => handleMarkAttendance(row.id)}
                          >
                            <RefreshIcon sx={{ fontSize: "18px" }} />
                          </ActionIconButton>
                        </Box>
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
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default AttendancePage;
