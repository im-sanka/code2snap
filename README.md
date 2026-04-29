# Code2Snap

Code2Snap is a free and open-source web app for turning code snippets into beautiful, terminal-style images. Paste your code, customize the theme and background, then export your snapshot as PNG or SVG.

## Features

- Beautiful syntax-highlighted code previews
- Multiple terminal themes
- Gradient backgrounds, solid color picker, and image upload backgrounds
- Adjustable padding, terminal size, and export scale
- Export snapshots as PNG or SVG
- Save and reload local presets
- Responsive editor and preview layout
- Code2Snap loading screen with a fading logo

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prism React Renderer](https://github.com/FormidableLabs/prism-react-renderer)
- [html-to-image](https://github.com/bubkoo/html-to-image)

## Getting Started

### Prerequisites

- Node.js 20 or newer recommended
- [Bun](https://bun.sh/) recommended, or npm

### Installation

```bash
bun install
```

### Development

```bash
bun dev
```

Open the local URL shown in your terminal, usually:

```text
http://localhost:3000
```

### Build

```bash
bun build
```

### Start Production Build

```bash
bun start
```

### Lint

```bash
bun lint
```

> This repository includes a `bun.lock`, so Bun is the preferred package manager. npm can still work if you prefer it.

## Open Source

Code2Snap is an open-source project. You are welcome to use it, fork it, improve it, and contribute new features or fixes.

Good contributions include:

- New export options
- More syntax themes
- More background presets
- UI/UX improvements
- Bug fixes
- Documentation improvements

## Project Structure

```text
app/                     Next.js app routes and layout
components/page/          Main Code2Snap page components
components/ui/            Reusable UI components
components/terminal-preview.tsx
lib/                      Shared types and utilities
hooks/                    React hooks
```

## License

This project is intended to be free and open source. Add a `LICENSE` file, such as MIT, before publishing publicly.
