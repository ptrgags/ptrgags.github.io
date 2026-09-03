---
layout: project
id: 'stretchy-blocks'
title: 'Stretchy Blocks'
years: '2024'
sort_key: '2024-02-00:03'
img_format: 'png'
github_repo: 'stretchy-blocks'
demo_link: 'https://ptrgags.dev/stretchy-blocks'
---
<p>
    This project was a warm-up exercise to learn about <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API">WebGPU</a>.
    I made an animation of cubes that stretch and shrink. See the Demo
    link above for the animated version.
</p>
<p>
    The animation is done completely procedurally in the shader. I make use of
    GPU instancing so I only have to upload a single cube to the GPU. All the
    shapes, colors, animations and so on are done mathematically in the shader.
</p>
