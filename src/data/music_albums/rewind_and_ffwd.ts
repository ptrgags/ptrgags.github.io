import type { MusicAlbumDescriptor } from '@/core/MusicAlbum'

export const rewind_and_ffwd: MusicAlbumDescriptor = {
  id: 'rewind-and-ffwd',
  title: 'REW/FFWD',
  release_date: '2024-07-15',
  sort_key: '2024-07-15:02',
  description: `
        <p>
            My latest experiment with music mixes old and modern tech.
            I got a small cassette recorder to try making a low-fi album.
            Magnetic tape has unique sonic qualities that I wanted to capture.
        </p>
        <p>
            Over the course of about a month and a half, I recorded synth
            jams to a cassette tape. Once filled, I digitized the tape
            and edited it down to the best improvisations.
        </p>
        <p>
            I tried to keep my edits minimal to retain the low-fi vibe. I
            mostly normalized the volume level. However, there were a few
            places where noise reduction was helpful in making sure the
            melody is audible.
        </p>
    `,
  tracks: [
    {
      filename: '01_2024-05-10_LeakyPipes.flac',
      title: 'Leaky Pipes',
      date: '2024-05-10',
      description:
        'This was an experiment with driving the tape pretty hard so it distorts. Tape saturation has different characteristics than when digital audio clips.',
    },
    {
      filename: '02_2024-05-10_SaturatedSines.flac',
      title: 'Saturated Sines',
      date: '2024-05-10',
      description:
        'Again, I drove the audio hard to get that tape saturation sound. The sound is harsh, but a very unique texture. While editing, I realized that this sound reminds me of <a href="https://youtu.be/KkiJWsV-eDI">Desparately Safe</a> from the 2008 indie game OFF</a>.',
    },
    {
      filename: '03_2024-05-10_StringlikePlucks.flac',
      title: 'Stringlike Plucks',
      date: '2024-05-10',
      description:
        'For some reason this track reminds me of <a href="https://en.wikipedia.org/wiki/Switched-On_Bach">Switched-on Bach</a> and other works by Wendy Carlos.',
    },
    {
      filename: '04_2024-05-16_SpaceBass.flac',
      title: 'Space Bass',
      date: '2024-05-16',
      description:
        "This is a Korg Monologue... I think fed through a delay pedal? I don't quite remember. ",
    },
    {
      filename: '05_2024-05-16_Quindicesima.flac',
      title: 'Quindicesima',
      date: '2024-05-16',
      description:
        'Italian for "fifteenth." In sheet music, 15ma means play the music two octaves (a perfect 15th) above what is written. This is a fancy way of saying that I took the synth patch from the previous track and bumped it up 2 octaves.',
    },
    {
      filename: '06_2024-05-18_HauntedTownOfPurple.flac',
      title: 'Haunted Town of Purple',
      date: '2024-05-18',
      description:
        'The percussion of an organ emulator I have reminds me a lot of a <a href="https://youtu.be/JNJJ-QkZ8cM">certain spooky tune</a> from a Pokémon game.',
    },
    {
      filename: '07_2024-05-18_FamiliarHaunts.flac',
      title: 'Familiar Haunts',
      date: '2024-05-18',
      description:
        'Years ago I tried to learn the spooky tune <a href="https://youtu.be/MjkkKPqikdo">Dancing Calbrena</a> from Final Fantasy IV, but ended up making this hypnotic chord progression. But this is the first time I actually recorded it.',
    },
    {
      filename: '08_2024-06-07_RingMod.flac',
      title: 'Ring Mod',
      date: '2024-06-07',
      description:
        'After studying the math of ring modulation and amplitude modulation, I realized that integer pitch ratios produce the most coherent results. This was my first experiment with that.',
    },
    {
      filename: '09_2024-06-27_EWIRevisited.flac',
      title: 'EWI Revisited',
      date: '2024-06-27',
      description:
        'I was organizing my things and found my electronic wind instrument (EWI). And somehow I found renewed joy for it. It lets me control my synths with a woodwind-like interface.',
    },
    {
      filename: '10_2024-06-29_EWILead.flac',
      title: 'EWI Lead',
      date: '2024-06-29',
      description: 'I made a nicer lead synth patch to use with my EWI.',
    },
    {
      filename: '11_2024-06-27_BluesyEWI.flac',
      title: 'Bluesy EWI',
      date: '2024-06-27',
      description:
        "Here I'm using the chords mode of my MiniFreak, configured to a blues scale. I then controled the melody with my EWI.",
    },
    {
      filename: '12_2024-06-28_ElectricLayers.flac',
      title: 'Electric Layers',
      date: '2024-06-28',
      description:
        'This is a combination of an electric piano emulator layered with a synth connected via MIDI.',
    },
    {
      filename: '13_2024-06-28_WurliArpeggiated.flac',
      title: 'Wurli Arpeggiated',
      date: '2024-06-28',
      description:
        "After making the previous track, I realized that driving the wurli with the synth's arpeggiator I could make more intricate melodies.",
    },
    {
      filename: '14_2024-06-29_HVACWhileAway.flac',
      title: 'HVAC While Away',
      date: '2024-06-29',
      description: '<i>Oh the sounds that will play when the humans are away...</i>',
    },
    {
      filename: '15_2024-06-30_FourSquare.flac',
      title: 'Four Square',
      date: '2024-06-30',
      description:
        'Square waves tuned to perfect fourths. If this was in a video game, this feels like it would be a good match for a tranquil temple setting.',
    },
    {
      filename: '16_2024-07-01_Locrian5ths.flac',
      title: 'Locrian 5ths',
      date: '2024-07-01',
      description:
        'This was a fun experiment: I took a synth patch tuned to perfect fifths but played only notes from the B Locrian mode. Technically this produces notes outside of the mode, but I think it made it more musical. Locrian is more difficult to work with compared with the other modes.',
    },
    {
      filename: '17_2024-07-01_SubOrgan.flac',
      title: 'Sub Organ',
      date: '2024-07-01',
      description: 'I find the tape saturation helps add to the low-fi organ vibe.',
    },
  ],
  play_style: 'advance',
}
