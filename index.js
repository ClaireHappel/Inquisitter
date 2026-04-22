$(() => {

  // all contents
  const $page = $('#all-contents');

  // all tweets
  const $tweetsDiv = $('<div class="tweets"></div>');
  $page.append($tweetsDiv);

  // an array of divs, logic for tweet creation, FIRST PUT THIS ALL IN A FUNC
  const $tweets = streams.home.map((tweet) => {
    // THIS WILL NAME TO CHANGE, USERNAME NEEDS TO BE IN OWN TAG TO BE CLICKABLE
    const $tweet = $('<div class="tweet"></div>');
    // NEEDS TO BE WITHIN ITS OWN TAG WITHIN THE DIV
    const text = `@${tweet.user}: ${tweet.message}`;
    // END CHANGES
    // GIVE THE USERNAME IT'S CLICK HANDLER FUNCTION INSIDE HERE
    $tweet.text(text);
    return $tweet;
  });
  $tweetsDiv.append($tweets);
  // CODE TO PUT IN FUNCTION ENDS HERE

  // TIPS:
  // YOU WILL NEED TO PUT NEW TWEETS ON TO THE PAGE EITHER WITH A BUTTON
  // OR AUTOMATICALLY
  // THIS WILL HAPPEN SEVERAL TIMES, PUT THE CODE ABOVE IN A FUNC
  // YOU CAN JUST CALL FUNC
  // IF USING BUTTON, NEW-TWEETS-BUTTON MUST BE ID FOR TEST

  // MOMENT FORMAT BELOW
  moment().format('MMM Do YYYY, h:mm:ss a');







});
