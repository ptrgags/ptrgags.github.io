import type { ArtworkDescriptor } from '@/core/Artwork'

export const undersea_3d_artworks: ArtworkDescriptor[] = [
  {
    id: '2025-04-16_SpinyLobster',
    title: 'Spiny Lobster',
    date: '2025-04-16',
    timeline_desc: `
        This lobster stood still enough to capture two images. Most other sea
        cretures move too quickly between shots.`,
    sort_key: '2024-04-16:01',
    project_id: 'undersea-3d',
    img_format: 'jpg',
    description: `
        <p>
            A spiny lobster at the Adventure Aquarium. It was standing mostly 
            still, so I was able to get a good stereo photo.
        </p>
        <p>
            I experimented with editing the photo a bit 
        </p>
        `,
  },
  {
    id: '2025-04-16_FluorescentCoral',
    title: 'Fluorescent Coral',
    date: '2025-04-16',
    timeline_desc: 'Did you know corals glow various colors under black light?',
    sort_key: '2024-04-16:02',
    project_id: 'undersea-3d',
    img_format: 'jpg',
    description: `
        <p>
        From witnessing this tank at the aquarium, I learned that corals are 
        fluorescent (i.e. they glow under UV light). 
        </p>
        <p>
        Later, I learned from <a href="https://www.youtube.com/watch?v=QotFxwrlD0A&list=PLXPyqwUeMof531MhQ8zK4tDEhG9xryXVo&index=5&t=5s&ab_channel=PARLEYCHANNEL">this video</a>
        by Coral Morphologic and Parley <em>why</em> corals fluoresce. It's a
        defense against harsh UV-light. The coral only absorbs part of the
        light energy, and emits the rest as light of a different color. In
        this case, that's the green and orange coloration on each polyp.
        </p>
        `,
  },

  {
    id: '2025-04-16_FriendsOrAnenomes',
    title: 'Friend Or Anemone?',
    date: '2025-04-16',
    timeline_desc: 'Okay, that was a bad pun.',
    sort_key: '2024-04-16:03',
    project_id: 'undersea-3d',
    img_format: 'jpg',
    description: `
        <p>
        One tank at the aquarium had a handful of tiny sea anemones lurking
        at the bottom. They're easy to miss, as they blend in with the gravel.
        </p>
        <p>
        From a plaque above the tank, these are apparently called 
        <i>Metridium senile</i>, common name Atlantic Frilled Anemone.
        </p>
        <p>
            Fun fact: Sea anemones, coral, and jellyfish share a common ancestor. 
            They're all <a href="https://en.wikipedia.org/wiki/Cnidaria">cnidarians</a>.
            They all have stinging tentacles and a polyp form for at least part
            of their lives. Yes, even jellyfish!
        </p>
        `,
  },
]
