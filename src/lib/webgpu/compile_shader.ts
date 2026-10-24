const CONTEXT_RADIUS = 5

function get_context(code: string, line_num: number): string {
  const lines = code.split('\n')

  const start_index = Math.max(line_num - CONTEXT_RADIUS, 0)
  const context_lines = lines.slice(start_index, start_index + 2 * CONTEXT_RADIUS)

  // Note: WGSL line numbers are 1-based so we subtract one
  const labeled = context_lines.map((x, i) => `${start_index + i - 1}: ${x}`)
  return labeled.join('\n')
}

export async function compile_shader(
  device: GPUDevice,
  source_promises: Promise<String>[],
): Promise<GPUShaderModule> {
  const wgsl_text = await Promise.all(source_promises)
  const code = wgsl_text.join('\n')

  const shader_module = device.createShaderModule({ code })
  const compilation_info = await shader_module.getCompilationInfo()
  if (compilation_info.messages.length > 0) {
    let had_error = false
    console.log('Shader compilation log:')
    for (const msg of compilation_info.messages) {
      console.log(`${msg.lineNum}:${msg.linePos} - ${msg.message}`)
      had_error ||= msg.type === 'error'

      if (had_error) {
        const context = get_context(code, msg.lineNum)
        throw new Error(`Shader failed to compile!\n${context}`)
      }
    }
  }

  return shader_module
}
