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
				Height: 400,
				Width: 800 
			} 
		}
	}

	symbolVis.prototype.init = function(scope, elem) {

		this.onDataUpdate = dataUpdate;
		
		var labels = [];
		var firstLoad = true;
		
		var layout = {
		  title: {
			 text: 'Fan vibration'
		  },
		  displayModeBar: false,
		  xaxis: {
			visible: false
		  },
		  margin:{
			  t:40,
			  b:0,
			  pad:0
			}
		  
		};
	
		function dataUpdate(data)
		{
			// Enter a speed between 0 and 180
			
			if(!data)
				return;
			if(labels.length != data.Data.length)
					labels = [];
			
			let plotData = [];
			
			for(var dl = 0; dl < data.Data.length; dl++)
			{
				let dataValues = data.Data[dl].Values.map(function(v){return v.Value});
				if(data.Data[dl].Label)
				{
					
					labels[dl] = data.Data[dl].Label.split('|')[0]
					
				}
					
				plotData[dl] = {
					y: dataValues,
					type: 'box',
					name: labels[dl],
					boxmean: 'sd'
				}
			}
			
		
			
			if(firstLoad)
				Plotly.newPlot('myDiv', plotData, layout);
			else
				Plotrly.react('myDiv', plotData, layout);
			
		}

	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
