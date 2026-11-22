struct Camera {
    eye: vec3f,
    // unit directions
    right: vec3f,
    up: vec3f,
    back: vec3f
}


// Compute a camera from the eye point, the target point, and the assumption
// that +Z is up
// Checked an example by hand, see https://www.desmos.com/3d/gfntcqc476
fn look_at(eye: vec3f, at: vec3f) -> Camera {
    let back = normalize(eye - at);
    const Z_UP = vec3f(0, 0, 1);
    let right = normalize(cross(Z_UP, back));
    let up = normalize(cross(back, right));
    return Camera(eye, right, up, back);
}

/**
 * Make a view matrix for a given camera
 *
 * See also https://learnwebgl.brown37.net/07_cameras/camera_math.html
 * though I'm using a z-up world space, so the components are a little different
 * 
 * camera - the camera position/orientation
 * returns a view matrix
 */
fn make_view(camera: Camera) -> mat4x4f {
    // Translate the camera to the origin
    let to_origin = translate(-camera.eye);

    let right = camera.right;
    let up = camera.up;
    let back = camera.back;

    // after we find the coordinates relative to the eye center in world space,
    // we want to measure this along the right, up, and back vectors.
    // this would be the matrix [right, up, back]^T. But since WebGPU is
    // column-major, you write it like [right, up, back]
    let orient_frame = mat4x4f(
        right.x, up.x, back.x, 0,
        right.y, up.y, back.y, 0,
        right.z, up.z, back.z, 0,
        0, 0, 0, 1,
    );

    return orient_frame * to_origin;
}

/**
 * Make the inverse view matrix diretly making use
 * of the matrix property
 * (R * T)^(-1) = T^(-1) * R^(-1)
 */
fn make_inv_view(camera: Camera) -> mat4x4f {
    let right = camera.right;
    let up = camera.up;
    let back = camera.back;

    let unorient_frame = mat4x4(
        right.x, right.y, right.z, 0,
        up.x, up.y, up.z, 0,
        back.x, back.y, back.z, 0,
        0, 0, 0, 1,
    );

    let from_origin = translate(camera.eye);

    return from_origin * unorient_frame;
}
