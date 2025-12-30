"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  IconButton,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  CardMedia,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconPlus } from "@tabler/icons-react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddBanner from "./AddBanner";

// ==================== STYLED COMPONENTS ====================

const StyledTableContainer = styled(TableContainer)({
  border: "none",
  borderRadius: "0px",
  overflow: "auto",
  boxShadow: "none",
  "& .MuiTable-root": {
    minWidth: 650,
  },
  "@media (max-width: 968px)": {
    display: "none",
  },
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: "transparent",
});

const StyledHeaderCell = styled(TableCell)({
  fontSize: "13px",
  fontWeight: 500,
  color: "#635738",
  borderBottom: "1px solid #E5E5E5",
  padding: "12px 16px",
  textTransform: "uppercase",
});

const StyledTableCell = styled(TableCell)({
  fontSize: "13px",
  fontWeight: 400,
  color: "#333333",
  borderBottom: "1px solid #E5E5E5",
  padding: "20px 16px",
  lineHeight: "19px",
  verticalAlign: "center",
});

const MediaContainer = styled(Box)({
  width: "90px",
  height: "55px",
  backgroundColor: "#D9D9D9",
  borderRadius: "4px",
  overflow: "hidden",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledCardMedia = styled(CardMedia)({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const StyledVideo = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  cursor: "pointer",
});

const ImagePlaceholder = styled(Box)({
  width: "90px",
  height: "55px",
  backgroundColor: "#D9D9D9",
  borderRadius: "4px",
});

const StyledSwitch = styled(Switch)({
  width: 38,
  height: 18,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 1.6,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#AE9964",
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 15,
    height: 15,
  },
  "& .MuiSwitch-track": {
    borderRadius: 24 / 2,
    backgroundColor: "#D9D9D9",
    opacity: 1,
  },
});

const EditIconButton = styled(IconButton)({
  color: "#AE9964",
  padding: "6px",
  "&:hover": {
    color: "#AE9964",
    backgroundColor: "rgba(174, 153, 100, 0.08)",
  },
});

const DeleteIconButton = styled(IconButton)({
  color: "#AE9964",
  padding: "6px",
  "&:hover": {
    color: "#AE9964",
    backgroundColor: "rgba(174, 153, 100, 0.08)",
  },
});

const SectionHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
});

const SectionTitle = styled(Typography)({
  fontSize: "18px",
  fontWeight: 700,
  color: "#635738",
  lineHeight: "21px",
});

const AddButton = styled(Button)({
  backgroundColor: "#AE9964",
  color: "#FFFFFF",
  textTransform: "none",
  fontSize: "13px",
  fontWeight: 600,
  padding: "6px 14px",
  borderRadius: "25px",
  "&:hover": {
    backgroundColor: "#9d8757",
  },
});

// Mobile Card Styles
const MobileCardsContainer = styled(Box)({
  display: "none",
  "@media (max-width: 968px)": {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
});

const MobileCard = styled(Card)({
  border: "1px solid #E5E5E5",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
});

const MobileCardHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  paddingBottom: "12px",
  borderBottom: "1px solid #E5E5E5",
});

const MobileCardTitle = styled(Typography)({
  fontSize: "14px",
  fontWeight: 600,
  color: "#191919",
  lineHeight: "19px",
});

const MobileCardRow = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  marginBottom: "12px",
});

const MobileCardLabel = styled(Typography)({
  fontSize: "11px",
  fontWeight: 500,
  color: "#757575",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
});

const MobileCardValue = styled(Typography)({
  fontSize: "13px",
  fontWeight: 400,
  color: "#333333",
  lineHeight: "19px",
});

const MobileCardActions = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "16px",
  paddingTop: "12px",
  borderTop: "1px solid #E5E5E5",
});

const MobileActionButtons = styled(Box)({
  display: "flex",
  gap: "8px",
});

