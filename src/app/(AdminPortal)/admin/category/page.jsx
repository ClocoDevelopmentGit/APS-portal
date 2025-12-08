"use client";
import React, { useEffect, useState } from "react";
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
  Portal,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconCheck, IconX } from "@tabler/icons-react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IconPlus } from "@tabler/icons-react";
import CreateCategory from "./components/CreateCategory";
import ConfirmationDialog from "@/app/components/confirmation-dialog/ConfirmationDialog";
import Alerts from "@/app/components/Alert/Alert";
import Loading from "@/app/loading";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, updateCategory } from "@/redux/slices/categorySlice";

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
  "&:disabled": {
    backgroundColor: "#D4C4B0",
    color: "#FFFFFF",
    boxShadow: "none",
    cursor: "not-allowed",
    opacity: 0.6,
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

// ==================== COMPONENT ====================

const CourseCategory = () => {
  const dispatch = useDispatch();
  const { categories, error } = useSelector((state) => state.category);
  const [categoriesList, setCategoriesList] = useState();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "" });
  const [openModal, setOpenModal] = useState(false);
  const [alert, setAlert] = useState({ severity: "", message: "" });
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteTitle, setDeleteTitle] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [overlayLoading, setOverlayLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      let storedCategories = [];

      if (typeof window !== "undefined") {
        const categoriesData = localStorage.getItem("allCategories");
        storedCategories = categoriesData ? JSON.parse(categoriesData) : [];
      }

      if (categories && categories.length > 0) {
        setCategoriesList(categories);
      } else {
        setCategoriesList(storedCategories);
      }

      setLoading(false);
    };

    fetchData();
  }, [categories]);

  useEffect(() => {
    const errorSet = () => {
      if (error) {
        setAlert({ severity: "error", message: error });
      }
    };
    errorSet();
  }, [error]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setDeleteTitle(
      category?.courses?.length === 0
        ? "Are you Sure?"
        : "Cannot Delete Category!"
    );
    setDeleteStatus(category?.courses?.length === 0 ? true : false);
    setDeleteMessage(
      category?.courses?.length === 0
        ? `The category "${category?.name}" will be deleted.`
        : `This category has ${category?.courses?.length} course${
            category?.courses?.length > 1 ? "s" : ""
          } assigned to it. Therefore, "${category?.name}" cannot be deleted.`
    );
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (categoryToDelete) {
      try {
        setOverlayLoading(true);
        await dispatch(deleteCategory(categoryToDelete.id))
          .unwrap()
          .then(() => {
            setAlert({
              severity: "success",
              message: "Category Deleted Successfully",
            });
          });
      } catch (error) {
        setAlert({
          severity: "error",
          message: error,
        });
      } finally {
        setLoading(false);
      }
      setCategoryToDelete(null);
    }
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setCategoryToDelete(null);
  };

  const handleToggleStatus = async (id) => {
    setOverlayLoading(true);
    const updatedData = categoriesList.find((cat) => cat.id === id);

    if (!updatedData) return;

    const toggled = {
      name: updatedData.name,
      isActive: !updatedData.isActive,
    };

    const newData = { ...updatedData, ...toggled };

    const newList = categoriesList.map((cat) =>
      cat.id === id ? newData : cat
    );

    try {
      await dispatch(updateCategory({ id, formData: toggled }))
        .unwrap()
        .then(() => {
          setCategoriesList(newList);
          setAlert({
            severity: "success",
            message: `Category is ${
              toggled.isActive ? "activated" : "deactivated"
            } successfully`,
          });
        });
    } catch (error) {
      setAlert({
        severity: "error",
        message: error,
      });
    } finally {
      setOverlayLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setEditForm({
      name: category.name,
    });
  };

  const handleSave = async (id) => {
    setOverlayLoading(true);
    const updatedData = categoriesList.find((cat) => cat.id === id);

    if (!updatedData) return;

    const editedData = {
      name: editForm.name,
      isActive: updatedData.isActive,
    };

    const newData = { ...updatedData, ...editedData };

    const newList = categoriesList.map((cat) =>
      cat.id === id ? newData : cat
    );
    try {
      await dispatch(updateCategory({ id, formData: editedData }))
        .unwrap()
        .then(() => {
          setCategoriesList(newList);
          setAlert({
            severity: "success",
            message: "Category Name Updated Successfully",
          });
        });
    } catch (error) {
      setAlert({
        severity: "error",
        message: error,
      });
    } finally {
      setOverlayLoading(false);
    }
    setEditingId(null);
    setEditForm({ name: "" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ name: "" });
  };

  const handleChange = (field, value) => {
    setEditForm({
      ...editForm,
      [field]: value,
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <PageContainer>
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
              {categoriesList?.map((category) => (
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
                      checked={category.isActive === true}
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
      <CreateCategory
        open={openModal}
        onClose={handleCloseModal}
        setAlert={setAlert}
        setOverlayLoading={setOverlayLoading}
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleConfirmDelete}
        title={deleteTitle}
        message={deleteMessage}
        showDelete={deleteStatus}
      />
    </PageContainer>
  );
};

export default CourseCategory;
