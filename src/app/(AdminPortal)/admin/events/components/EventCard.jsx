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
import CreateEvent from "./CreateEvent";
import ConfirmationDialog from "@/app/components/confirmation-dialog/ConfirmationDialog";
import { deleteEvent } from "@/redux/slices/eventSlice";
import { useDispatch } from "react-redux";

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
  borderRadius: "10px 10px 0 0",
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

// Event Content Styles
const EventTitle = styled(Typography)({
  fontWeight: 700,
  marginBottom: "6px",
  fontSize: "18px",
  color: "#635738",
  lineHeight: "21px",
});

const EventDescription = styled(Typography)({
  color: "#757575",
  marginBottom: "15px",
  fontSize: "13px",
  lineHeight: "16px",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

const DetailChip = styled(Chip)({
  backgroundColor: "#F5F5F5",
  color: "#AE9964",
  fontWeight: 500,
  fontSize: "11px",
  height: "27px",
  padding: "0 8px",
  borderRadius: "15px",
  border: "1px solid #E0E0E0",
});

// Event Item Styles with colored background

const EventItemHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
});

const EventItemContent = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

const EventInfoRow = styled(Stack)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "6px",
});

const EventDetailText = styled(Typography)({
  fontSize: "12px",
  color: "#191919",
  fontWeight: 400,
});

const EventActions = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
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

// ==================== COMPONENT ====================
const EventCard = ({
  event,
  categories = {},
  setAlert,
  setOverlayLoading,
  locationList,
  instructorList,
}) => {
  const dispatch = useDispatch();
  const [openEventModal, setOpenEventModal] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleEditEvent = () => {
    setOpenEventModal(true);
  };

  const handleDeleteEvent = () => {
    setDeleteTitle("Are you Sure?");
    setDeleteStatus(true);
    setDeleteMessage(`The event "${event?.title}" will be deleted.`);
    setOpenDeleteModal(true);
  };

  const handleCloseEventModal = () => {
    setOpenEventModal(false);
  };

  const deleteSelectedEvent = async () => {
    try {
      setDeleteLoading(true);
      setOverlayLoading(true);
      await dispatch(deleteEvent(event.id))
        .unwrap()
        .then(() => {
          handleCloseDeleteModal();
          setAlert({
            severity: "success",
            message: "Event Deleted Successfully",
          });
        })
        .catch((error) => {
          console.log("Error deleting event:", error);
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
      setOverlayLoading(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const formatISTDateRange = (startDate, endDate) => {
    const toISTDate = (date) =>
      new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      });

    return `${toISTDate(startDate)} - ${toISTDate(endDate)}`;
  };

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

  const isVideo = event.mediaType.startsWith("video");

  return (
    <StyledCard>
      {/* Event Image/Video */}
      <ImageContainer>
        {isVideo ? (
          <StyledVideo
            src={event.mediaUrl}
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
            image={event.mediaUrl}
            alt={event.title}
          />
        )}
        <StatusChip
          label={event.isActive ? "Active" : "Inactive"}
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
        {/* Event Title & Description */}
        <EventTitle variant="h6">{event.title}</EventTitle>
        <EventDescription
          className="rich-text-editor"
          variant="body2"
          dangerouslySetInnerHTML={{ __html: event.description }}
        ></EventDescription>

        <DividerLine />

        {/* Event Details Section */}
        <EventItemHeader>
          <EventItemContent>
            {/* Date */}
            <EventInfoRow>
              <IconCalendar size={15} color="#AE9964" />
              <EventDetailText>
                {`${event.day}, ${formatISTDateRange(
                  event.startDate,
                  event.endDate
                )}`}
              </EventDetailText>
            </EventInfoRow>

            {/* Time & Location */}
            <Stack direction="row" spacing={2}>
              <EventInfoRow>
                <IconClock size={15} color="#AE9964" />
                <EventDetailText>
                  {formatISTTimeRange(event.startTime, event.endTime)}
                </EventDetailText>
              </EventInfoRow>
              <EventInfoRow>
                <IconMapPin size={15} color="#AE9964" />
                <EventDetailText>{event.location.name}</EventDetailText>
              </EventInfoRow>
            </Stack>

            {/* Instructor & Slots */}
            <Stack direction="row" spacing={2}>
              <EventInfoRow>
                <IconUser size={15} color="#AE9964" />
                <EventDetailText>
                  {`${event.instructor.firstName.trim() || ""} ${
                    event.instructor.lastName.trim() || ""
                  }`.trim()}
                </EventDetailText>
              </EventInfoRow>
              <EventInfoRow>
                <IconArmchair size={15} color="#AE9964" />
                <EventDetailText>
                  {event?.slots || event.availableSeats}/{event.availableSeats}
                </EventDetailText>
              </EventInfoRow>
            </Stack>
          </EventItemContent>

          <EventActions>
            <DetailChip label={`$${event.fees ?? 0}`} size="small" />
          </EventActions>
        </EventItemHeader>

        {/* Action Buttons */}
        <ActionButtonsContainer>
          <EditButton
            startIcon={<IconEdit size={12} />}
            onClick={handleEditEvent}
          >
            Edit Event
          </EditButton>
          <DeleteButton
            startIcon={<IconTrash size={12} />}
            onClick={handleDeleteEvent}
            disabled={deleteLoading}
          >
            Delete Event
          </DeleteButton>
        </ActionButtonsContainer>
      </CardContent>
      <CreateEvent
        open={openEventModal}
        onClose={handleCloseEventModal}
        eventData={event}
        type="edit"
        categories={categories}
        setAlert={setAlert}
        setOverlayLoading={setOverlayLoading}
        locations={locationList}
        instructors={instructorList}
      />

      <ConfirmationDialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        title={deleteTitle}
        message={deleteMessage}
        showDelete={deleteStatus}
        onConfirm={deleteSelectedEvent}
      />
    </StyledCard>
  );
};

export default EventCard;
