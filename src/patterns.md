---
layout: article
title: Patterns
---
<script setup lang="ts">
import {data} from './pattern/pattern.data'
import {backblaze_link} from './core/links'
import PatternSwatch from './components/PatternSwatch.vue'

const PATTERNS = {}
data.forEach(x => {
    if (x.frontmatter.hide === true) {
        return;
    }
    PATTERNS[x.url] = x
})
</script>

## Building Blocks

These building blocks are used in the patterns that follow

<PatternSwatch :page="PATTERNS['/pattern/circle/']" />
<PatternSwatch :page="PATTERNS['/pattern/circular-arc/']" />

## Patterns



<PatternSwatch :page="PATTERNS['/pattern/gear-tree/']" />
<PatternSwatch :page="PATTERNS['/pattern/musical-meter/']" />
<!--<PatternCard :page="PATTERNS['/pattern/number-line-arcs/']" />-->
<!--<PatternCard :page="PATTERNS['/pattern/cyclic-group/']" />-->
<!--<PatternCard :page="PATTERNS['/pattern/dihedral-group/']" />-->
<!--<PatternCard :page="PATTERNS['/pattern/frieze-groups/']" />-->

---


See also my repo [`pattern-spotting`](https://ptrgags.github.io/pattern-spotting/), an earlier version of this idea.
