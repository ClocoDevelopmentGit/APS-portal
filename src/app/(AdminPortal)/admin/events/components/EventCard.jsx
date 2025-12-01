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
import CreateEvent from "./CreateEvent";

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
});

const StyledCardMedia = styled(CardMedia)({
  height: "220px",
  objectFit: "cover",
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
const EventCard = ({ event }) => {
  const [openEventModal, setOpenEventModal] = useState(false);

  const handleEditEvent = () => {
    console.log("Edit event:", event.id);
  };

  const handleDeleteEvent = () => {
    console.log("Delete event:", event.id);
  };

  const handleAddEvent = () => {
    setOpenEventModal(true);
  };

  const handleCloseEventModal = () => {
    setOpenEventModal(false);
  };

  return (
    <StyledCard>
      {/* Event Image */}
      <ImageContainer>
        <StyledCardMedia
          component="img"
          image={event.image}
          alt={event.title}
        />
        <StatusChip label={event.status} size="small" />
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
        <EventDescription variant="body2">{event.description}</EventDescription>

        <DividerLine />

        {/* Event Details Section */}
        <EventItemHeader>
          <EventItemContent>
            {/* Date */}
            <EventInfoRow>
              <IconCalendar size={15} color="#AE9964" />
              <EventDetailText>{event.date}</EventDetailText>
            </EventInfoRow>

            {/* Time & Location */}
            <Stack direction="row" spacing={2}>
              <EventInfoRow>
                <IconClock size={15} color="#AE9964" />
                <EventDetailText>{event.time}</EventDetailText>
              </EventInfoRow>
              <EventInfoRow>
                <IconMapPin size={15} color="#AE9964" />
                <EventDetailText>{event.location}</EventDetailText>
              </EventInfoRow>
            </Stack>

            {/* Instructor & Slots */}
            <Stack direction="row" spacing={2}>
              <EventInfoRow>
                <IconUser size={15} color="#AE9964" />
                <EventDetailText>{event.instructor}</EventDetailText>
              </EventInfoRow>
              <EventInfoRow>
                <IconArmchair size={15} color="#AE9964" />
                <EventDetailText>
                  {event.availableSlots}/{event.totalSlots}
                </EventDetailText>
              </EventInfoRow>
            </Stack>
          </EventItemContent>

          <EventActions>
            <DetailChip label={event.price} size="small" />
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
          >
            Delete Event
          </DeleteButton>
        </ActionButtonsContainer>
      </CardContent>
      <CreateEvent
        open={openEventModal}
        onClose={handleCloseEventModal}
        eventId={event.id}
      />
    </StyledCard>
  );
};

export default EventCard;
