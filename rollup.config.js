import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
// import nodeResolve from "@rollup/plugin-node-resolve"
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
  // nodeResolve(),
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

export default commandOptions => {

  const module = commandOptions["config-module"]

  return {
    input : "packages/" + module + "/src/index.js",
    output : {
      file : "packages/" + module + "/lib/index.js",
      format : "es"
    },
    external : [/node_modules/, new RegExp("packages/(?!" + module + ").*?/")],
    plugins
  }

}
