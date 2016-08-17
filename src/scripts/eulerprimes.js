$('#submit-single').click(function() {
  console.log('clicked!');
  var xval = $('#x').val();
  var yval = $('#y').val();
  $.get('single/', {x: xval, y: yval}, function(data, status) {
    console.log(status);
    if (status === 'success') {
      $('#results-container').html(data);
    } else {
      $('#results-container').html('<p>Error! Recieved status: ' + status + '</p>');
    }
  });
});
