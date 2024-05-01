import type { MusicAlbumDescriptor } from '@/core/MusicAlbum'

export const loops: MusicAlbumDescriptor = {
  id: 'loops',
  title: 'Loops',
  release_date: '2024-05-01',
  sort_key: '2024-05-01:00',
  description: `blah blah`,
  play_style: 'loop',
  tracks: [
    {
      filename: '01_2024-04-18_SkylineStroll.flac',
      title: 'Skyline Stroll',
      date: '2024-04-18',
      description: 'This one gave me a fun vibe of taking a walk around the city',
    },
    {
      filename: '02_2024-04-14_Bouncy.flac',
      title: 'Bouncy',
      date: '2024-04-14',
      description: 'This was an exercise in metric modulation from 3/4 to 4/4',
    },
    {
      filename: '03_2024-04-26_OnePitchEach.flac',
      title: 'One Pitch Each',
      date: '2024-04-26',
      description:
        'I challenged myself to make a track where each instrument plays only a single pitch (though different octaves are allowed). It turned into a fun jazzy number',
    },
    {
      filename: '04_2024-04-10_JupiterIcehouse.flac',
      title: 'Jupiter Icehouse',
      date: '2024-04-26',
      description:
        'This was the first track I made for this album. I call it a "structure parody" of the Jupiter Lighthouse theme from the game Golden Sun for GBA',
    },
    {
      filename: '05_2024-04-25_WhileTheRiceCooks.flac',
      title: 'While the Rice Cooks',
      date: '2024-04-25',
      description: 'I started making this track while I was waiting for my rice cooker to finish.',
    },
    {
      filename: '06_2024-04-26_DiceArp.flac',
      title: 'Dice Arp',
      date: '2024-04-26',
      description:
        'I made several clips for the arpeggios, and sequenced them into longer patterns using some dice. I then layered other tracks on top',
    },
    {
      filename: '07_2024-04-28_DialingTheVoid.flac',
      title: 'Dialing the Void',
      date: '2024-04-28',
      description:
        "I detuned a synth to produce the frequencies of a phone's number pad (DTMF tones). I then sequenced it as if each button is a different drum",
    },
    {
      filename: '08_2024-04-30_BouncyBallOrchestra.flac',
      title: 'Bouncy Ball Orchestra',
      date: '2024-04-30',
      description:
        'This one is a bit chaotic. I made some samples that sound like a ball bouncing increasingly fast, then played arbitrary notes with the sample',
    },
    {
      filename: '09_2024-04-29_OceanMysteries.flac',
      title: 'Ocean Mysteries',
      date: '2024-04-29',
      description:
        'This was a low-effort track. I just took a big chord and let the voices meander smoothly. With the synths I used, it gave me underwater vibes',
    },
    {
      filename: '10_2024-04-29_Xylotheque1.flac',
      title: 'Xylotheque I',
      date: '2024-04-29',
      description:
        'Xylotheque refers to a library of wood samples. However, here I\'m using it to mean "a repository of xylophones"',
    },
    {
      filename: '11-2024-04-29_Xylotheque2.flac',
      title: 'Xylotheque II',
      date: '2024-04-29',
      description:
        'Originally Xylotheque I and II were supposed to be two sections of the same track, but I split them up since each had a different vibe.',
    },
    {
      filename: '12_2024-04-14_Warehouse54.flac',
      title: 'Warehouse 54',
      date: '2024-04-14',
      description:
        'Saving the best for last. The title comes from Ableton\'s "Warehouse Stutter" kit + the 5/4 time signature. However, the sound evokes "boss battle in Warehouse 54" vibes.',
    },
  ],
}
