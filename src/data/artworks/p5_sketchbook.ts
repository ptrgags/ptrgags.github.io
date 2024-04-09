import type { ArtworkDescriptor } from '@/core/Artwork'

export const p5_sketchbook_artworks: ArtworkDescriptor[] = [
  {
    id: '2021-06-23_SeashellTexture',
    title: 'Seashell Texture',
    date: '2021-06-23',
    sort_key: '2021-06-23:01',
    project_id: 'p5-sketchbook',
    img_format: 'png',
    alt_text: 'tan image with brown triangle-looking patterns like on the shells of cone snails',
    tagline: 'A sketch that simulates the patterns on certain cone snail shells',
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
    show: true,
  },
  {
    id: '2023-12-23_GrowingFlowers',
    title: 'Growing Flowers',
    date: '2023-12-23',
    sort_key: '2023-12-23:01',
    project_id: 'p5-sketchbook',
    img_format: 'png',
    alt_text:
      'A generated image of a potted plant. It has green branches that look like a maze, and red circles to represent flowers at the tips of each branch.',
    tagline: 'A satisfying animation of a plant that grows and flowers',
    description: `
        <p>
            A simulation of plant growth using a modified random depth-first-search maze generation algorithm.
        </p>
        <p>
            See the <a href="https://ptrgags.dev/p5-sketchbook/GrowingFlowers/">p5 sketch</a>
            for the animated version and a more detailed description.
        </p>
    `,
    show: true,
  },
  {
    id: '2024-03-12_PentagTiling',
    title: 'Pentag Tiling',
    date: '2024-03-12',
    sort_key: '2024-03-12:01',
    project_id: 'p5-sketchbook',
    img_format: 'png',
    alt_text:
      'A grid of dark turquoise pentagons with two layers of wavy curves connecting them in various ways.',
    tagline: 'An artistic tiling on a grid of pentagons',
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
    show: true,
  },
  {
    id: '2024-04-09_HyperbolicConnections',
    title: 'Hyperbolic Connections',
    date: '2024-04-09',
    // There's also a project update for this day, hence starting at 2.
    sort_key: '2024-04-09:02',
    project_id: 'p5-sketchbook',
    img_format: 'png',
    alt_text: 'A circle decorated with arcs in light blue and purple',
    tagline:
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
    show: true,
  },
  {
    id: '2024-04-09_Refill',
    title: 'Refill',
    date: '2024-04-09',
    sort_key: '2024-04-09:03',
    project_id: 'p5-sketchbook',
    img_format: 'png',
    alt_text:
      'A grid of meters from the Refill game. Some are filled with blue liquid, others with red, others empty',
    tagline: 'An impossible game about trying to keep a bunch of meters full.',
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
    show: true,
  },
]
