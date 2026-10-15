// Adapted from https://github.com/ptrgags/math-notebook/blob/main/artworks/src/motifs/halloween.rs

import { Complex } from "../math/complex/Complex.ts";
import { Point2P } from "../math/pga2d/Point2P.ts";
import { ArcAngles } from "../primitives/ArcAngles.ts";
import { Circle } from "../primitives/Circle.ts";
import { CircularArc } from "../primitives/CircularArc.ts";
import type { Drawable } from "../primitives/Drawable.ts";
import { LineSegment } from "../primitives/LineSegment.ts";
import { Path } from "../primitives/Path.ts";
import { Style } from "../styling/Style.ts";

function circle_to_arcs(circle: Circle): [CircularArc, CircularArc] {
    const [upper_half, lower_half] = ArcAngles.SEMICIRCLES;
    const top = new CircularArc(circle, upper_half);
    const bottom = new CircularArc(circle, lower_half);

    return [top, bottom]
}

export function ghost(): Drawable {
    const SIDE_HEIGHT = 1.5;
    const CIRCLE_SPACING = 2.0 / 5.0;
    const BOTTOM_CIRCLE_RADIUS = 1.0 / 5.0;
    const head_circle = Circle.unit_circle();
    const bottom_circles: Vec<Circle> = (0..5)
        .map(|i| {
            new Circle(
                new Complex((-2.0 + i as number) * CIRCLE_SPACING, -SIDE_HEIGHT),
                BOTTOM_CIRCLE_RADIUS,
            )
        })
        .collect();

    const left_eye = new Circle(new Complex(-0.5, 0.0), 0.25);
    const right_eye = new Circle(new Complex(0.5, 0.0), 0.25);
    const mouth = new Circle(new Complex(0.0, -0.5), 0.125);

    const (left_eye_top, left_eye_bottom) = circle_to_arcs(left_eye);
    const (right_eye_top, right_eye_bottom) = circle_to_arcs(right_eye);
    const (mouth_top, mouth_bottom) = circle_to_arcs(mouth);

    const [upper, lower] = ArcAngles.SEMICIRCLES;

    const ghost_body = new Path([
        // top of ghost head is a semi-circle
        new CircularArc(head_circle, upper).into(),
        // Left side
        new LineSegment(-Complex.ONE, new Complex(-1.0, -SIDE_HEIGHT)).into(),
        // Five semi-circles for the bottom
        new CircularArc(bottom_circles[0], lower).into(),
        new CircularArc(bottom_circles[1], upper.reverse()).into(),
        new CircularArc(bottom_circles[2], lower).into(),
        new CircularArc(bottom_circles[3], upper.reverse()).into(),
        new CircularArc(bottom_circles[4], lower).into(),
        // Right side
        new LineSegment(new Complex(1.0, -SIDE_HEIGHT), Complex.ONE).into(),
    ]);

    const left_eye = new Path([left_eye_top.into(), left_eye_bottom.into()]);
    const right_eye = new Path([right_eye_top.into(), right_eye_bottom.into()]);
    const mouth = new Path([mouth_top.into(), mouth_bottom.into()]);

    const ghost = Motif.new([
        (ghost_body, 0),
        (left_eye, 1),
        (right_eye, 1),
        (mouth, 1),
    ]);

    const styles = [
        // Ghostly blue body
        Style.fill(0xc5, 0xf2, 0xfa),
        // Black for the eyes and mouth
        Style.fill(0, 0, 0),
    ];

    Ok((ghost, styles))
}

function lerp(a: Complex, b: Complex, t: number): Complex {
    a * (1.0 - t).into() + b * t.into()
}

