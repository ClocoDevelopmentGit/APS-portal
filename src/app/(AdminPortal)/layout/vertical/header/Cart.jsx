import React, { useState, useContext } from "react";
import { sum } from "lodash";
import { IconShoppingCart, IconX } from "@tabler/icons-react";
import { Box, Badge, IconButton } from "@mui/material";
// import { ProductContext } from '@/app/context/Ecommercecontext';

const Cart = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const handleDrawerClose = () => {
    setShowDrawer(false);
  };

  return (
    <Box>
      <IconButton
        size="large"
        color="inherit"
        onClick={() => setShowDrawer(true)}
        sx={{
          color: "text.secondary",
          ...(showDrawer && {
            color: "primary.main",
          }),
        }}
      >
        <Badge color="error" badgeContent={0}>
          <IconShoppingCart size="24" stroke="1.5" />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default Cart;
