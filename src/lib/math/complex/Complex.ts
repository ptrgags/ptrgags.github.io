use core::f64;
use std::fmt::{self, Display};
use std::ops::{Add, Div, Mul, Neg, Sub};

use crate::nearly::is_nearly;
use crate::quantize::quantize;
use crate::quantized_hash::QuantizedHash;

#[derive(Copy, Clone, Debug)]
pub enum Complex {
    Zero,
    Finite(f64, f64),
    Infinity,
}

impl Complex {
    pub const EPSILON: f64 = 1e-15;
    pub const ONE: Self = Complex::Finite(1.0, 0.0);
    pub const I: Self = Complex::Finite(0.0, 1.0);

    pub fn new(real: f64, imag: f64) -> Complex {
        if f64::is_nan(real) || f64::is_nan(imag) {
            panic!("NaN NaN NaN NaN NaN NaN NaN NaN BatNaN!");
        }

        if f64::is_infinite(real) || f64::is_infinite(imag) {
            Complex::Infinity
        } else if is_nearly(real, 0.0) && is_nearly(imag, 0.0) {
            Complex::Zero
        } else {
            Complex::Finite(real, imag)
        }
    }

    pub fn from_polar(r: f64, theta: f64) -> Complex {
        if r == 0.0 {
            return Complex::Zero;
        }

        let (s, c) = theta.sin_cos();
        Complex::Finite(r * c, r * s)
    }

    pub fn roots_of_unity(n: usize) -> Vec<Complex> {
        let angle = (f64::consts::TAU) / (n as f64);
        (0..n)
            .map(|i| {
                let theta = (i as f64) * angle;
                let (s, c) = theta.sin_cos();
                Complex::Finite(c, s)
            })
            .collect()
    }

    pub fn real(&self) -> f64 {
        match self {
            Complex::Zero => 0.0,
            Complex::Infinity => f64::INFINITY,
            Complex::Finite(real, _) => *real,
        }
    }

    pub fn imag(&self) -> f64 {
        match self {
            Complex::Zero => 0.0,
            Complex::Infinity => f64::INFINITY,
            Complex::Finite(_, imag) => *imag,
        }
    }

    pub fn is_real(&self) -> bool {
        is_nearly(self.imag(), 0.0)
    }

    pub fn is_imag(&self) -> bool {
        is_nearly(self.real(), 0.0)
    }

    pub fn is_finite(&self) -> bool {
        !matches!(self, Self::Infinity)
    }

    pub fn norm(&self) -> f64 {
        match self {
            Complex::Zero => 0.0,
            Complex::Infinity => f64::INFINITY,
            Complex::Finite(a, b) => a * a + b * b,
        }
    }

    pub fn mag(&self) -> f64 {
        self.norm().sqrt()
    }

    pub fn arg(&self) -> Option<f64> {
        match self {
            Complex::Zero => None,
            Complex::Infinity => None,
            Complex::Finite(a, b) => Some(b.atan2(*a)),
        }
    }

    pub fn conj(&self) -> Self {
        match self {
            Complex::Zero => Complex::Zero,
            Complex::Infinity => Complex::Infinity,
            Complex::Finite(a, b) => Complex::Finite(*a, -b),
        }
    }

    pub fn inverse(&self) -> Self {
        match self {
            Complex::Zero => Complex::Infinity,
            Complex::Infinity => Complex::Zero,
            // 1/z = conj(z) / |z|^2 = (a - bi) / (a^2 + b^2)
            Complex::Finite(a, b) => {
                let denom = a * a + b * b;
                Complex::Finite(a / denom, -b / denom)
            }
        }
    }

    pub fn sqrt(&self) -> Self {
        match self {
            Complex::Zero => Complex::Zero,
            Complex::Infinity => Complex::Infinity,
            Complex::Finite(_, _) => {
                let r = self.mag();
                let theta = self.arg().expect("arg z = None for finite complex number!");

                let sqrt_r = r.sqrt();
                let half_theta = theta / 2.0;
                Complex::from_polar(sqrt_r, half_theta)
            }
        }
    }

    pub fn dot(a: Complex, b: Complex) -> f64 {
        (a * b.conj()).real()
    }

    pub fn wedge(a: Complex, b: Complex) -> f64 {
        (a.conj() * b).imag()
    }
}

// For convenience, Complex::from(x) creates
// a real number
impl From<f64> for Complex {
    fn from(value: f64) -> Self {
        Self::new(value, 0.0)
    }
}

impl Add for Complex {
    type Output = Complex;

    fn add(self, rhs: Self) -> Self::Output {
        match (self, rhs) {
            (Complex::Zero, rhs) => rhs,
            (Complex::Infinity, _) => Complex::Infinity,
            (lhs, Complex::Zero) => lhs,
            (_, Complex::Infinity) => Complex::Infinity,
            (Complex::Finite(a, b), Complex::Finite(c, d)) => Complex::new(a + c, b + d),
        }
    }
}

impl Neg for Complex {
    type Output = Complex;

    fn neg(self) -> Self::Output {
        match self {
            Complex::Finite(a, b) => Complex::Finite(-a, -b),
            x => x,
        }
    }
}

impl Sub for Complex {
    type Output = Self;

    fn sub(self, rhs: Self) -> Self::Output {
        self + (-rhs)
    }
}

impl Mul for Complex {
    type Output = Complex;

    fn mul(self, rhs: Self) -> Self::Output {
        match (self, rhs) {
            (Complex::Zero, Complex::Infinity) => panic!("Multiplying zero and infinity!"),
            (Complex::Infinity, Complex::Zero) => panic!("Multiplying infinity and zero!"),
            (Complex::Zero, _) => Complex::Zero,
            (Complex::Infinity, _) => Complex::Infinity,
            (_, Complex::Zero) => Complex::Zero,
            (_, Complex::Infinity) => Complex::Infinity,
            (Complex::Finite(a, b), Complex::Finite(c, d)) => {
                Complex::Finite(a * c - b * d, a * d + b * c)
            }
        }
    }
}

impl Div for Complex {
    type Output = Complex;

    // Division is multiplying by the reciprocal. :P
    #[allow(clippy::suspicious_arithmetic_impl)]
    fn div(self, rhs: Self) -> Self::Output {
        self * rhs.inverse()
    }
}

fn format_finite_complex(a: f64, b: f64) -> String {
    if is_nearly(b, 0.0) {
        format!("{:.3}", a)
    } else if is_nearly(a, 0.0) {
        format!("{:.3}i", b)
    } else {
        format!("({:.3} + {:.3}i)", a, b)
    }
}

impl Display for Complex {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let pretty_str = match self {
            Complex::Zero => String::from("0"),
            Complex::Infinity => String::from("♾️"),
            Complex::Finite(a, b) => format_finite_complex(*a, *b),
        };
        write!(f, "{}", pretty_str)
    }
}

impl PartialEq for Complex {
    fn eq(&self, other: &Self) -> bool {
        match (self, other) {
            (Self::Finite(a, b), Self::Finite(c, d)) => is_nearly(*a, *c) && is_nearly(*b, *d),
            (Self::Zero, Self::Zero) => true,
            (Self::Infinity, Self::Infinity) => true,
            _ => false,
        }
    }
}
