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

const AddBanner = ({ initialData, onSave, onCancel }) => {
  // Initialize state directly with initialData or default values
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      subtitle: "",
      button1Text: "",
      button1Link: "",
      button2Text: "",
      button2Link: "",
      media: null,
    }
  );

  const maxTitleLength = 100;
  const maxSubtitleLength = 200;

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
    onSave(formData);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Box>
      <Box sx={{ marginBottom: "6px" }}>
        <SectionTitle>Hero Banner</SectionTitle>
        <SectionDescription>
          Main banner at the top of homepage with title, subtitle and
          call-to-action buttons.
        </SectionDescription>
      </Box>

      <FormContainer>
        {/* Banner Title */}
        <Box>
          <FieldLabel>
            Banner Title: <span>*</span>
          </FieldLabel>
          <StyledTextField
            fullWidth
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            inputProps={{ maxLength: maxTitleLength }}
          />
          <CharacterCount>
            {formData.title.length}/{maxTitleLength}
          </CharacterCount>
        </Box>

        {/* Banner Subtitle */}
        <Box>
          <FieldLabel>Banner Subtitle:</FieldLabel>
          <StyledTextField
            fullWidth
            multiline
            rows={3}
            value={formData.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            inputProps={{ maxLength: maxSubtitleLength }}
          />
          <CharacterCount>
            {formData.subtitle.length}/{maxSubtitleLength}
          </CharacterCount>
        </Box>

        {/* Button 1 */}
        <FieldRow>
          <Box>
            <FieldLabel>
              Button 1 text: <span>*</span>
            </FieldLabel>
            <StyledTextField
              fullWidth
              value={formData.button1Text}
              onChange={(e) => handleChange("button1Text", e.target.value)}
            />
          </Box>
          <Box>
            <FieldLabel>
              Button 1 link: <span>*</span>
            </FieldLabel>
            <StyledTextField
              fullWidth
              value={formData.button1Link}
              onChange={(e) => handleChange("button1Link", e.target.value)}
            />
          </Box>
        </FieldRow>

        {/* Button 2 */}
        <FieldRow>
          <Box>
            <FieldLabel>
              Button 2 text: <span>*</span>
            </FieldLabel>
            <StyledTextField
              fullWidth
              value={formData.button2Text}
              onChange={(e) => handleChange("button2Text", e.target.value)}
            />
          </Box>
          <Box>
            <FieldLabel>
              Button 2 link: <span>*</span>
            </FieldLabel>
            <StyledTextField
              fullWidth
              value={formData.button2Link}
              onChange={(e) => handleChange("button2Link", e.target.value)}
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

export default AddBanner;
