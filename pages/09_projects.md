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

{% if project.thumbnail %}
![{{project.title}} Thumbnail]({{site.url}}/images/{{project.thumbnail}})
{% endif %}

[{{project.title}}]({{ project.url | prepend: site.baseurl }}) - {{project.description}}

---

{% endunless %}
{% endfor %}

**Note**: I am still writing articles about my GitHub projects! Check back soon
for more articles!
