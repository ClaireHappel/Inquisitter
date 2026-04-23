$(() => {

  // all contents
  const $page = $('#all-contents');
  // all tweets
  const $tweets = $('<div class="tweets"></div>');
  $page.append($tweets);
  // each tweet
  const $tweet = $('<div class="tweet"></div>');
  // the container of tweets
  const $tweetsContainer = $('.tweets');

  // NEW TWEETS FUNCTION
  const newTweet = function () {
    // our tweets- we're slicing and reversing the slice to get things to show up at the top and not the bottom of the page
    const $tweets = streams.home.slice().reverse().map((tweet) => {
      // our tweet, sad and empty- that needs data
      const $tweet = $('<div class="tweet"></div>');
      // create a username, using a div creates a block look, using span puts everything on one line
      const $username = $('<div class="username"></div>');
      $username.text(`@${tweet.user}: `);

      // create a message
      const $message = $('<div class="message"></div>');
      $message.text(tweet.message);

      // CLICK HANDLER SHOULD GO HERE: WHEN USERNAME IS CLICKED, SHOULD GO TO USERNAME'S TIMELINE
      $username.on('click', function() {
        const user = tweet.user;
        // get this specific user's tweets
        const userTweets = streams.users[user];
        // nothing to see here, just disappearing my homeButton
        $homeButton.show();
        // clear feed
        $tweetsContainer.empty();
        // map through user's tweets
        const $userTimeline = userTweets.reverse().map((tweet) => {
          const $tweet = $('<div class="tweet"></div>');
          const $user = $('<div class="username"></div>').text(`@${tweet.user}: `);
          const $mess = $('<div class="message"></div>').text(tweet.message);
          return $tweet.append($user, $mess);
        });
        $tweetsContainer.append($userTimeline);

        // NEED TO ADD THIS STYLE SO MY STYLE PERSISTS, BECAUSE MOUSE BUTTONS ARE EVIL
        $('.tweet')
          .css({
            'background-color': 'rgba(37, 221, 221, 0.86)',
            'backdrop-filter': 'blur(10px)',               // The glass blur
            '-webkit-backdrop-filter': 'blur(10px)',       // Safari support
            'border': '5px solid rgba(255, 255, 255, 0.2)', // Thin "glass" edge
            'border-radius': '15px',                       // Rounded corners
            'margin': '20px',                              // Shorthand for top, bottom, left, right
            'padding-bottom': '10px',
            'padding-right': '20px',
            'box-shadow': '0 8px 32px 0 rgba(0, 0, 0, 0.2)', // Soft shadow for depth
            'font-style': 'italic', // This makes the text italic
            'transition': 'all 0.3s ease' // This makes the hover look smooth
          }).hover(
            function() {
              $(this).css({
                'transform': 'translateY(-5px)' // lifts the card slightly
              });
            },
            function() {
              $(this).css({
                'transform': 'translateY(0px)' // puts the card down
              });
            }
          );
      });

      // create a timestamp
      const $timestamp = $('<div class="timestamp"></div>');
      $timestamp.text(moment(tweet.created_at).format('MMMM Do YYYY, h:mm:ss a'));

      // create a friendly timestamp
      const $friendly = $('<div class="humanFriendlyTimestamp"></div>');
      $friendly.text(`(${moment(tweet.created_at).fromNow()})`);
      // GIVE THE USERNAME IT'S CLICK HANDLER FUNCTION INSIDE HERE

      // return our big fat tweet containing all of our delightful data
      return $tweet.append($username, $message, $timestamp, $friendly);
    });

    $tweetsContainer.empty(''); // clear the current feed
    $tweetsContainer.append($tweets); // append the new array of tweet elements

    // NEED TO ADD THIS STYLE SO MY STYLE PERSISTS, BECAUSE MOUSE BUTTONS ARE EVIL
    $('.tweet')
      .css({
        'background-color': 'rgba(37, 221, 221, 0.86)',
        'backdrop-filter': 'blur(10px)',               // The glass blur
        '-webkit-backdrop-filter': 'blur(10px)',       // Safari support
        'border': '5px solid rgba(255, 255, 255, 0.2)', // Thin "glass" edge
        'border-radius': '15px',                       // Rounded corners
        'margin': '20px',                              // Shorthand for top, bottom, left, right
        'padding-bottom': '10px',
        'padding-right': '20px',
        'box-shadow': '0 8px 32px 0 rgba(0, 0, 0, 0.2)', // Soft shadow for depth
        'font-style': 'italic', // This makes the text italic
        'transition': 'all 0.3s ease' // This makes the hover look smooth
      }).hover(
        function() {
          $(this).css({
            'transform': 'translateY(-5px)' // lifts the card slightly
          });
        },
        function() {
          $(this).css({
            'transform': 'translateY(0px)' // puts the card down
          });
        }
      );
  };

  // calling newTweet function
  newTweet();

  // CREATE BUTTON TO SHOW ALL TWEETS:

  // create the new tweetsbutton element
  const $newTweetsButton = $('<button id="new-tweets-button">Show New Posts</button>');
  // add the button to the page
  $tweetsContainer.before($newTweetsButton);
  // action to add button functionality
  $newTweetsButton.on('click', newTweet);

  // ALLOW THE USER TO TWEET:

  // create something as a bonus that rotates randomly between placeholder inputs
  const randomPlaceholder = () => {
    const placesToHold = ["What's eating at ya?", "Tell me your secrets!", "Reveal the mysteries of your mind...", "What's shakin' bacon?", "I have one whole penny for your thoughts!", "How's the weather? Frightful? Delightful?"];
    const getRandom = arr => arr[Math.floor(Math.random() * arr.length)];
    return getRandom(placesToHold);
  };
  // make the inputs for the user
  const $usernameInput = $('<input type="text" id="username-input" placeholder="Username">');
  const $tweetInput = $(`<input type="text" id="message-input" placeholder="${randomPlaceholder()}">`).css('width', '500px'); // this adds width to our bar because it was too small to display all of the words of placeholder
  const $tweetButton = $('<input type="submit" value="Post">');
  // create a function that rotates the random placeholders
  const rotatePlaceholder = () => {
    $tweetInput.attr('placeholder', randomPlaceholder());
  };
  // change it at a sane amount of time to not annoy anyone
  setInterval(rotatePlaceholder, 6000);
  // adding the inputs to the page
  $('#new-tweets-button').before($usernameInput, $tweetInput, $tweetButton);

  // input functionality
  $tweetButton.on('click', function() {
    const username = $('#username-input').val();
    const message = $('#message-input').val();

    if (username && message) {
      // set who our visitor is
      window.visitor = username;
      // if a stream exists
      if (!streams.users[window.visitor]) {
        streams.users[window.visitor] = [];
      }
      // write and refresh
      writeTweet(message);
      $('#message-input').val('');
      newTweet();
    }
  });

  // CREATE A HOME BUTTON TO GET OUT OF A USER'S FEED:
  const $homeButton = $('<button id="home-button">Home</button>').hide();
  $tweetsContainer.after($homeButton);
  // home button will disappear after being clicked, so it does not mess with the main feed
  $homeButton.on('click', function() {
    newTweet();
    $homeButton.hide();
  });


  // STYLE SECTION
  $('.tweets')
    .css({
      'background-color': 'rgba(221, 163, 37, 0.86)',
      'backdrop-filter': 'blur(10px)',               // The glass blur
      '-webkit-backdrop-filter': 'blur(10px)',       // Safari support
      'border': '5px solid rgba(255, 255, 255, 0.2)', // Thin "glass" edge
      'border-radius': '15px',                       // Rounded corners
      'margin': '20px',                              // Shorthand for top, bottom, left, right
      'padding-bottom': '10px',
      'padding-right': '20px',
      'box-shadow': '0 8px 32px 0 rgba(0, 0, 0, 0.2)', // Soft shadow for depth
      'font-style': 'italic' // This makes the text italic
    });



});
