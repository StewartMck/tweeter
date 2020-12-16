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
    let isSlideDown = false;
    if (!$(tweet).val() || $(tweet).val().length > 140) {
      $('.error-display-hidden').slideDown("slow", () => {
      });
      const msg = !$(tweet).val() ? 'TWEET CANNOT BE EMPTY!'
        : 'OVER THE CHARACTER LIMIT!';
      $('.error-message').text(msg);
      isSlideDown = true;
    } else {
      if (isSlideDown); {
        $('.error-display-hidden').slideUp("fast", () => {
        });
      }

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
    <a>${calcDays(tweet.created_at)} days ago</a>
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
    // uses the dayjs lib to get the difference in the timestamp date and now
    console.log('date', date)
    let tweetDate = dayjs(date);
    return dayjs().diff(tweetDate, 'd');
  };

 
  let isUp = false;
  $('.hide-new-tweet').click((event) => {
    if (!isUp) {
      $('.new-tweet').slideUp('slow', () => {
        isUp = true;
        $('.new-tweet').addClass("hide-new-tweets");
      });
    } else {
      $('.hide-new-tweets').slideDown('slow', () => {
        isUp = false;
      });
    }
  });


});