import { type ProjectDescriptor, Project } from '@/core/Project'
import { hyperbolic_crochet } from './projects/hyperbolic_crochet'
import { symmetry_sketchbook } from './projects/symmetry_sketchbook'
import { blue_velvet_scarf } from './projects/blue_velvet_scarf'
import { p5_sketchbook } from './projects/p5_sketchbook'

const PROJECT_DESCRIPTORS: ProjectDescriptor[] = [
  {
    id: 'paper-toaster',
    title: 'Paper Toaster',
    years: '2022-2024',
    sort_key: '2024-01-00:01',
    github_repo: 'paper-toaster',
    img_format: 'png',
    description: `
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
    `,
    updates: [
      {
        sort_key: '2022-06-15:01',
        date: '2022-06-15',
        title: 'Start of Project',
        description:
          'I started making a sketchbook format and made a few simple patterns as a warm-up.',
      },
      {
        sort_key: '2024-01-22:01',
        date: '2024-01-22',
        title: 'Public on GitHub',
        description:
          'In preparation for this website, I finally got around to cleaning up the README, taking screenshots and making the repo public on GitHub',
      },
    ],
  },
  {
    id: 'eloquent',
    title: 'Eloquent',
    years: '2023-2024',
    sort_key: '2024-02-00:01',
    img_format: 'png',
    description: `
        <p>
            A tool for the indecisive. This web app lets you make a list of ideas
            and rank them using an <a href="https://en.wikipedia.org/wiki/Elo_rating_system">Elo rating system</a> like in chess.
        </p>
        <p>
            I've always found it unusually difficult to pick favorites from a long list. So I decided to make myself
            a tool for myself to make it easier. I saw some videos about the math of the Elo rating system, and
            realized it would be a good fit. See the GitHub project for more details.
        </p>
        <p>
            This project served as a learning exercise to learn <a href="https://vuejs.org/">Vue.js</a> in advance
            of updating my website.
        </p>
        `,
    github_repo: 'eloquent',
    demo_link: 'https://ptrgags.dev/eloquent',
  },
  blue_velvet_scarf,
  {
    id: 'stretchy-blocks',
    title: 'Stretchy Blocks',
    years: '2024',
    sort_key: '2024-02-00:03',
    img_format: 'png',
    description: `
        <div class="warning">
            ⚠ Compatibility Note: The live demo linked above requires WebGPU. This is a recent
            browser feature, and not all browsers support it. As of 2024-02-15,
            this is known to work in Chrome and Edge for Windows, but not Firefox or
            on mobile devices. Check <a href="https://caniuse.com/webgpu">Can I use...</a>
            for up-to-date compatibility information.
        </div>
        <p>
            This project was a warm-up exercise to learn about <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API">WebGPU</a>.
            I made an animation of cubes that stretch and shrink. See the Demo
            link above for the animated version.
        </p>
        <p>
            The animation is done completely procedurally in the shader. I make use of
            GPU instancing so I only have to upload a single cube to the GPU. All the
            shapes, colors, animations and so on are done mathematically in the shader.
        </p>
        `,
    github_repo: 'stretchy-blocks',
    demo_link: 'https://ptrgags.dev/stretchy-blocks',
  },
  symmetry_sketchbook,
  hyperbolic_crochet,
  p5_sketchbook,
]
/*
    {
        id:"holiday-shaders2",
        title: "Holiday Shaders 2",
        years: "2017",
        sort_key: "2017-12-00:01",
        github_repo: "holiday-shaders2",
        demo_link: "https://holiday2.shaders.dev",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    {
        id: "holiday-shaders",
        title: "Holiday Shaders",
        years: "2016",
        sort_key: "2016-12-00:01",
        github_repo: "holiday-shaders",
        demo_link: "https://holiday.shaders.dev",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    {
        id: "virtual-museum",
        title: "Virtual Museum",
        years: "2019",
        sort_key: "2019-08-00:01",
        github_repo: "virtual-musum",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    {
        id: "affine-font-indeed",
        title: "Affine Font Indeed",
        years: "2018",
        sort_key: "2018-08-00:01",
        github_repo: "affine-font-indeed",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    {
        id: "drawing-machines",
        title: "Drawing Machines",
        years: "2019",
        sort_key: "2019-10-00:01",
        github_repo: "drawing-machines",
        demo_link: "https://ptrgags.dev/drawing-machines/",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    {
        id: "holiday-eyecandy",
        title: "Holiday Eyecandy",
        years: "2018",
        sort_key: "2018-12-00:01",
        github_repo: "holiday-eyecandy",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    {
        id: 'ant-farm',
        title: "Ant Farm",
        years: "2015",
        sort_key: "2015-12-00:01",
        github_repo: "ant-farm",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    {
        id: 'barter',
        title: "Barter",
        years: "2014, 2016",
        sort_key: "2016-09-00:01",
        github_repo: "barter",
        demo_link: "https://ptrgags.dev/barter/",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    {
        id: "spin-o-sketch",
        title: "Spin-o-Sketch",
        years: "2014",
        sort_key: "2014-11-00:01",
        demo_link: "https://ptrgags.dev/spin-o-sketch/",
        github_repo: "spin-o-sketch",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    
]
*/

export const PROJECTS = PROJECT_DESCRIPTORS.map((x) => new Project(x))
