import React from 'react';
import './App.css';
import Text from './components/Text/Text';
import speechToText from './services/speechToText';
import twitter from './services/twitter';

const messages = [
  'Di algo.',
  'Di "twitter" para publicar en Twitter.',
  'Di "editar" para editar manualmente el texto.',
  'Di "cancelar" para eliminar el texto.',
  'Di "deja de escuchar" para eliminar la escucha.',
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      messages,
      error: '',
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

  getRandomMessage() {
    const items = this.state.messages;
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  componentDidMount() {
    speechToText.init(this.transcriptionHandler);
  }

  render() {
    return (
      <div className="app">
        <div className="app__section error">
          {this.state.error ? this.state.error : this.getRandomMessage() }
        </div>
        <Text
          text={this.state.text}
          editable={this.state.editable}
          onEdit={this.editHandler}
          rows={this.state.rows}
        />
      </div>
    );
  }
}

export default App;
