'use strict';

var components = {
	'shift-slider': require('../components/shift-slider.js'),
	'page-slider': require('../components/page-slider.js'),
	'global-menu': require('../components/global-menu.js'),
	'page-intro': require('../components/page-intro.js'),
	'custom-select': require('../components/custom-select.js'),
	'brochure': require('../components/brochure.js'),
	'frontpage': require('../controllers/frontpage-controller.js'),
	'product-details': require('../controllers/product-details-controller.js'),
	'news-details': require('../controllers/news-details-controller.js'),
	'products-overview': require('../controllers/products-overview-controller.js'),
	'news-overview': require('../controllers/news-overview-controller.js'),
	'cases-overview': require('../controllers/cases-overview-controller.js'),
	'catalogue': require('../controllers/catalogue-controller.js'),
	'retailers': require('../controllers/retailers-controller.js'),
};


var load = function (componentName) {
	return components[componentName];
};


module.exports = {
	load: load
};
