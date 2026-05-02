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

      // THIS IS MY NEW HASHTAG LOGIC, IT IS A DELICATE FLOWER
      const linkedMessage = tweet.message.replace(/#(\w+)/g, '<span class="hashtag" style="color: #BBA252; cursor: pointer; text-decoration: underline;">#$1</span>');
      $message.html(linkedMessage);

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
      'margin-left': '1350px',
      'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18, .6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
      'background-size': '300px',
      'background-repeat': 'repeat',
      'color': '#F5F0E6',
      'font-family': "'Montserrat', sans-serif",
      'font-weight': '100', // lighter weight looks more elegant
      'letter-spacing': '1px', // slight spacing
      'text-shadow': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
      'backdrop-filter': 'blur(50px)',               // The glass blur
      '-webkit-backdrop-filter': 'blur(50px)',       // safari support
      'box-shadow': 'inset 0 0 20px rgba(37, 29, 2, 0.1)', // an internal box shadow because we are really cool
      'border': '.5px solid rgba(212, 168, 23, 0.1)', // Thin "glass" edge
      'border-radius': '18px',                       // Rounded corners
      'width': '15%',
      'padding': '10px 20px',    // Added shorthand padding to shrink the internal "air"
      'width': 'auto',
      'max-width': '80vw',      // Keeps it from bleeding off the sides
    // Centers it and uses smaller margins for mobile
      'vertical-align': 'top',    // NECESSARY: Aligns the tops of the boxes
      'display': 'inline-block', // NECESSARY: Allows side-by-side
    'vertical-align': 'top',    // NECESSARY: Aligns the tops of the boxes
    'margin': '0',             // NECESSARY: Removes the auto-center gap
    'position': 'fixed', // Use fixed to ensure it stays relative to the screen width
    'left': 'clamp(5%, 21%, 30%)',       // Matches your new anchor
    'transform': 'translate(-140%, -44vh)',  // Locks to left of center line
    'width': 'clamp(5px, 17vw, 90px)',
    'z-index': '10000',
     'text-align': 'left',
    'white-space': 'nowrap',
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
        // get the text from the input field
        const commentText = `@${user}: ` + $commentInput.val(); // trying to make this take into account my user value, not the present tweet
        // only proceed if the input isn't empty
        if (commentText.trim() !== "") {
        // create a new div for the comment
          const $newComment = $('<div class="comment"></div>').text(commentText);
          // add the new comment to container
          $containComments.append($newComment);
          // clear the input field
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
        'box-shadow': 'inset 0 0 50px #1a0705', // an internal box shadow because we are really cool
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
  const $newTweetsButton = $('<button id="new-tweets-button">New Posts</button>');
  // add the button to the page
$(document).ready(function() {
    $('#main-header-container').after($newTweetsButton);
});
 
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
    const placesToHold = ["Oh wanderer, confess to me your strife...", "Tell me your secrets...", "Reveal the mysteries of your mind...", "Only through mystery and madness is the soul revealed.", "For me, time is the greatest mystery of all. -Anthony Hopkins", "Here there be monsters...", "The most beautiful thing we can experience is the mysterious."];
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
  $(document).ready(function() {
    // Put your input creation and injection code here
    $('#main-header-container').after($usernameInput, $tweetInput, $tweetButton);
});


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
  $(document).ready(function() {
    $('#main-header-container').after($homeButton);
});
  
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
  // Inquisitter: A Twitter Clone That Questions Everything
  // Fixed using position: relative so it pushes other content down instead of covering it.
  const title = `
     <div id="main-header-container" style="
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      display: flex !important;
      justify-content: center !important;
      z-index: 9000 !important;
      padding-top: 50px !important;
      padding-bottom: 20px !important;
    ">
      <h1 style="
        color: #BBA252;
        font-family: 'Montserrat', sans-serif;
        font-size: clamp(2rem, 6vw, 5rem);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: clamp(5px, 2vw, 25px);
        margin: 0;
        text-align: center;
        white-space: nowrap;
      ">

        𓁝𓁀 Inquisitter 𓁁𓅈
      </h1>
    </div>
     <div style="height: 160px; width: 100%;"></div>`;

  // Append to all contents
  $('#all-contents').prepend(title); // Use .prepend() to ensure it is the very first item
};
  // call our function and our title in all of it's
  addMyTitle();

  ////////////////////////////////////////////////////////////
  // MAKE A UFO FEED

const addUfoFeed = function() {
// live feed broke so I made something that still looks snazy
 const feed = `
  <div id="mystery-feed-wrapper" style="position: relative; text-align: center; margin-top: 70vh; max-width: 20%; z-index: 1000;">
   <h3 style="font-size: 14px; color: #BBA252; margin-bottom: 5px;">UFO_SIGHTING_LOGS:</h3>
    <div style="width: 100%; height: 600px; max-height: 70vh; border: 1px solid #BBA252; background: url('https://i.postimg.cc/bJqNFzSV/image-531806d1.png') no-repeat center center; background-size: cover; border-radius: 10px; display: flex; align-items: center; justify-content: center; padding: 20px;">
    <a href="https://nuforc.org" target="_blank" style="color: #fff; text-decoration: none; font-family: monospace; font-size: 12px; border: 1px solid #BBA252; padding: 10px 20px; border-radius: 5px; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(2px);">
                [ ACCESS_LIVE_DATABANK ]
            </a>
        </div>
        <p style="color: #666; font-size: 10px; margin-top: 8px;">External security prevents direct embedding. View logs at NUFORC.org</p>
    </div>`;


    // append after header container
   $(feed).insertAfter('#main-header-container');
  };

  // Call the function
  addUfoFeed();

  ///////////////////////////////////////////////////////////

  // I LOVE MY FEED BUT I SAY WITH REGRET THAT THE PAGE IS NOW LOPSIDED.
  // AT ALL COSTS THIS MUST BE CORRECTED
  // TIME TO BUILD A CRYPTID CONTAINER

  // CREATE A BIG OLD IMAGE CONTAINER FOR OUR CRYPTID PICS
  const addCryptidContainer = function() {
    const images = [
      "https://i.postimg.cc/Bn8GLWzD/headcount-coffee-sumatra-p-1.webp",
      "https://i.postimg.cc/5NTQRb1k/stock-mothman.webp",
      "https://i.postimg.cc/cC23NSqB/6518e6a8-63b3-4c43-b5f8-7f668960b788.png",
      "https://i.postimg.cc/2SF10v5T/nessie-stock.jpg",
      "https://i.postimg.cc/5tNnB050/the-Houston-Batman.jpg",
      "https://i.postimg.cc/Dzxcm0t7/rougarou-stock.jpg",
      "https://i.postimg.cc/ZYGxW1D6/wandiego-stock.jpg"
    ];

    let currentIndex = 0;

    const cryptidContain = `
  <div id="cryptid-wrapper" class="cryptid-container" style="
    position: absolute;       /* Changes to absolute to ignore the UFO feed's 'space' */
    right:  0%;                /* Anchors it to the right edge */
    top: 70vh;                /* EXACT match to your UFO margin-top */
    width: 25%;               /* Matches your max-width */
    z-index: 1000; 
    cursor: pointer;"> 
    <h3 style="font-size: 14px; color: #BBA252; text-align: center; margin-bottom: 5px;">CRYPTIDS: DO_THEY_WALK_AMONG_US?</h3> 
    <img id="image-cryptid" src="${images[0]}" style="width: 100%; height: 520px; max-height: 50vh; border: 1px solid #BBA252; background: #fff; border-radius: 10px;"> 
</div>`;

    $("#all-contents").prepend(cryptidContain);

    $(".cryptid-container").on("click", function() {

      currentIndex++;

      // reset to 0 if we go past the end of the list
      if (currentIndex >= images.length) {
        currentIndex = 0;
      }

      // update the image
      $("#image-cryptid").attr("src", images[currentIndex]);
    });
  };

  addCryptidContainer();

  ////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {
    // 1. Create the container
    const $glassContainer = $('<div class="glass-container"></div>');

    // 2. APPLY THE STYLE TO THE VARIABLE (NOT THE CLASS)
    $glassContainer.css({
       'box-shadow': 'inset -90px 90px 70px 90px #020000',
       'background-size': '200px',
        'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, #af8809b4 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
        'opacity': '0.8',
        'background-size': '450px',
        'background-repeat': 'repeat',
        'backdrop-filter': 'blur(10px)', 
        '-webkit-backdrop-filter': 'blur(10px)',
        'border-radius': '10px',
        'padding': '180px',
        'margin-top': '10px',
        'display': 'flex', 
        'gap': '10px', 
        'align-items': 'center',
        'position': 'relative',
        'z-index': '5000',
        'left': '0',
        'position': 'fixed',
          'top': '0',
    'left': '0',
    'width': '100%',
    'justify-content': 'center',
     'width': '100vw',
    'max-height': '40vh',
    'overflow': 'hidden',
      'height': 'clamp(0px, 2vh, 500px)'
    });


    // 4. Inject it
    $('#main-header-container').after($glassContainer);
});
  ///////////////////////////////////////////////////////////////////////////////////////

  // CREATE HASHTAGS THAT WHEN CLICKED DISPLAY ALL TWEETS WITH THAT HASHTAG

  const filterByHashtag = function(tag) {
    // clear dem feeds
    $tweetsContainer.empty();
    // show dat home button
    $homeButton.show();

    // filter existing stream for messages containing the tag
    const taggedTweets = streams.home.filter(tweet => tweet.message.includes(tag)).reverse();

    // recreating the logic of my tweets again
    const $tagTimeline = taggedTweets.map((tweet) => {
      const $tweet = $('<div class="tweet"></div>');
      const $user = $('<div class="username"></div>').text(`@${tweet.user}: `);
      const $mess = $('<div class="message"></div>').text(tweet.message);
      const $time = $('<div class="timestamp"></div>').text(moment(tweet.created_at).format('MMMM Do YYYY, h:mm:ss a'));
      const $frien = $('<div class="humanFriendlyTimestamp"></div>').text(`(${moment(tweet.created_at).fromNow()})`);
      return $tweet.append($user, $mess, $time, $frien);
    });

    $tweetsContainer.append($tagTimeline);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    // TRIGGER ALL OF THE CSS
    $('.tweet').css({
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
      'transition': 'transform 0.3s ease-out',
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
      'color': 'rgba(255, 255, 255, 0.5)'// Dimmed out
    });

    $homeButton.css({
      'margin-top': '13px',
      'margin-left': '1350px',
      'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18, .6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
      'background-size': '300px',
      'background-repeat': 'repeat',
      'color': '#F5F0E6',
      'font-family': "'Montserrat', sans-serif",
      'font-weight': '100', // lighter weight looks more elegant
      'letter-spacing': '1px', // slight spacing
      'text-shadow': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
      'backdrop-filter': 'blur(50px)',               // The glass blur
      '-webkit-backdrop-filter': 'blur(50px)',       // safari support
      'box-shadow': 'inset 0 0 20px rgba(37, 29, 2, 0.1)', // an internal box shadow because we are really cool
      'border': '.5px solid rgba(212, 168, 23, 0.1)', // Thin "glass" edge
      'border-radius': '18px',                       // Rounded corners
      'width': '15%',
      'padding': '10px 20px',    // Added shorthand padding to shrink the internal "air"
      'width': 'auto',
      'max-width': '80vw',      // Keeps it from bleeding off the sides
    // Centers it and uses smaller margins for mobile
      'vertical-align': 'top',    // NECESSARY: Aligns the tops of the boxes
      'display': 'inline-block', // NECESSARY: Allows side-by-side
    'vertical-align': 'top',    // NECESSARY: Aligns the tops of the boxes
    'margin': '0',             // NECESSARY: Removes the auto-center gap
    'position': 'fixed', // Use fixed to ensure it stays relative to the screen width
    'left': 'clamp(5%, 21%, 30%)',       // Matches your new anchor
    'transform': 'translate(-140%, -44vh)',  // Locks to left of center line
    'width': 'clamp(5px, 17vw, 90px)',
    'z-index': '10000',
     'text-align': 'left',
    'white-space': 'nowrap',
    });
  };

  // using 'body' as the listener so this whole nonsense works $tweetsContainer.empty()
  $('body').on('click', '.hashtag', function(e) {
    e.preventDefault();
    const clickedTag = $(this).text();
    filterByHashtag(clickedTag);
  });

  

  //////////////////////////////////////////////////////////
  // MAIN STYLE SECTION
  // BODY
  $('body').css({
    'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18, 0.6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
    'background-size': '700px',
    'background-repeat': 'repeat',
     'padding': '10px 15px',
     
  });

  // MAIN HEADER CONTAINER
  $('#main-header-container').css({
    'box-shadow': 'inset 70px 100px 100px 10px #0f0404f6',
    '-webkit-mask-image': 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
    'margin': '0px',
    'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgb(122, 96, 13) 100%)',
  });

  // FOR USERNAME INPUT
  $usernameInput.css({
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
    'margin-bottom': '40px',
    'max-width': '80vw',      // Keeps it from bleeding off the sides
    'margin': '20px auto',    // Centers it and uses smaller margins for mobile
    'font-style': 'italic', // This makes the text italic
    'display': 'inline-block', // NECESSARY: Allows side-by-side
    'vertical-align': 'top',    // NECESSARY: Aligns the tops of the boxes
    'margin': '0',             // NECESSARY: Removes the auto-center gap
    'position': 'fixed', // Use fixed to ensure it stays relative to the screen width
    'left': 'clamp(5%, 20%, 40%)',       // Matches your new anchor
    'transform': 'translate(-4%, -48vh)',  // Locks to left of center line
    'width': 'clamp(200px, 20vw, 580px)',
    'z-index': '10000'
  });
  // FOR MESSAGE INPUT
  $tweetInput.css({
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
    'width': 'clamp(200px, 40vw, 580px)', 
    'max-width': '80vw',      // Keeps it from bleeding off the sides
    'margin': '20px auto', // Keeps it centered if the parent container allows
    'font-style': 'italic', // This makes the text italic
    'display': 'inline-block', // NECESSARY: Allows side-by-side
    'vertical-align': 'top',    // NECESSARY: Aligns the tops of the boxes
    'margin': '0',             // NECESSARY: Removes the auto-center gap
    'display': 'inline-block',
    'position': 'fixed', // Added to match the inputs
    'left': 'clamp(5%, 40%, 40%)',       // Matches your new anchor
    'transform': 'translate(2%, -48vh)',
    'width': 'clamp(770px, 28vw, 580px)',
    'max-width': '45vw', 
    'z-index': '10000'
  });

  // FOR POST BUTTON:
  $tweetButton.css({
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
    'padding': '10px calc(13.75vw - 100px)',    // Added shorthand padding to shrink the internal "air"
    'max-width': '60vw',      // Keeps it from bleeding off the sides
    'margin': '20px auto',    // Centers it and uses smaller margins for mobile
    'display': 'inline-block', // NECESSARY: Allows side-by-side
    'vertical-align': 'top',    // NECESSARY: Aligns the tops of the boxes
    'margin': '0',             // NECESSARY: Removes the auto-center gap
    'z-index': '10000',
    'position': 'fixed', // Added to match the inputs
    'left': 'clamp(3%, 30%, 40%)',       // Matches your new anchor
    'transform': 'translate(-35%, -40vh)',  // Locks to left of center line
    'width': 'clamp(20px, 35vw, 660px)',
    'max-width': '80vw',      // Keeps it from bleeding off the sides
    'border-top-left-radius': '20px',
    'border-bottom-left-radius': '20px',
  });

  // FOR NEW TWEETS BUTTON:
  $newTweetsButton.css({
    'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(18,18,18, .6) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
    'background-size': '400px',
    'background-repeat': 'repeat',
    'color': '#F5F0E6',
    'font-family': "'Montserrat', sans-serif",
    'font-weight': '100', // Lighter weight looks more elegant
    'letter-spacing': '1px', // Slight spacing adds a "boutique" feel
    'text-shadow': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    'backdrop-filter': 'blur(50px)',               // The glass blur
    '-webkit-backdrop-filter': 'blur(50px)',       // Safari support
    'box-shadow': 'inset 0 0 0px rgba(37, 29, 2, 0.1)', // an internal box shadow because we are really cool
    'border': '.5px solid rgba(212, 168, 23, 0.1)', // Thin "glass" edge                       // Rounded corners
    'padding': '10px calc(13.75vw - 100px)',      // Added shorthand padding to shrink the internal "air"
    'max-width': '60vw',      // Keeps it from bleeding off the sides
    'margin': '20px auto',    // Centers it and uses smaller margins for mobile
    'display': 'inline-block', // NECESSARY: Allows side-by-side
    'vertical-align': 'top',    // NECESSARY: Aligns the tops of the boxes
    'margin': '0',             // NECESSARY: Removes the auto-center gap
    'z-index': '10000',
    'position': 'fixed', // Added to match the inputs
    'left': 'clamp(5%, 40%, 40%)',       // Matches your new anchor
    'transform': 'translate(30%, -40vh)',
    'width': 'clamp(220px, 35vw, 630px)',
    'max-width': '80vw', 
    'text-align': 'center',
    'white-space': 'nowrap',
    'border-top-right-radius': '20px',
    'border-bottom-right-radius': '20px',
  });

  // FOR .TWEETS
  $('.tweets')
    .css({
      'background-image': 'repeating-radial-gradient(circle at center, transparent 0%, rgba(56, 45, 13, 0.28) 100%), url("https://i.postimg.cc/WzbPmVgX/image-d14cc006.png")',
      'border': '1px solid #856e07bd', // Thin "glass" edge
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
      'width': '35%',
      'box-shadow': 'inset 0 0 60px rgb(7, 2, 1)',
      'font-style': 'italic', // This makes the text italic
      'position': 'absolute',
      'top': '55%',
      'margin-top': '-10px', 
      'right': '33%',
      'z-index': '1500',
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
