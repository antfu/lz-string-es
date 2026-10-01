import { _compress } from '../vendor/lz-string/src/_compress'
import { _decompress } from '../vendor/lz-string/src/_decompress'
import { compressToBase64, decompressFromBase64 } from '../vendor/lz-string/src/base64'
import { compressToCustom, decompressFromCustom } from '../vendor/lz-string/src/custom'
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from '../vendor/lz-string/src/encodedURIComponent'
import { compress, decompress } from '../vendor/lz-string/src/raw'
import { compressToUint8Array, convertFromUint8Array, convertToUint8Array, decompressFromUint8Array } from '../vendor/lz-string/src/Uint8Array'
import { compressToUTF16, decompressFromUTF16 } from '../vendor/lz-string/src/UTF16'

// The Node-only file helpers (`loadBinaryFile` / `saveBinaryFile`) are left out
// so the bundle has no `node:fs` dependency and runs in any runtime.
export {
  _compress,
  _decompress,
  compress,
  compressToBase64,
  compressToCustom,
  compressToEncodedURIComponent,
  compressToUint8Array,
  compressToUTF16,
  convertFromUint8Array,
  convertToUint8Array,
  decompress,
  decompressFromBase64,
  decompressFromCustom,
  decompressFromEncodedURIComponent,
  decompressFromUint8Array,
  decompressFromUTF16,
}

export default {
  _compress,
  _decompress,
  compress,
  compressToBase64,
  compressToCustom,
  compressToEncodedURIComponent,
  compressToUint8Array,
  compressToUTF16,
  convertFromUint8Array,
  convertToUint8Array,
  decompress,
  decompressFromBase64,
  decompressFromCustom,
  decompressFromEncodedURIComponent,
  decompressFromUint8Array,
  decompressFromUTF16,
}
