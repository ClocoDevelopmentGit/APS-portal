import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SidebarItems from "./SidebarItems";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { CustomizerContext } from "@/app/context/customizerContext";
import config from "@/app/context/config";
import { useDispatch } from "react-redux";
import { fetchAllCourses } from "@/redux/slices/courseSlice";
import { fetchAllCategories } from "@/redux/slices/categorySlice";
import { fetchAllLocations } from "@/redux/slices/locationSlice";
import { fetchAllStaffs } from "@/redux/slices/userSlice";
import { fetchAllEvents } from "@/redux/slices/eventSlice";
import { fetchAllTerms } from "@/redux/slices/termSlice";
import { Typography } from "@mui/material";

const Sidebar = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const {
    isCollapse,
    isSidebarHover,
    setIsSidebarHover,
    isMobileSidebar,
    setIsMobileSidebar,
  } = useContext(CustomizerContext);
  const MiniSidebarWidth = config.miniSidebarWidth;
  const SidebarWidth = config.sidebarWidth;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCourses());
    dispatch(fetchAllCategories());
    dispatch(fetchAllLocations());
    dispatch(fetchAllStaffs());
    dispatch(fetchAllEvents());
    dispatch(fetchAllTerms());
  }, [dispatch]);

  const theme = useTheme();
  const toggleWidth =
    isCollapse == "mini-sidebar" && !isSidebarHover
      ? MiniSidebarWidth
      : SidebarWidth;

  const onHoverEnter = () => {
    if (isCollapse == "mini-sidebar") {
      setIsSidebarHover(true);
    }
  };

  const onHoverLeave = () => {
    setIsSidebarHover(false);
  };

  return (
    <>
      {!lgUp ? (
        <Box
          sx={{
            zIndex: 100,
            width: toggleWidth,
            flexShrink: 0,
            background:
              "linear-gradient(175deg, #635738 5.26%, #C9B172 114.63%)",
            borderRadius: "0px",
            ...(isCollapse == "mini-sidebar" && {
              position: "absolute",
            }),
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar for desktop */}
          {/* ------------------------------------------- */}
          <Drawer
            anchor="left"
            open
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
            variant="permanent"
            slotProps={{
              paper: {
                sx: {
                  transition: theme.transitions.create("width", {
                    duration: theme.transitions.duration.shortest,
                  }),
                  width: toggleWidth,
                  boxSizing: "border-box",
                  background: "transparent",
                  border: "none",
                  overflow: "hidden",
                },
              },
            }}
          >
            {/* ------------------------------------------- */}
            {/* Sidebar Box */}
            {/* ------------------------------------------- */}
            <Box
              sx={{
                background: "rgba(217, 217, 217, 0.07)",
                height: "calc(100% - 16px)",
                margin: "8px",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow:
                  " rgba(254, 254, 254, 0.25) 0px 30px 60px 0px inset, rgba(255, 255, 255, 0.13) 0px 18px 36px -10px inset",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* ------------------------------------------- */}
              {/* Logo */}
              {/* ------------------------------------------- */}
              <Box
                sx={{
                  px: 1,
                  pt: 3,
                  pb: 2,
                  mx: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottom: "1px solid  #FFFFFF",
                  borderRadius: "0px",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: "60px",
                    width: "160px",
                  }}
                >
                  <Image
                    src="/Images/APSlogo.png"
                    alt="logo"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </Box>
              </Box>

              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  overflowX: "hidden",
                  pb: 2,
                  "&::-webkit-scrollbar": {
                    width: "0px",
                    display: "none",
                  },
                  "&::-webkit-scrollbar-track": {
                    display: "none",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    display: "none",
                  },
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <Typography
                  sx={{
                    padding: "20px 20px 0 35px",
                    color: "rgba(255, 255, 255, 0.81)",
                    fontSize: "12px",
                    fontWeight: "200",
                  }}
                >
                  Main Menu
                </Typography>
                <SidebarItems />
              </Box>
            </Box>
          </Drawer>
        </Box>
      ) : (
        <Drawer
          anchor="left"
          open={isMobileSidebar}
          onClose={() => setIsMobileSidebar(false)}
          variant="temporary"
          slotProps={{
            paper: {
              sx: {
                background:
                  "linear-gradient(175deg, #635738 5.26%, #C9B172 114.63%)",
                width: SidebarWidth,
                border: "0 !important",
                boxShadow: "none",
                overflow: "hidden",
              },
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Mobile Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              background: "rgba(217, 217, 217, 0.07)",
              height: "calc(100% - 16px)",
              margin: "8px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow:
                " rgba(254, 254, 254, 0.25) 0px 30px 60px 0px inset, rgba(255, 255, 255, 0.13) 0px 18px 36px -10px inset",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box
              sx={{
                px: 1,
                pt: 3,
                pb: 2,
                mx: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: "1px solid  #FFFFFF",
                borderRadius: "0px",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: "60px",
                  width: "200px",
                }}
              >
                <Image
                  src="/Images/APSlogo.png"
                  alt="logo"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </Box>
            </Box>

            {/* ------------------------------------------- */}
            {/* Sidebar For Mobile */}
            {/* ------------------------------------------- */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                pb: 2,
                "&::-webkit-scrollbar": {
                  width: "0px",
                  display: "none",
                },
                "&::-webkit-scrollbar-track": {
                  display: "none",
                },
                "&::-webkit-scrollbar-thumb": {
                  display: "none",
                },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <Typography
                sx={{
                  padding: "20px 20px 0 35px",
                  color: "rgba(255, 255, 255, 0.81)",
                  fontSize: "12px",
                  fontWeight: "200",
                }}
              >
                Main Menu
              </Typography>
              <SidebarItems />
            </Box>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
