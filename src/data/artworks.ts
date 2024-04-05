import { type ArtworkDescriptor, Artwork } from '@/core/Artwork'

const ARTWORK_DESCRIPTORS: ArtworkDescriptor[] = [
  {
    id: '2022-06-27_TurtleDances',
    title: 'Turtle Dances',
    date: '2022-06-27',
    sort_key: '2022-06-27:01',
    project_id: 'paper-toaster',
    img_format: 'png',
    alt_text:
      'Example output of the turtle dance artwork from the paper toaster project. This pattern looks like a hexagon with decorative kites pointing outwards from each vertex.',
    tagline:
      'Artwork inspired by a Bridges math art paper about turtle graphics. It modifies an integer sequence to compute turn angles',
    description: `
        <p>
            This artwork was inspired by the <a href="https://www.bridgesmathart.org/">Bridges</a> math art paper,
            <a href="https://archive.bridgesmathart.org/2017/bridges2017-139.pdf">"Let the Numbers Do the Walking: Generating Turtle Dances on the Plane from Integer Sequences"</a>
            by Adam Colestock. It uses <a href="https://en.wikipedia.org/wiki/Turtle_graphics">turtle graphics</a>
            to generate patterns.
        </p>
        <p>
            The paper talks about taking an integer sequence, modifying it, 
            and using it to determine how much the turtle should turn after
            each step. The sequence is modified by taking the sequence,
            dividing it by two different divisors, and subtracting the
            remainders. The complexity of the pattern depends on the choice
            of divisors as well as the angular step size when the turtle
            turns.
        </p>
        <p>
            The original paper only used the natural numbers, but I also
            included some other sequences (square, triangle and Fibonacci
            numbers)
        </p>
        <p>
            As a bonus, here are some Desmos graphs exploring the math of
            these patterns:
        </p>
        <ul>
            <li><a href="https://www.desmos.com/calculator/uvvgysw7xt">Visualization of the modified integer sequences</a></li>
            <li><a href="https://www.desmos.com/calculator/wcmvohdoxt">It looks cooler in polar coordinates</a></li>
        </ul>
        `,
    show: true,
  },
  {
    id: '2022-07-09_ElementaryCA',
    title: 'Elementary Cellular Automaton',
    date: '2022-07-09',
    sort_key: '2022-07-09:01',
    project_id: 'paper-toaster',
    img_format: 'png',
    alt_text:
      'An example output of the cellular automaton that produces a chaotic arrangement of triangle shapes',
    tagline: 'The classic cellular automaton, now in printable form',
    description: `
        <p>
            Looking for more pattern ideas to make on my receipt printer, I returned to the classic
            <a href="https://mathworld.wolfram.com/ElementaryCellularAutomaton.html">elementary cellular automaton</a>.
        </p>
        <p>
            The automaton is 1-dimensional, so the vertical direction (in this case from bottom to top) represents time.
            To compute a pixel in the next row, you examine a neighborhood of 3 pixels from the previous row. There
            are 8 possible combinations of 3 bits. The rule number (from 0 to 255) acts as a table of 8 bit flags that
            determines the result for the corresponding input pattern.
        </p>
        <p>
            Fun fact: Certain elementary CA patterns also serve as a simplified model of the patterns
            on sea snail shells. See <a href="https://en.wikipedia.org/wiki/Oliva_porphyria"><i>Olivia Porphyria</i></a>
            for example.
        </p>
        `,
    show: true,
  },
  {
    id: '2022-07-24_Braids',
    title: 'Braids',
    date: '2022-07-24',
    sort_key: '2022-07-24:01',
    project_id: 'paper-toaster',
    img_format: 'png',
    alt_text: 'A pattern of ropes woven into a braided pattern',
    tagline: 'A tiling that looks like braided strands of rope',
    description: `
        <p>
            I like making tilings and I like drawing braided rope, so I
            figured I'd combine the two into this artwork.
        </p>
        <p>
            This tiling is very simple. Each grid cell contains two strands.
            They either can be crossed, or they can remain parallel. I
            randomly choose which should happen.
        </p>
        <p>
            To ensure the pattern looks like a weave pattern, it's important
            to alternate the crossing direction on each row. Furthermore,
            the crossings will be offset by one strand each row. This means
            there's an edge case to handle on the left and right boundaries,
            but by forcing such edges to be parallel and letting it draw
            off-canvas, it's easy to make it look consistent.
        </p>
        `,
    show: true,
  },
  {
    id: '2022-07-24_IsoGrid',
    title: 'Isometric Grid',
    date: '2022-07-24',
    sort_key: '2022-07-24:02',
    project_id: 'paper-toaster',
    img_format: 'png',
    alt_text: 'A mountain-shaped scene drawn in isometric projection on a black background.',
    tagline: 'A simple isometric scene, rendered with some 2D graphics trickery',
    description: `
        <p>
            I like the look of isometric projection a lot, it gives a nice
            view of a 3D scene while keeping the lines nice and parallel. I
            decided to make a simple artwork based on this.
        </p>
        <p>
            Since paper-toaster uses 2D, not 3D graphics, I had to use some
            trickery to get this to work. I could have used a tile-based approach
            like video games sometimes use (especially for older 2D consoles),
            but I found a simpler way.
        </p>
        <p>
            First, the scene is constructed carefully so taller cells
            are towards the back and short cells are towards the front. This
            ensures that something in the foreground won't interfere with
            something behind it.
        </p>
        <p>
            Second, I kept the rendered shapes as simple as possible. A single
            cell is a tall cuboid shape. When drawn in isometric projection,
            shading the top, left and right sides, it looks like 3
            parallelograms.
        </p>
        <p>
            Third, I kept the visual style simple. I made the top, left and
            right sides solid color. I used 3 shades of grey. That's sufficient
            to simulate diffuse lighting for a flat-shaded cuboid using a
            directional light, without any of the lighting calculations!
        </p>
        <p>
            Finally, I render from back to front. Since this is a square grid,
            this just means iterating over the minor diagonals. This ensures
            that my long parallelograms are hidden behind stuff in the
            foreground. In 3D graphics, this would be undesireable since this
            involves a lot of overdraw, but this is a small artwork and only
            needs to be rendered once, so I did what I could get away with.
        </p>
        `,
    show: true,
  },
  {
    id: '2022-08-23_ColoredBraids',
    title: 'Colored Braids',
    date: '2022-08-23',
    sort_key: '2022-08-23:01',
    project_id: 'paper-toaster',
    tagline: 'Braids, now in technicolor!',
    img_format: 'png',
    alt_text: 'Rainbow colored braids in groups of 2 or 3',
    description: `
        <p>
            After I had made the earlier artwork <a href="#/artwork/paper-toaster/2022-07-24_Braids">Braids</a>,
            a friend told me that it would look nice in color for fabric. So I
            made a different script to allow specifying a color palette and
            other improvements. This one isn't designed for the receipt printer,
            as it will print it in grayscale.
        </p>
        <p>
            One difference is where Braids just randomly placed tiles, this
            one actually tracks the path of each strand. Essentially I
            take a list of strands and do an odd-even shuffle row by row. After
            each iteration, I record the new state of the strands. This informs
            where to put the crossings and what colors to make them.
        </p>
        <p>
            This particular example used the grouping option to ensure the
            braids happen in groups of 2 and 3.
        </p>
        `,
    show: true,
  },
  {
    id: '2024-02-04_BlueVelvetScarf',
    title: 'Blue Velvet Scarf',
    date: '2024-02-04',
    sort_key: '2024-02-04:01',
    project_id: 'blue-velvet-scarf',
    tagline:
      'The finished scarf. In total, it took about a month and a half and 25 pattern repeats',
    img_format: 'jpg',
    alt_text: 'The finished scarf resting on a table',
    description: `
        <p>
            A scarf knitted with blue and black velvet yarn. From start to
            finish, it took me about a month and a half, faster than the previous
            scarf I made.
        </p>
        <p>
            See the project page for more details.
        </p>
        `,
    show: true,
  },
]

export const ARTWORKS = ARTWORK_DESCRIPTORS.map((x) => new Artwork(x))

export const ARTWORKS_NEWEST_FIRST = [...ARTWORKS].sort((a: Artwork, b: Artwork) =>
  b.sort_key.localeCompare(a.sort_key),
)

export const ARTWORKS_NEWEST_5 = ARTWORKS_NEWEST_FIRST.filter((x) => x.show).slice(0, 5)

type ArtworksByProject = { [key: string]: Artwork[] }

function index_artworks(): ArtworksByProject {
  const result: ArtworksByProject = {}
  for (const artwork of ARTWORKS) {
    const id = artwork.project_id
    if (result[id] === undefined) {
      result[id] = []
    }
    result[id].push(artwork)
  }

  return result
}
export const ARTWORKS_BY_PROJECT = index_artworks()
