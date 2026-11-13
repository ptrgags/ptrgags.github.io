/**
 * Single-cycle waveforms that map [0, 1] -> [-1, 1]
 */
export class Waveform {
  static sine(t: number): number {
    return Math.sin(2.0 * Math.PI * t)
  }

  static square(t: number) {
    return t < 0.5 ? -1 : 1
  }
}
