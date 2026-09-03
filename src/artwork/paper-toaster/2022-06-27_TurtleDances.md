---
layout: artwork
id: '2022-06-27_TurtleDances'
title: 'Turtle Dances'
date: '2022-06-27'
sort_key: '2022-06-27:01'
project_id: 'paper-toaster'
img_format: 'png'
timeline_desc: >
    Artwork inspired by a Bridges math art paper about turtle graphics. It modifies an integer sequence to compute turn angles
---
This artwork was inspired by the <a href="https://www.bridgesmathart.org/">Bridges</a> math art paper
<a href="https://archive.bridgesmathart.org/2017/bridges2017-139.pdf">"Let the Numbers Do the Walking: Generating Turtle Dances on the Plane from Integer Sequences"</a>
by Adam Colestock. It uses <a href="https://en.wikipedia.org/wiki/Turtle_graphics">turtle graphics</a>
to generate patterns.

The paper talks about taking an integer sequence, modifying it, 
and using it to determine how much the turtle should turn after
each step. The sequence is modified by taking the sequence
dividing it by two different divisors, and subtracting the
remainders. The complexity of the pattern depends on the choice
of divisors as well as the angular step size when the turtle
turns.

The original paper only used the natural numbers, but I also
included some other sequences (square, triangle and Fibonacci
numbers)

As a bonus, here are some Desmos graphs exploring the math of
these patterns:

<ul>
    <li><a href="https://www.desmos.com/calculator/uvvgysw7xt">Visualization of the modified integer sequences</a></li>
    <li><a href="https://www.desmos.com/calculator/wcmvohdoxt">It looks cooler in polar coordinates</a></li>
</ul>
