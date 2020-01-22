import React from 'react';
import ResizableTextarea from '../ResizableTextarea/ResizableTextarea';

const RawText = ({ text }) => <div className="app__text app__section">{text}</div>;

const EditableText = ({ text, onEdit }) => {
  return (
    <textarea
      type="text"
      className="app__input app__text app__section"
      value={text}
      onChange={onEdit}
    ></textarea>
  )
}

const Text = ({ text, editable, onEdit, rows }) => (
  editable ?
  // <EditableText text={text} onEdit={onEdit}/> :
  <ResizableTextarea text={text} onEdit={onEdit} rows={rows}/> :
  <RawText text={text}/>
);

export default Text;
