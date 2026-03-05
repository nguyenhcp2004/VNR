# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vietnamese educational web application ("Trò chơi Tư tưởng Hồ Chí Minh") about Ho Chi Minh thought and the Vietnamese Communist Party. Features educational content pages, a 3-stage puzzle game, an AI chatbot, timeline/comparison views, and a leaderboard.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
npm run start    # Start production server
```

No test framework is configured.

## Architecture

### Routing & Pages (Next.js 16 App Router)

- `app/` — Route definitions only; pages are thin wrappers delegating to feature components
- `app/contents/[slug]/page.tsx` — 7 educational content pages (Vietnamese political topics)
- `app/game/page.tsx` — 3-stage puzzle game
- `app/timeline/[slug]/page.tsx` — Historical timeline with dynamic detail pages
- `app/tai-lieu/[slug]/page.tsx` — Document/resource viewer
- `app/api/embed/route.ts` — API route for PDF embedding into Supabase vector store

### Feature Modules (`features/`)

Each feature is self-contained with its own components, hooks, context, and data:

- **`features/game/`** — Core game logic: `GameContext.tsx` (useReducer state machine with stages: welcome → 1 → 2 → 3 → victory), question data in `data/questions.json`, puzzle utilities, timer hooks
- **`features/chat/`** — AI chatbot with speech-to-text, text selection explainer, auto-send mode. Exported via barrel `index.ts`
- **`features/content1/` through `features/content7/`** — Individual educational content pages with section components
- **`features/home/`** — Homepage with animated timeline, image gallery, YouTube embed
- **`features/timeline/`, `features/tai-lieu/`, `features/compare/`, `features/board/`** — Additional educational views

### Shared Infrastructure

- **`providers/ChatProvider.tsx`** — Global chat context wrapping the entire app (via MainLayout). Manages sessions and messages using IndexedDB, calls server action for AI responses
- **`components/layouts/MainLayout.tsx`** — Root client layout: background image, navigation sidebar, music player, ChatUI, TextExplainerUI. Wraps all pages
- **`components/ui/`** — shadcn/ui components (new-york style, configured in `components.json`)
- **`common/constants/routes.ts`** — Central content route definitions (CONTENT_ROUTES array)
- **`common/constants/posts.ts`** — Timeline post data with markdown content

### Server Actions (`actions/`)

- **`chatActions.ts`** — AI chat via OpenAI-compatible API (ZAI). RAG pipeline is currently disabled; uses static context prompt. System prompt is in Vietnamese with specific behavioral rules
- **`gameActions.ts`** — Leaderboard CRUD via Supabase RPC (`upsert_leaderboard_entry`)

### Data & Storage

- **Client-side (IndexedDB via `idb`)**: Three separate databases:
  - `mln_chat_db` — Chat sessions and messages (`lib/idb/chatIdb.ts`)
  - `mln_player_db` — Player device ID and name (`lib/idb/playerIdb.ts`)
  - `mln_settings_db` — Key-value settings store (`lib/idb/settingsIdb.ts`)
- **Server-side (Supabase)**: Leaderboard table, vector document store (for RAG when enabled)
- **Static data**: `features/game/data/questions.json` (quiz questions), `data/data-hcm.pdf` (source document for embeddings)

### AI/RAG Pipeline (partially disabled)

- `lib/embed/index.ts` — ZAI embeddings client (OpenAI-compatible API)
- `utils/retriever.ts` — Supabase vector store retriever via LangChain
- `utils/chunkText.ts` — Text chunking with overlap for PDF processing
- `app/api/embed/route.ts` — One-shot PDF upload and embedding endpoint
- Currently RAG is commented out in `chatActions.ts`; chatbot uses knowledge-based prompting only

## Environment Variables

Required in `.env`:
- `ZAI_BASE_URL`, `ZAI_API_KEY`, `ZAI_MODEL` — OpenAI-compatible chat API
- `ZAI_EMBEDDING_MODEL` — Embedding model (used when RAG is enabled)
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase connection

## Key Conventions

- Path aliases: `@/*` maps to project root (e.g., `@/features/*`, `@/components/*`)
- All content is in Vietnamese; UI text, prompts, and variable names use Vietnamese
- Animation: Framer Motion for page transitions, GSAP + Lenis for scroll effects
- Drag-and-drop: `@dnd-kit` for the Stage 3 puzzle game
- Markdown rendering: `react-markdown` with remark-gfm, remark-math, rehype-katex, rehype-highlight
- Standalone output mode (`next.config.ts`) for containerized deployment
