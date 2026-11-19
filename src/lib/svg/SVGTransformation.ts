export class SVGTransformation {
  static translate(x: number, y: number): string {
    return `translate(${x} ${y})`
  }

  static rotate(angle_radians: number): string {
    const degrees = (angle_radians * 180) / Math.PI
    return `rotate(${degrees})`
  }

  static scale(x: number, y: number): string {
    return `scale(${x} ${y})`
  }
}
