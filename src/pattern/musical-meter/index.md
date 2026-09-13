---
layout: article
title: Musical Meter
date: '2026-09-07'
patterns_lurking: true
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './musical-meter'
</script>

<SketchP5 :sketch="SKETCHES.showcase" />

In music, we measure time by counting in repeating patterns. Often
this is as simple as counting to 4 over and over ("ONE-2-3-4, TWO-2-3-4, …"). Other times, the pattern
changes mid-song. Let's explore the math of these patterns. We'll start
with the basics and build up to more intricate examples like the one
you see above.

## Steady Pulse

We begin by establishing a common timeline for measuring elapsed time. Start
with a sequence of evenly-spaced **pulses**. We will number them 0, 1, 2, …
as in the animation below. This gives us a way to uniquely identify points in time.

<SketchP5 :sketch="SKETCHES.pulse" />
<br />

:::details Note on terminology
You could refer to the pulses as beats. For example, tempo is described in
"beats per minute" (BPM). However, we will also use the word "beats" another
way in sections below. To avoid confusion, I will use "pulses" when I'm 
referring to this steady sequence of pulses.
:::

:::details ❓ Curiosity: What if the pulses are not equally spaced?
In practice, pulses are not always spaced evenly like this! Some examples:

- A song may change tempo for some sections. This means the pulses speed up (get closer together) or slow down (spread further apart)
- Some styles of music involve swing. Some pulses are longer and others are shorter in alternating fashion. This gives the music more bounce.

```
straight: x-x-x-x-x-x-x-x-
   swing: x--xx--xx--xx--x
```

These variations can be achieved by adjusting the playback speed of the song
while it's playing. 

Further details are beyond the scope of this article. For simplicity, this
document assumes a constant tempo for the whole song.
:::

## Measures

Counting pulses may be mathematically useful, but also unwieldy. Imagine
trying to count out loud "1283, 1284, 1285, 1286, …," that would be ridiculous! 
Instead, we group pulses into larger groups called **measures**, divided into 
smaller units called **beats**. The
first beat in a measure is emphasized, e.g. by making it louder than the other beats. This
makes this grouping a **meter**, not just a pulse.

The most common grouping is **common time**, where one measure is 4 beats long
as in the following diagram. Here, one beat equals one pulse.

<SketchP5 :sketch="SKETCHES.common_time" />

If you were to count this out loud, you would say "ONE-2-3-4, TWO-2-3-4, THREE-2-3-4", and so on.

This is only one possible meter. Others may have more or less beats, and
each beat may be longer or shorter than a pulse. We'll see more examples
in later sections.

## Note Durations

The duration of musical notes are described relative to common time, even in
other meters! A beat in common time is also called a "quarter note", because it is a quarter
of a measure. Other durations like half notes or eighth notes are similar.
The following table gives an overview of the pattern:

| Note Name      | Fraction of a measure | Beats |
| -------------- | --------------------- | ----- |
| Whole Note     | 1                     | 4     |
| Half Note      | 1/2                   | 2     |
| Quarter Note   | 1/4                   | 1     |
| Eighth Note    | 1/8                   | 1/2   |
| Sixteenth Note | 1/16                  | 1/4   |
| …              | …                     | …     |
| N-th Note      | 1/N                   | 4/N   |

<br />

:::details 🔍 I see more patterns lurking here…
There are more patterns related to this one:

- Dotted notes, 3/2 the duration (really `(1 + 1/2 = 3/2)x`. You can chain more dots to get durations like `(1 + 1/2 + 1/4 = 7/4)x`)
- Triplets: 2/3 the duration
:::

## Time Signatures

A **time signature** is a two-number label that describes how pulses are grouped
into measures. In sheet music (and the diagrams below), these numbers are 
stacked vertically, but in text it's often written with a slash like `top/bottom`.

The bottom number describes the duration of a beat. For example, time signatures
of the form x/4 have a beat every 1/4 (i.e. quarter) note. Meanwhile in x/8 time,
each beat is an eighth note. Meanwhile, The top number determines how many of 
these beats are grouped into a measure.

The slash notation may look similar to fractions. In fact, it _is_ a fraction.
A time signature can be interpreted as the length of a measure as a fraction of
a measure of common time! This assumes the same tempo.

Here are some example time signatures:

| Time Signature | Beat length        | Measure length (fraction of 4/4 measure) | Other Notes          |
| -------------- | ------------------ | ---------------------------------------- | -------------------- |
| 4/4            | 1/4 (quarter note) | 4/4 = 1x                                 | a.k.a. "common time" |
| 2/2            | 1/2 (half note)    | 2/2 = 1x                                 | a.k.a. "cut time"    |
| 3/4            | 1/4 (quarter note) | 3/4 = 0.75x                              |                      |
| 12/8           | 1/8 (eighth note)  | 12/8 = 1.5x                              |                      |

Furthermore, here is a diagram of the meters that these time signatures represent. Notice that 2/2 time has beats spaced further apart, but 12/8 time has them closer together. 2/2 has the same measure length as 4/4, but 3/4 is shorter and 12/8 is longer.

<SketchP5 :sketch="SKETCHES.time_signatures" />

In practice, the time signature may change in the middle of the song. Sometimes this happens
infrequently (e.g. only at the start of a new section). Other times, it may change as frequently
as every measure or two. Math rock, progressive rock, and video game boss music are some styles of music where frequent measure changes are common.

## Numbering Measures

