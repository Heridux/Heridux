import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import nodeResolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import { eslint } from "rollup-plugin-eslint"
// import { terser } from 'rollup-plugin-terser';
// import serve from 'rollup-plugin-serve';
// import livereload from 'rollup-plugin-livereload';

const env = process.env.NODE_ENV

const plugins = [
  replace({ "process.env.NODE_ENV" : JSON.stringify(env) }),
  eslint({
    fix : true,
    throwOnError : true,
    throwOnWarning : true
  }),
  babel({
    babelHelpers : "runtime",
    exclude : "node_modules/**",
    presets : [ ["@babel/preset-env", { shippedProposals : true }], "@babel/preset-react"],
    plugins : ["@babel/plugin-transform-runtime"]
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
  input : {
    "heridux/lib/index" : "packages/heridux/src/index.js",
    "heridux-form-rules/lib/index" : "packages/heridux-form-rules/src/index.js",
    "heridux-form/lib/index" : "packages/heridux-form/src/index.js",
    "heridux-form-arrays/lib/index" : "packages/heridux-form-arrays/src/index.js",
    "react-heridux/lib/index" : "packages/react-heridux/src/index.js",
    "react-heridux-form/lib/index" : "packages/react-heridux-form/src/index.js"
  },
  output : {
    dir : "packages",
    format : "es"
  },
  external : /node_modules/,
  plugins
}
