
  //When the custom widget is removed from the canvas or the analytic application is closed
  onCustomWidgetDestroy() {}


  //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
  // Commented out by default.  If it is enabled, SAP Analytics Cloud will track DOM size changes and call this callback as needed
  //  If you don't need to react to resizes, you can save CPU by leaving it uncommented.
  /*
  onCustomWidgetResize(width, height){
      redraw()
  }
  */

  redraw() {
	console.log("redraw");  
	  let script = document.createElement('script');
	   script.src = 'https://d3js.org/d3.v4.min.js';
	   document.head.append(script);
	    script.onload = () => {
			var a = d3.select("#mydiv");
			a.append("p").text("ecece");
		};
      
  }
 
 });
})();
