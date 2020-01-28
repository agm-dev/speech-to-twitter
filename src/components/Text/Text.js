import React from 'react';
import ResizableTextarea from '../ResizableTextarea/ResizableTextarea';

const RawText = ({ text }) => <div className="app__text app__section">{text}</div>;

const Text = ({ text, editable, onEdit, rows }) => (
  editable ?
  <ResizableTextarea text={text} onEdit={onEdit} rows={rows}/> :
  <RawText text={text}/>
);

export default Text;
