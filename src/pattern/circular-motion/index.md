---
layout: article
title: TEMPLATE
date: 'YYYY-MM-DD'
hide: true
# URL relative to BACKBLAZE assets root
thumbnail: pattern/TEMPLATE/thumbnail.png
---

<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './circular-motion'
</script>

<SketchP5 :sketch="SKETCHES.template" />

## Definitions

Let $C_n(t)$ represent motion around the unit circle such that:

- $t$ is the unit of time (e.g. seconds)
- The motion moves around the circle at a constant rate, neither speeding up nor slowing down
- The motion completes $n$ full circles as $t$ goes from `0 -> 1`
- The motion repeats forever

What is the nature of $C_n$? There's a couple ways to think about it:

![Diagram with the left half showing a rotation transformation, and the right half showing a curve created by rotating a point](figures/circular-motion-two-views.png)

- As a transformation: $C_n$ is a continuous [rotation](./rotation.html) with an angle that changes with time.
  - Since we complete $n$ full cycles, and there are $2\pi$ radians/cycle, that means we rotate to an angle of $\theta(t) = 2\pi n t$ radians at time $t$
  - This means $n$ is a (linear) **frequency** in cycles/sec
  - So $C_n(t) = R(2\pi n t)$ is a transformation
- As a curve: Starting at some point $P$ in the plane, we apply the rotation described above and see it trace out a full circle.
  - In this case, $C_n(t) = R(2\pi n t) \cdot P$ is a parametric curve
  - It's convenient to pick $P = (1, 0)$ so the circle will have radius 1 and start at an angle of $0$ radians.

Both views have their uses. The trajectory view is visually intuitive. Meanwhile the transformation view can be helpful for explaining some mathematical properties.

## Frequency Conventions

There are multiple conventions for frequency:

- As an angular velocity (aka angular frequency): $\omega$, measured in radians/sec
- As a linear frequency $f$ in cycles/sec (Hz).
  - Since the letter $f$ is already used for general functions $f(x)$, sometimes another letter is used, such as $n$ (especially for integer frequencies)

The difference is simply a matter of units. Since there
are $2\pi$ radians in a full circle, we have the relationship $$\omega = 2\pi f$$

For this text, I will use the linear frequency convention.

## Recipes

$C_n(t)$ is an abstract notion of circular motion. A concrete representation depends on which mathematical context we want to use:

- As a function of complex numbers (via Euler's Formula): $$C_n(t) = e^{i2\pi n t} = \cos(2\pi t) + i \sin(2 \pi t)$$
  - This is a rotation, as under multiplication $C_n(t) \cdot z$ rotates $z$ in the complex plane
  - It is also a parametric curve in the complex plane, as $C_n(t) * 1 = C_n(t)$
- As a 2D rotation matrix: $$C_n(t) = R_{2\pi t} = \begin{bmatrix}
\cos(2\pi t) & -\sin(2\pi t) \\ 
\sin(2\pi t) & \cos(2\pi t) \\
\end{bmatrix}$$
- As a 2D parametric curve: $$C_n(t) = (\cos(2\pi n t), \sin(2\pi nt))$$

- As a rotor in 2D Geometric Algebra (and in many other flavors of GA): $$C_n(t) = e^{-\theta/2 \cdot\mathbf{xy}} = e^{-2\pi n/2 \cdot \mathbf{xy}} = \cos(\pi t) - \sin(\pi t)\hat{B}$$ for unit bivector $\mathbf{xy}$. This transformation is applied as a [sandwich product](./sandwich-product.html) $C_n(t)vC_n(t)^\dagger$.

## Properties of Circular Motion

- When the frequency is 0, circular motion stops $$C_0(t) = 1$$
  - As a transformation, $C_0(t) = R(2\pi (0)t) = I$, the identity
  - As a curve, this is the point $(1, 0)$ fixed in place for all time
- A negative frequency (rotating CW instead of CCW) is equivalent to reversing time $$C_{-n}(t) = C_n(-t)$$
  - This is because the rotation angle can be written as $2 \pi (-n) t = 2\pi n(-t) = -2\pi n t$ by commutativity and associativity of real numbers
- Composing two circular motions produces a new circular motion with the sum of the frequencies $$C_aC_b = C_{a+b}$$

<details>
<summary>Proof of multiplication rule</summary>

Using the complex number representation, we can use
the property of exponents.

$$e^{i 2\pi a t}e^{i 2\pi b t} = e^{i 2\pi (a + b) t}$$

This relies on the commutativity of complex numbers under multiplication.
</details>

- [Reflecting](./reflection.html) the circular motion in a mirror reverses its direction: $$\text{reflect} \circ C_n = C_{-n}$$

<details>
<summary>Proof of reflection rule</summary>

This is easiest to show in complex numbers, since complex conjugation $z \mapsto \bar{z}$ is a simple way to write a reflection over the horizontal axis.

$$\overline{C_n(t)} = \overline{e^{i 2 \pi n t}} = e^{-i 2\pi n t} = C_{-n}(t) $$

</details>

## Related Patterns

- [Sine and Cosine as Circular Motion](./sin-cos-circle.html)
- [Lissajous Patterns](./lissajous.html)
- [Rose Curves](./rose-curves.html)
- [Fourier Transform](./fourier-transform.html)
- [Hypotrochoids and Epitrochoids](./trochoids)
