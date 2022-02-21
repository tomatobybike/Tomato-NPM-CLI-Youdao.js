"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// #!/usr/bin/env node
// 命令行有道翻译
// http请求
var _lolcatjs = require('@darkobits/lolcatjs'); var _lolcatjs2 = _interopRequireDefault(_lolcatjs);
var _chalk = require('chalk'); var _chalk2 = _interopRequireDefault(_chalk);
var _table = require('cli-table2/src/table'); var _table2 = _interopRequireDefault(_table);
var _commander = require('commander');
var _configstore = require('configstore'); var _configstore2 = _interopRequireDefault(_configstore);
var _figlet = require('figlet'); var _figlet2 = _interopRequireDefault(_figlet);
var _superagent = require('superagent'); var _superagent2 = _interopRequireDefault(_superagent);

const conf = new (0, _configstore2.default)('youdaoTom')

const DEFAULT_API_KEYS = {
    key: 868480929,
    keyfrom: 'toaijf'
}

const key = conf.get('key') || DEFAULT_API_KEYS.key
const keyfrom = conf.get('keyfrom') || DEFAULT_API_KEYS.keyfrom

const packages = require('../package.json')

const { version: VERSION } = packages
const logo = _figlet2.default.textSync('Youdao')
const logoPrinter = _lolcatjs2.default.fromString(
    `\n=========================================   \n 汤姆的youdao翻译${VERSION}\n\n${logo}\n=========================================`
)

const validJSON = (json) => {
    try {
        JSON.parse(json)
        return true
    } catch (err) {
        return false
    }
}

_commander.program
    .allowUnknownOption()
    .version(logoPrinter, '-V, --version')
    .usage('translator <cmd> [input]')

const url = `http://fanyi.youdao.com/openapi.do?keyfrom=${keyfrom}&key=${key}&type=data&doctype=json&version=1.1`

_commander.program
    .command('set')
    .description('config key,keyfrom')
    .requiredOption('-key,--key <string>', 'youdao api key')
    .requiredOption('-keyfrom,--keyfrom <string>', 'youdao api keyfrom')
    .action((options) => {
        console.log('cmd', options, options.key)
        conf.set('key', options.key)
        conf.set('keyfrom', options.keyfrom)
    })

_commander.program
    .command('query', { isDefault: true })
    .description('translate query')
    .action((cmd, obj) => {
        const word = _optionalChain([obj, 'access', _ => _.args, 'optionalAccess', _2 => _2.join, 'call', _3 => _3(' ')])
        _superagent2.default
            .get(url)
            .query({
                q: word
            })
            .end((err, res) => {
                if (err) {
                    console.log('excuse me, try again')
                    return false
                }

                try {
                    if (!validJSON(res.text)) {
                        console.log(`\n ${_chalk2.default.red('有道翻译API出错信息:')}`)
                        console.log(
                            `\n${'💔'.repeat(
                                3
                            )}来自您key的翻译API请求异常频繁，为保护其他用户的正常访问，只能暂时禁止您目前key的访问\n`
                        )

                        console.log(
                            `\n你可以使用 ${_chalk2.default.red(
                                'youdaotom set -key xxx -keyfrom yyy'
                            )} 命令来配置你自己在网易申请的key和keyfrom,或者几个小时后再尝试，随着本npm包下载的用户数越多，很容易超出网易的限制\n`
                        )
                        return false
                    }
                    const data = JSON.parse(res.text)
                    const result = {}
                    // 返回的数据处理
                    if (data.basic) {
                        result[word] = data.basic.explains
                    } else if (data.translation) {
                        result[word] = data.translation
                    } else {
                        console.error('error')
                    }
                    console.log()
                    // 输出表格
                    const table = new (0, _table2.default)()
                    table.push(result)
                    console.log(table.toString())
                } catch (error) {
                    console.log(error.toString())
                }
            })
    })
if (!process.argv[2]) {
    console.log(logoPrinter)
    _commander.program.help()
}
_commander.program.parse(process.argv)
