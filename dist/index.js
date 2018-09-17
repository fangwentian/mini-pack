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

    __xdd_require__('C:\Users\fangwentian\Desktop\workspace\xdd\example\index.js')

}({
'C:\Users\fangwentian\Desktop\workspace\xdd\example\index.js': function (module, exports, require) { "use strict";

var _a = _interopRequireDefault(require("C:\Users\fangwentian\Desktop\workspace\xdd\example\order\a.js"));

var _b = _interopRequireDefault(require("C:\Users\fangwentian\Desktop\workspace\xdd\example\b.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_a.default); },
'C:\Users\fangwentian\Desktop\workspace\xdd\example\order\a.js': function (module, exports, require) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _b = _interopRequireDefault(require("C:\Users\fangwentian\Desktop\workspace\xdd\example\b.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var a = 'hello ' + _b.default;
var _default = a;
exports.default = _default; },
'C:\Users\fangwentian\Desktop\workspace\xdd\example\b.js': function (module, exports, require) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var b = 'world';
var _default = b;
exports.default = _default; },
'C:\Users\fangwentian\Desktop\workspace\xdd\example\b.js': function (module, exports, require) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var b = 'world';
var _default = b;
exports.default = _default; },
}))