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
  Paper,
  Switch,
  IconButton,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconCheck, IconX } from "@tabler/icons-react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IconPlus } from "@tabler/icons-react";
import CreateCategory from "./components/CreateCategory";
import ConfirmationDialog from "@/app/components/confirmation-dialog/ConfirmationDialog";

// ==================== STYLED COMPONENTS ====================

const PageContainer = styled(Box)({
  padding: "24px",
  backgroundColor: "transparent",
  minHeight: "100vh",
});

const HeaderSection = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "24px",
  "@media (max-width: 576px)": {
    flexDirection: "column",
    gap: "16px",
  },
});

const TitleSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const PageTitle = styled(Typography)({
  fontSize: "20px",
  fontWeight: 700,
  color: "#191919",
  lineHeight: "24px",
  marginBottom: "6px",
});

const PageSubtitle = styled(Typography)({
  fontSize: "14px",
  fontWeight: 400,
  color: "#666666",
  lineHeight: "18px",
});

const AddButton = styled(Button)({
  backgroundColor: "#AE9964",
  color: "#FFFFFF",
  textTransform: "none",
  fontSize: "13px",
  fontWeight: 600,
  padding: "8px 16px",
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: "#9d8757",
  },
});

const ContentCard = styled(Paper)({
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.10)",
});

const SectionTitle = styled(Typography)({
  fontSize: "17px",
  fontWeight: 700,
  color: "#635738",
  marginBottom: "30px",
  paddingBottom: "20px",
  borderBottom: "1px solid #D0D0D0",
  lineHeight: "21px",
});

const StyledTableContainer = styled(TableContainer)({
  border: "1px solid #E5E7EB",
  borderRadius: "8px",
  overflow: "hidden",
  "& .MuiTable-root": {
    minWidth: 650,
  },
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: "transparent",
});

const StyledHeaderCell = styled(TableCell)({
  fontSize: "14px",
  fontWeight: 600,
  color: "#191919",
  borderBottom: "1px solid #E5E7EB",
  padding: "16px",
});

const StyledTableCell = styled(TableCell)({
  fontSize: "14px",
  fontWeight: 400,
  color: "#333333",
  borderBottom: "1px solid #E5E7EB",
  padding: "16px",
});

const StyledSwitch = styled(Switch)({
  width: 44,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
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
    width: 20,
    height: 20,
  },
  "& .MuiSwitch-track": {
    borderRadius: 24 / 2,
    backgroundColor: "#9CA3AF",
    opacity: 1,
  },
});

const EditIconButton = styled(IconButton)({
  color: "#AE9964",
  padding: "8px",
  "&:hover": {
    color: "#AE9964",
    backgroundColor: "rgba(174, 153, 100, 0.08)",
  },
});

const DeleteIconButton = styled(IconButton)({
  color: "#AE9964",
  padding: "8px",
  "&:hover": {
    color: "red",
    backgroundColor: "rgba(232, 90, 79, 0.08)",
  },
});

const SaveIconButton = styled(IconButton)({
  color: "#FFFFFF",
  backgroundColor: "#AE9964",
  padding: "5px",
  "&:hover": {
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    color: "#FFFFFF",
    backgroundColor: "#AE9964",
  },
});

const CancelIconButton = styled(IconButton)({
  color: "#FFFFFF",
  backgroundColor: "#AE9964",
  padding: "5px",
  "&:hover": {
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    color: "#FFFFFF",
    backgroundColor: "#AE9964",
  },
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontSize: "14px",
    "& fieldset": {
      borderColor: "#E5E7EB",
    },
    "&:hover fieldset": {
      borderColor: "#AE9964",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#AE9964",
    },
  },
  "& .MuiInputBase-input": {
    padding: "8px 12px",
  },
});

// ==================== SAMPLE DATA ====================

const initialCategories = [
  {
    id: 1,
    name: "Acting",
    description: "Acting Classes Description",
    status: true,
  },
  {
    id: 2,
    name: "Industry Driven",
    description: "Industry Driven Description",
    status: true,
  },
  {
    id: 3,
    name: "Musical Theatre",
    description: "Musical Theatre Description",
    status: true,
  },
  {
    id: 4,
    name: "NDIS",
    description: "NDIS Description",
    status: false,
  },
];

// ==================== COMPONENT ====================

const CourseCategory = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", description: "" });
  const [openModal, setOpenModal] = useState(false);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      setCategories(categories.filter((cat) => cat.id !== categoryToDelete.id));
      setCategoryToDelete(null);
    }
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setCategoryToDelete(null);
  };

  const handleToggleStatus = (id) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, status: !cat.status } : cat
      )
    );
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setEditForm({
      name: category.name,
      description: category.description,
    });
  };

  const handleSave = (id) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id
          ? { ...cat, name: editForm.name, description: editForm.description }
          : cat
      )
    );
    setEditingId(null);
    setEditForm({ name: "", description: "" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ name: "", description: "" });
  };

  const handleChange = (field, value) => {
    setEditForm({
      ...editForm,
      [field]: value,
    });
  };

  return (
    <PageContainer>
      {/* Header */}
      <HeaderSection>
        <TitleSection>
          <PageTitle>Category Management</PageTitle>
          <PageSubtitle>Homepage / Category</PageSubtitle>
        </TitleSection>
        <AddButton startIcon={<IconPlus size={18} />} onClick={handleOpenModal}>
          Add Category
        </AddButton>
      </HeaderSection>

      {/* Content Card */}
      <ContentCard>
        <SectionTitle>List of Course Categories</SectionTitle>

        {/* Table */}
        <StyledTableContainer>
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell>Category Name</StyledHeaderCell>
                <StyledHeaderCell align="center">Status</StyledHeaderCell>
                <StyledHeaderCell align="center">Edit</StyledHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  {/* Category Name */}
                  <StyledTableCell>
                    {editingId === category.id ? (
                      <StyledTextField
                        fullWidth
                        value={editForm.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        size="small"
                      />
                    ) : (
                      category.name
                    )}
                  </StyledTableCell>

                  {/* Status Toggle */}
                  <StyledTableCell align="center">
                    <StyledSwitch
                      checked={category.status}
                      onChange={() => handleToggleStatus(category.id)}
                    />
                  </StyledTableCell>

                  {/* Edit/Delete Actions */}
                  <StyledTableCell align="center">
                    {editingId === category.id ? (
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          justifyContent: "center",
                        }}
                      >
                        <SaveIconButton onClick={() => handleSave(category.id)}>
                          <IconCheck size={15} />
                        </SaveIconButton>
                        <CancelIconButton onClick={handleCancel}>
                          <IconX size={15} />
                        </CancelIconButton>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        <EditIconButton onClick={() => handleEdit(category)}>
                          <FiEdit size={20} />
                        </EditIconButton>
                        <DeleteIconButton
                          onClick={() => handleDelete(category)}
                        >
                          <RiDeleteBin6Line size={20} />
                        </DeleteIconButton>
                      </Box>
                    )}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </ContentCard>

      {/* Create Category Modal */}
      <CreateCategory open={openModal} onClose={handleCloseModal} />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleConfirmDelete}
        message={`You are about to delete this course category!`}
      />
    </PageContainer>
  );
};

export default CourseCategory;
