import { describe, perfocode, test } from './src'

perfocode('output-file', () => {
  describe('getters vs methods', () => {
    class GetterVsMethod {
      constructor (private _value = 0) {}

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
