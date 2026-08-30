---
id: 'paper-toaster'
title: 'Paper Toaster'
years: '2022-2024'
sort_key: '2024-01-00:01'
github_repo: 'paper-toaster'
img_format: 'png'
updates:
    - sort_key: '2022-06-15:01'
      date: '2022-06-15'
      title: 'Start of Project'
      description: I started making a sketchbook format and made a few simple patterns as a warm-up.
    - sort_key: '2024-01-22:01'
      date: '2024-01-22'
      title: 'Public on GitHub'
      description: In preparation for this website, I finally got around to cleaning up the README, taking screenshots and making the repo public on GitHub
    - sort_key: '2024-09-23:01'
      date: '2024-09-23'
      title: 'Add Docker Support'
      description: I've been learning more about Docker recently. To practice, I reorganized this repo to use Docker, see the <a href="https://github.com/ptrgags/paper-toaster/releases/tag/v1.0.0">Release Notes</a>
---

<p>Generative art for thermal printers</p>
<p>
    A long time ago I saw someone on Twitter make generative art on
    a receipt printer. I sadly didn't bookmark the post, but the
    concept stuck with me. Eventually I decided to get myself a
    receipt printer of myself and make my own art.
</p>
<p>
    This project is written in Python. It generates PostScript code
    representing a document that draws the art. I then use GhostScript
    to convert this to PDF since that's easier to print from.
</p>
<p>
    Why PostScript? Even though it's old, I like it for its simplicity.
    It's a stack-based language for drawing documents, so commands like
    drawing paths, rectangles, etc are all built-in. To learn more, see
    the <a href="https://www.adobe.com/jp/print/postscript/pdfs/PLRM.pdf">PostScript Language Reference Manual</a>
</p>
<p>
    One goal for this project was to make a simple sketchbook-like
    format, inspired by <a href="https://processing.org/">Processing</a>.
    I've always liked that Processing makes it very easy to start
    drawing on the screen. I realized that adopting such a goal in
    projects like this one would make it easier for me to create more
    art. For this project, that felt successful. I managed to make
    many artworks, and it's very easy to add more over time if I so
    choose.
</p>
