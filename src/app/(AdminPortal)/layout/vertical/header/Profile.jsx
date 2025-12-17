import React, { useEffect, useState } from "react";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as dropdownData from "./data";
import { IconMail } from "@tabler/icons-react";
import { Stack } from "@mui/system";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RiNumbersFill } from "react-icons/ri";
import { logoutUser } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

const LogoutButton = styled(Button)({
  backgroundColor: "#AE9964",
  color: "#FFFFFF",
  border: " none",
  "&:hover": {
    backgroundColor: "#9d8757",
  },
});

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector((state) => state.user);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const logout = async () => {
    await dispatch(logoutUser())
      .unwrap()
      .then(() => {
        console.log("User logged out successfully");
        router.replace(
          `${process.env.NEXT_PUBLIC_REDIRECT_URL}/Pages/LoginPage`
        );
      })
      .catch((error) => {
        console.error("Error logging out user:", error);
      });
  };

  useEffect(() => {
    const fetchData = () => {
      let storedUser = null;

      if (typeof window !== "undefined") {
        const userDetails = localStorage.getItem("user");
        storedUser = userDetails ? JSON.parse(userDetails) : RiNumbersFill;
      }

      if (user) {
        setUserData(user);
      } else {
        setUserData(storedUser);
      }
    };

    fetchData();
  }, [user]);

  return (
    <Box>
      <IconButton
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={"/images/profile/user-1.jpg"}
          alt={userData?.firstName}
          sx={{
            width: 30,
            height: 30,
            fontSize: "16px",
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 4,
          },
        }}
      >
        <Typography variant="h5">User Profile</Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            py: 3,
            alignItems: "center",
          }}
        >
          <Avatar
            src={"/images/profile/user-1.jpg"}
            alt={userData?.firstName}
            sx={{ width: 95, height: 95 }}
          />
          <Box>
            <Typography
              variant="subtitle2"
              color="textPrimary"
              sx={{
                fontWeight: 600,
              }}
            >
              {userData?.firstName} {userData?.lastName}
            </Typography>
            {/* <Typography variant="subtitle2" color="textSecondary">
              Designer
            </Typography> */}
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconMail width={15} height={15} />
              {userData?.email}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        {/* {dropdownData.profile.map((profile) => (
          <Box key={profile.title}>
            <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
              <Link href={profile.href}>
                <Stack direction="row" spacing={2}>
                  <Box
                    sx={{
                      width: "45px",
                      height: "45px",
                      bgcolor: "primary.light",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: "0",
                    }}
                  >
                    <Avatar
                      src={profile.icon}
                      alt={profile.icon}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 0,
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="textPrimary"
                      className="text-hover"
                      noWrap
                      sx={{
                        fontWeight: 600,
                        width: "240px",
                      }}
                    >
                      {profile.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: "240px",
                      }}
                      noWrap
                    >
                      {profile.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </Link>
            </Box>
          </Box>
        ))} */}
        <Box
          sx={{
            mt: 2,
          }}
        >
          {/* <Box
            sx={{
              bgcolor: "primary.light",
              p: 3,
              mb: 3,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  zIndex: 1,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                  }}
                >
                  Unlimited <br />
                  Access
                </Typography>
                <Button variant="contained" color="primary">
                  Upgrade
                </Button>
              </Box>
              <Image
                src={"/images/backgrounds/unlimited-bg.png"}
                width={150}
                height={183}
                style={{ height: "auto", width: "auto" }}
                alt="unlimited"
                className="signup-bg"
              />
            </Box>
          </Box> */}
          <LogoutButton
            onClick={logout}
            variant="outlined"
            color="primary"
            fullWidth
          >
            Logout
          </LogoutButton>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
