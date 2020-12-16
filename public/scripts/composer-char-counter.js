$(document).ready(function() {

  $('.container').find('.tweet-text').keyup(function(event) {
    const counter = $(event.target.nodeName).parentsUntil('.container').find('.counter');
    const numberChars = event.target.value.length;
    const charsLeft = 140 - numberChars;

    counter.html(charsLeft);

    if (charsLeft < 0) {
      counter.switchClass("counter-positive","counter-negative", 1000, "swing");
    } else {
      counter.switchClass("counter-negative","counter-positive", 1000, "swing");
    }

  });
});