import React from 'react';
import FlashMessage from 'react-flash-message';

const Message = () => (
  <FlashMessage duration={3000} persistOnHover={true}>
    <div className="p-3">
      <strong>Image uploading, refresh the page in few seconds!</strong>
    </div>
  </FlashMessage>
)

export default Message;
