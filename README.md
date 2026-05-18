# Mutolaa

O'zbek tilidagi eng yirik audio va elektron kitoblar platformasi.

## About

Mutolaa is a digital library platform for Uzbek and Karakalpak readers. It provides access to audiobooks and e-books with a modern, responsive interface.

## Version

| Field        | Value          |
| ------------ | -------------- |
| Version      | 1.0.0          |
| Release Date | 01.04.2026     |

## Tech Stack

| Technology    | Version | Purpose                       |
| ------------- | ------- | ----------------------------- |
| Next.js       | 16.2.1  | React framework (App Router)  |
| React         | 19.2.4  | UI library                    |
| TypeScript    | 5.x     | Type safety                   |
| Tailwind CSS  | 4.x     | Utility-first styling         |
| HeroUI        | 3.0.1   | UI component library          |
| next-intl     | 4.8.3   | Internationalization (uz, qr) |
| Redux Toolkit | 2.11.2  | Global state management       |
| React Query   | 5.95.2  | Server state & data fetching  |
| Framer Motion | 12.38.0 | Animations                    |
| Axios         | 1.13.6  | HTTP client                   |

## Supported Languages

- **uz** - O'zbekcha (Uzbek) - default
- **qr** - Qaraqalpaqsha (Karakalpak)

## Project Structure

```
mutolaa/
├── app/                    # Next.js App Router
│   ├── [locale]/           # Locale-based routing
│   │   ├── layout.tsx      # Locale layout with providers
│   │   ├── page.tsx        # Home page
│   │   ├── about/          # About page
│   │   └── providers.tsx   # Redux, React Query, Theme providers
│   ├── layout.tsx          # Root layout (html/body)
│   ├── globals.css         # Global styles & HeroUI theme
│   ├── robots.ts           # SEO robots config
│   └── sitemap.ts          # SEO sitemap config
├── i18n/                   # Internationalization
│   ├── routing.ts          # Locale definitions
│   ├── request.ts          # Server-side message loading
│   └── navigation.ts       # Locale-aware Link, useRouter
├── lib/                    # Shared utilities
│   ├── store.ts            # Redux store
│   ├── api-client.ts       # Axios instance
│   └── theme.tsx           # Dark/Light theme provider
├── messages/               # Translation files
│   ├── uz.json             # Uzbek translations
│   └── qr.json             # Karakalpak translations
├── modules/                # Feature modules
│   ├── common/             # Shared components
│   │   ├── components/
│   │   │   ├── sidebar/    # Sidebar (nav, auth, theme, language)
│   │   │   ├── main-layout.tsx
│   │   │   └── conditional-render.tsx
│   │   └── index.ts
│   ├── home/               # Home page module
│   │   └── components/
│   └── icons/              # SVG icon components
│       ├── types.ts        # SvgProps type
│       └── index.ts        # Barrel exports
├── proxy.ts                # Next.js 16 proxy (i18n routing)
├── next.config.ts          # Next.js config with next-intl plugin
├── eslint.config.mjs       # ESLint v9 flat config
└── tsconfig.json           # TypeScript config
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint
npm run lint
```

## Features

- Collapsible sidebar with smooth framer-motion animations
- Dark/Light theme with localStorage persistence (no flash)
- Internationalization (Uzbek & Karakalpak)
- Responsive layout (mobile drawer + desktop sidebar)
- HeroUI component library with custom theme variables
- Modular file structure

## Developers

- **Obidjon Abduraxmonov** - Lead Developer

## License

Private - All rights reserved.
