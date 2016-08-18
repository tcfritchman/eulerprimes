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

$('#file-upload').change(function(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    $('#csv').val(contents);
  };
  reader.readAsText(file);
});
