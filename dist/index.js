
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
    }('/Users/hzfangwentian/Desktop/practice/mini-pack/example/index.js': function (module, exports, require) { import a from '/Users/hzfangwentian/Desktop/practice/mini-pack/example/order/a.js';
import b from '/Users/hzfangwentian/Desktop/practice/mini-pack/example/b.js';
console.log(a); },'/Users/hzfangwentian/Desktop/practice/mini-pack/example/order/a.js': function (module, exports, require) { import b from '/Users/hzfangwentian/Desktop/practice/mini-pack/example/b.js';
const a = 'hello' + b;
export default a; },'/Users/hzfangwentian/Desktop/practice/mini-pack/example/b.js': function (module, exports, require) { const b = 'world';
export default b; },'/Users/hzfangwentian/Desktop/practice/mini-pack/example/b.js': function (module, exports, require) { const b = 'world';
export default b; },))
    