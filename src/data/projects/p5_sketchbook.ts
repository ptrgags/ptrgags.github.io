import type { ProjectDescriptor } from '@/core/Project'

export const p5_sketchbook: ProjectDescriptor = {
  id: 'p5-sketchbook',
  title: 'p5 Sketchbook',
  years: '2016, 2021, 2023-2026',
  sort_key: '2026-01-00:01',
  featured: true,
  description: `
    <p>
        This project is a repo where I keep a variety of small art experiments
        made using <a href="https://p5js.org/">p5.js</a>.
    </p>
    <p>
        Each sketch is a little different. Some are for learning new things
        about math, others are purely for artistic reasons. Some are
        interactive, others just generate a random image.
    </p>
    <p>
        The screenshot for this project is one from the sketch <a href="https://ptrgags.dev/p5-sketchbook/HyperbolicConnections/">Hyperbolic Connections</a>.
    </p>
  `,
  github_repo: 'p5-sketchbook',
  demo_link: 'https://ptrgags.dev/p5-sketchbook/',
  img_format: 'png',
  updates: [
    {
      sort_key: '2016-06-01:01',
      date: '2016-06',
      title: 'Processing Sketchbook',
      description: `
            <p>
                I started the repo in 2016 (originally called
                <code>processing-sketchbook</code>). Originally it
                had a mix of Processing, Processing.py and p5.js sketches,
                though most were rough around the edges and later removed.
            </p>
        `,
    },
    {
      sort_key: '2024-01-15:01',
      date: '2024-01',
      title: 'p5 Sketchbook',
      description: `
            <p>
                Lately I only ever use p5.js, not the other modes of Processing,
                so I started the process of cleaning up the repo to be focused
                on JavaScript sketches. I renamed the repo
                <code>p5-sketchbook</code> to match this goal.
            </p>
        `,
    },
    {
      sort_key: '2024-04-09:01',
      date: '2024-04-09',
      title: 'Cleanup',
      description: `
            <p>
                As I added more sketches, I was slowly cleaning up old
                sketches for consistency. I finally caught up and published
                a nicer version of the sketchbook.
            </p>
            <p>
                I suppose I can't really call it a "sketchbook" in the sense
                that it's outgrown the format that the Processing IDE works.
                Oh well.
            </p>
        `,
    },
    {
      title: 'Lab Sketch: Pixel Maze',
      date: '2025-04',
      description: `
        <p>
            I went back to my roots a bit - I first got interested in programming
            by tinkering in Game Maker. I loved working with sprite artwork
            and tilesets. I wanted to try adding that to my p5 code.
        <p>
        <p>
            <a href="https://ptrgags.dev/p5-sketchbook/lab/PixelMaze/">Link to live demo</a>
        </p>
      `,
      sort_key: '2025-04-00:01',
    },
    {
      title: 'Lab Sketch: Sound Test',
      date: '2025-05/2025-11',
      description: `
        <p>
            Here and there, I've been exploring adding sound and music to
            my sketches. After reading <cite>The Haskell School of Music</cite>
            and a few other resources, I found a nice way to represent
            timelines of musical notes. I've also been trying out Tone.js
            for sound playback. This page has a few test melodies and
            visualizations to try things out.
        </p>
        <p>
            <a href="https://ptrgags.dev/p5-sketchbook/lab/SoundTest/">Link to live demo</a>
        </p>
      `,
      sort_key: '2025-11-00:01',
    },
    {
      title: 'Lab Sketch: Musical Tree',
      date: '2025-12',
      description: `
        <p>
            I realized that the timeline code I used for music would also
            work nicely for sequencing animation! This fractal tree animation was 
            an initial test of this animation code. I'm still not satisfied with the music
            yet, but I like how the visuals turned out.
        </p>
        <p>
            <a href="https://ptrgags.dev/p5-sketchbook/">Link to live demo</a>
        </p>
      `,
      sort_key: '2025-12-00:01',
    },
  ],
}
