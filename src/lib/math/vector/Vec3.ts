export interface Vec3 {
  get x(): number
  get y(): number
  get z(): number
}

export function is_vec3(v: any): v is Vec3 {
  return v.x !== undefined && v.y !== undefined && v.z !== undefined
}
