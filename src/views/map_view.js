const leaflet = require('leaflet');
const PubSub = require('../helpers/pub_sub')

const MapView = function (mapDiv, coords, zoomLevel) {
    this.mapDiv = mapDiv;
    this.coords = coords;
    this.zoomLevel = zoomLevel;
    this.leafletMap = null;
    this.markers = null;
}

MapView.prototype.init = function () {
    // more tile providers here - http://leaflet-extras.github.io/leaflet-providers/preview/index.html
    const CARTOUrl = 'https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png';
    const CARTOTileLayer = new leaflet.TileLayer(CARTOUrl, {
        attribution: ' <a href="https://www.openstreetmap.org/"></a> ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/"></a>, ' +
            ' <a href="https://www.mapbox.com/"></a>',
        id: 'mapbox.streets'
    });

    this.leafletMap = leaflet.map(this.mapDiv)
        .addLayer(CARTOTileLayer)
        .setView([50.863, -1.592], 5)
}

MapView.prototype.bindEvents = function () {
    PubSub.subscribe('Authors Details: markers', (evt) => {
        // const lat = evt.detail.latlng[0] || 0;
        // const lng = evt.detail.latlng[1] || 0;
        // const coords = [lat, lng];
        // const bounds = this.guessBoundsFromAreaAndCoords(evt.detail.area, coords);
        // this.fitBounds(bounds);
        console.log(evt.detail)
        let locations = evt.detail[0]
        let view = (evt.detail[1])
        console.log(view);
        

        this.addMarker(locations, view);
    })
}


MapView.prototype.addMarker = function (locations, view) {


   console.log(locations)
    this.leafletMap.setView(view, 4)
    if(this.markers != null ){
        this.leafletMap.removeLayer(this.markers);
    }
    this.markers = L.layerGroup(locations)
    this.markers.addTo(this.leafletMap)
    console.log(this.markers)
}
module.exports = MapView;