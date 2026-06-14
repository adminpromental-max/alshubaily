# Image Specifications — AlShubaily Website

Use these dimensions when preparing final assets from the client.

## Hero Slideshow (Home)
| Asset | Path | Recommended Size | Format | Notes |
|-------|------|------------------|--------|-------|
| Slide 1 | `/assets/hero/slide-1.png` | **1920 × 1080** (16:9) | PNG/JPG | Main portfolio / flagship project |
| Slide 2 | `/assets/hero/slide-2.png` | **1920 × 1080** | PNG/JPG | Kingdom map or aerial view |
| Slide 3 | `/assets/hero/slide-3.png` | **1920 × 1080** | PNG/JPG | Group / corporate image |
| Slide 4 | `/assets/hero/slide-4.png` | **1920 × 1080** | PNG/JPG | Featured development |

## Interactive Map
| Asset | Path | Recommended Size | Format | Notes |
|-------|------|------------------|--------|-------|
| Map | `/assets/map.png` | **2000 × 1111** (current) | PNG | Keep marker positions aligned with design file |
| Logo | `/assets/Alshubaily-logo.png` | **400 × 440** min | PNG transparent | Header & footer |

## Project Pages (×18 projects)
| Asset | Path pattern | Recommended Size | Format | Notes |
|-------|--------------|------------------|--------|-------|
| Hero | per project in `projects.ts` | **1920 × 1080** | PNG/JPG | One hero per project |
| Gallery (3 images) | per project gallery array | **1600 × 1000** | PNG/JPG | Immersive scroll tour |

## Featured Cards (Home)
Uses project `heroImage` — same as project hero: **1920 × 1080** (cropped to 4:3 in UI).

## About Section
| Asset | Path | Recommended Size | Format |
|-------|------|------------------|--------|
| About image | `/assets/hero/slide-3.png` or dedicated | **1200 × 1500** (4:5) | PNG/JPG |

## Subsidiaries (Group Section)
| Asset | Path | Recommended Size | Format |
|-------|------|------------------|--------|
| Combined logos strip | `/assets/logos.png` | **2400 × 800** | PNG transparent |
| Individual logos (optional) | `/assets/subsidiaries/*.png` | **400 × 400** each | PNG transparent |

## Intro Video (optional, disabled by default)
| Asset | Path | Recommended Size | Format |
|-------|------|------------------|--------|
| Video | `/assets/intro/intro.mp4` | **1920 × 1080** | MP4 H.264 |
| Audio | `/assets/intro/intro.mp3` | — | MP3 |

## Quality Guidelines
- Export at **2×** for retina where possible.
- Keep file size under **500 KB** per web JPG (use WebP if converting).
- Use **sRGB** color profile.
- Map markers are positioned by **percentage** — do not crop the map without updating `projects.ts` coordinates.
