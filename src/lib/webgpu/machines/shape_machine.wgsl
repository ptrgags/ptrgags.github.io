struct VertexInput {
    @location(0) position: vec3f,
    @location(1) normal: vec3f,
    @location(2) uv: vec2f,
}

struct FrameUniforms {
    time: f32,
}

@group(0) @binding(0) var<uniform> u_frame: FrameUniforms;
@group(0) @binding(1) var<uniform> u_input: InputUniforms;
