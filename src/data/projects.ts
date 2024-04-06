import { type ProjectDescriptor, Project } from '@/core/Project'
import { BACKBLAZE_BUCKET } from '@/core/website_constants'

function update_url(project_id: string, image_fname: string): string {
  return `${BACKBLAZE_BUCKET}/project-updates/${project_id}/${image_fname}`
}

const PROJECT_DESCRIPTORS: ProjectDescriptor[] = [
  {
    id: 'paper-toaster',
    title: 'Paper Toaster',
    years: '2022-2024',
    sort_key: '2024-01-00:01',
    github_repo: 'paper-toaster',
    img_format: 'png',
    alt_text: "Example pattern generated by paper-toaster's hitomezashi option",
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
    show: true,
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
    alt_text:
      "A digital drawing of a scroll with the text 'Eloquent' written in cursive. The letters 'Elo' are colored in red, but the rest of the drawing is in dark yellow.",
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
    show: true,
  },
  {
    id: 'blue-velvet-scarf',
    title: 'Knitting a Blue Velvet Scarf',
    years: '2023-2024',
    sort_key: '2024-02-00:02',
    alt_text: 'Photo of the completed scarf',
    img_format: 'jpg',
    description: `
        <p>
            This is the second scarf I've ever knit. This one used velvet
            yarn in two colors to make it extra soft. The blue yarn is
            a tiny bit thicker, which gives the scarf extra thickness.
        </p>
        <p>
            I kept the pattern simple so I could knit while watching a show
            or spending time with friends. The pattern is as follows:
        </p>
        <ul>
            <li>Row 0: Cast on 32 stitches in blue.</li>
            <li>Rows 1-10: Stockinette stitch. Start with blue and switch color every 5 stitches</li>
            <li>Rows 11-12: Stockinette stitch in blue only</li>
            <li>Repeat rows 1-12 until you reach the desired length. I did 25 repeats total</li>
        </ul>
        <p>
            The interesting zig-zag pattern happens for two reasons. First, 
            switching colors every 5 stitches (which does not divide evenly into the
            32 columns), this produces a stripe pattern. However, since knitting
            flat involves going back and forth, every other row is flipped
            horizontally.
        </p>
        `,
    show: true,
    updates: [
      {
        sort_key: '2023-12-18:01',
        date: '2023-12-18',
        title: 'Starting Out',
        thumbnail: {
          url: update_url('blue-velvet-scarf', '2023-12-18_StartingOut.jpg'),
          alt_text: 'Close-up photo of the start of the scarf after 3 pattern repeats',
        },
        description: 'I started the scarf. I did 3 repeats in the first sitting.',
      },
      {
        sort_key: '2023-12-29:01',
        date: '2023-12-29',
        title: '5/25 Pattern Repeats',
        thumbnail: {
          url: update_url('blue-velvet-scarf', '2023-12-29_AFewMoreRepeats.jpg'),
          alt_text: 'Photo of the scarf after 5 pattern repeats',
        },
        description: '',
      },
      {
        sort_key: '2024-01-07:01',
        date: '2024-01-07',
        title: '7/25 Pattern Repeats',
        thumbnail: {
          url: update_url('blue-velvet-scarf', '2024-01-07_ABitLonger.jpg'),
          alt_text: 'Photo of the scarf after 7 repeats',
        },
        description: '',
      },
      {
        sort_key: '2024-01-31:01',
        date: '2024-01-31',
        title: '19/25 Pattern Repeats',
        thumbnail: {
          url: update_url('blue-velvet-scarf', '2024-01-31_AlmostDone.jpg'),
          alt_text: 'Close-up photo of the scarf most of the way done',
          orientation: 'landscape',
        },
        description: '',
      },
      {
        sort_key: '2024-02-02:01',
        date: '2024-02-02',
        title: '23/25 Pattern Repeats',
        thumbnail: {
          url: update_url('blue-velvet-scarf', '2024-02-02_NearlyFinished.jpg'),
          alt_text: 'Photo of the scarf folded in half and laid across a couch',
          orientation: 'landscape',
        },
        description:
          'Nearly finished at 23/25 repeats. Here I folded the scarf in half and compared with another scarf I had made. The blue velvet scarf is a little shorter',
      },
    ],
  },
  {
    id: 'stretchy-blocks',
    title: 'Stretchy Blocks',
    years: '2024',
    sort_key: '2024-02-00:03',
    alt_text: 'Screenshot of the Stretchy Blocks animation',
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
    show: true,
  },
  {
    id: 'symmetry-sketchbook',
    title: 'Symmetry Sketchbook',
    years: '2019-2020, 2024',
    sort_key: '2024-03-00:00',
    alt_text: 'Purple and green wavy wallpaper, generated by Symmetry Sketchbook',
    img_format: 'png',
    description: `
        <p>
            This project is an exploration of the symmetric mathematical 
            patterns described in the book <a href="https://www.google.com/books/edition/Creating_Symmetry/blGUBgAAQBAJ?hl=en&gbpv=0"><cite>Creating Symmetry</cite></a>
            by Frank A. Farris. From this book I implemented the symmetric curves, as well as the rosette, frieze, and wallpaper patterns.
        </p>
        <p>
            This uses <a href="https://p5js.org/">p5.js</a> (including WebGL
            mode) for the visuals, and Vue.js for the website UI.
        </p>
        <p>
            <a href="https://ptrgags.dev/symmetry-sketchbook/#/wallpaper_symmetry?custom_pattern=H4sIAAAAAAAACo2QQQrCMBBF7/LXkzCT2CC5ioirULqIDYm6Kb27GLVYGoqbWcybeR/%2BhEfIZRiv8EIoIQ%2BhwE%2B4hRwL/AlKNDOTqVOxtsLktDl0IPyiNVG2LuX71dULFvdismYihoy27rgYm2jP%2BGYfcTNtYdu0JvrDuFOJ2nZyngl9Hu8JHin2lxQxPwEs2KB4fQEAAA==&custom_palette=H4sIAAAAAAAAClXKQQqAIBRF0b28pg4qgtCtRIT5vyWJRkoQ0d6jGnVHZ3BP7LwlFwNUJbBqzznzkI%2BVoWoBcnqKQfshz84sgVN6PxN93BJUh0JyPVIDgUKaxhr7qHz7y1qiTxVRqyX66wY8E%2B3wfAAAAA==">View this wallpaper in Symmetry Sketchbook</a>
        </p>
        `,
    github_repo: 'symmetry-sketchbook',
    demo_link: 'https://ptrgags.dev/symmetry-sketchbook',
    show: true,
    updates: [
      {
        sort_key: '2020-06-06:01',
        date: '2019-2020',
        title: 'Original Version',
        thumbnail: {
          url: update_url('symmetry-sketchbook', '2020-06-06_OldVersion.png'),
          alt_text: 'Screenshot of a rosette from the old version of the website',
        },
        description: `
        <p>
            I originally read <cite>Creating Symmetry</cite> in 2019, and wanted
            to try out some of the techniques described in the book. I made a
            sketchbook of p5.js sketches to experiment.
        </p>
        <p>
            By the time I got to rosette patterns, I realized that using a
            WebGL shader would be the best way to implement the patterns, as
            it requires calculations at every pixel. And since each calculation
            is independent, this works nicely.
        </p>
        <p>
            One downside with the old version was the UI had gotten clunky. I
            tried to do too many things on one page, and that made it hard to
            use.
        </p>
        `,
      },
      {
        sort_key: '2024-02-13:01',
        date: '2024-02-13',
        title: 'Symmetry, Repeated',
        description: `
        <p>
            When I went to clean up Symmetry Sketchbook to feature on this
            portfolio website, I felt disatisfied with the old UI. After
            thinking about it for a while, I had some ideas for a better
            way to present this project. My new design goals included:
        </p>
        <ul>
            <li>
                Instead of one big page that does too much, split into several
                smaller sections based on the type of pattern (curve, rosette,
                frieze, wallpaper) to make the UI look less busy.
            </li>
            <li>
                In each section, make a gallery with a simple interface for
                a general audience, but then have a more advanced interface for
                me to design patterns.
            </li>
            <li>
                I had some ideas to make the editor more visual. I never enjoyed
                typing in numbers for the coefficients.
            </li>
            <li>
                I wanted to change how I did the color palettes. When using
                the old version I found that simple solid color palettes work
                better than complex images, so I wanted to lean into this
                more.
            </li>
            <li>
                For the UI, I figured <a href="https://vuejs.org/">Vue.js</a>
                would be helpful. Before I was using custom Web Components.
                That was a good learning experience, but too tedious.
            </li>
            <li>
                Given the complexity of the code and math in this project,
                I decided to switch to TypeScript for my sanity.
            </li>
        </ul>
        <p>
            In mid-February, I started putting these ideas to code.
        </p>
        `,
      },
      {
        sort_key: '2024-02-24:01',
        date: '2024-02-24',
        title: 'Rosette Editor',
        description: `
            By the end of February, I had gotten the UI mostly rewritten in Vue,
            and had the rosette editor working. This image is an early
            screenshot, back when I was hard-coding the palette colors.
        `,
        thumbnail: {
          url: update_url('symmetry-sketchbook', '2024-02-24_ThreefoldSwirl.png'),
          alt_text: 'Screenshot of a pattern with 3-fold rotation symmetry',
        },
      },
      {
        sort_key: '2024-02-24:02',
        date: '2024-02-24',
        title: 'Inversions Threefold',
        description: `
            This image was me testing some of the symmetry that involves circle
            inversions. I modified the color palette so points that land within
            the unit circle are shaded darker.
        `,
        thumbnail: {
          url: update_url('symmetry-sketchbook', '2024-02-24_InversionsThreefold.png'),
          alt_text: 'Screenshot of a pattern with 3-fold rotation symmetry',
        },
      },
      {
        sort_key: '2024-02-24:03',
        date: '2024-02-24',
        title: 'Swirly Donut',
        description: '',
        thumbnail: {
          url: update_url('symmetry-sketchbook', '2024-02-25_SwirlyDonut.png'),
          alt_text: 'Screenshot of a pattern with 3-fold rotation symmetry',
        },
      },
      {
        sort_key: '2024-02-26:01',
        date: '2024-02-26',
        title: 'Better Rosette Palettes',
        description: `
            I changed the palettes to be a single hue, with value increasing as
            you go around the color wheel. I also apply a gradient as you move
            away from the unit circle, this adds a lot of depth
        `,
        thumbnail: {
          url: update_url('symmetry-sketchbook', '2024-02-26_Ghosty.png'),
          alt_text: 'Screenshot of a pattern that looks like a turquoise pinwheel.',
        },
      },
      {
        sort_key: '2024-02-27:01',
        date: '2024-02-27',
        title: 'Bestagon',
        description: '',
        thumbnail: {
          url: update_url('symmetry-sketchbook', '2024-02-27_Bestagon.png'),
          alt_text: 'Screenshot of a white hexagon-shaped pattern on a swirly purple backround',
        },
      },
      {
        sort_key: '2024-02-27:02',
        date: '2024-02-27',
        title: 'HexGear',
        description: '',
        thumbnail: {
          url: update_url('symmetry-sketchbook', '2024-02-27_HexGear.png'),
          alt_text: 'Screenshot of a pattern that looks like a hexagonal gear',
        },
      },
      {
        sort_key: '2024-02-29:01',
        date: '2024-02-29',
        title: 'Secondary Color',
        description: `
            I modified the palette again to allow a second color. This greatly
            expands the artistic possibilities, while still keeping the colors
            simple.
        `,
        thumbnail: {
          url: update_url('symmetry-sketchbook', '2024-02-29_SecondaryColor.png'),
          alt_text:
            'Screenshot of a pattern that looks like a green propeller on a purple background.',
        },
      },
      {
        sort_key: '2024-03-01:01',
        date: '2024-03-01',
        title: 'Burning Propeller',
        description: `
            I added some reference geometry (axes, unit circle, grid lines, etc)
            to the color palettes. This is partly to help the mathematically curious
            explore the patterns, but it also adds some artistic flair.
        `,
        thumbnail: {
          url: update_url('symmetry-sketchbook', '2024-03-01_BurningPropeller.png'),
          alt_text:
            'Screenshot of a pattern that looks like a six-bladed propeller on a sunburst background',
        },
      },
      {
        sort_key: '2024-03-01:02',
        date: '2024-03-01',
        title: 'Down the Drain',
        description: '',
        thumbnail: {
          url: update_url('symmetry-sketchbook', '2024-03-01_DownTheDrain.png'),
          alt_text:
            'Screenshot of wavy spirals in purple and turquoise that meet in the center of the image.',
        },
      },
      {
        sort_key: '2024-03-02:01',
        date: '2024-03-02',
        title: 'Wallpaper Basics',
        description:
          'I ported the wallpaper patterns from my old shader. I found that simple striped palettes worked nicely',
        thumbnail: {
          url: update_url('symmetry-sketchbook', '2024-03-02_HoldingHands.png'),
          alt_text:
            'Screenshot of a wallpaper pattern that looks somewhat like an array of linked hands',
        },
      },
      {
        sort_key: '2024-03-04:01',
        date: '2024-03-04',
        title: 'Palette Experiment',
        description: `
            I experimented with taking horizontal and vertical stripes
            and multiplying the colors together. I didn't end up using this
            technique since it's not very intuitive to use, but it did look
            cool.`,
        thumbnail: {
          url: update_url('symmetry-sketchbook', '2024-03-04_MultiplicationPalette.png'),
          alt_text:
            'Screenshot of a wallpaper that alternates between dark colors and bright colors',
        },
      },
      {
        sort_key: '2024-03-04:02',
        date: '2024-03-04',
        title: 'Oxygen',
        description: '',
        thumbnail: {
          url: update_url('symmetry-sketchbook', '2024-03-04_Oxygen.png'),
          alt_text:
            'Screenshot of a wallpaper in coral and cyan. The shapes look like the bent shape of an oxygen molecule.',
        },
      },
      {
        sort_key: '2024-03-04:03',
        date: '2024-03-04',
        title: 'Orbital Motion',
        description: `
            As I was working on this project, I realized that the code for the
            curves section could easily be reused to make an animation of the
            motion of a solar system from the perspective of an orbiting
            planet. I added it as a fun extra.
        `,
        thumbnail: {
          url: update_url('symmetry-sketchbook', '2024-03-04_OrbitalMotion.png'),
          alt_text: 'Screenshot of orbits that look like spirograph patterns',
        },
      },
      {
        sort_key: '2024-03-18:01',
        date: '2024-03-18',
        title: 'A Little Offset',
        description: '',
        thumbnail: {
          url: update_url('symmetry-sketchbook', '2024-03-18_ALittleOffset.png'),
          alt_text: 'Screenshot of a wallpaper in red and cyan. The axes are ',
        },
      },
      {
        sort_key: '2024-03-18:02',
        date: '2024-03-18',
        title: 'Plaid',
        description: `
            To add more variety in wallpaper palettes, I added a mode that lets you
            combine horizontal and vertical stripes into a plaid pattern. In
            practice it can be used to make a dithered look to wallpapers.
        `,
        thumbnail: {
          url: update_url('symmetry-sketchbook', '2024-03-18_PlaidWallpaper.png'),
          alt_text: 'A wallpaper of diamond shapes with red, yellow, black and white coloring',
        },
      },
    ],
  },
  {
    id: 'hyperbolic-crochet',
    title: 'Making of Hyperbolic Crochet',
    years: '2021-2023',
    sort_key: '2023-07-00:01',
    alt_text: 'Photo of completed crochet pattern',
    img_format: 'jpg',
    description: `
        <p>
            This crocheting project was inspired by the TED talk <a href="https://youtu.be/w1TBZhd-sN0?si=XsH01B6DCeU8LoqT">"Crocheting Hyperbolic Planes"</a>
            by Daina Taimiņa. Hyperbolic crocheting is pretty simple, you just
            keep doing increases and the fabric will naturally curl up into
            organic-looking patterns. Though I used a much larger branching
            factor of 2 rather than something small like 11/10 (mentioned in the video).
        </p>
        <p>
            I kept my pattern very simple, essentially the same stitch over
            and over. It was nice as a way to keep my hands busy when watching
            or listening to something.
        </p>
        <ul>
            <li>Row 0: Chain 10</li>
            <li>Row 1, 2, ..., N-2: inc in every stitch</li>
            <li>Row N-2: dc in every stitch.</li>
            <li>Row N-1: sc in  different color</li>
        </ul>
        <p>
            I worked on this project off and on over the span of a little over
            2 years. Some months I would work on it a lot, other times I
            wouldn't work on it at all.
        </p>
    `,
    show: true,
    updates: [
      {
        sort_key: '2021-07-26',
        date: '2021-07-26',
        title: 'Starting Out',
        description:
          'A picture after my first crocheting session. Here you can see the spool of crochet thread. My intent was to go through the entire spool.',
        thumbnail: {
          url: update_url('hyperbolic-crochet', '2021-07-26_Update1.jpg'),
          alt_text: 'Picture of a spool of crochet thread and the first couple rows of stitches',
        },
      },
      {
        sort_key: '2021-08-12',
        date: '2021-08-12',
        title: 'Update 2',
        description: '',
        thumbnail: {
          url: update_url('hyperbolic-crochet', '2021-08-12_Update2.jpg'),
          alt_text: '',
        },
      },
      {
        sort_key: '2021-10-25',
        date: '2021-10-25',
        title: 'Update 3',
        description: '',
        thumbnail: {
          url: update_url('hyperbolic-crochet', '2021-10-25_Update3.jpg'),
          alt_text: '',
        },
      },
      {
        sort_key: '2022-07-27',
        date: '2022-07-27',
        title: 'Update 4',
        description:
          'I put the project aside at the end of 2021, and only returned to it the next summer.',
        thumbnail: {
          url: update_url('hyperbolic-crochet', '2022-07-27_Update4.jpg'),
          alt_text: '',
        },
      },
      {
        sort_key: '2023-01-25',
        date: '2023-01-25',
        title: 'Update 5',
        description:
          'Again, I put the project aside, and only picked it up again in early 2023. This time, I was more serious about seeing the project to completion, though it still would take months.',
        thumbnail: {
          url: update_url('hyperbolic-crochet', '2023-01-25_Update5.jpg'),
          alt_text: '',
        },
      },
      {
        sort_key: '2023-07-23',
        date: '2023-07-23',
        title: 'Update 6',
        description: '',
        thumbnail: {
          url: update_url('hyperbolic-crochet', '2023-07-23_Update6.jpg'),
          alt_text: '',
        },
      },
      {
        sort_key: '2023-08-01',
        date: '202',
        title: 'End of Spool',
        description: 'This was the last picture I have before reaching the end of the spool.',
        thumbnail: {
          url: update_url('hyperbolic-crochet', '2023-08-01_Update7.jpg'),
          alt_text: '',
        },
      },
      {
        sort_key: '2023-08-17',
        date: '202',
        title: 'Spool Change',
        description: 'I got a second spool of thread to finish the last couple rows of stitches.',
        thumbnail: {
          url: update_url('hyperbolic-crochet', '2023-08-17_Update8.jpg'),
          alt_text: '',
        },
      },
      {
        sort_key: '2023-08-19',
        date: '2023-08-19',
        title: 'Last Blue Stitch',
        description:
          'This picture shows me stitching the last double crochet stitch in blue before I switched to orange',
        thumbnail: {
          url: update_url('hyperbolic-crochet', '2023-08-19_Update9.jpg'),
          alt_text: '',
        },
      },
      {
        sort_key: '2023-08-23',
        date: '2023-08-23',
        title: 'Update 10',
        description:
          'Here I am mid-way through the last row of orange stitches. Interestingly, though the orange section is only one stitch thick, it mostly obscures the blue stitches underneath. This is similar to how the grey matter of the brain covers the white matter underneath, despite there being much more white matter by volume.',
        thumbnail: {
          url: update_url('hyperbolic-crochet', '2023-08-23_Update10.jpg'),
          alt_text: '',
        },
      },
    ],
  },
]
/*
    {
        id: "p5-sketchbook",
        title: "p5.js Sketchbook",
        years: "2016, 2021, 2024",
        sort_key: "2024-01-00:02",
        github_repo: "p5-sketchbook",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
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

export const PROJECTS_NEWEST_FIRST = PROJECTS.filter((x) => x.show).sort((a: Project, b: Project) =>
  b.sort_key.localeCompare(a.sort_key),
)

export const PROJECTS_NEWEST_5 = PROJECTS_NEWEST_FIRST.slice(0, 5)
