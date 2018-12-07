function initMap() {
    // The location of Uluru
    var uluru = new google.maps.LatLng(50.876135, 3.339187000000038);
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
  }