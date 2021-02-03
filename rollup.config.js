import babel from "@rollup/plugin-babel"
import replace from "@rollup/plugin-replace"
import { eslint } from "rollup-plugin-eslint"
import babelConfig from "./babel.config.json"

const env = process.env.NODE_ENV

const plugins = [
  replace({ "process.env.NODE_ENV" : JSON.stringify(env) }),
  eslint({
    fix : true,
    throwOnError : true/* ,
    throwOnWarning : true */
  }),
  babel(Object.assign(babelConfig, {
    babelHelpers : "runtime",
    plugins : ["@babel/plugin-transform-runtime"]
  }))
]

const commonConfig = {
  external : /node_modules/,
  plugins
}

const commonUmdOutput = {
  format : "umd",
  indent : false,
  exports : "named",
  globals : {
    react : "React",
    "prop-types" : "PropTypes",
    immutable : "Immutable",
    redux : "redux",
    "react-redux" : "reactRedux",
    "@babel/runtime/helpers/defineProperty" : "_defineProperty",
    "@babel/runtime/helpers/extends" : "_extends",
    "lodash/isPlainObject" : "isPlainObject",
    "lodash/isEqual" : "isEqual",
    "@heridux/core" : "Heridux",
    "@heridux/immutable" : "HeriduxImmutable",
    "@heridux/immer" : "HeriduxImmer",
    "@heridux/react" : "ReactHeridux",
    "@heridux/form" : "HeriduxForm",
    "@heridux/form-rules" : "HeriduxFormRules",
    "@heridux/form-arrays" : "HeriduxForm",
    "@heridux/react-form" : "ReactHeriduxForm"
  }
}

export default [{
  input : {
    "heridux/lib/index" : "packages/heridux/src/index.js",
    "heridux-immutable/lib/index" : "packages/heridux-immutable/src/index.js",
    "heridux-immer/lib/index" : "packages/heridux-immer/src/index.js",
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
  ...commonConfig
}, {
  input : "packages/heridux/src/index.js",
  output : {
    file : "packages/heridux/dist/index.js",
    name : "Heridux",
    ...commonUmdOutput
  },
  ...commonConfig
}, {
  input : "packages/heridux-immutable/src/index.js",
  output : {
    file : "packages/heridux-immutable/dist/index.js",
    name : "HeriduxImmutable",
    ...commonUmdOutput
  },
  ...commonConfig
}, {
  input : "packages/heridux-immer/src/index.js",
  output : {
    file : "packages/heridux-immer/dist/index.js",
    name : "HeriduxImmer",
    ...commonUmdOutput
  },
  ...commonConfig
}, {
  input : "packages/heridux-form/src/index.js",
  output : {
    file : "packages/heridux-form/dist/index.js",
    name : "HeriduxForm",
    ...commonUmdOutput
  },
  ...commonConfig
}, {
  input : "packages/heridux-form-arrays/src/index.js",
  output : {
    file : "packages/heridux-form-arrays/dist/index.js",
    name : "HeriduxForm",
    ...commonUmdOutput
  },
  ...commonConfig
}, {
  input : "packages/heridux-form-rules/src/index.js",
  output : {
    file : "packages/heridux-form-rules/dist/index.js",
    name : "HeriduxFormRules",
    ...commonUmdOutput
  },
  ...commonConfig
}, {
  input : "packages/react-heridux/src/index.js",
  output : {
    file : "packages/react-heridux/dist/index.js",
    name : "ReactHeridux",
    ...commonUmdOutput
  },
  ...commonConfig
}, {
  input : "packages/react-heridux-form/src/index.js",
  output : {
    file : "packages/react-heridux-form/dist/index.js",
    name : "ReactHeriduxForm",
    ...commonUmdOutput
  },
  ...commonConfig
}]
