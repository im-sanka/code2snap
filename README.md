# ✨ Code2Snap

Welcome to **Code2Snap** — a free, cheerful, and open-source app for turning your code into beautiful terminal-style snapshots. Paste your snippet, pick a theme, add a lovely background, and export a polished image in seconds. 🎉

Whether you are sharing a quick tip, showing off a project, writing docs, or posting on social media, Code2Snap helps your code look clean, colorful, and ready to share.

## 🌟 Features

- 🎨 Beautiful syntax-highlighted code previews
- 🖥️ Terminal-style window with a clean title bar
- 🌈 Gradient backgrounds and background presets
- 🎯 Solid background color picker
- 🖼️ Custom image background uploads
- 📐 Adjustable padding, terminal size, and export scale
- 📦 Export as PNG or SVG
- 💾 Save and reload local presets
- 📱 Responsive layout for desktop and mobile
- 💜 Code2Snap loading screen with a fading logo
- 🆓 Free and open source

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prism React Renderer](https://github.com/FormidableLabs/prism-react-renderer)
- [html-to-image](https://github.com/bubkoo/html-to-image)
- [Bun](https://bun.sh/)

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or newer recommended
- [Bun](https://bun.sh/) recommended, or npm if you prefer

### Install dependencies

```bash
bun install
```

### Start the development server

```bash
bun dev
```

Then open the local URL shown in your terminal, usually:

```text
http://localhost:3000
```

## 📜 Scripts

```bash
bun dev      # Start the development server
bun build    # Create a production build
bun start    # Start the production server
bun lint     # Run ESLint
```

> This repository includes a `bun.lock`, so Bun is the preferred package manager.

## 🤝 Open Source

Code2Snap is open source under the MIT License. You can use it, fork it, customize it, and share your improvements with the community. Contributions are very welcome! ✨

Fun ideas to contribute:

- Add more syntax themes
- Add more gradient/background presets
- Improve exports
- Add language-specific starter snippets
- Polish the UI and animations
- Improve accessibility
- Fix bugs
- Make the docs even better

## 📁 Project Structure

```text
app/                         Next.js app routes, layout, and loading UI
components/page/              Main Code2Snap page components
components/ui/                Reusable UI components
components/terminal-preview.tsx
lib/                          Shared types and utilities
hooks/                        React hooks
```

## 📄 License

Code2Snap is released under the [MIT License](./LICENSE).

---

Made with 💜 for developers who like pretty code snapshots.
