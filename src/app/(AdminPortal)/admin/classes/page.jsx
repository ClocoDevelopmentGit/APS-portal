"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  IconButton,
  Portal,
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
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/app/loading";
import Alerts from "@/app/components/Alert/Alert";
import { fetchAllCourses } from "@/redux/slices/courseSlice";

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

// ==================== COMPONENT ====================
const ClassesPage = () => {
  const dispatch = useDispatch();
  const { courses, filteredCourses, error } = useSelector(
    (state) => state.course
  );
  const { categories } = useSelector((state) => state.category);
  const [coursesList, setCoursesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [alert, setAlert] = useState({ severity: "", message: "" });
  const [loading, setLoading] = useState(true);
  const [overlayLoading, setOverlayLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      let storedCourses = [];
      let storedCategories = [];

      if (typeof window !== "undefined") {
        const coursesData = localStorage.getItem("allCourses");
        const categoriesData = localStorage.getItem("allCategories");

        storedCourses = coursesData ? JSON.parse(coursesData) : [];
        storedCategories = categoriesData ? JSON.parse(categoriesData) : [];
      }

      if (filteredCourses && filteredCourses.length > 0) {
        setCoursesList(filteredCourses);
      } else {
        setCoursesList(storedCourses);
      }

      if (categories && categories.length > 0) {
        setCategoriesList(categories);
      } else {
        setCategoriesList(storedCategories);
      }

      setLoading(false);
    };

    fetchData();
  }, [filteredCourses, categories]);

  useEffect(() => {
    const errorSet = () => {
      if (error) {
        setAlert({ severity: "error", message: error });
      }
    };
    errorSet();
  }, [error]);

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

  const buildFilters = useCallback(() => {
    const filters = {};
    let filterLength = 0;

    if (courseFilter !== "all" && courseFilter !== "") {
      filters.title = courseFilter;
      filterLength++;
    }

    if (categoryFilter !== "all") {
      filters.courseCategoryId = categoryFilter;
      filterLength++;
    }

    if (statusFilter !== "all") {
      filters.isActive = statusFilter === "active" ? true : false;
      filterLength++;
    }

    return { filters, length: filterLength };
  }, [courseFilter, categoryFilter, statusFilter]);

  useEffect(() => {
    const setFilters = async () => {
      setOverlayLoading(true);
      try {
        const filters = buildFilters();
        await dispatch(fetchAllCourses(filters)).unwrap();
      } catch (error) {
        setAlert({ severity: "error", message: error });
      } finally {
        setOverlayLoading(false);
      }
    };
    setFilters();
  }, [courseFilter, categoryFilter, statusFilter, buildFilters, dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <PageContainer className="classes-swiper">
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
              const selectedCourse = courses.find((c) => c.title === selected);
              return selectedCourse?.title || "Course Name";
            }}
          >
            <StyledMenuItem value="all">All Courses</StyledMenuItem>
            {courses?.map((course) => (
              <StyledMenuItem key={course.title} value={course.title}>
                {course.title}
              </StyledMenuItem>
            ))}
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
              const selectedCourse = categoriesList.find(
                (c) => c.id === selected
              );
              return selectedCourse?.name || "Course Name";
            }}
          >
            <StyledMenuItem value="all">All Categories</StyledMenuItem>
            {categoriesList?.map((category) => (
              <StyledMenuItem key={category.id} value={category.id}>
                {category.name}
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
        {coursesList.length > 0 ? (
          <>
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
              {coursesList.map((course) => (
                <SwiperSlide key={course.id}>
                  <CourseCard
                    course={course}
                    categories={categoriesList}
                    setAlert={setAlert}
                    setOverlayLoading={setOverlayLoading}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Right Navigation Arrow */}
            <NavButton
              className="nav-btn"
              position="right"
              onClick={handleNext}
            >
              <IconChevronRight size={20} />
            </NavButton>
          </>
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
            No courses found.
          </Typography>
        )}
      </NavigationContainer>
      <CreateCourse
        open={openModal}
        onClose={handleCloseModal}
        type="add"
        categories={categoriesList}
        setAlert={setAlert}
        setOverlayLoading={setOverlayLoading}
      />
    </PageContainer>
  );
};

export default ClassesPage;
