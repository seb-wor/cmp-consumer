(function(window) {
	window.__cmp = (function() {
		window.addEventListener('message', function(event) {
			window.__cmp.receiveMessage(event);
		});

		var commandQueue = [];
		var cmp = function(command, parameter, callback) {
			commandQueue.push({
				command: command,
				parameter: parameter,
				callback: callback
			});
		};
		cmp.commandQueue = commandQueue;
		cmp.receiveMessage = function(event) {
			var data = event && event.data && event.data.__cmpCall;
			if (data) {
				commandQueue.push({
					callId: data.callId,
					command: data.command,
					parameter: data.parameter,
					event: event
				});
			}
		};
		cmp.config = {
			customPurposeListLocation: 'docs/purposes.json',
			globalConsentLocation: 'docs/portal.html',
			storeConsentGlobally: true,
			forceLocale: 'da-dk'
		};
		return cmp;
	}());
})(window);

function handleConsentResult(cmp, vendorList, vendorConsents) {
	var created = vendorConsents && vendorConsents.created;
	if (!created) {
		cmp('showConsentTool');
	}
}

function checkConsent(cmp) {
	if(cmp && window.navigator.cookieEnabled) {
		cmp('getVendorList', null, function(vendorList) {
			const timeout = setTimeout(function() {
				handleConsentResult(cmp, vendorList);
			}, 100);

			cmp('getVendorConsents', null, function(vendorConsents) {
				clearTimeout(timeout);
				//console.log(vendorList, vendorConsents);
				handleConsentResult(cmp, vendorList, vendorConsents);
			});
		});
	}
}

__cmp('addEventListener', 'cmpReady', function(result) {
	checkConsent(window.__cmp);
});
