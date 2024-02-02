import {BACKBLAZE_BUCKET} from "@/core/website_constants"

export interface ProjectDescriptor {
    // Unique ID for this project.
    id: string,
    // Human-readable title for the project
    title: string
    // Years the project was active, as I wish it to appear on my website
    // in human-readable form
    years: string
    // Sort key, in the format YYYY-MM-00:NN
    // where YYYY-MM is the month the project was most recently updated, and
    // NNN is a 0-padded number to uniquely identify the project (if multiple
    // were updated in the same month)
    sort_key: string
    // GitHub repo name. If present, a link to GitHub will be added on the 
    // project page. For programming projects, this must match the ID.
    github_repo?: string
    // If the project has a demo link, put it here
    demo_link?: string
    // If true, there will be a thumbnail in Backblaze in the folder
    // project-thumbnails/<id>.png
    has_thumbnail: boolean
    // If true, there will be a larger image in Backblaze
    // project-cards/<id>.png
    has_card: boolean
    // Alt text for the images
    alt_text?: string
    // If the project should be visible in the list. This is useful
    // if I'm still working on something
    show: boolean
}

export class Project {
    id: string
    sort_key: string
    show: boolean
    title: string
    years: string
    github_url?: string
    demo_url?: string
    card_url?: string
    thumbnail_url?: string
    alt_text: string

    constructor(descriptor: ProjectDescriptor) {
        this.id = descriptor.id
        this.sort_key = descriptor.sort_key
        this.show = descriptor.show
        this.title = descriptor.title
        this.years = descriptor.years
        this.demo_url = descriptor.demo_link
        this.alt_text = descriptor.alt_text ?? "TODO: Write alt text"

        this.github_url = descriptor.github_repo ? `https://github.com/ptrgags/${descriptor.github_repo}` : undefined
        this.thumbnail_url = descriptor.has_thumbnail ? `${BACKBLAZE_BUCKET}/project-thumbnails/${this.id}.png` : undefined
        this.card_url = descriptor.has_card ? `${BACKBLAZE_BUCKET}/project-cards/${this.id}.png` : undefined
    }

    get project_url() {
        return `/project/${this.id}`
    }
}