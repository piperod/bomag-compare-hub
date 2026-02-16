# BOMAG Compare Hub

## Run locally

### Prerequisites

- **Node.js** (LTS recommended) and **npm**
  - Install via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating): `nvm install --lts` then `nvm use --lts`
  - Or download the LTS installer from [nodejs.org](https://nodejs.org/)

Check that Node and npm are available:

```sh
node --version   # e.g. v20.x or v22.x
npm --version    # e.g. 10.x
```

### Setup and run

```sh
# 1. Clone the repository (if you haven't already)
git clone <YOUR_GIT_URL>
cd bomag-compare-hub

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173** (or the URL shown in the terminal). The dev server uses hot reload, so changes in the code will update in the browser automatically.

### If `vite: command not found` appears

The dev script uses `npx vite` so the local Vite from `node_modules` is used. If you still see a “command not found” error, run:

```sh
npm install
npm run dev
```

---

## Project info

**Lovable project**: [BOMAG Compare Hub on Lovable](https://lovable.dev/projects/bc1a093f-03ce-45e0-a6ba-43bdae532553)

## Tech stack

- **Vite** – build tool and dev server
- **TypeScript**
- **React**
- **shadcn-ui**
- **Tailwind CSS**

## Editing the code

- **Lovable** – Open the [Lovable project](https://lovable.dev/projects/bc1a093f-03ce-45e0-a6ba-43bdae532553) and edit via the UI; changes are committed to this repo.
- **Local IDE** – Clone, edit in your editor, then push; changes sync to Lovable.
- **GitHub** – Edit files in the repo with the “Edit” (pencil) button and commit.
- **GitHub Codespaces** – Use “Code” → “Codespaces” → “New codespace” to work in the browser.

## Deploy

Open [Lovable](https://lovable.dev/projects/bc1a093f-03ce-45e0-a6ba-43bdae532553), then **Share → Publish**.

## Custom domain

To use your own domain: in Lovable go to **Project → Settings → Domains** and click **Connect Domain**. See [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide).
