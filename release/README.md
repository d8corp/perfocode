<h1 align="center">Perfocode</h1>

<p align="center">Performance Testing Engine</p>

<br>

<div align="center">
  <a href="https://www.npmjs.com/package/perfocode" target="_blank">
    <img src="https://img.shields.io/npm/v/perfocode.svg" alt="perfocode npm">
  </a>
  <a href="https://www.npmtrends.com/perfocode" target="_blank">
    <img src="https://img.shields.io/npm/dm/perfocode.svg" alt="perfocode downloads">
  </a>
  <a href="https://github.com/d8corp/perfocode/tree/master/release" target="_blank">
    <img src="https://packagephobia.com/badge?p=perfocode" alt="perfocode install size">
  </a>
  <a href="https://www.typescriptlang.org" target="_blank">
    <img src="https://img.shields.io/npm/types/perfocode" alt="TypeScript">
  </a>
  <a href="https://github.com/d8corp/perfocode/blob/master/LICENSE" target="_blank">
    <img src="https://img.shields.io/npm/l/perfocode" alt="perfocode license">
  </a>
  <a href="https://github.com/d8corp/perfocode/blob/master/CHANGELOG.md" target="_blank">
    <img src="https://img.shields.io/badge/Changelog-⋮-brightgreen" alt="perfocode changelog">
  </a>
</div>
<br>

`perfocode` is a **visual performance testing tool** for comparing code execution speed across runs.

- **Visual** — Color-coded performance deltas with progress bars
- **Comparative** — Shows min, max, average, and current values vs previous runs
- **Configurable** — Environment variables and options for customization
- **Type-safe** — Full TypeScript support
- **Zero-dependency** — Only requires `chalk` for terminal colors
- **GC-aware** — Optional garbage collection control for accurate results
- **Interactive** — Save results to JSON for future comparisons

Use it to benchmark getters vs methods, optimize algorithms, or track performance regressions.

