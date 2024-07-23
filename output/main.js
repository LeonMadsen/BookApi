/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./sass/style.scss":
/*!*************************!*\
  !*** ./sass/style.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://bookshop/./sass/style.scss?");

/***/ }),

/***/ "./src/bookz.js":
/*!**********************!*\
  !*** ./src/bookz.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchBooks: () => (/* binding */ fetchBooks)\n/* harmony export */ });\n/* jshint esversion: 6 */\r\nlet startIndex = 0;\r\nconst apiKey = \"AIzaSyAWp0XyrtpVfw0HUbCQdr-Jzl-2yyqpHiI\";\r\n\r\nconst booksStorage = JSON.parse(localStorage.getItem('cart')) ?? [];\r\n\r\nfunction fetchBooks(category) {\r\n    const query = `subject:${encodeURIComponent(category)}`;\r\n    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`;\r\n\r\n    fetch(apiUrl)\r\n        .then(response => {\r\n            if (!response.ok) {\r\n                throw new Error('Ошибка связи');\r\n            }\r\n            return response.json();\r\n        })\r\n        .then(data => {\r\n            const booksContainer = document.querySelector('.books');\r\n            booksContainer.innerHTML = '';\r\n            data.items.forEach(book => {\r\n                const bookElement = document.createElement('div');\r\n                bookElement.classList.add('book');\r\n\r\n                const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';\r\n                const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : '';\r\n                const title = book.volumeInfo.title;\r\n                const ratingsCount = book.volumeInfo.ratingsCount ? `Ratings: ${book.volumeInfo.ratingsCount}` : '';\r\n                                \r\n                let description = book.volumeInfo.description ? book.volumeInfo.description : '';\r\n                const maxLength = 3 * 60; \r\n                if (description.length > maxLength) {\r\n                    description = description.substring(0, maxLength) + '...';\r\n                }\r\n                                \r\n                const retailPrice = book.saleInfo && book.saleInfo.listPrice && book.saleInfo.listPrice.amount ? `${book.saleInfo.listPrice.amount} ${book.saleInfo.listPrice.currencyCode}` : '';\r\n\r\n\r\n                           bookElement.innerHTML = `\r\n                    <img src=\"${thumbnail}\" alt=\"Thumbnail\">\r\n                    <div class=\"book-info\">\r\n                        <p class=\"authors\">${authors}</p>\r\n                        <h2 class=\"book-title\">${title}</h2>\r\n                        <p>${ratingsCount}</p>\r\n                        <p class=\"authors\">${description}</p>\r\n                        <p class=\"price\">${retailPrice}</p>\r\n                       <button data-id=\"${book.id}\" class='button btn-buy'>${booksStorage.includes(book.id) ? 'IN THE CART' : 'BUY NOW'}</button>\r\n                    </div>\r\n                `;\r\n                booksContainer.appendChild(bookElement);\r\n            });\r\n            startIndex += 6; \r\n        })\r\n        .catch(error => {\r\n            console.error('Ошибка при загрузке данных:', error);\r\n        });\r\n    }\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n    const cartCount = document.getElementById('cartCount');\r\n    const booksStorage = JSON.parse(localStorage.getItem('cart')) ?? [];\r\n\r\n    function updateCartCount() {\r\n        cartCount.innerText = booksStorage.length;\r\n        if (booksStorage.length > 0) {\r\n            cartCount.style.display = 'block'; \r\n        } else {\r\n            cartCount.style.display = 'none'; \r\n        }\r\n    }\r\n    updateCartCount();\r\n\r\n    const categoryItems = document.querySelectorAll('.category');\r\n    let initialCategory = '';\r\n    categoryItems.forEach(item => {\r\n        if (item.classList.contains('sidebar-active')) {\r\n            initialCategory = item.textContent.trim();\r\n        }\r\n\r\n        item.addEventListener('click', () => {\r\n            document.querySelector('.category.sidebar-active').classList.remove('sidebar-active');\r\n            item.classList.add('sidebar-active');\r\n            const category = item.textContent.trim();\r\n            startIndex = 0; \r\n            fetchBooks(category);\r\n        });\r\n    });\r\n\r\n    document.addEventListener('click', (event) => {\r\n        if(event.target.classList.contains('btn-buy')){\r\n            const id = event.target.getAttribute('data-id');\r\n            const index = booksStorage.indexOf(id);\r\n                     if (event.target.textContent === 'BUY NOW') {\r\n                        event.target.textContent = 'IN THE CART';\r\n                        event.target.classList.add('pushed-btn');\r\n                        booksStorage.push(id);\r\n                        localStorage.setItem('cart', JSON.stringify(booksStorage))\r\n                }else { \r\n                    event.target.textContent = 'BUY NOW';\r\n                    event.target.classList.remove('pushed-btn');\r\n                    booksStorage.splice(booksStorage.indexOf(id), 1)\r\n                    }\r\n                localStorage.setItem('cart', JSON.stringify(booksStorage));\r\n                updateCartCount();\r\n        }\r\n    })\r\n        fetchBooks(initialCategory);\r\n    });\r\n    \r\n   \r\n    const loadMore = document.querySelector('.position'); \r\n    loadMore.addEventListener('click', () => {\r\n        const activeCategory = document.querySelector('.category.sidebar-active').textContent.trim();\r\n        fetchBooks(activeCategory); \r\n    });\r\n\n\n//# sourceURL=webpack://bookshop/./src/bookz.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _slide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slide.js */ \"./src/slide.js\");\n/* harmony import */ var _bookz_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bookz.js */ \"./src/bookz.js\");\n/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sass/style.scss */ \"./sass/style.scss\");\n/* jshint esversion: 6 */\r\n\r\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n    (0,_slide_js__WEBPACK_IMPORTED_MODULE_0__.initializeSlider)();\r\n});\n\n//# sourceURL=webpack://bookshop/./src/index.js?");

