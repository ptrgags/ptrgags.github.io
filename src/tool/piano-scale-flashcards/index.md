---
layout: article
title: Piano Scale Flashcards
date: 2026-10-23
---
<script setup lang="ts">
import PianoScaleFlashcards from './PianoScaleFlashcards.vue'
</script>

To help study and practice musical scales on keyboard instruments, I made
the following deck of flashcards:

<PianoScaleFlashcards />

## Ways to Use These Cards

Some possible uses for these flashcards:

- Music Theory:
  - Practice note names for a given scale
  - Study interval relationships within a single scale
  - Practice matching major keys with their relative minor key
- Music Practice:
  - Select a scale card and practice it on keyboard
  - Pick a melody and transpose it into different keys
- Improvisation:
  - Shuffle the deck and pick a random scale to use when improvising
  - Write a melody in scale degrees, then explore how it sounds in different scales/modes

:::tip ⚠ Don't use the whole deck at once!
This deck includes 96 scales. It would be counterproductive to try to study
them all at once!

Instead, select a small portion of cards to focus on. 
For example, If you are practicing major scales, gather only the 12 cards
labeled "XXX Ionian (Major)".
:::

## Design Notes

When making this deck, I've been thinking a lot about what details would be
helpful for my memorization needs. Here are the key details I considered:

- I only included the 7 notes of the scale to avoid visual clutter.
- I arranged the notes into two rows as they appear on the keyboard. This helps to highlight spatial relationships.
- I label the notes with the appropriate spelling for the given scale.
- I place the note names directly on the key. This way no cross-referencing is needed.
- I also split the diagram roughly in half. This is helpful for a few reasons:
  - This breaks the scale down into more digestible chunks of 3 to 4 notes at a time.
  - Each scale degree is in a visually distinct spot. For example, fifths are always the second note on the right side.
  - It helps highlight some patterns. For example, among the Ionian/Major scales (pages 2-3), notice how keys with sharps have shapes that slope upwards, while keys with flats slope downwards.

## See Also

- In `p5-sketchbook`, I made a diagram of [Major scales](https://ptrgags.dev/p5-sketchbook/MajorKeys/). This highlights notes on a piano keyboard. I found it too visually busy, which is why I opted for a more streamlined look in this version.
