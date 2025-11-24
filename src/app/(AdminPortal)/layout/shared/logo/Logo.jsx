"use client";
import { useContext } from "react";
import { CustomizerContext } from "@/app/context/customizerContext";
import config from "@/app/context/config";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Image from "next/image";

// Move styled component outside and make it accept props
const LinkStyled = styled(Link, {
  shouldForwardProp: (prop) =>
    prop !== "isCollapsed" && prop !== "isSidebarHover",
})(({ isCollapsed, isSidebarHover }) => ({
  // height: config.topbarHeight,
  // width: isCollapsed && !isSidebarHover ? "40px" : "180px",
  // overflow: "hidden",
  // display: "block",
  margin: "0",
  padding: "0",
}));

const Logo = () => {
  const { isCollapse, isSidebarHover, activeDir, activeMode } =
    useContext(CustomizerContext);
  const TopbarHeight = config.topbarHeight;

  return (
    <LinkStyled
      href="/"
      isCollapsed={isCollapse === "mini-sidebar"}
      isSidebarHover={isSidebarHover}
    >
      <Image
        src="/Images/APSlogo.png"
        alt="logo"
        fill
        style={{ objectFit: "contain", paddingLeft: "-10px" }}
        priority
      />
    </LinkStyled>
  );
};

export default Logo;
