/*global $, document, calcDays, window*/

$(function() {

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
      .then((response) => {
        renderTweets(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  loadTweets();

  //using find here for future scalability. No ambiguity as to target element
  $('.container').find('form').submit((event) => {
    event.preventDefault();
    const tweet = $(event.target).find('.tweet-text');

    if (!$(tweet).val() || $(tweet).val().length > 140) {
      $('.error-display-container').slideDown("slow");
      const msg = !$(tweet).val() ? 'TWEET CANNOT BE EMPTY!'
        : 'OVER THE CHARACTER LIMIT!';
      $('.error-message').text(msg);
      $('.tweet-text').focus();
    } else {
      $('.error-display-container').slideUp("slow");
      $.ajax({
        url: '/tweets',
        dataType: 'text',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        data: $(tweet).serialize()
      })
        .then(() => {
          $(tweet).val("");
          $(event.target).find('.counter').val('140');
          $('.container').find('.tweets').empty();
          loadTweets();
        })
        .catch(err => {
          console.log('Error:', err);
        });
    }
  });

  const createTweetElement = (tweet) => {
    return $(`<article>
  <header>
    <div>
    <img src=${tweet.user.avatars}></img>
    <a>${tweet.user.name}</a>
  </div>
    <p>${tweet.user.handle}</p>
  </header>
  <p class="tweet-history">
  ${escape(tweet.content.text, 'p')}
  </p>
  <footer>
    <a>${calcDays(tweet.created_at)}</a>
    <div class="footer-icons">
      <i class="fas fa-flag" style="color:#4056A1"></i>
      <i class="fas fa-retweet" style="color:#4056A1"></i>
      <i class="fas fa-heart" style="color:#4056A1"></i>
    </div>
  </footer>
  <br>
</article>`);
  };

  const renderTweets = (tweetsData) => {
    for (const tweet of tweetsData) {
      $('.container').find('.tweets').append(createTweetElement(tweet));
    }
  };
 
  $('.hide-new-tweet').click(() => {
    $(window).scrollTop(0);
    $('.new-tweet').slideToggle('slow', () => {
      $('.tweet-text').focus();
    });
  });

  //Event listener on scroll of DOM.
  $(document).scroll(() => {
    scroll();
  });

  const scroll = () => {
    if ($(document).scrollTop() > 200) {
      $('#scroll-button').css('opacity', '1');
    } else {
      $('#scroll-button').css('opacity', '0');
    }
  };
  
  $('#scroll-button').click(() => {
    $("html, body").animate({
      scrollTop: 0
    }, "slow");
  });

});