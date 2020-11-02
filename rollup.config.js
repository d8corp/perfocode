import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

const def = {
  input: {
    index: 'src/index.ts',
    describe: 'src/describe.ts',
    getDeep: 'src/getDeep.ts',
    performance: 'src/performance.ts',
    perfocode: 'src/perfocode.ts',
    scope: 'src/scope.ts',
    test: 'src/test.ts',
  }
}

export default [{
  ...def,
  output: {
    dir: 'lib',
    entryFileNames: '[name]' + pkg.main.replace('index', ''),
    format: 'cjs'
  },
  plugins: [
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
    })
  ]
}, {
  ...def,
  output: {
    dir: 'lib',
    entryFileNames: '[name]' + pkg.module.replace('index', ''),
    format: 'es'
  },
  plugins: [
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          target: 'es6'
        }
      }
    })
  ]
}]