/// Make a candy corn motif
/// See my [desmos sketch](https://www.desmos.com/calculator/4gidpmhf7c) for
/// an illustration
export function candy_corn(): Path {
    // Start with a triangle at the third roots of unity
    const a = Complex.ONE;
    const b = Complex.from_polar(1.0, 2.0 * Math.PI/3);
    const c = Complex.from_polar(1.0, 4.0 * Math.PI/3);

    // Get points 1/3 and 2/3 along the sides to mark where
    // the colors transition
    const ab1 = lerp(a, b, 1.0 / 3.0);
    const ab2 = lerp(a, b, 2.0 / 3.0);
    const ac1 = lerp(a, c, 1.0 / 3.0);
    const ac2 = lerp(a, c, 2.0 / 3.0);

    // We want to round the corners, so compute points
    // a little inside from the corners.
    const radius = 0.1;
    const scale_factor = new Complex(1.0 - 2.0 * radius);
    const center_a = scale_factor * a;
    const center_b = scale_factor * b;
    const center_c = scale_factor * c;

    // Compute the six intersection points between the round circles
    // and the sides. Since the original triangle is equilateral,
    // these are just offsets from the rounding circle centers at
    // 60 degrees + a multiple of 120 degrees.
    const offset_ab = Complex.from_polar(radius, Math.PI/3);
    const offset_bc = new Complex(-radius);
    const offset_ca = Complex.from_polar(radius, -Math.PI/3);
    const isx_a_ab = center_a + offset_ab;
    const isx_b_ab = center_b + offset_ab;
    const isx_b_bc = center_b + offset_bc;
    const isx_c_bc = center_c + offset_bc;
    const isx_c_ca = center_c + offset_ca;
    const isx_a_ca = center_a + offset_ca;

    // Compute the line segments in counterclockwise order
    const line_a_ab1 = new LineSegment(isx_a_ab, ab1);
    const line_ab1_ab2 = new LineSegment(ab1, ab2);
    const line_ab2_b = new LineSegment(ab2, isx_b_ab);
    const line_bc = new LineSegment(isx_b_bc, isx_c_bc);
    const line_c_ac2 = new LineSegment(isx_c_ca, ac2);
    const line_ac2_ac1 = new LineSegment(ac2, ac1);
    const line_ac1_a = new LineSegment(ac1, isx_a_ca);

    // Compute the arcs for the corners
    const circle_a = new Circle(center_a, radius);
    const circle_b = new Circle(center_b, radius);
    const circle_c = new Circle(center_c, radius);
    const angles_a = new ArcAngles(-Math.PI/3, Math.PI/3);
    const angles_b = new ArcAngles(Math.PI/3, PI);
    const angles_c = new ArcAngles(-PI, -Math.PI/3);
    const arc_a = new CircularArc(circle_a, angles_a);
    const arc_b = new CircularArc(circle_b, angles_b);
    const arc_c = new CircularArc(circle_c, angles_c);

    // Compute arcs dividing the 3 parts of the candy corn
    const len_ab = (b - a).mag();
    const radius1 = len_ab / 3.0;
    const radius2 = 2.0 * radius1;
    const circle1 = new Circle(a, radius1);
    const circle2 = new Circle(a, radius2);
    const divider_angles = new ArcAngles(5.0 * FRAC_PI_6, 7.0 * FRAC_PI_6);
    const arc1 = new CircularArc(circle1, divider_angles);
    const arc2 = new CircularArc(circle2, divider_angles);

    // Build the three parts of the candy corn
    const base = new Path([
        line_ab2_b.into(),
        arc_b.into(),
        line_bc.into(),
        arc_c.into(),
        line_c_ac2.into(),
        arc2.reverse().into(),
    ]);
    const mid = new Path([
        line_ab1_ab2.into(),
        arc2.into(),
        line_ac2_ac1.into(),
        arc1.reverse().into(),
    ]);
    const tip = new Path([
        arc_a.into(),
        line_a_ab1.into(),
        arc1.into(),
        line_ac1_a.into(),
    ]);

    const styles = [
        // Yellow base
        Style.fill(255, 255, 0).with_width(0.25),
        // Orange middle
        Style.fill(255, 127, 0).with_width(0.25),
        // White tip
        Style.fill(255, 255, 255).with_width(0.25),
    ];

    const candy_corn = Motif.new([(base, 0), (mid, 1), (tip, 2)]);

    Ok((candy_corn, styles))
}

