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

### Release

I have a GitHub Action configured (see `.github/workflows/deploy.yml`) to
automatically deploy the website to GitHub pages whenever something is merged
into `main`. After merging a PR, double check that this happened successfully.
