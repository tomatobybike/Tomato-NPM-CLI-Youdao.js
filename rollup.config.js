import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
import json from '@rollup/plugin-json'
// import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import clear from 'rollup-plugin-clear'
import prettier from 'rollup-plugin-prettier'
import { terser } from 'rollup-plugin-terser'

const env = process.env.NODE_ENV

const plugins = [
    clear({ targets: ['dist'] }),
    prettier({ sourcemap: false, parser: 'babel' }),
    eslint({
        include: ['./src'],
        fix: true,
        throwOnError: true
    }),
    replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(env),
        delimiters: ['', ''],
        '#!/usr/bin/env node': ''
    }),
    commonjs({
        include: []
    }),
    json(),
    babel({
        exclude: ['node_modules/**']
    }),
    env === 'production' && terser()
]

export default {
    input: 'src/youdao.js',
    output: [
        {
            file: 'dist/youdao.js',
            format: 'cjs',
            sourcemap: true
        }
    ],
    plugins
}
