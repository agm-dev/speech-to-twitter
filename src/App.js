import React from 'react';
import './App.css';
import Text from './components/Text/Text';
import speechToText from './services/speechToText';
import twitter from './services/twitter';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      error: 'Talk to write. Say "twitter" to publish on Twitter, "cancelar" to remove the text, "deja de escuchar" to stop listening your voice.',
      text: '',
      rows: 5,
      probability: 0,
      editable: false,
    };
    this.state = { ...this.defaultState };
    this.transcriptionHandler = this.transcriptionHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
  }

  transcriptionHandler(error, text, probability, editable, shareOnTwitter) {
    if (error) {
      return this.setState({ ...this.defaultState, error });
    }

    this.setState({ text, probability, editable });

    if (shareOnTwitter) {
      twitter.publish(text);
    }
  }

  editHandler(props) {
    speechToText.setText(props.text);
    this.setState({ ...props });
  }

  componentDidMount() {
    speechToText.init(this.transcriptionHandler);
  }

  render() {
    return (
      <div className="app">
        <div className="app__section accuracy">
          {
            this.state.probability ?
            `${Math.round(this.state.probability * 100)}%` :
            ''
          }
        </div>
        <Text
          text={this.state.text}
          editable={this.state.editable}
          onEdit={this.editHandler}
          rows={this.state.rows}
        />
        <div className="app__section error">
          {this.state.error}
        </div>
      </div>
    );
  }
}

export default App;
