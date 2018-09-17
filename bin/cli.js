#!/usr/bin/env node
const path = require('path')

const { argv } = yargs
    .usage('Usage: xdd 或者 xdd -c xdd.config.js')
    .option('config', {
        alias: 'c',
        describe: 'specify a config file'
    })
    .version()
    .alias('v', 'version')
    .alias('h', 'help')
    .help('h')

const config = './xdd.config.js' || argv.config

if(config) {
    require('../lib')(path.join(process.cwd, config))
}
