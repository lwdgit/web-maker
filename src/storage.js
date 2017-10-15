(function() {
	var Storage = {
		get: function(keys, callback) {
			var values = {};
			var items = keys;
			if (typeof keys !== 'object') {
				items = {};
				items[keys] = null;
			}
			for (var key in items) {
				if (Object.prototype.hasOwnProperty.call(items, key)) {
					values[key] = JSON.parse(localStorage.getItem(key) || null);
					if (values[key] === null) {
						values[key] = items[key];
					}
				}
			}

			setTimeout(function() {
				callback(values);
			}, 100);
		},
		remove: function(key, callback) {
			localStorage.removeItem(key);
			callback(true);
		},
		set: function(items, callback) {
			try {
				for (var key in items) {
					if (Object.prototype.hasOwnProperty.call(items, key)) {
						localStorage.setItem(key, JSON.stringify(items[key]));
					}
				}
				return callback && callback(true);
			} catch (e) {
				console.log(e);
				return callback && callback(false);
			}
		}
	};
	window.GlobalStorage = {};
	window.GlobalStorage.sync = window.GlobalStorage.local = Storage;
})();
