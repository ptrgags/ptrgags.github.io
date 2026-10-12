#[cfg(test)]
mod test {
    use super::*;
    use test_case::test_case;

    #[test]
    pub fn missing_tests() {
        todo!("wedge tests");
    }

    #[test_case(-3.0, f64::NAN; "NaN in imaginary part")]
    #[test_case(f64::NAN, 3.0; "NaN in real part")]
    #[test_case(f64::NAN, f64::NAN; "NaN in both components")]
    #[should_panic]
    pub fn new_panics_for_nan(real: f64, imag: f64) {
        Complex::new(real, imag);
    }

    #[test_case(f64::INFINITY, 3.0; "inf in real part")]
    #[test_case(-f64::INFINITY, 3.0; "neg inf in real part")]
    #[test_case(4.0, f64::INFINITY; "inf in imag part")]
    #[test_case(4.0, -f64::INFINITY; "neg inf in imag part")]
    #[test_case(f64::INFINITY, -f64::INFINITY; "inf in both parts")]
    pub fn new_returns_infinity_for_infinite_component(real: f64, imag: f64) {
        let result = Complex::new(real, imag);

        assert_eq!(result, Complex::Infinity)
    }

    #[test]
    pub fn new_returns_zero_for_exactly_zero() {
        let result = Complex::new(0.0, 0.0);

        assert_eq!(result, Complex::Zero);
    }

    #[test_case(1.0, 0.0; "1")]
    #[test_case(-1.0, 0.0; "negative 1")]
    #[test_case(0.0, 1.0; "i")]
    #[test_case(3.0, -4.0; "arbitrary complex number")]
    pub fn new_returns_finite_for_other_values(real: f64, imag: f64) {
        let result = Complex::new(real, imag);

        assert_eq!(result, Complex::Finite(real, imag));
    }

    #[test]
    pub fn from_polar_computes_one() {
        let result = Complex::from_polar(1.0, 0.0);

        assert_eq!(result, Complex::Finite(1.0, 0.0));
    }

    #[test]
    pub fn from_polar_computes_i() {
        let result = Complex::from_polar(1.0, f64::consts::FRAC_PI_2);

        assert_eq!(result, Complex::Finite(0.0, 1.0));
    }

    #[test]
    pub fn from_polar_computes_arbitrary_point() {
        let result = Complex::from_polar(2.0, f64::consts::FRAC_PI_3);

        // From high school trig, a 30 degree angle will give (cos, sin) = (1/2, sqrt(3)/2)
        // but the radius of 2 clears the denominator
        let expected = Complex::Finite(1.0, (3.0f64).sqrt());
        assert_eq!(result, expected);
    }

    #[test]
    pub fn is_finite_with_infinity_returns_false() {
        let result = Complex::Infinity.is_finite();

        assert!(!result);
    }

    #[test]
    pub fn is_finite_with_zero_returns_true() {
        let result = Complex::Zero.is_finite();

        assert!(result);
    }

    #[test]
    pub fn is_finite_with_finite_complex_returns_true() {
        let result = Complex::Finite(1.0, 2.0).is_finite();

        assert!(result);
    }

    #[test]
    pub fn sum_of_additive_inverses_is_zero() {
        let a = Complex::Finite(3.0, 4.0);
        let b = Complex::Finite(-3.0, -4.0);

        let sum = a + b;

        assert_eq!(sum, Complex::Zero);
    }

    #[test]
    pub fn sum_of_finites_is_finite() {
        let a = Complex::Finite(10.0, 2.0);
        let b = Complex::Finite(3.0, 5.0);

        let sum = a + b;

        assert_eq!(sum, Complex::Finite(13.0, 7.0));
    }

    #[test]
    pub fn display_formats_zero_as_zero() {
        let result = format!("{}", Complex::Zero);

        assert_eq!(result, "0")
    }

    #[test]
    pub fn display_formats_infinity_as_emoji() {
        let result = format!("{}", Complex::Infinity);

        assert_eq!(result, "♾️")
    }

    #[test_case(Complex::Zero; "zero")]
    #[test_case(Complex::Infinity; "infinity")]
    pub fn sqrt_fixes_poles(pole: Complex) {
        let result = pole.sqrt();

        assert_eq!(result, pole)
    }
}
