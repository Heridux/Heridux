import babel from "@rollup/plugin-babel"
import replace from "@rollup/plugin-replace"
import { eslint } from "rollup-plugin-eslint"

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
  })
]

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
