# Images

Drop your real photos/screenshots into these folders, then update the
matching content file to point at them (paths are relative to `/public`,
so a file at `public/images/gallery/harbour.jpg` is referenced as
`/images/gallery/harbour.jpg`).

- `profile/` — headshot / about-page photo. Not yet referenced anywhere —
  add one and use it from `src/pages/Work.jsx` or `src/pages/Home.jsx` if
  you want a profile photo.
- `projects/` — screenshots for the Projects page. Referenced from
  `src/content/projects.js` (the `image` field on each project).
- `gallery/` — travel/personal photos for the Gallery page. Referenced
  from `src/content/gallery.js` (the `photos` array).

The `placeholder-*.svg` files are stand-ins so the site doesn't show
broken images before you add real content — delete them once replaced.

Always fill in a descriptive `alt` value in the content file for every
image you add; it's read aloud by screen readers and shown if the image
fails to load.
