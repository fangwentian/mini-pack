const fs = require('fs')
const path = require('path')
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

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
    const { code: _code } = transformFromAst(ast);

    return deps.reduce((code, dep) => {
        return code.replace(dep.dep, dep.depAbsolute)
    }, _code)
}

const walk = (entry) => {
    let modules = []
    const dg = (deps) => {
        deps.forEach((dep) => {
            let module = parseFile(dep.depAbsolute)
            modules.push(module)
            dg(module.deps)
        })
    }
    dg([{ depAbsolute: entry }])
    console.log(modules)
}

const wrap = (modules) => {
    return 
    `
    (function(modules) {
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
    }(${modules}))
    `
}


module.exports = (config_path) => {
    const { entry, dest } = require(config_path);
    // assert
    const entry_path = path.join(path.dirname(config_path), entry);

    walk(entry_path)


}