/***/ }),

/***/ "./src/slide.js":
/*!**********************!*\
  !*** ./src/slide.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initializeSlider: () => (/* binding */ initializeSlider)\n/* harmony export */ });\n/* jshint esversion: 6 */\r\nlet sliderCount = 0;\r\nlet sliderWidth;\r\n\r\nconst sliderImg = document.querySelectorAll(\".slider-image\");\r\nconst sliderLine = document.querySelector(\".slider-line\");\r\nconst sliderDots = document.querySelectorAll(\".dot\");\r\n\r\nfunction initializeSlider() {\r\n    setInterval(() => {\r\n    nextSlider();\r\n}, 5000);\r\nshowSlide();\r\n\r\nfunction showSlide() {\r\n    sliderWidth = document.querySelector(\".slider\").offsetWidth;\r\n    sliderLine.style.width = sliderWidth * sliderImg.length + \"px\";\r\n    sliderImg.forEach(item => item.style.width = sliderWidth + \"px\");\r\n    rollSlider();\r\n}\r\n\r\nfunction nextSlider() {\r\n    sliderCount++;\r\n    if (sliderCount >= sliderImg.length) sliderCount = 0;\r\n    rollSlider();\r\n    thisSlide(sliderCount);\r\n}\r\n\r\nfunction rollSlider() {\r\n    sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;\r\n}\r\n\r\nfunction thisSlide(index) {\r\n    sliderDots.forEach(item => item.classList.remove(\"active\"));\r\n    sliderDots[index].classList.add(\"active\");\r\n}\r\n\r\nsliderDots.forEach((dot, index) => {\r\n    dot.addEventListener(\"click\", () => {\r\n        sliderCount = index;\r\n        rollSlider();\r\n        thisSlide(sliderCount);\r\n    });\r\n});\r\n}\n\n//# sourceURL=webpack://bookshop/./src/slide.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;