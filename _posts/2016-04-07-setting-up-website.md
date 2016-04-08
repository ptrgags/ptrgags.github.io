---
layout: post
title:  Setting Up Jekyll
categories: posts
tags:
- changes
---

It is now day two of setting up this Jekyll site. So far so good.

While a nested navbar would be nice, I really need Bootstrap in order
for it to work. I'll be handling that soon.

In the meantime, I made a collection of articles, one for each GitHub project
I want to showcase. The next step is to write said articles about each of my
projects and why I decided to make them.

I don't see any table styles in the SCSS for Jekyll's default theme. Let's
try a Markdown table:

| x | y |
|---|---|
| 0 | 0 |
| 1 | 1 |
| 2 | 4 |

Gah that looks so ugly without formatting. All the more reason to add Bootstrap.

**EDIT**: Editing the SCSS helped. Not perfect, but it's sufficient for now.

What about code?

```python
print [x for x in xrange(3)]
```

Yay! At least that works out-of-the-box, I'll be needing code blocks
frequently.

## Change List:

* Added projects collection
* Learn about kramdown
* Allow project pages to have a 'draft' setting
