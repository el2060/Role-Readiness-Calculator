# ES Role Readiness

This project now ships as a single self-contained `index.html` file with inline CSS and JavaScript.

## Use locally

- Open `./index.html` directly in a browser, or
- run `npm run build` if you want a generated `dist/` copy.

## Use in D2L Brightspace

- Upload the `index.html` file as an HTML content item, or
- paste the file contents into the Brightspace HTML source / code editor.

The page does not depend on React, Tailwind, external CDNs, or module imports at runtime, which keeps it portable for Brightspace delivery.
