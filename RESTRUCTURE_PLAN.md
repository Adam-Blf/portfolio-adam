# Next.js 15 App Directory Restructuring Plan

This plan outlines the optimal structure for your portfolio project, leveraging Next.js 15 Server Components and the "Ambient Realism"/"Liquid Glass" UX.

## Directory Structure

```
src/
  app/
    layout.tsx           # Root layout (RSC)
    page.tsx             # Homepage (RSC, Bento Grid)
    globals.css
    error.tsx
    not-found.tsx
    sitemap.ts
    api/
      ...                # API routes (RSC)
    projects/
      layout.tsx         # Projects section layout (RSC)
      page.tsx           # Projects index (RSC)
      epsm/
        page.tsx         # EPSM case study (RSC)
        scrollytelling/
          page.tsx       # Scrollytelling process (RSC)
      douille/
        page.tsx         # Douille business case (RSC)
    about/
      page.tsx           # About Me (RSC)
    stack/
      page.tsx           # Tech stack ticker (RSC)
    contact/
      page.tsx           # Contact (RSC)
    # ...other sections as needed
  components/
    ui/
      LiquidGlassCard.tsx
      HomeBentoGrid.tsx
      # ...other UI components
    # ...other component folders
```

## Principles

- All content pages as Server Components (default in `/app`).
- Client Components only for interactive leaves (e.g., magnetic button, animated ticker, cursor).
- Case studies (EPSM, Douille) as subfolders for clean URLs and modularity.
- Scrollytelling as a nested route under EPSM for process storytelling.
- Shared layouts for sections (e.g., `/projects/layout.tsx`).

## Migration Steps

1. Move all static/marketing pages to RSCs in `/app`.
2. Refactor interactive elements (magnetic cursor, ticker, etc.) as Client Components in `/components/ui`.
3. Use nested routes for case studies and scrollytelling.
4. Remove any legacy `/pages` directory if present.

---

This structure ensures maximum performance, maintainability, and alignment with 2026 UX standards.
