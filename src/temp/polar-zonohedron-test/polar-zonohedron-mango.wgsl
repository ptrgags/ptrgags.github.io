
struct Interpolated {
    @builtin(position) position: vec4f,
    @location(1) uv: vec2f,
}

@vertex
fn vertex_main(input: VertexInput) -> Interpolated {
    var output: Interpolated

    let angle = u_frame.time * 2.0 * PI * frequency;
    let model = rotate_z(angle);
    let inv_model = rotate_z(-angle);

    let eye = vec3f(3.0, 3.0, 3.0);
    let camera = look_at(eye, vec3f(0.0));
    let view = make_view(camera);
    let inv_view = make_inv_view(camera);

    let frustum = make_ortho_frustum(4, 0, 8);
    let projection = make_ortho_matrix(frustum);
    output.position = projection * view * model * vec4(input.position, 1.0);
    
    output.uv = input.uv
    return output
}

@fragment
fn fragment_main(input: Interpolated) -> @location(0) vec4f {
    let color = vec3f(input.uv, 0.0);
    return vec4f(color, 1.0);
}
