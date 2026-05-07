## 问思阁 | Mind Agora — Hackathon MVP Plan

A polished, bilingual (English first, Chinese softer underneath), clickable web MVP for the Gemma 4 hackathon. Calm, healing, intellectual aesthetic — "a quiet digital pavilion for thinking."

### Project structure

```text
src/
  routes/
    __root.tsx           # Top nav + shared layout (HeadContent, providers)
    index.tsx            # Landing
    ask.tsx              # Question Input
    great-minds.tsx      # Great Minds Chat
    debate.tsx           # Debate Room
    quotes.tsx           # Quote Mode
    thoughts.tsx         # My Thoughts (short reflections)
    thought-book.tsx     # My Thought Book
    reading-path.tsx     # Reading Path
    reflection.tsx       # Weekly Reflection
    how-it-works.tsx     # How It Works
  components/
    layout/TopNav.tsx
    layout/Footer.tsx
    common/BiText.tsx          # Renders EN (large) + ZH (smaller, softer)
    common/SectionHeader.tsx
    common/SoftCard.tsx
    common/PavilionMark.tsx    # Small SVG pavilion logo
    minds/ThinkerCard.tsx
    minds/ResponseCard.tsx
    debate/DebateTurn.tsx
    quotes/QuoteCard.tsx
    thoughts/ThoughtComposer.tsx
    book/MiniBookPreview.tsx
    reading/BookCard.tsx
  data/
    thinkers.ts          # 8 thinker profiles (EN/ZH)
    questionCategories.ts
    mockResponses.ts     # demo answers, debate script, quotes
    mockBooks.ts
    weekly.ts
  store/
    useAgora.ts          # Zustand: saved quotes, saved thoughts, selected thinkers, current question
  styles.css             # Design tokens (oklch)
```

### Design system (src/styles.css)

Tokens (light only — calm, healing):
- `--background`: warm white / plaster (oklch ~0.985 0.005 85)
- `--foreground`: ink blue (~0.25 0.04 250)
- `--muted-foreground`: soft gray-blue
- `--card`: cream (~0.98 0.012 85)
- `--primary`: ink blue (~0.32 0.06 255)
- `--primary-foreground`: plaster white
- `--accent-sage`: sage green (~0.78 0.04 150)
- `--accent-mist`: mist blue (~0.86 0.03 240)
- `--accent-gold`: soft gold (~0.78 0.09 80)
- `--border`: very low-contrast warm gray
- `--gradient-pavilion`: subtle linear gradient (mist blue → cream)
- `--shadow-soft`: `0 8px 30px -12px color-mix(in oklab, var(--primary) 12%, transparent)`
- `--radius`: 1rem (rounded cards)

Typography:
- Headings: serif (e.g. `Cormorant Garamond` or `Fraunces`) for elegance
- Body: `Inter` for clarity
- Chinese: `Noto Serif SC` for headings, `Noto Sans SC` for body
- Bilingual pattern via `<BiText en="..." zh="..." />` — EN at full size/weight, ZH below at ~80% size, lighter color, slightly looser tracking

Visual motifs:
- Subtle paper-grain background (CSS noise/SVG)
- Pavilion arch SVG used in hero + as logo
- Gentle hover lifts (`transition-all`, translate-y, shadow grow)
- Generous whitespace, max-w-5xl content columns

### Navigation

Top nav (sticky, translucent with backdrop-blur, soft bottom border):
Home · Ask · Great Minds · Debate · Quotes · Thought Book · Reading Path · Reflection · How It Works

Logo left: small pavilion SVG + `问思阁 | Mind Agora`. Right: small saved-quote counter chip (live from store).

### State (Zustand `useAgora`)

```ts
{
  currentQuestion: string;
  selectedCategory: string | null;
  selectedThinkerIds: string[];
  savedQuotes: Quote[];     // {id, text, textZh, source, thinker}
  savedThoughts: Thought[]; // {id, text, createdAt}
  readingList: string[];
  setQuestion, toggleThinker, saveQuote, removeQuote,
  addThought, addToReadingList
}
```

