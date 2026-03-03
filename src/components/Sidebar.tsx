'use client';

import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, styled } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DRAWER_WIDTH = 250;

interface Page {
  slug: string;
  title: string;
}

interface Props {
  pages: Page[];
  mobileOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ pages, mobileOpen, onClose }: Props) => {
  const pathname = usePathname();

  const drawerContent = (
    <DrawerContent>
      <Toolbar />
      <List>
        {pages.map((page) => {
          const href = page.slug === '' ? '/' : `/${page.slug}`;
          const isActive = pathname === href;

          return (
            <ListItem key={page.slug} disablePadding>
              <NavButton
                component={Link}
                href={href}
                selected={isActive}
                onClick={onClose}
              >
                <ListItemText primary={page.title} />
              </NavButton>
            </ListItem>
          );
        })}
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

const NavContainer = styled('nav')(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  [theme.breakpoints.down('md')]: {
    width: 0,
  },
}));

const DrawerContent = styled('div')({});

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: DRAWER_WIDTH,
  },
}));

const DesktopDrawer = styled(Drawer)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: DRAWER_WIDTH,
  },
}));

const NavButton = styled(ListItemButton)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
})) as typeof ListItemButton;
