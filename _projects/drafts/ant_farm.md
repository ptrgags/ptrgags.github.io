---
layout: project
title: Ant Farm
permalink: /projects/ant_farm/
description: Langton's Ant Simulator
purpose: >
    I made this as a nerdy holiday present for friends. At the time, I was
    learning about Langton's Ant and wanted to make a simulator for it.
    ...
status: demo
link: "http://ptrgags.github.io/ant-farm"
languages:
    - JavaScript?
libraries: []
concepts:
    - Langton's Ant
draft: true
---
# Langton's Ant

<!-- TODO: Add image! -->

Langton's ant is a theoretical ant that follows simple rules, yet exhibits
complex behavior over time.

# Rules

Langton's ant is a small ant on a grid of black and white cells. The ant
follows two simple rules:

* When the ant encounters a white cell, color the cell black, turn to the
  right 90° and move to the next cell
* When the ant encounters a black cell, color the cell white, turn to the
  left 90° and move the next cell

# Chaos and order

* In the first few steps, the ant makes a roughly symmetric pattern
* Before long, the ant starts moving around the grid in a chaotic manner.
* After several thousand steps of chaos, the ant starts producing a clear
  pattern known as a "highway"

<!-- TODO: Insert Screenshots here! -->

# Turmites

What would happen if there were more than two colors? What if the ant's rules
were different?

<!-- TODO: Add link to Turmites Wikipedia page! -->

These questions have been explored in various ways, and have been given
the name "turmites" since any of these ant variants are essentially Turing
machines.

## Ant Farm Turmites

Ant Farm implements various types of turmites and allows users to customize
their own. Here is a screenshot of a few of them:

<!-- TODO: Add screenshot of various Ant Farm turmites -->

# Custom Ants

<!-- TODO: Write this section -->
