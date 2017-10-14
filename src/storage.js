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
			}, 1);
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

// A simple error handler to be used throughout this demo.
function errorHandler(error) {
	var message = '';

	switch (error.code) {
		case FileError.SECURITY_ERR:
			message = 'Security Error';
			break;
		case FileError.NOT_FOUND_ERR:
			message = 'Not Found Error';
			break;
		case FileError.QUOTA_EXCEEDED_ERR:
			message = 'Quota Exceeded Error';
			break;
		case FileError.INVALID_MODIFICATION_ERR:
			message = 'Invalid Modification Error';
			break;
		case FileError.INVALID_STATE_ERR:
			message = 'Invalid State Error';
			break;
		default:
			message = 'Unknown Error';
			break;
	}

	console.log(message);
}

// Request a FileSystem and set the filesystem variable.
function initFileSystem() {
	navigator.webkitPersistentStorage.requestQuota(
		1024 * 1024 * 5,
		function(grantedSize) {
			// Request a file system with the new size.
			window.requestFileSystem(
				window.PERSISTENT,
				grantedSize,
				function(fs) {
					// Set the filesystem variable.
					window.fs = fs;
				},
				errorHandler
			);
		},
		errorHandler
	);
}
window.requestFileSystem =
	window.requestFileSystem || window.webkitRequestFileSystem;
if (window.requestFileSystem) {
	initFileSystem();
} else {
	alert("Sorry! Your browser doesn't support the FileSystem API :(");
}
