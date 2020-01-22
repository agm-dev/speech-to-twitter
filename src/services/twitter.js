const TWITTER_PUBLISH_URL = 'https://twitter.com/intent/tweet';
const TWITTER_TWEET_KEY = 'text';

function publish (text) {
  const encodedText = encodeURI(text);
  const url = `${TWITTER_PUBLISH_URL}?${TWITTER_TWEET_KEY}=${encodedText}`;
  window.open(url);
}

export default {
  publish,
};
