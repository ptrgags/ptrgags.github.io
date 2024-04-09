import { type ProjectDescriptor, update_url } from '@/core/Project'

export const blue_velvet_scarf: ProjectDescriptor = {
  id: 'blue-velvet-scarf',
  title: 'Knitting a Blue Velvet Scarf',
  years: '2023-2024',
  sort_key: '2024-02-00:02',
  alt_text: 'Photo of the completed scarf',
  img_format: 'jpg',
  description: `
        <p>
            This is the second scarf I've ever knit. This one used velvet
            yarn in two colors to make it extra soft. The blue yarn is
            a tiny bit thicker, which gives the scarf extra thickness.
        </p>
        <p>
            I kept the pattern simple so I could knit while watching a show
            or spending time with friends. The pattern is as follows:
        </p>
        <ul>
            <li>Row 0: Cast on 32 stitches in blue.</li>
            <li>Rows 1-10: Stockinette stitch. Start with blue and switch color every 5 stitches</li>
            <li>Rows 11-12: Stockinette stitch in blue only</li>
            <li>Repeat rows 1-12 until you reach the desired length. I did 25 repeats total</li>
        </ul>
        <p>
            The interesting zig-zag pattern happens for two reasons. First, 
            switching colors every 5 stitches (which does not divide evenly into the
            32 columns), this produces a stripe pattern. However, since knitting
            flat involves going back and forth, every other row is flipped
            horizontally.
        </p>
        `,
  show: true,
  updates: [
    {
      sort_key: '2023-12-18:01',
      date: '2023-12-18',
      title: 'Starting Out',
      thumbnail: {
        url: update_url('blue-velvet-scarf', '2023-12-18_StartingOut.jpg'),
        alt_text: 'Close-up photo of the start of the scarf after 3 pattern repeats',
      },
      description: 'I started the scarf. I did 3 repeats in the first sitting.',
    },
    {
      sort_key: '2023-12-29:01',
      date: '2023-12-29',
      title: '5/25 Pattern Repeats',
      thumbnail: {
        url: update_url('blue-velvet-scarf', '2023-12-29_AFewMoreRepeats.jpg'),
        alt_text: 'Photo of the scarf after 5 pattern repeats',
      },
      description: '',
    },
    {
      sort_key: '2024-01-07:01',
      date: '2024-01-07',
      title: '7/25 Pattern Repeats',
      thumbnail: {
        url: update_url('blue-velvet-scarf', '2024-01-07_ABitLonger.jpg'),
        alt_text: 'Photo of the scarf after 7 repeats',
      },
      description: '',
    },
    {
      sort_key: '2024-01-31:01',
      date: '2024-01-31',
      title: '19/25 Pattern Repeats',
      thumbnail: {
        url: update_url('blue-velvet-scarf', '2024-01-31_AlmostDone.jpg'),
        alt_text: 'Close-up photo of the scarf most of the way done',
        orientation: 'landscape',
      },
      description: '',
    },
    {
      sort_key: '2024-02-02:01',
      date: '2024-02-02',
      title: '23/25 Pattern Repeats',
      thumbnail: {
        url: update_url('blue-velvet-scarf', '2024-02-02_NearlyFinished.jpg'),
        alt_text: 'Photo of the scarf folded in half and laid across a couch',
        orientation: 'landscape',
      },
      description:
        'Nearly finished at 23/25 repeats. Here I folded the scarf in half and compared with another scarf I had made. The blue velvet scarf is a little shorter',
    },
  ],
}
