// Digital signals are stored as chunks of u32 bit flags, packed into vec4u. 
// This is enough for 128 button states per vector. So in total we can support
// 256 signals, enough for a MIDI keyboard and 128 other signals in the worse
// case! (though in practice I'll be using far less than this)
const MAX_DIGITAL_VECTORS = 2;
// Analog signals are stored as normalized f32s (signed or unsigned depends on
// the config)
const MAX_ANALOG_VECTORS = 4;

struct InputUniforms {
    // Digital signals (like button pressed/down/released)
    //
    // Address is vccbbbbb
    // v = vector_index 0-1
    // cc = component_index 0-3
    // bbbbb = bit index 0-31
    //
    // total: 2 * 4 * 32 = 256 digital signals
    digital: array<vec4u, MAX_DIGITAL_VECTORS>,
    // Analog signals (like gamepad axes)
    //
    // Address: vvcc
    // vv = vector_index 0-4
    // cc = component index 0-4
    //
    // total: 4 * 4 = 16 analog signals
    analog: array<vec4f, MAX_ANALOG_VECTORS>,
}
