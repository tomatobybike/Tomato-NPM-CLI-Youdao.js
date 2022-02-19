import eslint from '@rollup/plugin-eslint'
import babel from 'rollup-plugin-babel'
import clear from 'rollup-plugin-clear'
import commonjs from 'rollup-plugin-commonjs'
import prettier from 'rollup-plugin-prettier'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'

const env = process.env.NODE_ENV

const plugins = [
    clear({ targets: ['dist'] }),
    prettier({ sourcemap: false, parser: 'babel' }),
    babel({
        exclude: ['node_modules/**']
    }),
    commonjs({
        include: ['node_modules/**']
    }),
    eslint({
        include: ['./src'],
        fix: true,
        throwOnError: true
    }),
    replace({
        'process.env.NODE_ENV': JSON.stringify(env),
        delimiters: ['', ''],
        '#!/usr/bin/env node': ''
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
