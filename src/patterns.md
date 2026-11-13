---
layout: article
title: Patterns
---
<script setup lang="ts">
import {data} from './pattern/pattern.data'
import {backblaze_link} from './core/links'
import PatternCard from './components/PatternCard.vue'

const PATTERNS = {}
data.forEach(x => {
    if (x.frontmatter.hide === true) {
        return;
    }
    PATTERNS[x.url] = x
})
</script>

I'm starting to document math patterns I find in math, art, programming, and
other topics. So far, I've written the following articles:


<PatternCard :page="PATTERNS['/pattern/circular-arc/']" />
<PatternCard :page="PATTERNS['/pattern/gear-tree/']" />
<PatternCard :page="PATTERNS['/pattern/musical-meter/']" />
<!--<PatternCard :page="PATTERNS['/pattern/number-line-arcs/']" />-->
<!--<PatternCard :page="PATTERNS['/pattern/cyclic-group/']" />-->
<!--<PatternCard :page="PATTERNS['/pattern/dihedral-group/']" />-->
<!--<PatternCard :page="PATTERNS['/pattern/frieze-groups/']" />-->

---


See also my repo [`pattern-spotting`](https://ptrgags.github.io/pattern-spotting/), an earlier version of this idea.
