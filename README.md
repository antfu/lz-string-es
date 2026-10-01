# lz-string-es

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

An ESM-only build of [lz-string](https://github.com/pieroxy/lz-string), the LZ-based compression library for JavaScript.

## About

This package is **not a fork or a rewrite**. The original [`pieroxy/lz-string`](https://github.com/pieroxy/lz-string) repository is included as a git submodule in [`vendor/lz-string`](./vendor/lz-string) and stays the single source of truth for the algorithm. `src/index.ts` only re-exports its APIs, and [tsdown](https://tsdown.dev) recompiles and bundles them from that TypeScript source into a modern distribution:

- ESM only
- Named exports only (no default export), tree-shakable, `sideEffects: false`
- Bundled type declarations
- No Node.js dependency: the `loadBinaryFile` / `saveBinaryFile` helpers and the CLI are not included

Any fix or change to the compression logic belongs upstream.

## Install

```bash
npm i lz-string-es
```

## Usage

```ts
import { compressToBase64, decompressFromBase64 } from 'lz-string-es'

const compressed = compressToBase64('Hello, Hello, Hello, Hello!')
const text = decompressFromBase64(compressed)
```

The API is the same as `lz-string`: `compress`, `compressToBase64`, `compressToUTF16`, `compressToUint8Array`, `compressToEncodedURIComponent`, `compressToCustom`, and their `decompress*` counterparts. See the [upstream documentation](http://pieroxy.net/blog/pages/lz-string/index.html) for details.

### Usage as an object

As `lz-string-es` no longer ships a default export, you need to import it as an object to access all its functions.

```ts
import * as lz from 'lz-string-es'

const compressed = lz.compressToBase64('Hello, Hello, Hello, Hello!')
const text = lz.decompressFromBase64(compressed)
```

### loadBinaryFile / saveBinaryFile

The `loadBinaryFile` and `saveBinaryFile` helpers are not included in this package, as it has no Node.js dependency. You can implement them with:

```ts
import { readFileSync, writeFileSync } from 'node:fs'
import { convertFromUint8Array, convertToUint8Array } from 'lz-string-es'

export function saveBinaryFile(fileName: PathOrFileDescriptor, data: string | Uint8Array) {
  writeFileSync(fileName, typeof data === 'string' ? convertToUint8Array(data)! : data, null)
}

export function loadBinaryFile(fileName: PathOrFileDescriptor) {
  return convertFromUint8Array(readFileSync(fileName, null))
}
```

## Development

```bash
git clone --recurse-submodules https://github.com/antfu/lz-string-es.git
pnpm install # also runs `git submodule update --init` via the prepare script
pnpm build
```

To update to the latest upstream:

```bash
git -C vendor/lz-string pull origin master
git add vendor/lz-string
```

## Credits

All credit for the compression algorithm and its implementation goes to [Pieroxy](https://github.com/pieroxy) and the [lz-string contributors](https://github.com/pieroxy/lz-string/graphs/contributors). The algorithm is based on LZ compression; this package only changes how it is distributed.

## ## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg" alt="Sponsors"/>
  </a>
</p>

## License

[MIT](./LICENSE.md) License

- © 2013 [Pieroxy](https://github.com/pieroxy), original [lz-string](https://github.com/pieroxy/lz-string)
- © 2025-PRESENT [Anthony Fu](https://github.com/antfu), ESM distribution

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/lz-string-es?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmx.dev/package/lz-string-es
[npm-downloads-src]: https://img.shields.io/npm/dm/lz-string-es?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmx.dev/package/lz-string-es
[bundle-src]: https://img.shields.io/bundlephobia/minzip/lz-string-es?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=lz-string-es
[license-src]: https://img.shields.io/github/license/antfu/lz-string-es.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/antfu/lz-string-es/blob/main/LICENSE.md
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/lz-string-es
