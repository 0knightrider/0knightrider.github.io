# Muhammad Ruhan Haq — Personal Portfolio

Source for my personal site, live at **https://0knightrider.github.io**.

A single-page portfolio covering my research experience, projects, skills, and honors. It is plain HTML, CSS, and JavaScript with no build step, so GitHub Pages serves it exactly as it is in this repository.

## Structure

```
.
├── index.html          # All page content and sections
├── css/
│   └── styles.css      # Design tokens (colors, fonts), layout, light/dark themes
├── js/
│   └── main.js         # Nav highlighting, mobile menu, scroll reveal, copy email, theme toggle
├── assets/
│   ├── headshot.jpg    # Profile photo (a monogram is shown if this file is missing)
│   └── favicon.svg
└── .nojekyll           # Tells GitHub Pages to serve the files without Jekyll
```

## Preview locally

No install needed. From the repository folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Editing content

- **Text, roles, projects, skills:** edit `index.html`. Each section is marked with a comment such as `<!-- ===== Projects ===== -->`.
- **Colors and fonts:** edit the variables at the top of `css/styles.css` (`:root` is the dark theme, `:root[data-theme="light"]` is the light theme).
- **Photo:** replace `assets/headshot.jpg` with a square image of the same name.

## Deploying to GitHub Pages

This repository is named `0knightrider.github.io`, so GitHub publishes the `main` branch automatically.

```bash
git clone https://github.com/0knightrider/0knightrider.github.io.git
cd 0knightrider.github.io

# make your changes, then:
git add .
git commit -m "Update portfolio content"
git push origin main
```

Changes appear at https://0knightrider.github.io within a minute or two. If the site ever stops publishing, check **Settings → Pages** and make sure the source is set to **Deploy from a branch**, branch `main`, folder `/ (root)`.
