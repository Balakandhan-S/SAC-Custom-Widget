(function() {
 let tmpl = document.createElement('template');
 tmpl.innerHTML = `
	<script data-main = "main" src = "require.js"></script>
	<div id="mydiv">Hello</div>
    `;

 customElements.define('com-sap-sample-helloworld1', class HelloWorld1 extends HTMLElement {


  constructor() {
   super();
   this._shadowRoot = this.attachShadow({
    mode: "open"
   });
   this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
   this._firstConnection = false;

  }

  //Fired when the widget is added to the html DOM of the page
  connectedCallback() {
   this._firstConnection = true;
      let LoadLibs = async function(host, data, props) {
    try {
     await host.loadScript("https://d3js.org/d3.v4.min.js", shadow);
     await host.loadScript("https://d3js.org/d3-force.v1.min.js", shadow);
     await host.loadScript("https://d3js.org/d3-scale.v1.min.js", shadow);
     await host.loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js", shadow);
    } catch (e) {
     console.log(JSON.stringify(e));
    } finally {
     host.redraw();;
    }
   };
   LoadLibs(this, this.$data, this._props);
   this._init = false;
  }
   
  }

  //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
  disconnectedCallback() {

  }

  //When the custom widget is updated, the Custom Widget SDK framework executes this function first
  onCustomWidgetBeforeUpdate(oChangedProperties) {

  }

  //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
  onCustomWidgetAfterUpdate(oChangedProperties) {
   if (this._firstConnection) {

    let LoadLibsAfterUpdate = async function(host, data, props) {
     try {
      await host.loadScript("https://d3js.org/d3.v4.min.js", shadow);
      await host.loadScript("https://d3js.org/d3-force.v1.min.js", shadow);
      await host.loadScript("https://d3js.org/d3-scale.v1.min.js", shadow);
      await host.loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js", shadow);
     } catch (e) {
      console.log(JSON.stringify(e));
     } finally {
      host.redraw();
     }
    };
    if (!(this._init || this._selectionEvent)) {
     if (this._firstUpdate) {
      LoadLibsAfterUpdate(this, this.$data, this._props);
      this._firstUpdate = false;
     } else {
      this.(this.$data, this._props);
     }
    }
   }

  }

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
   require(['https://d3js.org/d3.v4.min.js'], function() {
    var a = d3.select("#mydiv");
    a.append("p").text("ecece");
   });

  }
 });
})();
