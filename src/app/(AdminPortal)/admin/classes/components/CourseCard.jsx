"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Chip,
  Stack,
  Box,
  Typography,
  Button,
  Switch,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  IconEdit,
  IconTrash,
  IconCalendar,
  IconClock,
  IconMapPin,
  IconUser,
  IconArmchair,
} from "@tabler/icons-react";
import CreateClass from "./CreateClass";
import CreateCourse from "./CreateCourse";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../loading";
import ConfirmationDialog from "@/app/components/confirmation-dialog/ConfirmationDialog";
import { deleteCourse } from "@/redux/slices/courseSlice";

// ==================== STYLED COMPONENTS ====================

// Card Styles
const StyledCard = styled(Card)({
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  borderRadius: "12px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "0px",
  minWidth: "340px",
});

const ImageContainer = styled(Box)({
  position: "relative",
  height: "220px",
  overflow: "hidden",
  borderRadius: "12px 12px 0 0",
});

const StyledCardMedia = styled(CardMedia)({
  height: "220px",
  objectFit: "cover",
});

const StyledVideo = styled("video")({
  width: "100%",
  height: "220px",
  objectFit: "cover",
  display: "block",
});

const StatusChip = styled(Chip)({
  position: "absolute",
  top: "12px",
  right: "12px",
  backgroundColor: "#FFFFFF",
  color: "#191919",
  fontWeight: 400,
  fontSize: "12px",
  height: "24px",
  borderRadius: "12px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  zIndex: 2,
});

// Course Content Styles
const CourseTitle = styled(Typography)({
  fontWeight: 700,
  marginBottom: "6px",
  fontSize: "18px",
  color: "#635738",
  lineHeight: "21px",
});

const CourseDescription = styled(Typography)({
  color: "#757575",
  marginBottom: "15px",
  fontSize: "14px",
  lineHeight: "16px",
  maxLines: 1,
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const CategoryLabel = styled(Typography)({
  color: "#757575",
  display: "block",
  marginBottom: "4px",
  fontSize: "14px",
  lineHeight: "16px",
  fontWidth: 400,
});

const CategoryValue = styled(Typography)({
  fontWeight: 500,
  marginBottom: "20px",
  fontSize: "14px",
  color: "#191919",
  fontWidth: 400,
  lineHeight: "16px",
});

const DetailChip = styled(Chip)({
  backgroundColor: "#F5F5F5",
  color: "#AE9964",
  fontWeight: 500,
  fontSize: "12px",
  height: "27px",
  padding: "0 8px",
  borderRadius: "15px",
  border: "1px solid #E0E0E0",
});

const ClassesHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
});

const ClassesTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: "16px",
  color: "#635738",
  fontWidth: 700,
  lineHeight: "19px",
});

const AddClassButton = styled(Button)({
  backgroundColor: "#AE9964",
  color: "#FFFFFF",
  textTransform: "none",
  fontSize: "10px",
  padding: "2px 10px",
  minWidth: "auto",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: "#a07d5a",
  },
});

// Class Item Styles with colored borders
const ClassItem = styled(Box)(({ backgroundcolor }) => ({
  backgroundColor: `${backgroundcolor}`,
  borderRadius: "8px",
  padding: "12px",
  marginBottom: "8px",
  "&:last-child": {
    marginBottom: 0,
  },
}));

const ClassItemHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
});

const ClassItemContent = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

const ClassInfoRow = styled(Stack)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "6px",
});

const ClassDetailText = styled(Typography)({
  fontSize: "11px",
  color: "#191919",
  fontWeight: 400,
});

const ClassFees = styled(Typography)({
  fontWeight: 600,
  fontSize: "14px",
  color: "#635738",
  fontWidth: 700,
  lineHeight: "16px",
});

const ClassActions = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
});

const EditIconButton = styled(Button)({
  padding: "3px 8px",
  color: "#000000",
  fontSize: "10px",
  lineHeight: "12px",
  fontWeight: 600,
  minWidth: "auto",
  borderRadius: "5px",
  background: "#FFF",
  boxShadow: "0 5px 4px -5px rgba(0, 0, 0, 0.10)",
  "&:hover": {
    color: "#000000",
    backgroundColor: "#F5F5F5",
  },
});

const StyledSwitch = styled(Switch)({
  width: 24,
  height: 12,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: "0.8px",
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#AE9964",
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 10,
    height: 10,
  },
  "& .MuiSwitch-track": {
    borderRadius: 12,
    backgroundColor: "#757575",
    opacity: 1,
  },
});

// Action Buttons Styles
const ActionButtonsContainer = styled(Box)({
  marginTop: "15px",
  display: "flex",
  flexDirection: "row",
  gap: "8px",
});

