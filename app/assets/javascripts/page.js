
$( document ).ready(function() {
  $('#form1').hide();
    $('#form2').hide();
    $("#address").hide();
    $('#distance1text').hide();
    $('#distance2text').hide();

    $('#button1').click(function(e){
      $('#form2').hide();
        $('#form1').show();
        e.preventDefault();

    });
    $('#button2').click(function(e){
      $('#form1').hide();
        $('#form2').show();
        e.preventDefault();

    });
  $('.form').submit(function(e){
    $("#address").hide();
    $.ajax({
    url: $(this).attr('action'),
    type: "POST",
    data: $(this).serialize(),
    success: function(json) {
        map_info = new myMap(json.start, json.end, json.distance_covered)
      initMap(map_info)
    } // add errors here
  })
e.preventDefault();

});


});
