# perfocode
[![NPM](https://img.shields.io/npm/v/perfocode.svg)](https://github.com/d8corp/perfocode/blob/master/CHANGELOG.md)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/perfocode)](https://bundlephobia.com/result?p=perfocode)
[![downloads](https://img.shields.io/npm/dm/perfocode.svg)](https://www.npmjs.com/package/perfocode)
[![license](https://img.shields.io/npm/l/perfocode)](https://github.com/d8corp/perfocode/blob/master/LICENSE)  
The simplest performance checker.
### Installation
npm
```bash
npm i perfocode
```
yarn
```bash
yarn add perfocode
```
### Using
```javascript
const {perfocode, describe, test} = require('perfocode')

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
`perfocode` creates JSON file with results of testing.  
Any next running will compare with the file, show the difference and save new results.  
You can run `describe` and `test` anywhere.  

![](https://raw.githubusercontent.com/d8corp/perfocode/main/1.png)  

You can change testing timeout by 3rd argument of `perfocode`, `describe` and `test`
```javascript
test('empty', () => {}, 1000)
```
## Issues
If you find a bug or have a suggestion, please file an issue on [GitHub](https://github.com/d8corp/perfocode/issues)  
[![issues](https://img.shields.io/github/issues-raw/d8corp/perfocode)](https://github.com/d8corp/perfocode/issues)  
> ---
[![stars](https://img.shields.io/github/stars/d8corp/perfocode?style=social)](https://github.com/d8corp/perfocode/stargazers)
[![watchers](https://img.shields.io/github/watchers/d8corp/perfocode?style=social)](https://github.com/d8corp/perfocode/watchers)

