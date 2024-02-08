import { BACKBLAZE_BUCKET } from "@/core/website_constants"
import type { TimelineEntry } from "./TimelineEntry"

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
    // HTML description of the project
    description: string
    // GitHub repo name. If present, a link to GitHub will be added on the 
    // project page. For programming projects, this must match the ID.
    github_repo?: string
    // If the project has a demo link, put it here
    demo_link?: string
    // Alt text for the images
    alt_text: string
    // Additional updates to add to the timeline that aren't Artworks.
    updates?: TimelineEntry[]
    // If the project should be visible in the list. This is useful
    // if I'm still working on something
    show: boolean
    // Image format. 
    img_format: "png" | "jpg"
}

export class Project {
    id: string
    sort_key: string
    show: boolean
    title: string
    years: string
    github_url?: string
    demo_url?: string
    alt_text: string
    description: string
    img_format: "png" | "jpg"
    updates: TimelineEntry[]

    constructor(descriptor: ProjectDescriptor) {
        this.id = descriptor.id
        this.sort_key = descriptor.sort_key
        this.show = descriptor.show
        this.title = descriptor.title
        this.years = descriptor.years
        this.demo_url = descriptor.demo_link
        this.alt_text = descriptor.alt_text
        this.description = descriptor.description
        this.updates = descriptor.updates ?? []
        this.img_format = descriptor.img_format

        this.github_url = descriptor.github_repo ? `https://github.com/ptrgags/${descriptor.github_repo}` : undefined

    }

    get project_url(): string {
        return `/project/${this.id}`
    }

    get thumbnail_url(): string {
        return `${BACKBLAZE_BUCKET}/project-thumbnails/${this.id}.${this.img_format}`
    }

    get card_url(): string {
        return `${BACKBLAZE_BUCKET}/project-cards/${this.id}.${this.img_format}`
    }
}