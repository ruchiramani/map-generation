var map;
function startMap(){
   map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: 40.730610, lng: -73.935242},
         zoom: 5
       });
};


var myMap = function(start, end, distance_covered){
  this.start = start,
  this.end = end,
  this.distance_covered = distance_covered,
  this.start_address = null
  this.end_address = null,
  this.route  = null,
  this.polyline = null
};



function initMap(map_info) {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  map_info.calculateAndDisplayRoute(directionsService,directionsDisplay)
  directionsDisplay.setMap(map);

}



myMap.prototype.calculateAndDisplayRoute = function(directionsService, directionsDisplay){
var that = this
  directionsService.route({
    origin: that.start,
    destination: that.end,
    travelMode: 'DRIVING'
     }, function(response, status) {
    if (status === 'OK') {
     that.route = response;
     directionsDisplay.setDirections(response);
     that.calculateDistance().findAddress()
    } else {
      window.alert('Directions request failed!');
    }
  })
}



myMap.prototype.calculateDistance = function(){

  if (this.distance_covered) {
    //calcualte polyline
  this.polyline = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });
    this.polyline.setPath([]);

    var bounds = new google.maps.LatLngBounds();

    var legs = this.route.routes[0].legs
    var steps = legs[0].steps;
     for (j=0;j<steps.length;j++) {
       var nextSegment = steps[j].path;
       for (k=0;k<nextSegment.length;k++) {
         this.polyline.getPath().push(nextSegment[k]);
         bounds.extend(nextSegment[k]);
       }
     }
   };
   return this
}



myMap.prototype.findAddress = function() {
if(typeof this.start=== "string"){
  var that = this
  geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address' : that.start}, function( results, status ) {
          if( status == google.maps.GeocoderStatus.OK ) {
            that.start = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng())
   console.log(that.start)

         }
       })
       geocoder.geocode( { 'address' : that.end}, function( results, status ) {
               if( status == google.maps.GeocoderStatus.OK ) {
                 that.end = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng())
                 console.log(that.end)
              that.putMarkerOnRoute()
              }
            })
            this.start_address = this.route.routes[0].legs[0].start_address
            this.end_address = this.route.routes[0].legs[0].end_address
       }
       else {
         this.start = new google.maps.LatLng(parseFloat(map_info.start.lat), parseFloat(map_info.start.lng));
         this.end = new google.maps.LatLng(parseFloat(map_info.end.lat), parseFloat(map_info.end.lng));
        this.start_address = this.route.routes[0].legs[0].start_address
        this.end_address = this.route.routes[0].legs[0].end_address
        this.putMarkerOnRoute()
   }
}



 myMap.prototype.putMarkerOnRoute = function() {
   this.total_distance =  google.maps.geometry.spherical.computeDistanceBetween(this.start, this.end);

   if(this.distance_covered) {
  var percentage = 100 * this.distance_covered / this.total_distance
  var distance = (percentage/100) * this.total_distance;
  var distance_point = GetPointAtDistance(distance, this.polyline)
  marker = new google.maps.Marker({
  position: distance_point,
  map: map,
  title: "here",
    })

  function GetPointAtDistance(meters, polyline) {
      if (meters == 0) return polyline.getPath().getAt(0);
      if (meters < 0) return null;
      if (polyline.getPath().getLength() < 2) return null;
      var dist=0;
      var olddist=0;
      for (var i=1; (i < polyline.getPath().getLength() && dist < meters); i++) {
        olddist = dist;
        dist += google.maps.geometry.spherical.computeDistanceBetween(
                  polyline.getPath().getAt(i),
                  polyline.getPath().getAt(i-1)
                );
      }
      if (dist < meters) {
        return null;
      }
      var p1= polyline.getPath().getAt(i-2);
      var p2= polyline.getPath().getAt(i-1);
      var m = (meters-olddist)/(dist-olddist);
      return new google.maps.LatLng( p1.lat() + (p2.lat()-p1.lat())*m, p1.lng() + (p2.lng()-p1.lng())*m);
    }
  }
  this.appendDistance();

}



myMap.prototype.appendDistance = function(){
     $('#address').show();
    if (this.distance_covered){
     $('#distance1text').show();

    var div1v = document.getElementById("distance1");
    div1v.innerHTML = Math.round(this.distance_covered);
    $("#distance2text").show();
    var div2v = document.getElementById("distance2");
    div2v.innerHTML = Math.round(this.total_distance - this.distance_covered);
     }
     $("#distance3text").show();
    var div3v = document.getElementById("distance3");
    div3v.innerHTML = Math.round(this.total_distance);

    origin.innerHTML = this.start_address;

    var destination = document.getElementById("destination");
    destination.innerHTML = this.end_address;

    $('.form').get(0).reset();
    $('.form').get(1).reset();

}
