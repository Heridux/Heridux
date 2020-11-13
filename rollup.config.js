import babel from "@rollup/plugin-babel"
import replace from "@rollup/plugin-replace"
import { eslint } from "rollup-plugin-eslint"
import { terser } from "rollup-plugin-terser"

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

export default [{
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
}, {
  input : "packages/heridux/src/index.js",
  output : {
    file : "packages/heridux/dist/index.js",
    format : "umd",
    name : "Heridux",
    indent : false
  },
  external : /node_modules/,
  plugins
}, {
  input : "packages/heridux-form/src/index.js",
  output : {
    file : "packages/heridux-form/dist/index.js",
    format : "umd",
    name : "HeriduxForm",
    indent : false
  },
  external : /node_modules/,
  plugins
}, {
  input : "packages/heridux-form-arrays/src/index.js",
  output : {
    file : "packages/heridux-form-arrays/dist/index.js",
    format : "umd",
    name : "HeriduxForm",
    indent : false
  },
  external : /node_modules/,
  plugins
}, {
  input : "packages/heridux-form-rules/src/index.js",
  output : {
    file : "packages/heridux-form-rules/dist/index.js",
    format : "umd",
    name : "HeriduxFormRules",
    indent : false
  },
  external : /node_modules/,
  plugins
}, {
  input : "packages/react-heridux/src/index.js",
  output : {
    file : "packages/react-heridux/dist/index.js",
    format : "umd",
    name : "ReactHeridux",
    indent : false
  },
  external : /node_modules/,
  plugins
}, {
  input : "packages/react-heridux-form/src/index.js",
  output : {
    file : "packages/react-heridux-form/dist/index.js",
    format : "umd",
    name : "ReactHeriduxForm",
    indent : false
  },
  external : /node_modules/,
  plugins
}]
