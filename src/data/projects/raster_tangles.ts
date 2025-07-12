import { update_url, type ProjectDescriptor } from '@/core/Project'

export const raster_tangles: ProjectDescriptor = {
  id: 'raster-tangles',
  title: 'Raster Tangles',
  years: '2022, 2024-2025',
  sort_key: '2025-07-12:00',
  description: `
    <p>DESCRIPTION</p>
  `,
  github_repo: 'raster-tangles',
  img_format: 'png',
  updates: [
    {
      title: 'Explainer',
      date: '2025-06-30',
      image: {
        url: update_url('explainer', '2025-06-30_Explainer.png'),
      },
      description: `
        <p>
            I made documentation for how the algorithm works, complete with
            plenty of illustrations. You can find it in the
            <a href="https://github.com/ptrgags/raster-tangles/blob/main/raster-tangles.md">Raster Tangles Guide</a>
            in the GitHub repo
        </p>
      `,
      sort_key: '2025-06-30:01',
    },
  ],
}
