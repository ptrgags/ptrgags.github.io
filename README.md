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

After merging all PRs with content update into `main`, follow these steps
to publish to `gh-pages`.

```sh
npm run build

# Check in dist/

# careful! This updates the gh-pages branch in GitHub!
npm run deploy
```
