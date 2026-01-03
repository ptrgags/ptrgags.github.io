import type { MusicAlbumDescriptor } from '@/core/MusicAlbum'

export const loops: MusicAlbumDescriptor = {
  id: 'loops',
  title: 'Loops',
  release_date: '2024-05-01',
  sort_key: '2024-05-01:00',
  featured: true,
  description: `
  <p>
    It's been about two and a half years since I last made music (see
    <a href="#/album/improvised-vol2">Improvised Volume 2</a>).
    I wanted to get more comfortable writing music in
    a digital audio workstation (DAW), so I tried my hand at making background
    music loops. I used more synth presets so I could focus on composition.
  </p>
  <p>
    One big inspiration for this album was the soundtrack from the game 
    <a href="https://en.wikipedia.org/wiki/Golden_Sun">Golden Sun</a> for 
    Gameboy Advance. It was my favorite RPG as a kid. I studied
    the soundtrack and re-watched <a href="https://youtu.be/9yxEPZ1vCnM?si=KxZP08nysqhKlruk">8-bit Music Theory's video</a>
    about the game's music. I learned quite a few things about the structure
    of background music (often a simple AB loop is enough!), the choice
    of instruments (e.g. mallet percussion + delay makes nice ethereal vibes),
    and use of unusual time signatures.
  </p>
  <p>
    Also, thanks to <a href="https://www.youtube.com/@KeygenGirl">@KeygenGirl</a> 
    for our discussions about music production, that helped me get enthusiastic
    about making music again. And she provided some tips about mixing that
    came in handy!
  </p>
  `,
  play_style: 'loop',
  tracks: [
    {
      filename: '01_2024-04-18_SkylineStroll.flac',
      title: 'Skyline Stroll',
      date: '2024-04-18',
      description: 'This track gave me a fun vibe of walking around a city.',
    },
    {
      filename: '02_2024-04-14_Bouncy.flac',
      title: 'Bouncy',
      date: '2024-04-14',
      description: `
        <p>This was an exercise in metric modulation from 3/4 to 4/4 time.</p>
        <p>
          Thanks <a href="https://www.youtube.com/@KeygenGirl">@KeygenGirl</a>
          for your advice about mixing this track! It sounds way clearer
          now compared to what I originally had.
        </p>
      `,
    },
    {
      filename: '03_2024-04-26_OnePitchEach.flac',
      title: 'One Pitch Each',
      date: '2024-04-26',
      description: `
        I challenged myself to make a track where each instrument plays only a 
        single pitch (though different octaves are allowed). It turned into a 
        fun jazzy number!
      `,
    },
    {
      filename: '04_2024-04-10_JupiterIcehouse.flac',
      title: 'Jupiter Icehouse',
      date: '2024-04-10',
      description: `
        <p>
        This was the first track I made for this album. I call it a "structure 
        parody" of the <a href="https://youtu.be/N9hfd28ezfQ?si=bE-T7egB3HkQnKZO">Jupiter Lighthouse theme</a>
        from Golden Sun: The Lost Age. I mimicked the following details of the
        track:
        </p>
        <ul>
          <li>Structure - The track is a short AB loop.</li>
          <li>
            Contours - The mallet percussion arpeggiates upwards except for the 
            last chord of each section where it arpeggiates downwards.
          </li>
          <li>
            Instruments - I tried to find similar-sounding synths.
          </li>
          <li>
            Effects - Several of the instruments have a delay (echo) effect
            which helps give an ethereal sound. Only later did I realize that
            I used a longer delay that's not quite the same as the slapback
            delay of the original.
          </li>
        </ul>
        <p>However, everything else was written from scratch:</p>
        <ul>
          <li>Chords - I made up a new chord progression.</li>
          <li>
            Melodies - All the melodies and arpeggios were written based
            on the new chord progression.
          </li>
          <li>
            Rhythm - For the flute chord, I repeated the stacatto chord
            a few times to give it more motion than in the original.
          </li>
        </ul>
        <p>
          Where the original has a mysterious, ethereal vibe, my experiment
          had a brighter, wintertime vibe. I think this has to do with the
          change in chord progression and the metallic percussion.
        </p>
      `,
    },
    {
      filename: '05_2024-04-25_WhileTheRiceCooks.flac',
      title: 'While the Rice Cooks',
      date: '2024-04-25',
      description: `
        I started making this track while I was waiting for my rice cooker to 
        finish, hence the name.
      `,
    },
    {
      filename: '06_2024-04-26_DiceArp.flac',
      title: 'Dice Arp',
      date: '2024-04-26',
      description: `
        I made several clips for the arpeggios, and sequenced them into longer
        patterns using some dice. I then layered other tracks on top.
      `,
    },
    {
      filename: '07_2024-04-28_DialingTheVoid.flac',
      title: 'Dialing the Void',
      date: '2024-04-28',
      description: `
        I detuned a synth to produce the frequencies of a phone's 
        number pad (<a href="https://en.wikipedia.org/wiki/DTMF">DTMF</a> tones). 
        I then sequenced it as if each button is a different drum hit.
      `,
    },
    {
      filename: '08_2024-04-30_BouncyBallOrchestra.flac',
      title: 'Bouncy Ball Orchestra',
      date: '2024-04-30',
      description: `
        This one is a bit chaotic. I made some samples that sound like a ball
        bouncing increasingly fast, then played arbitrary notes with the sample.
      `,
    },
    {
      filename: '09_2024-04-29_OceanMysteries.flac',
      title: 'Ocean Mysteries',
      date: '2024-04-29',
      description: `
        This was a low-effort track. I just took a big chord and let the voices
        meander smoothly. With the synths I used, it gave me underwater vibes.
      `,
    },
    {
      filename: '10_2024-04-29_Xylotheque1.flac',
      title: 'Xylotheque I',
      date: '2024-04-29',
      description: `
        <a href="https://en.wikipedia.org/wiki/Xylotheque">"Xylotheque"</a> refers
        to a library of wood samples. However, here I'm using the word jokingly 
        to mean "a repository of xylophones".
      `,
    },
    {
      filename: '11_2024-04-29_Xylotheque2.flac',
      title: 'Xylotheque II',
      date: '2024-04-29',
      description: `
       Originally I intended Xylotheque I and II to be the A and B sections of
       the same track, but I split them up since I thought they each sounded
       good independently.
      `,
    },
    {
      filename: '12_2024-04-14_Warehouse54.flac',
      title: 'Warehouse 54',
      date: '2024-04-14',
      description: `
        I saved the best for last. The title comes from Ableton's "Warehouse 
        Stutter" kit + the 5/4 time signature. However, the sound evokes "boss 
        battle in Warehouse 54" vibes.
      `,
    },
  ],
}
