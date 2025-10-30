# CampusConnect (Flexi)

Small single-page demo for a campus noticeboard built with plain HTML/CSS/JS and Tailwind CDN.

## Overview
CampusConnect is a client-side app that displays posts (events, clubs, lost & found, academics). Posts are seeded with mock data and managed in-memory. Users can filter, search, and create new posts (modal). Authentication UI is present as static forms (no backend).

## Features
- Grid of post cards with category badges and optional images
- Category filters and search
- Modal form to create a new post (adds to top of list)
- Simple page navigation: Home, About, Contact, Auth (client-side show/hide)
- Tailwind CSS (CDN) + custom styles in `style.css`

## Tech stack
- HTML, CSS, JavaScript
- Tailwind CSS (via CDN)
- Google Fonts (Inter)

## Files
- index.html — main markup and UI
- style.css — small custom styles (in addition to Tailwind)
- script.js — app logic (rendering, filters, modal, add post)
- README.md — this file

## Running locally (Windows)
No build step required.

Option A — open in default browser:
- Double-click `index.html` or run in PowerShell:
  Start-Process .\index.html

Option B — using VS Code Live Server:
- Install Live Server extension.
- Open the workspace folder in VS Code.
- Right-click `index.html` → "Open with Live Server".

Option C — simple static server (Node installed):
- From project folder:
  npx serve . 
- Then open the provided URL.

## Notes for developers
- Data is stored in-memory in `script.js` (variable `posts`). Refreshing the page resets to initial mock data.
- To persist posts, integrate `localStorage` or a backend API (examples can be added in `handleNewPost`).
- Category badge colors are defined in `getCategoryBadge()` in `script.js`.
- Auth forms are UI-only (no auth logic). Toggle between login/signup with buttons in the auth view.

## Quick customizations
- Change seed posts: edit `initialPosts` array in `script.js`.
- Add new categories: update `getCategoryBadge()` mapping and CSS classes.
- Add validation to the post form inside `handleNewPost()`.

## Contributing
- Open an issue or submit a PR. Keep changes minimal and document behavior changes.

## License
MIT — use as you like.
