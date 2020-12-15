$(document).ready(function () {

  const counterDefaultColor = $('.container').find('.counter').css("color");
  $('.container').find("#tweet-text").keyup(function (event) {
    let numberChars = event.target.value.length;
    let charsLeft = 140 - numberChars;
    let counterColor = charsLeft < 0 ? "red" : counterDefaultColor;

    $('.counter').html(charsLeft);
    $('.counter').css("color", counterColor);
  
  });


});