Persisted to `localStorage` (client-only effect — guard `typeof window`).

### Page-by-page content

All pages render with `head()` containing route-specific bilingual title, description, og:title, og:description.

1. **Landing (`/`)** — Hero with pavilion arch illustration, bilingual headline + subtitle, two CTAs (Enter the Pavilion → `/great-minds`, Start with a Question → `/ask`). Four feature cards (Great Minds Chat, Debate Room, Quote Mode, Thought Book) linking to their routes. Distinction strip ("Not another reading app…"). Footer with brand mark.

2. **Ask (`/ask`)** — Centered composer. Title, large textarea with bilingual placeholder, char hint. Eight category pills (toggle, soft sage on selection). Primary button stores question + category in Zustand and navigates to `/great-minds`.

3. **Great Minds (`/great-minds`)** — Subtitle + selectable grid of 8 thinker cards (avatar initial/portrait silhouette, EN/ZH name, one-line style description). Multi-select with checkmark + sage border. Below: current question banner + 3 response cards (Socrates / Laozi / Nietzsche prewritten). Each card: Save Quote (toggles + bumps counter), Ask More (appends a mock follow-up), Invite to Debate (navigates to `/debate`).

4. **Debate (`/debate`)** — Roundtable header with question. Four stacked sections (Opening Statements, Responses, Final Thoughts, Reflection Summary), each a soft card with avatar + bilingual quote. Side panel "Quotes you may want to save" — 3 chips with save toggle.

5. **Quotes (`/quotes`)** — Three quote cards (Rilke, Woolf, Marcus Aurelius) with book title, source, bilingual quote in elegant serif, 3 buttons each. Footer note about RAG.

6. **Thoughts (`/thoughts`)** — Composer with 280-char limit + live counter (color shifts near limit). Three example thought cards (read-only seed). Save Thought adds to store list (rendered above examples). Add to Thought Book navigates.

7. **Thought Book (`/thought-book`)** — Three columns: From Great Minds / From Books / From Myself, populated from saved store data (with seeded fallbacks). "A Small Book of My Questions" mini-publication preview: framed paper-textured card with table of contents (5 sections) and sample interior page. Buttons: Generate Weekly Reflection (→ `/reflection`), Export as PDF (toast), Share as Mini Book (toast).

8. **Reading Path (`/reading-path`)** — Three book cards with title/author/why/start chapter/Save to Reading List (toggle).

9. **Reflection (`/reflection`)** — Top theme tag cloud (5 weighted tags), most-saved mind card, most-saved quote card, suggested reflection paragraph (bilingual). Buttons: Generate Monthly Report (toast), Add to Thought Book.

10. **How It Works (`/how-it-works`)** — Six-step vertical timeline with icons and bilingual descriptions covering Gemma 4, multi-agent prompting, RAG, user memory, insight generation, export.

### Interaction polish

- Saved-quote count chip in TopNav updates instantly (Zustand)
- Save buttons toggle between outline bookmark → filled sage bookmark
- Sonner toasts for export/share/save actions
- `framer-motion` fade/slide on route mount and card hover lift
- Smooth scroll restoration via router

### Tech notes

- TanStack Start file routes; per-route `head()` with bilingual SEO meta
- Tailwind v4 via `src/styles.css` tokens — no hard-coded colors in components
- Add deps: `zustand`, `framer-motion` (already-installed shadcn/ui covers Button, Card, Badge, Textarea, Input, Toast/Sonner)
- All mock data in `src/data/`, no backend, no Lovable Cloud
- Bilingual `<BiText>` is the single source of truth for EN/ZH pairing — used everywhere

### Demo flow validation

`/` → Enter the Pavilion → `/ask` → write question + select category → `/great-minds` (selects thinkers, saves a quote) → "Invite to Debate" → `/debate` (saves a side-panel quote) → `/quotes` (saves an original quote) → `/thoughts` (writes a 1-sentence reflection) → `/thought-book` (sees everything compiled into mini book) → `/reading-path` → `/reflection` → `/how-it-works`. Entire flow is clickable end-to-end with persistent state.
