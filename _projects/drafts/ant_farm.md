---
layout: project
title: Ant Farm
permalink: /projects/ant_farm/
description: Langton's Ant Simulator
#TODO: Long descrption vs short description
purpose: >
    I made this as a nerdy holiday present for friends. At the time, I was
    learning about Langton's Ant and wanted to make a simulator for it.
status: demo
link: "http://ptrgags.github.io/ant-farm"
repo: ant-farm
languages:
    - CoffeeScript
    - p5.js
    - Bootstrap
concepts:
    - Langton's Ant
thumbnail: "ant-farm/ant-highway.png"
draft: false
years: 2015
---
## Langton's Ant

Langton's ant is a theoretical ant that follows simple rules, yet exhibits
complex behavior over time.

## Rules

Langton's ant is a small ant on a grid of black and white cells. The ant
follows two simple rules:

* When the ant encounters a white cell, color the cell black, turn to the
  right 90° and move to the next cell
* When the ant encounters a black cell, color the cell white, turn to the
  left 90° and move the next cell

## Chaos and order

* In the first few steps, the ant makes a roughly symmetric pattern

![Simple]({{site.url}}/images/ant-farm/ant-simple.png)

* Before long, the ant starts moving around the grid in a chaotic manner.

![Chaos]({{site.url}}/images/ant-farm/ant-chaotic.png)

* After several thousand steps of chaos, the ant starts producing a clear
  pattern known as a "highway"

![Highway]({{site.url}}/images/ant-farm/ant-highway.png)

## Turmites

What would happen if there were more than two colors? What if the ant's rules
were different?

<!-- TODO: Add link to Turmites Wikipedia page! -->

These questions have been explored in various ways, and have been given
the name "turmites" since any of these ant variants are essentially Turing
machines.

## Ant Farm Turmites

Ant Farm implements various types of turmites and allows users to customize
their own. Here is a screenshot of a few of them:

![Turmites]({{site.url}}/images/ant-farm/ants-other.png)


## Custom Ants

<!-- TODO: Write this section -->
