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
exports.id = "pages/api/completionImage";
exports.ids = ["pages/api/completionImage"];
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

/***/ "(api)/./pages/api/completionImage.ts":
/*!**************************************!*\
  !*** ./pages/api/completionImage.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _libs_openai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/openai */ \"(api)/./libs/openai.ts\");\n// Import necessary components and objects from 'next' and 'openai' libraries\n // OpenAI SDK\n// Define the default export, an async function that handles the request and response\nasync function handler(req, res) {\n    // Extract 'prompt' from the request body\n    const { prompt } = req.body;\n    try {\n        // Calls OpenAI's createImage method with specific parameters\n        // prompt: The text to base the image creation on\n        // n: The number of images to generate\n        // size: The size of the image to generate\n        // response_format: The format in which to return the response\n        const response = await _libs_openai__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createImage({\n            prompt,\n            n: 1,\n            size: \"512x512\",\n            response_format: \"b64_json\"\n        });\n        // Sends a success (200) status code and the generated image data in the response\n        res.status(200).json(response.data);\n    } catch (err) {\n        // If there's an error, send the error as the response\n        res.send(err);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvY29tcGxldGlvbkltYWdlLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkVBQTZFO0FBRXRDLENBQUMsYUFBYTtBQUVyRCxxRkFBcUY7QUFDdEUsZUFBZUMsUUFDNUJDLEdBQW1CLEVBQ25CQyxHQUFvQjtJQUVwQix5Q0FBeUM7SUFDekMsTUFBTSxFQUFFQyxNQUFNLEVBQUUsR0FBR0YsSUFBSUc7SUFFdkIsSUFBSTtRQUNGLDZEQUE2RDtRQUM3RCxpREFBaUQ7UUFDakQsc0NBQXNDO1FBQ3RDLDBDQUEwQztRQUMxQyw4REFBOEQ7UUFDOUQsTUFBTUMsV0FBVyxNQUFNTixnRUFBa0JPLENBQUM7WUFDeENIO1lBQ0FJLEdBQUc7WUFDSEMsTUFBTTtZQUNOQyxpQkFBaUI7UUFDbkI7UUFFQSxpRkFBaUY7UUFDakZQLElBQUlRLE9BQU8sS0FBS0MsS0FBS04sU0FBU087SUFDaEMsRUFBRSxPQUFPQyxLQUFLO1FBQ1osc0RBQXNEO1FBQ3REWCxJQUFJWSxLQUFLRDtJQUNYO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXh0LXRvLXZpZGVvLy4vcGFnZXMvYXBpL2NvbXBsZXRpb25JbWFnZS50cz8zMDUyIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydCBuZWNlc3NhcnkgY29tcG9uZW50cyBhbmQgb2JqZWN0cyBmcm9tICduZXh0JyBhbmQgJ29wZW5haScgbGlicmFyaWVzXHJcbmltcG9ydCB7TmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZX0gZnJvbSAnbmV4dCc7IC8vIE5leHQuanMgQVBJIHJvdXRlIGhhbmRsaW5nXHJcbmltcG9ydCBvcGVuYWkgZnJvbSAnLi4vLi4vbGlicy9vcGVuYWknOyAvLyBPcGVuQUkgU0RLXHJcblxyXG4vLyBEZWZpbmUgdGhlIGRlZmF1bHQgZXhwb3J0LCBhbiBhc3luYyBmdW5jdGlvbiB0aGF0IGhhbmRsZXMgdGhlIHJlcXVlc3QgYW5kIHJlc3BvbnNlXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoXHJcbiAgcmVxOiBOZXh0QXBpUmVxdWVzdCwgLy8gVGhlIHJlcXVlc3Qgb2JqZWN0XHJcbiAgcmVzOiBOZXh0QXBpUmVzcG9uc2UsIC8vIFRoZSByZXNwb25zZSBvYmplY3RcclxuKSB7XHJcbiAgLy8gRXh0cmFjdCAncHJvbXB0JyBmcm9tIHRoZSByZXF1ZXN0IGJvZHlcclxuICBjb25zdCB7IHByb21wdCB9ID0gcmVxLmJvZHk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICAvLyBDYWxscyBPcGVuQUkncyBjcmVhdGVJbWFnZSBtZXRob2Qgd2l0aCBzcGVjaWZpYyBwYXJhbWV0ZXJzXHJcbiAgICAvLyBwcm9tcHQ6IFRoZSB0ZXh0IHRvIGJhc2UgdGhlIGltYWdlIGNyZWF0aW9uIG9uXHJcbiAgICAvLyBuOiBUaGUgbnVtYmVyIG9mIGltYWdlcyB0byBnZW5lcmF0ZVxyXG4gICAgLy8gc2l6ZTogVGhlIHNpemUgb2YgdGhlIGltYWdlIHRvIGdlbmVyYXRlXHJcbiAgICAvLyByZXNwb25zZV9mb3JtYXQ6IFRoZSBmb3JtYXQgaW4gd2hpY2ggdG8gcmV0dXJuIHRoZSByZXNwb25zZVxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvcGVuYWkuY3JlYXRlSW1hZ2Uoe1xyXG4gICAgICBwcm9tcHQsXHJcbiAgICAgIG46IDEsXHJcbiAgICAgIHNpemU6IFwiNTEyeDUxMlwiLFxyXG4gICAgICByZXNwb25zZV9mb3JtYXQ6ICdiNjRfanNvbidcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFNlbmRzIGEgc3VjY2VzcyAoMjAwKSBzdGF0dXMgY29kZSBhbmQgdGhlIGdlbmVyYXRlZCBpbWFnZSBkYXRhIGluIHRoZSByZXNwb25zZVxyXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzcG9uc2UuZGF0YSlcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIC8vIElmIHRoZXJlJ3MgYW4gZXJyb3IsIHNlbmQgdGhlIGVycm9yIGFzIHRoZSByZXNwb25zZVxyXG4gICAgcmVzLnNlbmQoZXJyKTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIm9wZW5haSIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJwcm9tcHQiLCJib2R5IiwicmVzcG9uc2UiLCJjcmVhdGVJbWFnZSIsIm4iLCJzaXplIiwicmVzcG9uc2VfZm9ybWF0Iiwic3RhdHVzIiwianNvbiIsImRhdGEiLCJlcnIiLCJzZW5kIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/completionImage.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/completionImage.ts"));
module.exports = __webpack_exports__;

})();