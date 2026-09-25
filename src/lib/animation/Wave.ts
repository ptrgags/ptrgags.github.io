import { mod } from '../math/mod.ts'

export interface WaveOptions {
  /**
   * Amplitude of the wave. Default 1
   * For bipolar waves, this is the height from the center line to the maximum
   * value (i.e. half the height of the wave) before adding bias
   *
   * For unipolar waves, this is the height from 0 to maximum value before adding bias
   */
  amp?: number
  /**
   * Frequency of the wave in cycles/unit time (Hz if time is measured in seconds)
   * Default 1
   */
  freq?: number
  /**
   * Phase shift normalized to [0, 1]
   */
  phase?: number
  /**
   * Bias to add to the wave, default 0
   */
  bias?: number
}

/**
 * Create a wave from a single-cycle waveform. This is intended for use
 * with animation
 */
export class Wave {
  waveform: (t: number) => number
  amp: number
  freq: number
  phase: number
  bias: number

  /**
   * Constructor. Use this for custom waveforms only.
   * @param waveform A single cycle waveform. It must take a value from [0, 1] and return a value in [-1, 1]. Values outside the domain are ignored
   * @param options Parameters for the wave
   */
  constructor(waveform: (t: number) => number, options: WaveOptions = {}) {
    this.waveform = waveform
    this.amp = options.amp ?? 1
    this.freq = options.freq ?? 1
    this.phase = options.phase ?? 0
    this.bias = options.bias ?? 0
  }

  /**
   * Return the wave as a signed value
   * @param t time value
   * @returns Value in the range [-amp, amp] + bias
   */
  bipolar(t: number): number {
    const t_freq_phase = this.freq * t + this.phase
    const t_loop = mod(t_freq_phase, 1.0)
    return this.bias + this.amp * this.waveform(t_loop)
  }

  /**
   * Return the wave as an unsigned value
   * @param t time value
   * @returns Value in the range [0, amp] + bias
   */
  unipolar(t: number): number {
    const t_freq_phase = this.freq * t + this.phase
    const t_loop = mod(t_freq_phase, 1.0)
    const signed = this.waveform(t_loop)
    const unsigned = 0.5 + 0.5 * signed

    return this.bias + this.amp * unsigned
  }

  /**
   * Create a sine wave
   * @param options Wave parameters
   * @returns A sine wave object
   */
  static sine(options: WaveOptions = {}): Wave {
    return new Wave((t) => Math.sin(2.0 * Math.PI * t), options)
  }

  /**
   * Create a square wave
   * @param options Wave parameters
   * @returns A square wave object
   */
  static square(options: WaveOptions = {}): Wave {
    return new Wave((t) => (t < 0.5 ? -1 : 1), options)
  }
}
