
var google;

function init() {
    // Verify the Maps API loaded
    if (!window.google || !google.maps) {
        if (window.console) console.error('Google Maps JavaScript API not available');
        var ms = document.getElementById('map-status');
        if (ms) { ms.style.display = 'block'; ms.innerText = 'Map failed to load: Google Maps API not available. Check your API key and network.'; }
        return;
    }
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    // var myLatlng = new google.maps.LatLng(40.71751, -73.990922);
    var myLatlng = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
    // 39.399872
    // -8.224454
    
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 7,

        // The latitude and longitude to center the map (always required)
        center: myLatlng,

        // How you would like to style the map. 
        scrollwheel: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            }
        ]
    };

    

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');
    if (!mapElement) {
        if (window.console) console.error('Map container element (#map) not found');
        var ms2 = document.getElementById('map-status');
        if (ms2) { ms2.style.display = 'block'; ms2.innerText = 'Map container not found in the page.'; }
        return;
    }

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    
    var addresses = ['New York'];

    // Use the Google Maps JS API Geocoder instead of an external HTTP call
    // This avoids mixed-content and CORS issues and works over HTTPS
    var geocoder = new google.maps.Geocoder();
    for (var x = 0; x < addresses.length; x++) {
        (function(addr){
            geocoder.geocode({ address: addr }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK && results[0]) {
                    var p = results[0].geometry.location;
                    new google.maps.Marker({
                        position: p,
                        map: map,
                        icon: 'images/loc.png'
                    });
                    // Optionally center the map on the first marker
                    // map.setCenter(p);
                    var ms3 = document.getElementById('map-status');
                    if (ms3) { ms3.style.display = 'none'; }
                } else {
                    // Log the geocoding failure for debugging
                    if (window.console) console.warn('Geocode failed for', addr, 'status:', status);
                    var ms4 = document.getElementById('map-status');
                    if (ms4) { ms4.style.display = 'block'; ms4.innerText = 'Geocoding failed for: ' + addr + ' (' + status + ')'; }
                }
            });
        })(addresses[x]);
    }
    
}

// The Maps JS API will call init via the callback parameter when the script loads.
// We remove DOM listener usage to avoid double-initialization. If you load the API
// without &callback=init, you can call init() manually or re-add a listener.