import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
// import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const env = process.env.NODE_ENV;

const plugins = [
  replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
  babel({
    babelHelpers : "bundled",
    exclude: 'node_modules/**',
    presets: [["@babel/preset-env", { "shippedProposals" : true }], "@babel/preset-react"]
  }),
  nodeResolve(),
  commonjs()
]

/* if (env === "production") {
  plugins.push(terser())
} else {
  plugins.push(serve({
    open: true,
    openPage: '/',
    host: 'localhost',
    port: 3000,
    contentBase: ['./'],
  }),
  livereload({
      watch: ['./'],
      exts: ['html', 'js', 'css'],
  }))
} */

export default {
  input: 'packages/react-heridux-form/src/index.js',
  output: {
    file: 'packages/react-heridux-form/lib/index.js',
    format: 'umd',
    name: 'version'
  },
  external:/node_modules/,
  plugins
};
