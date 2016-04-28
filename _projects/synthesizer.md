---
layout: project
title: Synthesizer
permalink: /projects/synthesizer/
description: HTML5 synthesizer I made for a physics research project in high school
purpose: >
    I wanted to learn how synthesizers work, so I made a simple synth using
    the HTML5 Web Audio API
status: demo
repo: synthesizer
languages:
    - JavaScript
    - Web Audio API
concepts:
    - Subtractive Synthesis
accomplishments:
    - Working oscillators, filters, ADSR envelopes, and
improvements:
    - Use Bootstrap for style
    - Use AngularJS for page controls
thumbnail: "synthesizer/wave.svg"
link: "http://ptrgags.github.io/synthesizer"
years: 2013-2014
draft: false
featured: true
wip: true
---
### Subtractive Synthesizers

Subtractive synthesizers are the main type of synthesizer. They start with
one or more pure sound waves, and get passed through several modules that
remove parts of the sound wave in order to reshape the sound into a unique
sound.

A synthesizer has many parts that can be connected in a plethora of
ways. Here are the basics.

### Oscillators

An oscillator is a component that simply generates a pure sound wave.

**Example pure sound waves**:

* Sine Wave - pure, simple sound, similar to a flute
* Pulse/Square Wave - electronic sound, reminiscent of video games
* Triangle Wave - somewhere between sine and square wave
* Sawtooth Wave - has a buzzy, brassy sound

### Filters

Filters cut out parts of a sound wave, giving it a more rounder sound.

...

### Amplifier

Amplifiers simply boost the volume of the sound wave. The amplifier control
allows you to compensate for loss of volume due to filtering.

### Envelopes

ADSR (Attack, Decay, Sustain, Release) envelopes are controls that shape
a note's volume over time.

**Settings**:

* Attack Time - The time it takes to go from silence to peak volume
* Decay Time - The time it takes to go from peak volume to sustain level
* Sustain Level - The volume at which the note plays while the note is held.
* Release time - the time it takes to go from the sustain level to silence.

### LFOs

Low Frequency Oscillators are simply additional oscillator that play at very
low frequencies. This signal is used to make the volume of a note "wobble"
as it plays. LFOs are helpful when making bass patches.
