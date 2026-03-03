"use client";

import { AppBar, Toolbar, IconButton, Box, styled } from "@mui/material";
import { Search as SearchIcon, Menu as MenuIcon } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";

interface Props {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export const Header = ({ onMenuClick, onSearchClick }: Props) => {
  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <MenuButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </MenuButton>
        <LogoLink href="/">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} priority />
          <SiteName>Notas de Español</SiteName>
        </LogoLink>
        <Spacer />
        <IconButton color="inherit" aria-label="search" onClick={onSearchClick}>
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "white",
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[1],
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const LogoLink = styled(Link)({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
});

const SiteName = styled("span")(({ theme }) => ({
  marginLeft: theme.spacing(1.5),
  fontSize: "1.25rem",
  fontWeight: 600,
  color: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Spacer = styled(Box)({
  flexGrow: 1,
});
