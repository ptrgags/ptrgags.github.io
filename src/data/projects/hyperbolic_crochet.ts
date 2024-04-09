import { type ProjectDescriptor, update_url } from '@/core/Project'

export const hyperbolic_crochet: ProjectDescriptor = {
  id: 'hyperbolic-crochet',
  title: 'Making of Hyperbolic Crochet',
  years: '2021-2023',
  sort_key: '2023-07-00:01',
  alt_text: 'Photo of completed crochet pattern',
  img_format: 'jpg',
  description: `
        <p>
            This crocheting project was inspired by the TED talk <a href="https://youtu.be/w1TBZhd-sN0?si=XsH01B6DCeU8LoqT">"Crocheting Hyperbolic Planes"</a>
            by Daina Taimiņa. Hyperbolic crocheting is pretty simple, you just
            keep doing increases and the fabric will naturally curl up into
            organic-looking patterns. The video mentions using a slow growth
            rate such as 11/10. However, I used a much faster growth rate of
            2.
        </p>
        <p>
            I kept my pattern very simple, essentially the same stitch over
            and over. It was nice as a way to keep my hands busy when watching
            or listening to something.
        </p>
        <ul>
            <li>Row 0: Chain 10</li>
            <li>Row 1, 2, ..., N-2: inc in every stitch</li>
            <li>Row N-2: dc in every stitch.</li>
            <li>Row N-1: sc in  different color</li>
        </ul>
        <p>
            I worked on this project off and on over the span of a little over
            2 years. Some months I would work on it often, other times I
            wouldn't work on it at all.
        </p>
    `,
  show: true,
  updates: [
    {
      sort_key: '2021-07-26',
      date: '2021-07-26',
      title: 'Starting Out',
      description:
        'A picture after my first crocheting session. Here you can see the spool of crochet thread. My intent was to go through the entire spool.',
      thumbnail: {
        url: update_url('hyperbolic-crochet', '2021-07-26_Update1.jpg'),
        alt_text: 'Picture of a spool of crochet thread and the first couple rows of stitches',
      },
    },
    {
      sort_key: '2021-08-12',
      date: '2021-08-12',
      title: 'Update 2',
      description: '',
      thumbnail: {
        url: update_url('hyperbolic-crochet', '2021-08-12_Update2.jpg'),
        alt_text: '',
      },
    },
    {
      sort_key: '2021-10-25',
      date: '2021-10-25',
      title: 'Update 3',
      description: '',
      thumbnail: {
        url: update_url('hyperbolic-crochet', '2021-10-25_Update3.jpg'),
        alt_text: '',
      },
    },
    {
      sort_key: '2022-07-27',
      date: '2022-07-27',
      title: 'Update 4',
      description:
        'I put the project aside at the end of 2021, and only returned to it the next summer.',
      thumbnail: {
        url: update_url('hyperbolic-crochet', '2022-07-27_Update4.jpg'),
        alt_text: '',
      },
    },
    {
      sort_key: '2023-01-25',
      date: '2023-01-25',
      title: 'Update 5',
      description:
        'Again, I put the project aside, and only picked it up again in early 2023. This time, I was more serious about seeing the project to completion, though it still would take months.',
      thumbnail: {
        url: update_url('hyperbolic-crochet', '2023-01-25_Update5.jpg'),
        alt_text: '',
      },
    },
    {
      sort_key: '2023-07-23',
      date: '2023-07-23',
      title: 'Update 6',
      description: '',
      thumbnail: {
        url: update_url('hyperbolic-crochet', '2023-07-23_Update6.jpg'),
        alt_text: '',
      },
    },
    {
      sort_key: '2023-08-01',
      date: '2023-08-01',
      title: 'End of Spool',
      description: 'This was the last picture I have before reaching the end of the spool.',
      thumbnail: {
        url: update_url('hyperbolic-crochet', '2023-08-01_Update7.jpg'),
        alt_text: '',
      },
    },
    {
      sort_key: '2023-08-17',
      date: '2023-08-17',
      title: 'Spool Change',
      description: 'I got a second spool of thread to finish the last couple rows of stitches.',
      thumbnail: {
        url: update_url('hyperbolic-crochet', '2023-08-17_Update8.jpg'),
        alt_text: '',
      },
    },
    {
      sort_key: '2023-08-19',
      date: '2023-08-19',
      title: 'Last Blue Stitch',
      description:
        'This picture shows me stitching the last double crochet stitch in blue before I switched to orange.',
      thumbnail: {
        url: update_url('hyperbolic-crochet', '2023-08-19_Update9.jpg'),
        alt_text: '',
      },
    },
    {
      sort_key: '2023-08-23',
      date: '2023-08-23',
      title: 'Update 10',
      description:
        'Here I am mid-way through the last row of orange stitches. Interestingly, though the orange section is only one stitch thick, it mostly obscures the blue stitches underneath. This is similar to how the grey matter of the brain covers the white matter underneath, despite there being much more white matter by volume.',
      thumbnail: {
        url: update_url('hyperbolic-crochet', '2023-08-23_Update10.jpg'),
        alt_text: '',
      },
    },
  ],
}
