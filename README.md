# ptrgags.dev (2016-2020, 2024)

This is the fourth iteration of my GitHub website. The first two used Jekyll,
the third used Vue, this one uses Vitepress.

This iteration of my website aims to be a portfolio of my creative works.
Of course this includes programming, but I want to showcase other art and
music I do over time

## Project Setup

### Install Dependencies

```sh
npm install
```

### Run Development Server

```sh
npm run dev
```

### Testing Atom Feed

This site has an Atom 1.0 feed for my blog. However, it only works in build mode! Here's how I test it:

- Make changes to the content/feed generation
- Run `npm run build` to build the website. This will run the feed generation code automatically.
- Run `npm run preview` to host the website at `localhost:4173`
- In my feed reader, add the blog with the URL `http://127.0.0.1:4173/feed.xml`. Do NOT use `localhost`, at least in one feed reader I've tried, that isn't allowed for some reason.
- Refresh the feed in the reader and make sure posts show up as intended.

### Release

I have a GitHub Action configured (see `.github/workflows/deploy.yml`) to
automatically deploy the website to GitHub pages whenever something is merged
into `main`. After merging a PR, double check that this happened successfully.
