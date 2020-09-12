'use strict';
var exceltojson = require('./xlstojson.js');
module.exports = {

	getSpecsFromXlsx: function (env) {
		exceltojson.setdupata(env);
		var parse_XLSX = require('./parseXLSX.js');
		var specs = [];
		console.log('ENV from runparam==' + env);
		if (env == 'DEV')
			var result = parse_XLSX.parseXLSX('./RunManager_DEV.xls');
		else if (env == 'PROD')
			var result = parse_XLSX.parseXLSX('./RunManager_PROD.xls');

		if (result.length > 1) {
			//remove title row
			result.splice(0, 1);
			//loop remaining rows
			result.forEach(function (item, index) {
				if (item[1] && "yes" == item[1].toLowerCase()) {
					specs.push(item[2] + "/" + item[0] + ".feature");
				}
			});
		}
		//console.log(specs);	   
		return specs;
	}

};

