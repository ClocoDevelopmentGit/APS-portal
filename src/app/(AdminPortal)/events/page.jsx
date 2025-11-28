"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconPlus } from "@tabler/icons-react";
import EventCard from "./components/EventCard";
import CreateEvent from "./components/CreateEvent";

// ==================== STYLED COMPONENTS ====================

const PageContainer = styled(Box)({
  padding: "24px",
  backgroundColor: "#FFFFFF",
  minHeight: "100vh",
});

const HeaderSection = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "24px",
  "@media (max-width: 576px)": {
    flexDirection: "column",
    gap: "16px",
  },
});

const TitleSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const PageTitle = styled(Typography)({
  fontSize: "20px",
  fontWeight: 700,
  color: "#191919",
  lineHeight: "24px",
  marginBottom: "6px",
});

const PageSubtitle = styled(Typography)({
  fontSize: "14px",
  fontWeight: 400,
  color: "#666666",
  lineHeight: "18px",
});

const AddButton = styled(Button)({
  backgroundColor: "#AE9964",
  color: "#FFFFFF",
  textTransform: "none",
  fontSize: "13px",
  fontWeight: 600,
  padding: "8px 16px",
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: "#9d8757",
  },
});

const FilterSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "24px",
  "@media (max-width: 576px)": {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

const FilterLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: 700,
  color: "#635738",
});

const StyledFormControl = styled(FormControl)(({ width }) => ({
  width: width,
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    fontSize: "12px",
    fontWeight: 400,
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#AE9964",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#AE9964",
      borderWidth: "2px",
    },
  },
  "& .MuiSelect-select": {
    backgroundColor: "white",
    color: "#181818",
    fontSize: "12px",
    fontWeight: 400,
    padding: "8px 14px",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E0E0E0",
  },
  "& .MuiSelect-icon": {
    color: "#666666",
  },
  "& .MuiOutlinedInput-root:hover .MuiSelect-icon": {
    color: "#AE9964",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiSelect-icon": {
    color: "#AE9964",
  },
  "& .MuiSelect-select.placeholder": {
    color: "#757575",
  },
}));

const StyledMenuItem = styled(MenuItem)({
  fontSize: "12px",
  color: "#181818",
  fontWeight: 400,
  padding: "8px 16px",
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

const EventsGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "24px",
  "@media (max-width: 1100px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
  },
});

// ==================== SAMPLE DATA ====================

const eventsData = [
  {
    id: 1,
    title: "Casting Workshop with Thea McLeod",
    description:
      "This 4-hour workshop gives actors the chance to work with a professional casting director...",
    image: "/images/classes.png",
    category: "Workshop",
    date: "Tuesday, 7 Oct - 2 Dec 2025",
    time: "4:45pm - 6:45pm",
    location: "Ringwood",
    instructor: "Harrison Lane",
    price: "$450.00",
    status: "Active",
    totalSlots: 20,
    availableSlots: 5,
  },
  {
    id: 2,
    title: "Casting Workshop with Thea McLeod",
    description:
      "This 4-hour workshop gives actors the chance to work with a professional casting director...",
    image: "/images/classes.png",
    category: "Workshop",
    date: "Tuesday, 7 Oct - 2 Dec 2025",
    time: "4:45pm - 6:45pm",
    location: "Moorabbin",
    instructor: "Naomi Derrick",
    price: "$450.00",
    status: "Active",
    totalSlots: 15,
    availableSlots: 0,
  },
  {
    id: 3,
    title: "January Summer Holiday Program",
    description:
      "This 10-day workshop gives actors the chance to work with a professional casting director...",
    image: "/images/classes.png",
    category: "Program",
    date: "Tuesday, 7 Oct - 2 Dec 2025",
    time: "4:45pm - 6:45pm",
    location: "Ringwood",
    instructor: "Harrison Lane",
    price: "$450.00",
    status: "Active",
    totalSlots: 25,
    availableSlots: 8,
  },
  {
    id: 4,
    title: "Casting Workshop with Thea McLeod",
    description:
      "This 4-hour workshop gives actors the chance to work with a professional casting director...",
    image: "/images/classes.png",
    category: "Workshop",
    date: "Tuesday, 7 Oct - 2 Dec 2025",
    time: "4:45pm - 6:45pm",
    location: "Ringwood",
    instructor: "Harrison Lane",
    price: "$550.00",
    status: "Inactive",
    totalSlots: 20,
    availableSlots: 15,
  },
  {
    id: 5,
    title: "Casting Workshop with Thea McLeod",
    description:
      "This 4-hour workshop gives actors the chance to work with a professional casting director...",
    image: "/images/classes.png",
    category: "Workshop",
    date: "Tuesday, 7 Oct - 2 Dec 2025",
    time: "4:45pm - 6:45pm",
    location: "Moorabbin",
    instructor: "Naomi Derrick",
    price: "$550.00",
    status: "Active",
    totalSlots: 18,
    availableSlots: 3,
  },
  {
    id: 6,
    title: "January Summer Holiday Program",
    description:
      "This 10-day workshop gives actors the chance to work with a professional casting director...",
    image: "/images/classes.png",
    category: "Program",
    date: "Tuesday, 7 Oct - 2 Dec 2025",
    time: "4:45pm - 6:45pm",
    location: "Ringwood",
    instructor: "Harrison Lane",
    price: "$550.00",
    status: "Active",
    totalSlots: 30,
    availableSlots: 12,
  },
];

// ==================== COMPONENT ====================

const EventsPage = () => {
  const [eventNameFilter, setEventNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <PageContainer>
      {/* Header */}
      <HeaderSection>
        <TitleSection>
          <PageTitle>Events Management</PageTitle>
          <PageSubtitle>Manage Events, Workshops etc...</PageSubtitle>
        </TitleSection>
        <AddButton startIcon={<IconPlus size={18} />} onClick={handleOpenModal}>
          Add New Event
        </AddButton>
      </HeaderSection>

      {/* Filters */}
      {/* Filters */}
      <FilterSection>
        <FilterLabel>Filter by:</FilterLabel>

        {/* Event Name Filter */}
        <StyledFormControl size="small" width="180px">
          <Select
            value={eventNameFilter}
            onChange={(e) => setEventNameFilter(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: "#999999" }}>Event Name</span>;
              }
              return <span style={{ color: "#181818" }}>{selected}</span>;
            }}
          >
            <StyledMenuItem value="">All Events</StyledMenuItem>
            <StyledMenuItem value="Casting Workshop">
              Casting Workshop
            </StyledMenuItem>
            <StyledMenuItem value="Summer Program">
              Summer Program
            </StyledMenuItem>
            <StyledMenuItem value="Acting Workshop">
              Acting Workshop
            </StyledMenuItem>
          </Select>
        </StyledFormControl>

        {/* Status Filter */}
        <StyledFormControl size="small" width="100px">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: "#999999" }}>Status</span>;
              }
              return <span style={{ color: "#181818" }}>{selected}</span>;
            }}
          >
            <StyledMenuItem value="">All Status</StyledMenuItem>
            <StyledMenuItem value="Active">Active</StyledMenuItem>
            <StyledMenuItem value="Inactive">Inactive</StyledMenuItem>
          </Select>
        </StyledFormControl>
      </FilterSection>

      {/* Events Grid */}
      <EventsGrid>
        {eventsData.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </EventsGrid>

      {/* Create Event Modal */}
      <CreateEvent open={openModal} onClose={handleCloseModal} />
    </PageContainer>
  );
};

export default EventsPage;