/// Create a vertical cartoon bone that fits in [-2, 2] x [- (length/2 + 1), (length/2 + 1)]
/// see https://www.desmos.com/calculator/tabdjja814
///
/// Since that's rather large, this shrinks the result down so the epiphyses
/// are at -i and i. So the length parameter really determines the length
/// to width ratio in practice.
export function bone(length: number): Result<Polygon, Box<dyn Error>> {
    const half_width = Complex.ONE;
    const half_height = new Complex(0.0, 0.5 * length);

    // Create four 3/4 circles of radius 1 at the corners of the rectangle. These
    // circles will stick out a little bit. apparently that part of a bone
    // is called an "epiphysis"
    const center_top_right = half_width + half_height;
    const center_bottom_left = -center_top_right;
    const center_top_left = center_bottom_left.conj();
    const center_bottom_right = center_top_right.conj();

    const circle_top_left = new Circle(center_top_left, 1.0);
    const circle_top_right = new Circle(center_top_right, 1.0);
    const circle_bottom_left = new Circle(center_bottom_left, 1.0);
    const circle_bottom_right = new Circle(center_bottom_right, 1.0);

    const angles_top_left = new ArcAngles(0.0, 3.0 * FRAC_PI_2);
    const angles_top_right = new ArcAngles(-FRAC_PI_2, PI);
    const angles_bottom_left = new ArcAngles(FRAC_PI_2, TAU);
    const angles_bottom_right = new ArcAngles(-PI, FRAC_PI_2);
    const arc_top_left = new CircularArc(circle_top_left, angles_top_left);
    const arc_top_right = new CircularArc(circle_top_right, angles_top_right);
    const arc_bottom_left = new CircularArc(circle_bottom_left, angles_bottom_left);
    const arc_bottom_right = new CircularArc(circle_bottom_right, angles_bottom_right);

    const left_side = new LineSegment(
        center_top_left - Complex.I,
        center_bottom_left + Complex.I,
    );
    const right_side = new LineSegment(
        center_bottom_right + Complex.I,
        center_top_right - Complex.I,
    );

    // the bone line's connected to the bone arc
    // the bone arc's connected to the bone arc... 🎵
    const big_bone = new Path([
        right_side.into(),
        arc_top_right.into(),
        arc_top_left.into(),
        left_side.into(),
        arc_bottom_left.into(),
        arc_bottom_right.into(),
    ]);

    const shrink = scale(2.0 / length);

    Ok(big_bone.transform(shrink))
}

