"use client";
import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconX, IconUpload, IconEye } from "@tabler/icons-react";

// ==================== STYLED COMPONENTS ====================

const UploadContainer = styled(Box)({
  position: "relative",
  marginBottom: "8px",
});

const FileInputBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "0px 0px 0px 16px",
  borderRadius: "8px",
  border: "1px solid #E0E0E0",
  backgroundColor: "#FFFFFF",
  gap: "12px",
  "&:hover": {
    borderColor: "#AE9964",
  },
});

const FileNameDisplay = styled(Typography)(({ clickable }) => ({
  flex: 1,
  fontSize: "13px",
  color: "#999999",
  cursor: clickable ? "pointer" : "default",
  "&.selected": {
    color: "#181818",
  },
  "&:hover": {
    color: clickable ? "#AE9964" : undefined,
  },
}));

const HiddenFileInput = styled("input")({
  display: "none",
});

const UploadButton = styled(Button)({
  backgroundColor: "#B38349",
  color: "#FFFFFF",
  textTransform: "none",
  fontSize: "13px",
  fontWeight: 600,
  padding: "8px 20px",
  borderRadius: "6px",
  minWidth: "90px",
  flexShrink: 0,
  "&:hover": {
    backgroundColor: "#9d8757",
  },
  "&.preview": {
    backgroundColor: "#B38349",
    "&:hover": {
      backgroundColor: "#a07d5a",
    },
  },
});

const NoteText = styled(Typography)({
  fontSize: "12px",
  color: "#666666",
  marginTop: "4px",
});

const ErrorText = styled(Typography)({
  fontSize: "12px",
  color: "#E85A4F",
  marginTop: "4px",
});

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    maxWidth: "800px",
    width: "100%",
  },
});

const StyledDialogTitle = styled(DialogTitle)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 24px",
  fontSize: "18px",
  fontWeight: 700,
  color: "#191919",
  borderBottom: "1px solid #D3D3D3",
});

const CloseButton = styled(IconButton)({
  padding: "4px",
  color: "#666666",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
});

const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "300px",
});

const PreviewImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "600px",
  objectFit: "contain",
  padding: "20px",
  //   borderRadius: "8px",
});

const PreviewVideo = styled("video")({
  maxWidth: "100%",
  maxHeight: "600px",
  padding: "20px",
  //   borderRadius: "8px",
});

// ==================== COMPONENT ====================

const FileUploadPreview = ({
  onFileSelect,
  acceptedTypes = ".jpg,.jpeg,.png,.gif,.mp4",
  maxSize = 5, // in MB
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [openPreview, setOpenPreview] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError("");

    if (file) {
      // Validate file type
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const validExtensions = acceptedTypes
        .split(",")
        .map((ext) => ext.replace(".", "").trim());

      if (!validExtensions.includes(fileExtension)) {
        setError(`Invalid file type. Accepted types: ${acceptedTypes}`);
        setSelectedFile(null);
        setFilePreviewUrl(null);
        return;
      }

      // Validate file size
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSize) {
        setError(`File size exceeds ${maxSize}MB limit`);
        setSelectedFile(null);
        setFilePreviewUrl(null);
        return;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setFilePreviewUrl(previewUrl);

      // Call parent callback if provided
      if (onFileSelect) {
        onFileSelect(file, previewUrl);
      }
    }
  };

  const handleTextFieldClick = () => {
    // Only allow file selection when a file is already selected
    if (selectedFile) {
      fileInputRef.current?.click();
    }
  };

  const handleButtonClick = () => {
    if (selectedFile) {
      // If file is selected, open preview
      setOpenPreview(true);
    } else {
      // If no file, trigger file input
      fileInputRef.current?.click();
    }
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const isVideo = selectedFile && selectedFile.type.startsWith("video/");

  return (
    <>
      <Box>
        <UploadContainer>
          <FileInputBox>
            <FileNameDisplay
              className={selectedFile ? "selected" : ""}
              clickable={selectedFile ? 1 : 0}
              onClick={handleTextFieldClick}
            >
              {selectedFile ? selectedFile.name : "No file chosen"}
            </FileNameDisplay>

            <HiddenFileInput
              ref={fileInputRef}
              type="file"
              accept={acceptedTypes}
              onChange={handleFileChange}
            />

            <UploadButton
              className={selectedFile ? "preview" : ""}
              startIcon={
                selectedFile ? <IconEye size={16} /> : <IconUpload size={16} />
              }
              onClick={handleButtonClick}
            >
              {selectedFile ? "Preview" : "Upload"}
            </UploadButton>
          </FileInputBox>
        </UploadContainer>

        {error && <ErrorText>{error}</ErrorText>}

        {!error && (
          <NoteText>
            <strong>Note:</strong> Media files that are accepted are{" "}
            {acceptedTypes} - Max ({maxSize}MB)
          </NoteText>
        )}
      </Box>

      {/* Preview Modal */}
      <StyledDialog
        open={openPreview}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
      >
        <StyledDialogTitle>
          {selectedFile?.name}
          <CloseButton onClick={handleClosePreview}>
            <IconX size={20} />
          </CloseButton>
        </StyledDialogTitle>

        <StyledDialogContent>
          {isVideo ? (
            <PreviewVideo controls>
              <source src={filePreviewUrl} type={selectedFile.type} />
              Your browser does not support the video tag.
            </PreviewVideo>
          ) : (
            <PreviewImage src={filePreviewUrl} alt="Preview" />
          )}
        </StyledDialogContent>
      </StyledDialog>
    </>
  );
};

export default FileUploadPreview;
