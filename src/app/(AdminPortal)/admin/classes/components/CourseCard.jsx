"use client";
import React, { useState } from "react";
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
const CourseCard = ({ course }) => {
  // Color array for class item borders
  const backgroundColors = ["#FFE5E5", "#E0EDFF", "#E5FFE5", "#FFF7E0"];
  const [openClassModal, setOpenClassModal] = useState(false);

  const handleEditCourse = () => {
    console.log("Edit course:", course.id);
  };

  const handleDeleteCourse = () => {
    console.log("Delete course:", course.id);
  };

  // Update handleAddClass function:
  const handleAddClass = () => {
    setOpenClassModal(true);
  };

  const handleCloseClassModal = () => {
    setOpenClassModal(false);
  };

  const handleEditClass = (classId) => {
    console.log("Edit class:", classId);
  };

  const handleToggleClassStatus = (classId, currentStatus) => {
    console.log("Toggle class status:", classId, currentStatus);
  };

  // Function to determine media type
  const getMediaType = (url) => {
    if (!url) return "image";
    const extension = url.split(".").pop().toLowerCase();
    const videoExtensions = ["mp4", "webm", "ogg", "mov"];
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];

    if (videoExtensions.includes(extension)) {
      return "video";
    } else if (imageExtensions.includes(extension)) {
      return "image";
    }
    return "image"; // default to image
  };

  const mediaType = getMediaType(course.mediaUrl);
  const isVideo = mediaType === "video";

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
              console.error("Video failed to load:", e);
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
        <CourseDescription variant="body2">
          {course.description}
        </CourseDescription>

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
                        <ClassDetailText>{classItem.time}</ClassDetailText>
                      </ClassInfoRow>
                      <ClassInfoRow>
                        <IconMapPin size={14} color="#AE9964" />
                        <ClassDetailText>{classItem.location}</ClassDetailText>
                      </ClassInfoRow>
                    </Stack>

                    {/* Instructor */}
                    <Stack direction="row" spacing={2}>
                      <ClassInfoRow>
                        <IconUser size={14} color="#AE9964" />
                        <ClassDetailText>
                          {classItem.instructor}
                        </ClassDetailText>
                      </ClassInfoRow>
                      <ClassInfoRow>
                        <IconArmchair size={14} color="#AE9964" />
                        <ClassDetailText>
                          {classItem.availableSlots}/{classItem.totalSlots}
                        </ClassDetailText>
                      </ClassInfoRow>
                    </Stack>
                  </ClassItemContent>

                  <ClassActions>
                    <ClassFees>{classItem.price}</ClassFees>
                    <EditIconButton
                      size="small"
                      onClick={() => handleEditClass(classItem.id)}
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
                        checked={classItem.status === "Active"}
                        onChange={() =>
                          handleToggleClassStatus(
                            classItem.id,
                            classItem.status
                          )
                        }
                        size="small"
                      />
                      <Typography sx={{ color: "#000000", fontSize: "10px" }}>
                        {classItem.status}
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
          >
            Delete Course
          </DeleteButton>
        </ActionButtonsContainer>
      </CardContent>
      <CreateClass
        open={openClassModal}
        onClose={handleCloseClassModal}
        courseId={course.id}
      />
    </StyledCard>
  );
};

export default CourseCard;
