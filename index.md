---
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

{% assign repos = site.github.public_repositories %}
{% assign repo = repos | where: "name", "drawing-machines" %}
{% for r in repo %}
{{r.name}}
{% endfor %}
