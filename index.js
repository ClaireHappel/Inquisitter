$(() => {

  // all contents
  const $page = $('#all-contents');
  // all tweets
  const $tweets = $('<div class="tweets container"></div>').appendTo($page);
  // the container of tweets
  const $tweetsContainer = $('.tweets');
  // assign a random identity to anyone who does not define their username
  const currentUser = (window.visitor === undefined ? `Guest${Math.floor(Math.random() * 1000) + 1}` : window.visitor);

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

      // create a timestamp
      const $timestamp = $('<div class="timestamp"></div>');
      $timestamp.text(moment(tweet.created_at).format('MMMM Do YYYY, h:mm:ss a'));

      // create a friendly timestamp
      const $friendly = $('<div class="humanFriendlyTimestamp"></div>');
      $friendly.text(`(${moment(tweet.created_at).fromNow()})`);

      // ADDING COMMENTS
      const $containComments = $('<div class="comment container"></div>').appendTo($tweet).hide();
      const $commentInput = $(`<input type="text" class="comment-input" placeholder="...">`);
      const $commentButton = $('<input type="submit" class="comment-post" value="Comment">');
      $containComments.append($commentInput, $commentButton);

      // CLICK HANDLER SHOULD GO HERE: WHEN USERNAME IS CLICKED, SHOULD GO TO USERNAME'S TIMELINE
      $username.on('click', function() {
        const user = tweet.user;
        // get this specific user's tweets
        const userTweets = streams.users[user];
        // nothing to see here, just disappearing my homeButton
        $homeButton.show().css({
          'margin-top': '13px',
          'margin-left': '1200px',
          'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18, .6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
          'background-size': '300px',
          'background-repeat': 'repeat',
          'color': '#F5F0E6',
          'font-family': "'Montserrat', sans-serif",
          'font-weight': '100', // Lighter weight looks more elegant
          'letter-spacing': '1px', // Slight spacing adds a "boutique" feel
          'text-shadow': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          'backdrop-filter': 'blur(50px)',               // The glass blur
          '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
          'box-shadow': 'inset 0 0 20px rgba(37, 29, 2, 0.1)', // an internal box shadow because we are really cool
          'border': '.5px solid rgba(212, 168, 23, 0.1)', // Thin "glass" edge
          'border-radius': '18px',                       // Rounded corners
          'width': '15%',
          'padding': '15px 10px',     // Added shorthand padding to shrink the internal "air"
        });
        // clear feed
        $tweetsContainer.empty();
        // map through user's tweets
        const $userTimeline = userTweets.reverse().map((tweet) => {
          const $tweet = $('<div class="tweet"></div>');
          const $user = $('<div class="username"></div>').text(`@${tweet.user}: `);
          const $mess = $('<div class="message"></div>').text(tweet.message);
          const $time = $('<div class="timestamp"></div>').text(moment(tweet.created_at).format('MMMM Do YYYY, h:mm:ss a'));
          const $frien = $('<div class="humanFriendlyTimestamp"></div>').text(`(${moment(tweet.created_at).fromNow()})`);
          return $tweet.append($user, $mess, $time, $frien);
        });

        $tweetsContainer.append($userTimeline);

        // NEED TO ADD THIS STYLE SO MY STYLE PERSISTS EVEN DURING A USERNAME CLICK, BECAUSE MOUSE BUTTONS ARE EVIL
        $('.tweet')
          .css({
            'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18,1) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
            'background-size': '1000px',
            'background-repeat': 'repeat',
            'color': '#F5F0E6',
            'font-family': "'Montserrat', sans-serif",
            'font-weight': '300', // Lighter weight looks more elegant
            'letter-spacing': '1px', // Slight spacing adds a "boutique" feel
            'text-shadow': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            'backdrop-filter': 'blur(10px)',               // The glass blur
            '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
            'border': '.5px solid rgb(0, 0, 0)', // Thin "glass" edge
            'border-radius': '20px',                       // Rounded corners
            'box-shadow': 'inset 0 0 50px #0f0202', // an internal box shadow because we are really cool
            'width': '85%',
            'margin': '10px auto',      // Reduced margin to take up less vertical space
            'padding': '10px 15px',     // Added shorthand padding to shrink the internal "air"
            'transition': 'transform 0.3s ease-out'
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
        // FOR TWEET USERNAME
        $('.username').css({
          'font-weight': 'bold',
          'color': 'rgb(184, 162, 89)', // Matching your "glass" edge color
          'margin-top': '5px',
          'margin-left': '10px',
          'font-size': '1 rem'
        });

        // FOR TWEET MESSAGE
        $('.message').css({
          'line-height': '1.4',
          'margin-bottom': '8px',
          'margin-top': '13px',
          'margin-left': '10px',
          'padding': '10px 15px',
          'border-radius': '20px',
          'background-size': '350px',
          'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18,0) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
          'box-shadow': 'inset 0 0 50px #030303', // an internal box shadow because we are really cool
          'color': '#ffffff' // Pure white for high contrast
        });

        // FOR TWEET TIMES
        $('.humanFriendlyTimestamp').css({
          'font-size': '0.65rem',
          'display': 'inline-block',
          'text-align': 'right',
          'color': 'rgba(255, 255, 255, 0.5)', // Dimmed out
          'margin-left': '5px'
        });

        $('.timestamp').css({
          'font-size': '0.65rem',
          'display': 'inline-block',
          'margin-left': '10px',
          'text-align': 'right',
          'color': 'rgba(255, 255, 255, 0.5)', // Dimmed out
        });
      });

      // COMMENT BUTTON FUNCTIONALITY, MUST COME AFTER OTHER BUTTON CLICK BECAUSE REASONS
      // input functionality
      $commentButton.on('click', function() {
        $containComments.show();
        const user = currentUser;
        // 1. Get the text from the input field
        const commentText = `@${user}: ` + $commentInput.val(); // trying to make this take into account my user value, not the present tweet
        // 2. Only proceed if the input isn't empty
        if (commentText.trim() !== "") {
        // 3. Create a new div for the comment
          const $newComment = $('<div class="comment"></div>').text(commentText);
          // 4. Add the new comment to your container
          $containComments.append($newComment);
          // 5. Clear the input field for the next comment
          $commentInput.val('');
        }

      });

      // return our big fat tweet containing all of our delightful data
      return $tweet.append($username, $message, $timestamp, $friendly, $containComments, $commentInput, $commentButton);
    });

    $tweetsContainer.empty(''); // clear the current feed
    $tweetsContainer.append($tweets); // append the new array of tweet elements

    // NEED TO ADD THIS STYLE SO MY STYLE PERSISTS, BECAUSE MOUSE BUTTONS ARE EVIL
    $('.tweet')
      .css({
        'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18,1) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
        'background-size': '1000px',
        'background-repeat': 'repeat',
        'color': '#F5F0E6',
        'font-family': '"Montserrat", sans-serif',
        'font-weight': '150', // Lighter weight looks more elegant
        'letter-spacing': '1px', // Slight spacing adds a "boutique" feel
        'text-shadow': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        'backdrop-filter': 'blur(50px)',               // The glass blur
        '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
        'border': '.5px solid rgb(0, 0, 0)', // Thin "glass" edge
        'border-radius': '20px',                       // Rounded corners
        'box-shadow': 'inset 0 0 50px #110303', // an internal box shadow because we are really cool
        'width': '80%',
        'margin': '10px auto',      // Reduced margin to take up less vertical space
        'padding': '10px 15px',     // Added shorthand padding to shrink the internal "air"
        'transition': 'transform 0.3s ease-out'
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

  // CREATE SHOW NEW POSTS BUTTON TO SHOW ALL TWEETS:

  // create the new tweetsbutton element
  const $newTweetsButton = $('<button id="new-tweets-button">Show New Posts</button>');
  // add the button to the page
  $tweetsContainer.before($newTweetsButton);
  // action to add button functionality
  $newTweetsButton.on('click', function() {
    newTweet();

    // COMMENT CONTAINER
    $('.comment.container')
      .css({
        'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18,0) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
        'margin': '10px auto',      // Reduced margin to take up less vertical space
        'padding': '10px 15px',     // Added shorthand padding to shrink the internal "air"
        'background-size': '700px',
        'text-shadow': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        'backdrop-filter': 'blur(50px)',               // The glass blur
        '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
        'border': '.5px solid #20201f', // Thin "glass" edge
        'border-radius': '20px',                       // Rounded corners
        'box-shadow': 'inset 0 0 50px #0f0202', // an internal box shadow because we are really cool
        'width': '85%',
        'margin': '10px auto',      // Reduced margin to take up less vertical space
        'padding': '10px 15px',     // Added shorthand padding
      });

    // COMMENT INPUT
    $('.comment-input').css({
      'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(122, 97, 13, 0.6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
      'border': '1px solid #bba252', // Thin "glass" edge
      'color': '#F5F0E6',
      'font-family': "'Montserrat', sans-serif",
      'font-weight': 'bold',
      'padding-bottom': '10px',
      'padding-right': '20px',
      'box-shadow': 'inset 0 0 40px #20201f', // an internal box shadow because we are really cool
      'background-size': '500px',
      'backdrop-filter': 'blur(50px)',               // The glass blur
      '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
      'border-radius': '20px',                       // Rounded corners
      'margin': '10px auto',      // Reduced margin to take up less vertical space
      'padding': '3px 15px',     // Added shorthand padding to shrink the internal "air"
      'width': '60%',             // Shrinks the horizontal width of the element
      'font-style': 'italic' // This makes the text italic
    });

    // COMMENT POST
    $('.comment-post').css({
      'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18, .6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
      'background-size': '300px',
      'background-repeat': 'repeat',
      'color': '#F5F0E6',
      'font-family': "'Montserrat', sans-serif",
      'font-weight': '100', // Lighter weight looks more elegant
      'fontSize': '14px',
      'letter-spacing': '1px', // Slight spacing adds a "boutique" feel
      'text-shadow': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
      'backdrop-filter': 'blur(50px)',               // The glass blur
      '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
      'box-shadow': 'inset 0 0 20px #0e0e0d', // an internal box shadow because we are really cool
      'border': '.5px solid rgb(0, 0, 0)', // Thin "glass" edge
      'border-radius': '18px',                       // Rounded corners
      'width': '28%',
      'margin': '10px auto',      // Reduced margin to take up less vertical space
      'padding': '8px 10px',     // Added shorthand padding to shrink the internal "air"
    });

    // FOR TWEET USERNAME
    $('.username').css({
      'font-weight': 'bold',
      'color': 'rgb(184, 162, 89)', // Matching your "glass" edge color
      'margin-top': '5px',
      'margin-left': '10px',
      'font-size': '1 rem'
    });

    // FOR TWEET MESSAGE
    $('.message').css({
      'line-height': '1.4',
      'margin-bottom': '8px',
      'margin-top': '13px',
      'margin-left': '10px',
      'padding': '10px 15px',
      'border-radius': '20px',
      'background-size': '350px',
      'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18,0) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
      'box-shadow': 'inset 0 0 50px #030303', // an internal box shadow because we are really cool
      'color': '#ffffff' // Pure white for high contrast
    });

    // FOR TWEET TIMES
    $('.humanFriendlyTimestamp').css({
      'font-size': '0.65rem',
      'display': 'inline-block',
      'text-align': 'right',
      'color': 'rgba(255, 255, 255, 0.5)', // Dimmed out
      'margin-left': '5px'
    });

    $('.timestamp').css({
      'font-size': '0.65rem',
      'display': 'inline-block',
      'margin-left': '10px',
      'text-align': 'right',
      'color': 'rgba(255, 255, 255, 0.5)', // Dimmed out
    });

  });

  // ALLOW THE USER TO TWEET:

  // create something as a bonus that rotates randomly between placeholder inputs
  const randomPlaceholder = () => {
    const placesToHold = ["Oh wanderer, confess to me your strife...", "Tell me your secrets...", "Reveal the mysteries of your mind...", "It is only through mystery and madness that the soul is revealed. -Thomas Moore", "For me, time is the greatest mystery of all. -Anthony Hopkins", "Here there be monsters...", "The most beautiful thing we can experience is the mysterious. -Albert Einstein"];
    const getRandom = arr => arr[Math.floor(Math.random() * arr.length)];
    return getRandom(placesToHold);
  };
  // make the inputs for the user
  const $usernameInput = $('<input type="text" id="username-input" placeholder="Username">');
  const $tweetInput = $(`<input type="text" id="message-input" placeholder="${randomPlaceholder()}">`).css('width', '500px'); // this adds width to our bar because it was too small to display all of the words of placeholder
  const $tweetButton = $('<input type="submit" value="Post">').attr('id', 'post-button');
  // create a function that rotates the random placeholders
  const rotatePlaceholder = () => {
    $tweetInput.attr('placeholder', randomPlaceholder());
  };
  // change it at a sane amount of time to not annoy anyone
  setInterval(rotatePlaceholder, 9000);
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

    // COMMENT INPUT
    $('.comment-input').css({
      'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(122, 97, 13, 0.6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
      'border': '1px solid #bba252', // Thin "glass" edge
      'color': '#F5F0E6',
      'font-family': "'Montserrat', sans-serif",
      'font-weight': 'bold',
      'padding-bottom': '10px',
      'padding-right': '20px',
      'box-shadow': 'inset 0 0 40px #20201f', // an internal box shadow because we are really cool
      'background-size': '500px',
      'backdrop-filter': 'blur(50px)',               // The glass blur
      '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
      'border-radius': '20px',                       // Rounded corners
      'margin': '10px auto',      // Reduced margin to take up less vertical space
      'padding': '3px 15px',   // Added shorthand padding to shrink the internal "air"
      'width': '60%',             // Shrinks the horizontal width of the element
      'font-style': 'italic' // This makes the text italic
    });

    // COMMENT CONTAINER NEEDED HERE
    $('.comment.container')
      .css({
        'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18,0) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
        'margin': '10px auto',      // Reduced margin to take up less vertical space
        'padding': '10px 15px',     // Added shorthand padding to shrink the internal "air"
        'background-size': '700px',
        'text-shadow': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        'backdrop-filter': 'blur(50px)',               // The glass blur
        '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
        'border': '.5px solid #20201f', // Thin "glass" edge
        'border-radius': '20px',                       // Rounded corners
        'box-shadow': 'inset 0 0 50px #0f0202', // an internal box shadow because we are really cool
        'width': '85%',
        'margin': '10px auto',      // Reduced margin to take up less vertical space
        'padding': '10px 15px',     // Added shorthand padding
      });

    // COMMENT POST BUTTON HERE
    // COMMENT POST
    $('.comment-post').css({
      'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18, .6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
      'background-size': '300px',
      'background-repeat': 'repeat',
      'color': '#F5F0E6',
      'font-family': "'Montserrat', sans-serif",
      'font-weight': '100', // Lighter weight looks more elegant
      'fontSize': '14px',
      'letter-spacing': '1px', // Slight spacing adds a "boutique" feel
      'text-shadow': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
      'backdrop-filter': 'blur(50px)',               // The glass blur
      '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
      'box-shadow': 'inset 0 0 20px #0e0e0d', // an internal box shadow because we are really cool
      'border': '.5px solid rgb(0, 0, 0)', // Thin "glass" edge
      'border-radius': '18px',                       // Rounded corners
      'width': '28%',
      'margin': '10px auto',      // Reduced margin to take up less vertical space
      'padding': '8px 10px',     // Added shorthand padding to shrink the internal "air"
    });

    // FOR TWEET USERNAME
    $('.username').css({
      'font-weight': 'bold',
      'color': 'rgb(184, 162, 89)', // Matching your "glass" edge color
      'margin-top': '5px',
      'margin-left': '10px',
      'font-size': '1 rem'
    });

    // FOR TWEET MESSAGE
    $('.message').css({
      'line-height': '1.4',
      'margin-bottom': '8px',
      'margin-top': '13px',
      'margin-left': '10px',
      'padding': '10px 15px',
      'border-radius': '20px',
      'background-size': '350px',
      'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18,0) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
      'box-shadow': 'inset 0 0 50px #030303', // an internal box shadow because we are really cool
      'color': '#ffffff' // Pure white for high contrast
    });

    // FOR TWEET TIMES
    $('.humanFriendlyTimestamp').css({
      'font-size': '0.65rem',
      'display': 'inline-block',
      'text-align': 'right',
      'color': 'rgba(255, 255, 255, 0.5)', // Dimmed out
      'margin-left': '5px'
    });

    $('.timestamp').css({
      'font-size': '0.65rem',
      'display': 'inline-block',
      'margin-left': '10px',
      'text-align': 'right',
      'color': 'rgba(255, 255, 255, 0.5)', // Dimmed out
    });

  });

  // CREATE A HOME BUTTON TO GET OUT OF A USER'S FEED:
  const $homeButton = $('<button class="home-button">Home</button>').hide();
  $tweetsContainer.before($homeButton);
  // home button will disappear after being clicked, so it does not mess with the main feed
  $homeButton.on('click', function() {
    newTweet();
    $homeButton.hide();


    // COMMENT INPUT
    $('.comment-input').css({
      'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(122, 97, 13, 0.6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
      'border': '1px solid #bba252', // Thin "glass" edge
      'color': '#F5F0E6',
      'padding-bottom': '10px',
      'padding-right': '20px',
      'box-shadow': 'inset 0 0 40px #20201f', // an internal box shadow because we are really cool
      'background-size': '500px',
      'backdrop-filter': 'blur(50px)',               // The glass blur
      '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
      'border-radius': '20px',                       // Rounded corners
      'margin': '10px auto',      // Reduced margin to take up less vertical space
      'padding': '3px 15px',     // Added shorthand padding to shrink the internal "air"
      'width': '60%',             // Shrinks the horizontal width of the element
      'font-style': 'italic' // This makes the text italic
    });

    // COMMENT POST INPUT
    $('.comment-post').css({
      'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18, .6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
      'background-size': '300px',
      'background-repeat': 'repeat',
      'color': '#F5F0E6',
      'font-family': "'Montserrat', sans-serif",
      'font-weight': '100', // Lighter weight looks more elegant
      'fontSize': '14px',
      'letter-spacing': '1px', // Slight spacing adds a "boutique" feel
      'text-shadow': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
      'backdrop-filter': 'blur(50px)',               // The glass blur
      '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
      'box-shadow': 'inset 0 0 20px #0e0e0d', // an internal box shadow because we are really cool
      'border': '.5px solid rgb(0, 0, 0)', // Thin "glass" edge
      'border-radius': '18px',                       // Rounded corners
      'width': '28%',
      'margin': '10px auto',      // Reduced margin to take up less vertical space
      'padding': '8px 10px',     // Added shorthand padding to shrink the internal "air"
    });

    // FOR TWEET USERNAME
    $('.username').css({
      'font-weight': 'bold',
      'color': 'rgb(184, 162, 89)', // Matching your "glass" edge color
      'margin-top': '5px',
      'margin-left': '10px',
      'font-size': '1 rem'
    });

    // FOR TWEET MESSAGE
    $('.message').css({
      'line-height': '1.4',
      'margin-bottom': '8px',
      'margin-top': '13px',
      'margin-left': '10px',
      'padding': '10px 15px',
      'border-radius': '20px',
      'background-size': '350px',
      'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18,0) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
      'box-shadow': 'inset 0 0 50px #030303', // an internal box shadow because we are really cool
      'color': '#ffffff' // Pure white for high contrast
    });

    // FOR TWEET TIMES
    $('.humanFriendlyTimestamp').css({
      'font-size': '0.65rem',
      'display': 'inline-block',
      'text-align': 'right',
      'color': 'rgba(255, 255, 255, 0.5)', // Dimmed out
      'margin-left': '5px'
    });

    $('.timestamp').css({
      'font-size': '0.65rem',
      'display': 'inline-block',
      'margin-left': '10px',
      'text-align': 'right',
      'color': 'rgba(255, 255, 255, 0.5)', // Dimmed out
    });

  });

  // CREATE A HEADER/TITLE THAT EVERYTHING IS BENEATH
  const addMyTitle = function() {
    //  Inquisitter: A Twitter Clone That Questions Everything
    const title = `
 <div id="main-header-container" style="
            position: absolute;
            top: 30px;
            width: 100%;
            text-align: center;
            z-index: 2000;
        ">
            <h1 style="
                color: #BBA252;
                font-family: 'Montserrat', sans-serif;
                font-size: 6vw;
                font-weight: 900;
                text-transform: uppercase;
                letter-spacing: 25px; /* Spread out letters for dramatic effect */
                margin: 0;
                padding-left: 25px; /* offset the last letter's spacing to keep it centered */
            ">
            𓁝 𓁀 Inquisitter 𓁁 𓅈

        </h1>`;

    // Append to all contents
    $('#all-contents').append(title);
    // append to all contents
  };
  // call our function and our title in all of it's
  addMyTitle();

  ////////////////////////////////////////////////////////////

  // SO I HAD A WILD IDEA TO CREATE A LIVE FEED AND APPARENTLY YOU CAN GET AROUND RESTRICTIONS INVOLVING CORS/COMB USING IFRAMES
  // SPENT TOO MUCH TIME LEARNING ABOUT THIS, NO REGERTS (LOL)
  const addUfoFeed = function() {
    // create an iframe to host the feed
    const feed = `
    <div id="mystery-feed-wrapper" style="position: absolute; top: 380px; left: 30px; width: 400px; z-index: 1000;">
        <h3 style="font-size: 14px; color: #BBA252; margin-bottom: 5px;">UFO_SIGHTING_LOGS:</h3>
        <iframe
            src="https://nuforc.org"
            style="width: 100%; height: 620px; border: 1px solid #BBA252; background: #fff; border-radius: 10px;"
            title="UFO Feed">
        </iframe>
    </div>`;

    // append to all contents
    $('#all-contents').append(feed);
  };

  // Call the function
  addUfoFeed();

  ///////////////////////////////////////////////////////////
  // STYLE SECTION
  // BODY
  $('body').css({
    'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18, 0.6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
    'background-size': '700px',
    'background-repeat': 'repeat',
  });

  // MAIN HEADER CONTAINER
  $('#main-header-container').css({
    'box-shadow': 'inset 0 0 90px #20201f',
    'background-size': '1000px',
    'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(122, 97, 13, 0.6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
  });

  // FOR USERNAME INPUT
  $('#username-input').css({
    'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(122, 97, 13, 0.6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
    'border': '1px solid #bba252', // Thin "glass" edge
    'color': '#F5F0E6',
    'padding-bottom': '10px',
    'padding-right': '20px',
    'box-shadow': 'inset 0 0 40px #20201f', // an internal box shadow because we are really cool
    'background-size': '500px',
    'backdrop-filter': 'blur(50px)',               // The glass blur
    '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
    'border-top-left-radius': '20px',
    'border-bottom-left-radius': '20px',
    'margin-left': '40px',      // Reduced margin to take up less vertical space
    'padding': '10px 15px',     // Added shorthand padding to shrink the internal "air"
    'margin-top': '230px',
    'width': '10%',             // Shrinks the horizontal width of the element
    'font-style': 'italic' // This makes the text italic
  });
  // FOR MESSAGE INPUT
  $('#message-input').css({
    'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(122, 97, 13, 0.6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
    'border': '1px solid #bba252', // Thin "glass" edge
    'color': '#F5F0E6',
    'padding-bottom': '10px',
    'padding-right': '20px',
    'box-shadow': 'inset 0 0 40px #20201f', // an internal box shadow because we are really cool
    'background-size': '500px',
    'backdrop-filter': 'blur(50px)',               // The glass blur
    '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
    'border-top-right-radius': '20px',
    'border-bottom-right-radius': '20px',
    'padding': '10px 15px',     // Added shorthand padding to shrink the internal "air"
    'width': '40%',             // Shrinks the horizontal width of the element
    'font-style': 'italic' // This makes the text italic
  });

  // FOR POST BUTTON:
  $('#post-button').css({
    'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18, .6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
    'background-size': '300px',
    'background-repeat': 'repeat',
    'color': '#F5F0E6',
    'font-family': "'Montserrat', sans-serif",
    'font-weight': '100', // Lighter weight looks more elegant
    'letter-spacing': '1px', // Slight spacing adds a "boutique" feel
    'text-shadow': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    'backdrop-filter': 'blur(50px)',               // The glass blur
    '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
    'box-shadow': 'inset 0 0 0px rgba(37, 29, 2, 0.1)', // an internal box shadow because we are really cool
    'border': '.5px solid rgba(212, 168, 23, 0.1)', // Thin "glass" edge
    'border-radius': '18px',                       // Rounded corners
    'width': '15%',
    'margin': '10px auto',      // Reduced margin to take up less vertical space
    'margin-left': '15px',
    'padding': '15px 10px',     // Added shorthand padding to shrink the internal "air"
  });

  // FOR NEW TWEETS BUTTON:
  $('#new-tweets-button').css({
    'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18, .6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
    'background-size': '400px',
    'background-repeat': 'repeat',
    'color': '#F5F0E6',
    'font-family': "'Montserrat', sans-serif",
    'font-weight': '100', // Lighter weight looks more elegant
    'fontSize': '14px',
    'letter-spacing': '1px', // Slight spacing adds a "boutique" feel
    'text-shadow': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    'backdrop-filter': 'blur(50px)',               // The glass blur
    '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
    'box-shadow': 'inset 0 0 20px rgba(37, 29, 2, 0.1)', // an internal box shadow because we are really cool
    'border': '.5px solid rgba(212, 168, 23, 0.1)', // Thin "glass" edge
    'border-radius': '18px',                       // Rounded corners
    'width': '15%',
    'margin': '10px auto',      // Reduced margin to take up less vertical space
    'margin-left': '15px',
    'padding': '15px 10px'    // Added shorthand padding to shrink the internal "air"
  });

  // FOR .TWEETS
  $('.tweets')
    .css({
      'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(56, 45, 13, 0.28) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
      'border': '1px solid #111110bd', // Thin "glass" edge
      'padding-bottom': '10px',
      'padding-top': '40px',
      'padding-right': '20px',
      'padding-right': '20px',
      'box-shadow': 'inset 8 8 40px #20201f', // an internal box shadow because we are really cool
      'background-size': '700px',
      'backdrop-filter': 'blur(50px)',               // The glass blur
      '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
      'border-radius': '20px',                       // Rounded corners
      'margin': '10px auto',      // Reduced margin to take up less vertical space
      'margin-top': '50px',
      'width': '40%',             // Shrinks the horizontal width of the element
      'box-shadow': 'inset 0 0 60px rgba(27, 4, 0, 0.9)',
      'font-style': 'italic' // This makes the text italic
    });

  // FOR TWEET USERNAME
  $('.username').css({
    'font-weight': 'bold',
    'color': 'rgb(184, 162, 89)', // Matching your "glass" edge color
    'margin-top': '5px',
    'margin-left': '10px',
    'font-size': '1 rem'
  });

  // FOR TWEET MESSAGE
  $('.message').css({
    'line-height': '1.4',
    'margin-bottom': '8px',
    'margin-top': '13px',
    'margin-left': '10px',
    'padding': '10px 15px',
    'border-radius': '20px',
    'background-size': '350px',
    'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18,0) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
    'box-shadow': 'inset 0 0 50px #030303', // an internal box shadow because we are really cool
    'color': '#ffffff' // Pure white for high contrast
  });

  // FOR TWEET TIMES
  $('.humanFriendlyTimestamp').css({
    'font-size': '0.65rem',
    'display': 'inline-block',
    'text-align': 'right',
    'color': 'rgba(255, 255, 255, 0.5)', // Dimmed out
    'margin-left': '5px'
  });

  $('.timestamp').css({
    'font-size': '0.65rem',
    'display': 'inline-block',
    'margin-left': '10px',
    'text-align': 'right',
    'color': 'rgba(255, 255, 255, 0.5)', // Dimmed out
  });

  // COMMENT CONTAINER
  $('.comment.container')
    .css({
      'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18,0) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
      'margin': '10px auto',      // Reduced margin to take up less vertical space
      'padding': '10px 15px',     // Added shorthand padding to shrink the internal "air"
      'background-size': '700px',
      'text-shadow': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
      'backdrop-filter': 'blur(50px)',               // The glass blur
      '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
      'border': '.5px solid #20201f', // Thin "glass" edge
      'border-radius': '20px',                       // Rounded corners
      'box-shadow': 'inset 0 0 50px #0f0202', // an internal box shadow because we are really cool
      'width': '85%',
      'margin': '10px auto',      // Reduced margin to take up less vertical space
      'padding': '10px 15px',     // Added shorthand padding
    });

  // COMMENT INPUT
  $('.comment-input').css({
    'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(122, 97, 13, 0.6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
    'border': '1px solid #bba252', // Thin "glass" edge
    'color': '#F5F0E6',
    'padding-bottom': '10px',
    'padding-right': '20px',
    'box-shadow': 'inset 0 0 40px #20201f', // an internal box shadow because we are really cool
    'background-size': '500px',
    'backdrop-filter': 'blur(50px)',               // The glass blur
    '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
    'border-radius': '20px',                       // Rounded corners
    'margin': '10px auto',      // Reduced margin to take up less vertical space
    'padding': '3px 15px',     // Added shorthand padding to shrink the internal "air"
    'width': '60%',             // Shrinks the horizontal width of the element
    'font-style': 'italic' // This makes the text italic
  });

  // COMMENT POST
  $('.comment-post').css({
    'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18, .6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
    'background-size': '300px',
    'background-repeat': 'repeat',
    'color': '#F5F0E6',
    'font-family': "'Montserrat', sans-serif",
    'font-weight': '100', // Lighter weight looks more elegant
    'fontSize': '14px',
    'letter-spacing': '1px', // Slight spacing adds a "boutique" feel
    'text-shadow': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    'backdrop-filter': 'blur(50px)',               // The glass blur
    '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
    'box-shadow': 'inset 0 0 20px #0e0e0d', // an internal box shadow because we are really cool
    'border': '.5px solid rgb(0, 0, 0)', // Thin "glass" edge
    'border-radius': '18px',                       // Rounded corners
    'width': '28%',
    'margin': '10px auto',      // Reduced margin to take up less vertical space
    'padding': '8px 10px',     // Added shorthand padding to shrink the internal "air"
  });

});
