"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/completion";
exports.ids = ["pages/api/completion"];
exports.modules = {

/***/ "openai":
/*!*************************!*\
  !*** external "openai" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("openai");

/***/ }),

/***/ "(api)/./libs/openai.ts":
/*!************************!*\
  !*** ./libs/openai.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! openai */ \"openai\");\n/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(openai__WEBPACK_IMPORTED_MODULE_0__);\n\nconst configuration = new openai__WEBPACK_IMPORTED_MODULE_0__.Configuration({\n    organization: \"org-oBDWTD50zACNX3mC3hTDTH4C\",\n    apiKey: \"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\"\n});\nconst openai = new openai__WEBPACK_IMPORTED_MODULE_0__.OpenAIApi(configuration);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (openai);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWJzL29wZW5haS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0Q7QUFDaEQsTUFBTUUsZ0JBQWdCLElBQUlGLGlEQUFhQSxDQUFDO0lBQ3RDRyxjQUFjO0lBQ2RDLFFBQVE7QUFDVjtBQUNBLE1BQU1DLFNBQVMsSUFBSUosNkNBQVNBLENBQUNDO0FBRTdCLGlFQUFlRyxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGV4dC10by12aWRlby8uL2xpYnMvb3BlbmFpLnRzP2EzNmEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb25maWd1cmF0aW9uLCBPcGVuQUlBcGl9IGZyb20gJ29wZW5haSc7XG5jb25zdCBjb25maWd1cmF0aW9uID0gbmV3IENvbmZpZ3VyYXRpb24oe1xuICBvcmdhbml6YXRpb246IFwib3JnLW9CRFdURDUwekFDTlgzbUMzaFREVEg0Q1wiLFxuICBhcGlLZXk6IFwic2sta3ZUQm5DMld4MEpFVGJvU1dYMFpUM0JsYmtGSkRGU1FjVUxPZU1KaHpRYUdxdXlBXCIsXG59KTtcbmNvbnN0IG9wZW5haSA9IG5ldyBPcGVuQUlBcGkoY29uZmlndXJhdGlvbik7XG5cbmV4cG9ydCBkZWZhdWx0IG9wZW5haTsgXG4iXSwibmFtZXMiOlsiQ29uZmlndXJhdGlvbiIsIk9wZW5BSUFwaSIsImNvbmZpZ3VyYXRpb24iLCJvcmdhbml6YXRpb24iLCJhcGlLZXkiLCJvcGVuYWkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./libs/openai.ts\n");

/***/ }),

