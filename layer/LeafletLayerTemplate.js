/*
 * Leaflet layer plugins inherit from Leaflet's Layer class. A common
 * naming convention is to add the name of the layer plugin to Leaflet's
 * namespace, which is L.
 */
L.LeafletLayerTemplate = L.Layer.extend({

  /*
   * Leaflet calls the initialize function when an instance of the plugin
   * layer is created with a call to new.
   */
  initialize: function(options) {
    /*
     * A common layer plugin pattern is to pass in the position of the layer
     * and record the postion to be able to use it when handling events.
     */
    this._latLng = options.latLng;

    // Continue initializing the layer plugin here.
  },

  /*
   * Leaflet calls the onAdd function when the layer is added to the map:
   *
   *   layer.addTo(map);
   *   map.addControl(layer);
   */
  onAdd: function(map) {

    // Retain a reference to the map to be able to use it when handling events.
    this._map = map;

    /*
     * Create the DOM element that will contain the layer. The leaflet-layer-template
     * CSS class is defined in the LeafletLayerTemplate.css file. The leaflet-zoom-hide
     * CSS class is defined by Leaflet to hide layers when zooming to improve performance.
     */
    var layerElementTag = 'div';
    var layerElementClasses = '.leaflet-layer-template leaflet-zoom-hide';
    this._layerElement = L.DomUtil.create(layerElementTag, layerElementClasses);

    // Add the layer element to the Leaflet pane that holds layers.
    map.getPanes().overlayPane.appendChild(this._layerElement);

    // Start listening for Leaflet's viewreset events that are generated when the map is zoomed.
    map.on('viewreset', this._updatePosition, this);

    // Give the layer element the correct initial postion.
    this._updatePosition();
  },

  /*
   * Our custom handler for Leaflet's viewreset events that are generated
   * when the map is zoomed. This function should update the position of
   * the layer to correspond to changes in the map after zooming.
   */
  _updatePosition: function() {
    /*
     * Calculate the coordinates of the point on screen (position) that corresponds
     * to the latitude and longitude coordinates on the map (this._latLng).
     */
    var position = this._map.latLngToLayerPoint(this._latLng);
    // Update the position of the layer element with the new screen location of the layer.
    L.DomUtil.setPosition(this._layerElement, position);
  },

  /*
   * Leaflet calls the onRemove function when a layer is removed from the map:
   *
   *   layer.removeFrom(map);
   *   map.removeLayer(layer);
   */
  onRemove: function(map) {
    // Remove the layer element from the Leaflet pane that holds layers.
    map.getPanes().overlayPane.removeChild(this._layerElement);

    // Stop listening for viewreset events.
    map.off('viewreset', this._updatePosition, this);
  }

});

/*
 * The standard Leaflet plugin creation pattern is to implement a factory function that
 * enables the creation of the plugin to be chained with other function calls:
 *
 *   L.leafletLayerTemplate().addTo(map);
 *
 * The common convention is to name the factory function after the class of the layer
 * plugin but make the first letter lower case.
 */
L.leafletLayerTemplate = function(options) {
  return new L.LeafletLayerTemplate(options);
};
