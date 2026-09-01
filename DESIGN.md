---
name: Termco Operational Night
description: A command-led, product-evidence website for the inspectable developer workspace.
colors:
  canvas: "oklch(0.145 0.014 270)"
  deep: "oklch(0.125 0.012 270)"
  surface: "oklch(0.17 0.015 270)"
  raised: "oklch(0.20 0.015 270)"
  text: "oklch(0.94 0.004 275)"
  muted: "oklch(0.68 0.012 275)"
  quiet: "oklch(0.56 0.012 275)"
  signal: "oklch(0.72 0.16 274)"
  line: "oklch(1 0 0 / 10%)"
typography:
  display:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 7vw, 6.5rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 430
    lineHeight: 1.6
  machine:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  control: "8px"
  surface: "12px"
  frame: "14px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
---

# Design System: Termco Operational Night

## Creative direction

**North star: “The project is already alive.”** The website should feel like opening a serious developer workspace, not reading a generic AI product page. Commands introduce chapters, iris signal reports real state, and real application captures carry the proof. The composition moves continuously from context problem to product evidence rather than repeating interchangeable cards.

## Color

Near-black graphite is the working environment. Slight tonal changes—not large shadows—separate the canvas, deep chapters, and raised terminal surfaces. Text is warm-white, supporting copy is muted graphite, and iris signal is reserved for commands, success, primary actions, and the key half of the thesis. Borders are quiet white hairlines.

## Typography

Geist handles all narrative content. Display copy is compact, heavy, and closely tracked; body text stays readable and restrained. JetBrains Mono is only for commands, paths, versions, machine state, and sequences such as `fork → edit → verify → replace`.

## Layout

Use a maximum 1380px shell with 32px desktop gutters. The hero pairs the product thesis with a live terminal before revealing the complete workspace across the page. Later chapters alternate real media and focused copy. Comparison and toolkit areas use pane seams because they describe system relationships. At narrow widths every section becomes a linear proof trail; screenshots and video always use `object-fit: contain` and may never be cropped.

## Components

- Primary buttons use iris signal with dark text and a minimum 44px target.
- Secondary buttons are transparent with one quiet hairline.
- Terminal and product frames use 12–14px corners and one border.
- Status pills are allowed; general content does not use pills.
- Product video autoplays only when visible and when reduced motion is not requested.
- FAQ disclosure, navigation, media controls, and downloads remain keyboard-accessible.

## Motion

The authored moment is the hero terminal boot: a typed `termco .` command followed by staged state lines. Product films pause when off-screen. Reduced-motion visitors receive the completed terminal state immediately and no autoplay.

## Do / do not

- Do use technically specific, verifiable product copy.
- Do show the full real interface inside every capture.
- Do use prompt syntax as section navigation and narrative punctuation.
- Do keep provider choice, local credentials, and plugin separation explicit.
- Do not invent customers, metrics, pricing, or unreleased capabilities.
- Do not use gradient text, glass as decoration, or generic icon-card grids.
- Do not crop screenshots or videos to make a frame look fuller.
