import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const env = process.env.NODE_ENV;

export default {
  input: 'src/index.js',
  output: [{
    file: 'lib/index.js',
    format: 'esm'
  }, {
    file: 'build/bundle.min.js',
    format: 'iife',
    name: 'version',
    plugins: [terser()]
  }],
  plugins: [
    nodeResolve(),
    replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
    babel({
      babelHelpers : "runtime",
      exclude: 'node_modules/**'
    }),
    commonjs()
  ],
  external: [/@babel\/runtime/]
};