/***/ "(api)/./pages/api/completion.ts":
/*!*********************************!*\
  !*** ./pages/api/completion.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _libs_openai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/openai */ \"(api)/./libs/openai.ts\");\n// Import necessary components and objects from 'next' and 'openai' libraries\n // OpenAI SDK\n// Define the default export, an async function that handles the request and response\nasync function handler(req, res) {\n    // Extract 'text' from the request body. Assuming that 'text' field is sent in the request body.\n    const { text } = req.body;\n    // Calls OpenAI's createCompletion method with specific parameters\n    // model: The ID of the model to use for the text generation\n    // prompt: The text to base the completion on\n    // max_tokens: The maximum length of the generated text\n    const response = await _libs_openai__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createCompletion({\n        model: \"text-davinci-003\",\n        prompt: text,\n        max_tokens: 2800\n    });\n    // Extracts the completion text from the first choice in the data array in the response\n    const completionText = response.data.choices[0];\n    // Sends a success (200) status code and the completion text in the response\n    res.status(200).json({\n        completionText\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvY29tcGxldGlvbi50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZFQUE2RTtBQUV0QyxDQUFDLGFBQWE7QUFHckQscUZBQXFGO0FBQ3RFLGVBQWVDLFFBQzVCQyxHQUFtQixFQUNuQkMsR0FBb0I7SUFHcEIsZ0dBQWdHO0lBQ2hHLE1BQU0sRUFBRUMsSUFBSSxFQUFFLEdBQUdGLElBQUlHO0lBRXJCLGtFQUFrRTtJQUNsRSw0REFBNEQ7SUFDNUQsNkNBQTZDO0lBQzdDLHVEQUF1RDtJQUN2RCxNQUFNQyxXQUFXLE1BQU1OLHFFQUF1Qk8sQ0FBQztRQUM3Q0MsT0FBTztRQUNQQyxRQUFRTDtRQUNSTSxZQUFZO0lBQ2Q7SUFFQSx1RkFBdUY7SUFDdkYsTUFBTUMsaUJBQWlCTCxTQUFTTSxLQUFLQyxPQUFPLENBQUMsRUFBRTtJQUUvQyw0RUFBNEU7SUFDNUVWLElBQUlXLE9BQU8sS0FBS0MsS0FBSztRQUFFSjtJQUFlO0FBQ3hDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGV4dC10by12aWRlby8uL3BhZ2VzL2FwaS9jb21wbGV0aW9uLnRzPzNlMmIiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IG5lY2Vzc2FyeSBjb21wb25lbnRzIGFuZCBvYmplY3RzIGZyb20gJ25leHQnIGFuZCAnb3BlbmFpJyBsaWJyYXJpZXNcbmltcG9ydCB7TmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZX0gZnJvbSAnbmV4dCc7IC8vIE5leHQuanMgQVBJIHJvdXRlIGhhbmRsaW5nXG5pbXBvcnQgb3BlbmFpIGZyb20gJy4uLy4uL2xpYnMvb3BlbmFpJzsgLy8gT3BlbkFJIFNES1xuaW1wb3J0IHsgQ2hhdENvbXBsZXRpb25SZXF1ZXN0TWVzc2FnZSwgQ2hhdENvbXBsZXRpb25SZXF1ZXN0TWVzc2FnZVJvbGVFbnVtLCBDcmVhdGVDb21wbGV0aW9uUmVxdWVzdCB9IGZyb20gJ29wZW5haSc7IC8vIE9wZW5BSSBBUEkgbW9kZWxzXG5cbi8vIERlZmluZSB0aGUgZGVmYXVsdCBleHBvcnQsIGFuIGFzeW5jIGZ1bmN0aW9uIHRoYXQgaGFuZGxlcyB0aGUgcmVxdWVzdCBhbmQgcmVzcG9uc2VcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoXG4gIHJlcTogTmV4dEFwaVJlcXVlc3QsIC8vIFRoZSByZXF1ZXN0IG9iamVjdFxuICByZXM6IE5leHRBcGlSZXNwb25zZSwgLy8gVGhlIHJlc3BvbnNlIG9iamVjdFxuKSB7XG4gIFxuICAvLyBFeHRyYWN0ICd0ZXh0JyBmcm9tIHRoZSByZXF1ZXN0IGJvZHkuIEFzc3VtaW5nIHRoYXQgJ3RleHQnIGZpZWxkIGlzIHNlbnQgaW4gdGhlIHJlcXVlc3QgYm9keS5cbiAgY29uc3QgeyB0ZXh0IH0gPSByZXEuYm9keTsgXG5cbiAgLy8gQ2FsbHMgT3BlbkFJJ3MgY3JlYXRlQ29tcGxldGlvbiBtZXRob2Qgd2l0aCBzcGVjaWZpYyBwYXJhbWV0ZXJzXG4gIC8vIG1vZGVsOiBUaGUgSUQgb2YgdGhlIG1vZGVsIHRvIHVzZSBmb3IgdGhlIHRleHQgZ2VuZXJhdGlvblxuICAvLyBwcm9tcHQ6IFRoZSB0ZXh0IHRvIGJhc2UgdGhlIGNvbXBsZXRpb24gb25cbiAgLy8gbWF4X3Rva2VuczogVGhlIG1heGltdW0gbGVuZ3RoIG9mIHRoZSBnZW5lcmF0ZWQgdGV4dFxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG9wZW5haS5jcmVhdGVDb21wbGV0aW9uKHtcbiAgICBtb2RlbDogXCJ0ZXh0LWRhdmluY2ktMDAzXCIsXG4gICAgcHJvbXB0OiB0ZXh0LFxuICAgIG1heF90b2tlbnM6IDI4MDAsXG4gIH0pO1xuXG4gIC8vIEV4dHJhY3RzIHRoZSBjb21wbGV0aW9uIHRleHQgZnJvbSB0aGUgZmlyc3QgY2hvaWNlIGluIHRoZSBkYXRhIGFycmF5IGluIHRoZSByZXNwb25zZVxuICBjb25zdCBjb21wbGV0aW9uVGV4dCA9IHJlc3BvbnNlLmRhdGEuY2hvaWNlc1swXTsgXG5cbiAgLy8gU2VuZHMgYSBzdWNjZXNzICgyMDApIHN0YXR1cyBjb2RlIGFuZCB0aGUgY29tcGxldGlvbiB0ZXh0IGluIHRoZSByZXNwb25zZVxuICByZXMuc3RhdHVzKDIwMCkuanNvbih7IGNvbXBsZXRpb25UZXh0IH0pO1xufVxuIl0sIm5hbWVzIjpbIm9wZW5haSIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJ0ZXh0IiwiYm9keSIsInJlc3BvbnNlIiwiY3JlYXRlQ29tcGxldGlvbiIsIm1vZGVsIiwicHJvbXB0IiwibWF4X3Rva2VucyIsImNvbXBsZXRpb25UZXh0IiwiZGF0YSIsImNob2ljZXMiLCJzdGF0dXMiLCJqc29uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/completion.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/completion.ts"));
module.exports = __webpack_exports__;

})();