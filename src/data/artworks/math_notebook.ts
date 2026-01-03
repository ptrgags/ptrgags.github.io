import type { ArtworkDescriptor } from '@/core/Artwork'

export const math_notebook_artworks: ArtworkDescriptor[] = [
  {
    id: '2024-10-30_GhostOctahedral',
    title: 'Ghost Octahedral Tour',
    date: '2024-10-30',
    timeline_desc: 'A ghost takes a spin around the octahedral rotation group.',
    description: `
    <p>
        <i>Our ghostly friend got too close to a mathematician's sphere and was sent
        for a spin. A rather symmetric spin...</i>
    </p>
    <p>
        This tiling was created with two 90 degree elliptic Möbius 
        transformations, one swirling around +/- 1, the other around +/- i.
        However, it's easier to think about on a sphere. Take a sphere
        and perform any combination of quarter turns around the x axis or
        y-axis. After a while, you will find that you create 24 unique rotations.
        As it turns out, this is the same as the 24 rotation symmetries of
        an octahedron of cube. In math this is called the 
        <a href="https://en.wikipedia.org/wiki/Octahedral_symmetry#Chiral_octahedral_symmetry">(chiral) octahedral symmetry group</a>,
        O. This image is just a stereographic projection of that sphere
        onto the complex plane.
    </p>
    <p>
        Each pair of overlapping ghosts represents the two ways of orienting
        the edge of a cube (forward or reversed). The size of the ghosts
        represents how near they were to the north pole before projecting.
        There are 3 rings of 4 ghosts. From largest to smallest, we have
        the top 4 edges of the cube, the 4 vertical edges, and 4 bottom edges.
    </p>
    `,
    // Listing my favorite halloween artworks last so they show up first
    // in the list (reverse chronological order)
    sort_key: '2024-10-30:08',
    project_id: 'math-notebook',
    img_format: 'png',
  },
  {
    id: '2024-10-30_CandyCorners',
    title: 'Candy Corners',
    date: '2024-10-30',
    timeline_desc: 'Candy corn at the corners of a hyperbolic tiling',
    description: `
        <p>Candy corn at the corners of a <a href="https://en.wikipedia.org/wiki/Order-7_triangular_tiling">{3, 7}-hyperbolic tiling</a>.</p>
        <p>
            I finally figured out how to represent regular hyperbolic tilings
            using Möbius transforms after reading
            <a href="https://dl.acm.org/doi/10.1145/965161.806808">"Creating repeating hyperbolic patterns"</a> by Dunham, 
            Lidgren and Witte, found through the article
            <a href="https://medium.com/@philogb/an-overview-of-symmetry-papers-f21f12bc08f7">"An Overview of Symmetry Papers"</a> by Nicolas Belmonte.
            This was a big breakthrough for me, as I've been wondering how to make such Escher-esque patterns for years.
        </p>
    `,
    sort_key: '2024-10-30:07',
    project_id: 'math-notebook',
    img_format: 'png',
    featured: true,
  },
  {
    id: '2024-10-30_GhostDoubleSpiral',
    title: 'Ghost Double Spiral',
    date: '2024-10-30',
    timeline_desc: 'Ghost sailors, navigating from pole to pole.',
    description: `
        <p>
            Here the ghosts are following 4
            <a href="https://en.wikipedia.org/wiki/Rhumb_line">loxodromic paths</a>
            around the globe. These are paths with a constant bearing relative 
            to north. Stereographic projection from the equator makes them
            look like double spirals instead.
        </p>
    `,
    sort_key: '2024-10-30:06',
    project_id: 'math-notebook',
    img_format: 'png',
  },
  {
    id: '2024-10-30_RibCage',
    title: 'Rib Cage',
    date: '2024-10-30',
    timeline_desc: 'Infinite ribs.',
    description: `<p>Here I'm using hyperbolic Möbius transformations to make a rib cage that can fit any number of ribs</p>`,
    sort_key: '2024-10-30:05',
    project_id: 'math-notebook',
    img_format: 'png',
  },
  {
    id: '2024-10-30_HexTiles',
    title: 'Hex Tiles',
    date: '2024-10-30',
    timeline_desc: `A Halloween pun.`,
    description: `<p>A Halloween pun.</p>`,
    sort_key: '2024-10-30:04',
    project_id: 'math-notebook',
    img_format: 'png',
  },
  {
    id: '2024-10-30_BoneTree',
    title: 'Bone Tree',
    date: '2024-10-30',
    timeline_desc: `Money doesn't grow on trees. But skulls grow on this one.`,
    description: `<p>I wanted to do a classic tree fractal, but make it spooky for Halloween.</p>`,
    sort_key: '2024-10-30:03',
    project_id: 'math-notebook',
    img_format: 'png',
  },
  {
    id: '2024-10-30_GhostGasket',
    title: 'Ghost Gasket',
    date: '2024-10-30',
    timeline_desc: 'A ghost takes a dizzying tour of the Apollonian gasket fractal.',
    description: `
        <p>
            This image is based on a diagram from Chapter 7 of
            <cite>Indra's Pearls</cite> by Mumford, Series, and Wright. That
            chapter talks about the <a href="https://en.wikipedia.org/wiki/Apollonian_gasket">Apollonian gasket</a>
            and how to create the pattern from 2 Möbius transformations.
        </p>
        <p>
            This image is not the full gasket, but the tiling within one of
            its circles. The geometry here is peculiar, so it's no wonder it
            took me a while to understand. Not only are the tiles unusual
            shapes (ideal quadrilaterals), but up doesn't point the same
            way in adjacent tiles! I used to be as dizzy as our ghost pal here.
        </p>
        `,
    sort_key: '2024-10-30:02',
    project_id: 'math-notebook',
    img_format: 'png',
  },
  {
    id: '2024-10-30_Warpedpaper',
    title: 'Warpedpaper',
    date: '2024-10-30',
    timeline_desc: 'Sweet wallpaper bent into circles with math.',
    description: `
        <p>
        I took the candy corn motif, and made a wallpaper tiling out of it. To
        make it more interesting, I applied a hyperbolic Möbius transformation to
        bend the vertical columns into the circular arcs you see here.
        </p>`,
    sort_key: '2024-10-30:01',
    project_id: 'math-notebook',
    img_format: 'png',
  },
]
