---
name: code-style
description: React and TypeScript coding conventions for this project
---

# Code Style

## Components

### Arrow Functions with Named Exports

Always define components as arrow functions with named exports:

```typescript
// Good
export const Header = ({ onMenuClick, onSearchClick }: Props) => {
  return (
    <StyledAppBar>...</StyledAppBar>
  );
};

// Bad
export default function Header({ onMenuClick, onSearchClick }: HeaderProps) {
  return (
    <StyledAppBar>...</StyledAppBar>
  );
}
```

### Props Interface

Always name the props interface simply `Props`:

```typescript
// Good
interface Props {
  pages: Page[];
  children: React.ReactNode;
}

// Bad
interface LayoutProps {
  pages: Page[];
  children: React.ReactNode;
}
```

## Imports

### Named Imports

Always use named imports and exports:

```typescript
// Good
import { Header } from './Header';
export const Header = () => {};

// Bad
import Header from './Header';
export default function Header() {}
```

### Consolidated MUI Imports

Import all Material UI components in a single statement, including `styled`:

```typescript
// Good
import { AppBar, Toolbar, IconButton, Box, styled } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';

// Bad
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
```

## Styling

### Styled Components Only

Always use MUI's `styled()` API. Never use the `sx` prop:

```typescript
// Good
<StyledAppBar position="fixed">

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.text.primary,
}));

// Bad
<AppBar sx={{ backgroundColor: 'white', color: 'text.primary' }}>
```

### Styled Components Placement

Define styled components below the component function:

```typescript
export const Header = ({ onMenuClick }: Props) => {
  return (
    <StyledAppBar>
      <MenuButton onClick={onMenuClick}>...</MenuButton>
    </StyledAppBar>
  );
};

// Styled components go here, after the component
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));
```

### Use HTML Elements When Possible

Prefer styling HTML elements directly over using Box with component prop:

```typescript
// Good
const MainContent = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

// Bad
const MainContent = styled(Box)(({ theme }) => ({...}));
<MainContent component="main">
```
