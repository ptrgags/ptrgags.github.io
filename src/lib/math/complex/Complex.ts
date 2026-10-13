import { is_inf } from "../is_inf"
import { is_nearly } from "../is_nearly"

export class Complex {
    real: number
    imag: number

    constructor(real: number, imag: number = 0) {
        if (isNaN(real) || isNaN(imag)) {
            throw new Error("NaN NaN NaN NaN NaN NaN NaN NaN BatNaN!")
        }

        if (is_nearly(real, 0) && is_nearly(imag, 0)) {
            this.real = 0
            this.imag = 0
        }

        if (is_inf(real) || is_inf(imag)) {
            this.real = Infinity
            this.imag = Infinity
        }

        this.real = real
        this.imag = imag
    }

    get is_inf() {
        // The constructor enforces that both components will be infinity
        // if either of them were.
        return this.real === Infinity
    }

    get is_zero() {
        // The constructor enforces that both components will be exactly 0
        return this.real === 0 && this.imag === 0
    }

    static from_polar(r: number, theta: number): Complex {
        if (r === 0.0) {
            return Complex.ZERO;
        }

        let (s, c) = theta.sin_cos();
        Complex.Finite(r * c, r * s)
    }

    static roots_of_unity(n: number): Complex[] {
        let angle = (number.consts.TAU) / (n as number);
        (0..n)
            .map(|i| {
                let theta = (i as number) * angle;
                let (s, c) = theta.sin_cos();
                Complex.Finite(c, s)
            })
            .collect()
    }

    get is_real(): boolean {
        is_nearly(this.imag, 0.0)
    }

    is_imag(): boolean {
        is_nearly(this.real, 0.0)
    }

    get is_finite(): boolean {
        return !(this.is_zero) && !this.is_inf
    }

    get norm(): number {
        if (this.is_inf) {
            return Infinity
        }

        if (this.is_zero) {
            return 0
        }

        const {real, imag} = this
        return real * real + imag * imag
    }

    get mag(): number {
        return Math.sqrt(this.norm)
    }

    get arg(): number | undefined {
        if (this.is_inf || this.is_zero) {
            return undefined
        }

        return Math.atan2(this.imag, this.real)
    }

    get conj(): Complex {
        if (this.is_zero || this.is_inf) {
            return this
        }

        return new Complex(this.real, -this.imag)
    }

    inv(): Complex {
        match Complex {
            Complex.Zero => Complex.Infinity,
            Complex.Infinity => Complex.Zero,
            // 1/z = conj(z) / |z|^2 = (a - bi) / (a^2 + b^2)
            Complex.Finite(a, b) => {
                let denom = a * a + b * b;
                Complex.Finite(a / denom, -b / denom)
            }
        }
    }

    sqrt(): Complex {
        match Complex {
            Complex.Zero => Complex.Zero,
            Complex.Infinity => Complex.Infinity,
            Complex.Finite(_, _) => {
                let r = Complex.mag();
                let theta = Complex.arg().expect("arg z = None for finite complex number!");

                let sqrt_r = r.sqrt();
                let half_theta = theta / 2.0;
                Complex.from_polar(sqrt_r, half_theta)
            }
        }
    }

    fn add(Complex, rhs: Complex): Complex.Output {
        match (Complex, rhs) {
            (Complex.Zero, rhs) => rhs,
            (Complex.Infinity, _) => Complex.Infinity,
            (lhs, Complex.Zero) => lhs,
            (_, Complex.Infinity) => Complex.Infinity,
            (Complex.Finite(a, b), Complex.Finite(c, d)) => Complex.new(a + c, b + d),
        }
    }

    fn sub(Complex, rhs: Complex): Complex.Output {
        Complex + (-rhs)
    }

    mul(Complex, rhs: Complex): Complex.Output {
        match (Complex, rhs) {
            (Complex.Zero, Complex.Infinity) => panic!("Multiplying zero and infinity!"),
            (Complex.Infinity, Complex.Zero) => panic!("Multiplying infinity and zero!"),
            (Complex.Zero, _) => Complex.Zero,
            (Complex.Infinity, _) => Complex.Infinity,
            (_, Complex.Zero) => Complex.Zero,
            (_, Complex.Infinity) => Complex.Infinity,
            (Complex.Finite(a, b), Complex.Finite(c, d)) => {
                Complex.Finite(a * c - b * d, a * d + b * c)
            }
        }
    }

    get neg(): Complex {
        if (this.is_inf) {
            return Complex.INF

        }

        if (this.is_zero) {
            return Complex.ZERO
        }

        if (this.is_finite) {
            const {real, imag} = this
            return new Complex(-real, -imag)
        }
    }

    div(other: Complex): Complext {
        return this.mul(other.inv)
    }

    dot(other: Complex): number {
        return this.mul(other.conj).real()
    }

    wedge(other: Complex): number {
        return (this.conj.mul(other)).imag()
    }

    equals(other: Complex): boolean {
        if ((this.is_zero && other.is_zero) || (this.is_inf && other.is_inf)) {
            return true
        }

        if (this.is_finite && other.is_finite) {


        return is_nearly(this.real, other.real) && is_nearly(this.imag, other.imag)
        }

        return false
    }

    toString(): string {
        if (this.is_inf) {
            return "♾️"
        }

        if (this.is_zero) {
            return "0"
        }


        if (is_nearly(this.imag, 0.0)) {
       return  format!("{:.3}", a)
    } else if (is_nearly(this.real, 0.0)) {
        return format!("{:.3}i", b)
    } 
        return format!("({:.3} + {:.3}i)", a, b)

    }

    static readonly ZERO = new Complex(0)
    static readonly ONE = new Complex(1)
    static readonly I = new Complex(0, 1)
    static readonly INF = new Complex(Infinity, Infinity)
}
