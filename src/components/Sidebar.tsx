"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  styled,
} from "@mui/material";
import { ExpandMore, ChevronRight } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DRAWER_WIDTH = 250;

interface Page {
  slug: string;
  title: string;
  category?: string;
}

interface CategoryGroup {
  name: string;
  pages: Page[];
}

interface Props {
  pages: Page[];
  mobileOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ pages, mobileOpen, onClose }: Props) => {
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );

  const { homePage, categories, uncategorized } = useMemo(() => {
    const home = pages.find((p) => p.slug === "");
    const groups = new Map<string, Page[]>();
    const noCategory: Page[] = [];

    pages.forEach((page) => {
      if (page.slug === "") return;
      if (page.category) {
        const existing = groups.get(page.category) || [];
        groups.set(page.category, [...existing, page]);
      } else {
        noCategory.push(page);
      }
    });

    const sortedCategories: CategoryGroup[] = Array.from(groups.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, categoryPages]) => ({
        name,
        pages: categoryPages.sort((a, b) => a.title.localeCompare(b.title)),
      }));

    return {
      homePage: home,
      categories: sortedCategories,
      uncategorized: noCategory.sort((a, b) => a.title.localeCompare(b.title)),
    };
  }, [pages]);

  useEffect(() => {
    const currentSlug = pathname === "/" ? "" : pathname.slice(1);
    const currentPage = pages.find((p) => p.slug === currentSlug);
    if (currentPage?.category) {
      setExpandedCategories(
        (prev) => new Set([...Array.from(prev), currentPage.category!]),
      );
    }
  }, [pathname, pages]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryName)) {
        next.delete(categoryName);
      } else {
        next.add(categoryName);
      }
      return next;
    });
  };

  const renderPageLink = (page: Page, indent = false) => {
    const href = page.slug === "" ? "/" : `/${page.slug}`;
    const isActive = pathname === href;
    const Button = indent ? IndentedNavButton : NavButton;

    return (
      <ListItem key={page.slug} disablePadding>
        <Button
          component={Link}
          href={href}
          selected={isActive}
          onClick={onClose}
        >
          <ListItemText primary={page.title} />
        </Button>
      </ListItem>
    );
  };

  const drawerContent = (
    <DrawerContent>
      <Toolbar />
      <List>
        {homePage && renderPageLink(homePage)}

        {categories.map((category) => {
          const isExpanded = expandedCategories.has(category.name);
          return (
            <div key={category.name}>
              <ListItem disablePadding>
                <CategoryButton onClick={() => toggleCategory(category.name)}>
                  {isExpanded ? <ExpandMore /> : <ChevronRight />}
                  <ListItemText primary={category.name} />
                </CategoryButton>
              </ListItem>
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {category.pages.map((page) => renderPageLink(page, true))}
                </List>
              </Collapse>
            </div>
          );
        })}

        {uncategorized.map((page) => renderPageLink(page))}
      </List>
    </DrawerContent>
  );

  return (
    <NavContainer>
      <MobileDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawerContent}
      </MobileDrawer>
      <DesktopDrawer variant="permanent" open>
        {drawerContent}
      </DesktopDrawer>
    </NavContainer>
  );
};

const NavContainer = styled("nav")(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  [theme.breakpoints.down("md")]: {
    width: 0,
  },
}));

const DrawerContent = styled("div")({});

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  display: "block",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: DRAWER_WIDTH,
  },
}));

const DesktopDrawer = styled(Drawer)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: DRAWER_WIDTH,
  },
}));

const NavButton = styled(ListItemButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
})) as typeof ListItemButton;

const IndentedNavButton = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
})) as typeof ListItemButton;

const CategoryButton = styled(ListItemButton)(({ theme }) => ({
  gap: theme.spacing(1),
  "& .MuiSvgIcon-root": {
    fontSize: "1.25rem",
  },
  "& .MuiListItemText-primary": {
    fontWeight: 600,
  },
}));
