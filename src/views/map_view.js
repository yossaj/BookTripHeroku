const leaflet = require('leaflet');
const PubSub = require('../helpers/pub_sub')

const MapView = function (mapDiv, coords, zoomLevel) {
    this.mapDiv = mapDiv;
    this.coords = coords;
    this.zoomLevel = zoomLevel;
    this.leafletMap = null;
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

   
    this.leafletMap.setView(view, 5)

    // locations.forEach(location => this.leafletMap.removeLayer(location.addTo(this.leafletMap)))
    let markers = locations.map(location => location.addTo(this.leafletMap))
    this.leafletMap.removeLayer(markers)

    // this.leafletMap.on('click', function () {
    //     this.leafletMap.removeLayer(markers);
    // });
    console.log(markers)
   

    
    // var overlayMaps = {
    //     "Cities": locations
    // };
    // L.control.layers(locations).addTo(this.leafletMap);
    // leaflet.layers(locations).addTo(this.leafletMap);;
    // let theMarker = L.marker(coords[0]).addTo(this.leafletMap); 
    // if (theMarker != undefined) {
    //     this.leafletMap.removeLayer(theMarker);
    // }
    
  
}
module.exports = MapView;