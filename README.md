# ptrgags.dev (2016-2020, 2024)

This is the third iteration of my GitHub website. The first two used Jekyll,
but this time I wanted to build it from scratch using Vue.js.

This iteration of my website aims to be a portfolio of my creative works.
Of course this includes programming, but I want to showcase other art and
music I do over time

## Release Notes

See the [Releases](https://github.com/ptrgags/ptrgags.github.io/releases)
page for documentation of what each version of this website added.

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
