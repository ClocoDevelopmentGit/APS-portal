"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import ImageUpload from "@/app/components/image-upload/media-upload";

// ==================== STYLED COMPONENTS ====================

const SectionTitle = styled(Typography)({
  fontSize: "15px",
  fontWeight: 600,
  color: "#635738",
  lineHeight: "21px",
});

const SectionDescription = styled(Typography)({
  fontSize: "12px",
  fontWeight: 400,
  color: "#757575",
  lineHeight: "17px",
  marginBottom: "24px",
});

const FormContainer = styled(Box)({
  paddingTop: "10px",
});

const FieldLabel = styled(Typography)({
  fontSize: "13px",
  fontWeight: 500,
  color: "#191919",
  marginBottom: "8px",
  lineHeight: "18px",
  "& span": {
    color: "#EE5B54",
  },
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    backgroundColor: "#FFFFFF",
    fontSize: "13px",
    "& fieldset": {
      borderColor: "#E0E0E0",
    },
    "&:hover fieldset": {
      borderColor: "#AE9964",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#AE9964",
    },
  },
  "& .MuiInputBase-input": {
    padding: "10px 14px",
    fontSize: "13px",
    color: "#333333",
    "&::placeholder": {
      color: "#999999",
      opacity: 1,
    },
  },
  "& .MuiInputBase-inputMultiline": {
    padding: "10px 14px",
  },
});

const CharacterCount = styled(Typography)({
  fontSize: "11px",
  fontWeight: 400,
  color: "#999999",
  textAlign: "right",
  marginTop: "-15px",
  marginBottom: "20px",
  lineHeight: "15px",
});

const HelperText = styled(Typography)({
  fontSize: "11px",
  fontWeight: 400,
  color: "#757575",
  lineHeight: "15px",
  marginTop: "-15px",
  marginBottom: "20px",
});

const FieldRow = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
  "@media (max-width: 600px)": {
    gridTemplateColumns: "1fr",
  },
});

const UploadSection = styled(Box)({
  marginBottom: "20px",
  display: "grid",
  gap: "16px",
  gridTemplateColumns: "1fr 1fr",
  "@media (max-width: 600px)": {
    gridTemplateColumns: "1fr",
  },
});

const UploadNote = styled(Typography)({
  fontSize: "11px",
  fontWeight: 400,
  color: "#757575",
  lineHeight: "16px",
});

const ButtonContainer = styled(Box)({
  display: "flex",
  gap: "12px",
  justifyContent: "flex-start",
  paddingTop: "10px",
});

const SaveButton = styled(Button)({
  backgroundColor: "#AE9964",
  color: "#FFFFFF",
  textTransform: "none",
  fontSize: "13px",
  fontWeight: 600,
  padding: "8px 24px",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: "#9d8757",
  },
});

const CancelButton = styled(Button)({
  backgroundColor: "#AE9964",
  color: "#FFFFFF",
  textTransform: "none",
  fontSize: "13px",
  fontWeight: 600,
  padding: "8px 24px",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: "#9d8757",
  },
});

// ==================== COMPONENT ====================

const VisionMission = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    buttonText: "",
    buttonLink: "",
    media: null,
  });

  const maxTitleLength = 50;
  const maxContentLength = 500;

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        media: file,
      });
    }
  };

  const handleSave = () => {
    console.log("Saving form data:", formData);
    // Add your save logic here
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      content: "",
      buttonText: "",
      buttonLink: "",
      media: null,
    });
  };

  return (
    <Box>
      <Box sx={{ marginBottom: "6px" }}>
        <SectionTitle>Vision & Mission Section</SectionTitle>
        <SectionDescription>
          Studio philosophy and mission statement with circular image.
        </SectionDescription>
      </Box>

      <FormContainer>
        {/* Section Title */}
        <Box>
          <FieldLabel>
            Section Title: <span>*</span>
          </FieldLabel>
          <StyledTextField
            fullWidth
            placeholder="Our Vision - Our Mission"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            inputProps={{ maxLength: maxTitleLength }}
          />
          <CharacterCount>
            {formData.title.length}/{maxTitleLength}
          </CharacterCount>
        </Box>

        {/* Content */}
        <Box>
          <FieldLabel>
            Content: <span>*</span>
          </FieldLabel>
          <StyledTextField
            fullWidth
            multiline
            rows={6}
            placeholder="We approach performance training with honesty, integrity and commitment to each student's individual development.

It is our belief the art of performance will make your heart soar and enrich you as a human being.

Our passion for the craft and our commitment to the personal development of each student are the core motivations behind what we do."
            value={formData.content}
            onChange={(e) => handleChange("content", e.target.value)}
            inputProps={{ maxLength: maxContentLength }}
          />
          <CharacterCount>
            {formData.content.length}/{maxContentLength}
          </CharacterCount>
          <HelperText>Use line breaks to separate paragraphs</HelperText>
        </Box>

        {/* Button Text & Link */}
        <FieldRow>
          <Box>
            <FieldLabel>
              Button text: <span>*</span>
            </FieldLabel>
            <StyledTextField
              fullWidth
              placeholder="View more"
              value={formData.buttonText}
              onChange={(e) => handleChange("buttonText", e.target.value)}
            />
          </Box>
          <Box>
            <FieldLabel>
              Button link: <span>*</span>
            </FieldLabel>
            <StyledTextField
              fullWidth
              placeholder="/about-us"
              value={formData.buttonLink}
              onChange={(e) => handleChange("buttonLink", e.target.value)}
            />
          </Box>
        </FieldRow>

        {/* Upload Media */}
        <UploadSection>
          <Box>
            <FieldLabel>Upload Media:</FieldLabel>
            <ImageUpload />
            <UploadNote>Recommended image size: 1440 × 720px</UploadNote>
          </Box>
        </UploadSection>

        {/* Action Buttons */}
        <ButtonContainer>
          <SaveButton onClick={handleSave}>Save changes</SaveButton>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        </ButtonContainer>
      </FormContainer>
    </Box>
  );
};

export default VisionMission;
