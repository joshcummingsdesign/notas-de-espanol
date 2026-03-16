"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Typography, Box, styled } from "@mui/material";

interface Props {
  content: string;
}

export const MarkdownContent = ({ content }: Props) => {
  return (
    <ContentWrapper>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <Typography variant="h1" gutterBottom>
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography variant="h2" gutterBottom>
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography variant="h3" gutterBottom>
              {children}
            </Typography>
          ),
          p: ({ children }) => (
            <Typography variant="body1" paragraph>
              {children}
            </Typography>
          ),
          ul: ({ children }) => <StyledList>{children}</StyledList>,
          ol: ({ children }) => (
            <StyledOrderedList>{children}</StyledOrderedList>
          ),
          li: ({ children }) => (
            <Typography component="li" variant="body1">
              {children}
            </Typography>
          ),
          blockquote: ({ children }) => (
            <StyledBlockquote>{children}</StyledBlockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <InlineCode>{children}</InlineCode>
            ) : (
              <CodeBlock>{children}</CodeBlock>
            );
          },
          pre: ({ children }) => <Pre>{children}</Pre>,
          table: ({ children }) => <StyledTable>{children}</StyledTable>,
          th: ({ children }) => <StyledTh>{children}</StyledTh>,
          td: ({ children }) => <StyledTd>{children}</StyledTd>,
        }}
      >
        {content}
      </ReactMarkdown>
    </ContentWrapper>
  );
};

const ContentWrapper = styled(Box)({
  maxWidth: 800,
  "& > *:first-of-type": {
    marginTop: 0,
  },
});

const StyledList = styled("ul")(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const StyledOrderedList = styled("ol")(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const StyledBlockquote = styled("blockquote")(({ theme }) => ({
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  paddingLeft: theme.spacing(2),
  marginLeft: 0,
  marginRight: 0,
  fontStyle: "italic",
  color: theme.palette.text.secondary,
}));

const InlineCode = styled("code")(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: "2px 6px",
  borderRadius: 4,
  fontFamily: "monospace",
  fontSize: "0.9em",
}));

const CodeBlock = styled("code")(({ theme }) => ({
  display: "block",
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(2),
  borderRadius: 8,
  fontFamily: "monospace",
  fontSize: "0.9em",
  overflowX: "auto",
}));

const Pre = styled("pre")(({ theme }) => ({
  margin: 0,
  marginBottom: theme.spacing(2),
}));

const StyledTable = styled("table")(({ theme }) => ({
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: theme.spacing(2),
}));

const StyledTh = styled("th")(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(1, 2),
  borderBottom: `2px solid ${theme.palette.divider}`,
  textAlign: "left",
  fontWeight: 600,
}));

const StyledTd = styled("td")(({ theme }) => ({
  padding: theme.spacing(1, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));
