import type { MusicAlbumDescriptor } from '@/core/MusicAlbum'

export const improvised_vol1: MusicAlbumDescriptor = {
  id: 'improvised-vol1',
  title: 'Improvised Volume 1',
  release_date: '2021-10-31',
  sort_key: '2021-10-31:01',
  description: `
    <p>
      This album was released alongside <a href="#/album/improvised-vol2">Improvised Volume 2</a>
      on Halloween 2021.
    </p>
    <p>
      In the lockdown years, making music was a big hobby. I fell pretty far down the 
      rabbit hole of buying hardware synthesizers and other music equipment.
      I wanted to get away from my computer, so I got a digital recorder and
      just recorded me improvising on keyboard.
    </p>
    <p>
      This first volume is a collection of the better improvisations I had
      recorded in the first half of 2021.
    </p>
  `,
  play_style: 'advance',
  tracks: [
    {
      filename: '01_2021-01-11_Introduction.flac',
      title: 'Introduction',
      date: '2021-01-11',
      description: `
        This was a test of recording from various instruments with a portable
        recording device.
      `,
    },
    {
      filename: '02_2021-01-13_Waaaah.flac',
      title: 'Waaaah',
      date: '2021-01-13',
      description: 'The title says it all.',
    },
    {
      filename: '03_2021-01-14_MultiOrgans.flac',
      title: 'MultiOrgans',
      date: '2021-01-14',
      description: `
        I recorded my Yamaha Reface YC organ several times with different
        settings.
      `,
    },
    {
      filename: '04_2021-01-18_WorkingInTheWind.flac',
      title: 'Working in the Wind',
      date: '2021-01-18',
      description: `
       These experiments with a noise generator sounded industrial in nature.
      `,
    },
    {
      filename: '05_2021-01-26_Stable.flac',
      title: 'Stable',
      date: '2021-01-26',
      description: 'A more stable sound than Unstable.',
    },
    {
      filename: '06_2021-01-26_Unstable.flac',
      title: 'Unstable',
      date: '2021-01-26',
      description: 'A more unstable sound than Stable.',
    },
    {
      filename: '07_2021-01-31_WithoutPower.flac',
      title: 'Without Power',
      date: '2021-01-31',
      description: `
        <p>
          It was a dark and stormy night. The power went out. Not to fear, this 
          organ has batteries!
        </p>
      `,
    },
    {
      filename: '08_2021-02-05_AndroidsCrying.flac',
      title: 'Androids Crying',
      date: '2021-02-05',
      description: "Pocket Operator PO-28 Robot doesn't just sing, it <em>laments</em>.",
    },
    {
      filename: '09_2021-03-24_Vincent.flac',
      title: 'Vincent',
      date: '2021-03-24',
      description: `
        My Roland System-1 is named "Vincent" because I once referred to the
        synth as "Green Synth" too fast in a call with a friend. My mumbling
        probably sounded like "grinsinth". My friend misheard this as
        "Vincent" and so that synth has been named that ever since.
      `,
    },
    {
      filename: '10_2021-03-25_VincentsLair.flac',
      title: "Vincent's Lair",
      date: '2021-03-25',
      description: 'I never said Vincent was the hero of the story...',
    },
    {
      filename: '11_2021-03-31_Jagged.flac',
      title: 'Jagged',
      date: '2021-03-31',
      description: "Careful, it's sharp!",
    },
    {
      filename: '12_2021-05-19_PitOfScience.flac',
      title: 'Pit of Science',
      date: '2021-05-19',
      description: 'Here I was experimenting with an Arturia MicroFreak.',
    },
    {
      filename: '13_2021-05-19_Rotunda.flac',
      title: 'Rotunda',
      date: '2021-05-19',
      description: 'Spacious.',
    },
    {
      filename: '14_2021-05-27_Precipice.flac',
      title: 'Precipice',
      date: '2021-05-27',
      description: `
        <p>A world on the brink of disaster. Sounds familiar...<p>
        <p>
          [EDIT 2024: Wow, looking back at these liner notes from 2021 and the
          moody tracks of this album, I see how much the pandemic and lockdown
          was affecting my mental health at the time 😢. In comparison, 
          my 2024 album <a href="#/album/loops">Loops</a> is a lot brighter
          and lively overall.]
        </p>
      `,
    },
  ],
}
