---
layout: article
title: Musical Meter
date: '2026-09-07'
patterns_lurking: true
---
:::warning TODO
time for some math rock
:::

## Steady Beats

:::warning TODO
- single line of beats
- number them 0, 1, 2, 3
- animated cursor 
:::

- Even when representing mixed meters, we need a common way to measure in time
- so we start with a steady pulse of **beats**
- number the beats starting with 0. This may seem a bit strange (in music we count starting from 1), but it will make some of the math that follows simpler.

## Measures

:::warning TODO
- Two rows: top is the line of beats
- bottom row is measures of 4/4
- display beat number next to `measures.beats`
- Don't draw time signature yet
:::

- We tend to perceive music not in beats, but in larger groups called **measures**
- The first beat in a measure is emphasized as stronger, this makes it a **meter**, not just a **pulse**
- The most common grouping is **common time**, where one measure is 4 beats.
- This is only one possible meter. We'll discuss more further down the page.

### Subdividing a Measure

:::warning TODO
diagram of dividing a measure into two half notes, 4 quarter notes, 8 eighth notes, etc.
:::

Terminology for note durations assumes common time, even when the meter is different.

| Note Name      | Fraction of a measure | Beats |
| -------------- | --------------------- | ----- |
| Whole Note     | 1                     | 4     |
| Half Note      | 1/2                   | 2     |
| Quarter Note   | 1/4                   | 1     |
| Eighth Note    | 1/8                   | 1/2   |
| Sixteenth Note | 1/16                  | 1/4   |
| …              | …                     | …     |
| N-th Note      | 1/N                   | 4/N   |

:::details 🔍 I see more patterns lurking here...
There are more patterns related to this one:

- Dotted notes, 3/2 the duration (really `(1 + 1/2 = 3/2)x`. You can chain more dots to get durations like `(1 + 1/2 + 1/4 = 7/4)x`)
- Triplets: 2/3 the duration
:::

### Time Signatures

- now that we have terminology, we can describe a meter using a time signature
- two numbers: bottom number is what subdivision is considered the "beat" in this meter. E.g. x/4 means a beat is a quarter note. x/8 means the eighth note is the beat
- top number is how many "beats" are in a single measure
- In sheet music, the numbers are drawn on top of each other, but in text, it's easier to write it like a fraction.
- In fact, it _is_ a fraction! A time signature describes the length of a measure in this meter as a fraction of a measure of 4/4 time at the same tempo.
  - 4/4=1 is a full measure
  - **cut time** 2/2=1 is the same length, it's just grouped differently.
  - 3/4 is shorter than a measure
  - A measure of 12/8=3/2 is 1.5 times the length of 4/4
- A single piece may change time signatures!
  - Some genres do this often. E.g. progressive rock, math rock, boss music in video games

::: warning TODO: diagram
- show 4 rows, one for each of the time signature listed above so you can compare the lengths
- draw the time signatures in this and following animations
:::

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

:::warning TODO: this class definitely needs unit tests
:::

::: warning TODO
Show a single meter with measure numbers listed
:::

::: details 🔍 I see more patterns lurking here...
The math of measures/beats is just like converting between a 1D and 2D array index!

other forms: hierarchical addresses, numbers in a base

Geometrically, we're enumerating cells of an N-D array in lexicographical order. ❓ What does NumPy do here?
:::

## Song Meter Data Structure

We can combine one or more meters into one big meter for a whole song!

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

:::warning TODO: this class definitely needs unit tests
:::

:::warning TODO: Make a diagram of mixed meters with the current measure number labeled
:::
