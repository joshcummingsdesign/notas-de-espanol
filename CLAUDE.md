# Notas de Español

Spanish language learning notes app built with Next.js and Material UI.

## Tech Stack

- Next.js 14 (App Router)
- Material UI with Emotion
- TypeScript
- Markdown content with gray-matter

## Project Structure

```
content/          # Markdown files for pages
src/
  app/            # Next.js App Router pages
  components/     # React components
  lib/            # Utilities (content parsing, search)
  theme.ts        # MUI theme configuration
```

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Adding Content

Create a new `.md` file in `content/` with frontmatter:

```markdown
---
title: Page Title
---

Content here...
```

The page will automatically appear in the sidebar and be searchable.

## Code Style

See `.claude/skills/code-style.md` for React/TypeScript conventions used in this project.
