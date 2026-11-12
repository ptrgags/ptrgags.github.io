@fragment
fn fragment_main(input: Interpolated) -> @location(0) vec4f {
    let color = vec3f(input.uv, 0.0);
    return vec4f(color, 1.0);
}
