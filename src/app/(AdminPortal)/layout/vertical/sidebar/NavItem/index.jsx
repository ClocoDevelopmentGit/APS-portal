import React, { useContext } from "react";
import Link from "next/link";
import PropTypes from "prop-types";

// mui imports
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { CustomizerContext } from "@/app/context/customizerContext";

// Move styled component outside
const ListItemStyled = styled(ListItemButton, {
  shouldForwardProp: (prop) =>
    prop !== "level" &&
    prop !== "hideMenu" &&
    prop !== "isActive" &&
    prop !== "borderRadius",
})(({ theme, level, hideMenu, isActive, borderRadius }) => ({
  whiteSpace: "nowrap",
  marginBottom: "2px",
  padding: "8px 10px",
  borderRadius: `${borderRadius}px`,
  backgroundColor: level > 1 ? "transparent !important" : "inherit",
  color: level > 1 && isActive ? `${"#AE9964"}!important` : "#FFF",
  paddingLeft: hideMenu ? "10px" : level > 2 ? `${level * 15}px` : "10px",
  "&:hover": {
    backgroundColor: "#FFF",
    color: "#AE9964",
  },
  "&.Mui-selected": {
    color: "#AE9964",
    backgroundColor: "#FFF",
    "&:hover": {
      backgroundColor: "#FFF",
      color: "#AE9964",
    },
  },
}));

export default function NavItem({
  item,
  level,
  pathDirect,
  hideMenu,
  onClick,
}) {
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { isBorderRadius } = useContext(CustomizerContext);

  const Icon = item?.icon;
  const theme = useTheme();
  const { t } = useTranslation();
  const itemIcon =
    level > 1 ? (
      <Icon stroke={1.5} size="1rem" />
    ) : (
      <Icon stroke={1.5} size="1.3rem" />
    );

  const isActive = pathDirect === item?.href;

  return (
    <List
      component="li"
      disablePadding
      key={item?.id && item.title}
      sx={{ margin: "10px 0 20px 0" }}
    >
      <Link href={item.href}>
        <ListItemStyled
          disabled={item?.disabled}
          selected={isActive}
          onClick={lgDown ? onClick : undefined}
          level={level}
          hideMenu={hideMenu}
          isActive={isActive}
          borderRadius={isBorderRadius}
        >
          <ListItemIcon
            sx={{
              minWidth: "36px",
              p: "3px 0",
              color:
                level > 1 && isActive
                  ? `${theme.palette.primary.main}!important`
                  : "inherit",
            }}
          >
            {itemIcon}
          </ListItemIcon>
          <ListItemText>
            {t(`${item?.title}`)}
            <br />
            {item?.subtitle ? (
              <Typography variant="caption">
                {hideMenu ? "" : item?.subtitle}
              </Typography>
            ) : (
              ""
            )}
          </ListItemText>

          {!item?.chip || hideMenu ? null : (
            <Chip
              color={item?.chipColor}
              variant={item?.variant ? item?.variant : "filled"}
              size="small"
              label={item?.chip}
            />
          )}
        </ListItemStyled>
      </Link>
    </List>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  pathDirect: PropTypes.any,
  hideMenu: PropTypes.any,
  onClick: PropTypes.func,
};
