var typingTimer;
var deleteTimer;
var doneTypingInterval = 10;
var finaldoneTypingInterval = 500;
var deleteTimeInterval = 2000;
var typed = true;
var deleter = [];

var oldData = $("p.typingStatus").html();
$('#textBox').keydown(function() {
  typed = true;
  for (var i = 1; i < deleter.length; i++) {
    clearTimeout(deleter[i]);
  };
  clearTimeout(typingTimer);
  clearTimeout(deleteTimer);
  if ($('#textBox').val) {
    typingTimer = setTimeout(function() {
      $("p.typingStatus").html("typing...");
    }, doneTypingInterval);
  }
});

$('#textBox').keyup(function() {
  $(this).attr("placeholder", "Everything's gone");
  clearTimeout(typingTimer);
  typingTimer = setTimeout(function() {
    $("p.typingStatus").html("deleting...");
  }, finaldoneTypingInterval);

  clearTimeout(deleteTimer);
    typed = false;

  deleteTimer = setTimeout(function() {
    var txt = $("#textBox");
    var curlength = txt.val().length - 1;
    for (var j = 0; j < txt.val().length; j++) {
      if (typed) break;
      deleter[j] = setTimeout(function() {
        if (!typed && txt.val().length > 0) txt.val(txt.val().slice(0,-1));
      }, j*500);
    }
  }, deleteTimeInterval);
});
