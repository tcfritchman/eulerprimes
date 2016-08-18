$('#submit-single').click(function() {
  var xval = $('#x').val();
  var yval = $('#y').val();
  $.get('single/', {x: xval, y: yval}, function(data, status) {
    if (status === 'success') {
      $('#results-container').html(data);
    } else {
      $('#results-container').html('<p>Error! Recieved status: ' + status + '</p>');
    }
  });
});

$('#submit-multi').click(function() {
  var text = $('#csv').val();
  $.get('multi/', {csv: text}, function(data, status) {
    if (status === 'success') {
      $('#results-container-multi').html(data);
    } else {
      $('#results-container-multi').html('<p>Error! Recieved status: ' + status + '</p>');
    }
  });
});
