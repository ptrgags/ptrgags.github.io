---
layout: project
title: Barter
permalink: /projects/barter/
description: A text-based game that deals with bartering
purpose: >
    As part of an independent study in high school, I decided that I wanted
    to make a simple text-based game. Now I am revisiting the project two years
    later to make it better.
status: demo
repo: barter
link: "http://ptrgags.github.io/barter"
languages:
    - JavaScript (Including ECMAScript 6 features)
    - Bootstrap
concepts:
    - Text Based Games
    - Graph Theory
accomplishments:
    - Working Tutorial story
    - Use a graph data structure to represent the story data
    - Refactored code to use ES6 Promises and classes.
    - Program to create Barter story JSON files
    - Tutorial + one short story
improvements:
    - Actually write a full game with this platform
    - UI Tweaks
    - Improve Barter Story Creator
thumbnail: "barter/logo.svg"
years: 2014, 2016
featured: true
---

### How Barter Works

Barter is a text-based adventure game platform that supports branching stories,
similar to *Choose Your Own Adventure* book. However, an additional feature is
that the game keeps track of items that the player obtains. These items can
be bartered for other items within the game. This is not mandatory, but it is
a suggested mechanic.

### Stories as Graphs

Barter represents its story as a directed graph. Each situation (a single
room description, event, dialog, etc.) represents a single vertex in the graph.
Each situation has one or more options the user can select. These options are
represented as directed edges between two situations in the graph.

Each option can also have up to two lists of items: the first is a list of items
the player will have to give up when selecting the action. the second is a list
of items the player will receive by selecting the action. If both lists are
specified, it is a "barter".

### Barter Story Creator

The most recent version of Barter has a Story Creator program, written
in Ruby. The program makes it much easier to write the story JSON file.

For usage, see the [Story Creator README](https://github.com/ptrgags/barter/blob/master/creator/README.md)
