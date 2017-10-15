/* global ga */
// eslint-disable-next-line max-params
window.trackEvent = function(category, action, label, value) {
	if (window.DEBUG) {
		utils.log('trackevent', category, action, label, value);
		return;
	}
	if (window.ga) {
		ga('send', 'event', category, action, label, value);
	}
};
