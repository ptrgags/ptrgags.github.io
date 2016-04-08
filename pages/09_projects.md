---
layout: page
title: GitHub Projects
permalink: /projects/
---

## My GitHub Projects

This is a list of my GitHub projects I would like to showcase. Each has an
article explaining each project and the motivation for creating it.

<!-- TODO: Add Thumbnails! -->

{% for project in site.projects %}
{% unless project.draft %}
* [{{project.title}}]({{ project.url | prepend: site.baseurl }}) - {{project.description}}
{% endunless %}
{% endfor %}
