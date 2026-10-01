import * as original from 'lz-string'
import { describe, expect, it } from 'vitest'
import * as esm from '../src/index'

const inputs: Record<string, string> = {
  'empty': '',
  'single char': 'a',
  'repeated': 'Hello, lz-string-es! '.repeat(50),
  'ascii': 'The quick brown fox jumps over the lazy dog',
  'unicode': '你好，世界 🌍 héllo wörld ñ',
  'surrogates': '😀😃😄😁😆'.repeat(10),
  'control chars': '\0\u0001\u0002\n\r\t￿',
  'json': JSON.stringify(Array.from({ length: 200 }, (_, i) => ({ id: i, name: `item-${i}`, tags: ['a', 'b'] }))),
  'pseudo-random': Array.from({ length: 2000 }, (_, i) => String.fromCharCode((i * 7919 + 13) % 65536)).join(''),
}

const encoders = [
  'compress',
  'compressToBase64',
  'compressToUTF16',
  'compressToEncodedURIComponent',
] as const

describe('matches the original lz-string', () => {
  for (const [name, input] of Object.entries(inputs)) {
    describe(name, () => {
      for (const fn of encoders) {
        it(fn, () => {
          const compressed = esm[fn](input)
          expect(compressed).toBe(original[fn](input))
        })
      }

      it('compressToUint8Array', () => {
        expect(esm.compressToUint8Array(input)).toEqual(original.compressToUint8Array(input))
      })

      it('cross decompress', () => {
        expect(esm.decompress(original.compress(input))).toBe(input)
        expect(original.decompress(esm.compress(input))).toBe(input)
        expect(esm.decompressFromBase64(original.compressToBase64(input))).toBe(input)
        expect(esm.decompressFromUTF16(original.compressToUTF16(input))).toBe(input)
        expect(esm.decompressFromEncodedURIComponent(original.compressToEncodedURIComponent(input))).toBe(input)
        expect(esm.decompressFromUint8Array(original.compressToUint8Array(input))).toBe(input)
      })
    })
  }

  describe('invalid input', () => {
    const bad = [null, '', 'not valid!!', '@@@@']
    for (const fn of ['decompress', 'decompressFromBase64', 'decompressFromUTF16', 'decompressFromEncodedURIComponent'] as const) {
      it(fn, () => {
        for (const value of bad)
          expect(esm[fn](value as any)).toEqual(original[fn](value as any))
      })
    }
  })
})
