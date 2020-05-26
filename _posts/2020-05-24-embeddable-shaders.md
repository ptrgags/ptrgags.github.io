---
layout: post
title: Embeddable Shaders
date: 2020-05-24 11:40:00 -0400
categories: update programming graphics
brief: >-
    I found a way to embed shaders in my website using web components, p5.js,
    and a trick I discovered with GitHubPages.
---

### Inspiration

[ShaderToy](https://www.shadertoy.com/) is a neat sandbox for computer graphics work; There you can experiment with GLSL fragment shaders and learn from the pros in the industry.

It's a great site, but there are a few details I find a bit limiting for my personal projects:

1. Though there are some neat textures available, you can't upload your own texture.
2. You can't modify the vertex shader. Sometimes I want to morph the geometry.
3. I like the simple `mainImage()` entry point, but it means that you can't drop shader code into another program easily.
4. I don't like that the gallery pages often crash WebGL by trying to run too many expensive demoscenes on one page. If I'm going to showcase my art, I'd rather have static screenshots and only run the shader on a feature page.

So I decided to make something to address these issues.

### A Web Components experiment

If I were to write a new p5.js sketch for every shader I wanted to write, I'd be writing a ton of boilerplate code. Instead of that, I wanted to try making a Web Component that handles the boilerplate. It handles setting up a p5.js sketch, and draws a single quad that fills the canvas. It'll provide a few key uniforms for now (mainly a `time` variable), but I may add more as the need arises.

This technically does support vertex shaders, though the quad is rendered with only four vertices, so it's probably not helpful. I'll probably change this in the future.

If this works out well, I will probably make a 3D version for rendering an OBJ file with a custom shader. I'll have to put some thought into what sort of camera I'd want though, as this could easily open a can of worms of interactivity.

### GitHub Pages Loophole?

These day's it's a bit cumbersome to store content on multiple servers. Due to the browser's strict cross-origin policy, most requests are blocked unless CORS is enabled on the server.

However, on GitHub pages, all of one's projects are hosted under _one domain_. E.g. my website is hosted at `ptrgags.github.io` and my projects are at `ptrgags.github.io/project-name`. So even though conceptually, these are separate code repositories, as far as the browser is concerned, it's really all one big website. So there should be no problem referencing files from a different repo.

In the future, this might be helpful since I want to include many images of my art. If I run into the 1GB storage limit, I can try moving images to a different repo.

### How this will work

This website (`ptrgags.github.io`) will import files from `ptrgags.github.io/the-bricks/*.js` (web components). It feels like a hacky way to manage dependencies, but I think it'll be fun to try anyway.

### Demo

If I set up everything correctly in GitHub, you should see an animated shader show up below:

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js"></script>  
<div class="center">
    <bricks-shader-quad id="smoke-test"></bricks-shader-quad>
    <script type="module" src="/scripts/posts/2020-05-25-embeddable-shaders.js"></script>
</div>
