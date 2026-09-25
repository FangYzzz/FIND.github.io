# FIND — Project Page

Static project / paper page for **Find Something You Can’t Do: Agentic Real-World Reinforcement Learning for Self-Improving VLA Models**. Pure HTML/CSS/JS,
no build step.

```
website/
├── index.html              # the page
├── .nojekyll               # tell GitHub Pages to serve files as-is
└── static/
    ├── css/style.css
    ├── js/main.js
    ├── images/             # figures (converted from the paper PDFs) + logo
    └── videos/             # system demos + ours-vs-baseline comparison clips
```

## Preview locally

```bash
cd website
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a repo and push the **contents of this `website/` folder** to the repo root
   (so `index.html` sits at the top level).
2. In the repo: **Settings → Pages → Build and deployment → Deploy from a branch**,
   pick `main` and `/ (root)`.
3. The page goes live at `https://<user>.github.io/<repo>/`.

> Keeping the page in a subfolder instead? Push the whole repo and set Pages to the
> `/docs` folder (rename `website` → `docs`), or use a GitHub Action that publishes
> `website/` as the Pages artifact.


