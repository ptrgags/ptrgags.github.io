import { type ArtworkDescriptor, Artwork } from '@/core/Artwork'

const ARTWORK_DESCRIPTORS: ArtworkDescriptor[] = [
    {
        id: "2022-06-27_TurtleDances",
        title: "Turtle Dances",
        date: "2022-06-27",
        sort_key: "2022-06-27:01",
        project_id: "paper-toaster",
        alt_text: "",
        tagline: "Artwork inspired by a Bridges math art paper about turtle graphics. It modifies an integer sequence to compute turn angles",
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
]

/*
    {
        id: "2022-07-09_ElementaryCA",
        title: "Elementary Cellular Automaton",
        date: "2022-07-09",
        sort_key: "2022-07-09:01",
        project_id: "paper-toaster",
        has_thumbnail: true,
        has_card: false,
        show: true,
    },
    {
        id: "2022-07-24_IsoGrid",
        title: "Isometric Grid",
        date: "2022-07-24",
        sort_key: "2022-07-24:01",
        project_id: "paper-toaster",
        has_thumbnail: true,
        has_card: false,
        show: true,
    },
    {
        id: "2022-08-23_ColoredBraids",
        title: "Colored Braids",
        date: "2022-08-23",
        sort_key: "2022-08-23:01",
        project_id: "paper-toaster",
        has_thumbnail: true,
        has_card: false,
        show: true,
    }
]
*/

export const ARTWORKS = ARTWORK_DESCRIPTORS.map(x => new Artwork(x))

export const ARTWORKS_NEWEST_FIRST = [...ARTWORKS].sort(
    (a: Artwork, b: Artwork) => b.sort_key.localeCompare(a.sort_key)
)

export const ARTWORKS_NEWEST_5 = ARTWORKS_NEWEST_FIRST.filter(x => x.show).slice(0, 5)

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