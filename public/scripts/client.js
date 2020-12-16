$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "test",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@test"
      },
      "content": {
        "text": "blah blah blah"
      },
      "created_at": 1606756408458
    },
  ];

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

  renderTweets(data);
  calcDays('2020-12-00');

});

const calcDays = (date) => {
  let tweetDate = dayjs(date);
  return dayjs().diff(tweetDate, 'day');
};