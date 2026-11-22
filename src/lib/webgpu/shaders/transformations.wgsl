const IDENTITY = mat4x4f(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
);

fn translate(offset: vec3f) -> mat4x4f {
    return mat4x4f(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        offset.x, offset.y, offset.z, 1
    );
}

fn scale(factors: vec3f) -> mat4x4f {
    return mat4x4f(
        factors.x, 0, 0, 0,
        0, factors.y, 0, 0,
        0, 0, factors.z, 0,
        0, 0, 0, 1,
    );
}

fn rotate_z(angle: f32) -> mat4x4f {
    let c = cos(angle);
    let s = sin(angle);
    return mat4x4f(
        c, s, 0, 0,
        -s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    );
}
