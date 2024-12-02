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

After merging all PRs with content update into `main`, I follow these steps
to publish to `gh-pages`. I use a second copy of the repo cloned elsewhere.

For the example below, the main repo is `/path/to/website`, and the
`gh-pages` version is `/path/to/website-publish`.

```sh
# This makes a build in the dist/ subdirectory
cd /path/to/website/
npm run build

# remove the old build files and add the new ones
cd /path/to/website-publish/
rm -r *
cp -r /path/to/website/dist/* .

# Using a static file server (such as http-server), host the publish directory
# and double check that everything looks right.

# Finally, check in the changes to gh-pages and push to GH
```