const MobileMediaContainer = styled(Box)({
  width: "100%",
  height: "250px",
  backgroundColor: "#D9D9D9",
  borderRadius: "6px",
  marginBottom: "12px",
  overflow: "hidden",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const MobileStyledCardMedia = styled(CardMedia)({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const MobileStyledVideo = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  cursor: "pointer",
});

// ==================== COMPONENT ====================

const HeroBanner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [banners, setBanners] = useState([
    {
      id: 1,
      mediaUrl: "/images/banner1.png",
      mediaType: "image",
      title: "Welcome to Acting Performance Studio",
      subtitle:
        "Book your child's Acting or Musical Theatre Trial today! Spots Limited.",
      buttons: "Book a Trial\nSign Up",
      isActive: true,
    },
    {
      id: 2,
      mediaUrl: "/images/banner2.mov",
      mediaType: "video",
      title: "Welcome to Acting Performance Studio",
      subtitle:
        "Book your child's Acting or Musical Theatre Trial today! Spots Limited.",
      buttons: "Book a Trial\nSign Up",
      isActive: true,
    },
    {
      id: 3,
      mediaUrl: "/images/banner3.png",
      mediaType: "image",
      title: "Welcome to Acting Performance Studio",
      subtitle:
        "Book your child's Acting or Musical Theatre Trial today! Spots Limited.",
      buttons: "Book a Trial\nSign Up",
      isActive: false,
    },
  ]);

  const handleToggleStatus = (id) => {
    setBanners(
      banners.map((banner) =>
        banner.id === id ? { ...banner, isActive: !banner.isActive } : banner
      )
    );
  };

  const handleAddBanner = () => {
    setEditingBanner(null);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    const banner = banners.find((b) => b.id === id);
    if (banner) {
      const formData = {
        title: banner.title,
        subtitle: banner.subtitle.replace("\n", " "),
        button1Text: banner.buttons.split("\n")[0] || "",
        button1Link: "",
        button2Text: banner.buttons.split("\n")[1] || "",
        button2Link: "",
        media: null,
      };
      setEditingBanner(formData);
      setShowForm(true);
    }
  };

  const handleDelete = (id) => {
    console.log("Delete banner:", id);
  };

  const handleSaveForm = (formData) => {
    console.log("Saving form data:", formData);
    setShowForm(false);
    setEditingBanner(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingBanner(null);
  };

  const renderMedia = (banner, isMobile = false) => {
    if (!banner.mediaUrl) {
      return isMobile ? null : <ImagePlaceholder />;
    }

    const isVideo = banner.mediaType === "video";

    if (isMobile) {
      return (
        <MobileMediaContainer>
          {isVideo ? (
            <MobileStyledVideo
              src={banner.mediaUrl}
              controls
              preload="metadata"
              muted
              playsInline
              onError={(e) => {
                console.log("Video failed to load:", e);
              }}
            >
              Your browser does not support the video tag.
            </MobileStyledVideo>
          ) : (
            <MobileStyledCardMedia
              component="img"
              image={banner.mediaUrl}
              alt={banner.title}
            />
          )}
        </MobileMediaContainer>
      );
    }

    return (
      <MediaContainer>
        {isVideo ? (
          <StyledVideo
            src={banner.mediaUrl}
            controls
            preload="metadata"
            muted
            playsInline
            onError={(e) => {
              console.log("Video failed to load:", e);
            }}
          >
            Your browser does not support the video tag.
          </StyledVideo>
        ) : (
          <StyledCardMedia
            component="img"
            image={banner.mediaUrl}
            alt={banner.title}
          />
        )}
      </MediaContainer>
    );
  };

  return (
    <Box>
      {!showForm ? (
        <>
          <SectionHeader>
            <SectionTitle>Hero Banner</SectionTitle>
            <AddButton
              startIcon={<IconPlus size={16} />}
              onClick={handleAddBanner}
            >
              Add Banner
            </AddButton>
          </SectionHeader>

          {/* Desktop Table View */}
          <StyledTableContainer>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <StyledHeaderCell>Image</StyledHeaderCell>
                  <StyledHeaderCell>Title</StyledHeaderCell>
                  <StyledHeaderCell>Subtitle</StyledHeaderCell>
                  <StyledHeaderCell>Buttons</StyledHeaderCell>
                  <StyledHeaderCell>Status</StyledHeaderCell>
                  <StyledHeaderCell>Actions</StyledHeaderCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {banners.length > 0 ? (
                  banners.map((banner) => (
                    <TableRow key={banner.id}>
                      <StyledTableCell>{renderMedia(banner)}</StyledTableCell>
                      <StyledTableCell>{banner.title}</StyledTableCell>
                      <StyledTableCell>
                        {banner.subtitle
                          .split("\n")
                          .map((line, index, array) => (
                            <React.Fragment key={index}>
                              {line}
                              {index < array.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                      </StyledTableCell>
                      <StyledTableCell sx={{ minWidth: "150px" }}>
                        {banner.buttons
                          .split("\n")
                          .map((line, index, array) => (
                            <React.Fragment key={index}>
                              {line}
                              {index < array.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledSwitch
                          checked={banner.isActive}
                          onChange={() => handleToggleStatus(banner.id)}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 0.5,
                            alignItems: "center",
                          }}
                        >
                          <EditIconButton onClick={() => handleEdit(banner.id)}>
                            <FiEdit size={16} />
                          </EditIconButton>
                          <DeleteIconButton
                            onClick={() => handleDelete(banner.id)}
                          >
                            <RiDeleteBin6Line size={16} />
                          </DeleteIconButton>
                        </Box>
                      </StyledTableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <StyledTableCell
                      align="center"
                      colSpan={6}
                      sx={{ padding: "40px" }}
                    >
                      No Banners found
                    </StyledTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </StyledTableContainer>

          {/* Mobile Card View */}
          <MobileCardsContainer>
            {banners.length > 0 ? (
              banners.map((banner) => (
                <MobileCard key={banner.id}>
                  <CardContent sx={{ padding: "16px" }}>
                    {renderMedia(banner, true)}

                    <MobileCardHeader>
                      <MobileCardTitle>{banner.title}</MobileCardTitle>
                    </MobileCardHeader>

                    <MobileCardRow>
                      <MobileCardLabel>Subtitle</MobileCardLabel>
                      <MobileCardValue>{banner.subtitle}</MobileCardValue>
                    </MobileCardRow>

                    <MobileCardRow>
                      <MobileCardLabel>Buttons</MobileCardLabel>
                      <MobileCardValue>
                        {banner.buttons
                          .split("\n")
                          .map((line, index, array) => (
                            <React.Fragment key={index}>
                              {line}
                              {index < array.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                      </MobileCardValue>
                    </MobileCardRow>

                    <MobileCardActions>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <MobileCardLabel>Status:</MobileCardLabel>
                        <StyledSwitch
                          checked={banner.isActive}
                          onChange={() => handleToggleStatus(banner.id)}
                        />
                      </Box>
                      <MobileActionButtons>
                        <EditIconButton onClick={() => handleEdit(banner.id)}>
                          <FiEdit size={18} />
                        </EditIconButton>
                        <DeleteIconButton
                          onClick={() => handleDelete(banner.id)}
                        >
                          <RiDeleteBin6Line size={18} />
                        </DeleteIconButton>
                      </MobileActionButtons>
                    </MobileCardActions>
                  </CardContent>
                </MobileCard>
              ))
            ) : (
              <Box
                sx={{ textAlign: "center", padding: "40px", color: "#666666" }}
              >
                No Banners found
              </Box>
            )}
          </MobileCardsContainer>
        </>
      ) : (
        <AddBanner
          initialData={editingBanner}
          onSave={handleSaveForm}
          onCancel={handleCancelForm}
        />
      )}
    </Box>
  );
};

export default HeroBanner;
