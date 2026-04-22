$(() => {

  // all contents
  const $page = $('#all-contents');

  // all tweets
  const $tweetsDiv = $('<div class="tweets"></div>');
  $page.append($tweetsDiv);

  // CREATE BUTTON
  // create the button element
  const $button = $('<button id="new-tweets-button">Show New Tweets</button>');
  // add the button to the page 
  $('.tweets').before($button);

  // NEW TWEETS FUNCTION
  const newTweet = function () {
  // an array of divs, logic for tweet creation
    const $tweets = streams.home.slice().reverse().map((tweet) => {
      // our tweet, sad and empty- that needs data
      const $tweet = $('<div class="tweet"></div>');

      // create a username, using a div creates a block look, using span puts everything on one line
      const $username = $('<div class="user"></div>');
      $username.text(`@${tweet.user}: `);

      // create a message
      const $message = $('<div class="message"></div>');
      $message.text(tweet.message);

      // create a timestamp
      const $timestamp = $('<div class="timestamp"></div>');
      $timestamp.text(moment(tweet.created_at).format('MMMM Do YYYY, h:mm:ss a'));

      // create a friendly timestamp
      const $friendly = $('<div class="humanFriendlyTimestamp"></div>');
      $friendly.text(` (${moment(tweet.created_at).fromNow()})`);
      // GIVE THE USERNAME IT'S CLICK HANDLER FUNCTION INSIDE HERE

      // return our big fat tweet containing all of our delightful data
      return $tweet.append($username, $message, $timestamp, $friendly);
    });
    //$tweetsDiv.append($tweets);
    return $('.tweets').html($tweets);
  };
  // calling newTweet function
  newTweet();

  // ACTION TO ADD BUTTON FUNCTIONALITY
  $button.on('click', newTweet);

  // TIPS:
  // YOU WILL NEED TO PUT NEW TWEETS ON TO THE PAGE EITHER WITH A BUTTON
  // OR AUTOMATICALLY
  // THIS WILL HAPPEN SEVERAL TIMES, PUT THE CODE ABOVE IN A FUNC
  // YOU CAN JUST CALL FUNC
  // IF USING BUTTON, NEW-TWEETS-BUTTON MUST BE ID FOR TEST

  // MOMENT FORMAT BELOW
  moment().format('MMMM Do YYYY, h:mm:ss a');







});
