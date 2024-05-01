import type { MusicAlbumDescriptor } from '@/core/MusicAlbum'

export const boo: MusicAlbumDescriptor = {
  id: 'boo',
  title: 'boo.',
  release_date: '2020-10-31',
  sort_key: '2020-10-31:00',
  play_style: 'advance',
  description: `
    <p>
        This Halloween-themed album was my first time making music with
        my own hardware synthesizers. I explored a variety of ways of making
        spooky music.
    </p>
  `,
  tracks: [
    {
      filename: '01_2020-10-11_October.flac',
      title: 'October',
      date: '2020-10-11',
      description: 'Made in Waveform Pro. I started composing this on October 1.',
    },
    {
      filename: '02_2020-10-25_SkeletonsInAHurry.flac',
      title: 'Skeletons in a Hurry',
      date: '2020-10-25',
      description: 'Made with a Novation Circuit.',
    },
    {
      filename: '03_2020-10-24_OcarinaHaunt.flac ',
      title: 'Ocarina Haunt',
      date: '2020-10-24',
      description:
        'Composed in MuseScore, played in Waveform Pro using Tracktion Collective Ocarina samples.',
    },
    {
      filename: '04_2020-10-11_WeekOldLeftovers.flac',
      title: 'Week Old Leftovers',
      date: '2020-10-11',
      description: 'Made with a Novation Circuit.',
    },
    {
      filename: '05_2020-10-23_TheBoxThatPlaysSongsInTheNight.flac',
      title: 'The Box That Plays Songs in the Night',
      date: '2020-10-23',
      description:
        'Composed in MuseScore, converted to music box punch card and recorded with a contact mic.',
    },
    {
      filename: '06_2020-10-24_Crosstalk.flac',
      title: 'Crosstalk',
      date: '2020-10-24',
      description: 'Roland System-1, playing with the vowel oscillator setting.',
    },
    {
      filename: '07_2020-10-11_RustingSteel.flac',
      title: 'Rusting Steel',
      date: '2020-10-11',
      description: 'Made with a Novation Circuit.',
    },
    {
      filename: '08_2020-10-11_GhostJam.flac',
      title: 'Ghost Jam',
      date: '2020-10-11',
      description: 'Made with a Novation Circuit.',
    },
    {
      filename: '09_2020-10-24_SudokuBass.flac',
      title: 'Sudoku Bass',
      date: '2020-10-24',
      description: `
        Made with a Novation Circuit. Bassline is routed through Korg Monologue. 
        I started this one by solving a sudoku puzzle and using the numbers to
        pick notes. The fact that this is track 9 is not a coincidence.
      `,
    },
    {
      filename: '10_2020-10-25_Falling.flac',
      title: 'Falling',
      date: '2020-10-25',
      description: 'Made with a Novation Circuit.',
    },
    {
      filename: '11_2020-10-23_HelluvaTrainRide.flac',
      title: 'Helluva Train Ride',
      date: '2020-10-23',
      description: 'Here I was experimenting with the noise channel of a Roland System-1.',
    },
    {
      filename: '12_2020-10-11_TwelveToneHorror.flac',
      title: 'Twelve Tone Horror',
      date: '2020-10-11',
      description: `
        Made with Waveform Pro using various plugins. 
        I was trying out <a href="https://en.wikipedia.org/wiki/Twelve-tone_technique">12-tone composition</a>
        technique. This is also why this is track 12.
      `,
    },
    {
      filename: '13_2020-10-21_13MinutesOfSpooky.flac',
      title: '13 minutes of spooky',
      date: '2020-10-21',
      description: 'Made with a Roland System-1.',
    },
    {
      filename: '14_2020-10-23_SirensCalling.flac',
      title: 'Sirens Calling',
      date: '2020-10-23',
      description: 'Made with a Roland System-1.',
    },
  ],
}
