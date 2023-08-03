import React from 'react';
import FlashMessage from 'react-flash-message'

const Message = () => (
  <div className="fixed bottom-0">
    <FlashMessage duration={100000} persistOnHover={true}>
      <strong>I will disapper in 5 seconds!</strong>
    </FlashMessage>
  </div>
)

export default Message;
