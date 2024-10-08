import type { ArtworkDescriptor } from '@/core/Artwork'

export const p5_sketchbook_artworks: ArtworkDescriptor[] = [
  {
    id: '2021-06-23_SeashellTexture',
    title: 'Seashell Texture',
    date: '2021-06-23',
    sort_key: '2021-06-23:01',
    project_id: 'p5-sketchbook',
    img_format: 'png',
    timeline_desc: 'A sketch that simulates the patterns on certain cone snail shells',
    description: `
        <p>
            A simulation of how the triangular pigmentation patterns on
            seashells are formed. This is based on the paper <a href="http://algorithmicbotany.org/papers/shells.sig92.pdf"><cite>Modeling Seashells</cite></a>
            by Fowler, Meinhardt and Prusinkiewicz.
        </p>
        <p>
            See the <a href="https://ptrgags.dev/p5-sketchbook/SeashellTexture/">p5 sketch</a>
            for the animated version and a more detailed description.
        </p>
    `,
  },
  {
    id: '2023-12-23_GrowingFlowers',
    title: 'Growing Flowers',
    date: '2023-12-23',
    sort_key: '2023-12-23:01',
    project_id: 'p5-sketchbook',
    img_format: 'png',
    timeline_desc: 'A satisfying animation of a plant that grows and flowers',
    description: `
        <p>
            A simulation of plant growth using a modified random depth-first-search maze generation algorithm.
        </p>
        <p>
            See the <a href="https://ptrgags.dev/p5-sketchbook/GrowingFlowers/">p5 sketch</a>
            for the animated version and a more detailed description.
        </p>
    `,
  },
  {
    id: '2024-03-12_PentagTiling',
    title: 'Pentag Tiling',
    date: '2024-03-12',
    sort_key: '2024-03-12:01',
    project_id: 'p5-sketchbook',
    img_format: 'png',
    timeline_desc: 'An artistic tiling on a grid of pentagons',
    description: `
        <p>
            An artistic pattern made on a tiling of tag-shaped pentagons.
        </p>
        <p>
            See the <a href="https://ptrgags.dev/p5-sketchbook/PentagTiling/">p5 sketch</a> for the interactive
            version and a more detailed description.
        </p>
        <p>
            This was an experiment in making generative art with just a little
            bit of user interaction to make it feel more satisfying.
        </p>
    `,
  },
  {
    id: '2024-04-09_HyperbolicConnections',
    title: 'Hyperbolic Connections',
    date: '2024-04-09',
    // There's also a project update for this day, hence starting at 2.
    sort_key: '2024-04-09:02',
    project_id: 'p5-sketchbook',
    img_format: 'png',
    timeline_desc:
      'A swirly pattern made in the hyperbolic plane. This was originally made in 2021, but I tweaked it a bit when cleaning up p5-sketchbook.',
    description: `
        <p>
            A swirly pattern made on the Poincaré model of the hyperbolic plane.
        </p>
        <p>
            See the <a href="https://ptrgags.dev/p5-sketchbook/HyperbolicConnections/">p5 sketch</a> for the interactive
            version and a more detailed description.
        </p>
        <p>
            I first made this sketch in 2021. It just generated the image
            and masked out the background. I removed the masking, just because
            it looks cool. I also enabled warping the image with the mouse,
            since that leads to some neat swirly patterns.
        </p>
    `,
  },
  {
    id: '2024-04-09_Refill',
    title: 'Refill',
    date: '2024-04-09',
    sort_key: '2024-04-09:03',
    project_id: 'p5-sketchbook',
    img_format: 'png',
    timeline_desc: 'An impossible game about trying to keep a bunch of meters full.',
    description: `
        <p>
            An impossible "game" about trying to keep all the meters filled.
            It serves as an analogy for trying to keep up with the never-ending
            list of tasks in day-to-day life.
        </p>
        <p>
            See the <a href="https://ptrgags.dev/p5-sketchbook/Refill/">p5 sketch</a> for the interactive
            version and a more detailed description.
        </p>
    `,
  },
  {
    id: '2024-09-25_InkBlocks',
    title: 'Ink Blocks',
    date: '2024-09-25',
    sort_key: '2024-09-25:01',
    project_id: 'p5-sketchbook',
    img_format: 'png',
    timeline_desc: 'A silly automaton inspired by fountain pens and sunflowers.',
    description: `
        <p>
            In my fountain pen case, I keep a number of pens of different colors
            for journaling and drawing. I cycle through the pens one by one.
            When a pen runs out of ink, I remove it from the case for cleaning.
            The remaining pens slide to the left, and refilled pens are added
            on the right.
        </p>
        <p>
            I was curious what pattern you get if you repeat this process
            over a long period of time. So I made this automaton to simulate it.
        </p>
        <p>
            See the <a href="https://ptrgags.dev/p5-sketchbook/InkBlocks/">p5 sketch</a>
            for the animated version and a more detailed description.
        </p>
    `,
  },
  {
    id: '2024-09-25_InfiniteSunflower',
    title: 'Infinite Sunflower',
    date: '2024-09-25',
    sort_key: '2024-09-25:02',
    project_id: 'p5-sketchbook',
    img_format: 'png',
    timeline_desc: 'An artistic depiction of the growth of sunflower spirals.',
    description: `
        <p>
            Recently I read about the math of spiral pyllotaxis, the spiral
            patterns of florets you see in sunflowers and other plants.
            Most notably, the paper 
            <a href="https://www.sciencedirect.com/science/article/pii/S007961072300038X">"Towards solving the mystery of spiral phyllotaxis"</a>
            which illustrates how this pattern emerges from very simple rules.
        </p>
        <p>
            This sketch is my artistic animation of the creation of these
            spirals, except mine continues forever. New florets are added
            in the center, and the oldest petals are removed after a while.
        </p>
        <p>
            See the <a href="https://ptrgags.dev/p5-sketchbook/InfiniteSunflower/">p5 sketch</a> 
            for the animated version and a more detailed description.
        </p>
    `,
  },
]
