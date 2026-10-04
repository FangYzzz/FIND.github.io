# FIND project page

Project page for **Find Something You Can’t Do: Agentic Real-World Reinforcement Learning for Self-Improving VLA Models**.

The page is plain HTML, CSS, and JavaScript. It uses the supplied paper and overview video. The overview video appears in the hero and automatically plays muted on a loop, with controls to pause or enable sound. The site plays H.264/AAC copies from static/videos/web. Original videos stay in static/videos as source files. Figures 1 and 3 were cropped from the paper for the overview and results sections. The method section uses animated GIFs derived from the supplied overview videos.

## Preview

From this repository's root:

```bash
python3 -m http.server 8000
```

Open http://localhost:8000. No build step is needed.

## Files

- `index.html` — page content
- `static/css/style.css` — responsive layout and colors
- `static/js/main.js` — mobile navigation, citation copy button, and video playback coordination
- `static/images/` — cropped paper figures, GIF overviews, overview poster, and eight task posters
- `static/images/iter_overview.gif` and `static/images/method_overview.gif` — GIFs converted from the corresponding source videos; both GIFs appear in the method section
- `static/videos/find-overview.mp4` — source overview video
- `static/videos/iter_overview.mp4` and `static/videos/method_overview.mp4` — source videos for the animated GIFs
- `static/videos/task_1.mp4` through `task_8.mp4` — source task videos
- `static/videos/web/` — browser-compatible videos used by the page
- `scripts/prepare-videos.sh` — regenerate browser videos and task posters after replacing any source
- `static/papers/FIND.pdf` — downloadable paper

To refresh the web copies and task posters after replacing a source video, run `./scripts/prepare-videos.sh`.

## Publishing

The repository root contains `index.html` and `.nojekyll`, so it can be served as a static site. The page does not state the submission venue. The Paper button opens the local PDF; the Code button opens [the FIND GitHub repository](https://github.com/FangYzzz/FIND), and the arXiv button opens [the paper on arXiv](https://arxiv.org/abs/2609.32069). The citation shown on the page is provisional.
