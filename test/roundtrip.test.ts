import { describe, expect, it } from 'vitest'
import { compress, compressToBase64, compressToEncodedURIComponent, compressToUint8Array, compressToUTF16, decompress, decompressFromBase64, decompressFromEncodedURIComponent, decompressFromUint8Array, decompressFromUTF16 } from '../src/index'

const input = 'Hello, lz-string-es! '.repeat(20)

describe('round trip', () => {
  it.each([
    ['raw', compress, decompress],
    ['base64', compressToBase64, decompressFromBase64],
    ['uri', compressToEncodedURIComponent, decompressFromEncodedURIComponent],
    ['utf16', compressToUTF16, decompressFromUTF16],
    ['uint8array', compressToUint8Array, decompressFromUint8Array],
  ] as const)('%s', (_, c, d) => {
    expect(d(c(input) as any)).toBe(input)
  })
})
