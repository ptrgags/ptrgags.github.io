---
layout: page
title: GitHub Projects
permalink: /projects/
---

{% for project in site.projects %}
{% unless project.draft %}
* [{{project.title}}]({{ project.url | prepend: site.baseurl }}) - {{project.description}}
{% endunless %}
{% endfor %}
