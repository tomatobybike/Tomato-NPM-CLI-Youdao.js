// #!/usr/bin/env node
// 命令行有道翻译
// http请求
// const packages = require('../package.json')
// const { version: VERSION } = packages
import { version as VERSION } from '../package.json'
import Printer from '@darkobits/lolcatjs'
import chalk from 'chalk'
import Table from 'cli-table2/src/table'
import { program } from 'commander'
import Configstore from 'configstore'
import figlet from 'figlet'
import superagent from 'superagent'

const conf = new Configstore('youdaoTom')

const DEFAULT_API_KEYS = {
    key: 868480929,
    keyfrom: 'toaijf'
}

const key = conf.get('key') || DEFAULT_API_KEYS.key
const keyfrom = conf.get('keyfrom') || DEFAULT_API_KEYS.keyfrom

const logo = figlet.textSync('Youdao')
const logoPrinter = Printer.fromString(
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
        const word = obj.args?.join(' ')
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

                try {
                    if (!validJSON(res.text)) {
                        console.log(`\n ${chalk.red('有道翻译API出错信息:')}`)
                        console.log(
                            `\n${'💔'.repeat(
                                3
                            )}来自您key的翻译API请求异常频繁，为保护其他用户的正常访问，只能暂时禁止您目前key的访问\n`
                        )

                        console.log(
                            `\n你可以使用 ${chalk.red(
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
                    const table = new Table()
                    table.push(result)
                    console.log(table.toString())
                } catch (error) {
                    console.log(error.toString())
                }
            })
    })
if (!process.argv[2]) {
    console.log(logoPrinter)
    program.help()
}
program.parse(process.argv)
