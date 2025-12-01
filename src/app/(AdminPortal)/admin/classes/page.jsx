"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  IconPlus,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CourseCard from "./components/CourseCard";
import "./classes.css";
import CreateCourse from "./components/CreateCourse";
import { useSelector } from "react-redux";
import Loading from "../../loading";

// ==================== STYLED COMPONENTS ====================

// Header Styles
const PageContainer = styled(Box)({
  padding: "0px",
});

const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
  [theme.breakpoints.between(0, 576)]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "15px",
  },
}));

const HeaderContent = styled(Box)({});

const PageTitle = styled(Typography)({
  color: "#191919",
  fontWeight: 700,
  marginBottom: "4px",
  fontSize: "20px",
  lineHeight: "30px",
  letterSpacing: "0.4px",
});

const PageSubtitle = styled(Typography)({
  color: "#666666",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "21px",
});

const AddButton = styled(Button)({
  backgroundColor: "#AE9964",
  color: "white",
  borderRadius: "20px",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "none",
  padding: "6px 20px",
  "&:hover": {
    backgroundColor: "#a07d5a",
  },
});

// Filter Styles
const FilterBox = styled(Box)(({ theme }) => ({
  marginBottom: "24px",
  display: "flex",
  gap: "16px",
  alignItems: "center",
  [theme.breakpoints.between(0, 576)]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const FilterLabel = styled(Typography)({
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: "16px",
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

// Navigation Styles
const NavigationContainer = styled(Box)({
  position: "relative",
});

const NavButton = styled(IconButton)(({ position }) => ({
  position: "absolute",
  [position]: "0px",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  backgroundColor: "#B8936D",
  color: "white",
  width: "25px",
  height: "25px",
  padding: "1px",
  opacity: 0.8,
  "&:hover": {
    backgroundColor: "#B8936D",
    color: "white",
    opacity: 1,
  },
  "&.swiper-button-disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
}));

// ==================== SAMPLE DATA ====================
const coursesData = [
  {
    id: 1,
    title: "Kinder Kids Acting",
    description: "Acting Technique: Senior Kids Bold Choices...",
    image: "/images/classes.png",
    category: "Acting Classes",
    age: "Age 4-6",
    term: "Term 4",
    status: "Active",
    classes: [
      {
        id: 1,
        day: "Tuesday, 7 Oct - 2 Dec 2025",
        time: "4:45pm - 5:45pm",
        location: "Ringwood",
        instructor: "Harrison Lane",
        status: "Active",
        totalSlots: 20,
        availableSlots: 5,
        price: "$325.00",
      },
      {
        id: 2,
        day: "Tuesday, 7 Oct - 2 Dec 2025",
        time: "4:45pm - 5:45pm",
        location: "Moorabbin",
        instructor: "Chi Nguyen",
        status: "Active",
        totalSlots: 15,
        availableSlots: 0,
        price: "$325.00",
      },
      {
        id: 3,
        day: "Tuesday, 7 Oct - 2 Dec 2025",
        time: "4:45pm - 5:45pm",
        location: "Yarraville",
        instructor: "Naomi Derrick",
        status: "Inactive",
        totalSlots: 18,
        availableSlots: 12,
        price: "$325.00",
      },
      {
        id: 4,
        day: "Tuesday, 7 Oct - 2 Dec 2025",
        time: "4:45pm - 6:45pm",
        location: "Narre Warren",
        instructor: "Catherine",
        status: "Active",
        totalSlots: 25,
        availableSlots: 8,
        price: "$325.00",
      },
    ],
  },
  {
    id: 2,
    title: "Junior Kids Acting",
    description: "Acting Technique: Senior Kids Bold Choices...",
    image: "/images/classes.png",
    category: "Acting Classes",
    age: "Age 7-11",
    term: "Term 4",
    status: "Active",
    classes: [
      {
        id: 1,
        day: "Tuesday, 7 Oct - 2 Dec 2025",
        time: "4:45pm - 5:45pm",
        location: "Ringwood",
        instructor: "Harrison Lane",
        status: "Active",
        totalSlots: 20,
        availableSlots: 3,
        price: "$325.00",
      },
      {
        id: 2,
        day: "Tuesday, 7 Oct - 2 Dec 2025",
        time: "4:45pm - 5:45pm",
        location: "Moorabbin",
        instructor: "Chi Nguyen",
        status: "Active",
        totalSlots: 15,
        availableSlots: 7,
        price: "$325.00",
      },
      {
        id: 3,
        day: "Tuesday, 7 Oct - 2 Dec 2025",
        time: "4:45pm - 5:45pm",
        location: "Yarraville",
        instructor: "Naomi Derrick",
        status: "Inactive",
        totalSlots: 18,
        availableSlots: 15,
        price: "$325.00",
      },
      {
        id: 4,
        day: "Tuesday, 7 Oct - 2 Dec 2025",
        time: "4:45pm - 6:45pm",
        location: "Narre Warren",
        instructor: "Catherine",
        status: "Active",
        totalSlots: 25,
        availableSlots: 10,
        price: "$325.00",
      },
    ],
  },
  {
    id: 3,
    title: "Kids Musical Theatre",
    description: "A fun filled course designed to spark the child's...",
    image: "/images/classes.png",
    category: "Musical Theatre",
    age: "Age upto 6",
    term: "Term 4",
    status: "Active",
    classes: [
      {
        id: 1,
        day: "Tuesday, 7 Oct - 2 Dec 2025",
        time: "4:45pm - 5:45pm",
        location: "Ringwood",
        instructor: "Harrison Lane",
        status: "Active",
        totalSlots: 20,
        availableSlots: 12,
        price: "$325.00",
      },
      {
        id: 2,
        day: "Tuesday, 7 Oct - 2 Dec 2025",
        time: "4:45pm - 5:45pm",
        location: "Moorabbin",
        instructor: "Chi Nguyen",
        status: "Active",
        totalSlots: 15,
        availableSlots: 2,
        price: "$325.00",
      },
      {
        id: 3,
        day: "Tuesday, 7 Oct - 2 Dec 2025",
        time: "4:45pm - 5:45pm",
        location: "Yarraville",
        instructor: "Naomi Derrick",
        status: "Inactive",
        totalSlots: 18,
        availableSlots: 18,
        price: "$325.00",
      },
      {
        id: 4,
        day: "Tuesday, 7 Oct - 2 Dec 2025",
        time: "4:45pm - 6:45pm",
        location: "Narre Warren",
        instructor: "Catherine",
        status: "Active",
        totalSlots: 25,
        availableSlots: 6,
        price: "$325.00",
      },
    ],
  },
  {
    id: 4,
    title: "Teen Acting Advanced",
    description: "Advanced acting techniques for teenagers...",
    image: "/images/classes.png",
    category: "Acting Classes",
    age: "Age 13-17",
    term: "Term 4",
    status: "Active",
    classes: [
      {
        id: 1,
        day: "Wednesday, 8 Oct - 3 Dec 2025",
        time: "5:00pm - 6:30pm",
        location: "Ringwood",
        instructor: "Sarah Johnson",
        status: "Active",
        totalSlots: 15,
        availableSlots: 4,
        price: "$375.00",
      },
    ],
  },
  {
    id: 5,
    title: "Adults Acting Workshop",
    description: "Professional acting workshop for adults...",
    image: "/images/classes.png",
    category: "Acting Classes",
    age: "Age 18+",
    term: "Term 4",
    status: "Active",
    classes: [
      {
        id: 1,
        day: "Thursday, 9 Oct - 4 Dec 2025",
        time: "7:00pm - 9:00pm",
        location: "Melbourne CBD",
        instructor: "Michael Roberts",
        status: "Active",
        totalSlots: 12,
        availableSlots: 9,
        price: "$425.00",
      },
    ],
  },
];

// ==================== COMPONENT ====================
const ClassesPage = () => {
  const { courses, error } = useSelector((state) => state.course);
  const [coursesList, setCoursesList] = useState(courses);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courses) return;

    const load = () => {
      let storedCourses = [];

      if (typeof window !== "undefined") {
        const data = localStorage.getItem("allCourses");
        storedCourses = data ? JSON.parse(data) : [];
      }

      if (courses.length > 0) {
        setCoursesList(courses);
      } else {
        setCoursesList(storedCourses);
      }

      setLoading(false);
    };

    load();
  }, [courses]);
  const [courseFilter, setCourseFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const swiperRef = useRef(null);

  const handleAddCourse = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <PageContainer className="classes-swiper">
      {/* Header */}
      <HeaderBox>
        <HeaderContent>
          <PageTitle variant="h4">Courses Management</PageTitle>
          <PageSubtitle variant="body2">
            Manage Courses / Classes and Sessions
          </PageSubtitle>
        </HeaderContent>
        <AddButton
          variant="contained"
          startIcon={<IconPlus size={18} />}
          onClick={handleAddCourse}
        >
          Add New Course
        </AddButton>
      </HeaderBox>

      {/* Filters */}
      <FilterBox>
        <FilterLabel variant="body2">Filter by:</FilterLabel>

        {/* Course Name Filter */}
        <StyledFormControl size="small" width="180px">
          <Select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              if (!selected || selected === "all") {
                return <span style={{ color: "#757575" }}>Course Name</span>;
              }
              const courseNames = {
                kinder: "Kinder Kids Acting",
                junior: "Junior Kids Acting",
                musical: "Kids Musical Theatre",
              };
              return courseNames[selected] || "Course Name";
            }}
          >
            <StyledMenuItem value="all">All Courses</StyledMenuItem>
            <StyledMenuItem value="kinder">Kinder Kids Acting</StyledMenuItem>
            <StyledMenuItem value="junior">Junior Kids Acting</StyledMenuItem>
            <StyledMenuItem value="musical">
              Kids Musical Theatre
            </StyledMenuItem>
          </Select>
        </StyledFormControl>

        {/* Course Category Filter */}
        <StyledFormControl size="small" width="150px">
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              if (!selected || selected === "all") {
                return (
                  <span style={{ color: "#757575" }}>Course Category</span>
                );
              }
              const categoryNames = {
                acting: "Acting Classes",
                musical: "Musical Theatre",
              };
              return categoryNames[selected] || "Course Category";
            }}
          >
            <StyledMenuItem value="all">All Categories</StyledMenuItem>
            <StyledMenuItem value="acting">Acting Classes</StyledMenuItem>
            <StyledMenuItem value="musical">Musical Theatre</StyledMenuItem>
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
                return <span style={{ color: "#757575" }}>Status</span>;
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
      </FilterBox>

      {/* Course Cards Swiper */}
      <NavigationContainer className="nav-container">
        {/* Left Navigation Arrow */}
        <NavButton className="nav-btn" position="left" onClick={handlePrev}>
          <IconChevronLeft size={20} />
        </NavButton>

        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{
            delay: 20000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1100: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
        >
          {coursesList.length > 0 &&
            coursesList.map((course) => (
              <SwiperSlide key={course.id}>
                <CourseCard course={course} />
              </SwiperSlide>
            ))}
        </Swiper>

        {/* Right Navigation Arrow */}
        <NavButton className="nav-btn" position="right" onClick={handleNext}>
          <IconChevronRight size={20} />
        </NavButton>
      </NavigationContainer>
      <CreateCourse open={openModal} onClose={handleCloseModal} />
    </PageContainer>
  );
};

export default ClassesPage;
