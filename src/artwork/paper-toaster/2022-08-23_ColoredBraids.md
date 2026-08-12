---
id: '2022-08-23_ColoredBraids',
title: 'Colored Braids',
date: '2022-08-23',
sort_key: '2022-08-23:01',
project_id: 'paper-toaster',
timeline_desc: 'Braids, now in technicolor!',
img_format: 'png',
---
<p>
    After I had made the earlier artwork <a href="#/artwork/paper-toaster/2022-07-24_Braids">Braids</a>,
    a friend told me that it would look nice in color for fabric. So I
    made a different script to allow specifying a color palette and
    other improvements. This one isn't designed for the receipt printer,
    as it will print it in grayscale.
</p>
<p>
    One difference is where Braids just randomly placed tiles, this
    one actually tracks the path of each strand. Essentially I
    take a list of strands and do an odd-even shuffle row by row. After
    each iteration, I record the new state of the strands. This informs
    where to put the crossings and what colors to make them.
</p>
<p>
    This particular example used the grouping option to ensure the
    braids happen in groups of 2 and 3.
</p>
