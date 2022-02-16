// #!/usr/bin/env node
// 自己实现命令行有道翻译
const { program } = require('commander')
const Table = require('cli-table2') // 表格输出
const superagent = require('superagent') // http请求
const Printer = require('@darkobits/lolcatjs')
const figlet = require('figlet')
const Configstore = require('configstore')
const conf = new Configstore('youdaoTom')

const DEFAULT_API_KEYS = {
    key: 969918857,
    keyfrom: 'neverland'
}

const key = conf.get('key') || DEFAULT_API_KEYS.key
const keyfrom = conf.get('keyfrom') || DEFAULT_API_KEYS.keyfrom

const packages = require('../package.json')

const { version: VERSION } = packages
const logo = figlet.textSync('Youdao')
const logoPrinter = Printer.fromString(
    `\n=========================================   \n 汤姆的youdao翻译${VERSION}\n\n${logo}\n=========================================`
)

program
    .allowUnknownOption()
    .version(logoPrinter, '-V, --version')
    .usage('translator <cmd> [input]')

const url = `http://fanyi.youdao.com/openapi.do?keyfrom=${keyfrom}&key=${key}&type=data&doctype=json&version=1.1`

program
    .command('set')
    .description('config key,keyfrom')
    .requiredOption('-key,--key <string>', 'youdao api key')
    .requiredOption('-keyfrom,--keyfrom <string>', 'youdao api keyfrom')
    .action((options) => {
        console.log('cmd', options, options.key)
        conf.set('key', options.key)
        conf.set('keyfrom', options.keyfrom)
    })

program
    .command('query', { isDefault: true })
    .description('translate query')
    .action((cmd, obj) => {
        const word = obj.args ? obj.args.join(' ') : ''
        superagent
            .get(url)
            .query({
                q: word
            })
            .end((err, res) => {
                if (err) {
                    console.log('excuse me, try again')
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
                const table = new Table()
                table.push(result)
                console.log(table.toString())
            })
    })
if (!process.argv[2]) {
    console.log(logoPrinter)
    program.help()
}
program.parse(process.argv)
