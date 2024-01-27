export interface Project {
    // Human-readable title for the project
    title: string
    // Years the project was active, as I wish it to appear on my website
    // in human-readable form
    years: string
    // Sort key, in the format YYYY-MM:NN
    // where YYYY-MM is the month the project was most recently updated, and
    // NNN is a 0-padded number to uniquely identify the project (if multiple
    // were updated in the same month)
    sort_key: string
    // GitHub repo name
    github_repo_name: string
    // If the project has a demo link, put it here
    demo_link?: string
    // If the project should be visible in the list. This is useful
    // if I'm still working on something
    show: boolean
}

export const PROJECTS: Project[] = [
    {
        title: "Paper Toaster",
        years: "2022-2024",
        sort_key: "2024-01:01",
        github_repo_name: "paper-toaster",
        show: true
    },
    {
        title: "p5.js Sketchbook",
        years: "2016, 2021, 2024",
        sort_key: "2024-01:02",
        github_repo_name: "p5-sketchbook",
        show: true,
    },
    {
        title: "Holiday Shaders 2",
        years: "2017",
        sort_key: "2017-12:01",
        github_repo_name: "holiday-shaders2",
        demo_link: "https://holiday2.shaders.dev",
        show: true,
    },
    {
        title: "Holiday Shaders",
        years: "2016",
        sort_key: "2016-12:01",
        github_repo_name: "holiday-shaders2",
        demo_link: "https://holiday.shaders.dev",
        show: true,
    },
    {
        title: "Symmetry Sketchbook",
        years: "2020",
        sort_key: "2020-05:01",
        github_repo_name: "symmetry-sketchbook",
        show: true,
    },
    {
        title: "Virtual Museum",
        years: "2019",
        sort_key: "2019-08:01",
        github_repo_name: "virtual-musum",
        show: true,
    },
    {
        title: "Affine Font Indeed",
        years: "2018",
        sort_key: "2018-08:01",
        github_repo_name: "affine-font-indeed",
        show: true,
    },
    {
        title: "Drawing Machines",
        years: "2019",
        sort_key: "2019-10:01",
        github_repo_name: "drawing-machines",
        demo_link: "https://ptrgags.dev/drawing-machines/",
        show: true,
    },
    {
        title: "Holiday Eyecandy",
        years: "2018",
        sort_key: "2018-12:01",
        github_repo_name: "holiday-eyecandy",
        show: true,
    },
    {
        title: "Ant Farm",
        years: "2015",
        sort_key: "2015-12:01",
        github_repo_name: "ant-farm",
        show: true,
    },
    {
        title: "Barter",
        years: "2014, 2016",
        sort_key: "2016-09:01",
        github_repo_name: "ant-farm",
        show: true,
    },
    {
        title: "Spin-o-Sketch",
        years: "2014",
        sort_key: "2014-11:01",
        demo_link: "https://ptrgags.dev/spin-o-sketch/",
        github_repo_name: "spin-o-sketch",
        show: true,
    },
    {
        title: "Stretchy Blocks",
        years: "2024",
        sort_key: "2024-01:03",
        github_repo_name: "stretchy-blocks",
        show: false,
    },
    {
        title: "Eloquent",
        years: "2024",
        sort_key: "2024-01:04",
        github_repo_name: "eloquent",
        show: false,
    }
]

export const PROJECTS_NEWEST_FIRST = [...PROJECTS].sort(
    (a: Project, b: Project) => b.sort_key.localeCompare(a.sort_key)
)