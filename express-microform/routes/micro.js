'use strict';

const cybersourceRestApi = require('cybersource-rest-client');

function generate_capture_context_with_checkout_api(callback) {
	try {
		const configObject = {
			authenticationType: 'http_signature',
			runEnvironment: 'apitest.cybersource.com',
			merchantID: 'cxpay_cw_cxpay2fund',
			merchantKeyId: '979a3532-e85f-4b15-85dd-ac1319505d48',
			merchantsecretKey: 'LtcEheRqwki6JefksU37zaDfgdE43Jkm2USRe01Zv2Y=',
			logConfiguration: {
				enableLog: false // Ensure logging is properly configured
			}
		};

		const apiClient = new cybersourceRestApi.ApiClient();
		const requestObj = new cybersourceRestApi.GenerateCaptureContextRequest();

		requestObj.clientVersion = 'v2.0';
		requestObj.targetOrigins = ["http://localhost:3000"];
		requestObj.allowedCardNetworks = ["VISA", "MAESTRO", "MASTERCARD", "AMEX", "DISCOVER", "DINERSCLUB", "JCB", "CUP", "CARTESBANCAIRES"];

		const instance = new cybersourceRestApi.MicroformIntegrationApi(configObject, apiClient);

		instance.generateCaptureContext(requestObj, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			} else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Generate Capture Context : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	} catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}

if (require.main === module) {
	generate_capture_context_with_checkout_api(function () {
		console.log('\nGenerate Capture Context with checkout API end.');
	});
}

module.exports.generate_capture_context_with_checkout_api = generate_capture_context_with_checkout_api;