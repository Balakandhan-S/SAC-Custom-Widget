
(function() {
	const template = document.createElement('template');
	template.innerHTML = `	
	`;
		
	let count = 1;
	let script = document.createElement('script');
	let height = 200, width = 300, margin = 70;
	customElements.define('animated-barchart', class animated_BarChart extends HTMLElement {
	

		constructor() {
			super();
			this._domAttached = false;
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			console.log("Constructor.. "+count);
			count = count + 1;
			if(this._domAttached){
				this.redraw();
			}
		}

		//Fired when the widget is added to the html DOM of the page
		connectedCallback() {
			script.src = 'https://d3js.org/d3.v5.min.js';
			script.charset='utf-8'
			script.type='text/javascript'
			document.head.append(script);
	    		console.log("D3 script appended...");	 
			script.onload = () => {
		    		console.log("script loaded...");
				this.redraw();
			};
			this._domAttached = true;
		}
   
		//Fired when the widget is removed from the html DOM of the page (e.g. by hide)
		disconnectedCallback() {
			console.log("deleted");
		}

		//When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {

		}

		//When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
			
		}

		//When the custom widget is removed from the canvas or the analytic application is closed
		onCustomWidgetDestroy() {}


		//When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
		// Commented out by default.  If it is enabled, SAP Analytics Cloud will track DOM size changes and call this callback as needed
		//  If you don't need to react to resizes, you can save CPU by leaving it uncommented.
  
		onCustomWidgetResize(_width, _height){
			console.log(_width+"   "+_height);
			width = _width;
			height = _height;
			d3.select(this.shadowRoot).select("svg").remove();
			this.redraw();
		}
  		

		redraw() {
	  
			console.log("redraw...");  
			var svg = d3.select(this.shadowRoot).append("svg")
   			.attr("width", width).attr("height", height ).style("background-color","lightgray");
    			var xScale = d3.scaleBand().range([0, width]).padding(0.4),
      			yScale = d3.scaleLinear().range([height, 0]);

    			var g = svg.append("g")
      			.attr("transform", "translate(" + margin/2 + "," + margin/2 + ")");

			var data = [{
			"year": 2011,
			"value": 45
			},
			{
			"year": 2012,
			"value": 47
			},
			{
			"year": 2013,
			"value": 52
			},
			{
			"year": 2014,
			"value": 70
			},
			{
			"year": 2015,
			"value": 75
			},
			{
			"year": 2016,
			"value": 78
			}
			];

			xScale.domain(data.map(function(d) {
			return d.year;
			}));
			yScale.domain([0, d3.max(data, function(d) {
			return d.value;
			})]);

			g.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(xScale));

			g.append("g")
			.call(d3.axisLeft(yScale).tickFormat(function(d) {
			return "$" + d;
			}).ticks(10));


			g.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("style", "fill:steelblue")
			.attr("x", function(d) {
			return xScale(d.year);
			})
			.attr("y", function(d) {
			return yScale(d.value);
			})
			.attr("width", xScale.bandwidth())
			.attr("height", function(d) {
			return height - yScale(d.value);
			})
			.on("mouseover", function() {
			d3.select(this)
			  .style("fill", "orange");
			})
			.on("mouseout", function() {
			d3.select(this)
			  .style("fill", "steelblue")
			});


		}
 
	});
})();
