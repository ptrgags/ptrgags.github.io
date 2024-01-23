import "/the-bricks/p5/ShaderQuad.js";
import { SKETCH_SIZES } from "/the-bricks/p5/Sketch.js";

const WAVE_SHADER = `
precision highp float;

varying vec2 uv;
uniform float time;

void main() {
    float wave = 0.5 + 0.5 * sin(16.0 * uv.x - 2.0 * time);

    gl_FragColor = vec4(wave, 0.0, 0.0, 1.0);
}
`;

const smoke_test = document.querySelector('#smoke-test');
smoke_test.size = SKETCH_SIZES.trading_card_tiny;
smoke_test.set_shaders({frag: WAVE_SHADER});
