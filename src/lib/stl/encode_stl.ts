import { SIZE_VEC3F, SIZE_U16, SIZE_U32, SIZE_F32 } from '../binary/data_sizes.js'
import { write_ascii } from '../binary/write_ascii.js'
import type { Vec3 } from '../math/vector/Vec3.js'
import type { TriangleSoup } from '../mesh/TriangleSoup.js'

export const HEADER_SIZE = 80
export const TRIANGLE_SIZE = 4 * SIZE_VEC3F + SIZE_U16

// The STL header can be _anything_... so you know what I have to do...
export const RICKROLL = 'Never gonna give you up / Never gonna let you down'

/**
 * Encode a mesh as an STL file for downloading. Only the positions and normals
 * are included.
 * @param triangles The triangles to include
 * @returns An ArrayBuffer containing the binary data
 */
export function encode_stl(triangles: TriangleSoup): ArrayBuffer {
  const data_size = SIZE_U32 + triangles.length * TRIANGLE_SIZE

  const buffer = new ArrayBuffer(HEADER_SIZE + data_size)
  const data_view = new DataView(buffer)

  write_ascii(data_view, RICKROLL, 0)

  // number of triangles
  const LITTLE_ENDIAN = true
  data_view.setUint32(HEADER_SIZE, triangles.length, LITTLE_ENDIAN)

  let offset = HEADER_SIZE + SIZE_U32
  for (const tri of triangles) {
    // normal
    const { normal, a, b, c } = tri
    data_view.setFloat32(offset, normal.x, LITTLE_ENDIAN)
    data_view.setFloat32(offset + SIZE_F32, normal.y, LITTLE_ENDIAN)
    data_view.setFloat32(offset + 2 * SIZE_F32, normal.z, LITTLE_ENDIAN)
    offset += SIZE_VEC3F

    // vertex a
    data_view.setFloat32(offset, a.x, LITTLE_ENDIAN)
    data_view.setFloat32(offset + SIZE_F32, a.y, LITTLE_ENDIAN)
    data_view.setFloat32(offset + 2 * SIZE_F32, a.z, LITTLE_ENDIAN)
    offset += SIZE_VEC3F

    // vertex b
    data_view.setFloat32(offset, b.x, LITTLE_ENDIAN)
    data_view.setFloat32(offset + SIZE_F32, b.y, LITTLE_ENDIAN)
    data_view.setFloat32(offset + 2 * SIZE_F32, b.z, LITTLE_ENDIAN)
    offset += SIZE_VEC3F

    // vertex c
    data_view.setFloat32(offset, c.x, LITTLE_ENDIAN)
    data_view.setFloat32(offset + SIZE_F32, c.y, LITTLE_ENDIAN)
    data_view.setFloat32(offset + 2 * SIZE_F32, c.z, LITTLE_ENDIAN)
    offset += SIZE_VEC3F

    // no other attributes, so leave the next two bytes at the default (0)
    offset += SIZE_U16
  }

  return buffer
}

/**
 * Encode a mesh as an STL file for downloading. Only the positions and normals
 * are included.
 * @param triangles The triangles to include
 * @param filename The filename
 * @returns A File object suitable for downloading
 */
export function encode_stl_file(triangles: TriangleSoup, filename: string) {
  if (!filename.endsWith('.stl')) {
    throw new Error('filename must end with .stl')
  }

  return new File([encode_stl(triangles)], filename, {
    type: 'model/stl',
  })
}
