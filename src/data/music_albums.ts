import { MusicAlbum, type MusicAlbumDescriptor } from '@/core/MusicAlbum'

const ALBUM_DESCRIPTORS: MusicAlbumDescriptor[] = [
  {
    id: 'boo',
    title: 'boo.',
    release_date: '2020-10-31',
    sort_key: '2020-10-31:00',
    play_style: 'advance',
    description: `
        <p>
            This Halloween-themed album was my first time making music with
            my own hardware synthesizers. I explored a variety of ways of making
            spooky musical experiments.
        </p>`,
    tracks: [
      {
        filename: '01_2020-10-11_October.flac',
        title: 'October',
        date: '2020-10-11',
        description: 'Made in Waveform Pro. I started composing this on October 1',
      },
      {
        filename: '02_2020-10-25_SkeletonsInAHurry.flac',
        title: 'Skeletons in a Hurry',
        date: '2020-10-25',
        description: 'Made with a Novation Circuit',
      },
    ],
  },
  {
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
        description: '...',
      },
      {
        filename: '02_2024-04-14_Bouncy.flac',
        title: 'Bouncy',
        date: '2024-04-14',
        description: '...',
      },
      {
        filename: '03_2024-04-26_OnePitchEach.flac',
        title: 'One Pitch Each',
        date: '2024-04-26',
        description: '...',
      },
      {
        filename: '04_2024-04-10_JupiterIcehouse.flac',
        title: 'Jupiter Icehouse',
        date: '2024-04-26',
        description: '...',
      },
      {
        filename: '05_2024-04-25_WhileTheRiceCooks.flac',
        title: 'While the Rice Cooks',
        date: '2024-04-25',
        description: '...',
      },
      {
        filename: '06_2024-04-26_DiceArp.flac',
        title: 'Dice Arp',
        date: '2024-04-26',
        description: '...',
      },
      {
        filename: '07_2024-04-28_DialingTheVoid.flac',
        title: 'Dialing the Void',
        date: '2024-04-28',
        description: '...',
      },
      {
        filename: '08_2024-04-30_BouncyBallOrchestra.flac',
        title: 'Bouncy Ball Orchestra',
        date: '2024-04-30',
        description: '...',
      },
      {
        filename: '09_2024-04-29_OceanMysteries.flac',
        title: 'Ocean Mysteries',
        date: '2024-04-29',
        description: '...',
      },
      {
        filename: '10_2024-04-29_Xylotheque1.flac',
        title: 'Xylotheque I',
        date: '2024-04-29',
        description: '...',
      },
      {
        filename: '11-2024-04-29_Xylotheque2.flac',
        title: 'Xylotheque II',
        date: '2024-04-29',
        description: '...',
      },
      {
        filename: '12_2024-04-14_Warehouse54.flac',
        title: 'Warehouse 54',
        date: '2024-04-14',
        description: '...',
      },
    ],
  },
]

export const ALBUMS = ALBUM_DESCRIPTORS.map((x) => new MusicAlbum(x))
