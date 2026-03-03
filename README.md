# Notas de Español

A Spanish language learning notes app built with Next.js and Material UI.

## Tech Stack

- **Next.js 14** - App Router
- **Material UI 7** - UI components with Emotion styling
- **TypeScript** - Type safety
- **Markdown** - Content management with gray-matter

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Project Structure

```
content/          # Markdown files for pages
src/
  app/            # Next.js App Router pages
  components/     # React components
  lib/            # Utilities (content parsing, search)
  theme.ts        # MUI theme configuration
```

## Adding Content

Create a new `.md` file in `content/` with frontmatter:

```markdown
---
title: Page Title
---

Content here...
```

The page will automatically appear in the sidebar and be searchable.
