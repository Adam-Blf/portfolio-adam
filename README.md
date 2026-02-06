# Adam Beloucif Portfolio

Portfolio personnel moderne construit avec Next.js 14, TypeScript, Tailwind CSS, Three.js et anime.js.

![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r160-000000?style=for-the-badge&logo=three.js&logoColor=white)

## Apercu

Portfolio neo-editorial minimaliste avec:
- Donnees GitHub en temps reel (projets, commits, technologies)
- Animations fluides avec anime.js v4
- Backgrounds 3D interactifs avec Three.js
- Theme clair/sombre avec detection systeme
- Score Lighthouse 100/100

## Stack Technique

| Categorie | Technologies |
|-----------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **Langage** | TypeScript |
| **Styling** | Tailwind CSS, CSS Variables |
| **3D** | Three.js, React Three Fiber |
| **Animations** | anime.js v4, WAAPI |
| **Icons** | Lucide React |
| **Fonts** | Outfit (display), Fira Code (mono) |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Hero + Stats dynamiques |
| `/frise` | Timeline chronologique (formations, experiences, associations) |
| `/projets` | Projets GitHub avec filtres et recherche |
| `/competences` | Technologies detectees depuis GitHub |
| `/contact` | Formulaire de contact (mailto) |

## Installation

```bash
# Cloner le repository
git clone https://github.com/Adam-Blf/portfolio-adam.git

# Installer les dependances
cd portfolio-adam
npm install

# Lancer en developpement
npm run dev

# Build production
npm run build
```

## Structure

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── api/github/         # API route pour cache GitHub
│   ├── competences/
│   ├── contact/
│   ├── frise/
│   ├── projets/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css         # Design system CSS
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Hero, Stats, etc.
│   ├── three/              # Backgrounds 3D
│   ├── ui/                 # Composants reutilisables
│   └── providers/          # ThemeProvider
└── lib/
    ├── data.ts             # Donnees statiques
    ├── github.ts           # Service GitHub API
    ├── utils.ts
    └── animations.ts
```

## Design System

### Couleurs

| Variable | Light | Dark |
|----------|-------|------|
| `--bg-deep` | #fafafa | #0c0c0c |
| `--bg-primary` | #ffffff | #121212 |
| `--text-primary` | #0f0f0f | #fafafa |
| `--accent` | #FFB000 | #FFB000 |

### Typographie

- **Display**: Outfit, 600-700 weight
- **Body**: Outfit, 400-500 weight
- **Code**: Fira Code, monospace

## Performance

- Images optimisees (AVIF, WebP)
- Code splitting automatique
- Fonts preconnect
- CSS optimise
- Cache GitHub API (30 min)
- localStorage pour persistance

## SEO

- Metadata dynamique
- OpenGraph / Twitter Cards
- Sitemap XML genere
- robots.txt
- manifest.json (PWA ready)

## Securite

Headers configures dans `next.config.js`:
- Strict-Transport-Security
- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy

## Deploiement

Le site est optimise pour deploiement sur:
- **Vercel** (recommande)
- Netlify
- GitHub Pages (avec export static)

```bash
# Build pour production
npm run build

# Export statique (optionnel)
npm run export
```

## Variables d'environnement

```env
# Optionnel - pour augmenter les limites de l'API GitHub
GITHUB_TOKEN=ghp_xxx
```

## Auteur

**Adam Beloucif**
- Data Engineer & Fullstack Developer
- M1 Data Engineering & IA @ EFREI Paris
- [LinkedIn](https://www.linkedin.com/in/adambeloucif/)
- [GitHub](https://github.com/Adam-Blf)
- [Email](mailto:adam.beloucif@efrei.net)

## Licence

MIT License - Libre d'utilisation et modification avec attribution.
