
# Football Hub (Static Site)

A clean, responsive football website you can host on **GitHub Pages**.  
No frameworks, just **HTML + CSS + Vanilla JS**.

## Local preview
Open `index.html` in a local server (for fetch to work). For example with Python:

```bash
cd football-site
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages
1. Create a new repository on GitHub, e.g. `football-hub`.
2. Upload all files in this folder (or push via Git).
3. In your repo, go to **Settings → Pages**.
4. Under **Source**, select **Deploy from a branch**.
5. Choose **main** branch and **/(root)** folder, then **Save**.
6. Wait a minute; your site will be live at the URL shown on the Pages screen.

### Edit data
Update `assets/data.json` with your own league table, fixtures, and scorers.

### Customize theme
Change colors in `assets/styles.css` under the `:root` variables.
