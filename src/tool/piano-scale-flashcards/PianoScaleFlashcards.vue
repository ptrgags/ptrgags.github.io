<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import PDFViewer from '../../components/PDFViewer.vue'
import {
  AEOLIAN_MODE,
  DORIAN_MODE,
  HARMONIC_MINOR_SCALE,
  IONIAN_MODE,
  LOCRIAN_MODE,
  LYDIAN_MODE,
  MIXOLYDIAN_MODE,
  PHRYGIAN_MODE,
} from '../../lib/music/scales.ts'
import { TradingCard } from '../../lib/printables/TradingCard.ts'
import {
  A,
  Ab,
  B,
  Bb,
  C,
  D,
  Db,
  E,
  Eb,
  F,
  G,
  Gb,
  type PitchClass,
} from '../../lib/music/pitches.ts'
import { PianoScaleSchematic } from '../../lib/music/PianoScaleSchematic.ts'
import { get_note_name, scale_to_note_names } from '../../lib/music/scale_note_names.ts'
import { Direction2P } from '../../lib/math/pga2d/Direction2P.ts'
import { Point2P } from '../../lib/math/pga2d/Point2P.ts'
import { PDFDoc } from '../../lib/pdf/PDFDoc.ts'
import { divmod } from '../../lib/math/divmod.ts'
import { ATC3x3 } from '../../lib/printables/ATC3x3.ts'
import { Rigid } from '../../lib/primitives/Rigid.ts'
import { xform } from '../../lib/primitives/shorthand.ts'

const pdf_file: Ref<File | undefined> = ref(undefined)

const SCALES = [
  LYDIAN_MODE,
  IONIAN_MODE,
  MIXOLYDIAN_MODE,
  DORIAN_MODE,
  AEOLIAN_MODE,
  PHRYGIAN_MODE,
  LOCRIAN_MODE,
  HARMONIC_MINOR_SCALE,
]

const SCALE_NAMES = [
  'Lydian',
  'Ionian (Major)',
  'Mixolydian',
  'Dorian',
  'Aeolian (Minor)',
  'Phrygian',
  'Locrian',
  'Harmonic Minor',
]

const PITCHES_CIRCLE_OF_FOURTHS: PitchClass[] = [C, F, Bb, Eb, Ab, Db, Gb, B, E, A, D, G]
const PITCH_LETTERS = ['C', 'F', 'B', 'E', 'A', 'D', 'G', 'B', 'E', 'A', 'D', 'G']

const XFORM_POSITION_SCALE = new Rigid({
  translation: new Direction2P(250, TradingCard.BOUNDS_MAIN.dimensions.height - 75),
  rotation: -Math.PI / 2,
})

function make_flashcards(): TradingCard[] {
  return SCALES.flatMap((scale, i) => {
    const scale_quality = SCALE_NAMES[i]
    return PITCHES_CIRCLE_OF_FOURTHS.map((pitch_class, j) => {
      const scale_symbol = scale.to_symbol(pitch_class)
      const schematic = new PianoScaleSchematic({
        spacing: new Direction2P(64, 32),
        origin: Point2P.ORIGIN,
        notes: scale_to_note_names(scale_symbol),
      })

      const root_letter = PITCH_LETTERS[j]
      const root_name = get_note_name(pitch_class, root_letter)
      const scale_name = `${root_name} ${scale_quality}`

      return new TradingCard({
        body: xform(XFORM_POSITION_SCALE, schematic),
        caption: scale_name,
      })
    })
  })
}

onMounted(async () => {
  const doc = new PDFDoc({
    page_size_inches: new Direction2P(8.5, 11),
    pixels_per_inch: 200,
  })
  await doc.init()

  const all_flashcards = make_flashcards()
  const page_count = Math.ceil(all_flashcards.length / 9)
  for (let i = 0; i < page_count; i++) {
    const page_cards = all_flashcards.slice(9 * i, 9 * (i + 1))
    const page = new ATC3x3(page_cards)
    doc.add_page(page)
  }

  pdf_file.value = await doc.finish('piano-scale-flashcards.pdf')
})
</script>

<template>
  <PDFViewer v-if="pdf_file" :width="700" :height="500" :file="pdf_file"></PDFViewer>
</template>