const EditButton = styled(Button)({
  backgroundColor: "#AE9964",
  color: "white",
  textTransform: "none",
  fontSize: "11px",
  padding: "4px 10px",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: "#a07d5a",
  },
});

const DeleteButton = styled(Button)({
  backgroundColor: "#AE9964",
  color: "white",
  textTransform: "none",
  fontSize: "11px",
  padding: "4px 10px",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: "#a07d5a",
  },
});

const DividerLine = styled(Divider)({
  width: "100%",
  color: "#D3D3D3",
  marginTop: "2px",
  marginBottom: "20px",
  borderBottomWidth: 2,
});

const SessionsArea = styled(Box)({
  padding: "0px",
  paddingRight: "2px",
  margin: "0px",
  maxHeight: "410px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#F5F5F5",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#AE9964",
    borderRadius: "10px",
    "&:hover": {
      background: "#9d8757",
    },
  },
});

// ==================== COMPONENT ====================
const CourseCard = ({ course, categories, setAlert }) => {
  // Color array for class item borders
  const { locations } = useSelector((state) => state.location);
  const { staffs } = useSelector((state) => state.user);
  const backgroundColors = ["#FFE5E5", "#E0EDFF", "#E5FFE5", "#FFF7E0"];
  const [openClassModal, setOpenClassModal] = useState(false);
  const [openCourseModal, setOpenCourseModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [instructorList, setInstructorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(null);
  const [classDetails, setClassDetails] = useState(null);
  const [deleteTitle, setDeleteTitle] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!locations.length === 0 && !staffs.length === 0) return;

    const fetchData = () => {
      let storedCourses = [];
      let storedCategories = [];

      if (typeof window !== "undefined") {
        const locationsData = localStorage.getItem("allLocations");
        const staffsData = localStorage.getItem("allStaffs");
        storedCourses = locationsData ? JSON.parse(locationsData) : [];
        storedCategories = staffsData ? JSON.parse(staffsData) : [];
      }

      if (locations.length > 0) {
        setLocationList(locations);
        setInstructorList(staffs.length > 0 ? staffs : storedCategories);
      } else {
        setLocationList(storedCourses);
        setInstructorList(storedCategories);
      }

      setLoading(false);
    };

    fetchData();
  }, [locations, staffs]);

  const formatISTTimeRange = (start, end) => {
    const toIST = (time) =>
      new Date(time).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });

    return `${toIST(start)} - ${toIST(end)}`;
  };

  const handleEditCourse = () => {
    setOpenCourseModal(true);
  };

  const handleCloseModal = () => {
    setOpenCourseModal(false);
  };

  const handleDeleteCourse = () => {
    setDeleteTitle(
      course?.classes?.length === 0 ? "Are you Sure?" : "Cannot Delete Course!"
    );
    setDeleteStatus(course?.classes?.length === 0 ? true : false);
    setDeleteMessage(
      course?.classes?.length === 0
        ? `The course "${course?.title}" will be deleted.`
        : `This course has ${course?.classes?.length} class${
            course?.classes?.length > 1 ? "es" : ""
          } assigned to it. Therefore, "${course?.title}" cannot be deleted.`
    );
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const deleteSelectedCourse = async () => {
    try {
      setDeleteLoading(true);
      await dispatch(deleteCourse(course.id))
        .unwrap()
        .then(() => {
          handleCloseDeleteModal();
          setAlert({
            severity: "success",
            message: "Course Deleted Successfully",
          });
        })
        .catch((error) => {
          console.log("Error deleting course:", error);
          setAlert({
            severity: "error",
            message: error,
          });
          handleCloseDeleteModal();
        });
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Update handleAddClass function:
  const handleAddClass = () => {
    setOpenClassModal(true);
    setType("add");
    setClassDetails(null);
  };

  const handleCloseClassModal = () => {
    setOpenClassModal(false);
  };

  const handleEditClass = (classDetails) => {
    setOpenClassModal(true);
    setType("edit");
    setClassDetails(classDetails);
  };

  const handleToggleClassStatus = (classId, currentStatus) => {
    console.log("Toggle class status:", classId, currentStatus);
  };

  const isVideo = course?.mediaType.startsWith("video");

  if (loading) {
    return <Loading />;
  }

  return (
    <StyledCard>
      {/* Course Image */}
      <ImageContainer>
        {isVideo ? (
          <StyledVideo
            src={course.mediaUrl}
            controls
            preload="metadata"
            onError={(e) => {
              console.log("Video failed to load:", e);
            }}
          >
            Your browser does not support the video tag.
          </StyledVideo>
        ) : (
          <StyledCardMedia
            component="img"
            image={course.mediaUrl}
            alt={course.title}
          />
        )}
        <StatusChip
          label={course.isActive ? "Active" : "Inactive"}
          size="small"
        />
      </ImageContainer>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "20px",
        }}
      >
        {/* Course Title & Description */}
        <CourseTitle variant="h6">{course.title}</CourseTitle>
        <CourseDescription
          className="rich-text-editor"
          variant="body2"
          dangerouslySetInnerHTML={{ __html: course.description }}
        />

        {/* Course Category */}
        <CategoryLabel variant="caption">Course Category</CategoryLabel>
        <CategoryValue variant="body2">
          {course.courseCategory.name}
        </CategoryValue>

        {/* Course Details Chips */}
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <DetailChip label={`Age ${course.ageRange}`} size="small" />
          {/* <DetailChip label={course.classes?.[0]?.term?.name} size="small" /> */}
          {/* <DetailChip label={course.price} size="small" /> */}
        </Stack>

        <DividerLine />

        {/* Classes Section */}
        <div>
          <ClassesHeader>
            <ClassesTitle variant="body2">
              Classes ({course.classes.length})
            </ClassesTitle>
            <AddClassButton onClick={handleAddClass}>+ Add</AddClassButton>
          </ClassesHeader>

          {/* Class Items */}
          <SessionsArea>
            {course.classes.map((classItem, index) => (
              <ClassItem
                key={classItem.id}
                backgroundcolor={
                  backgroundColors[index % backgroundColors.length]
                }
              >
                <ClassItemHeader>
                  <ClassItemContent>
                    {/* Date */}
                    <ClassInfoRow>
                      <IconCalendar size={14} color="#AE9964" />
                      <ClassDetailText>{classItem.day}</ClassDetailText>
                    </ClassInfoRow>

                    {/* Time & Location */}
                    <Stack direction="row" spacing={2}>
                      <ClassInfoRow>
                        <IconClock size={14} color="#AE9964" />
                        <ClassDetailText>
                          {formatISTTimeRange(
                            classItem.startDate,
                            classItem.endDate
                          )}
                        </ClassDetailText>
                      </ClassInfoRow>
                      <ClassInfoRow>
                        <IconMapPin size={14} color="#AE9964" />
                        <ClassDetailText>
                          {classItem.location.name}
                        </ClassDetailText>
                      </ClassInfoRow>
                    </Stack>

                    {/* Instructor */}
                    <Stack direction="row" spacing={2}>
                      <ClassInfoRow>
                        <IconUser size={14} color="#AE9964" />
                        <ClassDetailText>
                          {`${classItem.tutor.firstName.trim() || ""} ${
                            classItem.tutor.lastName.trim() || ""
                          }`.trim()}
                        </ClassDetailText>
                      </ClassInfoRow>
                      <ClassInfoRow>
                        <IconArmchair size={14} color="#AE9964" />
                        <ClassDetailText>
                          {classItem?.slots || classItem.availableSeats}/
                          {classItem.availableSeats}
                        </ClassDetailText>
                      </ClassInfoRow>
                    </Stack>
                  </ClassItemContent>

                  <ClassActions>
                    <ClassFees>${classItem.fees}</ClassFees>
                    <EditIconButton
                      size="small"
                      onClick={() => handleEditClass(classItem)}
                    >
                      <IconEdit
                        size={12}
                        style={{ marginRight: "5px", color: "#AE9964" }}
                      />
                      Edit
                    </EditIconButton>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <StyledSwitch
                        checked={classItem.isActive === true}
                        onChange={() =>
                          handleToggleClassStatus(
                            classItem.id,
                            classItem.status
                          )
                        }
                        size="small"
                      />
                      <Typography sx={{ color: "#000000", fontSize: "10px" }}>
                        {classItem.isActive ? "Active" : "Inactive"}
                      </Typography>
                    </Box>
                  </ClassActions>
                </ClassItemHeader>
              </ClassItem>
            ))}
          </SessionsArea>
        </div>

        {/* Action Buttons */}
        <ActionButtonsContainer>
          <EditButton
            startIcon={<IconEdit size={12} />}
            onClick={handleEditCourse}
          >
            Edit Course
          </EditButton>
          <DeleteButton
            startIcon={<IconTrash size={12} />}
            onClick={handleDeleteCourse}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Deleting" : "Delete Course"}
          </DeleteButton>
        </ActionButtonsContainer>
      </CardContent>
      <CreateCourse
        open={openCourseModal}
        onClose={handleCloseModal}
        type="edit"
        data={course}
        categories={categories}
        setAlert={setAlert}
      />
      <CreateClass
        open={openClassModal}
        onClose={handleCloseClassModal}
        courseId={course.id}
        locations={locationList}
        instructors={instructorList}
        type={type}
        classData={classDetails}
        setAlert={setAlert}
      />
      <ConfirmationDialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        title={deleteTitle}
        message={deleteMessage}
        showDelete={deleteStatus}
        onConfirm={deleteSelectedCourse}
      />
    </StyledCard>
  );
};

export default CourseCard;
