---
id: '2022-07-09_ElementaryCA'
title: 'Elementary Cellular Automaton'
date: '2022-07-09'
sort_key: '2022-07-09:01'
project_id: 'paper-toaster'
img_format: 'png'
timeline_desc: 'The classic cellular automaton, now in printable form'
---
<p>
    Looking for more pattern ideas to make on my receipt printer, I returned to the classic
    <a href="https://mathworld.wolfram.com/ElementaryCellularAutomaton.html">elementary cellular automaton</a>.
</p>
<p>
    The automaton is 1-dimensional, so the vertical direction (in this case from bottom to top) represents time.
    To compute a pixel in the next row, you examine a neighborhood of 3 pixels from the previous row. There
    are 8 possible combinations of 3 bits. The rule number (from 0 to 255) acts as a table of 8 bit flags that
    determines the result for the corresponding input pattern.
</p>
<p>
    Fun fact: Certain elementary CA patterns also serve as a simplified model of the patterns
    on sea snail shells. See <a href="https://en.wikipedia.org/wiki/Oliva_porphyria"><i>Olivia Porphyria</i></a>
    for example.
</p>
