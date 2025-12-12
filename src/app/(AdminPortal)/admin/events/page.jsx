"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  Portal,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconPlus } from "@tabler/icons-react";
import EventCard from "./components/EventCard";
import CreateEvent from "./components/CreateEvent";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "@/app/components/Alert/Alert";
import Loading from "@/app/loading";
import { fetchAllEvents } from "@/redux/slices/eventSlice";

// ==================== STYLED COMPONENTS ====================

const PageContainer = styled(Box)({
  // padding: "24px",
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
    image: "/Images/classes.png",
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
    image: "/Images/classes.png",
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
    image: "/Images/classes.png",
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
    image: "/Images/classes.png",
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
    image: "/Images/classes.png",
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
    image: "/Images/classes.png",
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
  const dispatch = useDispatch();
  const [eventNameFilter, setEventNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const { events, filteredEvents, error } = useSelector((state) => state.event);
  const { categories } = useSelector((state) => state.category);
  const { locations } = useSelector((state) => state.location);
  const { staffs } = useSelector((state) => state.user);
  const [eventsList, setEventsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [alert, setAlert] = useState({ severity: "", message: "" });
  const [loading, setLoading] = useState(true);
  const [overlayLoading, setOverlayLoading] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [instructorList, setInstructorList] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      let storedEvents = [];
      let storedCategories = [];
      let storedStaffs = [];
      let storedLocations = [];

      if (typeof window !== "undefined") {
        const eventsData = localStorage.getItem("allEvents");
        const categoriesData = localStorage.getItem("allCategories");
        const locationsData = localStorage.getItem("allLocations");
        const staffsData = localStorage.getItem("allStaffs");
        storedEvents = eventsData ? JSON.parse(eventsData) : [];
        storedCategories = categoriesData ? JSON.parse(categoriesData) : [];
        storedLocations = locationsData ? JSON.parse(locationsData) : [];
        storedStaffs = staffsData ? JSON.parse(staffsData) : [];
      }

      if (filteredEvents && filteredEvents.length > 0) {
        setEventsList(filteredEvents);
      } else {
        setEventsList(storedEvents);
      }

      if (categories && categories.length > 0) {
        const courseCategories = categories.filter(
          (category) => category.type === "Event"
        );
        setCategoriesList(courseCategories);
      } else {
        const courseCategories = storedCategories.filter(
          (category) => category.type === "Event"
        );
        setCategoriesList(courseCategories);
      }

      if (locations.length > 0) {
        setLocationList(locations);
      } else {
        setLocationList(storedLocations);
      }

      if (staffs.length > 0) {
        setInstructorList(staffs.length > 0 ? staffs : storedStaffs);
      } else {
        setInstructorList(storedStaffs);
      }
      setLoading(false);
    };

    fetchData();
  }, [filteredEvents, categories, locations, staffs]);

  useEffect(() => {
    const errorSet = () => {
      if (error) {
        setAlert({ severity: "error", message: error });
      }
    };
    errorSet();
  }, [error]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const buildFilters = useCallback(() => {
    const filters = {};
    let filterLength = 0;

    if (eventNameFilter !== "all" && eventNameFilter !== "") {
      filters.title = eventNameFilter;
      filterLength++;
    }

    if (statusFilter !== "all") {
      filters.isActive = statusFilter === "active" ? true : false;
      filterLength++;
    }

    return { filters, length: filterLength };
  }, [eventNameFilter, statusFilter]);

  useEffect(() => {
    const setFilters = async () => {
      setOverlayLoading(true);
      try {
        const filters = buildFilters();
        await dispatch(fetchAllEvents(filters)).unwrap();
      } catch (error) {
        setAlert({ severity: "error", message: error });
      } finally {
        setOverlayLoading(false);
      }
    };
    setFilters();
  }, [eventNameFilter, statusFilter, buildFilters, dispatch]);

  if (loading) {
    return <Loading overlay={false} />;
  }

  return (
    <PageContainer>
      {alert.message && (
        <Alerts
          severity={alert.severity}
          message={alert.message}
          onClose={() => setAlert({ severity: "", message: "" })}
        />
      )}
      {overlayLoading && (
        <Portal>
          <Loading overlay={true} />
        </Portal>
      )}
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
            {events?.map((event) => (
              <StyledMenuItem key={event.title} value={event.title}>
                {event.title}
              </StyledMenuItem>
            ))}
          </Select>
        </StyledFormControl>

        {/* Status Filter */}
        <StyledFormControl size="small" width="100px">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              if (!selected || selected === "all") {
                return <span style={{ color: "#999999" }}>Status</span>;
              }
              const statusNames = {
                active: "Active",
                inactive: "Inactive",
              };
              return statusNames[selected] || "Status";
            }}
          >
            <StyledMenuItem value="all">All Status</StyledMenuItem>
            <StyledMenuItem value="active">Active</StyledMenuItem>
            <StyledMenuItem value="inactive">Inactive</StyledMenuItem>
          </Select>
        </StyledFormControl>
      </FilterSection>

      {/* Events Grid */}

      {eventsList.length > 0 ? (
        <EventsGrid>
          {eventsList.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              categories={categoriesList}
              setAlert={setAlert}
              setOverlayLoading={setOverlayLoading}
              locationList={locationList}
              instructorList={instructorList}
            />
          ))}
        </EventsGrid>
      ) : (
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          variant="body2"
        >
          No events found.
        </Typography>
      )}

      {/* Create Event Modal */}
      <CreateEvent
        open={openModal}
        onClose={handleCloseModal}
        type="add"
        categories={categoriesList}
        setAlert={setAlert}
        setOverlayLoading={setOverlayLoading}
        locations={locationList}
        instructors={instructorList}
      />
    </PageContainer>
  );
};

export default EventsPage;
