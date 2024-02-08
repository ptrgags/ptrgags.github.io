import { type ProjectDescriptor, Project } from "@/core/Project"

const PROJECT_DESCRIPTORS: ProjectDescriptor[] = [
    {
        id: "paper-toaster",
        title: "Paper Toaster",
        years: "2022-2024",
        sort_key: "2024-01-00:01",
        github_repo: "paper-toaster",
        has_thumbnail: true,
        has_card: true,
        alt_text: "Example pattern generated by paper-toaster's hitomezashi option",
        description: `
            <p>Generative art for thermal printers</p>
            <p>A long time ago I saw someone on Twitter make generative art</p>
        `,
        show: true,
        updates: [
            {
                sort_key: "2022-06-15:01",
                date: "2022-06-15",
                title: "Start of Project",
                description: "I started making a sketchbook format and made a few simple patterns as a warm-up.",
            }
        ]
    },
]
/*
    
    {
        id: 'ptrgags.github.io',
        title: "This Website",
        years: '2015-2017, 2024',
        sort_key: "2024-02-00:01",
        github_repo: "ptrgags.github.io",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    {
        id: "p5-sketchbook",
        title: "p5.js Sketchbook",
        years: "2016, 2021, 2024",
        sort_key: "2024-01-00:02",
        github_repo: "p5-sketchbook",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    {
        id:"holiday-shaders2",
        title: "Holiday Shaders 2",
        years: "2017",
        sort_key: "2017-12-00:01",
        github_repo: "holiday-shaders2",
        demo_link: "https://holiday2.shaders.dev",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    {
        id: "holiday-shaders",
        title: "Holiday Shaders",
        years: "2016",
        sort_key: "2016-12-00:01",
        github_repo: "holiday-shaders",
        demo_link: "https://holiday.shaders.dev",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
    {
        id: "symmetry-sketchbook",
        title: "Symmetry Sketchbook",
        years: "2020",
        sort_key: "2020-05-00:01",
        github_repo: "symmetry-sketchbook",
        has_thumbnail: false,
        has_card: false,
        show: true,
    },
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
    {
        id: 'stretchy-blocks',
        title: "Stretchy Blocks",
        years: "2024",
        sort_key: "2024-01-00:03",
        github_repo: "stretchy-blocks",
        has_thumbnail: false,
        has_card: false,
        show: false,
    },
    {
        id: 'eloquent',
        title: "Eloquent",
        years: "2023-2024",
        sort_key: "2024-02-00:01",
        // description: "A tool for the indecisive. Eloquent lets you compare and rank a list of ideas."
        github_repo: "eloquent",
        demo_link: "https://ptrgags.dev/eloquent",
        has_thumbnail: true,
        has_card: true,
        show: true,
    }
]
*/

export const PROJECTS = PROJECT_DESCRIPTORS.map(x => new Project(x))

export const PROJECTS_NEWEST_FIRST = PROJECTS.filter(x => x.show).sort(
    (a: Project, b: Project) => b.sort_key.localeCompare(a.sort_key)
)

export const PROJECTS_NEWEST_5 = PROJECTS_NEWEST_FIRST.slice(0, 5)