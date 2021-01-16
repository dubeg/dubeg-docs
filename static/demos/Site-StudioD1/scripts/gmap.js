// Global variables
var locationCustom = new google.maps.LatLng(33.754573,-118.199906);
var initialZoomLevel = 13; // Max:22, Min:0

// Calls
initializeGMap();


/*====================================================
    Initialize map options
    Src: http://www.supereightstudio.com/contact
====================================================*/
function initializeGMap() {
    //Set control options
    var controlOptions = {
        zoom: initialZoomLevel,
        center: locationCustom,
        scrollwheel: false,
        navigationControl: false,
        scaleControl: false,
        streetViewControl: false,
        draggable: true,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), controlOptions);


    //Create style
    var red_road_styles = [
        {
            featureType: "all",
            stylers: [
              { saturation: -100 }
            ]
        },
        {
            featureType: "road.highway",
            stylers: [
              { hue: "#E1704B" },
              { saturation: 100 }
            ]
        }
    ];

    map.setOptions({ styles: red_road_styles });
}