const ASPECT_RATIO = 5.0 / 7.0;

/**
 * This assumes a frustum that's symmetric around the axis
 * the camera is viewing. This simplifies the description s
 * left = -right
 * bottom = -top
 *
 * near/far are given as positive depth values.
 */
struct OrthoFrustum {
    right: f32,
    top: f32,
    near_depth: f32,
    far_depth: f32,
}

/*
 * Make an orthographic frustum. This assumes the usual 5/7 aspect ratio of
 * of my trading card shaped canvas
 * depths are given as positive values from the camera's eye
 */
fn make_ortho_frustum(half_height: f32, near_depth: f32, far_depth: f32) -> OrthoFrustum {
    let half_width = ASPECT_RATIO * half_height;
    
    return OrthoFrustum(
        half_width,
        half_height,
        near_depth,
        far_depth,
    );
}

/**
 * Make an orthographic projection matrix, which maps the frustum
 * to NDC. Note that WebGPU's NDC is slightly different than 
 */
fn make_ortho_matrix(frustum: OrthoFrustum) -> mat4x4f {
    // Translate the frustum so the near plane is at the origin.
    // this is a translation from z = -near_depth to z =0
    let to_origin = translate(vec3f(0, 0, frustum.near_depth));

    // Squash the view frustum into the normalized range.
    // x: [-right, right] -> [-1, 1] so scale factor is 1/right
    // y: [-top, top] -> [-1, 1] so scale factor is 1/top
    // z: [0, far - near] -> [0, 1] so scale factor is 1/(far - near),
    //    however, NDC is a left-handed coordinate system so multiply by -1
    let scale_factor = vec3f(
        // since we're assuming a symmetrical frustum, we just divide by 
        // the right and top values
        1.0 / frustum.right, 
        1.0 / frustum.top,
        // the -1 is to flip to left-handed coordinates
        -1.0 / (frustum.far_depth - frustum.near_depth)
    );

    return scale(scale_factor) * to_origin;
}
