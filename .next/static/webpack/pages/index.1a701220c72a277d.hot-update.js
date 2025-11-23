/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./components/RoomView.js":
/*!********************************!*\
  !*** ./components/RoomView.js ***!
  \********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports on update so we can compare the boundary
                // signatures.
                module.hot.dispose(function (data) {
                    data.prevExports = currentExports;
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevExports !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevExports !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_RoomForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/RoomForm */ \"./components/RoomForm.js\");\n/* harmony import */ var _components_RoomView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/RoomView */ \"./components/RoomView.js\");\n/* harmony import */ var _components_RoomView__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_components_RoomView__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _lib_firebaseClient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/firebaseClient */ \"./lib/firebaseClient.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\nfunction Home() {\n    _s();\n    const [inRoom, setIn] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [rid, setRid] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        (0,_lib_firebaseClient__WEBPACK_IMPORTED_MODULE_4__.initFirebase)();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            !inRoom && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                style: {\n                    textAlign: \"center\",\n                    marginTop: \"40px\"\n                },\n                children: \"Sala de Estimativa\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Desenvolvimento\\\\sala-estimativa\\\\pages\\\\index.js\",\n                lineNumber: 16,\n                columnNumber: 9\n            }, this),\n            !inRoom && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_RoomForm__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                onEnter: (r, n)=>{\n                    setRid(r);\n                    setName(n);\n                    setIn(true);\n                }\n            }, void 0, false, {\n                fileName: \"D:\\\\Desenvolvimento\\\\sala-estimativa\\\\pages\\\\index.js\",\n                lineNumber: 22,\n                columnNumber: 9\n            }, this),\n            inRoom && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_components_RoomView__WEBPACK_IMPORTED_MODULE_3___default()), {\n                roomId: rid,\n                userName: name\n            }, void 0, false, {\n                fileName: \"D:\\\\Desenvolvimento\\\\sala-estimativa\\\\pages\\\\index.js\",\n                lineNumber: 31,\n                columnNumber: 18\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\Desenvolvimento\\\\sala-estimativa\\\\pages\\\\index.js\",\n        lineNumber: 14,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"GusJIfR64kc7q9+G7ZGihuB+cXM=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUE0QztBQUNFO0FBQ0E7QUFDTztBQUV0QyxTQUFTSzs7SUFDdEIsTUFBTSxDQUFDQyxRQUFRQyxNQUFNLEdBQUdOLCtDQUFRQSxDQUFDO0lBQ2pDLE1BQU0sQ0FBQ08sS0FBS0MsT0FBTyxHQUFHUiwrQ0FBUUEsQ0FBQztJQUMvQixNQUFNLENBQUNTLE1BQU1DLFFBQVEsR0FBR1YsK0NBQVFBLENBQUM7SUFFakNELGdEQUFTQSxDQUFDO1FBQVFJLGlFQUFZQTtJQUFJLEdBQUcsRUFBRTtJQUV2QyxxQkFDRSw4REFBQ1E7O1lBQ0UsQ0FBQ04sd0JBQ0EsOERBQUNPO2dCQUFHQyxPQUFPO29CQUFFQyxXQUFXO29CQUFVQyxXQUFXO2dCQUFPOzBCQUFHOzs7Ozs7WUFLeEQsQ0FBQ1Ysd0JBQ0EsOERBQUNKLDREQUFRQTtnQkFDUGUsU0FBUyxDQUFDQyxHQUFHQztvQkFDWFYsT0FBT1M7b0JBQ1BQLFFBQVFRO29CQUNSWixNQUFNO2dCQUNSOzs7Ozs7WUFJSEQsd0JBQVUsOERBQUNILDZEQUFRQTtnQkFBQ2lCLFFBQVFaO2dCQUFLYSxVQUFVWDs7Ozs7Ozs7Ozs7O0FBR2xEO0dBNUJ3Qkw7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvaW5kZXguanM/YmVlNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUm9vbUZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9Sb29tRm9ybSc7XHJcbmltcG9ydCBSb29tVmlldyBmcm9tICcuLi9jb21wb25lbnRzL1Jvb21WaWV3JztcclxuaW1wb3J0IHsgaW5pdEZpcmViYXNlIH0gZnJvbSAnLi4vbGliL2ZpcmViYXNlQ2xpZW50JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XHJcbiAgY29uc3QgW2luUm9vbSwgc2V0SW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtyaWQsIHNldFJpZF0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgY29uc3QgW25hbWUsIHNldE5hbWVdID0gdXNlU3RhdGUoJycpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4geyBpbml0RmlyZWJhc2UoKTsgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgeyFpblJvb20gJiYgKFxyXG4gICAgICAgIDxoMSBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIG1hcmdpblRvcDogXCI0MHB4XCIgfX0+XHJcbiAgICAgICAgICBTYWxhIGRlIEVzdGltYXRpdmFcclxuICAgICAgICA8L2gxPlxyXG4gICAgICApfVxyXG5cclxuICAgICAgeyFpblJvb20gJiYgKFxyXG4gICAgICAgIDxSb29tRm9ybVxyXG4gICAgICAgICAgb25FbnRlcj17KHIsIG4pID0+IHtcclxuICAgICAgICAgICAgc2V0UmlkKHIpO1xyXG4gICAgICAgICAgICBzZXROYW1lKG4pO1xyXG4gICAgICAgICAgICBzZXRJbih0cnVlKTtcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIHtpblJvb20gJiYgPFJvb21WaWV3IHJvb21JZD17cmlkfSB1c2VyTmFtZT17bmFtZX0gLz59XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59Il0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiUm9vbUZvcm0iLCJSb29tVmlldyIsImluaXRGaXJlYmFzZSIsIkhvbWUiLCJpblJvb20iLCJzZXRJbiIsInJpZCIsInNldFJpZCIsIm5hbWUiLCJzZXROYW1lIiwiZGl2IiwiaDEiLCJzdHlsZSIsInRleHRBbGlnbiIsIm1hcmdpblRvcCIsIm9uRW50ZXIiLCJyIiwibiIsInJvb21JZCIsInVzZXJOYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.js\n"));

/***/ })

});