[![stars](https://img.shields.io/github/stars/d8corp/perfocode?style=social)](https://github.com/d8corp/perfocode/stargazers)
[![watchers](https://img.shields.io/github/watchers/d8corp/perfocode?style=social)](https://github.com/d8corp/perfocode/watchers)

## Index

<sup>**[ [Install](#install) ]**</sup>  
<sup>**[ [Usage](#usage) ]** [Basic example](#basic-example) • [Compare mode](#compare-mode) • [Visual output](#visual-output)</sup>  
<sup>**[ [API](#api) ]** [perfocode](#perfocode) • [describe](#describe) • [test](#test)</sup>  
<sup>**[ [Configuration](#configuration) ]** [Environment variables](#environment-variables) • [Options](#options) • [Limits](#limits) • [Columns](#columns)</sup>  
<sup>**[ [TypeScript](#typescript) ]**</sup>  
<sup>**[ [Issues](#issues) ]**</sup>

## Install
###### [🏠︎](#index) / Install [↓](#usage)

npm
```shell
npm i perfocode -D
```

yarn
```shell
yarn add perfocode -D
```

## Usage
###### [🏠︎](#index) / Usage [↑](#install) [↓](#api)

<sup>[Basic example](#basic-example) • [Compare mode](#compare-mode) • [Visual output](#visual-output)</sup>

### Basic example
###### [🏠︎](#index) / [Usage](#usage) / Basic example [↓](#compare-mode)

Create a test file to compare performance of different approaches.

```javascript
const { perfocode, describe, test } = require('perfocode')

perfocode('output-file', () => {
  describe('getters vs methods', () => {
    class GetterVsMethod {
      constructor () {
        this._value = 0
      }
      get value () {
        return this._value
      }
      getValue () {
        return this._value
      }
    }

    const getterVsMethod = new GetterVsMethod()

    test('getter', () => getterVsMethod.value)
    test('method', () => getterVsMethod.getValue())
  })
})
```

Run the file:
```bash
node index.js
```

On first run, you'll see current results only:

```
Compare with [output-file]: 
╒ getters vs methods
│┌──────────┬────────────┬──────────────┬──────────────────────┬───────┬──────────────────────────────────────┬──────┐
││ ✔ getter │ 38806.0133 │ Σ 38806.0133 │ ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰ │ 100%  │ 38806.0133 → 38806.0133 ← 38806.0133 │ Δ 0% │
││ ✔ method │ 36652.7467 │ Σ 36652.7467 │ ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▱ │ 94.5% │ 36652.7467 → 36652.7467 ← 36652.7467 │ Δ 0% │
│└──────────┴────────────┴──────────────┴──────────────────────┴───────┴──────────────────────────────────────┴──────┘
╘ getters vs methods: getter [38806.0133]
Do you want to save results? [Y/n]: 
```

Press `enter` to save results to `output-file.json`.

### Compare mode
###### [🏠︎](#index) / [Usage](#usage) / Compare mode [↑](#basic-example) [↓](#visual-output)

Run the test again to see the difference between current and previous results:

```
Compare with [output-file]: 
╒ getters vs methods
│┌──────────┬───────────────────┬─────────────────────┬──────────────────────┬───────┬────────────────────────────────────────────┬─────────┐
││ ✔ method │ 42809.78 ↑ 16.8%  │ Σ 39731.2633 ↑ 8.4% │ ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰ │ 100%  │ 36652.7467 → 39731.2633 ← 42809.78 ↑ 16.8% │ Δ 15.5% │
││ ✔ getter │ 38911.1767 ↑ 0.3% │ Σ 38858.595 ↑ 0.1%  │ ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰ │ 97.8% │ 38806.0133 → 38858.595 ← 38911.1767 ↑ 0.3% │ Δ 0.3%  │
│└──────────┴───────────────────┴─────────────────────┴──────────────────────┴───────┴────────────────────────────────────────────┴─────────┘
╘ getters vs methods: method [39731.2633]
Do you want to save results? [Y/n]: 
```

### Visual output
###### [🏠︎](#index) / [Usage](#usage) / Visual output [↑](#compare-mode)

Modify the test to see performance changes:

```javascript
const { perfocode, describe, test } = require('perfocode')

perfocode('output-file', () => {
  describe('getters vs methods', () => {
    class GetterVsMethod {
      constructor () {
        this._value = 0
      }
      get value () {
        for (let i = 0; i < 1000; i++) {}
        return this._value
      }
      getValue () {
        return this._value
      }
    }

    const getterVsMethod = new GetterVsMethod()

    test('getter', () => getterVsMethod.value)
    test('method', () => getterVsMethod.getValue())
  })
})
```

Performance degradation:

```
Compare with [output-file]: 
╒ getters vs methods
│┌──────────┬───────────────────┬──────────────────────┬──────────────────────┬───────┬─────────────────────────────────────────────┬─────────────────┐
││ ✔ method │ 43488.9367 ↑ 9.5% │ Σ 41610.1 ↑ 4.7%     │ ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰ │ 100%  │ 36652.7467 → 40070.8417 ← 43488.9367 ↑ 1.6% │ Δ 17.1% ↑ 10.1% │
││ ✔ getter │ 2598.4933 ↓ 93.3% │ Σ 20728.5442 ↓ 46.7% │ ▰▰▰▰▰▰▰▰▰▰▱▱▱▱▱▱▱▱▱▱ │ 49.8% │ 2598.4933 → 20754.835 ← 38911.1767 ↓ 93.3%  │ Δ 175% ↑ 64549% │
│└──────────┴───────────────────┴──────────────────────┴──────────────────────┴───────┴─────────────────────────────────────────────┴─────────────────┘
╘ getters vs methods: method [41610.1]
Do you want to save results? [Y/n]: 
```

## API
###### [🏠︎](#index) / API [↑](#usage) [↓](#configuration)

<sup>[perfocode](#perfocode) • [describe](#describe) • [test](#test)</sup>

### perfocode
###### [🏠︎](#index) / [API](#api) / perfocode [↓](#describe)

Main function that wraps test suites. Accepts output filename, callback, and optional timeout/options.

```ts
perfocode(output: string, callback: Callback, timeout?: TimeoutOption)
```

**Parameters:**
- `output` — Filename for saving results (without `.json` extension)
- `callback` — Function containing `describe` and `test` calls
- `timeout` — Timeout in ms (default: `300`) or options object

**Example:**
```javascript
perfocode('benchmark', () => {
  describe('my tests', () => {
    test('fast', () => { /* ... */ })
    test('slow', () => { /* ... */ })
  })
}, 500)
```

### describe
###### [🏠︎](#index) / [API](#api) / describe [↑](#perfocode) [↓](#test)

Groups related tests together. Displays as a section in output.

```typescript
describe(name: string, callback: Callback, timeout?: TimeoutOption)
```

**Parameters:**
- `name` — Section name for display
- `callback` — Function containing `test` calls
- `timeout` — Timeout in ms or options object

**Example:**
```javascript
describe('array methods', () => {
  test('forEach', () => { /* ... */ })
  test('map', () => { /* ... */ })
})
```

### test
###### [🏠︎](#index) / [API](#api) / test [↑](#describe)

Single performance test. Executes callback and measures operations per millisecond.

```typescript
test(name: string, callback: Callback, options?: TestOptions | number)
```

**Parameters:**
- `name` — Test name for display
- `callback` — Function to benchmark
- `options` — Timeout in ms or options object with `timeout` and `highlight`

**Example:**
```javascript
test('loop', () => {
  for (let i = 0; i < 1000; i++) {}
})

test('highlighted', () => {
  // Important test
}, { timeout: 1000, highlight: true })
```

## Configuration
###### [🏠︎](#index) / Configuration [↑](#api) [↓](#typescript)

<sup>[Environment variables](#environment-variables) • [Options](#options) • [Limits](#limits) • [Columns](#columns)</sup>

### Environment variables
###### [🏠︎](#index) / [Configuration](#configuration) / Environment variables [↓](#options)

Customize output and behavior via environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `PERFOCODE_PROGRESS_ICON` | `▰` | Icon for progress bar filled part |
| `PERFOCODE_PROGRESS_END_ICON` | `▱` | Icon for progress bar empty part |
| `PERFOCODE_SUCCESS_STATUS_ICON` | `✔` | Icon for successful test |
| `PERFOCODE_ERROR_STATUS_ICON` | `✘` | Icon for failed test |
| `PERFOCODE_WARNING_STATUS_ICON` | `⚠` | Icon for warning |
| `PERFOCODE_DELTA_ICON` | `Δ` | Icon for delta values |
| `PERFOCODE_TIMEOUT` | `300` | Default timeout in ms |
| `PERFOCODE_THROW_ERROR` | `false` | Throw errors instead of catching |
| `PERFOCODE_PREVENT_GC` | `false` | Prevent garbage collection |
| `PERFOCODE_NO_ASK` | `false` | Skip interactive prompts |
| `PERFOCODE_LOGGING` | `false` | Enable detailed logging |
| `PERFOCODE_LIMITS` | `{}` | Custom limits as JSON |
| `PERFOCODE_COLUMNS` | (default) | Custom column layout |

**Example:**
```bash
PERFOCODE_TIMEOUT=1000 PERFOCODE_NO_ASK=true node index.js
```

### Options
###### [🏠︎](#index) / [Configuration](#configuration) / Options [↑](#environment-variables) [↓](#limits)

Pass options as third argument to `perfocode`, `describe`, or `test`:

```typescript
interface Options {
  timeout?: number        // Timeout in ms
  throwError?: boolean    // Throw errors instead of catching
  preventGC?: boolean     // Prevent garbage collection
  noAsk?: boolean         // Skip interactive prompts
  logging?: boolean       // Enable detailed logging
  limits?: Limits         // Custom limits
  columns?: string[]      // Custom column layout
}
```

**Example:**
```javascript
test('critical', () => {
  // Important benchmark
}, {
  timeout: 1000,
  throwError: true,
  highlight: true
})
```

### Limits
###### [🏠︎](#index) / [Configuration](#configuration) / Limits [↑](#options) [↓](#columns)

Define thresholds for color-coding performance:

```typescript
interface Limits {
  delta: Limit        // Delta (variation) thresholds
  deltaDelta: Limit   // Delta change thresholds
  progress: Limit     // Progress bar thresholds
  valueDelta: Limit   // Value change thresholds
  currentDelta: Limit // Current vs previous thresholds
  minDelta: Limit     // Min change thresholds
  maxDelta: Limit     // Max change thresholds
}

interface Limit {
  invert?: boolean    // Invert color logic
  awesome: number     // Best performance
  great: number
  good: number
  normal: number
  poor: number
  bad: number
  critical: number    // Worst performance
}
```

**Default limits:**
```javascript
{
  delta: { awesome: 0, great: 0, good: 0, normal: 0, poor: -10, bad: -20, critical: -30 },
  deltaDelta: { invert: true, awesome: 0, great: 0, good: 0, normal: 0, poor: 5, bad: 50, critical: 75 },
  progress: { awesome: 90, great: 75, good: 50, normal: 50, poor: 50, bad: 25, critical: 10 },
  valueDelta: { awesome: 15, great: 10, good: 5, normal: 5, poor: -5, bad: -10, critical: -15 },
  currentDelta: { awesome: 15, great: 10, good: 5, normal: 5, poor: -5, bad: -10, critical: -15 },
  minDelta: { awesome: 15, great: 10, good: 5, normal: 5, poor: -5, bad: -10, critical: -15 },
  maxDelta: { awesome: 15, great: 10, good: 5, normal: 5, poor: -5, bad: -10, critical: -15 }
}
```

### Columns
###### [🏠︎](#index) / [Configuration](#configuration) / Columns [↑](#limits) [↓](#typescript)

Customize output table columns using placeholders:

**Default columns:**
```javascript
[
  '{statusIcon} {name}',
  '{current}{currentDelta}',
  'Σ {value}{valueDelta}',
  '{progressStart}{progressEnd}',
  '{progressDelta}',
  '{min} → {average} ← {max}{minDelta}{maxDelta}',
  '{deltaIcon} {delta}{deltaDelta}',
]
```

**Placeholders:**
- `{name}` — Test name
- `{current}` — Current value
- `{value}` — Average value
- `{min}`, `{max}` — Min/max values
- `{average}` — Average value
- `{prev}`, `{prevMin}`, `{prevMax}`, `{prevAverage}` — Previous values
- `{delta}`, `{prevDelta}`, `{deltaDelta}` — Delta values
- `{valueDelta}`, `{currentDelta}`, `{minDelta}`, `{maxDelta}` — Value changes
- `{progressStart}`, `{progressEnd}` — Progress bar
- `{statusIcon}`, `{deltaIcon}`, `{prevDeltaIcon}` — Icons

**Example:**
```bash
PERFOCODE_COLUMNS="{name} | {value} | {delta}" node index.js
```

**Output:**
```
Compare with [output-file]: 
╒ getters vs methods
│┌────────┬────────────┬──────────────────────┐
││ method │ 42604.9383 │ ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰ │
││ getter │ 11676.1821 │ ▰▰▰▰▰▰               │
│└────────┴────────────┴──────────────────────┘
╘ getters vs methods: method [42604.9383]
Do you want to save results? [Y/n]: 
```

## TypeScript
###### [🏠︎](#index) / TypeScript [↑](#configuration) [↓](#issues)

Full TypeScript support with type inference:

```typescript
import { perfocode, describe, test, type Callback } from 'perfocode'

const benchmark: Callback = () => {
  describe('performance', () => {
    test('fast', () => {
      // Optimized code
    })
    
    test('slow', () => {
      // Unoptimized code
    }, 1000)
  })
}

perfocode('results', benchmark, { timeout: 500 })
```

## Issues
###### [🏠︎](#index) / Issues [↑](#typescript)

If you find a bug or have a suggestion, please file an issue on [GitHub](https://github.com/d8corp/perfocode/issues).

[![issues](https://img.shields.io/github/issues-raw/d8corp/perfocode)](https://github.com/d8corp/perfocode/issues)
