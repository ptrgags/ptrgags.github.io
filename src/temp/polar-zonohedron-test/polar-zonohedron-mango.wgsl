
struct Interpolated {
    @builtin(position) position: vec4f,
    @location(1) uv: vec2f,
}

@vertex
fn vertex_main(input: VertexInput) -> Interpolated {
    var output: Interpolated;

    let frequency = 0.2;
    let angle = u_frame.time * 2.0 * PI * frequency;
    let model = rotate_z(angle);
    let inv_model = rotate_z(-angle);

    // for this particular polar zonohedron the basis is at 45 degrees
    // and the length of each vector is 1
    // so each row of vertices is sqrt(1/2) higher than the previous one.
    // for 6 basis vectors that's 6 sqrt(1/2) tall, and we want the eye
    // to be halfway up this.
    let half_height = 6.0 * sqrt(0.5) * 0.5;
    let eye = vec3f(1.5, 0.0, half_height);
    let camera = look_at(eye, vec3f(0.0, 0.0, half_height));
    let view = make_view(camera);
    let inv_view = make_inv_view(camera);

    let frustum = make_ortho_frustum(4, 0, 4);
    let projection = make_ortho_matrix(frustum);
    output.position = projection * view * model * vec4(input.position, 1.0);
    
    output.uv = input.uv;
    return output;
}

@fragment
fn fragment_main(input: Interpolated) -> @location(0) vec4f {
    let color = vec3f(input.uv, 0.0);
    return vec4f(color, 1.0);
}
