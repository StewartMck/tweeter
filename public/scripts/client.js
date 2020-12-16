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
        // add error code here
      });
  };

  loadTweets();

  $('.container').find('form').submit((event) => {
    event.preventDefault();
    const tweet = $(event.target).find('.tweet-text');
    
    if (!$(tweet).val()) {
      window.alert('The tweet cannot be empty!');
    } else if ($(tweet).val().length > 140) {
      window.alert('The tweet cannot be more than 140 characters in length');
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
  ${tweet.content.text}
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


  const renderTweets = (tweetsData) => {
    for (const tweet of tweetsData) {
      $('.container').find('.tweets').append(createTweetElement(tweet));
    }
  };

  const calcDays = (date) => {
    // uses the dayjs lib to get the difference in the timestamp date and now
    let tweetDate = dayjs(date);
    return dayjs().diff(tweetDate, 'day');
  };
  
  
});