How do we locate a specific instant in time in a way that works across different
meters? We'd like a numbering system that obeys the following rules:

- The first full measure is numbered 1.
- Sometimes a song begins with a **pickup measure** - a partial measure that leads into the first measure. On a page, this measure is usually unlabeled, but when programming it's convenient to label this measure 0
- Every time we reach the start of a new measure, we increment the measure number. 
- Even when we chain measures of different time signatures together, the measures are counted 1, 2, 3, …
- Beat numbers within a specific measure are numbered 1, 2, 3, …, N where `N` is the top number of the relevant time signature. For example, in 4/4 time the beats would be labeled 1, 2, 3, 4. In 5/8 time, the beats would be numbered 1, 2, 3, 4, 5.
- To avoid some headaches, let's also require that time signature changes can happen only at the end of a full measure.


The next few sections will build a data structure that helps translate between the steady pulse (more convenient for programming) and the human-readable measure numbers that follow the rules above.

## Meter Data Structure

As a building block, let's make a data structure that acts as a "ruler" for 
a single time signature. It will be anchored at a specific pulse number
and count the elapsed measures and beats relative to this anchor point.

Here is some pseudocode for the data structure including how to convert between
pulses and measure numbers:

```
// Helper data structure for storing and formatting measure numbers
MeasureNumber:
    // These values are stored numbered from 0, not 1!
    measures: number
    beats: number

    // Format as a human-readable measure number where the values are
    // numbered from 1. E.g. 2.1 or 3.3.
    // note that this rounds the beat number down to an integer
    format(): string
        display_measures = measures + 1
        display_beats = floor(beats) + 1
        return `${display_measures}.${display_beats}`

Meter:
    // Pulse number where the first full measure starts
    start_pulse: number

    // Time signature for this meter
    top: number
    bottom: number

    // How long is one beat in this time signature?
    // in x/4 time, this is 1
    // in x/8 time, this is 1/2
    // in x/2 time, this is 2
    pulses_per_beat = 4 / bottom

    // In common time, a measure is 4 pulses long. However, 
    // we need to scale this according to the time signature.
    measure_length_pulses = 4 * (top/bottom)


    // Convert a pulse number to (measures, beats)
    pulses_to_measures(pulses: number): MeasureNumber
        // Measure elapsed pulses from the start time.
        // Note that this may be negative! Such cases indicate pickup
        // beats before the start of measure 1
        pulses_from_start = pulses - start_pulse

        // Divide the pulses into full measures and leftover pulses.
        measures, remaining_pulses = div_mod(pulses_from_start, measure_length_pulses)

        // Scale the remainder based on the length of a beat in this
        // time signature
        beats = remaining_pulses / pulses_per_beat

        return new MeasureNumber(measures, beats)
    
    // Inverse: convert (measures, beats) to pulse number
    measures_to_pulses(measure_number: MeasureNumber): number
        // Remember, these values are numbered from 0
        measures, beats = measure_number;

        // undo the steps we did in pulses_to_measures above
        remaining_pulses = beats * pulses_per_beat
        pulses_from_start = measures * measure_length_pulses + remaining_pulses
        return start_pulse + pulses_from_start
```

Here is a visualization of the above. Here I made a `Meter` in 3/4 time
with a two-beat long pickup measure.

<SketchP5 :sketch="SKETCHES.measure_numbers" />

<br />

::: details 🔍 I see more patterns lurking here…
The math of measures/beats is just like converting between a 1D and 2D array index!

other forms: hierarchical addresses, numbers in a base

Geometrically, we're enumerating cells of an N-D array in lexicographical order. ❓ What does NumPy do here?
:::

## Song Meter Data Structure

If a song only uses one time signature, `Meter` is enough for calculations.
If we need multiple time signatures, we'll need a new data structure. 
We can build a `SongMeter` from several `Meter` objects, plus a few extra
details for bookkeeping.

```
SongMeter:
    // pairs of (Meter, start_measure)
    // start_measure labels the start of each meter with the measure number
    //   within the overall song
    // Also, remember that each Meter stores a start_pulse. Again this labels
    //   the start of each meter, just in pulses rather than measures.
    meters: (Meter, number)[]

    pulses_to_measures(pulses: number): MeasureNumber
        // Do an array search comparing the pulse number with
        // meter[i].start_pulse to find the relevant meter. Corner cases:
        //
        // - If pulses is before the start of the first meter, use the first meter.
        //   negative offsets will be interpreted as pickup beats
        // - If pulses is after the end of the last 
        meter, start_measure = find_meter_by_start_pulse(meters, pulses)

        // Compute the elapsed measures/beats relative to the start of
        // the specific meter
        local_measures, beats = meter.pulses_to_measures(pulses)

        // Now all that's left is to shift this to start at start_measure
        // instead of 0
        return new MeasureNumber(start_measure + local_measures, beats)

    measures_to_pulses(measure_number: MeasureNumber): number
        // We do a similar array search, but this time by start measure
        // rather than start pulse.
        meter, start_measure = find_meter_by_start_measure(meters, measure_number.measures) 

        // Adjust the measure number for the selected meter
        local_measures = new MeasureNumber(measure_number.measures - start_measure, measures.beats)

        // Delegate to the meter to compute the overall pulse number!
        return meter.measures_to_pulses(local_measure)
```
Here's an example of `SongMeter` in action:

<SketchP5 :sketch="SKETCHES.mixed_meters" />
