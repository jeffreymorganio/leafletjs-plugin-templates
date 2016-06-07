/*
 * Leaflet control plugins inherit from Leaflet's Control class. A common
 * naming convention is to add the name of the control plugin to Leaflet's
 * namespace, which is L.
 */
L.LeafletControlTemplate = L.Control.extend({
  options: {
    position: 'topright'
  },

  /*
   * Leaflet calls the initialize function when an instance of the plugin
   * control is created with a call to new.
   */
  initialize: function(options) {
    // Combine the control plugin's default options with those passed in as the parameter
    L.Util.setOptions(this, options);

    // Continue initializing the control plugin here.
  },

  /*
   * Leaflet calls the onAdd function when the control is added to the map:
   *
   *   control.addTo(map);
   *   map.addControl(control);
   */
  onAdd: function(map) {
    /*
     * Create the DOM element that will contain the control. The leaflet-control-template
     * CSS class is defined in the LeafletControlTemplate.css file.
     */
    var controlElementTag = 'div';
    var controlElementClass = 'leaflet-control-template';
    var controlElement = L.DomUtil.create(controlElementTag, controlElementClass);

    // Continue implementing the control here.

    /*
     * The onAdd function must return the DOM element that contains the plugin
     * control. Leaflet will add this element to the map.
     */
    return controlElement;
  },

  /*
   * Leaflet calls the onRemove function when a control is removed from the map:
   *
   *   control.removeFrom(map);
   *   map.removeControl(control);
   */
  onRemove: function(map) {
    // Tear down the control by releasing resources and removing event listeners, etc.
  },

});

/*
 * The standard Leaflet plugin creation pattern is to implement a factory function that
 * enables the creation of the plugin to be chained with other function calls:
 *
 *   L.leafletControlTemplate().addTo(map);
 *
 * The common convention is to name the factory function after the class of the control
 * plugin but make the first letter lower case.
 */
L.leafletControlTemplate = function(options) {
  return new L.LeafletControlTemplate(options);
};