/// Create a motif shaped like a witch's hat.
/// It's normalized so it fits in the unit circle
export function witch_hat(): Path {
    // The circles can be found at https://www.desmos.com/calculator/nrdpneh58g
    // The brim of the hat is made from 3 circular arcs
    const circle_brim_bottom = new Circle(Point2P.ZERO, 2.0);
    const circle_brim_left = new Circle(-Complex.ONE, 1.0);
    const circle_brim_right = new Circle(Complex.ONE, 1.0);
    // This hat is very pointy! in fact the angle at the point is 0!
    const circle_point_bottom = new Circle(new Complex(2.0, 1.0), 1.0);
    const circle_point_top = new Circle(new Complex(1.0, 1.0), 2.0);

    // Outline the outside of the hat
    const angles_brim_left = new ArcAngles(FRAC_PI_2, PI);
    const angles_brim_bottom = new ArcAngles(-PI, 0.0);
    const angles_brim_right = new ArcAngles(0.0, FRAC_PI_2);
    const angles_point_bottom = new ArcAngles(PI, 0.0);
    const angles_point_top = new ArcAngles(0.0, PI);
    const arc_brim_left = new CircularArc(circle_brim_left, angles_brim_left);
    const arc_brim_bottom = new CircularArc(circle_brim_bottom, angles_brim_bottom);
    const arc_brim_right = new CircularArc(circle_brim_right, angles_brim_right);
    const arc_point_bottom = new CircularArc(circle_point_bottom, angles_point_bottom);
    const arc_point_top = new CircularArc(circle_point_top, angles_point_top);
    const outside = ClineArcTile.new([
        arc_brim_left.into(),
        arc_brim_bottom.into(),
        arc_brim_right.into(),
        arc_point_bottom.into(),
        arc_point_top.into(),
    ]);

    // Add a band in the middle in a different color to make it look more
    // like a hat
    const circle_band_top = new Circle(new Complex(0.0, 2.0), SQRT_2);
    const circle_band_bottom = new Circle(Complex.I, SQRT_2);

    const angles_band = new ArcAngles(-FRAC_PI_4, -3.0 * FRAC_PI_4);
    const arc_band_top = new CircularArc(circle_band_top, angles_band);
    const band_left = new LineSegment(new Complex(-1.0, 1.0), -Complex.ONE);
    const arc_band_bottom = new CircularArc(circle_band_bottom, angles_band.reverse());
    const band_right = new LineSegment(Complex.ONE, new Complex(1.0, 1.0));

    const band = ClineArcTile.new([
        arc_band_top.into(),
        band_left.into(),
        arc_band_bottom.into(),
        band_right.into(),
    ]);

    const shrink = scale(1.0 / 4.0);

    Ok(Motif.new([(outside, 0), (band, 1)]).transform(shrink))
}

/// Create a skull motif that _nearly_ fits in the unit circle. the teeth
/// stick out a tiny bit.
export function skull(): Path {
    const top_circle = new Circle(Point2P.ORIGIN, 2.0);
    const left_circle = new Circle(-Complex.ONE, 1.0);
    const right_circle = new Circle(Complex.ONE, 1.0);

    const angles_top = new ArcAngles(0.0, PI);
    const angles_left = new ArcAngles(PI, 3.0 * FRAC_PI_2);
    const angles_right = new ArcAngles(-FRAC_PI_2, 0.0);
    const arc_top = new CircularArc(top_circle, angles_top);
    const arc_left = new CircularArc(left_circle, angles_left);
    const arc_right = new CircularArc(right_circle, angles_right);

    const teeth_left = new Complex(-1.0, -1.0);
    const teeth_spacing = new Complex(0.5);
    const bottom_offset = -Complex.I;
    const teeth_bottom = new LineSegment(
        teeth_left + bottom_offset,
        teeth_left + new Complex(4.0) * teeth_spacing + bottom_offset,
    );
    const teeth_verticals: Vec<LineSegment> = (0..5)
        .map(|i| {
            const x_offset = teeth_spacing * new Complex(i as number, 0.0);
            new LineSegment(teeth_left + x_offset, teeth_left + bottom_offset + x_offset)
        })
        .collect();

    const EYE_RADIUS: number = 0.5;
    const EYE_X: number = 0.8;
    const EYE_Y: number = 1.0 / 3.0;
    const left_eye = new Circle(new Complex(-EYE_X, EYE_Y), EYE_RADIUS);
    const right_eye = new Circle(new Complex(EYE_X, EYE_Y), EYE_RADIUS);

    const (left_eye_top, left_eye_bottom) = circle_to_arcs(left_eye);
    const (right_eye_top, right_eye_bottom) = circle_to_arcs(right_eye);

    const skull = new Path([
        arc_right.into(),
        arc_top.into(),
        arc_left.into(),
        teeth_verticals[0].into(),
        teeth_bottom.into(),
        teeth_verticals[4].reverse().into(),
    ]);

    // Detail for the eyes and teeth
    const detail = ClineArcTile.new([
        teeth_verticals[1].into(),
        teeth_verticals[2].into(),
        teeth_verticals[3].into(),
        left_eye_top.into(),
        left_eye_bottom.into(),
        right_eye_top.into(),
        right_eye_bottom.into(),
    ]);

    const shrink = scale(0.5);

    Ok((skull.transform(shrink), detail.transform(shrink)))
}
