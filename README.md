# Rajan Kumar V K: personal consulting website

Portfolio website of Rajan Kumar V K, D.Sc. (Tech.), independent management consultant.

Live site: https://rajan56.github.io/RajaVKConsultant/

## What is here

| Path | Purpose |
| --- | --- |
| `index.html` | The whole site (single page) |
| `privacy.html` | Privacy note for the enquiry form |
| `assets/css/main.css` | Styles and colour tokens |
| `assets/js/main.js` | Hero picker, approach phases, services accordion, enquiry form |
| `assets/fonts/` | Self-hosted typefaces (Newsreader, Hanken Grotesk; SIL Open Font License) |
| `assets/img/` | Favicon and the preview image used when the link is shared |
| `tools/check_site.py` | Python quality check for links, files and headings |

## Colour system

The five brand colours follow the five phases of an assignment, from a pressing
problem to a controlled result: Define (crimson), Measure (orange), Analyse
(yellow), Improve (green) and Control (blue). Everything clickable is green.

## Editing

Open `index.html` in any editor, change the text and commit. GitHub Pages
republishes the site within a couple of minutes. To preview locally:

```
python3 -m http.server 8000
```

then open http://localhost:8000. Run `python3 tools/check_site.py` before committing.

## Enquiry form

The form posts to FormSubmit, which forwards each enquiry to the email address
set in `assets/js/main.js`. The first enquiry sent from a new website address
triggers an activation email that must be confirmed once.
