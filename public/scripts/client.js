$(document).ready(function() {

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

  $('.container').find('form').submit((event) => {
    event.preventDefault();
    const tweet = $(event.target).find('.tweet-text');
    
    if (!$(tweet).val() || $(tweet).val().length > 140) {
      $('.error-display-container').slideToggle("slow", () => {
      });
      const msg = !$(tweet).val() ? 'TWEET CANNOT BE EMPTY!'
        : 'OVER THE CHARACTER LIMIT!';
      $('.error-message').text(msg);
      $('.tweet-text').focus();
      setTimeout(() => {
        $('.error-display-container').slideToggle("slow", () => {
        });
      }, 5000);

    } else {
   
      $.ajax({
        url: '/tweets',
        dataType: 'text',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        data: $(tweet).serialize()
      })
        .then((response) => {
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

  // Generic Escape function
  const escape =  (str) => {
    const element = document.createElement('div');
    element.appendChild(document.createTextNode(str));
    return element.innerHTML;
  };

  const renderTweets = (tweetsData) => {
    for (const tweet of tweetsData) {
      $('.container').find('.tweets').append(createTweetElement(tweet));
    }
  };

  const calcDays = (date) => {
    // uses the dayjs lib to get the difference in the timestamp date and current date
    const minutes =  dayjs().diff(date, 'm');

    return minutes < 59 ? `${dayjs().diff(date, 'm')} minute${minutes === 1 ? '' : 's'} ago` :
      minutes >= 60 && minutes < 1439 ? `${dayjs().diff(date, 'h')} hour${minutes >= 60 && minutes < 120 ? '' : 's'} ago` :
        `${dayjs().diff(date, 'd')} days ago`;
  };

 
  $('.hide-new-tweet').click((event) => {
    $(window).scrollTop(0);
    $('.new-tweet').slideToggle('slow', () => {
      $('.tweet-text').focus();
    });
  });


});