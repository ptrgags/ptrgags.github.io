import { type ProjectDescriptor, Project } from '@/core/Project'
import { hyperbolic_crochet } from './projects/hyperbolic_crochet'
import { symmetry_sketchbook } from './projects/symmetry_sketchbook'
import { blue_velvet_scarf } from './projects/blue_velvet_scarf'
import { p5_sketchbook } from './projects/p5_sketchbook'
import { math_notebook } from './projects/math_notebook'
import { next_1000_cards } from './projects/next_1000_cards'
import { holiday_shaders } from './projects/holiday_shaders'
import { holiday_shaders2 } from './projects/holiday_shaders2'
import { raster_tangles } from './projects/raster_tangles'
import { webgpu_sketchbook } from './projects/webgpu_sketchbook.ts'

const PROJECT_DESCRIPTORS: ProjectDescriptor[] = [
  blue_velvet_scarf,
  symmetry_sketchbook,
  hyperbolic_crochet,
  p5_sketchbook,
  webgpu_sketchbook,
  math_notebook,
  next_1000_cards,
  holiday_shaders,
  holiday_shaders2,
  raster_tangles,
]

/*
    {
        id: "virtual-museum",
        title: "Virtual Museum",
        years: "2019",
        sort_key: "2019-08-00:01",
        github_repo: "virtual-musum",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    {
        id: "affine-font-indeed",
        title: "Affine Font Indeed",
        years: "2018",
        sort_key: "2018-08-00:01",
        github_repo: "affine-font-indeed",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    {
        id: "drawing-machines",
        title: "Drawing Machines",
        years: "2019",
        sort_key: "2019-10-00:01",
        github_repo: "drawing-machines",
        demo_link: "https://ptrgags.dev/drawing-machines/",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    {
        id: "holiday-eyecandy",
        title: "Holiday Eyecandy",
        years: "2018",
        sort_key: "2018-12-00:01",
        github_repo: "holiday-eyecandy",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    {
        id: 'ant-farm',
        title: "Ant Farm",
        years: "2015",
        sort_key: "2015-12-00:01",
        github_repo: "ant-farm",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    {
        id: 'barter',
        title: "Barter",
        years: "2014, 2016",
        sort_key: "2016-09-00:01",
        github_repo: "barter",
        demo_link: "https://ptrgags.dev/barter/",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    {
        id: "spin-o-sketch",
        title: "Spin-o-Sketch",
        years: "2014",
        sort_key: "2014-11-00:01",
        demo_link: "https://ptrgags.dev/spin-o-sketch/",
        github_repo: "spin-o-sketch",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    
]
*/

export const PROJECTS = PROJECT_DESCRIPTORS.map((x) => new Project(x))
