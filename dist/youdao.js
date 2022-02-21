'use strict'

var Printer = require('@darkobits/lolcatjs')
var chalk = require('chalk')
var Table = require('cli-table2/src/table')
var commander = require('commander')
var Configstore = require('configstore')
var figlet = require('figlet')
var superagent = require('superagent')

function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : { default: e }
}

var Printer__default = /*#__PURE__*/ _interopDefaultLegacy(Printer)
var chalk__default = /*#__PURE__*/ _interopDefaultLegacy(chalk)
var Table__default = /*#__PURE__*/ _interopDefaultLegacy(Table)
var Configstore__default = /*#__PURE__*/ _interopDefaultLegacy(Configstore)
var figlet__default = /*#__PURE__*/ _interopDefaultLegacy(figlet)
var superagent__default = /*#__PURE__*/ _interopDefaultLegacy(superagent)

//
var conf = new Configstore__default['default']('youdaoTom')
var DEFAULT_API_KEYS = {
    key: 868480929,
    keyfrom: 'toaijf'
}
var key = conf.get('key') || DEFAULT_API_KEYS.key
var keyfrom = conf.get('keyfrom') || DEFAULT_API_KEYS.keyfrom

var packages = require('../package.json')

var { version: VERSION } = packages
var logo = figlet__default['default'].textSync('Youdao')
var logoPrinter = Printer__default['default'].fromString(
    '\n=========================================   \n \u6C64\u59C6\u7684youdao\u7FFB\u8BD1'
        .concat(VERSION, '\n\n')
        .concat(logo, '\n=========================================')
)

var validJSON = (json) => {
    try {
        JSON.parse(json)
        return true
    } catch (err) {
        return false
    }
}

commander.program
    .allowUnknownOption()
    .version(logoPrinter, '-V, --version')
    .usage('translator <cmd> [input]')
var url = 'http://fanyi.youdao.com/openapi.do?keyfrom='
    .concat(keyfrom, '&key=')
    .concat(key, '&type=data&doctype=json&version=1.1')
commander.program
    .command('set')
    .description('config key,keyfrom')
    .requiredOption('-key,--key <string>', 'youdao api key')
    .requiredOption('-keyfrom,--keyfrom <string>', 'youdao api keyfrom')
    .action((options) => {
        console.log('cmd', options, options.key)
        conf.set('key', options.key)
        conf.set('keyfrom', options.keyfrom)
    })
commander.program
    .command('query', {
        isDefault: true
    })
    .description('translate query')
    .action((cmd, obj) => {
        var _obj$args

        var word =
            (_obj$args = obj.args) === null || _obj$args === void 0
                ? void 0
                : _obj$args.join(' ')
        superagent__default['default']
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
                        console.log(
                            '\n '.concat(
                                chalk__default['default'].red(
                                    '有道翻译API出错信息:'
                                )
                            )
                        )
                        console.log(
                            '\n'.concat(
                                '💔'.repeat(3),
                                '\u6765\u81EA\u60A8key\u7684\u7FFB\u8BD1API\u8BF7\u6C42\u5F02\u5E38\u9891\u7E41\uFF0C\u4E3A\u4FDD\u62A4\u5176\u4ED6\u7528\u6237\u7684\u6B63\u5E38\u8BBF\u95EE\uFF0C\u53EA\u80FD\u6682\u65F6\u7981\u6B62\u60A8\u76EE\u524Dkey\u7684\u8BBF\u95EE\n'
                            )
                        )
                        console.log(
                            '\n\u4F60\u53EF\u4EE5\u4F7F\u7528 '.concat(
                                chalk__default['default'].red(
                                    'youdaotom set -key xxx -keyfrom yyy'
                                ),
                                ' \u547D\u4EE4\u6765\u914D\u7F6E\u4F60\u81EA\u5DF1\u5728\u7F51\u6613\u7533\u8BF7\u7684key\u548Ckeyfrom,\u6216\u8005\u51E0\u4E2A\u5C0F\u65F6\u540E\u518D\u5C1D\u8BD5\uFF0C\u968F\u7740\u672Cnpm\u5305\u4E0B\u8F7D\u7684\u7528\u6237\u6570\u8D8A\u591A\uFF0C\u5F88\u5BB9\u6613\u8D85\u51FA\u7F51\u6613\u7684\u9650\u5236\n'
                            )
                        )
                        return false
                    }

                    var data = JSON.parse(res.text)
                    var result = {} // 返回的数据处理

                    if (data.basic) {
                        result[word] = data.basic.explains
                    } else if (data.translation) {
                        result[word] = data.translation
                    } else {
                        console.error('error')
                    }

                    console.log() // 输出表格

                    var table = new Table__default['default']()
                    table.push(result)
                    console.log(table.toString())
                } catch (error) {
                    console.log(error.toString())
                }
            })
    })

if (!process.argv[2]) {
    console.log(logoPrinter)
    commander.program.help()
}

commander.program.parse(process.argv)
//# sourceMappingURL=youdao.js.map
