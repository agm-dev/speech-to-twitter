const featureOriginalName = 'SpeechRecognition';
const vendorPrefixes = [
  'webkit',
];
const featureNames = vendorPrefixes.reduce((final, current) => [...final, `${current}${featureOriginalName}`], [featureOriginalName]);

console.log('featureNames', featureNames);

let feature, recognition, text, stopped, editable, error, shareOnTwitter;

function init(cb) {
  editable = false;
  feature = featureNames.find(feature => typeof window[feature] !== 'undefined');

  if (!feature) {
    const errorMessage = 'speech-to-text not supported in this browser';
    console.log(errorMessage);
    return cb(errorMessage);
  }

  console.log('supported feature: ', feature);
  listen(cb);
};

function listen (cb) {
  stopped = false;
  shareOnTwitter = false;

  recognition = new window[feature]();
  recognition.onstart = () => console.log('voice recognition started!');
  recognition.onaudioend = () => {
    console.log('stop listening');
    if (!stopped) {
      listen(cb);
    }
  }
  recognition.onresult = event => {
    const oldText = text;
    const result = event.results[0][0];
    const { transcript, confidence } = result;
    console.log(`${Math.round(confidence * 100)}%: ${transcript}`);

    const chars = transcript.split('');
    const formatted = `${chars.length ? chars[0].toUpperCase() : ''}${chars.slice(1).join('')}${chars.length ? '.' : ''}`
    text = formatted;

    if (['edita', 'editar'].includes(transcript)) {
      console.log('signal to edit text');
      text = oldText
      editable = true;
    }

    if (['cancela', 'cancelar'].includes(transcript)) {
      console.log('signal to cancel');
      text = '';
      editable = false;
    }

    if ('twitter' === transcript.toLowerCase()) {
      console.log('signal to tweet');
      text = oldText;
      shareOnTwitter = true;
    }

    if (['stop', 'deja de escuchar'].includes(transcript)) {
      console.log('signal to stop');
      stopped = true;
      editable = false;
      error = 'Ya no te escucho :(';
      recognition.abort();
    }

    cb(error, text, confidence, editable, shareOnTwitter);

    if (!stopped) {
      listen(cb);
    }
  };
  recognition.start();
};

function setText(newText) {
  text = newText;
}


export default {
  text,
  init,
  setText,
};
