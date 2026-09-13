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
this is as simple as counting to 4 over and over. Other times, the pattern
changes mid-song. Let's explore the math of these patterns. We'll start
with the basics and build up to more intricate examples like the one
you see above.

## Steady Pulse

We begin by establishing a common timeline for measuring elapsed time. Start
with a sequence of evenly-spaced **pulses**. We will number them `0, 1, 2, ...`
as in the animation below. This gives us a way to uniquely identify points in time.

<SketchP5 :sketch="SKETCHES.pulse" />
<br />

:::details Note on terminology
You could refer to the pulses as beats. For example, tempo is described in
"beats per minute" (BPM). However, we will also use the word "beats" another
way in sections below. To avoid confusion, I will use "pulses" when I'm 
referring to this steady sequence of pulses
:::

:::details ❓ Curiosity: What if the pulses are not equally spaced?
In practice, pulses are not always spaced evenly like this! Some examples:

- A song may change tempo for some sections. This means the pulses speed up (get closer together) or slow down (spread further apart)
- Some styles of music involve swing - some pulses are longer or shorter than others as in the diagram below:

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

Counting pulses may be mathematically useful, but it is unweildy. Imagine
trying to count out loud `1283, 1284, 1285, 1286, ...`! Instead, we group
pulses into larger groups called **measures**, divided into smaller units
called **beats**. Furthermore, the
first beat in a measure is emphasized stronger than the other beats. This
makes this grouping a **meter** not just a pulse.

The most common grouping is **common time**, where one measure is 4 beats long
as in the following diagram. Here, one beat equals one pulse.

<SketchP5 :sketch="SKETCHES.common_time" />

If you were to count this out loud, you would say "ONE-2-3-4, TWO-2-3-4, THREE-2-3-4", and so on.

This is only one possible meter. Others may have more or less beats, and
each beat may be longer or shorter than a pulse. We'll see more examples
in later sections.

## Note durations

Terminology for note durations assumes common time, even in other meters!
A beat in common time is called a "quarter note", because it is a quarter
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

:::details 🔍 I see more patterns lurking here...
There are more patterns related to this one:

- Dotted notes, 3/2 the duration (really `(1 + 1/2 = 3/2)x`. You can chain more dots to get durations like `(1 + 1/2 + 1/4 = 7/4)x`)
- Triplets: 2/3 the duration
:::

## Time Signatures

A **time signature** is a two-number label that describes how pulses are grouped
into measures. In sheet music (and the diagrams on this page), these numbers are 
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

## Numbering Measures

We want to number measures according to the following rules:

- The first full measure is numbered 1
- Sometimes there is a partial measure that leads into the first measure. This **pickup** measure is usually unnumbered, but labeling it measure 0 is convenient when programming
- Every time we reach the start of a new measure, we increment the measure number. This must work even when we chain measures of different time signatures
- Time signature changes always happen at the end of a full measure, this will save some headaches
- Beat numbers are also numbered from 1 instead of 0. Musicians count 1-2-3-4, not 0-1-2-3 like a programmer

The next few sections will build a data structure that helps translate between a constant pulse (convenient for programming) and human-readable measure numbers following the rules above.

## Meter Data Structure

As a building block, let's make a data structure that acts as a ruler for 
a single time signature. It will be anchored at a specific beat of the
constant pulse and compute `(measures, beats)` relative to that anchor point.

:::warning TODO: revisit this, make the explanation a bit simpler.
:::

```
Meter:
    // top number of time signature
    // to avoid confusion, i'll use "subdivision" here for which note gets
    // the beat. "beat" will be reserved for the underlying quarter note pulse.
    subdivisions_per_measure: number
    // bottom number of time signature. This is a power of 2, usually 2, 4, or 8
    subdivision: number

    // The calculations
    measure_length_beats = 4 * subdivisions_per_measure / subdivision

    // 0-indexed beat number that represents where this meter starts in time.
    start_beat: number

    // Relative to the start of this meter, how many measures and beats
    // is this time?. Note that values may be negative for pickup measures!
    beats_to_offset(beats): (full_measures, beats)
        from_start = beats - this.start_beat
        full_measures = from_start // measure_length_beats
        beats = from_start % measure_length_beats
        return (full_measures, beats)

    // Inverse - given a measure/beat offset, convert it to beats since
    // the start time.
    offset_to_beats((full_measures, beats)): beats
        return full_measures * measure_length_beats + beats
        
```
<SketchP5 :sketch="SKETCHES.measure_numbers" />

::: details 🔍 I see more patterns lurking here...
The math of measures/beats is just like converting between a 1D and 2D array index!

other forms: hierarchical addresses, numbers in a base

Geometrically, we're enumerating cells of an N-D array in lexicographical order. ❓ What does NumPy do here?
:::

## Song Meter Data Structure

We can combine one or more meters into one big meter for a whole song!

:::warning TODO
again, redo this to be simpler
:::

```
// Measure
MeasureNumber = (measure, beats)

SongMeter:
    // list of meters, subject to the following constraints (enforced in constructor)
    // - There must be at least one meter
    // - Their start_beats MUST be listed in sorted order
    // - The first meter's start_beat must be in [0, first_meter.measure_length_beats)
    //   If non-zero, this indicates a pickup measure
    // - meter[i].start_beat must be exactly at the start of a measure relative to meter[i - 1]
    meters: Meter[]

    // (automatically computed in constructor), for each entry in meters, 
    // the measure number for the start of the given meter. This is done
    // by a cumulative sum of measures of meter[i] relative to meter [i - 1], starting at 1.
    start_measures: number[]

    
    // Convert 
    beats_to_measures(beat: number): MeasureNumber
        // binary search the array for the last meter with a start_beat <= beat
        (i, closest_meter) = find_meter_by_beat(meters, beat)
        start_measure = start_measures[i]

        (measure_offset, beat_offset) = measure

        // beats are displayed 
        return MeasureNumber(start_measure + measure_offset, beat_offset + 1)

    // convert a measure number to number of quarter note beats since the 
    // beginning of the song. 
    measures_to_beats(measure: MeasureNumber): beats
        // TODO: implement first, summarize once I get it working
```

<SketchP5 :sketch="SKETCHES.mixed_meters" />
