$(document).ready(function() {

  const counterDefaultColor = $('.container').find('.counter').css('color');
  $('.container').find('.tweet-text').keyup(function(event) {
    const numberChars = event.target.value.length;
    const charsLeft = 140 - numberChars;
    const counterColor = charsLeft < 0 ? 'red' : counterDefaultColor;
    $('.counter').html(charsLeft);
    $('.counter').css('color', counterColor);
  });

});