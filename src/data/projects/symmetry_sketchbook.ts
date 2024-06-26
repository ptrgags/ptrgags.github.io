import { update_url, type ProjectDescriptor } from '@/core/Project'

export const symmetry_sketchbook: ProjectDescriptor = {
  id: 'symmetry-sketchbook',
  title: 'Symmetry Sketchbook',
  years: '2019-2020, 2024',
  sort_key: '2024-03-00:00',
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
  updates: [
    {
      sort_key: '2020-06-06:01',
      date: '2019-2020',
      title: 'Original Version',
      image: {
        url: update_url('symmetry-sketchbook', '2020-06-06_OldVersion.png'),
      },
      description: `
        <p>
            I originally read <cite>Creating Symmetry</cite> in 2019, and wanted
            to try out some of the techniques described in the book. I made a
            sketchbook of p5.js sketches to experiment.
        </p>
        <p>
            By the time I got to rosette patterns, I realized that using a
            WebGL shader would be the best way to implement the patterns. This
            is because the patterns require calculations at every pixel.
            Since each calculation is independent, this works nicely.
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
      image: {
        url: update_url('symmetry-sketchbook', '2024-02-24_ThreefoldSwirl.png'),
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
      image: {
        url: update_url('symmetry-sketchbook', '2024-02-24_InversionsThreefold.png'),
      },
    },
    {
      sort_key: '2024-02-24:03',
      date: '2024-02-24',
      title: 'Swirly Donut',
      description: '',
      image: {
        url: update_url('symmetry-sketchbook', '2024-02-25_SwirlyDonut.png'),
      },
    },
    {
      sort_key: '2024-02-26:01',
      date: '2024-02-26',
      title: 'Better Rosette Palettes',
      description: `
            I changed the palettes to be a single hue, with value increasing as
            you go around the color wheel. I also apply a gradient as you move
            away from the unit circle, this adds a lot of depth.
        `,
      image: {
        url: update_url('symmetry-sketchbook', '2024-02-26_Ghosty.png'),
      },
    },
    {
      sort_key: '2024-02-27:01',
      date: '2024-02-27',
      title: 'Bestagon',
      description: '',
      image: {
        url: update_url('symmetry-sketchbook', '2024-02-27_Bestagon.png'),
      },
    },
    {
      sort_key: '2024-02-27:02',
      date: '2024-02-27',
      title: 'HexGear',
      description: '',
      image: {
        url: update_url('symmetry-sketchbook', '2024-02-27_HexGear.png'),
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
      image: {
        url: update_url('symmetry-sketchbook', '2024-02-29_SecondaryColor.png'),
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
      image: {
        url: update_url('symmetry-sketchbook', '2024-03-01_BurningPropeller.png'),
      },
    },
    {
      sort_key: '2024-03-01:02',
      date: '2024-03-01',
      title: 'Down the Drain',
      description: '',
      image: {
        url: update_url('symmetry-sketchbook', '2024-03-01_DownTheDrain.png'),
      },
    },
    {
      sort_key: '2024-03-02:01',
      date: '2024-03-02',
      title: 'Wallpaper Basics',
      description:
        'I ported the wallpaper patterns from my old shader. I found that simple striped palettes worked nicely.',
      image: {
        url: update_url('symmetry-sketchbook', '2024-03-02_HoldingHands.png'),
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
      image: {
        url: update_url('symmetry-sketchbook', '2024-03-04_MultiplicationPalette.png'),
      },
    },
    {
      sort_key: '2024-03-04:02',
      date: '2024-03-04',
      title: 'Oxygen',
      description: '',
      image: {
        url: update_url('symmetry-sketchbook', '2024-03-04_Oxygen.png'),
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
      image: {
        url: update_url('symmetry-sketchbook', '2024-03-04_OrbitalMotion.png'),
      },
    },
    {
      sort_key: '2024-03-18:01',
      date: '2024-03-18',
      title: 'A Little Offset',
      description: '',
      image: {
        url: update_url('symmetry-sketchbook', '2024-03-18_ALittleOffset.png'),
      },
    },
    {
      sort_key: '2024-03-18:02',
      date: '2024-03-18',
      title: 'Plaid',
      description: `
            To add more variety in wallpaper palettes, I added a mode that lets you
            combine horizontal and vertical stripes into a plaid pattern. In
            practice it can be used to give wallpapers a dithered look.
        `,
      image: {
        url: update_url('symmetry-sketchbook', '2024-03-18_PlaidWallpaper.png'),
      },
    },
  ],
}
