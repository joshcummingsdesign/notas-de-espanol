"use client";

import { useState, useCallback, useEffect } from "react";
import { Toolbar, styled } from "@mui/material";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { SearchModal } from "./SearchModal";

interface Page {
  slug: string;
  title: string;
  content: string;
}

interface Props {
  pages: Page[];
  children: React.ReactNode;
}

export const Layout = ({ pages, children }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleSearchOpen = useCallback(() => {
    setSearchOpen(true);
  }, []);

  const handleSearchClose = useCallback(() => {
    setSearchOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <RootContainer>
      <Header
        onMenuClick={handleDrawerToggle}
        onSearchClick={handleSearchOpen}
      />
      <Sidebar
        pages={pages}
        mobileOpen={mobileOpen}
        onClose={handleDrawerClose}
      />
      <MainContent>
        <Toolbar />
        {children}
      </MainContent>
      <SearchModal
        pages={pages}
        open={searchOpen}
        onClose={handleSearchClose}
      />
    </RootContainer>
  );
};

const RootContainer = styled("div")({
  display: "flex",
});

const MainContent = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  maxWidth: "100%",
  overflow: "hidden",
}));
