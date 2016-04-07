---
layout: page
title: My GitHub Projects
permalink: /projects/
---
{% for project in site.projects %}
* [{{project.title}}]({{ project.url | prepend: site.baseurl }}) - {{project.description}}
{% endfor %}
