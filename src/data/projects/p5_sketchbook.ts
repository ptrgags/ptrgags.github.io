import type { ProjectDescriptor } from '@/core/Project'

export const p5_sketchbook: ProjectDescriptor = {
  id: 'p5-sketchbook',
  title: 'p5 Sketchbook',
  years: '2016, 2021, 2023-2024',
  sort_key: '2024-04-00:01',
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
  ],
}
