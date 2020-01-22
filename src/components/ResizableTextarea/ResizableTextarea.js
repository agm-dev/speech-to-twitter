/**
 * Comes from https://codepen.io/liborgabrhel/pen/eyzwOx
 */
import React from 'react';

class ResizableTextarea extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      minRows: 5,
      maxRows: 10,
    };
  }

  handleChange = (event) => {
    const textareaLineHeight = 24;
    const { minRows, maxRows } = this.state;

    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    const rows = currentRows < maxRows ? currentRows : maxRows;
    const text = event.target.value;

    console.log('DEBUG');
    this.props.onEdit({ rows, text });
  };

  render() {
    return (
      <textarea
        rows={this.props.rows}
        value={this.props.text}
        className="app__input app__text app__section"
        onChange={this.handleChange}
      />
    );
  }
}

export default ResizableTextarea;
