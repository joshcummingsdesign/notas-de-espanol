"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  InputAdornment,
  Typography,
  styled,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { searchPages } from "@/lib/search";

interface Page {
  slug: string;
  title: string;
  content: string;
}

interface Props {
  pages: Page[];
  open: boolean;
  onClose: () => void;
}

export const SearchModal = ({ pages, open, onClose }: Props) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const results = searchPages(pages, query);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleResultClick = (slug: string) => {
    const href = slug === "" ? "/" : `/${slug}`;
    router.push(href);
    onClose();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (event.key === "Enter" && results[selectedIndex]) {
      event.preventDefault();
      handleResultClick(results[selectedIndex].slug);
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="sm" disableRestoreFocus>
      <StyledDialogContent>
        <SearchField
          autoFocus
          fullWidth
          placeholder="Search notes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {query && (
          <ResultsList>
            {results.length > 0 ? (
              results.map((result, index) => (
                <ListItem key={result.slug} disablePadding>
                  <ResultButton
                    selected={index === selectedIndex}
                    onClick={() => handleResultClick(result.slug)}
                  >
                    <ListItemText
                      primary={result.title}
                      secondary={result.snippet}
                      secondaryTypographyProps={{
                        noWrap: true,
                      }}
                    />
                  </ResultButton>
                </ListItem>
              ))
            ) : (
              <NoResults>No results found</NoResults>
            )}
          </ResultsList>
        )}
        <KeyboardHint>
          Press <kbd>Ctrl</kbd> + <kbd>P</kbd> to toggle search
        </KeyboardHint>
      </StyledDialogContent>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-container": {
    alignItems: "flex-start",
    paddingTop: theme.spacing(12),
  },
  "& .MuiDialog-paper": {
    borderRadius: 12,
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const SearchField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
  },
});

const ResultsList = styled(List)(({ theme }) => ({
  marginTop: theme.spacing(1),
  maxHeight: 300,
  overflow: "auto",
}));

const ResultButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 8,
  "&.Mui-selected": {
    backgroundColor: theme.palette.action.selected,
  },
  "&.Mui-selected:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const NoResults = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const KeyboardHint = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: "center",
  fontSize: "0.75rem",
  color: theme.palette.text.secondary,
  "& kbd": {
    padding: "2px 6px",
    borderRadius: 4,
    backgroundColor: theme.palette.grey[200],
    fontFamily: "monospace",
  },
}));
