# Prank Website

Simple static prank site for Vercel.

## Current routes

- `/octo-house` -> plays `/pranks/KARLSONVIBE/video.mp4`
- `/stats` -> lists all configured prank links and local view counts

## Add a new prank

1. Add a folder in `pranks/` (for example `pranks/MYNEWPRANK/`).
2. Put your video inside as `video.mp4`.
3. Add an entry in `pranks/pranks.json`:

```json
{
  "name": "My New Prank",
  "slug": "my-new-prank",
  "folder": "MYNEWPRANK"
}
```

That automatically creates a new prank URL at `/my-new-prank` and includes it in `/stats`.
