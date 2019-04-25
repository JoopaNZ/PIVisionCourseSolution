(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = { 
		typeName: "plotlygauge",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
		getDefaultConfig: function(){ 
			return { 
				DataShape: 'TimeSeries',
				DataQueryMode: 3,
				Height: 150,
				Width: 150 
			} 
		}
	}

	symbolVis.prototype.init = function(scope, elem) {

		this.onDataUpdate = dataUpdate;
		
		var firstLoad = true;
	
		function dataUpdate(data)
		{
			// Enter a speed between 0 and 180
			
			if(!data)
				return;
				
			
			let plotData = [];
			for(var dl = 0; dl < data.Data.length; dl++)
			{
				let dataValues = data.Data[dl].Values.map(function(v){return v.Value});
				plotData[dl] = {
					y: dataValues,
					type: 'box'
					
				}
			}
			
			var y0 = [];
			var y1 = [];
			for (var i = 0; i < 50; i ++) {
				y0[i] = Math.random();
				y1[i] = Math.random() + 1;
			}

			var trace1 = {
			  y: y0,
			  type: 'box'
			};

			var trace2 = {
			  y: y1,
			  type: 'box'
			};

			//var data = [trace1, trace2];

			
			if(firstLoad)
				Plotly.newPlot('myDiv', plotData);
			else
				Plotrly.react('myDiv', plotData);
			
		}

	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
