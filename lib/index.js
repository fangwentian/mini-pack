const fs = require('fs')
const path = require('path')
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAstSync } = require('@babel/core')
const { assert } = require('./util')

const parseFile = (filePath) => {
    const file = fs.readFileSync(filePath, 'utf-8')

    const ast = parse(file, {
        sourceType: 'module'
    })

    const deps = getDeps(filePath, ast);
    const code = generateCode(ast, deps);

    return {
        fileName: filePath,
        deps,
        code
    }
}

const getDeps = (filePath, ast) => {
    let dependencies = []
    traverse(ast, {
        ImportDeclaration: ({ node }) => {
            dependencies.push({
                dep: node.source.value,
                depAbsolute: path.join(path.dirname(filePath), node.source.value)
            })
        },
    })
    return dependencies
}

const generateCode = (ast, deps) => {
    const { code: _code } = transformFromAstSync(ast, null, { presets: ['@babel/preset-env'] });

    return deps.reduce((code, dep) => {
        return code.replace(dep.dep, dep.depAbsolute)
    }, _code)
}

const walk = (entry) => {
    let modules = []
    const recursive = (deps) => {
        deps.forEach((dep) => {
            let module = parseFile(dep.depAbsolute)
            modules.push(module)
            recursive(module.deps)
        })
    }
    recursive([{ depAbsolute: entry }])
    return modules
}

const wrap = (modules) => {
    let str = ''
    modules.forEach(function (mod) {
        str += `'${mod.fileName}': function (module, exports, require) { ${mod.code} },\n`
    })


    return `(function(modules) {
    var installedModules = {};
    function __xdd_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }

        var module = installedModules[moduleId] = {
            id: moduleId,
            exports: {}
        };

        modules[moduleId].call(module.exports, module, module.exports, __xdd_require__);

        return module.exports;
    }

    __xdd_require__('${modules[0].fileName}')

}({\n${str}}))`
}

module.exports = (config_path) => {
    const { entry, dest } = require(config_path)
    assert(entry, '必须指定入口文件')
    assert(dest, '必须指定目标文件')

    const entry_path = path.join(path.dirname(config_path), entry)

    const dest_path = path.join(path.dirname(config_path), dest)

    const modules = walk(entry_path)

    fs.writeFileSync(dest_path, wrap(modules), 'utf-8')
}