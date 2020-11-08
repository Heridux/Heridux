import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
// import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const env = process.env.NODE_ENV;

export default {
  input: 'index.js',
  output: {
    file: 'bundle.min.js',
    format: 'iife',
    name: 'version'
  },
  plugins: [
    nodeResolve(),
    replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
    babel({
      babelHelpers : "bundled",
      exclude: 'node_modules/**'
    }),
    commonjs(),
    // terser()
    serve({
      open: true,
      openPage: '/',
      host: 'localhost',
      port: 3000,
      contentBase: ['./'],
    }),
    livereload({
        watch: ['./'],
        exts: ['html', 'js', 'css'],
    }),
  ],
  external: [/@babel\/runtime/]
};
